import { Badge } from '@/components/ui/Badge';

export function NextSteps() {
  return (
    <div className="space-y-4 rounded-[26px] border px-5 py-5 md:px-6" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'rgba(15, 23, 42, 0.38)' }}>
      <Badge variant="info">What Happens Next</Badge>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            step: '1',
            title: 'Review your best-fit parts',
            description: 'Confirm the fit, headroom, and product direction that matches your current goal.',
          },
          {
            step: '2',
            title: 'Choose your next move',
            description: 'Add the setup to your quote or talk to an expert if you want another set of eyes.',
          },
          {
            step: '3',
            title: 'Send your build plan',
            description: 'We will confirm compatibility, fitment, and the cleanest path forward for the build.',
          },
        ].map((item) => (
          <div key={item.step} className="flex gap-3 rounded-2xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(11, 16, 32, 0.28)' }}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold text-[var(--text-primary)]" style={{ borderColor: 'var(--border-strong)', backgroundColor: 'rgba(23, 32, 51, 0.92)' }}>
              {item.step}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
