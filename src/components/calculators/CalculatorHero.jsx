import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Shared calculator hero — refined dark slate with an emerald brand glow.
// Server-compatible (no hooks); used by calculator pages and landing pages so
// every tool shares one cohesive, on-brand header instead of a rainbow of colours.
//
// Props:
//   eyebrow    - small label above the title (e.g. "Free calculator")
//   title      - main heading (string)
//   subtitle   - supporting line
//   backHref / backLabel - the "back" link
//   badges     - [{ icon: LucideIcon, label: string }]
export default function CalculatorHero({
  eyebrow = 'Free calculator',
  title,
  subtitle,
  backHref = '/calculators',
  backLabel = 'Back to Calculators',
  badges = [],
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gray-950">
      {/* Ambient emerald glow (top-left) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-hero-glow"
        style={{
          background:
            'radial-gradient(70% 60% at 18% -10%, rgba(34,197,94,0.30), transparent 60%), radial-gradient(55% 50% at 100% 0%, rgba(16,185,129,0.16), transparent 55%)',
        }}
      />
      {/* Fine grid texture, faded toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, #000 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 30%, #000 40%, transparent 80%)',
        }}
      />
      {/* Top + bottom hairlines */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <Link
          href={backHref}
          className="animate-hero-rise inline-flex items-center text-sm text-gray-400 transition-colors hover:text-white"
          style={{ animationDelay: '0ms' }}
        >
          <ArrowLeft className="mr-2" size={16} />
          {backLabel}
        </Link>

        {eyebrow && (
          <div
            className="animate-hero-rise mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-400"
            style={{ animationDelay: '70ms' }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-400 shadow-[0_0_12px_2px_rgba(34,197,94,0.7)]" />
            {eyebrow}
          </div>
        )}

        <h1
          className="animate-hero-rise mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl"
          style={{ animationDelay: '140ms' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="animate-hero-rise mt-5 max-w-2xl text-lg leading-relaxed text-gray-300/90"
            style={{ animationDelay: '210ms' }}
          >
            {subtitle}
          </p>
        )}

        {badges.length > 0 && (
          <div
            className="animate-hero-rise mt-8 flex flex-wrap gap-2.5"
            style={{ animationDelay: '280ms' }}
          >
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-gray-200 backdrop-blur-sm"
              >
                {Icon && <Icon className="text-primary-400" size={15} />}
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
