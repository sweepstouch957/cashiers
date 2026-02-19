import type { Metadata } from 'next';
import '../styles/index.css';

export const metadata: Metadata = {
  title: 'Supermarket Cashier Motivation App',
  description: 'Migrated from Vite to Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
