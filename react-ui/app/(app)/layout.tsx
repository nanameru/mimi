interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="fixed top-0 left-0 z-50 hidden w-full flex-row justify-end p-6 md:flex">
        <span className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
          Built with{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.livekit.io/agents"
            className="underline underline-offset-4"
          >
            LiveKit Agents
          </a>
        </span>
      </header>

      {children}
    </>
  );
}
