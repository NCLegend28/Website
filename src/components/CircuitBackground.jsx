const CircuitBackground = () => {
  const pattern = (offsetX) => (
    <g transform={`translate(${offsetX}, 0)`}>
      {/* Main horizontal traces */}
      <line x1="0" y1="100" x2="2400" y2="100" />
      <line x1="0" y1="250" x2="2400" y2="250" />
      {/* Center trace with ECG cardiogram bump */}
      <line x1="0" y1="400" x2="700" y2="400" />
      <polyline points="700,400 740,400 760,388 780,400 800,400 810,412 830,340 850,425 860,400 890,400 910,382 930,400 950,400" />
      <line x1="950" y1="400" x2="2400" y2="400" />
      <line x1="0" y1="550" x2="2400" y2="550" />
      <line x1="0" y1="700" x2="2400" y2="700" />

      {/* Vertical branches — top to upper-mid */}
      <line x1="200" y1="100" x2="200" y2="250" />
      <line x1="800" y1="100" x2="800" y2="250" />
      <line x1="1400" y1="100" x2="1400" y2="250" />
      <line x1="2000" y1="100" x2="2000" y2="250" />

      {/* Vertical branches — upper-mid to center */}
      <line x1="400" y1="250" x2="400" y2="400" />
      <line x1="1100" y1="250" x2="1100" y2="400" />
      <line x1="1700" y1="250" x2="1700" y2="400" />

      {/* Vertical branches — center to lower-mid */}
      <line x1="500" y1="400" x2="500" y2="550" />
      <line x1="1200" y1="400" x2="1200" y2="550" />
      <line x1="1900" y1="400" x2="1900" y2="550" />

      {/* Vertical branches — lower-mid to bottom */}
      <line x1="300" y1="550" x2="300" y2="700" />
      <line x1="900" y1="550" x2="900" y2="700" />
      <line x1="1600" y1="550" x2="1600" y2="700" />
      <line x1="2200" y1="550" x2="2200" y2="700" />

      {/* Right-angle stubs — PCB feel */}
      <line x1="200" y1="175" x2="280" y2="175" />
      <line x1="280" y1="175" x2="280" y2="220" />
      <line x1="1100" y1="325" x2="1180" y2="325" />
      <line x1="1180" y1="325" x2="1180" y2="370" />
      <line x1="500" y1="475" x2="580" y2="475" />
      <line x1="580" y1="475" x2="580" y2="520" />
      <line x1="1600" y1="625" x2="1680" y2="625" />
      <line x1="1680" y1="625" x2="1680" y2="670" />
      <line x1="2000" y1="175" x2="2080" y2="175" />
      <line x1="2080" y1="175" x2="2080" y2="220" />
      <line x1="1900" y1="475" x2="1980" y2="475" />
      <line x1="1980" y1="475" x2="1980" y2="520" />

      {/* Additional detail traces */}
      <line x1="600" y1="100" x2="600" y2="140" />
      <line x1="600" y1="140" x2="680" y2="140" />
      <line x1="1200" y1="250" x2="1200" y2="290" />
      <line x1="1200" y1="290" x2="1280" y2="290" />
      <line x1="700" y1="550" x2="700" y2="590" />
      <line x1="700" y1="590" x2="780" y2="590" />
      <line x1="2100" y1="550" x2="2100" y2="590" />
      <line x1="2100" y1="590" x2="2180" y2="590" />

      {/* Junction nodes */}
      {[
        [200, 100], [600, 100], [800, 100], [1400, 100], [2000, 100],
        [200, 250], [400, 250], [800, 250], [1100, 250], [1200, 250], [1400, 250], [1700, 250], [2000, 250],
        [400, 400], [500, 400], [1100, 400], [1200, 400], [1700, 400], [1900, 400],
        [300, 550], [500, 550], [700, 550], [900, 550], [1200, 550], [1600, 550], [1900, 550], [2100, 550], [2200, 550],
        [300, 700], [900, 700], [1600, 700], [2200, 700],
        [280, 220], [1180, 370], [580, 520], [1680, 670], [2080, 220], [1980, 520],
        [680, 140], [1280, 290], [780, 590], [2180, 590],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#0ea5e9" stroke="none" />
      ))}
    </g>
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="circuit-animate"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200vw',
          height: '100%',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 4800 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" fill="none">
            {pattern(0)}
            {pattern(2400)}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default CircuitBackground
