import { Card } from '@/components/ui/Card';

export function NextSteps() {
  return (
    <Card
      className="border border-slate-700/80"
      style={{
        borderColor: 'rgba(100, 116, 139, 0.45)',
        backgroundColor: '#09111d',
      }}
    >
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">What Happens Next</h2>
        <p className="text-sm text-slate-400">
          Use the main actions above when you&apos;re ready. This is the quick path most buyers follow.
        </p>

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
              description: 'Add the setup to your quote or talk to an expert if you want a second set of eyes.',
            },
            {
              step: '3',
              title: 'Send your build plan',
              description: 'We will confirm compatibility, fitment, and the smartest path for your build.',
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-slate-800/80 bg-slate-950/30 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-100">
                {item.step}
              </div>
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
