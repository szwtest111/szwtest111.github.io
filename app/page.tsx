"use client";

import { useEffect, useState } from "react";

const products = [
  { n: "01", title: "X射线管封装系列", en: "ENCAPSULATED X-RAY TUBES", desc: "覆盖不锈钢封装、低功率不锈钢封装与黄铜封装，面向进口替代与多场景适配。", tags: ["不锈钢封装", "进口替代", "黄铜封装"] },
  { n: "02", title: "微焦点X射线管", en: "MICROFOCUS X-RAY TUBES", desc: "提供 35μm、50μm、100μm 焦点规格，为高精度检测与成像系统提供核心部件。", tags: ["35μm", "50μm", "100μm"] },
  { n: "03", title: "阳极X射线管", en: "ANODE X-RAY TUBES", desc: "围绕不同系统工况进行结构、材料与散热方案适配，产品型号待资料完善后补充。", tags: ["精密制造", "稳定输出", "多工况"] },
  { n: "04", title: "高压电源系列", en: "HIGH-VOLTAGE POWER", desc: "30kV、50kV、65kV 高压电源系列，与射线管及系统应用协同匹配。", tags: ["30kV", "50kV", "65kV"] },
  { n: "05", title: "研发定制", en: "CUSTOM ENGINEERING", desc: "从应用需求、结构定义到样机验证，为特定检测场景提供联合研发与定制服务。", tags: ["需求定义", "联合研发", "样机验证"] },
  { n: "06", title: "一体化射线源", en: "INTEGRATED X-RAY SOURCE", desc: "预留产品模块，待客户补充完整产品资料、规格参数与实拍素材后上线。", tags: ["即将更新", "系统集成", "快速适配"] },
];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark"><i /></span>
          <span><b>XRAY</b><small>PRECISION TECHNOLOGY</small></span>
        </a>
        <nav className={menu ? "open" : ""} aria-label="主导航">
          <a href="#about" onClick={() => setMenu(false)}>关于我们</a>
          <a href="#products" onClick={() => setMenu(false)}>产品中心</a>
          <a href="#capability" onClick={() => setMenu(false)}>研发能力</a>
          <a href="#service" onClick={() => setMenu(false)}>服务支持</a>
          <a href="#contact" onClick={() => setMenu(false)}>联系我们</a>
        </nav>
        <div className="nav-right"><span>CN / EN</span><a href="#contact" className="nav-cta">获取方案 ↗</a></div>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="展开导航"><span/><span/></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-grid" />
        <div className="hero-content">
          <p className="eyebrow"><span /> PRECISION X-RAY TECHNOLOGY</p>
          <h1>洞见微观<br/><em>定义精密</em></h1>
          <p className="hero-copy">专注 X 射线核心部件与系统解决方案<br/>以精密制造，赋能每一次可靠检测</p>
          <div className="hero-actions"><a href="#products" className="primary">探索产品 <b>↗</b></a><a href="#about" className="text-link">了解技术实力 <span>→</span></a></div>
        </div>
        <div className="hero-index"><b>01</b><i/><span>04</span></div>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i/></div>
        <div className="hero-stat"><small>PRODUCT MATRIX</small><b>6</b><span>大核心产品体系</span></div>
      </section>

      <section className="intro" id="about">
        <div className="section-label"><span>01</span> ABOUT US</div>
        <div className="intro-main">
          <p className="kicker">精密 · 稳定 · 持续创新</p>
          <h2>让关键部件，成为<br/>工业检测的<span>可靠底座</span></h2>
        </div>
        <div className="intro-copy">
          <p>我们聚焦 X 射线管、高压电源及一体化射线源的研发与制造，围绕客户实际工况，提供从标准产品到研发定制的完整支持。</p>
          <p>以材料、结构、真空工艺与高压技术为基础，持续推动核心部件国产化与进口替代。</p>
          <a href="#capability">查看我们的研发能力 <b>→</b></a>
        </div>
        <div className="metrics">
          <div><b>35<sup>μm</sup></b><span>微焦点规格起点</span></div>
          <div><b>65<sup>kV</sup></b><span>高压电源覆盖至</span></div>
          <div><b>06<sup>+</sup></b><span>核心产品方向</span></div>
          <div><b>01<sup>站</sup></b><span>定制研发服务</span></div>
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-head"><div className="section-label light"><span>02</span> PRODUCTS</div><h2>核心产品</h2><p>从核心器件到系统集成<br/>构建完整的 X 射线产品矩阵</p></div>
        <div className="product-stage">
          <div className="product-list">
            {products.map((p, i) => <button key={p.n} className={active === i ? "active" : ""} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}><small>{p.n}</small><span>{p.title}</span><b>↗</b></button>)}
          </div>
          <div className="product-detail" key={active}>
            <div className="orb"><span>{products[active].n}</span><i/><i/><i/></div>
            <p>{products[active].en}</p><h3>{products[active].title}</h3><div className="rule"/><blockquote>{products[active].desc}</blockquote>
            <div className="tags">{products[active].tags.map(t => <span key={t}>{t}</span>)}</div>
            <a href="#contact">查看产品详情 <b>→</b></a>
          </div>
        </div>
      </section>

      <section className="capability" id="capability">
        <div className="section-label"><span>03</span> CAPABILITY</div>
        <div className="cap-copy"><p className="kicker">ENGINEERING FOR CERTAINTY</p><h2>以系统工程能力<br/>应对复杂工况</h2><p>真正的可靠，不只来自单个部件。我们从需求定义出发，贯穿设计、制造、验证与交付全流程。</p></div>
        <div className="rings"><div className="ring r1"/><div className="ring r2"/><div className="ring r3"/><span className="core">R&amp;D<br/><small>研发中心</small></span><span className="sat s1">01<br/><small>结构设计</small></span><span className="sat s2">02<br/><small>精密制造</small></span><span className="sat s3">03<br/><small>性能验证</small></span><span className="sat s4">04<br/><small>应用适配</small></span></div>
      </section>

      <section className="service" id="service"><div><p className="eyebrow"><span/> SERVICE & SUPPORT</p><h2>不止交付产品<br/>更交付长期可靠</h2></div><div className="service-grid"><article><b>01</b><h3>快速响应</h3><p>从选型咨询到应用问题，建立高效技术沟通通道。</p></article><article><b>02</b><h3>进口维修替代</h3><p>针对既有设备与部件，提供维修评估与国产替代路径。</p></article><article><b>03</b><h3>联合定制</h3><p>围绕特殊参数和结构需求，协同完成研发验证。</p></article></div></section>

      <section className="contact" id="contact"><div><p>START A PROJECT</p><h2>让我们一起<br/>解决下一个<span>精密难题</span></h2></div><a href="mailto:contact@example.com">联系技术顾问 <b>↗</b></a><small>具体联系方式待客户资料补充后替换</small></section>
      <footer><a className="brand inverse" href="#top"><span className="brand-mark"><i/></span><span><b>XRAY</b><small>PRECISION TECHNOLOGY</small></span></a><p>精密 X 射线核心部件与系统解决方案</p><div><a href="#about">关于</a><a href="#products">产品</a><a href="#service">服务</a></div><span>© 2026 DEMO · 待品牌资料确认</span></footer>
    </main>
  );
}
