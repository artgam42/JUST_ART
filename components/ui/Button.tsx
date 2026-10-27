import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
};

const base = 'inline-block text-center text-sm px-4 py-2 transition-opacity hover:opacity-70';
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
  className: extraClassName = '',
}: ButtonProps) {
  const className = `${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${extraClassName}`.trim();

  if (href) {
    // Lyen ekstèn (ex. WhatsApp) : <a> nòmal ki louvri nan yon nouvo onglè
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      );
    }
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
