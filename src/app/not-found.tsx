export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="rounded-xl border border-red-400/40 bg-red-950/30 p-8 text-center">
        <h1 className="text-3xl font-bold text-red-300">404 — Page not found</h1>
        <p className="mt-4 text-sm text-slate-200">The requested page does not exist. Please check the URL or return home.</p>
      </div>
    </div>
  );
}
