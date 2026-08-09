"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const homeSections = ["about", "products", "capability", "service", "contact"];

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const currentPathname = usePathname();
  const pathname = currentPathname === "/" ? currentPathname : currentPathname.replace(/\/+$/, "");
  const productPage = pathname === "/products" || pathname.startsWith("/products/");

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      frame = 0;
      const scrollY = window.scrollY;
      setScrolled(scrollY > 32);
      setShowTop(scrollY > 720);

      if (pathname !== "/") {
        setActiveSection("");
        return;
      }

      let current = "";
      for (const id of homeSections) {
        const section = document.getElementById(id);
        if (section && section.offsetTop - 180 <= scrollY) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menu]);

  const closeMenu = () => setMenu(false);
  const aboutActive = pathname === "/about" || activeSection === "about";
  const productActive = productPage || activeSection === "products";

  return (
    <>
      <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="brand-logo" href="/" aria-label="YONC优能创首页" onClick={closeMenu}>
          <img src="/yonc-logo.jpg" alt="YONC优能创" />
        </Link>
        <nav id="site-navigation" className={menu ? "open" : ""} aria-label="主导航">
          <Link href="/" className={pathname === "/" && !activeSection ? "active" : ""} aria-current={pathname === "/" && !activeSection ? "page" : undefined} onClick={closeMenu}>首页</Link>
          <Link href="/about" className={aboutActive ? "active" : ""} aria-current={pathname === "/about" ? "page" : undefined} onClick={closeMenu}>关于优能创</Link>
          <Link href="/products" className={productActive ? "active" : ""} aria-current={productPage ? "page" : undefined} onClick={closeMenu}>产品中心</Link>
          <Link href="/#capability" className={activeSection === "capability" ? "active" : ""} onClick={closeMenu}>研发制造</Link>
          <Link href="/#service" className={activeSection === "service" ? "active" : ""} onClick={closeMenu}>服务支持</Link>
          <Link href="/#contact" className={activeSection === "contact" ? "active" : ""} onClick={closeMenu}>联系我们</Link>
        </nav>
        <div className="nav-right"><Link href="/#contact" className="nav-cta">联系优能创 <span>↗</span></Link></div>
        <button type="button" className={`menu ${menu ? "open" : ""}`} onClick={() => setMenu(value => !value)} aria-label={menu ? "收起导航" : "展开导航"} aria-expanded={menu} aria-controls="site-navigation"><span/><span/></button>
      </header>
      <button type="button" className={`menu-backdrop ${menu ? "open" : ""}`} onClick={closeMenu} aria-label="关闭导航" tabIndex={menu ? 0 : -1} />
      <button type="button" className={`back-to-top ${showTop ? "is-visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="返回顶部" tabIndex={showTop ? 0 : -1}><span>↑</span><small>TOP</small></button>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-logo" href="/"><img src="/yonc-logo.jpg" alt="YONC优能创" /></Link>
      <div className="footer-company"><b>优能创（上海）电气科技有限公司</b><span>高端低能X射线管及配套服务</span></div>
      <div className="footer-links"><Link href="/about">关于</Link><Link href="/products">产品</Link><Link href="/#service">服务</Link><Link href="/#contact">联系</Link></div>
      <span>© 2026 YONC · yonc.cn</span>
    </footer>
  );
}
