import { useState, useEffect } from 'react';

const SECTION_IDS = ['sobre', 'projetos', 'experiencia', 'stack'] as const;
export type SectionId = typeof SECTION_IDS[number] | '';

export function useScrollSpy(): SectionId {
  const [active, setActive] = useState<SectionId>('');

  useEffect(() => {
    const onScroll = () => {
      let current: SectionId = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return active;
}
