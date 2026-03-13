import React, { ReactNode } from 'react';

interface RentalsSectionProps {
  children: ReactNode;
  section: string;
  bookingId?: string;
}

export default function RentalsSection({ children, section, bookingId }: RentalsSectionProps) {
  return (
    <section className="bg-white rounded shadow p-6">
      {children}
    </section>
  );
}
