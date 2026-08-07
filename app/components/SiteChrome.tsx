"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const productActive = pathname === "/products" || pathname.startsWith("/products/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenu(false);

  return (
    <>
      <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand-logo" href="/" aria-label="YONC优能创首页" onClick={closeMenu}>
          <img src="/yonc-logo.jpg" alt="YONC优能创" />
        </a>
        <nav className={menu ? "open" : ""} aria-label="主导航">
          <a href="/" className={pathname === "/" ? "active" : ""} aria-current={pathname === "/" ? "page" : undefined} onClick={closeMenu}>首页</a>
          <a href="/about" className={pathname === "/about" ? "active" : ""} aria-current={pathname === "/about" ? "page" : undefined} onClick={closeMenu}>关于优能创</a>
          <a href="/products" className={productActive ? "active" : ""} aria-current={productActive ? "page" : undefined} onClick={closeMenu}>产品中心</a>
          <a href="/#capability" onClick={closeMenu}>研发制造</a>
          <a href="/#service" onClick={closeMenu}>服务支持</a>
          <a href="/#contact" onClick={closeMenu}>联系我们</a>
        </nav>
        <div className="nav-right"><a href="/#contact" className="nav-cta">联系优能创 ↗</a></div>
        <button className={`menu ${menu ? "open" : ""}`} onClick={() => setMenu(!menu)} aria-label={menu ? "收起导航" : "展开导航"} aria-expanded={menu}><span/><span/></button>
      </header>
      {menu && <button className="menu-backdrop" onClick={closeMenu} aria-label="关闭导航" />}
      {scrolled && <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="返回顶部"><span>↑</span><small>TOP</small></button>}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="footer-logo" href="/"><img src="/yonc-logo.jpg" alt="YONC优能创" /></a>
      <div className="footer-company"><b>优能创（上海）电气科技有限公司</b><span>高端低能X射线管及配套服务</span></div>
      <div className="footer-links"><a href="/about">关于</a><a href="/products">产品</a><a href="/#service">服务</a><a href="/#contact">联系</a></div>
      <span>© 2026 YONC · yonc.cn</span>
    </footer>
  );
}
