import { GUIDE } from '../../config/guide.js'

/**
 * Original stylized guide character (SVG). States are driven by data-state on the
 * wrapper: idle | listening | thinking | speaking. All motion lives in index.css
 * behind prefers-reduced-motion: no-preference.
 */
export default function StylizedGuide() {
  const c = GUIDE.appearance
  return (
    <svg viewBox="0 0 200 200" className="guide-svg h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="guide-bg" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#13314a" />
          <stop offset="100%" stopColor="#0b1220" />
        </radialGradient>
        <clipPath id="guide-disc"><circle cx="100" cy="100" r="94" /></clipPath>
      </defs>

      {/* Workshop disc with restrained circuit traces */}
      <circle cx="100" cy="100" r="94" fill="url(#guide-bg)" />
      <g clipPath="url(#guide-disc)" stroke={c.accent} strokeOpacity="0.22" strokeWidth="1.2" fill="none">
        <path d="M6 64h34l10-10h22" />
        <path d="M194 58h-30l-9 9h-20" />
        <path d="M6 128h20l8 8" />
        <path d="M194 122h-22l-8 8" />
        <g fill={c.accent} fillOpacity="0.45" stroke="none">
          <circle cx="72" cy="54" r="2" /><circle cx="135" cy="67" r="2" /><circle cx="34" cy="136" r="2" /><circle cx="164" cy="130" r="2" />
        </g>
      </g>
      <circle cx="100" cy="100" r="94" fill="none" stroke={c.accent} strokeOpacity="0.35" strokeWidth="1.5" />

      <g clipPath="url(#guide-disc)">
        <g className="guide-body">
          {/* Shoulders / hoodie */}
          <path d="M34 200c2-34 26-52 66-52s64 18 66 52z" fill={c.top} />
          <path d="M78 150c6 10 14 15 22 15s16-5 22-15" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <path d="M90 164v18M110 164v18" stroke={c.accent} strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          <circle cx="90" cy="184" r="2.2" fill={c.accent} /><circle cx="110" cy="184" r="2.2" fill={c.accent} />
          {/* Chest chip */}
          <rect x="126" y="170" width="16" height="12" rx="2" fill="#0f172a" stroke={c.accent} strokeOpacity="0.6" />
          <path d="M130 170v-3M134 170v-3M138 170v-3M130 182v3M134 182v3M138 182v3" stroke={c.accent} strokeOpacity="0.6" strokeWidth="1" />

          {/* Neck */}
          <path d="M88 132h24v20c-4 4-8 6-12 6s-8-2-12-6z" fill={c.skinShade} />

          <g className="guide-head">
            {/* Ears */}
            <ellipse cx="61" cy="98" rx="7" ry="10" fill={c.skinShade} />
            <ellipse cx="139" cy="98" rx="7" ry="10" fill={c.skinShade} />
            {/* Head */}
            <ellipse cx="100" cy="94" rx="38" ry="44" fill={c.skin} />
            {/* Hair: short crop with a clean line-up */}
            <path d="M62 86c-2-28 16-42 38-42s40 14 38 42c-4-10-9-15-14-17-8 4-20 6-30 5-10-1-17-4-21-6-5 3-9 9-11 18z" fill={c.hair} />
            {/* Light beard line */}
            <path d="M68 108c3 18 16 30 32 30s29-12 32-30c-4 10-9 15-14 17-5 2-11 3-18 3s-13-1-18-3c-5-2-10-7-14-17z" fill={c.hair} opacity="0.9" />

            {/* Brows */}
            <path className="guide-brow" d="M78 84q8-5 16 0" stroke={c.hair} strokeWidth="3.4" strokeLinecap="round" fill="none" />
            <path className="guide-brow" d="M106 84q8-5 16 0" stroke={c.hair} strokeWidth="3.4" strokeLinecap="round" fill="none" />

            {/* Eyes */}
            <g className="guide-eyes">
              <ellipse cx="86" cy="96" rx="5" ry="5.6" fill="#0b0f19" />
              <ellipse cx="114" cy="96" rx="5" ry="5.6" fill="#0b0f19" />
              <circle cx="88" cy="94" r="1.6" fill="#e2e8f0" />
              <circle cx="116" cy="94" r="1.6" fill="#e2e8f0" />
            </g>

            {/* Nose */}
            <path d="M100 100q-5 9 0 11" stroke={c.skinShade} strokeWidth="2.4" strokeLinecap="round" fill="none" />

            {/* Mouth: smile at rest, open shape while speaking */}
            <path className="guide-mouth-rest" d="M89 120q11 7 22 0" stroke="#f1e4d8" strokeWidth="3" strokeLinecap="round" fill="none" />
            <ellipse className="guide-mouth-open" cx="100" cy="121" rx="8" ry="4.5" fill="#2a1410" stroke="#f1e4d8" strokeWidth="1.6" />

            {/* Headset */}
            <path d="M58 92c0-34 18-54 42-54s42 20 42 54" fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
            <path d="M58 92c0-34 18-54 42-54s42 20 42 54" fill="none" stroke={c.accent} strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
            <rect x="51" y="86" width="13" height="22" rx="5" fill="#0f172a" stroke={c.accent} strokeOpacity="0.7" />
            <rect x="136" y="86" width="13" height="22" rx="5" fill="#0f172a" stroke={c.accent} strokeOpacity="0.7" />
            <path d="M57 106c2 14 10 20 22 21" fill="none" stroke="#0f172a" strokeWidth="3.4" strokeLinecap="round" />
            <circle className="guide-mic" cx="81" cy="127" r="3.6" fill={c.accent} />
          </g>

          {/* Thinking dots */}
          <g className="guide-thinking" fill={c.accent}>
            <circle cx="140" cy="44" r="3" /><circle cx="150" cy="38" r="3" /><circle cx="160" cy="32" r="3" />
          </g>
        </g>
      </g>
    </svg>
  )
}
