import React from 'react';

interface RentalsStatCardsProps {
  section: string;
}

export default function RentalsStatCards({ section }: RentalsStatCardsProps) {
  // Placeholder stat cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="card">
        <div className="card-title">Active Rentals</div>
        <div className="card-value">0</div>
      </div>
      <div className="card">
        <div className="card-title">Pending Requests</div>
        <div className="card-value">0</div>
      </div>
      <div className="card">
        <div className="card-title">Overdue Returns</div>
        <div className="card-value">0</div>
      </div>
    </div>
  );
}
