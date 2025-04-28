import { Metadata } from "next";
import ReservationsPage from "../components/reservations/ReservationsPage";
export const metadata: Metadata = {
  title: "My Reservations | Cryptwell Castle Resort",
};

export default async function Page() {
  return <ReservationsPage />;
}
