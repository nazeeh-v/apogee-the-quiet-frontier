# The Quiet Frontier — game design

## Intent

A space survival and exploration experience with an original setting, inspired by the feeling of leaving a safe shelter, gathering materials, building better equipment, and uncovering a story through exploration. No commercial game's assets, characters, music, map or dialogue are copied.

## Loop

Shelter → select expedition → travel → salvage or survey → return data and materials → fabricate → reach deeper space → integrate a return mission.

The 15 marked sites include one habitat, four wrecks, three alloy deposits, two ice seams, two crystal deposits and three signal sites. Background debris is decorative. Collision checks and cruise avoidance apply to the marked site bounds.

## Mission constraints

The craft starts with a 60 kg platform, 120 design-power generation and 25 housekeeping load. Integrated mission mass is capped at 300 kg. The mission begins with 125 fictional credits. Fabrication consumes finite gathered materials and available budget. A solar upgrade adds 120 generation. These are game values, not real spacecraft specifications.

Required end-game systems include habitat life support, a science relay and a return stage. A spectral scanner and radiation shield unlock deeper surveys. Full required equipment, solar support and an extended oxygen tank total 291 kg; retaining an additional drive exceeds capacity. Players can choose a different optional upgrade or reclaim modules. Reclamation returns all materials and credits to avoid irreversible design traps.

## Survival and pacing

Undocked oxygen drains at 0.42 game units/second. Basic capacity is 100, upgraded capacity is 170. Flight consumes expedition energy; boost costs more. Empty power reduces flight speed rather than stranding the player permanently. Oxygen depletion or a destroyed hull triggers recovery at the habitat, preserves cargo and removes buffered surveys. Returned records remain secure.

Radiation exposure occurs beyond 1300 game meters without shielding. All survival values are authored gameplay abstractions. Oxygen tanks, shielding and reactor behavior are not real safety models.

Menu panels and backgrounding pause survival. Docking recharges expedition power and oxygen and stores cargo. Emergency recovery does not represent a real rescue process.

## Science return

Each signal reveals a record and buffers a survey. Docking secures it. The return stage requires all three surveys to be returned, plus an online relay. This carries the original game's central lesson into the adventure: collecting data is not the same as returning science.

## Rendering

WebGL 1 renderer with procedural meshes, original shaders, star points, a banded gas giant, orbital structures and deposits. No downloaded models, texture files, engine library or external asset dependency. First-person look uses drag input, not pointer lock. Motion is direct free flight, not orbital dynamics.

## Save compatibility

The adventure uses `apogee-frontier-v2`; the lab keeps `apogee-v1`. Expedition saves are versioned and portable via JSON. Import reconstructs known fields and validates the design limits. No cloud synchronization or multiplayer is included.

## Boundary

This is a bounded, playable survival adventure with a full discovery-to-departure path. It is not a commercial-scale open-world game. The separate Mission Design Lab supplies documented engineering equations and NASA reference links.
