import React from 'react';

interface RentalsTableShellProps {
  section: string;
  bookingId?: string;
}

export default function RentalsTableShell({ section, bookingId }: RentalsTableShellProps) {
  // Placeholder table shell
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Vehicle</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Start</th>
            <th className="px-4 py-2 text-left">End</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Empty for now */}
        </tbody>
      </table>
    </div>
  );
}
