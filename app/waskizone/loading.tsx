export default function Loading() {
  return (
    <main className="scanline relative min-h-screen overflow-hidden bg-ink text-white">
      <video
        src="/brand/waskizone/video/logo-reveal.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-95 mix-blend-screen"
        aria-label="WaskiZone animated logo"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,6,5,0.05),rgba(3,6,5,0.76)_72%,rgba(3,6,5,0.94))]" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink via-ink/72 to-transparent" />
      <div className="relative flex min-h-screen items-end p-8">
        <p className="font-mono text-xs uppercase text-mint">Loading WaskiZone</p>
      </div>
    </main>
  );
}
