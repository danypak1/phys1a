# Chapter 1 — Units, Vectors and the Language of Physics
## Core Notes

*Everything in this chapter, taught from zero. You do not need the lecture slides or the textbook to follow this. Assumed: high-school algebra and trigonometry. Calculus appears from Chapter 2 onwards.*

---

## Learning objectives

By the end of this chapter you should be able to:

1. Name the SI base quantities used in this course and their units, and use the prefixes from p to T
2. Convert any unit safely by multiplying by chains of "1", including squared and cubed units
3. Use a dimensional check to reject a wrong formula **before** substituting numbers
4. Apply the significant-figure rules for multiplication/division and for addition/subtraction, and know when *not* to round
5. State the difference between a scalar and a vector, and between distance and displacement
6. Resolve any vector into components, including vectors pointing into the second, third and fourth quadrants
7. Recover a vector's magnitude and direction from its components — and get the angle right, which a calculator will not do for you
8. Add and subtract vectors by components, in two and three dimensions, using unit-vector notation
9. Compute a scalar (dot) product two ways, and use it to find the angle between two vectors
10. Compute a vector (cross) product two ways, and get its direction from the right-hand rule
11. Choose axes that make a problem short instead of long

---

## 1.1 What this chapter is for

Physics is the business of replacing a messy real situation with a **model** simple enough to calculate and honest enough to be right. A brick falling off a roof becomes "a point mass with constant downward acceleration". A wire becomes "a cylinder of uniform resistivity". Every chapter of this course is a set of models plus the rules for using them.

Two things make that possible, and both are in this chapter:

- **Units**, so that a number means something and a wrong formula can be caught before it costs you marks.
- **Vectors**, because almost every quantity in mechanics and electromagnetism has a direction, and the whole term consists of adding, resolving and multiplying directed quantities.

> This chapter looks like the easy one. It is the one that quietly decides your grade. Nearly every problem later in the course — a block on an incline, a projectile, the field of a charged rod — is solved in the first two lines by resolving something into components along well-chosen axes. Students who lose marks on those problems usually lost them here.

Where this course goes: **mechanics** (motion, forces, energy, momentum, rotation) for the first half, **electromagnetism** (charge, field, potential, capacitance, current, circuits) for the second. The mathematics of this chapter serves both. The dot product you meet here reappears as work in Chapter 6 and as electric flux in Chapter 12; the cross product reappears as torque in Chapter 10.

---

## 1.2 SI units, base quantities and prefixes

A physical quantity is a **number together with a unit**. "The mass is 3" is not physics; "the mass is 3 kg" is.

Since 1960 the international standard has been the **SI** system (*Système International*). Everything in this course is built from four base quantities:

| Base quantity | SI unit | Symbol |
|---|---|---|
| Length | metre | m |
| Mass | kilogram | kg |
| Time | second | s |
| Electric current | ampere | A |

(SI has three more base units — kelvin, mole, candela — which belong to the thermodynamics and optics courses.)

Everything else is **derived**: built from the base units by multiplication and division.

| Quantity | Unit | In base units |
|---|---|---|
| Force | newton, N | kg·m/s² |
| Energy, work | joule, J | kg·m²/s² |
| Power | watt, W | kg·m²/s³ |
| Charge | coulomb, C | A·s |
| Potential | volt, V | kg·m²/(s³·A) |
| Resistance | ohm, Ω | V/A |
| Capacitance | farad, F | C/V |

You are not asked to memorise the last column, but you should be able to rebuild any row of it from a formula you know. From `W = Fd` you get J = N·m. From `P = W/t` you get W = J/s. That habit is what makes the dimensional check in §1.4 possible.

### Prefixes

A prefix multiplies the unit by a power of ten. The ones this course uses:

| Prefix | Symbol | Factor |
|---|---|---|
| tera | T | 10¹² |
| giga | G | 10⁹ |
| mega | M | 10⁶ |
| kilo | k | 10³ |
| centi | c | 10⁻² |
| milli | m | 10⁻³ |
| micro | μ | 10⁻⁶ |
| nano | n | 10⁻⁹ |
| pico | p | 10⁻¹² |

Two prefixes that cause real losses in exams:

- **μ (micro) is 10⁻⁶.** A 6.0 μC charge is 6.0 × 10⁻⁶ C. Reading it as 10⁻³ is a factor-of-a-thousand error, and in Coulomb's law, where charge appears twice, that becomes a factor of a million.
- **The kilogram is the base unit, not the gram.** A mass given as 6.3 mg is 6.3 × 10⁻⁶ kg, not 6.3 × 10⁻³.

---

## 1.3 Unit conversion done safely

Never "move the decimal point and hope". Multiply by fractions that equal 1, arranged so the unwanted unit cancels.

**Worked example — a speed limit.** Convert 88 km/h to m/s.

```
88 km   1000 m    1 h
---- × ------- × ------
 h      1 km     3600 s
```

The km cancels top and bottom, and the h cancels; what is left is m/s:

`88 × 1000 / 3600 = 24.4 m/s`

**Worked example — a squared unit.** A sheet of area 1800 cm² (this exact number appears in the mock final's capacitor problem). In m²:

Because 1 cm = 10⁻² m, we have 1 cm² = (10⁻² m)² = 10⁻⁴ m². So

`1800 cm² = 1800 × 10⁻⁴ m² = 0.180 m²`

> The commonest conversion mistake in this course is treating cm² as if it were 10⁻² m². Square the whole factor, including the power of ten: cm² → 10⁻⁴ m², cm³ → 10⁻⁶ m³.

**Worked example — a compound unit.** Steel has density 7.8 g/cm³. In SI:

`7.8 g/cm³ × (10⁻³ kg / 1 g) × (1 cm³ / 10⁻⁶ m³) = 7.8 × 10³ kg/m³ = 7800 kg/m³`

### Carry the units through the arithmetic

Write units in every line, not just the last one. They multiply and cancel like algebra, and if the unit that survives is not the unit you expected, the line above it is wrong. This costs nothing and catches a large fraction of all slips.

---

## 1.4 Dimensional analysis: catching a wrong formula early

Every term that is added, subtracted, or set equal to another must have the **same dimensions**. Length can only equal length; you may not add a velocity to an acceleration.

Write `[x]` for "the dimensions of x", using L, M, T for length, mass, time:

- `[x] = L`, `[v] = L/T`, `[a] = L/T²`, `[F] = ML/T²`, `[E] = ML²/T²`

**Worked example.** Chapter 2 will give you `x = x₀ + v₀t + ½aₓt²`. Check it:

| Term | Dimensions | Simplifies to |
|---|---|---|
| `x`, `x₀` | L | L |
| `v₀t` | (L/T)·T | L |
| `½aₓt²` | (L/T²)·T² | L |

All three are lengths, so the equation is dimensionally possible. Notice that the check says nothing about the ½ — **dimensional analysis cannot catch a wrong pure number**, only a wrong structure.

**Worked example — catching a real error.** Suppose under pressure you write `v² = v₀² + 2aₓt`. Check the last term: `[aₓt] = (L/T²)·T = L/T`. But `[v²] = L²/T²`. They disagree, so the formula is wrong, and you know it in five seconds without remembering the correct one. (The correct version is `v² = v₀² + 2aₓ(x − x₀)`, and `[aₓ·x] = (L/T²)·L = L²/T²` ✓.)

> Use this on every formula you are unsure of on exam day, especially in electromagnetism where the formulas are less familiar. It never proves a formula right, but it very often proves one wrong — and a formula proven wrong is one you stop wasting time on.

---

## 1.5 Uncertainty and significant figures

Every measurement carries uncertainty. "The diameter is 1.02 mm" claims three digits of confidence; writing 1.0200 mm would be a lie about the instrument.

**Multiplication or division:** the result carries the number of significant figures of the *least precise* input.

`12.7 m × 3.1 m = 39.37 m² → 39 m²` (3.1 has two significant figures, so the answer gets two)

**Addition or subtraction:** the result carries the number of *decimal places* of the input with the fewest.

`45.7 s + 2.348 s = 48.048 s → 48.0 s` (45.7 is known only to one decimal place)

Counting significant figures:

- Non-zero digits always count: 4.31 → 3 s.f.
- Zeros between digits count: 305 → 3 s.f.
- Leading zeros never count: 0.0042 → 2 s.f.
- Trailing zeros after a decimal point count: 4.20 → 3 s.f.
- Trailing zeros in a whole number are ambiguous: write 4.0 × 10² if you mean two.

Scientific notation removes the ambiguity: `1.32578 × 10⁷ × 4.11 × 10⁻³ = 5.45 × 10⁴` (three s.f., set by 4.11).

> **Round once, at the end.** Rounding at every intermediate step accumulates error, and in a multi-part exam problem where part (d) uses your answer to part (a), an early rounding can move the final digit. Keep the full value in your calculator, and write down three or four figures as you go.

Exact numbers — the 2 in `2πr`, the ½ in `½mv²`, a count of "3 resistors" — have unlimited significant figures and never limit the result.

**A practical exam rule:** unless the question says otherwise, give three significant figures. The data in this course is nearly always given to two or three, and three is safe. A part that says "1 significant figure is enough" (as one mock-final part does) is telling you it wants an estimate, not a demonstration of arithmetic.

---

## 1.6 Estimates and sanity checks

Before accepting an answer, ask whether the size is believable. A car that accelerates at 400 m/s², a person of mass 6 kg, a resistance of 10⁹ Ω in a lamp circuit — all are arithmetic slips announcing themselves.

Useful reference magnitudes for this course:

| Quantity | Order of magnitude |
|---|---|
| Free-fall acceleration at Earth's surface | 9.8 m/s² |
| Walking speed | ~1.5 m/s |
| Highway speed | ~30 m/s (≈ 110 km/h) |
| Mass of an adult | ~70 kg |
| Radius of an atom | ~10⁻¹⁰ m |
| Charge of an electron | 1.6 × 10⁻¹⁹ C |
| Household voltage | ~10² V |

The check costs two seconds and catches errors that the algebra does not.

---

## 1.7 Scalars and vectors

A **scalar** is fully described by a number with a unit: time, mass, temperature, energy, electric charge, potential.

A **vector** needs a magnitude *and* a direction: displacement, velocity, acceleration, force, electric field.

Notation used in these notes, since the site cannot print arrows over letters:

- **A** (bold) means the vector; `A` (plain) means its magnitude, which is never negative.
- In your own handwriting, put an arrow over every vector symbol. Examiners take the absence of the arrow as a claim about a scalar, and in electromagnetism that can lose a mark on its own.

### Distance and displacement are not the same quantity

**Displacement** is the vector from the starting point to the ending point. It depends only on those two points — not on the path.

Walk 3 km east, then 4 km north. The **distance travelled** is 7 km (a scalar, path-dependent). The **displacement** is a vector of magnitude `√(3² + 4²) = 5 km`, pointing north-east of the start.

> Walk any closed loop, however long, and your displacement is exactly zero while the distance travelled is not. The same distinction returns as speed vs velocity in Chapter 2, and again as "work done by a conservative force around a closed path" in Chapter 7.

### Equal, parallel, negative

- Two vectors are **equal** if they have the same magnitude and the same direction — *wherever they are drawn*. A vector has no fixed location.
- Two vectors are **parallel** if they point the same way, **antiparallel** if opposite.
- **−A** has the same magnitude as **A** and the opposite direction.

---

## 1.8 Components of a vector

Put the vector's tail at the origin and drop perpendiculars to the axes. With θ measured **counterclockwise from the +x-axis**:

`Aₓ = A cos θ`  and  `Aᵧ = A sin θ`

and going back the other way:

`A = √(Aₓ² + Aᵧ²)`  and  `tan θ = Aᵧ / Aₓ`

> **Components are numbers, not vectors.** `Aₓ` is a signed number; the *component vector* is `Aₓ î`. This distinction is why a component can be negative while a magnitude never is.

**Worked example.** A displacement of magnitude 5.0 m at 37° above the +x-axis:

`Aₓ = 5.0 cos 37° = 4.0 m`, `Aᵧ = 5.0 sin 37° = 3.0 m`

(37°, 53° and the 3-4-5 triangle appear constantly in this course's exam papers. Worth knowing by heart: sin 37° ≈ 0.60, cos 37° ≈ 0.80, tan 37° ≈ 0.75.)

### Signs by quadrant

| Direction of the vector | Aₓ | Aᵧ |
|---|---|---|
| First quadrant (0°–90°) | + | + |
| Second quadrant (90°–180°) | − | + |
| Third quadrant (180°–270°) | − | − |
| Fourth quadrant (270°–360°) | + | − |

The formulas `A cos θ` and `A sin θ` produce these signs automatically **provided θ is measured counterclockwise from +x**. If you instead measure the angle from the y-axis or from the nearest axis — which is often what a figure gives you — then cos and sin swap, and you must reason from the diagram rather than from the formula.

> **The single most common vector error in this course:** using an angle measured from the vertical (or from a surface) as if it were measured from +x. Before writing `A cos θ`, look at your diagram and ask: *is this angle between the vector and the x-axis?* If it is between the vector and the y-axis, then the x-component is `A sin θ`. On an inclined plane in Chapter 5 this decides whether you write `mg sin θ` or `mg cos θ`, and every mark of the problem follows from it.

### The arctan trap

Your calculator's `arctan` returns an angle between −90° and +90°. It cannot know which quadrant you meant, because `tan θ` has the same value for θ and θ + 180°.

**Worked example.** A vector has `Aₓ = 2.0 m`, `Aᵧ = −2.0 m`. Then `tan θ = −1`, and the calculator says −45°. Two angles have a tangent of −1: 135° and 315°. Sketching the vector (right and down → fourth quadrant) shows the answer is **315°** (equivalently −45°).

If instead `Aₓ = −2.0 m` and `Aᵧ = +2.0 m`, the calculator still says −45°, but the vector points up and to the left, so the answer is **135°**.

**Rule:** compute `arctan(Aᵧ/Aₓ)`, then look at the *signs of the components* and add 180° if `Aₓ` is negative. Always sketch. A correct magnitude with a wrong quadrant is a wrong vector.

---

## 1.9 Adding and subtracting vectors

Graphically, **A** + **B** is found head-to-tail (or by the parallelogram). That is useful for seeing the answer, useless for computing it.

> **Magnitudes do not add.** `C = A + B` does *not* imply `C = A + B` for the magnitudes. The magnitude of the sum is between `|A − B|` and `A + B`, and it equals the sum only when the two are parallel.

The reliable method is components. To add any number of vectors:

1. Resolve each into components.
2. Add the components separately: `Rₓ = Aₓ + Bₓ + …`, `Rᵧ = Aᵧ + Bᵧ + …`
3. Rebuild the magnitude and direction, checking the quadrant.

**Worked example.** **A** has magnitude 5.0 m at 37°; **B** has magnitude 6.0 m at 143°. Find **R** = **A** + **B**.

```
Ax = 5.0 cos 37° = +3.99 m
Ay = 5.0 sin 37° = +3.01 m
Bx = 6.0 cos 143° = −4.79 m
By = 6.0 sin 143° = +3.61 m

Rx = 3.99 − 4.79 = −0.80 m
Ry = 3.01 + 3.61 = +6.62 m
R  = √(0.80² + 6.62²) = 6.67 m
```

Direction: `arctan(6.62 / −0.80)` gives −83.1° on the calculator. But `Rₓ < 0` and `Rᵧ > 0`, so **R** lies in the second quadrant: add 180° to get **96.9°** from the +x-axis. Sketch it — a short leftward step and a long upward one — and 96.9° is obviously right while −83.1° is obviously not.

**Subtraction** is addition of the negative: **A** − **B** = **A** + (−**B**), i.e. subtract componentwise.

`(A − B)ₓ = 3.99 − (−4.79) = +8.78 m`, `(A − B)ᵧ = 3.01 − 3.61 = −0.60 m`
`|A − B| = 8.81 m` at `arctan(−0.60/8.78) = −3.9°` (fourth quadrant, and `Aₓ > 0`, so no 180° correction).

---

## 1.10 Unit vectors and three dimensions

A **unit vector** has magnitude exactly 1 and no units. Its only job is to point. Write `î`, `ĵ`, `k̂` for the unit vectors along +x, +y, +z.

Any vector is then the sum of its component vectors:

`A = Aₓ î + Aᵧ ĵ + A_z k̂`

and addition becomes pure bookkeeping:

`A + B = (Aₓ + Bₓ) î + (Aᵧ + Bᵧ) ĵ + (A_z + B_z) k̂`

In three dimensions the magnitude is `A = √(Aₓ² + Aᵧ² + A_z²)`.

**Worked example.** **A** = 2 î + ĵ − k̂ and **B** = 3 ĵ + 4 k̂.

`A + B = 2 î + 4 ĵ + 3 k̂`, and `|A + B| = √(4 + 16 + 9) = √29 = 5.39`

Unit-vector notation is what exam questions mean by "write the velocity in terms of the unit vectors î and ĵ" — a phrase that appears verbatim on the midterm. The answer they want is an expression like `v = 4 î + (8t + 11) ĵ` m/s, with units stated once at the end.

To build a unit vector **in the direction of** a given vector **A**, divide by its magnitude: `Â = A / A`. This is used constantly in electromagnetism, where a field is written as a magnitude times a unit vector pointing away from the charge.

---

## 1.11 The scalar (dot) product

The dot product of two vectors is a **scalar**:

`A · B = A B cos φ`

where φ is the angle between them when placed tail to tail (0° ≤ φ ≤ 180°). In components:

`A · B = AₓBₓ + AᵧBᵧ + A_zB_z`

The two forms are equal, which makes the dot product the standard tool for finding an angle.

Sign, and what it means geometrically:

| φ | A · B | Meaning |
|---|---|---|
| 0° | +AB | Same direction — maximum |
| 0° < φ < 90° | positive | **B** has a component along **A** |
| 90° | 0 | Perpendicular — no component along **A** |
| 90° < φ < 180° | negative | **B** has a component *against* **A** |
| 180° | −AB | Opposite directions — minimum |

Because `î · î = 1` and `î · ĵ = 0`, the component form follows from the definition in two lines. Note also `A · B = B · A` (order does not matter) and `A · A = A²`.

**Worked example — the angle between two vectors.** A force **F** = (12 î − 5 ĵ) N acts while the object undergoes displacement **d** = (4 î + 3 ĵ) m.

```
F · d = (12)(4) + (−5)(3)
      = 48 − 15 = 33 J
F = √(144 + 25) = 13 N
d = √(16 + 9)  = 5 m
cos φ = 33 / (13 × 5) = 0.508
φ = 59.5°
```

That dot product **is** the work done by the force — Chapter 6 introduces no new mathematics, only a new name. The sign is the reason work can be negative: a friction force at φ = 180° to the displacement gives `W = −fd`.

The dot product also runs the whole of Chapter 12: electric flux is `Φ = E · A`, which is why flux through a surface parallel to the field is zero.

---

## 1.12 The vector (cross) product

The cross product of two vectors is a **vector**:

`C = A × B`, with magnitude `C = A B sin φ`

Its direction is perpendicular to the plane containing **A** and **B**, given by the **right-hand rule**: point the fingers of your right hand along **A**, curl them toward **B**, and your thumb points along **A** × **B**.

Consequences worth memorising:

- `A × B = −(B × A)` — the order matters, unlike the dot product.
- `A × A = 0`, and the cross product of any two parallel or antiparallel vectors is zero (`sin 0° = sin 180° = 0`).
- The magnitude is largest when the vectors are perpendicular — exactly the opposite behaviour to the dot product.
- `î × ĵ = k̂`, `ĵ × k̂ = î`, `k̂ × î = ĵ` (cyclic; reverse the order and you pick up a minus sign).

In components:

```
Cx = AyBz − AzBy
Cy = AzBx − AxBz
Cz = AxBy − AyBx
```

The pattern is easier to remember as a cycle x → y → z → x: each component is built from the *other two* indices, first term in cyclic order, second term reversed.

**Worked example — components.** **A** = 2 î + ĵ − k̂, **B** = 3 ĵ + 4 k̂ (so `Bₓ = 0`).

```
Cx = (1)(4) − (−1)(3) = 7
Cy = (−1)(0) − (2)(4) = −8
Cz = (2)(3) − (1)(0)  = 6

A × B = 7 î − 8 ĵ + 6 k̂
|A × B| = 12.2
```

Check it against the other form: `A = 2.45`, `B = 5.00`, and `A · B = −1`, so `cos φ = −0.0816`, `φ = 94.7°` and `AB sin φ = 2.45 × 5.00 × 0.9967 = 12.2` ✓. Two independent routes to the same number is the best self-check you have.

**Worked example — a torque.** A spanner is 0.25 m long and you pull on its end with a 50 N force at 30° to the spanner:

`τ = rF sin φ = (0.25 m)(50 N)(sin 30°) = 6.25 N·m`

Pull perpendicular to the spanner instead (φ = 90°) and you get 12.5 N·m from the same force — which is why you push a wrench sideways, not along its handle. Chapter 10 does this in detail; the mathematics is already here.

---

## 1.13 Choosing axes — the skill that shortens every later problem

Nothing in physics requires x to be horizontal. Axes are yours to choose, and a good choice can turn a two-page problem into three lines. Two rules:

1. **Put one axis along the direction of motion or of the acceleration.** Then the other axis has zero acceleration, and Newton's second law along it becomes a simple equilibrium equation.
2. **Put an axis along the direction of the quantity you were asked about**, so that the answer is a component you already have.

**Worked example — a block on a 30° incline.** Take x along the slope (pointing down the slope) and y perpendicular to it. The weight, magnitude `w = mg`, is vertical, which is now at 30° to the −y-axis:

```
wx = mg sin 30°   (down slope)
wy = −mg cos 30°  (into surface)
```

For m = 2.0 kg and g = 9.80 m/s²: `wₓ = 9.8 N`, `|wᵧ| = 17.0 N`.

Notice which function goes with which: **the component along the slope carries sin θ**, because θ is the angle between the weight and the perpendicular to the slope, not between the weight and the slope. Sketch the triangle once, convince yourself, and this stops being something to memorise.

> If you had left the axes horizontal and vertical, the normal force and the friction force would both need resolving instead, and the acceleration — which points along the slope — would have two components. Same physics, three times the algebra, three times the chances of a sign error.

---

## Common mistakes

1. **Adding magnitudes instead of vectors.** `|A + B| ≠ A + B` unless they are parallel. Always resolve into components first.
2. **Trusting the calculator's arctan.** It cannot see your diagram. Check the signs of the components; add 180° when `Aₓ < 0`.
3. **Using an angle measured from the wrong axis.** `A cos θ` is the x-component only when θ is measured from the x-axis. Otherwise sin and cos swap.
4. **Squaring a prefix incompletely.** 1 cm² = 10⁻⁴ m², not 10⁻² m²; 1 cm³ = 10⁻⁶ m³.
5. **Reading μ as milli.** μ = 10⁻⁶. In Coulomb's law a charge appears squared, so the error is a factor of 10⁶.
6. **Rounding intermediate results**, then finding that part (d) of the problem no longer matches the answer key.
7. **Treating a component as a vector** (or writing a negative magnitude). Magnitudes are never negative; components carry the sign.
8. **Forgetting that the cross product's order matters.** `A × B = −(B × A)`; the sign is the direction of a torque or an angular momentum.
9. **Dropping units mid-calculation** and losing the free error-check they provide.
10. **Assuming a dimensional check proves a formula right.** It only ever proves one wrong; the pure numbers (½, 2π) are invisible to it.

---

## Check yourself

1. Convert 2.5 g/cm³ to kg/m³.
2. A rectangle measures 3.6 m by 0.85 m. Give its area to the correct number of significant figures.
3. Is `v = at²/x` dimensionally possible as an expression for a velocity? Show the check.
4. A vector has components `Aₓ = −3.0`, `Aᵧ = −4.0`. Give its magnitude and its direction measured counterclockwise from the +x-axis.
5. **A** has magnitude 8.0 at 60°; **B** has magnitude 5.0 at 180°. Find the magnitude and direction of **A** + **B**.
6. If `A · B = 0` and neither vector is zero, what do you know about them? What if `A × B = 0` instead?
7. **F** = (3 î + 4 ĵ) N moves an object through **d** = (2 î − 6 ĵ) m. Compute `F · d` and state whether the force did positive or negative work.
8. Compute (2 î) × (3 ĵ) and (3 ĵ) × (2 î).
9. A 4.0 kg block sits on a 25° incline. Write the components of its weight along and perpendicular to the slope, with numbers.
10. Why is it wrong to say "the displacement is 12 m"? What is missing, and when would the statement be acceptable?

---

### Answers to Check yourself

1. `2.5 g/cm³ × (10⁻³ kg/g) × (1 cm³/10⁻⁶ m³) = 2.5 × 10³ kg/m³ = 2500 kg/m³`.

2. `3.6 × 0.85 = 3.06 m²`. Both inputs have two significant figures, so the answer is **3.1 m²**.

3. `[at²/x] = (L/T²)(T²)/L = 1`, which is dimensionless — but a velocity must be L/T. **Not possible.**

4. `A = √(9 + 16) = 5.0`. `arctan(−4/−3) = arctan(1.33) = 53.1°`, but both components are negative, so the vector is in the third quadrant: **233.1°** (i.e. 53.1° + 180°).

5. `Aₓ = 8.0 cos 60° = 4.00`, `Aᵧ = 8.0 sin 60° = 6.93`; `Bₓ = −5.00`, `Bᵧ = 0`. So `Rₓ = −1.00`, `Rᵧ = 6.93`, `R = √(1.00 + 48.0) = 7.00`. `arctan(6.93/−1.00) = −81.8°`, and `Rₓ < 0`, so the direction is **98.2°**.

6. `A · B = 0` with both non-zero means they are **perpendicular** (φ = 90°). `A × B = 0` means `sin φ = 0`, so they are **parallel or antiparallel**.

7. `F · d = (3)(2) + (4)(−6) = 6 − 24 = −18 J`. Negative, so the force did **negative work** — it had a component opposing the displacement.

8. `(2 î) × (3 ĵ) = 6 (î × ĵ) = 6 k̂`. Reversing the order reverses the sign: `(3 ĵ) × (2 î) = −6 k̂`.

9. `w = mg = 4.0 × 9.80 = 39.2 N`. Along the slope: `mg sin 25° = 39.2 × 0.4226 = 16.6 N`. Perpendicular: `mg cos 25° = 39.2 × 0.9063 = 35.5 N`.

10. Displacement is a vector, so a magnitude alone does not specify it — the **direction is missing**. The statement is acceptable only if you say "the *magnitude* of the displacement is 12 m", or if the motion is along a stated line and the sign carries the direction (as in one-dimensional motion in Chapter 2).

---

> *Independent study guide for College Physics IA. Problem material adapted from OpenStax University Physics Volumes 1–2, © OpenStax/Rice University, licensed under CC BY 4.0. Explanations, worked solutions and commentary are original work. Not affiliated with or endorsed by any university or instructor.*
