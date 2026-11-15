import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CircleCheck, CodeXml, Palette, Rocket, Users } from 'lucide-react';
import { team, TEAM_NAME } from '../data/team';
import { PageHeader } from '../components/ui/SectionHeading';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { initials } from '../utils/auth';
import type { TeamMember } from '../types';

function MemberPhoto({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[5/6] overflow-hidden rounded-2xl bg-space-800">
      {failed ? (
        <div className="grid h-full w-full place-items-center font-display text-5xl font-black text-white" style={{ background: `radial-gradient(circle at 30% 30%, ${member.accent}, #0b1130)` }}>
          {initials(member.name)}
        </div>
      ) : (
        <img
          src={member.photo}
          alt={`Portrait of ${member.name}, ${member.role}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: member.accent, boxShadow: `0 0 24px ${member.accent}` }} />
    </div>
  );
}

const ROLE_ICONS = [Rocket, BookOpen, Palette, CodeXml];

export function CreditsPage() {
  useDocumentTitle('Credits');
  return (
    <>
      <PageHeader
        eyebrow="Credits · Meet the crew"
        title={TEAM_NAME}
        description="Four explorers, four different roles, one mission: making sure the machines we sent into space are never forgotten."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {team.map((m, i) => {
            const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
            return (
              <li key={m.id} className="group glass card-hover flex flex-col overflow-hidden p-3 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }} data-testid="team-member">
                <MemberPhoto member={m} />
                <div className="flex flex-1 flex-col p-3 pt-5">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider" style={{ background: `${m.accent}22`, color: m.accent }}>
                    <Icon className="h-3.5 w-3.5" aria-hidden /> {m.role}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold">{m.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{m.bio}</p>
                  <h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Contributions</h3>
                  <ul className="mt-2 space-y-1.5">
                    {m.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-slate-300">
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: m.accent }} aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {m.skills.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.7rem] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <section className="glass mt-12 grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-nebula-500/15 text-nebula-300">
            <Users className="h-7 w-7" aria-hidden />
          </div>
          <div>
            <h2 className="text-xl font-bold">Built for the NASA Space Apps Challenge</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Challenge: <em>Abandoned but not Forgotten</em>. Mission information comes from public NASA, JPL, APL and NSSDCA sources. This is an independent
              team project and is not endorsed by NASA.
            </p>
          </div>
          <Link to="/about" className="btn-secondary">
            Sources &amp; references <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </div>
    </>
  );
}
