// Treble clef staff with a single note head.
// staffPosition: 0 = E4 (bottom line), 2 = G4, 4 = B4, 6 = D5, 8 = F5 (top line)
// Odd numbers = spaces, Even numbers = lines
// Above staff: 9=G5, 10=A5, 11=B5, 12=C6

interface Props {
  staffPosition: number;
  noteName?: string; // optional label shown inside/below the note
}

const BOTTOM_Y = 95;     // y-coordinate of bottom staff line (E4)
const LINE_GAP = 14;     // pixels between adjacent staff lines
const HALF_GAP = LINE_GAP / 2;  // pixels per staff position step

// y-coordinate for a given staff position
function posY(pos: number): number {
  return BOTTOM_Y - pos * HALF_GAP;
}

// The 5 staff lines are at even positions 0, 2, 4, 6, 8
const STAFF_LINE_POSITIONS = [0, 2, 4, 6, 8];
const STAFF_LINE_Y = STAFF_LINE_POSITIONS.map(posY); // [95, 81, 67, 53, 39]

const SVG_WIDTH = 180;
const SVG_HEIGHT = 130;

// Note x position (after the clef)
const NOTE_X = 130;

export default function NoteOnStaff({ staffPosition }: Props) {
  const ny = posY(staffPosition);

  // Ledger lines: needed for positions above top line (>8) or below bottom line (<0)
  const ledgerLinePositions: number[] = [];
  if (staffPosition >= 10) {
    // Add ledger lines at 10, 12, ... up to staffPosition (rounded to even)
    for (let p = 10; p <= staffPosition; p += 2) {
      ledgerLinePositions.push(p);
    }
  }
  if (staffPosition <= -2) {
    for (let p = -2; p >= staffPosition; p -= 2) {
      ledgerLinePositions.push(p);
    }
  }

  // Stem: goes up for notes below middle line (pos < 4), down for above
  const stemUp = staffPosition < 4;
  const stemX = stemUp ? NOTE_X + 6 : NOTE_X - 6;
  const stemY1 = ny;
  const stemY2 = stemUp ? ny - LINE_GAP * 3 : ny + LINE_GAP * 3;

  return (
    <svg
      width={SVG_WIDTH}
      height={SVG_HEIGHT}
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      aria-label="Noot op notenbalk"
    >
      {/* Staff lines */}
      {STAFF_LINE_Y.map((y, i) => (
        <line key={i} x1="18" y1={y} x2={SVG_WIDTH - 8} y2={y} stroke="#1f2937" strokeWidth="1.2" />
      ))}

      {/* Treble clef using Unicode musical symbol */}
      <text
        x="8"
        y={posY(2) + 8}
        fontSize="54"
        fontFamily="'Times New Roman', 'Georgia', serif"
        fill="#1f2937"
        dominantBaseline="middle"
      >
        𝄞
      </text>

      {/* Ledger lines */}
      {ledgerLinePositions.map((pos, i) => (
        <line
          key={i}
          x1={NOTE_X - 12}
          y1={posY(pos)}
          x2={NOTE_X + 12}
          y2={posY(pos)}
          stroke="#1f2937"
          strokeWidth="1.2"
        />
      ))}

      {/* Note stem */}
      <line
        x1={stemX}
        y1={stemY1}
        x2={stemX}
        y2={stemY2}
        stroke="#1f2937"
        strokeWidth="1.5"
      />

      {/* Note head (solid filled ellipse, slightly tilted) */}
      <ellipse
        cx={NOTE_X}
        cy={ny}
        rx="7.5"
        ry="5.5"
        fill="#1f2937"
        transform={`rotate(-15, ${NOTE_X}, ${ny})`}
      />
    </svg>
  );
}
