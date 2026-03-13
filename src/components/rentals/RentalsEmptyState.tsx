import React from 'react';

interface RentalsEmptyStateProps {
  section: string;
}

export default function RentalsEmptyState({ section }: RentalsEmptyStateProps) {
  return (
    <div className="text-center py-12 text-muted-foreground">
      <p>No {section} found.</p>
      <button className="btn btn-primary mt-4">Create New</button>
    </div>
  );
}
