/**
 * Ölz Wellenbogen — Signature-Element aus dem CD-Manual (S. 6–8).
 * Die orange Fläche endet nicht als harte Kante, sondern läuft in einem
 * weichen Bogen aus. Im Manual selbst wird das an jedem Seitenfuß verwendet.
 */
export function OelzWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M0 0h1440v11.5c-192 22-408 28.5-660 19.5S252 8.5 0 24.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
