# Mission model

## Units

The interface uses kilograms, watts, watt-hours, kilometers, meters per second, minutes and millions of fictional US dollars. Engine specific impulse is in seconds. Orbital calculations use gravitational parameter in km³/s². Earth μ = 398600.4418; Moon μ = 4902.800066; Mars μ = 42828.375214. Body radii are fixed spherical approximations, not terrain models.

## Physical equations

- Circular orbital period: `T = 2π sqrt((R + h)^3 / μ)`, seconds; divide by 60 for minutes.
- Ideal maneuver capability: `Δv = Isp × 9.80665 × ln((dry + fuel) / dry)`.
- Propellant for a burn: `used = current_wet × (1 - exp(-Δv / (Isp × 9.80665)))`.
- Solar output at the destination: `P = array_rating_at_1_AU / distance_AU²`.
- Average generation: `Pavg = P × (1 - eclipse_fraction)`.
- Nominal load: housekeeping + instruments × duty + transmitter × nominal contact fraction.
- Nominal eclipse energy: `(housekeeping + duty-weighted instruments) × orbital_period_hours × eclipse_fraction`.

Every design must have positive nominal mean power balance and sufficient usable battery storage, in addition to meeting launch, cost, payload, objective and maneuver limits.

## Game assumptions

Earth, Moon and Mars eclipse fractions are fixed at 0.36, 0.34 and 0.30. Actual eclipse duration depends on geometry and season; APOGEE does not solve it. Nominal contacts are 0.45, 0.28 and 0.18 of time. Solar distance for Mars is fixed at 1.524 AU; actual heliocentric distance varies.

Costs, equipment characteristics, mission budget, launch capacities, scientific yields and data rates are author-defined educational values. Science points and currency are not actual mission forecasts. Engine package mass includes a fixed tank allowance; tank mass does not vary with fuel in this model. Maximum propellant is an abstract loading limit.

The launcher supplies low Earth orbit or planetary-transfer injection. Lunar and Martian insertion delta-v are fixed teaching values. Spacecraft fuel must cover insertion, 30 m/s final corrections, and a 60 m/s Earth or 80 m/s planetary terminal maneuver. An event may consume an additional 20 m/s. The final burn represents a simplified responsible end of mission, not a validated disposal trajectory or planetary protection assessment.

Coverage is approximated by the sine of the inclination folded around 90°, with a 0.15 floor. Mapping detail scales with the square root of reference altitude divided by design altitude and is capped to 0.65–1.35. These are heuristics, not instrument resolution or orbital ground-track calculations.

## Operations

There are 12 blocks of 2, 3 or 7 days for Earth, Moon and Mars. Each block is aggregated; the engine does not propagate second-by-second orbital positions. The preview is explicitly a schematic, not a flight-dynamics display.

Modes change science and downlink effort. Observe requests 1.25× nominal science; transmit returns 2× nominal data with no new collection; safe pauses collection and uses 0.25× nominal downlink. Science effort is capped at 100% instrument duty. Discovery requests up to 1.45× current collection and adds a 20% operations power penalty. Intensified loads can exceed nominal power margins and trigger load shedding.

A seeded pseudo-random generator varies observing/link conditions from 0.88 to 1.08 of nominal. Science production also responds to health and mapping quality. The same blueprint, seed and actions yield identical results. Event timing and type are fixed teaching sequences, not random flight-failure probabilities.

A FIFO queue stores data and its associated science value. Downlink returns a proportional amount of the queued science. Unreturned observations do not earn credit. Net downlink ratings are fictional Mbit per block at nominal contacts, not raw bit rates or solved RF link budgets.

Mean-energy shortfalls over a multi-day block consume modeled battery charge, reduce operations to sustainable generation and incur a health penalty. Eclipse overloads incur additional load shedding and damage. The charge shown is an aggregated energy indicator, not an orbit-resolved battery profile.

## Rehearsal and scoring

The design rehearsal runs 32 independent seeds using the same balanced strategy and event schedule. It protects against radiation if funds permit, recalibrates pointing if affordable, executes the navigation correction and uses the routine discovery response. Displayed completions are game outcomes only, not statistical estimates of real mission reliability.

Success requires all of: 12 completed blocks, returned science at or above target, health above 30%, and a completed terminal maneuver. Score out of 1000 = 650 × capped science fraction + 150 × final health fraction + 100 × remaining contingency / original budget + 100 if terminal maneuver is complete. Remaining contingency includes event costs.

## Primary sources

1. [NASA Basics of Space Flight: Gravity & Mechanics](https://science.nasa.gov/learn/basics-of-space-flight/chapter3-4/)
2. [NASA Glenn: Ideal Rocket Equation](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/ideal-rocket-equation/)
3. [NASA Glenn: Specific Impulse](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/specific-impulse/)
4. [NASA Basics of Space Flight: Onboard Systems / Power](https://science.nasa.gov/learn/basics-of-space-flight/chapter11-3/)
5. [NASA Small Spacecraft Technology: Power](https://www.nasa.gov/smallsat-institute/sst-soa/power-subsystems/)
6. [NASA Basics of Space Flight: Navigation](https://science.nasa.gov/learn/basics-of-space-flight/chapter13-1/)

These sources support the engineering principles; they do not validate the game's invented costs, equipment, science yield or success scores.
