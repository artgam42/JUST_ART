'use client';

import { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import Button from '../ui/Button';

type FormDict = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  interestOptions: string[];
  portfolio: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

export default function ApplicationForm({ dict }: { dict: FormDict }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_APPLICATION_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      )
      .then(() => setStatus('success'))
      .catch((err) => {
        console.error('EmailJS error:', err);
        setStatus('error');
      });
  }

  if (status === 'success') {
    return (
      <p className="text-sm border border-white/15 p-6 text-center text-blue-100 max-w-md">
        {dict.success}
      </p>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-xs text-blue-100 mb-1">{dict.name}</label>
        <input
          type="text"
          name="user_name"
          required
          className="w-full bg-transparent border border-white/20 px-3 py-2 text-sm text-white"
        />
      </div>
      <div>
        <label className="block text-xs text-blue-100 mb-1">{dict.email}</label>
        <input
          type="email"
          name="user_email"
          required
          className="w-full bg-transparent border border-white/20 px-3 py-2 text-sm text-white"
        />
      </div>
      <div>
        <label className="block text-xs text-blue-100 mb-1">{dict.phone}</label>
        <input
          type="tel"
          name="phone"
          className="w-full bg-transparent border border-white/20 px-3 py-2 text-sm text-white"
        />
      </div>
      <div>
        <label className="block text-xs text-blue-100 mb-1">{dict.interest}</label>
        <select
          name="interest"
          required
          defaultValue=""
          className="w-full bg-navy border border-white/20 px-3 py-2 text-sm text-white"
        >
          <option value="" disabled>
            —
          </option>
          {dict.interestOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs text-blue-100 mb-1">{dict.portfolio}</label>
        <input
          type="text"
          name="portfolio_link"
          className="w-full bg-transparent border border-white/20 px-3 py-2 text-sm text-white"
        />
      </div>
      <div>
        <label className="block text-xs text-blue-100 mb-1">{dict.message}</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full bg-transparent border border-white/20 px-3 py-2 text-sm text-white"
        />
      </div>

      {status === 'error' && <p className="text-xs text-red-400">{dict.error}</p>}

      <Button type="submit" variant="primary" disabled={status === 'sending'}>
        {status === 'sending' ? dict.sending : dict.submit}
      </Button>
    </form>
  );
}
