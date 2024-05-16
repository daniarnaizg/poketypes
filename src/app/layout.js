import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemon types calculator",
  description: "Calculate the effectiveness of Pokemon types against each other",
  url: "https://pokemon-types-calculator.vercel.app/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
