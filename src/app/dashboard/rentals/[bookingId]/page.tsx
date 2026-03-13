import RentalsLayout from '../RentalsLayout';

export default function RentalBookingDetailPage({ params }: { params: { bookingId: string } }) {
  return <RentalsLayout section="detail" bookingId={params.bookingId} />;
}
