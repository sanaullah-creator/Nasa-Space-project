/* Simplified, illustrative surface features for the planetary basemaps.
 * Centres are approximate published coordinates; shapes are artistic ellipses,
 * NOT accurate outlines. lat/lon in degrees, rx/ry in degrees. */

export interface BasemapFeature {
  name: string;
  lat: number;
  lon: number;
  rx: number;
  ry: number;
  tone: 'dark' | 'light' | 'ice' | 'volcano' | 'canyon';
  rotate?: number;
  label?: boolean;
}

export const MOON_FEATURES: BasemapFeature[] = [
  { name: 'Oceanus Procellarum', lat: 18.4, lon: -57.4, rx: 22, ry: 28, tone: 'dark', label: true },
  { name: 'Mare Imbrium', lat: 32.8, lon: -15.6, rx: 17, ry: 13, tone: 'dark', label: true },
  { name: 'Mare Serenitatis', lat: 28, lon: 17.5, rx: 9, ry: 8, tone: 'dark', label: true },
  { name: 'Mare Tranquillitatis', lat: 8.5, lon: 31.4, rx: 11, ry: 9, tone: 'dark', label: true },
  { name: 'Mare Crisium', lat: 17, lon: 59.1, rx: 7, ry: 6, tone: 'dark', label: true },
  { name: 'Mare Fecunditatis', lat: -7.8, lon: 51.3, rx: 8, ry: 9, tone: 'dark' },
  { name: 'Mare Nubium', lat: -21.3, lon: -16.6, rx: 10, ry: 8, tone: 'dark', label: true },
  { name: 'Mare Humorum', lat: -24.4, lon: -38.6, rx: 5, ry: 5, tone: 'dark' },
  { name: 'Mare Nectaris', lat: -15.2, lon: 35.5, rx: 5, ry: 5, tone: 'dark' },
  { name: 'Mare Frigoris', lat: 56, lon: 1.4, rx: 38, ry: 4, tone: 'dark' },
  { name: 'Mare Moscoviense', lat: 27.3, lon: 147.9, rx: 4, ry: 4, tone: 'dark', label: true },
  { name: 'South Pole–Aitken Basin', lat: -53, lon: -169, rx: 26, ry: 18, tone: 'light', label: true },
  { name: 'Tycho', lat: -43.3, lon: -11.2, rx: 2, ry: 2, tone: 'light', label: true },
  { name: 'Copernicus', lat: 9.6, lon: -20.1, rx: 2, ry: 2, tone: 'light' },
];

export const MARS_FEATURES: BasemapFeature[] = [
  { name: 'Acidalia Planitia', lat: 46.7, lon: -22, rx: 16, ry: 10, tone: 'dark', label: true },
  { name: 'Syrtis Major', lat: 8.4, lon: 69.5, rx: 8, ry: 12, tone: 'dark', label: true },
  { name: 'Mare Erythraeum', lat: -25, lon: -40, rx: 22, ry: 9, tone: 'dark' },
  { name: 'Terra Cimmeria', lat: -34, lon: 145, rx: 30, ry: 10, tone: 'dark' },
  { name: 'Utopia Planitia', lat: 46.7, lon: 117.5, rx: 22, ry: 12, tone: 'light', label: true },
  { name: 'Hellas Planitia', lat: -42.4, lon: 70.5, rx: 18, ry: 12, tone: 'light', label: true },
  { name: 'Argyre Planitia', lat: -49.7, lon: -43.4, rx: 9, ry: 7, tone: 'light', label: true },
  { name: 'Olympus Mons', lat: 18.65, lon: -133.8, rx: 6, ry: 6, tone: 'volcano', label: true },
  { name: 'Arsia Mons', lat: -8.3, lon: -120.1, rx: 3, ry: 3, tone: 'volcano' },
  { name: 'Pavonis Mons', lat: 1.5, lon: -113, rx: 3, ry: 3, tone: 'volcano' },
  { name: 'Ascraeus Mons', lat: 11.8, lon: -104.5, rx: 3, ry: 3, tone: 'volcano', label: true },
  { name: 'Elysium Mons', lat: 25, lon: 147.2, rx: 4, ry: 4, tone: 'volcano', label: true },
  { name: 'Valles Marineris', lat: -13.9, lon: -59.2, rx: 22, ry: 2.2, tone: 'canyon', rotate: -6, label: true },
];

export const PLANET_STYLE = {
  moon: {
    base: ['#a7adb7', '#8c929c'],
    dark: '#555b66',
    light: '#c9ced6',
    grid: 'rgba(255,255,255,0.08)',
    polar: null as string | null,
  },
  mars: {
    base: ['#c4643b', '#9b4426'],
    dark: '#6e2c18',
    light: '#e09a6c',
    grid: 'rgba(255,255,255,0.08)',
    polar: '#f3ece6',
  },
};
