import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sixcode.com.br";
const SITE_NAME = "SixCode";
const TITLE = "SixCode — Tecnologia sob medida para o seu negócio";
const DESCRIPTION =
  "Menos trabalho manual, mais resultado. A SixCode cria sites que vendem, sistemas que trabalham por você e automações com IA que eliminam o serviço repetitivo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · SixCode",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  category: "technology",
  keywords: [
    "SixCode",
    "automação de processos",
    "atendimento com IA",
    "sistemas sob medida",
    "integrações inteligentes",
    "painéis e relatórios",
    "sites e landing pages",
    "desenvolvimento de software",
    "consultoria tech",
    "automação WhatsApp",
    "ERP CRM integração",
    "startup tecnologia Brasil",
    "Mercado Livre automação",
    "n8n",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-BR": SITE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/sixcode-logo.png",
        width: 760,
        height: 306,
        alt: "SixCode",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/sixcode-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Add real verification tokens here once configured:
  // verification: {
  //   google: "xxxxxxxxxxxxxxx",
  //   other: { "facebook-domain-verification": ["..."] },
  // },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: "SixCode",
  url: SITE_URL,
  logo: `${SITE_URL}/sixcode-logo.png`,
  image: `${SITE_URL}/sixcode-logo.png`,
  description: DESCRIPTION,
  email: "sixcodebrasil@gmail.com",
  telephone: "+55 41 99932-7660",
  areaServed: "BR",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.sixcode.com.br",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "sixcodebrasil@gmail.com",
      telephone: "+55-41-99932-7660",
      availableLanguage: ["pt-BR"],
      areaServed: "BR",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "pt-BR",
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <script
          type="application/ld+json"
          // JSON-LD is safe to inject — schema.org consumes raw JSON
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
