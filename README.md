# APOGEE — The Quiet Frontier

**Far from home. Close to wonder.**

APOGEE now combines a first-person **space survival adventure** with a separate **Mission Design Lab**. The survival experience is inspired by the exploration, shelter, crafting and discovery loop of survival games, with an original setting, story, interface and procedural artwork.

Independent educational project; not affiliated with or endorsed by NASA or any commercial game studio.

## Play

Serve `dist/` with any static web server. No package installation, API key, account or backend is required.

```sh
python3 -m http.server 8080 --directory dist
```

Open **http://localhost:8080** for the adventure, or **http://localhost:8080/lab.html** for the engineering lab. Opening HTML directly as local files is unsupported because the game uses JavaScript modules.

The adventure uses WebGL with an automatic Canvas 2D compatibility renderer when graphics initialization fails. Both modes share the full exploration, survival and crafting systems. Add `?graphics=canvas` to force compatibility mode. Phones use a reduced rendering resolution and frame rate.

## The Quiet Frontier

Your survey skiff is stranded beside damaged **Habitat 07**, in orbit around the fictional world **Vesper**. Salvage wrecks, gather ice and metal, study resonant crystals, and recover three mysterious signal records. Repair your shelter and design a return craft that can take the observations home.

- Original procedural 3D world with a ringed giant, stars, an orbital habitat, wrecks, deposits and signal structures.
- First-person flight, mouse/touch drag look, keyboard and mobile flight controls.
- Optional cruise assistance with avoidance of marked site obstacles.
- Oxygen, expedition energy, hull health, cargo limits and an outer radiation boundary.
- Nine craftable modules: life support, solar power, oxygen storage, propulsion, scanner, radiation protection, cargo, relay and return stage.
- A **300 kg mission design limit**, generation/load check and finite mission budget. Optional upgrades compete for capacity.
- Module reclamation returns materials and budget, enabling design revisions without progression dead ends.
- Three exploration regions and a complete discovery-to-departure story.
- Buffered science must be returned to the habitat. Emergency recovery preserves cargo but loses unreturned surveys.
- Local saves and portable expedition-save export/import.
- Optional original synthesized ambient tone; no recorded music or external assets.
- Explicit pauses on menus, window blur and backgrounding. No offline survival drain.

### Flight controls

| Action | Control |
| --- | --- |
| Flight / strafe | WASD |
| Look | Drag the 3D view |
| Turn / pitch | Arrow keys |
| Ascend / descend | Space / Ctrl |
| Boost | Shift |
| Interact, scan or dock | E |
| Cruise toward target | C |
| Home course | H |
| Map / journal / fabricator | M / J / F |
| Pause | Esc |

On mobile, use the flight buttons and drag-look, or select a map target and engage cruise. Cruise stops near the target; interaction is manual.

### First expedition

1. Recover materials from the broken survey skiff.
2. Collect water ice from the blue seam.
3. Return to Habitat 07 and dock.
4. Build habitat life support.
5. Follow the first signal. Return the survey before exploring farther.
6. Build a scanner and shielding, discover the remaining records, and integrate the relay and return stage.

## Mission Design Lab

The original design experience remains at `lab.html` and retains its separate save records:

- Earth, Moon and Mars mission scenarios.
- Live budget, launch mass, power, eclipse battery and maneuver checks.
- Documented circular orbital period, ideal rocket equation and inverse-square solar power.
- Required payloads, launch vehicles, science data queues and a 32-seed rehearsal.
- Twelve operation blocks with mission events, debriefs and flight comparisons.
- JSON blueprint import/export and Markdown flight reports.

## Access and offline use

Runtime assets use relative URLs and no external fonts, images, APIs or libraries. A service worker can cache both experiences after a successful online load. Offline behavior depends on browser support and successful caching. Saves stay on the current device; export/import is the transfer mechanism.

## Engineering model and boundaries

Both experiences are educational games, **not real mission performance or reliability predictions**. The adventure uses fictional oxygen, flight, power and survival systems with direct free-space motion. It does not propagate orbits. The laboratory uses bounded engineering equations and assumptions. Costs, launcher capacities, equipment, data rates, science points, fixed eclipse fractions and events are fictional. Launch ascent and interplanetary transfers are abstracted. Orbital perturbations, RF link budgets, actual station schedules, detailed thermal analysis and tank sizing are not solved.

The model distinguishes physical equations from design assumptions in the in-game **Model & Sources** panel and [model documentation](docs/MODEL.md). NASA references inform the physics; no NASA insignia or third-party artwork is used.

## Verify

Node.js 20 or later:

```sh
npm test
npm run check
npm run build
```

No `npm install` is necessary. The 58 tests cover both game engines, complete survival progression from finite world resources, cruise routes, crafting constraints, save restoration, procedural rendering data, HUD interactions and the laboratory launch-to-debrief flow. Rendering tests use WebGL and Canvas adapters; UI tests exercise both normal and WebGL-unavailable startup, graphics context loss, and expedition progression through a DOM adapter. The adapter tests do **not** replace visual browser QA.

Validation record: [docs/VALIDATION.md](docs/VALIDATION.md).

## Deploy

Any static host can serve the contents of `dist/`. All asset URLs are relative, so repository subpaths work.

A manual GitHub Pages workflow is included. After creating a public repository:

1. Set **Settings → Pages → Source** to **GitHub Actions**.
2. Run **Actions → Deploy APOGEE to Pages → Run workflow**.
3. Use the URL returned by that workflow.

The CI workflow runs the test suite, syntax checks and distribution verification on pushes and pull requests. No repository secrets are required for either workflow.

## Project structure

```text
dist/                 Both complete static game experiences
  engine.js           Pure mission evaluation and simulation
  app.js              Interface, persistence, import/export
  style.css           Responsive visual system
  sw.js               Offline cache
  index.html          Survival adventure entry point
  lab.html            Mission Design Lab entry point
  survival.js         Survival, crafting and progression engine
  frontier.js         Adventure HUD, input and persistence
  frontier.css        Cockpit and adventure interface
  space-renderer.js   Original procedural WebGL renderer
  canvas-renderer.js  Software perspective graphics and automatic fallback
  icon.svg            Original vector icon
  manifest.webmanifest
scripts/build.mjs     Distribution verification
tests/                Engine and DOM-adapter integration tests
docs/                 Model, validation, challenge pitch and demo script
.github/workflows/    CI and manual Pages deployment
```

## Classroom use

Teams can assign science, systems and operations roles around one browser. Export a blueprint to compare team designs under the same seed and decision sequence. The game does not provide multiplayer, cloud synchronization or a global leaderboard.

## License

MIT. See [LICENSE](LICENSE). Primary references are linked, not bundled. The source package contains no credentials or personal account information.
