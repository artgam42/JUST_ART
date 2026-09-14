import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const base = 'inline-block text-sm px-6 py-3 transition-opacity hover:opacity-90';
const variants = {
  primary: 'bg-accent text-white',
  secondary: 'border border-current',
};

export default function Button({
  href,
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const className = `${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
