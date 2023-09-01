import AuthContextProvider from "@/context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";
import LoginProvider from "@/components/LoginProvider";
import Navbar from "@/components/Navbar/Navbar";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthContextProvider>
          <LoginProvider>
            <Navbar />
            {children}
          </LoginProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
