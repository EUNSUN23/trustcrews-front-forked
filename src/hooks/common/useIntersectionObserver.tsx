'use client';

import { MutableRefObject, useEffect } from 'react';

interface IntersectObserverProps {
  target: MutableRefObject<HTMLElement | null>;
  root: MutableRefObject<Document | HTMLUListElement | null>;
  onIntersectHandler: IntersectionObserverCallback;
  rootMargin?: string;
  threshold?: number;
}

export default function useIntersectionObserver({
  target,
  root,
  onIntersectHandler,
  rootMargin = '0px',
  threshold = 0.8,
}: IntersectObserverProps) {
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target && target.current && root && root.current) {
      observer = new IntersectionObserver(onIntersectHandler, {
        root: root.current,
        rootMargin,
        threshold,
      });

      observer.observe(target.current);
    }
  }, [root, onIntersectHandler, target, rootMargin, threshold]);
}
