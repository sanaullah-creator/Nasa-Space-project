import { useCallback, useMemo } from 'react';
import { quizQuestions } from '../data/quiz';
import type { QuizProgress, QuizResult } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { useUserScopedKey } from './AuthContext';

const EMPTY: QuizProgress = { currentIndex: 0, answers: {}, completed: false };

/** Pure scoring helper (exported for testing). */
export function scoreQuiz(answers: Record<string, number>) {
  return quizQuestions.reduce((sum, q) => sum + (answers[q.id] === q.correctIndex ? 1 : 0), 0);
}

/** Quiz state machine persisted to localStorage so visitors can resume later. */
export function useQuiz(onComplete?: (score: number, total: number) => void) {
  const [progress, setProgress] = useLocalStorage<QuizProgress>(useUserScopedKey('quiz-progress'), EMPTY);
  const [history, setHistory] = useLocalStorage<QuizResult[]>(useUserScopedKey('quiz-history'), []);

  const total = quizQuestions.length;
  const index = Math.min(progress.currentIndex, total - 1);
  const question = quizQuestions[index];
  const chosen = progress.answers[question.id];
  const answered = chosen !== undefined;
  const score = useMemo(() => scoreQuiz(progress.answers), [progress.answers]);
  const answeredCount = Object.keys(progress.answers).length;
  const best = history.reduce((b, r) => Math.max(b, r.score), 0);

  const answer = useCallback(
    (optionIndex: number) => {
      setProgress((p) => (p.answers[question.id] !== undefined ? p : { ...p, answers: { ...p.answers, [question.id]: optionIndex } }));
    },
    [question.id, setProgress],
  );

  const next = useCallback(() => {
    if (index < total - 1) {
      setProgress((p) => ({ ...p, currentIndex: p.currentIndex + 1 }));
      return;
    }
    const finalScore = scoreQuiz(progress.answers);
    setProgress((p) => ({ ...p, completed: true }));
    setHistory((h) => [...h, { score: finalScore, total, date: new Date().toISOString() }].slice(-10));
    onComplete?.(finalScore, total);
  }, [index, total, progress.answers, setProgress, setHistory, onComplete]);

  const restart = useCallback(() => setProgress(EMPTY), [setProgress]);

  return { question, index, total, chosen, answered, score, answeredCount, completed: progress.completed, answers: progress.answers, history, best, answer, next, restart };
}
