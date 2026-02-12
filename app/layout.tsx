import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roopali Fashion | Baby & Kids Clothing in Rajkot",
  description: "Premium Baby & Kids Clothing Store in Rajkot. Established 2005. Best collection for your little ones.",
  keywords: "Roopali Fashion, Kids Clothing, Baby Clothes, Rajkot, Swaminarayan Chowk, Children Wear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body className={`${outfit.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
