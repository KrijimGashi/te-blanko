import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import { hasLocale, locales } from "./dictionaries";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        { "@type": "MenuItem", name: "Classic Burger" },
        { "@type": "MenuItem", name: "Blanko Burger" },
        { "@type": "MenuItem", name: "Double Burger" },
        { "@type": "MenuItem", name: "Burger me mish pule" },
        { "@type": "MenuItem", name: "Qebapa (5 copë)" },
        { "@type": "MenuItem", name: "Tost" },
        { "@type": "MenuItem", name: "Pomfrit" },
        { "@type": "MenuItem", name: "Sosë të shpisë" },
      ],
    },
  },
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        <link rel="alternate" hrefLang="sq" href="https://teblanko.com/sq" />
        <link rel="alternate" hrefLang="en" href="https://teblanko.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://teblanko.com/sq" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-blanko-dark">{children}</body>
    </html>
  );
}
