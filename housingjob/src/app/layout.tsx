import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HousingJob — Find work that fits your life",
  description:
    "HousingJob is a premium job platform that connects people with the right opportunities, faster.",
  applicationName: "HousingJob",
};

export const viewport: Viewport = {
  themeColor: "#0f5a43",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full">
        <div className="relative flex min-h-dvh justify-center bg-paper-2 texture-grain sm:items-center sm:py-[3vh]">
          <div className="device-shell relative h-dvh w-full max-w-[430px] overflow-hidden bg-paper sm:h-[884px] sm:max-h-[94vh] sm:rounded-[2.75rem]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
