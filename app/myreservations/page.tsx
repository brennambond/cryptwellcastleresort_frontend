import { Metadata } from "next";
import MyReservationsPage from "../components/MyReservationsPage";

export const metadata: Metadata = {
  title: "My Reservations | Cryptwell Castle Resort",
};

export default async function Page() {
  return <MyReservationsPage />;
}
