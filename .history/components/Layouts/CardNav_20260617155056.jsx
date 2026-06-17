"use client"

import { gsap } from 'gsap';
import '@/styles/CardNav.css';
import Link from 'next/link';
import LoadingLink from '@/components/Load/LoadingLink';
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';

const CardNav = ({
    items,
  className = '',
  ease = 'power3.out',
  menuColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
  setIsHamburgerOpen(false);
  setIsExpanded(false);
  if (tlRef.current) {
    tlRef.current.kill();
    gsap.set(navRef.current, { height: 60 });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
  }
}, [pathname]);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 300;

    const isMobile = window.matchMedia('(max-width: 769px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';


        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 300;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`}>
        <div className="card-nav-top">
          <LoadingLink aria-label="Главная" className=" flex items-center gap-4 " href="/">
              <Image src="/layouts/Logo.png" alt="Логотип CHOU — Академия медицинского образования" width={50} height={50} priority  />
             
          </LoadingLink>
          <p className='!text-base tablet:!text-xl !text-white ml-2 md:ml-0 px-3 hidden xs:block'>Академия медицинского образования имени Ф.И.Иноземцева</p>
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          
          
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 5).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links ">
                {item.links?.length > 0 ? (
                  item.links.map((lnk, i) => (
                    <LoadingLink
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link !text-white"
                      href={lnk.href}
                      aria-label={lnk.ariaLabel}
                      onClick={() => {
                        setIsHamburgerOpen(false);
                        setIsExpanded(false);

                        if (tlRef.current) {
                          tlRef.current.kill(); 
                          gsap.set(navRef.current, { height: 60 }); 
                          gsap.set(cardsRef.current, { y: 50, opacity: 0 }); 
                        }
                      }}
                    >
                      {lnk.label} <MoveRight className='relative top-0.25 w-4' />
                    </LoadingLink>
                  ))
                )  : null}
              </div>

              
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;