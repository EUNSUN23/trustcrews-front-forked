'use client';

import { MutableRefObject, useEffect } from 'react';

type IntersectObserverProps = {
  target: MutableRefObject<HTMLElement | null>;
  root: MutableRefObject<Document | HTMLUListElement | null>;
  onIntersectHandler: IntersectionObserverCallback;
  rootMargin?: string;
  threshold?: number;
};

const useIntersectionObserver = ({
  target,
  root,
  onIntersectHandler,
  rootMargin = '0px',
  threshold = 0.8,
}: IntersectObserverProps) => {
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
};

export default useIntersectionObserver;
