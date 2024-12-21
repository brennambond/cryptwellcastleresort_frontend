import { Metadata } from "next";
import apiService from "@/app/services/apiService";
import MyReservationsPage from "../components/MyReservationsPage";

export const metadata: Metadata = {
  title: "My Reservations | Cryptwell Castle Resort",
};

export default async function Page() {
  let reservations = [];
  try {
    reservations = await apiService.getReservations(); // Ensure this is a server-side API call
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }

  return <MyReservationsPage reservations={reservations} />;
}
