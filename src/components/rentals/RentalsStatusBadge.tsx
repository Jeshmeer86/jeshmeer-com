import React from 'react';

interface RentalsStatusBadgeProps {
  status: string;
}

export default function RentalsStatusBadge({ status }: RentalsStatusBadgeProps) {
  const color =
    status === 'active' ? 'bg-green-100 text-green-800' :
    status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
    status === 'overdue' ? 'bg-red-100 text-red-800' :
    'bg-gray-100 text-gray-800';
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${color}`}>{status}</span>
  );
}
