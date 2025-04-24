import { Metadata } from "next";
import MyReservationsPage from "../components/reservations/MyReservationsPage";

export const metadata: Metadata = {
  title: "My Reservations | Cryptwell Castle Resort",
};

export default async function Page() {
  return <MyReservationsPage />;
}
