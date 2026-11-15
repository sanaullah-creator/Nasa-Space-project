import { ExternalLink, GraduationCap, Heart, Image as ImageIcon, Info, Rocket, ShieldCheck, Target } from 'lucide-react';
import { missions } from '../data/missions';
import { generalSources } from '../data/sources';
import { PageHeader } from '../components/ui/SectionHeading';
import { STATUS_META, TRAVELLING_META } from '../utils/status';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function AboutPage() {
  useDocumentTitle('About & Sources');
  return (
    <>
      <PageHeader
        eyebrow="About & sources"
        title="Why we built COSMIC LOST & FOUND"
        description="An interactive museum for school-age visitors and young space fans, created for the NASA Space Apps Challenge theme “Abandoned but not Forgotten”."
      />
      <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Target,
              title: 'Project purpose',
              text: 'To tell the stories of NASA machines left on the Moon, on Mars and in deep space — what they were, what they found, how they ended and where they are now.',
            },
            {
              icon: GraduationCap,
              title: 'Educational goals',
              text: 'Help young learners understand planetary science, engineering trade-offs and the history of exploration — and practise checking facts against real sources.',
            },
            {
              icon: Rocket,
              title: 'Space Apps connection',
              text: 'Built in response to the NASA Space Apps Challenge prompt "Abandoned but not Forgotten", using publicly available NASA information.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <section key={title} className="glass p-6">
              <Icon className="h-7 w-7 text-mars-400" aria-hidden />
              <h2 className="mt-3 text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
            </section>
          ))}
        </div>

        <section className="glass p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden /> Our accuracy promise
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            <li>• Dates, discoveries and mission endings were checked against NASA, JPL, APL and NSSDCA pages (linked on every mission page). Current statuses were checked in November 2026.</li>
            <li>• Not everything is "abandoned". We use six honest labels:</li>
          </ul>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {[...Object.values(STATUS_META), TRAVELLING_META].map((s) => (
              <li key={s.label} className="flex items-start gap-2 rounded-lg bg-white/[0.03] p-3 text-sm">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} aria-hidden />
                <span>
                  <strong className="text-white">{s.label}</strong> — <span className="text-slate-400">{s.description}</span>
                </span>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            <li>• Map coordinates are approximate and rounded. Surface features on the maps are simplified illustrations.</li>
            <li>
              • Every "Robot&apos;s Last Message" is <strong className="text-amber-200">creative storytelling written for this museum</strong>. Robots send data, not
              sentences — none of these are real transmissions.
            </li>
          </ul>
        </section>

        <section className="glass p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ImageIcon className="h-5 w-5 text-nebula-300" aria-hidden /> Images & credits
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Mission photos and artist&apos;s concepts come from NASA, NASA/JPL-Caltech, NASA Ames and their partners, credited below and on every
            mission page. NASA imagery is generally not subject to copyright in the United States, but NASA asks that it be credited and not used
            to imply endorsement. Images marked &ldquo;artist&apos;s concept&rdquo; are illustrations by NASA, not photographs. If a photo can&apos;t load,
            the site shows an original illustration made for this museum instead. Team portraits on the Credits page belong to the team members.
          </p>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {missions
              .filter((m) => m.image)
              .map((m) => (
                <li key={m.id} className="text-xs leading-relaxed text-slate-400">
                  <span className="font-semibold text-slate-200">{m.shortName}:</span>{' '}
                  <a href={m.image!.sourceUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                    {m.image!.credit}
                  </a>
                </li>
              ))}
          </ul>
        </section>

        <section className="glass p-6 sm:p-8">
          <h2 className="text-xl font-bold">Data sources & scientific references</h2>
          <h3 className="mt-5 text-sm font-bold uppercase tracking-wider text-slate-400">General references</h3>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {generalSources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 text-sm text-nebula-300 hover:text-white hover:underline">
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> {s.label}
                </a>
              </li>
            ))}
          </ul>
          <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-400">Mission-specific references</h3>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            {missions.map((m) => (
              <div key={m.id}>
                <p className="text-sm font-semibold text-white">{m.name}</p>
                <ul className="mt-1 space-y-1">
                  {m.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-white hover:underline">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="flex gap-3 rounded-2xl border border-amber-300/25 bg-amber-400/5 p-5 text-sm leading-relaxed text-amber-100/90">
          <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>
            <strong>Disclaimer:</strong> COSMIC LOST &amp; FOUND is an independent student/educational project. It is not affiliated with,
            sponsored by or endorsed by NASA or any NASA centre. The NASA name is used only to identify the missions and sources described.
          </p>
        </section>
        <p className="flex items-center justify-center gap-2 text-sm text-slate-500">
          Made with <Heart className="h-4 w-4 text-mars-400" aria-label="love" /> for every machine that never came home.
        </p>
      </div>
    </>
  );
}
