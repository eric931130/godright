export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="star-field animate-slow-drift absolute inset-0 opacity-45" />
      <div className="temple-grid absolute inset-0 opacity-70" />
      <div className="animate-pulse-glow absolute left-1/2 top-[-16rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-divine-gold/16 blur-3xl" />
      <div className="absolute right-[-12rem] top-28 h-[28rem] w-[28rem] rounded-full bg-astral-purple/20 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-demon-blue/26 blur-3xl" />
    </div>
  );
}
