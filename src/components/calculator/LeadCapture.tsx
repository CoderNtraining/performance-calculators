import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
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
    <Card variant="lead-capture">
      <div className="space-y-5">
        <Badge variant="info">Quote-Ready Follow-Up</Badge>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Get Your Full Build Plan</h2>
          <p className="text-[var(--text-secondary)]">
            Get a personalized quote, recommended parts list, and expert review of your setup. We&apos;ll help confirm fitment, compatibility, and the best path for your build.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-name" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
                Name <span className="text-[var(--danger)]">*</span>
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
              <label htmlFor="lead-email" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
                Email <span className="text-[var(--danger)]">*</span>
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
            <label htmlFor="lead-notes" className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
              Optional Notes
            </label>
            <textarea
              id="lead-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything you want us to know about the build?"
              className="w-full rounded-xl border px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
              style={{ borderColor: 'var(--border-strong)', backgroundColor: 'var(--bg-surface-muted)' }}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !name || !email}
            variant="primary"
            className="w-full py-3 font-semibold"
          >
            {isSubmitting ? 'Sending...' : 'Send My Build Plan'}
          </Button>
        </form>

        <p className="text-center text-xs text-[var(--text-muted)]">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </Card>
  );
}
