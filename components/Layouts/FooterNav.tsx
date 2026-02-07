import Link from 'next/link';
import '@/styles/FooterNav.css';
import {  ChevronRight } from 'lucide-react';

type FooterLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type FooterItem = {
  label: string;
  links: FooterLink[];
};

type FooterNavProps = {
  items: FooterItem[];
};

const FooterNav: React.FC<FooterNavProps> = ({ items }) => {
  return (
    <div className="w-[90%] max-w-[1200px] mx-auto px-4 ">
      <div className="footer-nav">
        {items.map((item, idx) => (
          <div key={`${item.label}-${idx}`} className="footer-column">
            <div className="footer-title">{item.label}</div>

            <ul className="footer-links">
              {item.links.map((link, i) => (
                <li key={`${link.label}-${i}`} className='flex items-center'>
                    <ChevronRight className='w-4 opacity-80' />
                  <Link href={link.href} aria-label={link.ariaLabel ?? link.label}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className='text-center mt-15 flex items-center justify-center opacity-75 text-sm'>
            <p className='md:w-full lg:w-2/3'>Симуляционно-тренинговый центр Академии: Санкт-Петербург, ул. Миллионная, 29
                Юридический адрес: пр. Московский, д.22, литер М, пом.Н
                2009-2026 © Академия медицинского образования им. Ф. И. Иноземцева
            </p>
        </div>
    </div>
  );
};

export default FooterNav;
