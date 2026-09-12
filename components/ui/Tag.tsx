import { ReactNode } from 'react';

export default function Tag({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`text-xs px-3 py-1 ${
        active ? 'bg-accent text-white' : 'border border-current/30'
      }`}
    >
      {children}
    </span>
  );
}
