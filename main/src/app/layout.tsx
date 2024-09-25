import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "@/utils/className";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '800', '900']
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "3D Room Visualizer",
  description: `Explore this innovative 3D Room Visualizer, where you can customize a specific room. Change the colors and materials of furniture, walls, and other elements to create the perfect atmosphere.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, poppins.className, 'antialiased')}
      >
        {children}
      </body>
    </html>
  );
}
