import Link from 'next/link';
import '@/styles/FooterNav.css';
import {  ChevronRight } from 'lucide-react'

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
    <div className="w-full max-w-[1200px] mx-auto px-2 ">
      <div className="footer-nav">
        {items.map((item, idx) => (
          <div key={`${item.label}-${idx}`} className="footer-column">
            <div className="footer-title !text-lg sm:!text-base">{item.label}</div>

            <ul className="footer-links">
              {item.links.map((link, i) => (
                <li key={`${link.label}-${i}`} className='flex items-center '>
                    <ChevronRight className='w-4 opacity-80 !text-white' />
                  <Link href={link.href} aria-label={link.ariaLabel ?? link.label} className='!text-lg sm:!text-base'>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

       <div className='text-center mt-10 flex items-center justify-start xs:justify-center gap-4 text-sm'>
        <a href="https://dzen.ru/inozem.online" target="_blank" rel="noopener noreferrer">
          <img src="/Images/icons/dzen.svg" alt="Группа Дзен Академии Иноземцева" loading="lazy" className='hover:opacity-60' width={40} height={40} />
        </a>
        <a href="https://vk.com/inozem.online" target="_blank" rel="noopener noreferrer">
          <img src="/Images/icons/vk.svg" alt="Группа Вконтакте Академии Иноземцева" loading="lazy" className='hover:opacity-60' width={50} height={50} />
        </a>
        <a href="https://max.ru/join/ioNzAcN6Osch8BVCm25JPZZ5nqaGh8geeILe1CTJvjU" target="_blank" rel="noopener noreferrer">
          <img src="/Images/icons/max.svg" alt="Группа Макс Академии Иноземцева" loading="lazy" className='hover:opacity-60' width={40} height={40} />
        </a>
      </div>

      <div className='text-start sm:text-center mt-8 flex items-center justify-center opacity-75 text-sm pb-6'>
            <p className='md:w-full lg:w-2/3 !text-white'>Симуляционно-тренинговый центр Академии: Санкт-Петербург, ул. Миллионная, 29
                Юридический адрес: пр. Московский, д.22, литер М, пом.Н
                2009-2026 © Академия медицинского образования им. Ф. И. Иноземцева
            </p>
           
        </div>
    </div>
  );
};

export default FooterNav;
