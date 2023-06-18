import "./globals.css";
import { Nunito } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";

import SearchModal from "./components/modals/SearchModal";
import InfoModal from "./components/modals/InfoModal";
import ToasterProvider from "./providers/ToasterProvider";
export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <InfoModal
  
            />
          <ToasterProvider />

          <Navbar  />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
