// Link do WhatsApp da SixCode com mensagem pronta — visitante só confirma o
// envio em vez de ter que pensar no que escrever primeiro.
const WHATSAPP_NUMBER = "5541999327660";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
