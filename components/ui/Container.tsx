import { ReactNode } from 'react';

export default function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`max-w-2xl mx-auto px-4 ${className}`}>{children}</div>;
}
