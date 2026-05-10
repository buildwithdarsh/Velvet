'use client';

import { useEffect, useState } from 'react';
import { getWhatsAppBookingLink } from '@/lib/utils';
import { getOrgConfig, configVal } from '@/lib/data';
import { WhatsAppIcon } from '@/components/ui/Icons';

export function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    getOrgConfig().then((config) => {
      setWhatsapp(configVal(config, 'contact', 'whatsapp', ''));
    });
  }, []);

  if (!whatsapp) return null;

  return (
    <a
      href={getWhatsAppBookingLink(whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
