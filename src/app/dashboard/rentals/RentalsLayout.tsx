import requireDashboardContext from '@/lib/tenant';
import { ReactNode } from 'react';
import RentalsPageHeader from '@/components/rentals/RentalsPageHeader';
import RentalsStatCards from '@/components/rentals/RentalsStatCards';
import RentalsSection from '@/components/rentals/RentalsSection';
import RentalsTableShell from '@/components/rentals/RentalsTableShell';
import RentalsEmptyState from '@/components/rentals/RentalsEmptyState';
import RentalsStatusBadge from '@/components/rentals/RentalsStatusBadge';

interface RentalsLayoutProps {
  children?: ReactNode;
  section: string;
  bookingId?: string;
}

export default async function RentalsLayout({ children, section, bookingId }: RentalsLayoutProps) {
  await requireDashboardContext();

  // Placeholder: Render different sections based on the section prop
  return (
    <div className="space-y-6">
      <RentalsPageHeader section={section} bookingId={bookingId} />
      <RentalsStatCards section={section} />
      <RentalsSection section={section} bookingId={bookingId}>
        {/* Section-specific content */}
        <RentalsTableShell section={section} bookingId={bookingId} />
        <RentalsEmptyState section={section} />
      </RentalsSection>
    </div>
  );
}
