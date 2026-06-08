import {
  ModemAnimatedFooter,
  type SocialLink,
  type FooterLink,
} from "@/components/ui/modem-animated-footer";
import { LogoMark } from "./Logo";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-6 w-6"
      {...props}
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.9-1.3 2.74-1.03 2.74-1.03.56 1.37.21 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-6 w-6"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V10.1H5.67v8.24h2.67ZM7 8.93a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.34 9.41V13.8c0-2.55-1.36-3.74-3.18-3.74-1.46 0-2.12.8-2.49 1.36V10.1h-2.66c.04.75 0 8.24 0 8.24h2.66v-4.6c0-.24.02-.48.09-.65.19-.48.63-.97 1.36-.97.96 0 1.35.73 1.35 1.8v4.42h2.87Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-6 w-6"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-6 w-6"
      {...props}
    >
      <path d="M18.244 2H21l-6.52 7.452L22 22h-6.59l-4.71-6.21L5.32 22H2.563l6.97-7.96L2 2h6.74l4.26 5.69L18.244 2Zm-1.155 18h1.532L7.01 4H5.36l11.73 16Z" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-6 w-6"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 7 8.5-7" />
    </svg>
  );
}

function SixCodeBrandIcon() {
  return <LogoMark size={56} />;
}

const socialLinks: SocialLink[] = [
  { icon: <GithubIcon />, href: "#", label: "GitHub" },
  { icon: <LinkedinIcon />, href: "#", label: "LinkedIn" },
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <XIcon />, href: "#", label: "X (Twitter)" },
  { icon: <MailIcon />, href: "mailto:contato@sixcode.dev", label: "Email" },
];

const navLinks: FooterLink[] = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Cases", href: "#cases" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  return (
    <ModemAnimatedFooter
      brandName="SixCode"
      brandDisplayName="Sixcode"
      brandDescription="Tecnologia sob medida que move negócios. Software, websites, consultoria tech e automações inteligentes — feito com obsessão por detalhe."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="SixCode Studio"
      creatorUrl="#contato"
      copyright={`©${new Date().getFullYear()} SixCode. Todos os direitos reservados.`}
      brandIcon={<SixCodeBrandIcon />}
    />
  );
}
