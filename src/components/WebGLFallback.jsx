export function WebGLFallback({ label = 'Abstract fortress silhouette' }) {
  return (
    <div className="webgl-fallback" role="img" aria-label={label}>
      <div className="fallback-grid" />
      <div className="fallback-moon" />
      <div className="fallback-tower fallback-tower--left" />
      <div className="fallback-tower fallback-tower--right" />
      <div className="fallback-gate" />
      <div className="fallback-glow" />
      <div className="fallback-particles" />
      <span className="sr-only">Three-dimensional visualization unavailable. The surrounding section remains fully accessible.</span>
    </div>
  )
}
