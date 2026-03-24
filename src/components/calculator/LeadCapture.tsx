import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface LeadCaptureProps {
  onLeadSubmit?: (data: { name: string; email: string; notes?: string }) => void;
}

export function LeadCapture({ onLeadSubmit }: LeadCaptureProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onLeadSubmit?.({ name, email, notes: notes || undefined });

    // Reset form
    setName('');
    setEmail('');
    setNotes('');
    setIsSubmitting(false);

    alert('Thank you! Your build plan has been sent. We\'ll be in touch soon.');
  };

  return (
    <Card className="border-2 border-emerald-600/60">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Get Your Full Build Plan</h2>
        <p className="text-slate-300">
          Get a personalized quote, recommended parts list, and expert review of your setup. We&apos;ll help confirm fitment, compatibility, and the best path for your build.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-name" className="block text-sm font-medium text-slate-300 mb-1">
                Name *
              </label>
              <Input
                id="lead-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="lead-email" className="block text-sm font-medium text-slate-300 mb-1">
                Email *
              </label>
              <Input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
              <label htmlFor="lead-notes" className="block text-sm font-medium text-slate-300 mb-1">
                Optional Notes
              </label>
              <textarea
                id="lead-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything you want us to know about the build?"
                className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                rows={3}
              />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !name || !email}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send My Build Plan'}
          </Button>
        </form>

        <p className="text-xs text-slate-400 text-center">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </Card>
  );
}
