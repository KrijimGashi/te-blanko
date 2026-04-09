import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

// JSON-LD structured data for Google Maps / Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  name: "Te Blanko",
  description:
    "Fast food restaurant specializing in burgers, qebapa, and more.",
  telephone: "+383-43-700-217",
  servesCuisine: ["Fast Food", "Burgers", "Albanian"],
  priceRange: "$$",
  hasMenu: {
    "@type": "Menu",
    hasMenuSection: {
      "@type": "MenuSection",
      name: "Menu",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: "Classic Burger",
        },
        {
          "@type": "MenuItem",
          name: "Blanko Burger",
        },
        {
          "@type": "MenuItem",
          name: "Double Burger",
        },
        {
          "@type": "MenuItem",
          name: "Burger me mish pule",
        },
        {
          "@type": "MenuItem",
          name: "Qebapa (5 copë)",
        },
        {
          "@type": "MenuItem",
          name: "Tost",
        },
        {
          "@type": "MenuItem",
          name: "Pomfrit",
        },
        {
          "@type": "MenuItem",
          name: "Sosë të shpisë",
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sq"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-blanko-dark">{children}</body>
    </html>
  );
}
