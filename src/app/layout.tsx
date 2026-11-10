import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Assistant } from "@/components/Assistant";
import { Analytics } from "@/components/Analytics";
import SixCodeMascot from "@/components/SixCodeMascot";
import { Intro } from "@/components/Intro";

const GA_MEASUREMENT_ID = "G-LX90QSH5Z6";

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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sixcode.com.br";
const SITE_NAME = "SixCode";
const TITLE = "SixCode: Criação de Sites, Sistemas e Automação com IA em Curitiba";
const DESCRIPTION =
  "Criação de sites, lojas virtuais, sistemas e CRM sob medida e automação de WhatsApp com IA em Curitiba e em todo o Brasil. Excelência e tecnologia para o seu negócio.";

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
    "criação de sites Curitiba",
    "empresa de software Curitiba",
    "desenvolvimento de sites",
    "criação de loja virtual",
    "sistema sob medida",
    "CRM sob medida",
    "automação de WhatsApp com IA",
    "chatbot para WhatsApp",
    "atendimento com IA",
    "automação de processos",
    "site para pequenas empresas",
    "landing page",
    "desenvolvimento de software",
    "integrações ERP e CRM",
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
  verification: {
    google: "K9woq4Q1Ew__aIIjVxfvW_59jEEzzuiqCmTz52p7ykg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: SITE_NAME,
  slogan: "Excelência e tecnologia",
  legalName: "SixCode",
  url: SITE_URL,
  logo: `${SITE_URL}/sixcode-logo.png`,
  image: `${SITE_URL}/sixcode-logo.png`,
  description: DESCRIPTION,
  email: "corporativo@sixcode.com.br",
  telephone: "+55 41 99932-7660",
  areaServed: [
    { "@type": "City", name: "Curitiba" },
    { "@type": "State", name: "Paraná" },
    { "@type": "Country", name: "Brasil" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  knowsAbout: [
    "Criação de sites",
    "Lojas virtuais",
    "Sistemas sob medida",
    "CRM",
    "Automação de WhatsApp com inteligência artificial",
  ],
  sameAs: [
    "https://www.sixcode.com.br",
    "https://www.instagram.com/sixcodebrasil/",
    "https://www.linkedin.com/in/sixcode-brasil-b86787441",
    "https://www.facebook.com/share/1EQcQ7LzhG/?mibextid=wwXIfr",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "corporativo@sixcode.com.br",
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
      suppressHydrationWarning
    >
      <head>
        {/* quem já viu a abertura nesta sessão não vê o quadro piscar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("sixcode-intro"))document.documentElement.setAttribute("data-intro","visto")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Intro />
        {children}
        <SixCodeMascot />
        <Assistant />
        <Analytics />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
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
