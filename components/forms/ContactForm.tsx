'use client';

import { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import Button from '../ui/Button';

type FormDict = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
};

export default function ContactForm({ dict }: { dict: FormDict }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
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
      <p className="text-sm border border-navy/15 p-6 text-center text-gray-600 w-full lg:max-w-4xl lg:mx-auto">
        {dict.success}
      </p>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 w-full lg:max-w-4xl lg:mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">{dict.name}</label>
          <input
            type="text"
            name="user_name"
            required
            className="w-full border border-navy/20 px-3 py-2 text-sm text-navy"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">{dict.email}</label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full border border-navy/20 px-3 py-2 text-sm text-navy"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">{dict.subject}</label>
        <input
          type="text"
          name="subject"
          required
          className="w-full border border-navy/20 px-3 py-2 text-sm text-navy"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">{dict.message}</label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full border border-navy/20 px-3 py-2 text-sm text-navy"
        />
      </div>

      {status === 'error' && <p className="text-xs text-red-600">{dict.error}</p>}

      <Button type="submit" variant="primary" disabled={status === 'sending'}>
        {status === 'sending' ? dict.sending : dict.submit}
      </Button>
    </form>
  );
}
