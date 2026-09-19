import {
  ModemAnimatedFooter,
  type SocialLink,
  type FooterLink,
} from "@/components/ui/modem-animated-footer";
import { LogoMark } from "./Logo";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-6 w-6"
      {...props}
    >
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3C16.13 4.25 15.02 4.15 13.72 4.15c-2.55 0-4.3 1.56-4.3 4.42V10.5H6.9v3h2.52V21h4.08Z" />
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
  {
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/sixcodebrasil/",
    label: "Instagram",
  },
  {
    icon: <FacebookIcon />,
    href: "https://www.facebook.com/share/1EQcQ7LzhG/?mibextid=wwXIfr",
    label: "Facebook",
  },
  { icon: <MailIcon />, href: "mailto:sixcodebrasil@gmail.com", label: "Email" },
];

const navLinks: FooterLink[] = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Cases", href: "#cases" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "FAQ", href: "#faq" },
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
