import { FingeringHoles, HoleState } from '@/data/notes';

interface Props {
  holes: FingeringHoles;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: { w: 52, h: 180, r: 6, rSmall: 4, bodyW: 24 },
  md: { w: 66, h: 220, r: 8, rSmall: 5, bodyW: 30 },
  lg: { w: 80, h: 260, r: 10, rSmall: 6, bodyW: 36 },
};

function Hole({
  cx,
  cy,
  r,
  state,
}: {
  cx: number;
  cy: number;
  r: number;
  state: HoleState;
}) {
  if (state === 'closed') {
    return <circle cx={cx} cy={cy} r={r} fill="#1f2937" />;
  }
  if (state === 'open') {
    return <circle cx={cx} cy={cy} r={r} fill="white" stroke="#1f2937" strokeWidth="1.5" />;
  }
  // half = top half closed, bottom half open (for pinched thumb)
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="white" stroke="#1f2937" strokeWidth="1.5" />
      <path
        d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`}
        fill="#1f2937"
      />
    </g>
  );
}

export default function FingeringDiagram({ holes, size = 'md' }: Props) {
  const { w, h, r, rSmall, bodyW } = SIZE_MAP[size];
  const cx = w / 2;

  // Vertical positions for each element
  const thumbY = h * 0.08;
  const h1Y = h * 0.20;
  const h2Y = h * 0.29;
  const h3Y = h * 0.38;
  const sepY = h * 0.44;   // separator line
  const h4Y = h * 0.51;
  const h5Y = h * 0.60;
  const h6Y = h * 0.70;
  const h7Y = h * 0.81;

  const bodyTop = thumbY - r - 4;
  const bodyBot = h7Y + rSmall + 8;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-label="Vingerzetting diagram"
    >
      {/* Recorder body */}
      <rect
        x={(w - bodyW) / 2}
        y={bodyTop}
        width={bodyW}
        height={bodyBot - bodyTop}
        rx={bodyW / 2}
        fill="#f0e8d8"
        stroke="#c4a882"
        strokeWidth="1.5"
      />

      {/* Thumb hole (slightly left to indicate back) */}
      <Hole cx={cx - bodyW * 0.3} cy={thumbY} r={r} state={holes.thumb} />
      {/* Label for thumb */}
      <text x={cx + bodyW * 0.25} y={thumbY + 4} fontSize="9" fill="#9ca3af" fontFamily="sans-serif">D</text>

      {/* H1 */}
      <Hole cx={cx} cy={h1Y} r={r} state={holes.h1} />
      {/* H2 */}
      <Hole cx={cx} cy={h2Y} r={r} state={holes.h2} />
      {/* H3 */}
      <Hole cx={cx} cy={h3Y} r={r} state={holes.h3} />

      {/* Separator line (left hand / right hand) */}
      <line
        x1={(w - bodyW) / 2 - 2}
        y1={sepY}
        x2={(w + bodyW) / 2 + 2}
        y2={sepY}
        stroke="#c4a882"
        strokeWidth="2"
      />

      {/* H4 */}
      <Hole cx={cx} cy={h4Y} r={r} state={holes.h4} />
      {/* H5 */}
      <Hole cx={cx} cy={h5Y} r={r} state={holes.h5} />

      {/* H6 — double hole (two small circles side by side) */}
      <Hole cx={cx - rSmall - 2} cy={h6Y} r={rSmall} state={holes.h6L} />
      <Hole cx={cx + rSmall + 2} cy={h6Y} r={rSmall} state={holes.h6R} />

      {/* H7 — double hole */}
      <Hole cx={cx - rSmall - 2} cy={h7Y} r={rSmall} state={holes.h7L} />
      <Hole cx={cx + rSmall + 2} cy={h7Y} r={rSmall} state={holes.h7R} />
    </svg>
  );
}
