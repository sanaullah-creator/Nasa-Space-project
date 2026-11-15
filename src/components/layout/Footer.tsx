import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Logo, NAV_LINKS } from './Navbar';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-space-950/70 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Every Machine Has a Mission. Every Mission Has a Story. An interactive space museum created for the NASA Space Apps
            Challenge — <em>Abandoned but not Forgotten</em>.
          </p>
          <p className="max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-slate-500">
            This is an independent educational project. It is not affiliated with, sponsored by or endorsed by NASA. Robot "last
            messages" are creative storytelling, not real transmissions.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-300">Explore</h2>
          <ul className="grid gap-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-slate-400 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/achievements" className="text-slate-400 hover:text-white">
                Achievements
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-300">Official sources</h2>
          <ul className="grid gap-2 text-sm">
            {[
              ['NASA Science', 'https://science.nasa.gov/'],
              ['NASA JPL', 'https://www.jpl.nasa.gov/'],
              ['NSSDCA Archive', 'https://nssdc.gsfc.nasa.gov/'],
              ['NASA Image Library', 'https://images.nasa.gov/'],
              ['NASA Space Apps', 'https://www.spaceappschallenge.org/'],
            ].map(([label, url]) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white">
                  {label} <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} COSMIC LOST &amp; FOUND · Built with React, TypeScript &amp; Tailwind CSS · Mission data checked against
        NASA sources, Nov 2026
      </div>
    </footer>
  );
}
