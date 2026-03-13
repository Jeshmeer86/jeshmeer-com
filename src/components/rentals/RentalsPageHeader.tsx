import React from 'react';

interface RentalsPageHeaderProps {
  section: string;
  bookingId?: string;
}

export default function RentalsPageHeader({ section, bookingId }: RentalsPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{section === 'overview' ? 'Rentals Overview' : `Rentals: ${section.charAt(0).toUpperCase() + section.slice(1)}`}</h1>
        {bookingId && <div className="text-sm text-muted-foreground">Booking ID: {bookingId}</div>}
      </div>
      <button className="btn btn-primary">New Rental</button>
    </div>
  );
}
