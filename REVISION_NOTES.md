# Revision Notes

## Buyer-First Recommendation Flow Refresh

Date: 2026-03-24

### What changed

- Reworked the build summary into a decision-oriented card with rounded values for target power, fuel type, recommendation status, headroom, best-fit product, and a short confidence statement.
- Reduced CTA overload so the page keeps only the highest-intent actions in the summary, main recommendation, alternative recommendation, and lead capture sections.
- Added reusable premium recommendation card patterns for primary and secondary product suggestions.
- Standardized fit status language across the experience to: `Excellent Fit`, `Good Fit`, `Near Limit`, and `Undersized`.
- Replaced vague labels with explicit naming such as `Best-Fit Turbo`, `Best-Fit Injector`, and `Best-Fit Fuel System`.
- Fixed alternative-option messaging so tighter options never use upgrade language and higher-headroom options are labeled as future-proof.
- Added a collapsible `Why this was recommended` section with short, buyer-friendly explanation copy.
- Updated lead capture messaging to focus on quote quality, fitment confidence, compatibility, and expert review.
- Converted the next-steps area from duplicate action buttons into a lighter informational checklist/stepper.
- Added demo-view CSS guards to hide visible Next.js development UI in stakeholder-facing demos.

### Verification

- `npm run typecheck`
- `npm run build`
