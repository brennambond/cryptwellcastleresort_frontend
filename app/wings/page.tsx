import { Metadata } from "next";
import WingsPageSection from "../components/wings/WingsPageSection";

export const metadata: Metadata = {
  title: "Wings | Cryptwell Castle Resort",
};

export default function WingsHomePage() {
  return (
    <main className="bg-[url('../public/background-blue.png')] bg-cover bg-center relative">
      <WingsPageSection />
    </main>
  );
}
