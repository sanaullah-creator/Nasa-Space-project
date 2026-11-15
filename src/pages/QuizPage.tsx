import { Link } from 'react-router-dom';
import { ArrowRight, Brain, CircleCheck, RotateCcw, Trophy, CircleX } from 'lucide-react';
import { quizQuestions } from '../data/quiz';
import { achievements } from '../data/achievements';
import { getMissionById } from '../data/missions';
import { useQuiz } from '../hooks/useQuiz';
import { useProgress } from '../hooks/ProgressContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHeader } from '../components/ui/SectionHeading';
import { AchievementIcon } from '../components/ui/AchievementIcon';
import { cx } from '../utils/format';

const LETTERS = ['A', 'B', 'C', 'D'];

function rank(pct: number) {
  if (pct === 1) return { title: 'Mission Commander', text: 'A perfect score. NASA would be proud to have you on the team!' };
  if (pct >= 0.8) return { title: 'Space Knowledge Expert', text: 'Outstanding! You really know your missions.' };
  if (pct >= 0.5) return { title: 'Flight Engineer', text: 'Solid work! Explore a few more mission files and try again.' };
  return { title: 'Space Cadet', text: 'Every explorer starts somewhere. Visit the mission files and come back stronger!' };
}

export function QuizPage() {
  useDocumentTitle('Mission Quiz');
  const { recordQuizResult, isUnlocked } = useProgress();
  const quiz = useQuiz(recordQuizResult);
  const { question, index, total, chosen, answered, score, completed, answers, best, history } = quiz;

  if (completed) {
    const pct = score / total;
    const r = rank(pct);
    const quizBadges = achievements.filter((a) => ['quiz-cadet', 'space-knowledge-expert', 'perfect-orbit'].includes(a.id));
    return (
      <>
        <PageHeader eyebrow="Quiz complete" title="Mission debrief" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <section className="glass relative overflow-hidden p-8 text-center">
            <div className="absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-amber-400/20 blur-3xl" aria-hidden />
            <Trophy className="relative mx-auto h-14 w-14 text-amber-300" aria-hidden />
            <p className="relative mt-4 font-display text-6xl font-black text-gradient" data-testid="quiz-score">
              {score}/{total}
            </p>
            <p className="relative mt-1 text-sm text-slate-400">{Math.round(pct * 100)}% correct · best score {Math.max(best, score)}/{total}</p>
            <h2 className="relative mt-6 text-2xl font-bold">{r.title}</h2>
            <p className="relative mt-2 text-slate-300">{r.text}</p>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
              {quizBadges.map((b) => {
                const got = isUnlocked(b.id);
                return (
                  <div key={b.id} className={cx('rounded-xl border p-4', got ? 'border-white/20 bg-white/5' : 'border-white/5 opacity-50')}>
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full" style={{ background: got ? `${b.color}2a` : '#ffffff0d', color: got ? b.color : '#64748b' }}>
                      <AchievementIcon icon={b.icon} className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-sm font-semibold">{b.title}</p>
                    <p className="text-xs text-slate-400">{got ? 'Unlocked!' : b.howToEarn}</p>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <button className="btn-primary" onClick={quiz.restart}>
                <RotateCcw className="h-4 w-4" aria-hidden /> Restart quiz
              </button>
              <Link to="/achievements" className="btn-secondary">
                View all badges
              </Link>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold">Review your answers</h2>
            <ol className="mt-4 space-y-3">
              {quizQuestions.map((q, i) => {
                const correct = answers[q.id] === q.correctIndex;
                return (
                  <li key={q.id} className="glass flex gap-3 p-4">
                    {correct ? <CircleCheck className="h-5 w-5 shrink-0 text-emerald-400" aria-label="Correct" /> : <CircleX className="h-5 w-5 shrink-0 text-rose-400" aria-label="Incorrect" />}
                    <div>
                      <p className="font-semibold text-white">
                        {i + 1}. {q.question}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Answer: <span className="text-emerald-300">{q.options[q.correctIndex]}</span>
                        {!correct && answers[q.id] !== undefined && (
                          <>
                            {' '}
                            · You chose: <span className="text-rose-300">{q.options[answers[q.id]]}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
            {history.length > 1 && (
              <p className="mt-4 text-sm text-slate-500">
                Previous attempts: {history.slice(0, -1).slice(-5).map((h) => `${h.score}/${h.total}`).join(' · ')}
              </p>
            )}
          </section>
        </div>
      </>
    );
  }

  const isCorrect = answered && chosen === question.correctIndex;
  const relatedMission = question.missionId ? getMissionById(question.missionId) : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Interactive quiz"
        title="Test your mission knowledge"
        description={`${total} questions about the machines in this museum. Your progress is saved automatically — you can leave and come back.`}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
          <span className="inline-flex items-center gap-2">
            <Brain className="h-4 w-4 text-nebula-300" aria-hidden /> Question {index + 1} of {total}
          </span>
          <span>
            Score: <strong className="text-white">{score}</strong>
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={index + (answered ? 1 : 0)} aria-label="Quiz progress">
          <div className="h-full rounded-full bg-gradient-to-r from-nebula-500 to-mars-500 transition-all duration-500" style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }} />
        </div>

        <section key={question.id} className="glass mt-6 animate-fade-up p-6 sm:p-8" aria-live="polite">
          <h2 className="text-xl font-bold leading-snug sm:text-2xl">{question.question}</h2>
          <div className="mt-6 grid gap-3" role="radiogroup" aria-label="Answer options">
            {question.options.map((opt, i) => {
              const isChosen = chosen === i;
              const isAnswer = i === question.correctIndex;
              return (
                <button
                  key={opt}
                  role="radio"
                  aria-checked={isChosen}
                  disabled={answered}
                  onClick={() => quiz.answer(i)}
                  className={cx(
                    'flex items-center gap-4 rounded-xl border p-4 text-left transition',
                    !answered && 'border-white/10 bg-white/[0.03] hover:border-nebula-400/60 hover:bg-nebula-500/10',
                    answered && isAnswer && 'border-emerald-400/60 bg-emerald-500/15',
                    answered && isChosen && !isAnswer && 'border-rose-400/60 bg-rose-500/15',
                    answered && !isChosen && !isAnswer && 'border-white/5 opacity-50',
                  )}
                >
                  <span
                    className={cx(
                      'grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold',
                      answered && isAnswer ? 'bg-emerald-400 text-space-900' : answered && isChosen ? 'bg-rose-400 text-space-900' : 'bg-white/10 text-slate-200',
                    )}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1 text-slate-100">{opt}</span>
                  {answered && isAnswer && <CircleCheck className="h-5 w-5 text-emerald-400" aria-hidden />}
                  {answered && isChosen && !isAnswer && <CircleX className="h-5 w-5 text-rose-400" aria-hidden />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={cx('mt-6 animate-fade-up rounded-xl border p-4', isCorrect ? 'border-emerald-400/30 bg-emerald-500/10' : 'border-rose-400/30 bg-rose-500/10')} role="alert">
              <p className={cx('font-bold', isCorrect ? 'text-emerald-300' : 'text-rose-300')}>{isCorrect ? 'Correct! 🚀' : 'Not quite!'}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-200">{question.explanation}</p>
              {relatedMission && (
                <Link to={`/missions/${relatedMission.id}`} className="mt-2 inline-flex items-center gap-1 text-sm text-nebula-300 hover:text-white">
                  Learn more about {relatedMission.shortName} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button className="btn-ghost text-slate-400" onClick={quiz.restart}>
              <RotateCcw className="h-4 w-4" aria-hidden /> Restart
            </button>
            <button className="btn-primary" disabled={!answered} onClick={quiz.next}>
              {index === total - 1 ? 'See results' : 'Next question'} <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
