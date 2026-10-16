export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={`brand-logo${compact ? " brand-logo-compact" : ""}`}
      viewBox="0 0 200 40"
      role="img"
      aria-label="ElevatorRepair.com"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b4a" />
          <stop offset="100%" stopColor="#ff4d2e" />
        </linearGradient>
      </defs>
      <rect x="0" y="4" width="32" height="32" rx="8" fill="#141a22" stroke="url(#logoGrad)" strokeWidth="2" />
      <rect x="10" y="10" width="5" height="18" rx="1" fill="#f4f6f8" opacity="0.9" />
      <rect x="17" y="10" width="5" height="18" rx="1" fill="#c5ced9" opacity="0.85" />
      <path d="M16 8v3M14 9.5h4" stroke="#ff4d2e" strokeWidth="1.5" strokeLinecap="round" />
      <text x="42" y="17" fill="currentColor" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="700" letterSpacing="-0.02em">
        Elevator
      </text>
      <text x="42" y="31" fill="currentColor" opacity="0.55" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="600" letterSpacing="0.12em">
        REPAIR.COM
      </text>
    </svg>
  );
}
