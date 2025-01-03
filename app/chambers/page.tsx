import ChambersPageContent from "../components/ChambersPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chambers | Cryptwell Castle Resort",
};

export default function ChambersHomePage() {
  return <ChambersPageContent />;
}
