import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Te Blanko | Burger & Fast Food",
  description:
    "Te Blanko - Burgerët më të mirë në qytet. Classic Burger, Blanko Burger, Double Burger, Qebapa dhe më shumë. Na telefononi: 043 700 217",
  keywords: [
    "Te Blanko",
    "burger",
    "fast food",
    "qebapa",
    "restaurant",
    "hamburger",
    "pomfrit",
    "tost",
  ],
  openGraph: {
    title: "Te Blanko | Burger & Fast Food",
    description:
      "Burgerët më të mirë në qytet. Classic Burger, Blanko Burger, Double Burger dhe më shumë.",
    type: "website",
    locale: "sq_AL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
