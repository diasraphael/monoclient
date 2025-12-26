# CSS-Only Animations Guide

## Lightweight & Performant - No JavaScript Required!

All animations are pure CSS, hardware-accelerated, and super lightweight. Just add class names!

---

## 🎬 Entrance Animations

### Fade In

```tsx
<div className="animate-fade-in">Content fades in smoothly</div>
```

### Slide Up

```tsx
<div className="animate-slide-up">Content slides up from bottom</div>
```

### Slide from Left/Right

```tsx
<div className="animate-slide-in-left">
  Slides in from left
</div>

<div className="animate-slide-in-right">
  Slides in from right
</div>
```

### Scale In

```tsx
<div className="animate-scale-in">Scales up smoothly</div>
```

---

## 🔄 Continuous Animations

### Floating Effect

```tsx
<div className="animate-float">Gently floats up and down</div>
```

### Pulse

```tsx
<button className="animate-pulse">Subtle pulsing effect</button>
```

### Spin

```tsx
<svg className="animate-spin">Spinning loader</svg>
```

### Bounce

```tsx
<div className="animate-bounce">Bouncing element</div>
```

### Glow

```tsx
<button className="animate-glow">Glowing effect</button>
```

---

## ⏱️ Staggered Animations

Add delays for staggered effects:

```tsx
<div className="animate-slide-up delay-100">First</div>
<div className="animate-slide-up delay-200">Second</div>
<div className="animate-slide-up delay-300">Third</div>
<div className="animate-slide-up delay-400">Fourth</div>
```

---

## 🎯 Hover Effects

### Lift on Hover

```tsx
<div className="hover-lift">Lifts up with shadow on hover</div>
```

### Scale on Hover

```tsx
<div className="hover-scale">Scales up slightly on hover</div>
```

### Brightness on Hover

```tsx
<img className="hover-brightness" src="/image.jpg" alt="..." />
```

### Glow on Hover

```tsx
<button className="hover-glow">Glows on hover</button>
```

---

## ✨ Button Shine Effect

```tsx
<button className="btn-shine bg-rose-800 px-6 py-3 rounded-lg text-white">
  Hover me for shine effect
</button>
```

---

## 💀 Loading Skeletons

```tsx
{
  /* Light mode */
}
<div className="skeleton h-4 w-3/4 rounded" />;

{
  /* Dark mode */
}
<div className="skeleton-dark h-4 w-3/4 rounded" />;
```

---

## 📖 Complete Examples

### Animated Card

```tsx
<div className="animate-slide-up hover-lift bg-white rounded-2xl p-6 shadow-lg">
  <h3 className="text-2xl font-bold">Card Title</h3>
  <p>Card content with entrance animation and hover lift</p>
</div>
```

### Animated Button

```tsx
<button className="btn-shine hover-glow bg-gradient-to-r from-rose-700 to-rose-900 px-8 py-4 rounded-xl text-white font-semibold">
  Donate Now
</button>
```

### Image with Zoom

```tsx
<div className="overflow-hidden rounded-xl">
  <img className="hover-scale" src="/image.jpg" alt="Description" />
</div>
```

### Staggered List

```tsx
<div className="space-y-4">
  <div className="animate-slide-in-left delay-100">Item 1</div>
  <div className="animate-slide-in-left delay-200">Item 2</div>
  <div className="animate-slide-in-left delay-300">Item 3</div>
</div>
```

### Floating Icon

```tsx
<div className="animate-float">
  <svg className="w-12 h-12 text-rose-600">{/* Your icon */}</svg>
</div>
```

### Loading State

```tsx
{
  isLoading ? (
    <div className="space-y-3">
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-32 w-full rounded" />
    </div>
  ) : (
    <YourContent />
  );
}
```

---

## 🎨 Combining Animations

You can combine multiple classes:

```tsx
{
  /* Entrance + Hover */
}
<div className="animate-slide-up hover-lift">
  Slides in, then lifts on hover
</div>;

{
  /* Entrance + Continuous */
}
<div className="animate-fade-in animate-float delay-200">
  Fades in with delay, then floats continuously
</div>;

{
  /* Multiple hover effects */
}
<button className="hover-lift hover-glow btn-shine">All the effects!</button>;
```

---

## 🚀 Quick Implementation Checklist

### 1. Hero Section

- [ ] Add `animate-slide-up` to main heading
- [ ] Add `animate-fade-in delay-200` to description
- [ ] Add `btn-shine hover-lift` to CTA button

### 2. Feature Cards

- [ ] Add `animate-slide-up` to each card
- [ ] Add `hover-lift` for interaction
- [ ] Use delay classes for staggered effect

### 3. Images

- [ ] Add `hover-scale` to gallery images
- [ ] Add `hover-brightness` to hero images
- [ ] Wrap in div with `overflow-hidden` for zoom effect

### 4. Navigation

- [ ] Add smooth transitions (already applied globally)
- [ ] Add `hover-lift` to navigation items
- [ ] Add `btn-shine` to donate button

### 5. Loading States

- [ ] Replace empty states with `skeleton` animations
- [ ] Add to image placeholders
- [ ] Use while content loads

---

## 💡 Pro Tips

### 1. Don't Overdo It

```tsx
{
  /* ❌ Too much */
}
<div className="animate-slide-up animate-bounce animate-float hover-lift hover-scale">
  Overkill!
</div>;

{
  /* ✅ Just right */
}
<div className="animate-slide-up hover-lift">Perfect balance</div>;
```

### 2. Use Delays Wisely

```tsx
{/* Create rhythm with delays */}
<h1 className="animate-slide-up">Heading</h1>
<p className="animate-slide-up delay-100">Subheading</p>
<button className="animate-slide-up delay-200">CTA</button>
```

### 3. Group Related Animations

```tsx
{
  /* All cards animate together */
}
<div className="grid grid-cols-3 gap-6">
  {cards.map((card, i) => (
    <div
      key={card.id}
      className={`animate-slide-up delay-${i * 100} hover-lift`}
    >
      {card.content}
    </div>
  ))}
</div>;
```

---

## ⚡ Performance

All animations are:

- ✅ Hardware accelerated (uses GPU)
- ✅ 60fps smooth
- ✅ Lightweight (pure CSS)
- ✅ No JavaScript overhead
- ✅ Accessible (respects `prefers-reduced-motion`)

---

## 🎯 Next Steps

1. Pick 3-5 components to animate
2. Add entrance animations first
3. Add hover effects second
4. Test on mobile
5. Adjust timing if needed

Start simple, test often!
