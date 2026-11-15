import type { Mission, MissionImage } from '../types';
import missionImages from './missionImages.json';

/* ==================================================================
 * MISSION PROFILES
 * ------------------------------------------------------------------
 * Facts are drawn from NASA / NSSDCA / JPL / APL sources listed in each
 * record's `sources`. Status information was checked in November 2026.
 * Coordinates are APPROXIMATE (rounded to ~0.01°) and are only used to
 * place markers on an illustrated map.
 *
 * `lastMessage` is CREATIVE STORYTELLING written for this museum.
 * It is NOT a real transmission from any spacecraft.
 * ================================================================== */

const NSSDCA = (id: string) => `https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=${id}`;

const rawMissions: Mission[] = [
  /* ------------------------------ MOON ------------------------------ */
  {
    id: 'apollo-lm-descent-stages',
    name: 'Apollo Lunar Module Descent Stages',
    shortName: 'LM Descent Stages',
    destination: 'moon',
    status: 'left-behind',
    travelling: false,
    statusNote: 'Six descent stages were intentionally left on the Moon as launch platforms.',
    hardware: 'descent-stage',
    program: 'Apollo 11, 12, 14, 15, 16, 17',
    tagline: 'The launch pads that stayed behind.',
    launchDate: '1969-07-16',
    operations: 'July 1969 – December 1972',
    activeFrom: 1969,
    activeTo: 1972,
    summary:
      'Every crewed Apollo landing used a two-part Lunar Module. The lower half — the descent stage — carried the astronauts down to the surface and then served as the launch pad for the upper ascent stage. Six descent stages still stand on the Moon today.',
    whatItWas:
      'The bottom section of the Apollo Lunar Module: a gold-foil-wrapped, eight-sided frame with four landing legs, a throttleable rocket engine, fuel tanks and storage bays for experiments and tools.',
    whySent:
      'NASA needed a vehicle that could land two astronauts gently on the Moon, store their equipment, and then act as a stable platform for their return launch to lunar orbit.',
    objectives: [
      'Land two astronauts safely on the lunar surface.',
      'Carry science experiments, tools and (on later missions) the Lunar Roving Vehicle.',
      'Serve as the launch platform for the ascent stage at the end of each moonwalk period.',
    ],
    story:
      'On 20 July 1969, the Apollo 11 Lunar Module "Eagle" touched down in the Sea of Tranquility with only seconds of hover fuel to spare, as Neil Armstrong steered past a boulder field. After Armstrong and Buzz Aldrin finished their moonwalk, the ascent stage fired its engine and lifted off, using the descent stage beneath it as a launch pad. The descent stage stayed behind — still carrying a plaque on its leg. Five more crews repeated the process, the last being Apollo 17 at Taurus-Littrow in December 1972.',
    discoveries: [
      'Enabled the collection of 382 kg (842 lb) of Moon rocks and soil across six landings, which showed the Moon formed from material closely related to Earth.',
      'Carried the experiments that revealed moonquakes and the Moon\'s layered interior.',
    ],
    achievements: [
      'Six successful crewed landings between 1969 and 1972.',
      'First human landing on another world (Apollo 11, 20 July 1969).',
      'Apollo 11\'s descent stage carries a plaque reading "We came in peace for all mankind."',
    ],
    challenges: [
      'During Apollo 11\'s landing, computer alarms sounded and Armstrong had to fly manually past a boulder field.',
      'Every gram counted: the descent stage had to be strong enough to land yet light enough for a Saturn V to launch it.',
    ],
    ending:
      'Each descent stage did its job once: it landed, worked as a base camp and launch pad, and was intentionally left behind when the ascent stage lifted off.',
    whereNow:
      'Six descent stages stand at the Apollo 11, 12, 14, 15, 16 and 17 landing sites. NASA\'s Lunar Reconnaissance Orbiter has photographed them from orbit, along with astronaut footpaths and rover tracks.',
    whyItMatters:
      'These are among the most important artifacts of human history — physical proof of the first time people travelled to another world. Future explorers may treat them as protected heritage sites.',
    sites: [
      { lat: 0.67, lon: 23.47, label: 'Apollo 11 — Tranquility Base', note: 'Lunar Module "Eagle" · landed 20 Jul 1969' },
      { lat: -3.01, lon: -23.42, label: 'Apollo 12 — Ocean of Storms', note: 'Lunar Module "Intrepid" · landed 19 Nov 1969' },
      { lat: -3.65, lon: -17.47, label: 'Apollo 14 — Fra Mauro', note: 'Lunar Module "Antares" · landed 5 Feb 1971' },
      { lat: 26.13, lon: 3.63, label: 'Apollo 15 — Hadley-Apennine', note: 'Lunar Module "Falcon" · landed 30 Jul 1971' },
      { lat: -8.97, lon: 15.5, label: 'Apollo 16 — Descartes Highlands', note: 'Lunar Module "Orion" · landed 21 Apr 1972' },
      { lat: 20.19, lon: 30.77, label: 'Apollo 17 — Taurus-Littrow', note: 'Lunar Module "Challenger" · landed 11 Dec 1972' },
    ],
    lastMessage:
      'I was built to fall gently. That was my whole purpose — to catch two people from the sky and set them down on grey dust nobody had ever touched. When the engine above me roared and my upper half rose toward the stars, I stayed. That was the plan all along. I am a launch pad now, and a monument. There are footprints around my legs that will last longer than mountains on Earth. If you ever come to visit, step carefully. I am holding history in place.',
    facts: [
      'Apollo 13\'s Lunar Module "Aquarius" never landed — it became a lifeboat for the crew after an oxygen tank exploded.',
      'Without wind or rain, the astronauts\' footprints around the descent stages can last for a very long time.',
    ],
    timeline: [
      { date: '1969-07-20', type: 'landing', title: 'Eagle has landed', description: 'Apollo 11 lands in the Sea of Tranquility — the first crewed landing on another world.' },
      { date: '1969-11-19', type: 'landing', title: 'Apollo 12 pinpoint landing', description: 'Intrepid lands within walking distance of the robotic Surveyor 3 lander.' },
      { date: '1972-12-14', type: 'end', title: 'Last liftoff from the Moon', description: 'Apollo 17\'s ascent stage lifts off, leaving the sixth and final descent stage at Taurus-Littrow.' },
      { date: '2011-09-06', type: 'event', title: 'Seen from orbit', description: 'NASA releases sharp Lunar Reconnaissance Orbiter images of Apollo sites showing descent stages and astronaut tracks.' },
    ],
    sources: [
      { label: 'NASA — Apollo 11 Mission Overview', url: 'https://www.nasa.gov/mission/apollo-11/' },
      { label: 'NSSDCA — Apollo Lunar Landings', url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo.html' },
      { label: 'NASA Science — Lunar Reconnaissance Orbiter', url: 'https://science.nasa.gov/mission/lro/' },
    ],
  },
  {
    id: 'apollo-lunar-roving-vehicle',
    name: 'Apollo Lunar Roving Vehicle',
    shortName: 'Lunar Rover',
    destination: 'moon',
    status: 'left-behind',
    travelling: false,
    statusNote: 'Three rovers were parked and left on the Moon by Apollo 15, 16 and 17.',
    hardware: 'lunar-rover',
    program: 'Apollo 15, 16, 17',
    tagline: 'The first car driven on another world.',
    launchDate: '1971-07-26',
    operations: 'July 1971 – December 1972',
    activeFrom: 1971,
    activeTo: 1972,
    summary:
      'The Lunar Roving Vehicle (LRV) was a battery-powered, four-wheel buggy that folded up inside the Lunar Module. It let astronauts drive kilometres away from their landing site, carrying tools, cameras and rock samples.',
    whatItWas:
      'A lightweight electric vehicle with wire-mesh wheels, two seats, a TV camera and a high-gain antenna. Each wheel had its own small electric motor, powered by non-rechargeable batteries.',
    whySent:
      'Walking in a spacesuit is slow and tiring. A rover let the last three Apollo crews explore far more ground, reach geologically interesting places and bring home a wider variety of samples.',
    objectives: [
      'Extend the range of lunar exploration far beyond walking distance.',
      'Carry tools, sample bags and cameras.',
      'Broadcast live colour TV to Earth, controlled remotely from Mission Control.',
    ],
    story:
      'Folded like a piece of origami against the side of the Lunar Module, the rover was unfolded by pulling on tapes. Apollo 15\'s Dave Scott and Jim Irwin drove it to the edge of Hadley Rille. On Apollo 17, a fender was accidentally broken; the astronauts fixed it with laminated maps, duct tape and clamps to stop sprays of dust. Before each final liftoff, the crew parked the rover so its TV camera — steered by an operator in Houston — could film the ascent stage launching from the Moon.',
    discoveries: [
      'Allowed crews to sample many more locations, including the edge of Hadley Rille (Apollo 15) and the Taurus-Littrow valley (Apollo 17).',
      'Rover trips reached sites like Spur crater, where Apollo 15 found the "Genesis Rock", and Shorty crater, where Apollo 17 found orange volcanic glass.',
    ],
    achievements: [
      'About 90 km (56 mi) driven in total across the three missions.',
      'First crewed vehicle driven on another world (Apollo 15, 31 July 1971).',
      'Televised the liftoffs of the Apollo 15, 16 and 17 ascent stages.',
    ],
    challenges: [
      'Lunar dust is abrasive and clingy; losing a fender meant astronauts were sprayed with it.',
      'Astronauts had to stay within walking distance of the Lunar Module in case the rover broke down.',
    ],
    ending:
      'At the end of each mission the rover was parked a short distance from the Lunar Module and intentionally left behind — bringing it home would have been far too heavy.',
    whereNow:
      'Three rovers remain parked near the Apollo 15, 16 and 17 landing sites. Their tracks are visible in Lunar Reconnaissance Orbiter images.',
    whyItMatters:
      'The LRV proved that vehicles could help humans explore other worlds — an idea NASA is building on for future crewed lunar rovers.',
    sites: [
      { lat: 26.13, lon: 3.63, label: 'Apollo 15 rover — Hadley-Apennine', note: 'First rover driven on the Moon · 1971' },
      { lat: -8.97, lon: 15.5, label: 'Apollo 16 rover — Descartes Highlands', note: 'Explored the lunar highlands · 1972' },
      { lat: 20.19, lon: 30.77, label: 'Apollo 17 rover — Taurus-Littrow', note: 'Longest Apollo rover traverses · 1972' },
    ],
    lastMessage:
      'They folded me up like a paper map and bolted me to the side of a spaceship. When they pulled the tapes and my wheels touched the Moon, I was the first car on another world. I carried two astronauts across hills where no one had ever been. One of them fixed my broken fender with tape and an old map — I still wear it. My last job was the most beautiful: I watched them leave, and I sent the picture home.',
    facts: [
      'The rover\'s wheels were made of woven zinc-coated piano wire, because rubber tyres would not survive the Moon\'s temperatures.',
      'The rover had a mass of about 210 kg (460 lb). In the Moon\'s weak gravity it weighed only about one-sixth as much as on Earth.',
    ],
    timeline: [
      { date: '1971-07-31', type: 'event', title: 'First drive on the Moon', description: 'Apollo 15 astronauts drive the Lunar Roving Vehicle for the first time.' },
      { date: '1972-04-21', type: 'landing', title: 'Rover in the highlands', description: 'Apollo 16 lands with the second rover in the Descartes Highlands.' },
      { date: '1972-12-11', type: 'landing', title: 'The last rover arrives', description: 'Apollo 17 lands at Taurus-Littrow with the third and final Apollo rover.' },
    ],
    sources: [
      { label: 'NSSDCA — The Apollo Lunar Roving Vehicle', url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html' },
      { label: 'NSSDCA — Apollo Lunar Landings', url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo.html' },
    ],
  },
  {
    id: 'apollo-scientific-instruments',
    name: 'Apollo Scientific Instruments (ALSEP & Retroreflectors)',
    shortName: 'Apollo Instruments',
    destination: 'moon',
    status: 'inactive',
    travelling: false,
    statusNote: 'ALSEP stations were switched off in 1977 — but the passive laser retroreflectors are still used today.',
    hardware: 'instruments',
    program: 'Apollo 11, 12, 14, 15, 16, 17',
    tagline: 'Science stations that kept listening to the Moon.',
    launchDate: '1969-07-16',
    operations: '1969 – 1977 (retroreflectors still in use)',
    activeFrom: 1969,
    activeTo: 1977,
    summary:
      'Apollo astronauts set up nuclear-powered science stations called ALSEP (Apollo Lunar Surface Experiments Package) and simple mirror arrays called laser retroreflectors. They kept sending data long after the astronauts went home.',
    whatItWas:
      'ALSEP was a set of instruments — seismometers, magnetometers, heat-flow probes and particle detectors — wired to a central station powered by a radioisotope generator. Retroreflectors are panels of precision glass prisms that bounce laser light straight back to where it came from.',
    whySent:
      'Astronauts could only stay for a few days. Automated stations allowed scientists to keep studying moonquakes, heat flow, the solar wind and the Moon\'s orbit for years.',
    objectives: [
      'Measure moonquakes and meteorite impacts to study the Moon\'s interior.',
      'Measure heat flowing out of the Moon (Apollo 15 and 17).',
      'Provide mirror targets so observatories on Earth could measure the Earth–Moon distance with lasers.',
    ],
    story:
      'Apollo 11 left a simple seismometer and the first laser retroreflector. Later crews deployed full ALSEP stations. For up to eight years, the network quietly recorded the Moon shaking from quakes and impacts, including the deliberate impacts of spent rocket stages. In 1977, NASA switched the stations off to save money. But the mirrors never needed power: observatories on Earth still fire lasers at the Apollo 11, 14 and 15 retroreflectors and time the reflected light.',
    discoveries: [
      'Detected thousands of moonquakes, showing that the Moon is still slightly geologically active.',
      'Seismic data revealed the Moon has a crust, mantle and core.',
      'Laser ranging shows the Moon is slowly moving away from Earth by about 3.8 cm (1.5 in) per year.',
      'Lunar laser ranging has been used to test Einstein\'s theory of general relativity with high precision.',
    ],
    achievements: [
      'Among the longest-running scientific experiments in history — the retroreflectors have been used for more than 55 years.',
      'Created the first network of seismometers on another world.',
    ],
    challenges: [
      'Astronauts had to deploy delicate equipment in bulky gloves; on Apollo 16 a cable was accidentally snapped, ending the heat-flow experiment.',
      'Lunar dust and extreme day/night temperature swings affected instrument performance.',
    ],
    ending:
      'NASA turned off the ALSEP stations on 30 September 1977 because of budget limits. The passive retroreflectors were never "switched off" — they need no power.',
    whereNow:
      'ALSEP equipment remains at the Apollo 12, 14, 15, 16 and 17 sites. Retroreflectors remain at the Apollo 11, 14 and 15 sites and are still targeted by laser-ranging observatories.',
    whyItMatters:
      'Some Apollo science is still happening today. Every laser pulse that returns from the Moon is a reminder that "abandoned" hardware can keep teaching us for generations.',
    sites: [
      { lat: 0.67, lon: 23.47, label: 'Apollo 11 — Retroreflector & seismometer', note: 'Retroreflector still used for laser ranging' },
      { lat: -3.01, lon: -23.42, label: 'Apollo 12 — ALSEP', note: 'First full ALSEP station · 1969' },
      { lat: -3.65, lon: -17.47, label: 'Apollo 14 — ALSEP & retroreflector', note: 'Retroreflector still used for laser ranging' },
      { lat: 26.13, lon: 3.63, label: 'Apollo 15 — ALSEP & large retroreflector', note: 'Largest Apollo retroreflector — still in use' },
      { lat: -8.97, lon: 15.5, label: 'Apollo 16 — ALSEP', note: 'Heat-flow cable accidentally broken' },
      { lat: 20.19, lon: 30.77, label: 'Apollo 17 — ALSEP', note: 'Final Apollo science station · 1972' },
    ],
    lastMessage:
      'For eight years I listened. I heard the Moon tremble — tiny quakes deep inside, and the thud of falling rocks from space. Then, one day in 1977, Earth said goodnight and my voice went quiet. But my mirror friend beside me never sleeps. Every night someone on Earth shines a laser at it, and it sends the light straight home. We are still part of the conversation.',
    facts: [
      'A laser pulse takes about 2.5 seconds to travel to the Moon and back.',
      'The Apollo 15 retroreflector has 300 prisms — three times more than Apollo 11\'s and Apollo 14\'s.',
    ],
    timeline: [
      { date: '1969-07-21', type: 'event', title: 'First retroreflector placed', description: 'Apollo 11 astronauts set up the first laser retroreflector and a passive seismometer.' },
      { date: '1969-11-19', type: 'event', title: 'First ALSEP station', description: 'Apollo 12 deploys the first full Apollo Lunar Surface Experiments Package.' },
      { date: '1977-09-30', type: 'end', title: 'ALSEP switched off', description: 'NASA turns off the Apollo science stations; the passive mirrors remain in use.' },
    ],
    sources: [
      { label: 'NSSDCA — Apollo Lunar Landings & Experiments', url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo.html' },
      { label: 'NASA — Apollo 11 Mission Overview', url: 'https://www.nasa.gov/mission/apollo-11/' },
    ],
  },
  {
    id: 'surveyor-landers',
    name: 'Surveyor Landers',
    shortName: 'Surveyor',
    destination: 'moon',
    status: 'mission-ended',
    travelling: false,
    statusNote: 'Five Surveyor landers rest on the Moon. All missions ended by 1968.',
    hardware: 'lander',
    program: 'Surveyor 1–7',
    tagline: 'The robotic scouts that tested the ground for Apollo.',
    launchDate: '1966-05-30',
    operations: 'June 1966 – February 1968',
    activeFrom: 1966,
    activeTo: 1968,
    summary:
      'Before astronauts could land on the Moon, NASA had to answer a scary question: would a spacecraft sink into deep dust? The robotic Surveyor landers found out. Five of seven landed safely and sent back tens of thousands of pictures.',
    whatItWas:
      'Three-legged robotic landers about 3 metres tall, with a TV camera, solar panel and radar-guided braking rockets. Later Surveyors carried a mechanical scoop and a chemical analyser.',
    whySent:
      'To prove soft landings were possible, test the strength of the lunar soil and scout possible Apollo landing sites.',
    objectives: [
      'Demonstrate soft landings on the Moon.',
      'Photograph the surface and test how firm the soil was.',
      'Measure the chemical make-up of lunar soil (Surveyor 5, 6 and 7).',
    ],
    story:
      'Surveyor 1 touched down in the Ocean of Storms on 2 June 1966 — the first American soft landing on another world. Surveyor 3 dug trenches with a scoop to test the soil. Surveyor 6 did something nobody had done before: it fired its engines and hopped about 2.5 metres to a new spot. Then, in November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean landed within walking distance of Surveyor 3, visited it, and brought its TV camera and other parts back to Earth for study.',
    discoveries: [
      'The lunar surface was firm enough to support a crewed lander — a key "go" for Apollo.',
      'Surveyor 5\'s chemical analyser showed the soil of Mare Tranquillitatis resembles basalt, a volcanic rock.',
      'Surveyor 7 landed near the young crater Tycho in the rugged highlands, giving scientists a look at non-mare terrain.',
    ],
    achievements: [
      'First U.S. soft landing on another world (Surveyor 1, June 1966).',
      'Surveyor 1 alone returned more than 11,000 pictures.',
      'First rocket "hop" on the Moon (Surveyor 6, November 1967).',
    ],
    challenges: [
      'Surveyor 2 and Surveyor 4 were lost before reaching the surface.',
      'Surveyor 3 bounced several times when its engines did not cut off as planned.',
    ],
    ending:
      'Each lander worked until its electronics failed in the extreme cold of the lunar night or contact was lost. The final Surveyor contact was with Surveyor 7 in February 1968.',
    whereNow:
      'Surveyor 1, 3, 5, 6 and 7 still stand on the Moon. Surveyor 3 is missing the parts Apollo 12 astronauts removed in 1969.',
    whyItMatters:
      'Surveyor turned the Moon from a mystery into a place people could land. It is also the only robotic lander ever visited by human explorers.',
    sites: [
      { lat: -2.47, lon: -43.34, label: 'Surveyor 1 — Ocean of Storms', note: 'First U.S. soft landing · 2 Jun 1966' },
      { lat: -3.02, lon: -23.42, label: 'Surveyor 3 — Ocean of Storms', note: 'Visited by Apollo 12 astronauts in 1969' },
      { lat: 1.41, lon: 23.18, label: 'Surveyor 5 — Sea of Tranquility', note: 'First chemical analysis of lunar soil · 1967' },
      { lat: 0.49, lon: -1.4, label: 'Surveyor 6 — Sinus Medii', note: 'First rocket hop on the Moon · 1967' },
      { lat: -40.97, lon: -11.44, label: 'Surveyor 7 — near Tycho crater', note: 'Highland landing · Jan 1968' },
    ],
    lastMessage:
      'I was sent to answer one question: "Will the ground hold?" I came down on three legs, braced for the worst, and the Moon held me. I sent home thousands of pictures, one at a time. Two and a half years later, I had visitors. Two astronauts walked up, looked me over, and took my camera home as a souvenir. Imagine waiting on the Moon and someone actually comes. I knew then that my answer had been the right one.',
    facts: [
      'Apollo 12 landed so precisely that Surveyor 3 was only about 180 metres from the Lunar Module.',
      'Surveyor 3\'s camera is now in the Smithsonian\'s National Air and Space Museum.',
    ],
    timeline: [
      { date: '1966-06-02', type: 'landing', title: 'Surveyor 1 lands', description: 'The first U.S. soft landing on the Moon, in the Ocean of Storms.' },
      { date: '1967-04-20', type: 'landing', title: 'Surveyor 3 digs in', description: 'Surveyor 3 lands and uses a scoop to dig trenches in lunar soil.' },
      { date: '1967-11-17', type: 'discovery', title: 'The first lunar hop', description: 'Surveyor 6 fires its engines and hops to a new spot on the Moon.' },
      { date: '1968-01-10', type: 'landing', title: 'Surveyor 7 near Tycho', description: 'The final Surveyor lands in the rugged highlands north of Tycho crater.' },
      { date: '1969-11-20', type: 'event', title: 'A robot gets visitors', description: 'Apollo 12 astronauts walk to Surveyor 3 and remove parts to return to Earth.' },
    ],
    sources: [
      { label: 'NSSDCA — Surveyor 1', url: NSSDCA('1966-045A') },
      { label: 'NSSDCA — Surveyor 3', url: NSSDCA('1967-035A') },
      { label: 'NSSDCA — Surveyor 7', url: NSSDCA('1968-001A') },
    ],
  },

  /* ------------------------------ MARS ------------------------------ */
  {
    id: 'sojourner',
    name: 'Sojourner',
    shortName: 'Sojourner',
    destination: 'mars',
    status: 'mission-ended',
    travelling: false,
    statusNote: 'Last contact via the Pathfinder lander on 27 September 1997.',
    hardware: 'micro-rover',
    program: 'Mars Pathfinder',
    tagline: 'The first rover on Mars — about the size of a microwave oven.',
    launchDate: '1996-12-04',
    operations: 'July – September 1997',
    activeFrom: 1997,
    activeTo: 1997,
    summary:
      'Sojourner was a small, six-wheeled rover carried to Mars by the Mars Pathfinder lander. It became the first wheeled vehicle to explore another planet, studying rocks near its landing site in Ares Vallis.',
    whatItWas:
      'A 10.6 kg (23 lb) solar-powered rover with cameras and an Alpha Proton X-ray Spectrometer (APXS) for measuring what rocks are made of.',
    whySent:
      'Mars Pathfinder was designed to prove a new, low-cost way of landing on Mars — with airbags — and to show that a small rover could explore safely.',
    objectives: [
      'Demonstrate a rover could drive and operate on Mars.',
      'Analyse the chemistry of rocks and soil.',
      'Study how the rover\'s wheels interacted with Martian soil.',
    ],
    story:
      'On 4 July 1997, Mars Pathfinder bounced across Ares Vallis inside a cocoon of giant airbags before rolling to a stop. A few days later, Sojourner drove down a ramp onto Mars. The whole world followed along online. Scientists gave rocks friendly nicknames like "Barnacle Bill" and "Yogi". Planned to work for a week, Sojourner kept going for nearly three months, never straying more than about 12 metres from its lander, which relayed all its data home.',
    discoveries: [
      'Rounded pebbles and possible conglomerate rocks suggested the area was shaped by flowing water.',
      'Some rocks were richer in silica than expected, hinting at a complex geological history.',
    ],
    achievements: [
      'First wheeled rover to operate on another planet.',
      'Mars Pathfinder returned more than 16,500 lander images and 550 rover images.',
      'Proved the airbag landing system later used by Spirit and Opportunity.',
    ],
    challenges: [
      'Sojourner relied completely on the lander to talk to Earth.',
      'Martian nights are extremely cold — the lander\'s battery eventually failed after many cold cycles.',
    ],
    ending:
      'Contact with the Pathfinder lander — Sojourner\'s only link to Earth — was lost on 27 September 1997, probably because the lander\'s battery failed. The mission was declared ended in March 1998.',
    whereNow:
      'Sojourner rests near the Pathfinder lander (renamed the Carl Sagan Memorial Station) in Ares Vallis. Its exact final position is not known for certain.',
    whyItMatters:
      'Every NASA Mars rover since — Spirit, Opportunity, Curiosity and Perseverance — follows in Sojourner\'s small wheel tracks.',
    sites: [{ lat: 19.13, lon: -33.22, label: 'Pathfinder landing site — Ares Vallis', note: 'Carl Sagan Memorial Station · landed 4 Jul 1997' }],
    lastMessage:
      'I was small. Smaller than you, probably. But when the ramp lowered and my six wheels touched red ground, I was the biggest thing that had ever happened on Mars. I sniffed rocks. I named nothing — the humans did that — but I loved every rock they named. When my lander friend went quiet, I could not call home anymore. Maybe I kept circling, waiting. That is all right. I showed you the way.',
    facts: [
      'Sojourner was named after Sojourner Truth, an American abolitionist and women\'s rights activist, chosen through a student essay contest.',
      'The Pathfinder landing site was renamed the Carl Sagan Memorial Station.',
    ],
    timeline: [
      { date: '1996-12-04', type: 'launch', title: 'Pathfinder launches', description: 'Mars Pathfinder, carrying Sojourner, lifts off from Cape Canaveral.' },
      { date: '1997-07-04', type: 'landing', title: 'Bouncing onto Mars', description: 'Pathfinder lands in Ares Vallis using airbags.' },
      { date: '1997-07-06', type: 'event', title: 'First rover on Mars', description: 'Sojourner rolls down its ramp onto Martian soil.' },
      { date: '1997-09-27', type: 'end', title: 'Final contact', description: 'The last transmission from the Pathfinder lander is received.' },
    ],
    sources: [
      { label: 'NASA Science — Mars Pathfinder', url: 'https://science.nasa.gov/mission/mars-pathfinder/' },
      { label: 'NSSDCA — Mars Pathfinder', url: NSSDCA('1996-068A') },
    ],
  },
  {
    id: 'spirit',
    name: 'Spirit (MER-A)',
    shortName: 'Spirit',
    destination: 'mars',
    status: 'mission-ended',
    travelling: false,
    statusNote: 'Last contact 22 March 2010. NASA ended recovery efforts on 25 May 2011.',
    hardware: 'mer-rover',
    program: 'Mars Exploration Rovers',
    tagline: 'Planned for 90 days. Explored for more than six years.',
    launchDate: '2003-06-10',
    operations: 'January 2004 – March 2010',
    activeFrom: 2004,
    activeTo: 2010,
    summary:
      'Spirit was one of NASA\'s twin Mars Exploration Rovers. It landed in Gusev Crater and found strong evidence that Mars was once a warmer, wetter world with hot springs or steam vents.',
    whatItWas:
      'A solar-powered, six-wheeled robot geologist about the size of a golf cart, with panoramic cameras, a rock-grinding tool and instruments to identify minerals.',
    whySent:
      'To "follow the water": search rocks and soil for clues about whether liquid water was once present on Mars.',
    objectives: [
      'Search for rocks and soils that hold clues to past water activity.',
      'Study the geology around Gusev Crater, a possible ancient lake bed.',
      'Operate for at least 90 Martian days (sols).',
    ],
    story:
      'Spirit bounced to a landing in Gusev Crater in January 2004. At first, the crater floor was covered in volcanic rock, so Spirit drove kilometres to the Columbia Hills and climbed Husband Hill. In 2006 its right front wheel stopped turning, so the team drove it backwards, dragging the broken wheel. That accident became a gift: the dragging wheel scraped up bright soil that turned out to be almost pure silica — evidence of ancient hot springs or steam vents.',
    discoveries: [
      'Found nearly pure silica in soil near "Home Plate", which on Earth forms in hot springs or steam vents.',
      'Found carbonate minerals in the "Comanche" outcrop, suggesting a once wetter, less acidic environment.',
      'Showed "Home Plate" was formed by explosive volcanism involving water.',
    ],
    achievements: [
      'Operated for more than six years — over 25 times longer than planned.',
      'Drove about 7.7 km (4.8 mi).',
      'Climbed to the summit of Husband Hill in 2005.',
    ],
    challenges: [
      'A stuck front wheel forced the team to drive backwards for years.',
      'Martian winter, dust on the solar panels and limited sunlight in Gusev Crater.',
    ],
    ending:
      'In May 2009, Spirit broke through a crust into soft sand at a site called "Troy" and became stuck. Unable to tilt its solar panels toward the Sun for winter, it went silent after 22 March 2010. NASA ended efforts to contact it on 25 May 2011.',
    whereNow:
      'Spirit remains at Troy, on the western side of Home Plate in the Columbia Hills of Gusev Crater.',
    whyItMatters:
      'Spirit showed that even a "stuck" rover can do great science — it kept working as a stationary research platform until it went silent.',
    sites: [{ lat: -14.57, lon: 175.47, label: 'Spirit landing area — Gusev Crater', note: 'Columbia Memorial Station · landed 4 Jan 2004' }],
    lastMessage:
      'They promised me ninety days. I gave them more than two thousand. When my wheel broke, I learned to drive backwards, and the dragging wheel dug up a secret: this place once had hot water, bubbling up from below. When the sand finally caught me, I did not panic. I kept studying the ground beneath me. Then winter came, and the Sun sank low, and I could not keep warm. Tell my twin I was proud of her.',
    facts: [
      'Spirit landed on 4 January 2004 (UTC); its twin, Opportunity, landed three weeks later on the other side of Mars.',
      'Dust devils sometimes cleaned Spirit\'s solar panels, giving it unexpected boosts of power.',
    ],
    timeline: [
      { date: '2003-06-10', type: 'launch', title: 'Spirit launches', description: 'The first of NASA\'s twin Mars Exploration Rovers lifts off.' },
      { date: '2004-01-04', type: 'landing', title: 'Spirit lands in Gusev Crater', description: 'Spirit bounces to a landing inside airbags.' },
      { date: '2007-05-21', type: 'discovery', title: 'Silica surprise', description: 'Spirit\'s dragging wheel exposes nearly pure silica soil near Home Plate (announced 2007).' },
      { date: '2009-05-01', type: 'event', title: 'Stuck at Troy', description: 'Spirit breaks through a crust into soft soil and becomes trapped.' },
      { date: '2010-03-22', type: 'end', title: 'Last contact', description: 'Spirit\'s final communication with Earth.' },
    ],
    sources: [
      { label: 'NASA Science — Mars Exploration Rovers', url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/' },
      { label: 'NSSDCA — Spirit (MER-A)', url: NSSDCA('2003-027A') },
    ],
  },
  {
    id: 'opportunity',
    name: 'Opportunity (MER-B)',
    shortName: 'Opportunity',
    destination: 'mars',
    status: 'mission-ended',
    travelling: false,
    statusNote: 'Last contact 10 June 2018. Mission declared complete on 13 February 2019.',
    hardware: 'mer-rover',
    program: 'Mars Exploration Rovers',
    tagline: 'The marathon rover that lasted almost 15 years.',
    launchDate: '2003-07-07',
    operations: 'January 2004 – June 2018',
    activeFrom: 2004,
    activeTo: 2018,
    summary:
      'Opportunity, Spirit\'s twin, landed on the plains of Meridiani Planum and found some of the clearest evidence that liquid water once soaked the surface of Mars. It drove 45.16 km — a record that stood until 2026.',
    whatItWas:
      'A solar-powered, six-wheeled robot geologist identical to Spirit, with cameras, spectrometers, a microscope and a rock-grinding tool.',
    whySent:
      'To look for evidence of past water at Meridiani Planum, where orbiting spacecraft had detected the mineral hematite, which often forms in water.',
    objectives: [
      'Search for rocks and soils that record past water activity.',
      'Investigate the hematite detected from orbit.',
      'Operate for at least 90 sols.',
    ],
    story:
      'Opportunity rolled to a stop inside a small crater — a lucky "hole-in-one" that put layered bedrock right in front of its cameras. It found tiny hematite spheres the team nicknamed "blueberries", formed in water-soaked rock. Over the following years it drove to bigger and bigger craters: Endurance, Victoria and finally the huge Endeavour Crater, arriving in 2011. In June 2018, a planet-wide dust storm blotted out the Sun. Opportunity fell silent.',
    discoveries: [
      'Hematite "blueberries" and layered rocks showed that water once soaked Meridiani Planum.',
      'Found a bright vein of gypsum ("Homestake") on the rim of Endeavour Crater in 2011 — a mineral deposited by water flowing through cracks.',
      'Found clay minerals at Endeavour that formed in water that was more neutral and friendlier to life.',
    ],
    achievements: [
      'Operated for nearly 15 years — about 60 times longer than planned.',
      'Drove 45.16 km (28.06 mi), the off-world distance record until Perseverance passed it on 11 October 2026.',
      'Completed a marathon distance on Mars in 2015.',
    ],
    challenges: [
      'Survived several dust storms and many Martian winters.',
      'Its flash memory began failing in later years, so the team worked around it.',
    ],
    ending:
      'A planet-encircling dust storm in 2018 blocked sunlight from its solar panels. Opportunity\'s last contact was on 10 June 2018. After more than 1,000 recovery commands, NASA declared the mission complete on 13 February 2019.',
    whereNow:
      'Opportunity rests in "Perseverance Valley" on the western rim of Endeavour Crater, Meridiani Planum.',
    whyItMatters:
      'Opportunity turned "Mars was once wet" from a hypothesis into strong evidence — and inspired millions with its long life.',
    sites: [
      { lat: -1.95, lon: -5.53, label: 'Opportunity landing site — Eagle Crater', note: 'Challenger Memorial Station · landed 25 Jan 2004' },
      { lat: -2.28, lon: -5.23, label: 'Opportunity final location (approx.) — Endeavour Crater rim', note: 'Perseverance Valley · last contact Jun 2018' },
    ],
    lastMessage:
      'Ninety days, they said. I drove past that number, and then past a marathon, and then past fourteen more years. I found little blue-grey spheres that told me this desert was once soaked in water. When the great dust storm came, the sky turned dark as night and my panels could not drink the light. I will be honest with you: I do not know exactly what my final thought was. But I know what I would want it to be: "Thank you for letting me roam."',
    facts: [
      'The famous line "My battery is low and it\'s getting dark" was a poetic translation of Opportunity\'s last data by a journalist — the rover did not actually send words.',
      'Opportunity\'s final location is called "Perseverance Valley" — named years before the Perseverance rover existed.',
    ],
    timeline: [
      { date: '2003-07-07', type: 'launch', title: 'Opportunity launches', description: 'The second Mars Exploration Rover lifts off.' },
      { date: '2004-01-25', type: 'landing', title: 'Hole-in-one landing', description: 'Opportunity lands inside tiny Eagle Crater on Meridiani Planum.' },
      { date: '2004-03-02', type: 'discovery', title: 'Mars was wet', description: 'NASA announces Opportunity found evidence that rocks at Meridiani were once soaked in water.' },
      { date: '2011-08-09', type: 'event', title: 'Arrival at Endeavour', description: 'After a three-year drive, Opportunity reaches the rim of Endeavour Crater.' },
      { date: '2018-06-10', type: 'end', title: 'Last contact', description: 'A global dust storm silences Opportunity.' },
      { date: '2019-02-13', type: 'end', title: 'Mission complete', description: 'NASA declares the Opportunity mission complete.' },
    ],
    sources: [
      { label: 'NASA Science — Mars Exploration Rovers', url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/' },
      { label: 'NSSDCA — Opportunity (MER-B)', url: NSSDCA('2003-032A') },
    ],
  },
  {
    id: 'insight',
    name: 'InSight Lander',
    shortName: 'InSight',
    destination: 'mars',
    status: 'mission-ended',
    travelling: false,
    statusNote: 'Last contact 15 December 2022. Mission declared ended 21 December 2022.',
    hardware: 'geophysics-lander',
    program: 'Discovery Program',
    tagline: 'The lander that listened to the heartbeat of Mars.',
    launchDate: '2018-05-05',
    operations: 'November 2018 – December 2022',
    activeFrom: 2018,
    activeTo: 2022,
    summary:
      'InSight was the first mission dedicated to studying the deep interior of Mars. Its seismometer recorded more than 1,300 marsquakes and helped scientists map the planet\'s crust, mantle and core.',
    whatItWas:
      'A stationary lander with two large round solar panels, a robotic arm, a very sensitive seismometer (SEIS, provided by France\'s CNES) and a heat-flow probe nicknamed "the mole".',
    whySent:
      'To learn how rocky planets like Earth and Mars formed, by measuring what Mars is like deep inside.',
    objectives: [
      'Detect marsquakes and meteorite impacts to probe the planet\'s interior.',
      'Measure heat flowing out of Mars.',
      'Track tiny wobbles in Mars\'s rotation to study its core.',
    ],
    story:
      'InSight landed on the flat plains of Elysium Planitia in November 2018 — chosen because it was "boring" and safe. Its robotic arm placed the seismometer on the ground and covered it with a dome. For four years it listened. In May 2022 it recorded the largest quake ever detected on another planet, magnitude 4.7. But dust kept piling up on its solar panels, slowly starving it of power.',
    discoveries: [
      'Recorded more than 1,300 marsquakes.',
      'Measured the size of Mars\'s liquid metal core and the thickness of its crust.',
      'Detected seismic signals from meteoroid impacts, some of which orbiters then photographed as fresh craters.',
    ],
    achievements: [
      'First seismometer to successfully operate on the surface of Mars.',
      'Recorded a magnitude 4.7 marsquake on 4 May 2022.',
      'Provided the first direct map of another rocky planet\'s interior layers.',
    ],
    challenges: [
      'The heat-flow probe ("the mole") could not dig deep enough because the soil did not provide enough friction; efforts ended in January 2021.',
      'Dust slowly covered the solar panels and reduced power.',
    ],
    ending:
      'With its solar panels coated in dust, InSight\'s power dropped too low. Its last communication was on 15 December 2022, and NASA declared the mission ended on 21 December 2022.',
    whereNow:
      'InSight stands silent on Elysium Planitia, just north of the Martian equator.',
    whyItMatters:
      'InSight gave us the first "ultrasound" of another planet — data that will help scientists understand how rocky worlds, including Earth, are built.',
    sites: [{ lat: 4.5, lon: 135.62, label: 'InSight — Elysium Planitia', note: 'Landed 26 Nov 2018 · silent since Dec 2022' }],
    lastMessage:
      'I never moved. That was not my job. My job was to be still enough to hear Mars breathe. I felt it tremble more than a thousand times. Once, it shook so hard I thought the whole planet was waking up. The dust came slowly, like snow that never melts, and my power faded little by little. Before I went quiet, I took one last picture of myself. I wanted you to remember what I looked like.',
    facts: [
      'InSight\'s name stands for Interior Exploration using Seismic Investigations, Geodesy and Heat Transport.',
      'Two tiny CubeSats called MarCO flew past Mars alongside InSight to relay its landing signals — the first CubeSats sent to deep space.',
    ],
    timeline: [
      { date: '2018-05-05', type: 'launch', title: 'InSight launches', description: 'The first interplanetary mission launched from the U.S. West Coast.' },
      { date: '2018-11-26', type: 'landing', title: 'Landing on Elysium Planitia', description: 'InSight lands safely on the flat plains of Mars.' },
      { date: '2019-04-06', type: 'discovery', title: 'First marsquake', description: 'InSight detects its first likely marsquake.' },
      { date: '2022-05-04', type: 'discovery', title: 'The big one', description: 'InSight records a magnitude 4.7 marsquake — the largest ever detected on another planet.' },
      { date: '2022-12-21', type: 'end', title: 'Mission ends', description: 'NASA declares the InSight mission ended after two missed contacts.' },
    ],
    sources: [
      { label: 'NASA Science — InSight', url: 'https://science.nasa.gov/mission/insight/' },
      { label: 'NSSDCA — InSight', url: NSSDCA('2018-042A') },
    ],
  },
  {
    id: 'perseverance',
    name: 'Perseverance Rover',
    shortName: 'Perseverance',
    destination: 'mars',
    status: 'active',
    travelling: false,
    statusNote: 'Still exploring Mars. Set the off-world driving record on 11 October 2026.',
    hardware: 'big-rover',
    program: 'Mars 2020',
    tagline: 'Searching for signs of ancient life — and still driving.',
    launchDate: '2020-07-30',
    operations: 'February 2021 – present',
    activeFrom: 2021,
    activeTo: null,
    summary:
      'Perseverance is a car-sized rover exploring Jezero Crater, an ancient lake bed. It searches for signs of ancient microbial life and collects rock samples sealed in tubes for possible future return to Earth.',
    whatItWas:
      'A nuclear-powered (radioisotope) rover with 19 cameras, two microphones, a laser that zaps rocks, an X-ray chemistry instrument and a drill that cores and seals rock samples.',
    whySent:
      'Jezero Crater once held a lake fed by a river delta — the kind of place where signs of ancient life might be preserved in rock.',
    objectives: [
      'Search for signs of ancient microbial life (biosignatures).',
      'Collect and cache rock and soil samples.',
      'Study the geology and climate history of Jezero Crater.',
      'Test technologies for future human exploration, such as making oxygen (MOXIE).',
    ],
    story:
      'Perseverance landed on 18 February 2021 using a "sky crane" that lowered it on cables. It carried a small helicopter, Ingenuity, under its belly. It explored the crater floor and the ancient river delta, then climbed the crater rim. In 2024 it found a rock nicknamed "Cheyava Falls" with "leopard spot" patterns. In 2025, NASA said a sample from that area contains a potential biosignature — a feature that could have been made by life but needs more study. On 11 October 2026, Perseverance passed Opportunity\'s off-world driving record.',
    discoveries: [
      'Confirmed Jezero Crater once held a lake and a river delta.',
      'Found that the crater floor is made of volcanic (igneous) rock altered by water.',
      'Found the "Cheyava Falls" rock; NASA described a sample from this area in 2025 as containing a potential biosignature.',
      'Recorded the first sounds from the surface of Mars.',
    ],
    achievements: [
      'MOXIE produced oxygen from the Martian atmosphere — a first on another planet.',
      'Deposited a backup cache of 10 sample tubes at "Three Forks" (2022–2023).',
      'Completed the first drives on another world planned by artificial intelligence (December 2025).',
      'Broke the off-world driving record on 11 October 2026, passing 45.16 km.',
    ],
    challenges: [
      'Steep, rocky climbs up the Jezero Crater rim.',
      'Some rock cores crumbled or pebbles jammed the sample system early in the mission.',
      'The plan to bring samples back to Earth is still being decided.',
    ],
    ending:
      'Perseverance\'s mission has not ended. It is still exploring, driving and collecting samples.',
    whereNow:
      'Exploring terrain west of the Jezero Crater rim on Mars (2026).',
    whyItMatters:
      'Perseverance may help answer one of humanity\'s biggest questions: did life ever exist beyond Earth?',
    sites: [{ lat: 18.44, lon: 77.45, label: 'Perseverance landing site — Jezero Crater', note: 'Octavia E. Butler Landing · 18 Feb 2021 · still exploring' }],
    lastMessage:
      'This is not my last message. I am still here, still driving, still listening to the wind through my microphones. I carry little sealed tubes of Mars, like letters waiting to be posted. Someday, maybe, someone will come and collect them. Until then, I will keep doing what my name says. I have driven farther than any rover before me, and I am not finished yet.',
    facts: [
      'Perseverance carries a plate with a silhouette of the Earth, Sun and Mars, and three chips holding the names of nearly 11 million people.',
      'The rover\'s parachute contained a hidden code that spelled "Dare Mighty Things".',
    ],
    timeline: [
      { date: '2020-07-30', type: 'launch', title: 'Perseverance launches', description: 'Mars 2020 lifts off from Cape Canaveral with Ingenuity aboard.' },
      { date: '2021-02-18', type: 'landing', title: 'Sky crane landing', description: 'Perseverance lands in Jezero Crater.' },
      { date: '2021-04-20', type: 'discovery', title: 'Oxygen from Mars', description: 'MOXIE makes oxygen from the Martian atmosphere for the first time.' },
      { date: '2024-07-25', type: 'discovery', title: 'Cheyava Falls', description: 'NASA reports a rock with "leopard spots" that may hold clues about ancient life.' },
      { date: '2026-10-11', type: 'event', title: 'Off-world driving record', description: 'Perseverance passes Opportunity\'s 45.16 km record.' },
    ],
    sources: [
      { label: 'NASA Science — Mars 2020 Perseverance', url: 'https://science.nasa.gov/mission/mars-2020-perseverance/' },
      { label: 'NASA — Perseverance sets off-world driving record (Oct 2026)', url: 'https://science.nasa.gov/blogs/perseverance-mars-rover/2026/10/12/nasas-perseverance-sets-off-world-record-for-total-distance-driven/' },
      { label: 'NSSDCA — Mars 2020', url: NSSDCA('2020-052A') },
    ],
  },
  {
    id: 'ingenuity',
    name: 'Ingenuity Mars Helicopter',
    shortName: 'Ingenuity',
    destination: 'mars',
    status: 'mission-ended',
    travelling: false,
    statusNote: 'Flight mission ended January 2024. Grounded, it was set to keep logging data on board.',
    hardware: 'helicopter',
    program: 'Mars 2020',
    tagline: 'The first aircraft to fly on another world.',
    launchDate: '2020-07-30',
    operations: 'April 2021 – January 2024',
    activeFrom: 2021,
    activeTo: 2024,
    summary:
      'Ingenuity was a 1.8 kg (4 lb) helicopter that rode to Mars under Perseverance. Designed for up to five test flights, it flew 72 times and became a scout for the rover.',
    whatItWas:
      'A small, solar-powered helicopter with two 1.2-metre counter-rotating rotors that spun about 2,400 times per minute to grip the very thin Martian air.',
    whySent:
      'As a technology demonstration — to find out whether powered, controlled flight is even possible in an atmosphere about 1% as dense as Earth\'s.',
    objectives: [
      'Achieve the first powered, controlled flight on another planet.',
      'Test flight in Mars\'s thin atmosphere.',
      'Return images that could help future aerial scouts.',
    ],
    story:
      'On 19 April 2021, Ingenuity rose about 3 metres above Jezero Crater, hovered, and landed — the first powered, controlled flight on another planet. It carried a tiny piece of fabric from the Wright brothers\' 1903 Flyer. After its five planned test flights, it became an aerial scout for Perseverance, flying ahead to photograph terrain. On its 72nd flight in January 2024, it landed hard and damaged its rotor blades.',
    discoveries: [
      'Proved that aircraft can fly on Mars, opening the door to future Mars helicopters.',
      'Its scouting images helped Perseverance\'s team plan routes and pick science targets.',
    ],
    achievements: [
      '72 flights instead of the planned 5.',
      'More than two hours of total flight time.',
      'Flew about 14 times farther than originally planned.',
    ],
    challenges: [
      'Survived freezing Martian nights with only a small battery and heater.',
      'Lost and regained contact several times; navigated over smooth, featureless sand that confused its cameras.',
    ],
    ending:
      'After a hard landing on flight 72 (18 January 2024) damaged its rotors, NASA ended the flight mission on 25 January 2024. In April 2024, the team sent final commands so Ingenuity could keep waking up, photographing and recording temperatures, storing the data on board.',
    whereNow:
      'Grounded at an area the team calls "Valinor Hills" in Jezero Crater. It no longer talks to Earth, but was programmed to keep collecting data on board for as long as it can.',
    whyItMatters:
      'Ingenuity was Mars\'s "Wright brothers moment". Future missions may use helicopters to explore cliffs, caves and places rovers cannot reach.',
    sites: [{ lat: 18.4, lon: 77.35, label: 'Ingenuity final airfield (approx.) — Valinor Hills', note: 'Final airfield · last flight 18 Jan 2024' }],
    lastMessage:
      'They said I might fly five times. I flew seventy-two. Every take-off felt like the first one — the dust whirling, the ground falling away, the rover waiting below like a big friend. On my last flight the ground came up too fast, and my wings broke. I cannot fly anymore, but I still wake up with the Sun, and I write down what I see. When you come to Mars, look for me in the hills. I saved my notes for you.',
    facts: [
      'Ingenuity\'s rotors spun about 2,400 RPM — far faster than a typical helicopter on Earth.',
      'A postage-stamp-sized piece of fabric from the Wright brothers\' first airplane was attached under its solar panel.',
    ],
    timeline: [
      { date: '2021-04-19', type: 'discovery', title: 'First flight on another world', description: 'Ingenuity makes the first powered, controlled flight on another planet.' },
      { date: '2024-01-18', type: 'event', title: 'Flight 72', description: 'Ingenuity\'s 72nd and final flight ends in a hard landing that damages its rotors.' },
      { date: '2024-01-25', type: 'end', title: 'Flight mission ends', description: 'NASA announces the end of Ingenuity\'s flight mission.' },
      { date: '2024-04-16', type: 'end', title: 'Final communications', description: 'The team receives Ingenuity\'s last planned transmission and sets it up as a stationary testbed.' },
    ],
    sources: [
      { label: 'NASA Science — Ingenuity Mars Helicopter', url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/' },
      { label: 'JPL — Ingenuity team says goodbye … for now', url: 'https://www.jpl.nasa.gov/news/nasas-ingenuity-mars-helicopter-team-says-goodbye-for-now' },
    ],
  },

  /* --------------------------- DEEP SPACE --------------------------- */
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    shortName: 'Voyager 1',
    destination: 'deep-space',
    status: 'active',
    travelling: true,
    statusNote: 'Still operating in interstellar space with two science instruments (2026).',
    hardware: 'voyager',
    program: 'Voyager',
    tagline: 'The farthest human-made object — still talking to Earth.',
    launchDate: '1977-09-05',
    operations: 'September 1977 – present',
    activeFrom: 1977,
    activeTo: null,
    summary:
      'Voyager 1 flew past Jupiter and Saturn, took the famous "Pale Blue Dot" photo of Earth, and in 2012 became the first spacecraft to enter interstellar space. It is not abandoned — it is still sending data.',
    whatItWas:
      'A spacecraft powered by radioisotope thermoelectric generators (RTGs), with a 3.7-metre dish antenna and originally 10 science instrument sets. It carries the Golden Record of sounds and images from Earth.',
    whySent:
      'To explore Jupiter and Saturn up close, then continue outward to study the edge of the Sun\'s influence.',
    objectives: [
      'Study Jupiter, Saturn and their moons.',
      'Investigate the heliosphere and its boundary.',
      'Measure conditions in interstellar space.',
    ],
    story:
      'Voyager 1 launched 16 days after its twin, on a faster path. At Jupiter in 1979, its images revealed erupting volcanoes on the moon Io — the first active volcanoes seen beyond Earth. After a close pass by Saturn\'s moon Titan in 1980, it headed out of the planetary plane. In 1990, it turned around and photographed Earth as a tiny dot in a sunbeam. In 2012 it crossed into interstellar space. Its power drops about 4 watts each year, so engineers switch off instruments one by one; in April 2026 they turned off the low-energy charged particle instrument.',
    discoveries: [
      'Discovered active volcanoes on Jupiter\'s moon Io.',
      'Revealed the complex structure of Saturn\'s rings and studied Titan\'s thick atmosphere.',
      'Measured the boundary of the heliosphere and the conditions of interstellar space.',
    ],
    achievements: [
      'First spacecraft to enter interstellar space (25 August 2012).',
      'The farthest human-made object from Earth.',
      'On 18 November 2026, it reaches one light-day from Earth — a radio signal takes 24 hours to arrive.',
    ],
    challenges: [
      'Shrinking power from aging RTGs forces engineers to turn instruments off.',
      'In 2023–2024, a failed memory chip garbled its data; engineers fixed it remotely from billions of kilometres away.',
    ],
    ending:
      'Voyager 1\'s mission has not ended. It is still active and travelling. Engineers expect science operations to wind down as power keeps falling.',
    whereNow:
      'In interstellar space, roughly 25.9 billion km (16.1 billion mi) from Earth in November 2026, heading in the direction of the constellation Ophiuchus.',
    whyItMatters:
      'Voyager 1 is humanity\'s first messenger to interstellar space — and the Golden Record means it carries a greeting from Earth.',
    deepSpace: {
      distance: '≈ 25.9 billion km (≈ 173 AU) — one light-day',
      au: 173,
      asOf: '18 November 2026',
      heading: 'Toward the constellation Ophiuchus',
      region: 'Interstellar space',
    },
    lastMessage:
      'I am still here. My voice takes a whole day to reach you now. I have seen volcanoes on Io and rings like vinyl grooves around Saturn. Once, I turned around and took your picture — you were a speck of light, smaller than a pixel. I have switched off most of my senses to save warmth, but I can still feel the magnetic fields between the stars. I carry a golden record with your music on it. I will keep it safe.',
    facts: [
      'The "Pale Blue Dot" image was taken on 14 February 1990 from about 6 billion km away.',
      'The Golden Record contains greetings in 55 languages, music and natural sounds of Earth.',
    ],
    timeline: [
      { date: '1977-09-05', type: 'launch', title: 'Voyager 1 launches', description: 'Voyager 1 lifts off from Cape Canaveral on a fast route to Jupiter.' },
      { date: '1979-03-05', type: 'discovery', title: 'Volcanoes on Io', description: 'Voyager 1\'s closest approach to Jupiter; its images reveal Io\'s active volcanoes.' },
      { date: '1980-11-12', type: 'event', title: 'Saturn & Titan', description: 'Voyager 1 flies past Saturn and close by its moon Titan.' },
      { date: '1990-02-14', type: 'event', title: 'Pale Blue Dot', description: 'Voyager 1 photographs Earth from about 6 billion km away.' },
      { date: '2012-08-25', type: 'discovery', title: 'Into interstellar space', description: 'Voyager 1 becomes the first spacecraft to cross the heliopause.' },
      { date: '2026-11-18', type: 'event', title: 'One light-day from Earth', description: 'Voyager 1 reaches a distance light needs 24 hours to cross.' },
    ],
    sources: [
      { label: 'NASA Science — Voyager', url: 'https://science.nasa.gov/mission/voyager/' },
      { label: 'NASA — Where are Voyager 1 and Voyager 2 now?', url: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/' },
      { label: 'NSSDCA — Voyager 1', url: NSSDCA('1977-084A') },
    ],
  },
  {
    id: 'voyager-2',
    name: 'Voyager 2',
    shortName: 'Voyager 2',
    destination: 'deep-space',
    status: 'active',
    travelling: true,
    statusNote: 'Still operating in interstellar space; three science instruments were running in 2026.',
    hardware: 'voyager',
    program: 'Voyager',
    tagline: 'The only spacecraft to visit Uranus and Neptune.',
    launchDate: '1977-08-20',
    operations: 'August 1977 – present',
    activeFrom: 1977,
    activeTo: null,
    summary:
      'Voyager 2 completed the "Grand Tour" — flying past Jupiter, Saturn, Uranus and Neptune. It is the only spacecraft ever to visit the two ice giants, and it entered interstellar space in 2018.',
    whatItWas:
      'The twin of Voyager 1: RTG-powered, with a large dish antenna, a long magnetometer boom, cameras and particle instruments — plus its own copy of the Golden Record.',
    whySent:
      'A rare planetary alignment in the late 1970s made it possible to visit all four giant planets with gravity assists, a chance that comes about once every 175 years.',
    objectives: [
      'Explore Jupiter, Saturn, Uranus and Neptune.',
      'Study their moons, rings and magnetic fields.',
      'Measure the outer heliosphere and interstellar space.',
    ],
    story:
      'Voyager 2 actually launched first, on 20 August 1977, on a slower route. It reached Jupiter in 1979 and Saturn in 1981. Then it kept going: Uranus in January 1986 and Neptune in August 1989. Its pictures of Neptune\'s Great Dark Spot and the icy geysers on the moon Triton are still the best we have. In November 2018, it crossed into interstellar space. In 2026, engineers carried out a clever power-saving fix that helped keep its remaining instruments running.',
    discoveries: [
      'Discovered new moons and rings at Uranus and Neptune.',
      'Found the Great Dark Spot, a giant storm on Neptune.',
      'Saw geyser-like plumes on Neptune\'s moon Triton.',
      'Measured the heliopause from a second location, confirming Voyager 1\'s results.',
    ],
    achievements: [
      'Only spacecraft to fly past Uranus (1986) and Neptune (1989).',
      'Entered interstellar space on 5 November 2018.',
      'Visited all four giant planets in one mission.',
    ],
    challenges: [
      'Its camera platform jammed briefly after the Saturn flyby; engineers found a workaround.',
      'In 2023 a wrong command pointed its antenna slightly away from Earth; contact was restored after about two weeks.',
    ],
    ending:
      'Voyager 2\'s mission has not ended. It is still active and travelling, with instruments being turned off over time as power declines.',
    whereNow:
      'In interstellar space, more than 21 billion km (13 billion mi) from Earth in 2026, travelling south of the plane of the planets.',
    whyItMatters:
      'Almost everything we know up close about Uranus and Neptune comes from Voyager 2\'s brief visits.',
    deepSpace: {
      distance: '> 21.4 billion km (≈ 143 AU)',
      au: 143,
      asOf: 'August 2026',
      heading: 'Toward the constellations Sagittarius and Pavo',
      region: 'Interstellar space',
    },
    lastMessage:
      'I went the long way. Four giant worlds, one after another, like stepping stones across a dark river. At Neptune, I saw a storm as big as Earth and ice volcanoes on a frozen moon. No one has been back since — so in a way, I still hold the only close-up memories of those places. My twin is ahead of me, but I am not lonely. I am listening to the space between the stars.',
    facts: [
      'Voyager 2 launched 16 days BEFORE Voyager 1 — but Voyager 1 took a faster path and overtook it.',
      'Radio signals from Voyager 2 take roughly 20 hours to reach Earth.',
    ],
    timeline: [
      { date: '1977-08-20', type: 'launch', title: 'Voyager 2 launches', description: 'The first Voyager to launch begins its Grand Tour.' },
      { date: '1981-08-25', type: 'event', title: 'Saturn flyby', description: 'Voyager 2 makes its closest approach to Saturn.' },
      { date: '1986-01-24', type: 'discovery', title: 'First visit to Uranus', description: 'Voyager 2 becomes the first spacecraft to fly past Uranus.' },
      { date: '1989-08-25', type: 'discovery', title: 'First visit to Neptune', description: 'Voyager 2 flies past Neptune and its moon Triton.' },
      { date: '2018-11-05', type: 'discovery', title: 'Into interstellar space', description: 'Voyager 2 crosses the heliopause.' },
    ],
    sources: [
      { label: 'NASA Science — Voyager', url: 'https://science.nasa.gov/mission/voyager/' },
      { label: 'NASA — Where are Voyager 1 and Voyager 2 now?', url: 'https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/' },
      { label: 'NSSDCA — Voyager 2', url: NSSDCA('1977-076A') },
    ],
  },
  {
    id: 'pioneer-10',
    name: 'Pioneer 10',
    shortName: 'Pioneer 10',
    destination: 'deep-space',
    status: 'silent',
    travelling: true,
    statusNote: 'Silent since its last signal on 23 January 2003 — still coasting outward.',
    hardware: 'pioneer',
    program: 'Pioneer',
    tagline: 'The first spacecraft to cross the asteroid belt and visit Jupiter.',
    launchDate: '1972-03-03',
    operations: 'March 1972 – January 2003',
    activeFrom: 1972,
    activeTo: 2003,
    summary:
      'Pioneer 10 was the first spacecraft to travel through the asteroid belt and the first to fly past Jupiter. It carries a famous plaque showing where Earth is and what humans look like.',
    whatItWas:
      'A spin-stabilised spacecraft with a 2.74-metre dish antenna, powered by four RTGs, carrying instruments to study particles, magnetic fields and Jupiter.',
    whySent:
      'To find out whether a spacecraft could survive the asteroid belt and Jupiter\'s intense radiation — paving the way for Voyager.',
    objectives: [
      'Cross the asteroid belt safely.',
      'Study Jupiter\'s radiation belts, magnetic field and atmosphere.',
      'Continue outward to study the outer solar system.',
    ],
    story:
      'Some scientists feared the asteroid belt might shred any spacecraft that tried to cross it. Pioneer 10 flew through unharmed. In December 1973, it passed Jupiter and took the first close-up images of the giant planet, surviving radiation far stronger than expected. Then it just kept going. NASA kept listening for nearly 30 years, until its power source grew too weak.',
    discoveries: [
      'Showed the asteroid belt was safe to cross.',
      'Measured Jupiter\'s powerful radiation belts and magnetic field.',
      'Showed Jupiter is mostly a liquid planet.',
    ],
    achievements: [
      'First spacecraft to cross the asteroid belt.',
      'First spacecraft to fly past Jupiter (3 December 1973).',
      'Carries the Pioneer plaque, designed by Carl Sagan and Frank Drake with artwork by Linda Salzman Sagan.',
    ],
    challenges: [
      'Jupiter\'s radiation caused some false commands and damaged some instruments.',
      'Its signal grew so faint that NASA\'s largest antennas could barely detect it.',
    ],
    ending:
      'NASA ended routine science in 1997 but continued tracking. The last, very weak signal was received on 23 January 2003, when its RTG power had decayed too far.',
    whereNow:
      'Coasting silently through the outer solar system toward the star Aldebaran in Taurus — a journey that would take more than two million years. It was about 80 AU from Earth at last contact.',
    whyItMatters:
      'Pioneer 10 was the trailblazer: it proved the outer solar system could be explored.',
    deepSpace: {
      distance: '≈ 12 billion km (≈ 80 AU) at last contact',
      au: 80,
      asOf: 'January 2003 (last signal)',
      heading: 'Toward the star Aldebaran in Taurus',
      region: 'Outer solar system / beyond',
    },
    lastMessage:
      'Before me, no one knew if the rocks between Mars and Jupiter would let a traveller pass. They let me pass. Jupiter roared with radiation, and I kept my eyes open. For thirty years Earth kept calling, and I kept answering, more and more quietly. My last whisper reached you in 2003. I am still drifting, still carrying a little metal picture of you, waving.',
    facts: [
      'The Pioneer plaque shows a man, a woman, the Sun\'s position relative to pulsars and a diagram of the solar system.',
      'At launch, Pioneer 10 was the fastest spacecraft ever sent from Earth — a record later beaten by New Horizons.',
    ],
    timeline: [
      { date: '1972-03-03', type: 'launch', title: 'Pioneer 10 launches', description: 'The first mission to the outer planets lifts off (2 March local time).' },
      { date: '1973-12-03', type: 'discovery', title: 'First Jupiter flyby', description: 'Pioneer 10 makes humanity\'s first close pass by Jupiter.' },
      { date: '2003-01-23', type: 'end', title: 'Last signal', description: 'The final, faint signal from Pioneer 10 reaches Earth.' },
    ],
    sources: [
      { label: 'NASA Science — Pioneer 10', url: 'https://science.nasa.gov/mission/pioneer-10/' },
      { label: 'NSSDCA — Pioneer 10', url: NSSDCA('1972-012A') },
    ],
  },
  {
    id: 'pioneer-11',
    name: 'Pioneer 11',
    shortName: 'Pioneer 11',
    destination: 'deep-space',
    status: 'silent',
    travelling: true,
    statusNote: 'Silent since 1995 — still coasting outward.',
    hardware: 'pioneer',
    program: 'Pioneer',
    tagline: 'The first spacecraft to visit Saturn.',
    launchDate: '1973-04-06',
    operations: 'April 1973 – 1995',
    activeFrom: 1973,
    activeTo: 1995,
    summary:
      'Pioneer 11 followed Pioneer 10 past Jupiter, then used Jupiter\'s gravity to swing toward Saturn, becoming the first spacecraft to fly past the ringed planet in 1979.',
    whatItWas:
      'A near-twin of Pioneer 10, powered by RTGs, with a large dish antenna and its own copy of the Pioneer plaque.',
    whySent:
      'To study Jupiter more closely and test the route to Saturn that Voyager would later use.',
    objectives: [
      'Make a close pass of Jupiter.',
      'Become the first spacecraft to visit Saturn.',
      'Study the outer solar system.',
    ],
    story:
      'Pioneer 11 dived much closer to Jupiter than Pioneer 10 — about 43,000 km above the cloud tops — and photographed its polar regions. Jupiter\'s gravity then flung it across the solar system to Saturn. On 1 September 1979, it flew under Saturn\'s rings, scouting a safe path for the Voyagers. Then it sailed outward until its power faded.',
    discoveries: [
      'First close-up observations of Saturn and its rings.',
      'Helped reveal Saturn\'s narrow F ring and measured Saturn\'s magnetic field.',
      'Took the first images of Jupiter\'s polar regions.',
    ],
    achievements: [
      'First spacecraft to fly past Saturn (1 September 1979).',
      'Used Jupiter\'s gravity to change course — an early gravity-assist trip to Saturn.',
    ],
    challenges: [
      'Survived Jupiter\'s intense radiation at a much closer distance than Pioneer 10.',
      'Power declined until its instruments could no longer operate.',
    ],
    ending:
      'Routine mission operations ended on 30 September 1995, when its power could no longer run its instruments. The last signal from Pioneer 11 was received later in 1995.',
    whereNow:
      'Drifting silently out of the solar system in the direction of the constellation Aquila. It was about 44 AU from the Sun when contact ended.',
    whyItMatters:
      'Pioneer 11 was the first visitor to Saturn — and it showed the Voyagers the way through the rings.',
    deepSpace: {
      distance: '≈ 6.5 billion km (≈ 44 AU) at last contact',
      au: 44,
      asOf: '1995 (last signal)',
      heading: 'Toward the constellation Aquila',
      region: 'Outer solar system / beyond',
    },
    lastMessage:
      'Jupiter threw me like a stone across a pond, all the way to Saturn. I was the first to fly beneath those rings — a scout checking that the path was safe for the travellers who came after me. When my power faded, I went quiet. I like to think the Voyagers waved as they passed through the gate I opened.',
    facts: [
      'Pioneer 11 came within about 43,000 km of Jupiter\'s cloud tops — about three times closer than Pioneer 10.',
      'Both Pioneers carry identical gold-anodised aluminium plaques.',
    ],
    timeline: [
      { date: '1973-04-06', type: 'launch', title: 'Pioneer 11 launches', description: 'Pioneer 11 lifts off (5 April local time).' },
      { date: '1974-12-02', type: 'event', title: 'Close Jupiter flyby', description: 'Pioneer 11 dives close to Jupiter and uses its gravity to head for Saturn.' },
      { date: '1979-09-01', type: 'discovery', title: 'First Saturn flyby', description: 'Pioneer 11 becomes the first spacecraft to visit Saturn.' },
      { date: '1995-09-30', type: 'end', title: 'Routine operations end', description: 'NASA ends Pioneer 11\'s routine mission as its power fails.' },
    ],
    sources: [
      { label: 'NASA Science — Pioneer 11', url: 'https://science.nasa.gov/mission/pioneer-11/' },
      { label: 'NSSDCA — Pioneer 11', url: NSSDCA('1973-019A') },
    ],
  },
  {
    id: 'new-horizons',
    name: 'New Horizons',
    shortName: 'New Horizons',
    destination: 'deep-space',
    status: 'active',
    travelling: true,
    statusNote: 'Active in the Kuiper Belt; woke from hibernation on 23 June 2026. Extended mission runs to 2029.',
    hardware: 'new-horizons',
    program: 'New Frontiers',
    tagline: 'The first spacecraft to explore Pluto up close.',
    launchDate: '2006-01-19',
    operations: 'January 2006 – present',
    activeFrom: 2006,
    activeTo: null,
    summary:
      'New Horizons flew past Pluto in July 2015, revealing a surprisingly active world with a giant heart-shaped glacier. In 2019 it visited Arrokoth, the most distant object ever explored up close.',
    whatItWas:
      'A piano-sized spacecraft powered by an RTG, with seven science instruments including high-resolution cameras and a dust counter built by students.',
    whySent:
      'To complete the first reconnaissance of Pluto and its moons, then explore the Kuiper Belt beyond.',
    objectives: [
      'Map the surfaces of Pluto and its largest moon, Charon.',
      'Study Pluto\'s atmosphere.',
      'Explore one or more Kuiper Belt objects.',
    ],
    story:
      'New Horizons left Earth faster than any spacecraft before it. After a gravity boost from Jupiter in 2007, it spent much of its long cruise hibernating. On 14 July 2015 it zoomed past Pluto and revealed mountains of water ice, glaciers of nitrogen ice and blue hazes. On 1 January 2019 it flew past Arrokoth, a primitive "snowman"-shaped object. In 2026 it woke from a 321-day hibernation, healthy and full of new data.',
    discoveries: [
      'Pluto has a vast heart-shaped plain of nitrogen ice (Sputnik Planitia) with flowing glaciers.',
      'Pluto has mountains of water ice and layers of blue haze in its atmosphere.',
      'Arrokoth is a "contact binary" — two lobes that gently merged — giving clues about how planets formed.',
    ],
    achievements: [
      'First spacecraft to explore Pluto (14 July 2015).',
      'Most distant object ever explored up close: Arrokoth (1 January 2019).',
      'Carries a small amount of the ashes of Clyde Tombaugh, who discovered Pluto in 1930.',
    ],
    challenges: [
      'Ten days before the Pluto flyby, the spacecraft went into safe mode; the team recovered it just in time.',
      'Data trickles home slowly — it took more than a year to download all the Pluto flyby data.',
    ],
    ending:
      'New Horizons\'s mission has not ended. It is active and travelling, with an extended mission running through 2029.',
    whereNow:
      'In the Kuiper Belt, about 9.5 billion km (5.9 billion mi) from Earth in mid-2026.',
    whyItMatters:
      'New Horizons turned Pluto from a fuzzy dot into a real, complex world — and showed small, distant worlds can be geologically alive.',
    deepSpace: {
      distance: '≈ 9.5 billion km (≈ 64 AU)',
      au: 64,
      asOf: 'June 2026',
      heading: 'Outward through the Kuiper Belt',
      region: 'Kuiper Belt',
    },
    lastMessage:
      'I flew for nine and a half years to meet a world you had only ever seen as a smudge. Pluto had a heart — a real, glowing, icy heart. I only had a few hours to say hello before I rushed past. Now I drift through the Kuiper Belt, sleeping for months, waking up to whisper home. I carry a little of the person who found Pluto. I think he would be happy.',
    facts: [
      'Pluto was still classified as a planet when New Horizons launched in January 2006.',
      'Signals from New Horizons take almost 9 hours to reach Earth.',
    ],
    timeline: [
      { date: '2006-01-19', type: 'launch', title: 'New Horizons launches', description: 'The fastest-launched spacecraft heads for Pluto.' },
      { date: '2007-02-28', type: 'event', title: 'Jupiter gravity assist', description: 'New Horizons swings past Jupiter, gaining speed.' },
      { date: '2015-07-14', type: 'discovery', title: 'Pluto flyby', description: 'New Horizons reveals Pluto\'s icy heart and mountains.' },
      { date: '2019-01-01', type: 'discovery', title: 'Arrokoth flyby', description: 'The most distant object ever explored up close.' },
      { date: '2026-06-23', type: 'event', title: 'Awake again', description: 'New Horizons wakes from a record 321-day hibernation in good health.' },
    ],
    sources: [
      { label: 'NASA Science — New Horizons', url: 'https://science.nasa.gov/mission/new-horizons/' },
      { label: 'Johns Hopkins APL — New Horizons', url: 'https://pluto.jhuapl.edu/' },
      { label: 'NSSDCA — New Horizons', url: NSSDCA('2006-001A') },
    ],
  },
];

/* Attach the credited NASA photo for each mission (see missionImages.json). */
const imageById = new Map<string, MissionImage>(
  missionImages.map((img) => [img.id, { ...img, localSrc: `images/${img.id}.jpg` }]),
);

export const missions: Mission[] = rawMissions.map((m) => ({ ...m, image: m.image ?? imageById.get(m.id) }));

export const getMissionById = (id: string): Mission | undefined => missions.find((m) => m.id === id);
