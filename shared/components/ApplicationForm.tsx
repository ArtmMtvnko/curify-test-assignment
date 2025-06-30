'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/shared/types/User';

type ApplicationFormProps = {
  studyId: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format

export default function ApplicationForm({ studyId }: ApplicationFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();

  const errors = {
    firstName: !firstName ? 'First name is required' : undefined,
    lastName: !lastName ? 'Last name is required' : undefined,
    phone: !phone
      ? 'Phone number is required'
      : !phoneRegex.test(phone)
        ? 'Invalid phone number'
        : undefined,
    email: !email
      ? 'Email address is required'
      : !emailRegex.test(email)
        ? 'Invalid email address'
        : undefined,
    agreed: !agreed ? 'You must agree to continue' : undefined,
  };

  const isValid = Object.values(errors).every((e) => !e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.post<User>('/api/db', {
      firstname: firstName,
      lastname: lastName,
      phone,
      email,
      nctId: studyId,
      letter,
    });

    if (response.status === 201) {
      alert('Application submitted successfully!');
    } else {
      alert('Failed to submit application. Please try again later.');
    }

    router.push('/search');
  };

  const letter = `I hope this message finds you well. My name is ${firstName || '[First Name]'} ${lastName || '[Last Name]'}, and I am writing to express my strong interest in participating in your upcoming clinical trial ${studyId ? `[${studyId}]` : '[NCT code]'}. 
You can contact me by replying directly to this email or reaching me by phone at ${phone || '[Phone Number]'} or ${email || '[Email Address]'}
Thank you for considering my interest!`;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        {touched.firstName && errors.firstName && (
          <div className="mt-1 text-xs text-red-600">{errors.firstName}</div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        {touched.lastName && errors.lastName && (
          <div className="mt-1 text-xs text-red-600">{errors.lastName}</div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Phone Number
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        {touched.phone && errors.phone && (
          <div className="mt-1 text-xs text-red-600">{errors.phone}</div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </label>
        {touched.email && errors.email && (
          <div className="mt-1 text-xs text-red-600">{errors.email}</div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Application Letter
          <textarea
            value={letter}
            readOnly
            className="mt-1 block w-full resize-none rounded-md border-gray-300 bg-gray-100 p-1 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={5}
          />
        </label>
      </div>
      <div>
        <label className="inline-flex items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            onBlur={() => setTouched((t) => ({ ...t, agreed: true }))}
            required
            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          I agree to privacy policy and terms of use
        </label>
        {touched.agreed && errors.agreed && (
          <div className="mt-1 text-xs text-red-600">{errors.agreed}</div>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full rounded-md px-4 py-2 font-semibold text-white transition-colors ${
          isValid ? 'bg-blue-600 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-400'
        }`}
      >
        Submit
      </button>
    </form>
  );
}
