export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-xl rounded-lg border border-border bg-white p-8 shadow-sm">
        <div className="mb-4 inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          Phase 1: Project Scaffolding
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
          Spandan Hospital
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Modular Monolith Foundation Initialized Successfully
        </p>
        <div className="rounded border border-border bg-muted p-4 text-left text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">System Status:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Next.js App Router: Active</li>
            <li>TypeScript & ESLint: Configured</li>
            <li>Tailwind CSS Design Tokens: Initialized</li>
            <li>Features Hierarchy: Prepared</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
