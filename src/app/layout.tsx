// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Bike Rent App",
  description: "Bike rental application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-blue-600 text-white">
          <h1 className="text-xl font-bold">Bike Rent App</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
