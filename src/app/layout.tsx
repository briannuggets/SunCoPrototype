import "./styles/globals.scss";
import type { Metadata } from "next";
import Header from "@/app/components/header/Header";
import Footer from "./components/footer/Footer";

export const metadata: Metadata = {
  title: "Sun Co.",
  description: "A generic shoe company.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
