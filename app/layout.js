import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Edvora",
  description: "AI Based online learning platform",
  icons:{
    icon:"/online-education.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
        <body
          className={`${outfit.className}`}
        >
          <Provider>
            {children}
          </Provider>
                      <Toaster/>

        </body>
      </html>
    </ClerkProvider>
  );
}
