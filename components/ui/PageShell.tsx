import { ReactNode } from 'react';

type PageShellProps = {
  variant?: 'dark' | 'light';
  children: ReactNode;
};

const variants = {
  dark: 'bg-navy text-white',
  light: 'bg-white text-navy',
};

export default function PageShell({ variant = 'dark', children }: PageShellProps) {
  return <main className={`min-h-screen ${variants[variant]}`}>{children}</main>;
}
