# Chapter 1 — Summary

*One page. Everything from Chapter 1 that can be examined, in the order you will need it.*

---

## The formulas

| Formula | What it is, and when |
|---|---|
| Aₓ = A cos θ, Aᵧ = A sin θ | Components — only if θ is from **+x**, counterclockwise |
| A = √(Aₓ² + Aᵧ²) | Magnitude from components; add `A_z²` in 3D |
| tan θ = Aᵧ / Aₓ | Direction from components; add 180° if `Aₓ < 0` |
| A = Aₓ î + Aᵧ ĵ + A_z k̂ | Unit-vector form — asked for by name in exams |
| Rₓ = Aₓ + Bₓ, Rᵧ = Aᵧ + Bᵧ | Vector addition; never add magnitudes |
| A · B = AB cos φ | Dot product, φ tail to tail; its sign is the sign of work |
| A · B = AₓBₓ + AᵧBᵧ + A_zB_z | Dot product from components; equate both to get φ |
| \|A × B\| = AB sin φ | Cross product size; direction by right-hand rule |
| Cₓ = AᵧB_z − A_zBᵧ (cyclic) | Cross product components, cycling x → y → z → x |

## Units

| | |
|---|---|
| Base units used here | m, kg, s, A |
| Derived | N = kg·m/s² · J = N·m · W = J/s · C = A·s · V = J/C |
| Prefixes | T 10¹² · G 10⁹ · M 10⁶ · k 10³ · c 10⁻² · m 10⁻³ · **μ 10⁻⁶** · n 10⁻⁹ · p 10⁻¹² |
| Squared/cubed | 1 cm² = 10⁻⁴ m² · 1 cm³ = 10⁻⁶ m³ |
| Conversion method | Multiply by fractions equal to 1 so the unwanted unit cancels |

## Significant figures

| Operation | Rule | Example |
|---|---|---|
| × or ÷ | Fewest **significant figures** wins | `12.7 × 3.1 = 39 ` (2 s.f.) |
| + or − | Fewest **decimal places** wins | `45.7 + 2.348 = 48.0` |
| Exact numbers (½, 2π, counts) | Unlimited s.f. | Never limit the answer |
| Rounding | Once, at the very end | Keep full precision between parts |

## Dimensional check

`[x] = L`, `[v] = L/T`, `[a] = L/T²`, `[F] = ML/T²`, `[E] = ML²/T²`.
Every term added or equated must match. Proves a formula **wrong**, never right — pure numbers are invisible to it.

## The standard problem types

| Asked for | First line of the solution |
|---|---|
| "Write **v** in terms of î and ĵ" | Differentiate/collect components, then `v = vₓ î + vᵧ ĵ` |
| Resultant of two or more vectors | Resolve each into components, add separately, rebuild |
| Angle between two vectors | `cos φ = (A · B)/(AB)` using the component form on top |
| Is this force doing positive work? | Sign of `F · d` |
| Torque of a force about a point | `τ = rF sin φ`, direction from the right-hand rule |
| Anything on an incline | Rotate the axes: along the slope and perpendicular to it |
| A unit vector pointing along **A** | `Â = A / A` |

## The traps, in the order they cost marks

1. `|A + B| ≠ A + B`. Magnitudes never add.
2. Calculator `arctan` returns −90°…+90°. Check the component signs; add 180° when `Aₓ < 0`. **Always sketch.**
3. `A cos θ` is the x-component only if θ is measured from the x-axis. From the y-axis, sin and cos swap. This is the incline problem in one line.
4. cm² → 10⁻⁴ m², not 10⁻².
5. μ = 10⁻⁶, and mg = 10⁻⁶ kg.
6. Components are signed numbers; magnitudes are never negative.
7. `A × B = −(B × A)`; `A × A = 0`.
8. `A · B = 0` → perpendicular. `A × B = 0` → parallel or antiparallel.
9. Round once, at the end.
10. Units carried through each line are a free error-check — use them.

## The 8 things most likely to appear on the exam

1. **Resolve a vector into components and rebuild it**, with the quadrant correct — a step inside almost every later problem rather than a question of its own.
2. **"Write the position/velocity/acceleration in terms of the unit vectors î and ĵ"** — the midterm asks in exactly these words.
3. **A resultant of two or three vectors** given as magnitudes and directions (forces at a point, displacements, velocities).
4. **The angle between two vectors** from `A · B = AB cos φ`.
5. **The sign of `F · d`** deciding whether work is positive, negative or zero.
6. **`τ = rF sin φ`** and the right-hand rule for its direction.
7. **Unit conversion inside a bigger problem** — cm² to m² in a capacitor question, g/cm³ to kg/m³, μC to C.
8. **Significant figures in the final answer**, and the instruction "1 significant figure is enough" meaning an estimate is wanted.

---

> *Independent study guide for College Physics IA. Problem material adapted from OpenStax University Physics Volumes 1–2, © OpenStax/Rice University, licensed under CC BY 4.0. Explanations, worked solutions and commentary are original work. Not affiliated with or endorsed by any university or instructor.*
