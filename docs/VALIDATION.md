# Validation record

Validated on 2026-10-08 for version 2.0.1.

## Completed

- 58 automated tests passed.
- Original lab: physical equation checks, invalid design rejection, deterministic replay, all three starter blueprints, seeded rehearsals, power shedding, fuel retirement, data-return conservation and UI launch-to-debrief integration.
- Adventure: first expedition, finite-resource full campaign completion, scanner/shield gates, mass and power constraints, reclaim/refund behavior, oxygen recovery, radiation protection, hull repair, save reconstruction and safe departure requirements.
- Cruise assist: reached every marked destination from the spawn point, without collision damage or recovery, in bounded navigation tests.
- Procedural rendering: finite geometry, finite transforms, camera projection and explicit WebGL-unavailable fallback; checked through a GL adapter.
- HUD integration: intro/start, map selection, cruise, salvage, return docking, ice collection, life-support fabrication, field log, handbook and restored progress; checked through DOM and GL adapters.
- JavaScript syntax checks passed for both engines and both UI modules plus both renderers.
- Static distribution verification passed for all 13 required assets.

## Mobile startup repair

- Matched shared shader uniform precision across stages; removed an unused fragment-stage uniform. The GL adapter now rejects mismatched shared uniform declarations.
- Automatic software perspective renderer activates when WebGL is missing or shader initialization fails. A fresh canvas avoids the browser restriction on changing an acquired canvas context type.
- Forced compatibility mode via `?graphics=canvas` and a title-screen button; expedition state stays shared across graphics modes.
- GL context loss switches to software graphics without discarding saves. Rebound drag controls on the replacement canvas.
- Phone rendering uses a lower pixel ratio, fewer stars/debris and a 30 fps graphics budget; survival timing stays independent.
- Added portrait/landscape projection tests at every site, unsupported-WebGL and shader-link-failure startup tests, and full introductory UI progression with WebGL unavailable.
- Touch controls respond to coarse pointers in landscape as well as portrait; enlarged controls, adjusted safe-area spacing and released held inputs by pointer ID.

## Limits

No real browser visual QA or GPU rendering check was available. Phone hardware remains unverified. DOM/GL adapters do not compile shaders on a GPU or validate final pixels. Desktop/mobile layout, touch handling in a real browser, download dialogs, actual WebGL context restoration, audio, service-worker installation and offline behavior remain unverified in a browser.

GitHub workflows are included but are not claimed to have run. Hosting success is verified separately by the native deployment result. The source package excludes deployment identities, Git metadata and credentials.

## Browser acceptance pass

1. Start the frontier on desktop and mobile; inspect the first-person scene and HUD.
2. Drag-look, fly with keyboard/touch, select a map target and engage cruise.
3. Salvage a wreck, collect ice, dock and install habitat life support.
4. Scan a signal, return its data and reload to verify progress.
5. Test optional sound, pause/backgrounding, export/import and graphics restoration.
6. Complete the discovery-to-departure path and check mass-limit module reclamation.
7. Open the engineering lab; confirm its separate saved flights remain available.
8. After one successful online load, check offline caching where supported.
