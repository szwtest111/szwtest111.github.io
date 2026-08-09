"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";

export function SiteExperience() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    const handleRouteIntent = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const nextUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      if (nextUrl.origin !== currentUrl.origin || nextUrl.pathname === currentUrl.pathname) return;
      root.classList.add("route-changing");
    };

    document.addEventListener("click", handleRouteIntent, true);
    return () => document.removeEventListener("click", handleRouteIntent, true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    let revealFrame = 0;

    const finishRoute = window.setTimeout(() => root.classList.remove("route-changing"), 360);

    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(node => node.classList.add("is-visible"));
      root.classList.add("motion-ready");
      return () => window.clearTimeout(finishRoute);
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    revealFrame = window.requestAnimationFrame(() => {
      root.classList.add("motion-ready");
      nodes.forEach(node => observer.observe(node));
    });

    return () => {
      window.clearTimeout(finishRoute);
      window.cancelAnimationFrame(revealFrame);
      observer.disconnect();
    };
  }, [pathname]);

  return <div className="route-progress" aria-hidden="true" />;
}
