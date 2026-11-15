import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { PublicUser, StoredUser } from '../types';
import { AVATAR_COLORS, EMAIL_RE, hashPassword, normalizeEmail, randomId, validateName, validatePassword } from '../utils/auth';

/* Demo authentication stored in this browser only (see utils/auth.ts). */

const USERS_KEY = 'clf:users';
const SESSION_KEY = 'clf:session';

type Result = { ok: true } | { ok: false; error: string; field?: string };

interface AuthContextValue {
  user: PublicUser | null;
  register: (input: { name: string; email: string; password: string }) => Promise<Result>;
  login: (input: { email: string; password: string; remember: boolean }) => Promise<Result>;
  logout: () => void;
  updateProfile: (input: { name: string; avatarColor: string; favoriteMissionId: string | null; bio: string }) => Result;
  changePassword: (current: string, next: string) => Promise<Result>;
  deleteAccount: (password: string) => Promise<Result>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* storage unavailable */
  }
}

/** The session id lives in localStorage ("remember me") or sessionStorage (this tab only). */
function readSession(): string | null {
  try {
    return window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function writeSession(id: string | null, remember = true) {
  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    if (id) (remember ? window.localStorage : window.sessionStorage).setItem(SESSION_KEY, id);
  } catch {
    /* ignore */
  }
}

const toPublic = ({ passwordHash: _h, salt: _s, ...rest }: StoredUser): PublicUser => rest;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(() => {
    const id = readSession();
    const found = id ? readUsers().find((u) => u.id === id) : undefined;
    return found ? toPublic(found) : null;
  });

  const register = useCallback<AuthContextValue['register']>(async ({ name, email, password }) => {
    const nameErr = validateName(name);
    if (nameErr) return { ok: false, error: nameErr, field: 'name' };
    const mail = normalizeEmail(email);
    if (!EMAIL_RE.test(mail)) return { ok: false, error: 'Please enter a valid email address.', field: 'email' };
    const pwErr = validatePassword(password);
    if (pwErr) return { ok: false, error: pwErr, field: 'password' };
    const users = readUsers();
    if (users.some((u) => u.email === mail)) return { ok: false, error: 'An account with this email already exists. Try logging in.', field: 'email' };

    const salt = randomId(16);
    const now = new Date().toISOString();
    const newUser: StoredUser = {
      id: randomId(8),
      name: name.trim(),
      email: mail,
      passwordHash: await hashPassword(password, salt),
      salt,
      avatarColor: AVATAR_COLORS[users.length % AVATAR_COLORS.length],
      favoriteMissionId: null,
      bio: '',
      createdAt: now,
      lastLoginAt: now,
    };
    writeUsers([...users, newUser]);
    writeSession(newUser.id, true);
    setUser(toPublic(newUser));
    return { ok: true };
  }, []);

  const login = useCallback<AuthContextValue['login']>(async ({ email, password, remember }) => {
    const mail = normalizeEmail(email);
    if (!EMAIL_RE.test(mail)) return { ok: false, error: 'Please enter a valid email address.', field: 'email' };
    if (!password) return { ok: false, error: 'Please enter your password.', field: 'password' };
    const users = readUsers();
    const found = users.find((u) => u.email === mail);
    // Same message for unknown email and wrong password, so accounts can't be probed.
    if (!found || (await hashPassword(password, found.salt)) !== found.passwordHash) {
      return { ok: false, error: 'Incorrect email or password.' };
    }
    const updated = { ...found, lastLoginAt: new Date().toISOString() };
    writeUsers(users.map((u) => (u.id === found.id ? updated : u)));
    writeSession(found.id, remember);
    setUser(toPublic(updated));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    writeSession(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback<AuthContextValue['updateProfile']>(
    ({ name, avatarColor, favoriteMissionId, bio }) => {
      if (!user) return { ok: false, error: 'You are not logged in.' };
      const nameErr = validateName(name);
      if (nameErr) return { ok: false, error: nameErr, field: 'name' };
      if (bio.length > 160) return { ok: false, error: 'Bio must be 160 characters or fewer.', field: 'bio' };
      const users = readUsers();
      const found = users.find((u) => u.id === user.id);
      if (!found) return { ok: false, error: 'Account not found.' };
      const updated: StoredUser = { ...found, name: name.trim(), avatarColor, favoriteMissionId, bio: bio.trim() };
      writeUsers(users.map((u) => (u.id === found.id ? updated : u)));
      setUser(toPublic(updated));
      return { ok: true };
    },
    [user],
  );

  const changePassword = useCallback<AuthContextValue['changePassword']>(
    async (current, next) => {
      if (!user) return { ok: false, error: 'You are not logged in.' };
      const users = readUsers();
      const found = users.find((u) => u.id === user.id);
      if (!found) return { ok: false, error: 'Account not found.' };
      if ((await hashPassword(current, found.salt)) !== found.passwordHash) return { ok: false, error: 'Your current password is incorrect.', field: 'current' };
      const pwErr = validatePassword(next);
      if (pwErr) return { ok: false, error: pwErr, field: 'next' };
      if (current === next) return { ok: false, error: 'New password must be different from the current one.', field: 'next' };
      const salt = randomId(16);
      const updated = { ...found, salt, passwordHash: await hashPassword(next, salt) };
      writeUsers(users.map((u) => (u.id === found.id ? updated : u)));
      return { ok: true };
    },
    [user],
  );

  const deleteAccount = useCallback<AuthContextValue['deleteAccount']>(
    async (password) => {
      if (!user) return { ok: false, error: 'You are not logged in.' };
      const users = readUsers();
      const found = users.find((u) => u.id === user.id);
      if (!found) return { ok: false, error: 'Account not found.' };
      if ((await hashPassword(password, found.salt)) !== found.passwordHash) return { ok: false, error: 'Password is incorrect.', field: 'password' };
      writeUsers(users.filter((u) => u.id !== found.id));
      try {
        Object.keys(window.localStorage)
          .filter((k) => k.startsWith(`clf:u:${found.id}:`))
          .forEach((k) => window.localStorage.removeItem(k));
      } catch {
        /* ignore */
      }
      writeSession(null);
      setUser(null);
      return { ok: true };
    },
    [user],
  );

  const value = useMemo(
    () => ({ user, register, login, logout, updateProfile, changePassword, deleteAccount }),
    [user, register, login, logout, updateProfile, changePassword, deleteAccount],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Storage key scoped to the signed-in user (guests share the "guest" scope). */
export function useUserScopedKey(base: string): string {
  const { user } = useAuth();
  return user ? `u:${user.id}:${base}` : base;
}
