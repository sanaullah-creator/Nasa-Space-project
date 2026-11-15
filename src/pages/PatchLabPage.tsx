import { useRef, useState } from 'react';
import { Check, Download, Image as ImageIcon, Save, Shuffle } from 'lucide-react';
import { MissionPatch, PATCH_THEMES } from '../components/ui/MissionPatch';
import { PageHeader } from '../components/ui/SectionHeading';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useProgress } from '../hooks/ProgressContext';
import { useUserScopedKey } from '../hooks/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { downloadPng, downloadSvg } from '../utils/exportSvg';
import { cx } from '../utils/format';
import type { PatchDesign } from '../types';

const DEFAULT: PatchDesign = { shape: 'circle', theme: 'mars', emblem: 'rover', missionName: 'Red Planet Rover', explorerName: 'Explorer', stars: 3 };

const SHAPES: { id: PatchDesign['shape']; label: string }[] = [
  { id: 'circle', label: 'Circle' },
  { id: 'shield', label: 'Shield' },
  { id: 'hexagon', label: 'Hexagon' },
];
const EMBLEMS: { id: PatchDesign['emblem']; label: string }[] = [
  { id: 'rocket', label: 'Rocket' },
  { id: 'rover', label: 'Rover' },
  { id: 'planet', label: 'Planet' },
  { id: 'satellite', label: 'Spacecraft' },
  { id: 'helicopter', label: 'Helicopter' },
];
const NAMES = ['Lunar Pathfinder', 'Red Dust Rover', 'Beyond Neptune', 'Golden Record', 'Ice Giant Explorer', 'Crater Scout', 'Olympus Climber'];

const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

export function PatchLabPage() {
  useDocumentTitle('Patch Lab');
  const [saved, setSaved] = useLocalStorage<PatchDesign>(useUserScopedKey('patch'), DEFAULT);
  const [design, setDesign] = useState<PatchDesign>(saved);
  const [message, setMessage] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const { unlock } = useProgress();

  const set = <K extends keyof PatchDesign>(key: K, value: PatchDesign[K]) => setDesign((d) => ({ ...d, [key]: value }));
  const flash = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 2500);
  };
  const filename = (ext: string) => `${(design.missionName || 'mission-patch').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`;

  const save = () => {
    setSaved(design);
    unlock('patch-designer');
    flash('Patch saved to this browser!');
  };
  const exportSvg = () => {
    if (!svgRef.current) return;
    downloadSvg(svgRef.current, filename('svg'));
    unlock('patch-designer');
    flash('SVG downloaded');
  };
  const exportPng = async () => {
    if (!svgRef.current) return;
    try {
      await downloadPng(svgRef.current, filename('png'));
      unlock('patch-designer');
      flash('PNG downloaded');
    } catch {
      flash('PNG export failed — try the SVG download instead.');
    }
  };
  const randomize = () =>
    setDesign((d) => ({
      ...d,
      shape: pick(SHAPES).id,
      emblem: pick(EMBLEMS).id,
      theme: pick(Object.keys(PATCH_THEMES) as PatchDesign['theme'][]),
      missionName: pick(NAMES),
      stars: 1 + Math.floor(Math.random() * 5),
    }));

  return (
    <>
      <PageHeader
        eyebrow="Build your own mission patch"
        title="Patch Lab"
        description="Every NASA crew designs a patch for their mission. Now it's your turn — design a badge for your own space exploration mission, then save or download it."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div className="glass flex flex-col items-center justify-center gap-6 p-8">
          <div className="w-full max-w-[22rem] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <MissionPatch ref={svgRef} design={design} />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button className="btn-primary" onClick={save}>
              <Save className="h-4 w-4" aria-hidden /> Save patch
            </button>
            <button className="btn-secondary" onClick={exportPng}>
              <ImageIcon className="h-4 w-4" aria-hidden /> Download PNG
            </button>
            <button className="btn-secondary" onClick={exportSvg}>
              <Download className="h-4 w-4" aria-hidden /> Download SVG
            </button>
          </div>
          <p className="h-5 text-sm text-emerald-300" role="status" aria-live="polite">
            {message && (
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4" aria-hidden /> {message}
              </span>
            )}
          </p>
        </div>

        <form className="glass space-y-6 p-6 sm:p-8" onSubmit={(e) => (e.preventDefault(), save())}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-300">Mission name</span>
              <input className="input" maxLength={22} value={design.missionName} onChange={(e) => set('missionName', e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-300">Explorer name</span>
              <input className="input" maxLength={20} value={design.explorerName} onChange={(e) => set('explorerName', e.target.value)} placeholder="Your first name" />
              <span className="mt-1 block text-xs text-slate-500">Tip: use a first name or nickname only.</span>
            </label>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-slate-300">Patch shape</legend>
            <div className="flex flex-wrap gap-2">
              {SHAPES.map((s) => (
                <button type="button" key={s.id} className={cx('chip', design.shape === s.id && 'chip-active')} aria-pressed={design.shape === s.id} onClick={() => set('shape', s.id)}>
                  {s.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-slate-300">Colour theme</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PATCH_THEMES) as PatchDesign['theme'][]).map((t) => (
                <button type="button" key={t} className={cx('chip', design.theme === t && 'chip-active')} aria-pressed={design.theme === t} onClick={() => set('theme', t)}>
                  <span className="h-3 w-3 rounded-full" style={{ background: `linear-gradient(135deg, ${PATCH_THEMES[t].bg[0]}, ${PATCH_THEMES[t].bg[1]})` }} aria-hidden />
                  {PATCH_THEMES[t].label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-slate-300">Emblem</legend>
            <div className="flex flex-wrap gap-2">
              {EMBLEMS.map((em) => (
                <button type="button" key={em.id} className={cx('chip', design.emblem === em.id && 'chip-active')} aria-pressed={design.emblem === em.id} onClick={() => set('emblem', em.id)}>
                  {em.label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-1.5 flex justify-between text-sm font-semibold text-slate-300">
              Stars <span className="text-slate-500">{design.stars}</span>
            </span>
            <input type="range" min={0} max={7} value={design.stars} onChange={(e) => set('stars', Number(e.target.value))} className="w-full accent-mars-500" />
          </label>

          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
            <button type="button" className="btn-secondary" onClick={randomize}>
              <Shuffle className="h-4 w-4" aria-hidden /> Surprise me
            </button>
            <button type="button" className="btn-ghost" onClick={() => setDesign(DEFAULT)}>
              Reset design
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
