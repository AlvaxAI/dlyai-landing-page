import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { getContent } from "@/content";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const content = getContent();
const socialImage = {
  url: "/brand/dly-og.png",
  width: 1200,
  height: 630,
  alt: "DLY AI — The AI problem you can't hire for.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dlyai.com"),
  title: content.meta.title,
  description: content.meta.description,
  applicationName: content.brand.name,
  openGraph: {
    type: "website",
    url: "https://dlyai.com/",
    siteName: content.brand.name,
    title: content.meta.title,
    description: content.meta.description,
    locale: "en_GB",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
    images: [socialImage],
  },
  alternates: { canonical: "/" },
  icons: { icon: "/brand/dly-logo-white.png" },
};

export const viewport: Viewport = {
  themeColor: "#0B0F17",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="msvalidate.01" content="9C989EE0976440C123CE20E457686D2F" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "y5cnv0k7ka");`,
          }}
        />
        {/*
          Without JS no animation ever runs, so framer-motion's server-rendered
          `initial` styles would freeze the page at opacity:0 / clipped.

          Targeting the inline styles themselves rather than a marker class is
          deliberate: only ~30% of animated elements carry `.reveal`, and the
          rest (hero kicker, lead, CTA row, stack layers, pipeline stages…)
          would otherwise stay invisible. framer-motion is the only source of
          these inline declarations on the page, so the match is precise.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}[style*="clip-path:inset"]{clip-path:none!important}.reveal,.reveal-group{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-ink text-signal min-h-full">{children}</body>
    </html>
  );
}
