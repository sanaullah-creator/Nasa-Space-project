import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Clock, Compass, Map, Palette, Radio, Rocket, Satellite, Sparkles } from 'lucide-react';
import { missions } from '../data/missions';
import { MissionCard } from '../components/missions/MissionCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { DidYouKnow } from '../components/ui/DidYouKnow';
import { STATUS_META, TRAVELLING_META } from '../utils/status';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { MissionStatus } from '../types';

const FEATURED = ['opportunity', 'voyager-1', 'apollo-lunar-roving-vehicle'];

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Mars horizon */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -right-24 -top-6 h-64 w-64 rounded-full bg-gradient-to-br from-mars-300 via-mars-600 to-[#3b0f06] opacity-80 planet-glow animate-float sm:-right-24 sm:top-10 sm:h-[34rem] sm:w-[34rem] sm:opacity-100 lg:right-0" />
        <div className="absolute -right-24 -top-6 h-64 w-64 rounded-full sm:-right-24 sm:top-10 sm:h-[34rem] sm:w-[34rem] lg:right-0" style={{ background: 'radial-gradient(circle at 70% 60%, rgba(0,0,0,0.0), rgba(0,0,0,0.55) 70%)' }} />
        {/* orbit rings */}
        <div className="absolute -right-64 top-[-6rem] h-[52rem] w-[52rem] animate-orbit-slow rounded-full border border-nebula-400/15 sm:-right-48 lg:-right-24">
          <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200 moon-glow" />
        </div>
        <div className="absolute -right-80 top-[-12rem] h-[64rem] w-[64rem] animate-orbit rounded-full border border-white/5 sm:-right-60 lg:-right-40">
          <span className="absolute bottom-[14%] left-[8%] h-2 w-2 rounded-full bg-nebula-300 shadow-[0_0_12px_#9fd3ff]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-space-900 to-transparent" />
        <svg className="absolute inset-x-0 bottom-0 h-40 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path d="M0 110 Q 240 60 480 96 T 960 86 T 1440 100 V160 H0Z" fill="#3a140b" opacity="0.7" />
          <path d="M0 130 Q 300 100 720 124 T 1440 120 V160 H0Z" fill="#050816" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pb-36 lg:pt-32">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-mars-400/30 bg-mars-500/10 px-3 py-1.5">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> NASA SPACE APPS CHALLENGE · COSMIC SPACE MUSEUM
          </p>
          <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Abandoned</span>
            <br />
            but not <span className="text-gradient-blue">Forgotten.</span>
          </h1>
          <p className="mt-6 font-heading text-xl font-semibold text-white/90 sm:text-2xl">
            Every Machine Has a Mission. Every Mission Has a Story.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Step inside COSMIC LOST &amp; FOUND and meet the robots, rovers and spacecraft humanity sent to the Moon, to Mars and
            beyond — what they discovered, how their missions ended, and where they are right now.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/explore" className="btn-primary px-7 py-3.5 text-base">
              <Rocket className="h-5 w-5" aria-hidden /> Explore Lost Missions
            </Link>
            <Link to="/map" className="btn-secondary px-7 py-3.5 text-base">
              <Map className="h-5 w-5" aria-hidden /> Open the Space Map
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const count = (s: MissionStatus) => missions.filter((m) => m.status === s).length;
  const stats = [
    { value: missions.length, label: 'Mission profiles', color: '#fff' },
    { value: 3, label: 'Destinations: Moon, Mars, Deep Space', color: '#9fd3ff' },
    { value: count('active'), label: 'Still active today', color: STATUS_META.active.color },
    { value: missions.filter((m) => m.travelling).length, label: 'Still travelling outward', color: TRAVELLING_META.color },
    { value: `${new Date().getFullYear() - 1966}+`, label: 'Years of history (since 1966)', color: '#ffb08a' },
  ];
  return (
    <section className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Museum statistics">
      <dl className="glass grid grid-cols-2 divide-white/10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col p-5 text-center sm:p-6">
            <dt className="order-2 mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</dt>
            <dd className="order-1 font-display text-3xl font-black sm:text-4xl" style={{ color: s.color }}>
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const HIGHLIGHTS = [
  { to: '/explore', icon: Compass, title: 'Mission Catalogue', text: 'Search and filter 15 machines by world and status.', color: '#f97350' },
  { to: '/map', icon: Map, title: 'Interactive Space Map', text: 'Click landing sites on illustrated maps of the Moon and Mars.', color: '#34d399' },
  { to: '/timeline', icon: Clock, title: 'Mission Time Machine', text: 'Travel from 1966 to today and watch history unfold.', color: '#fbbf24' },
  { to: '/where-are-they-now', icon: Satellite, title: 'Where Are They Now?', text: 'See the current location and status of every machine.', color: '#a78bfa' },
  { to: '/quiz', icon: Brain, title: 'Knowledge Quiz', text: 'Test yourself, get explanations and earn badges.', color: '#60a5fa' },
  { to: '/patch-lab', icon: Palette, title: 'Build Your Mission Patch', text: 'Design and download your own explorer badge.', color: '#f472b6' },
];

export function HomePage() {
  useDocumentTitle('');
  const featured = FEATURED.map((id) => missions.find((m) => m.id === id)!).filter(Boolean);

  return (
    <>
      <Hero />
      <Stats />

      {/* intro */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <SectionHeading
          eyebrow="Welcome, explorer"
          title={
            <>
              Not every machine comes home. <span className="text-mars-400">That doesn&apos;t mean it&apos;s lost.</span>
            </>
          }
          description="Six Lunar Module descent stages, three lunar rovers, five Surveyor landers, silent rovers on Mars and probes drifting between the stars — some were left behind on purpose, some wore out after heroic careers, and some are still sending data today."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: BookOpen, title: 'Real science', text: 'Facts, dates and coordinates checked against NASA sources, with links on every page.' },
            { icon: Radio, title: 'Robot stories', text: 'Creative first-person stories — clearly labelled — that bring each machine to life.' },
            { icon: Satellite, title: 'Honest statuses', text: 'Active, mission ended, inactive, silent, left behind or still travelling — never just "abandoned".' },
            { icon: Sparkles, title: 'Learn by playing', text: 'Quiz, badges, a time machine and a patch designer. Progress saves in your browser.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass p-5">
              <Icon className="h-6 w-6 text-nebula-300" aria-hidden />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* featured */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Featured exhibits" title="Meet three legends" />
          <Link to="/explore" className="btn-ghost text-nebula-300">
            See all {missions.length} missions <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((m, i) => (
            <MissionCard key={m.id} mission={m} index={i} />
          ))}
        </div>
      </section>

      {/* highlights */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Educational highlights" title="Six ways to explore the museum" align="center" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map(({ to, icon: Icon, title, text, color }) => (
            <Link key={to} to={to} className="glass card-hover group relative overflow-hidden p-6">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition group-hover:opacity-40" style={{ background: color }} aria-hidden />
              <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${color}22`, color }}>
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-slate-400">{text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color }}>
                Start <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <DidYouKnow />
      </section>
    </>
  );
}
