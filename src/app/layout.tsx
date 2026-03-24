import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { brandingConfig } from '@/config/branding';

export const metadata: Metadata = {
  title: `${brandingConfig.productBrandName} Performance Calculator`,
  description: 'Buyer-friendly turbo and fuel system recommendations for performance builds',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body data-demo-view={brandingConfig.demoMode ? 'true' : 'false'}>
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}
