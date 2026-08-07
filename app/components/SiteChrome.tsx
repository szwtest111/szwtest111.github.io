"use client";

import { useState } from "react";

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  return (
    <header className="nav-shell">
      <a className="brand-logo" href="/" aria-label="YONC优能创首页">
        <img src="/yonc-logo.jpg" alt="YONC优能创" />
      </a>
      <nav className={menu ? "open" : ""} aria-label="主导航">
        <a href="/">首页</a>
        <a href="/about">关于优能创</a>
        <a href="/#products">产品中心</a>
        <a href="/#capability">研发制造</a>
        <a href="/#service">服务支持</a>
        <a href="/#contact">联系我们</a>
      </nav>
      <div className="nav-right"><span>CN / EN</span><a href="/#contact" className="nav-cta">获取方案 ↗</a></div>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label={menu ? "收起导航" : "展开导航"}><span/><span/></button>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="footer-logo" href="/"><img src="/yonc-logo.jpg" alt="YONC优能创" /></a>
      <p>高端低能X射线管及配套服务</p>
      <div><a href="/about">关于</a><a href="/#products">产品</a><a href="/#service">服务</a></div>
      <span>© 2026 YONC · yonc.cn</span>
    </footer>
  );
}
