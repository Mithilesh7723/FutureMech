# Hero 3D Revamp Plan — Full Scene

## The Concept: "Diagnostic Breakdown"

A cinematic 3D scene where the BMW M4 sits center-stage with its internals "exploded" around it — crankshaft/pistons floating above the hood, battery hovering with a holographic health ring, and a tablet showing diagnostics in the corner. Tells the story: *"We see inside your car."*

---

## Available Models

| Model | Format | Raw Size | Web-Ready? | Action Needed |
|-------|--------|----------|------------|---------------|
| BMW M4 | GLTF + .bin | 29MB + 643KB | No — too heavy | Draco compress → ~3-5MB GLB |
| Crankshaft/Pistons | FBX | 8.5MB | No — wrong format | FBX → GLB + Draco compress |
| Battery | OBJ | 77KB | Almost — OBJ works | Copy to `public/models/` |
| iPad Pro | SKP | 2.7MB | No — SketchUp format | Convert to GLB (online converter or Blender) |
| Textures | ZIP | 814KB | — | Unpack, may not apply to web versions |

**⚠️ The BMW's 29MB `.bin` is the bottleneck.** After Draco compression it should drop to 3–5MB, which is acceptable with lazy loading.

---

## Step 1: Model Optimization (pre-build)

### 1a. Convert BMW GLTF → Draco-compressed GLB
```bash
npx @gltf-transform/cli optimize scene.gltf bmw.glb --compress draco
```
- Input: `3d Models/bmw_m4/scene.gltf` + `scene.bin`
- Output: `public/models/bmw.glb` (~3-5MB estimated)
- Draco compression strips redundant vertex data

### 1b. Convert Crankshaft FBX → Draco-compressed GLB
```bash
npx fbx2gltf Crankshaft_Pistons.fbx -o crankshaft.glb
npx @gltf-transform/cli optimize crankshaft.glb crankshaft_opt.glb --compress draco
```
- Input: `3d Models/crankshaft/Crankshaft_Pistons.fbx`
- Output: `public/models/crankshaft.glb` (~1-2MB estimated)

### 1c. Battery OBJ → copy as-is
- Copy `SM_Battery_01.obj` → `public/models/battery.obj`
- 77KB, no conversion needed. R3F/OBJ loader handles it.

### 1d. iPad Pro SKP → GLB
- Convert using online tool (sketchfab export or convertio) or Blender
- Output: `public/models/tablet.glb`
- If conversion fails: skip tablet, use a flat plane with a React-rendered diagnostic dashboard as texture

---

## Step 2: Install Dependencies

```bash
npm install @react-three/fiber @react-three drei three
npm install -D @types/three
```

---

## Step 3: New Files

### `src/components/home/HeroScene.tsx` — Main 3D Canvas
- `<Canvas>` with `frameloop="demand"`, `dpr={[1, 1.5]}`, `gl={{ antialias: true, alpha: true }}`
- **Scene composition:**
  - BMW M4: center-right, slight 3/4 angle, slow Y-rotation (0.1 rpm idle)
  - Crankshaft: floating above car's hood area, independent slow rotation on X-axis
  - Battery: right side, hovering with glowing bronze torus ring orbiting it
  - Tablet: lower-right foreground, tilted toward camera, showing diagnostic UI (either 3D model screen texture or a `<Html>` overlay from drei)
- **Lighting:**
  - `<Environment preset="studio" />` for realistic reflections on car paint
  - Warm bronze `<pointLight>` key light from upper-left
  - Cool blue `<pointLight>` fill from lower-right (contrast)
  - `<spotLight>` rim light from behind for edge definition
- **Atmosphere:**
  - Floating bronze dust particles (`<Points>` from drei)
  - Subtle fog for depth
- **Scroll animation** (via `useScroll` from drei or framer-motion-3d):
  - Entry: all components scale from 0 → 1 with staggered delay
  - Car arrives first (0ms), crankshaft (200ms), battery (400ms), tablet (600ms)
  - Continuous: slow idle rotation on all components
  - Scroll-linked: car rotates more as user scrolls down

### `src/components/home/HeroFallback.tsx` — Loading Skeleton
- Gradient shimmer placeholder matching Canvas dimensions
- Shows a subtle car silhouette outline
- No layout shift

### `src/components/home/HeroScene_wrapper.tsx` — Dynamic Import Wrapper
```tsx
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <HeroFallback />,
})
```

---

## Step 4: Modify `Hero.tsx`

- **Remove**: Entire "Right: Report Card" section (lines 107-189)
- **Add**: `<HeroScene />` in right column, `className="hidden lg:block"`
- **Add**: Mobile fallback — static image of BMW (Unsplash or a pre-rendered screenshot of the 3D scene)
- Lazy-load via `next/dynamic` with `ssr: false`

---

## Step 5: `next.config.ts` Changes

- No remote pattern changes needed (models served from `public/`)
- May need to increase `outputFileTracingIncludes` if models are large

---

## Step 6: Performance Guardrails

| Technique | Purpose |
|-----------|---------|
| `next/dynamic` ssr:false | No server-side rendering of 3D |
| `frameloop="demand"` | Only render when animation active |
| `dpr={[1, 1.5]}` | Cap pixel ratio for perf |
| Draco compression | Reduce model file sizes 5-10x |
| Intersection observer | Pause rendering when hero off-screen |
| Mobile fallback | Static image on screens < lg breakpoint |
| `Suspense` boundary | Graceful loading states |

---

## File Manifest

| File | Action |
|------|--------|
| `package.json` | Add `@react-three/fiber`, `@react-three/drei`, `three` |
| `public/models/bmw.glb` | **NEW** — compressed BMW model |
| `public/models/crankshaft.glb` | **NEW** — compressed engine model |
| `public/models/battery.obj` | **NEW** — copied battery model |
| `public/models/tablet.glb` | **NEW** — converted iPad model (if possible) |
| `src/components/home/HeroScene.tsx` | **NEW** — R3F Canvas scene |
| `src/components/home/HeroFallback.tsx` | **NEW** — loading skeleton |
| `src/components/home/Hero.tsx` | Remove report card, add 3D scene |

---

## Visual Result

**Left side**: Headline "We Diagnose Before We Recommend" + CTAs (unchanged)

**Right side**: A cinematic 3D scene — black BMW M4 with crankshaft floating above the hood, battery hovering to the side with a glowing bronze ring, tablet in the corner showing diagnostics. Warm studio lighting, bronze dust particles, everything slowly rotating. When the page loads, components animate in with staggered timing.

**Mobile**: Static hero image, no 3D.
