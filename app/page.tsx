"use client";

import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { processSteps, products } from "./site-data";

const slides = [
  { image: "/hero-xray.png", eyebrow: "PRECISION X-RAY TECHNOLOGY", title: <>洞见微观<br/><em>定义精密</em></>, copy: <>专注高端低能X射线管及配套服务<br/>以精密制造，赋能每一次可靠检测</> },
  { image: "/yonc-factory.jpg", eyebrow: "YONC · SHANGHAI", title: <>扎根制造<br/><em>长期可靠</em></>, copy: <>优能创（上海）电气科技有限公司<br/>研发、生产、销售与配套服务一体化</> },
  { image: "/hero-manufacturing.png", eyebrow: "QUALITY IN EVERY DETAIL", title: <>严苛工艺<br/><em>全程品控</em></>, copy: <>从原材料检验到老化测试<br/>每支产品均经过全参数检测</> },
  { image: "/hero-application.png", eyebrow: "ENGINEERED FOR APPLICATIONS", title: <>多元应用<br/><em>精准适配</em></>, copy: <>服务荧光分析、工业成像、衍射分析<br/>厚度、密度与应力测量等领域</> },
];

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onScroll = () => document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;
    const timer = window.setInterval(() => setSlide(v => (v + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (index: number) => setSlide((index + slides.length) % slides.length);

  return (
    <main>
      <SiteHeader />
      <section className="hero" id="top" aria-roledescription="carousel" aria-label="YONC品牌展示" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {slides.map((item, index) => <div key={item.image} className={`hero-image ${slide === index ? "active" : ""} ${index === 1 ? "factory-slide" : ""}`} style={{ backgroundImage: `url('${item.image}')` }} aria-hidden={slide !== index} />)}
        <div className="hero-grid" />
        <div className="hero-content" key={slide}>
          <p className="eyebrow"><span /> {slides[slide].eyebrow}</p>
          <h1>{slides[slide].title}</h1>
          <p className="hero-copy">{slides[slide].copy}</p>
          <div className="hero-actions"><a href="#products" className="primary">探索产品 <b>↗</b></a><a href="/about" className="text-link">了解优能创 <span>→</span></a></div>
        </div>
        <div className="hero-controls">
          <button onClick={() => go(slide - 1)} aria-label="上一张">←</button>
          <div className="hero-index"><b>0{slide + 1}</b><i style={{ "--progress": `${(slide + 1) * 25}%` } as React.CSSProperties}/><span>04</span></div>
          <button onClick={() => go(slide + 1)} aria-label="下一张">→</button>
          <button className="pause-control" onClick={() => setPaused(value => !value)} aria-label={paused ? "继续自动轮播" : "暂停自动轮播"}>{paused ? "▶" : "Ⅱ"}</button>
        </div>
        <div className="hero-dots">{slides.map((_, i) => <button key={i} className={slide === i ? "active" : ""} onClick={() => go(i)} aria-label={`查看第${i + 1}张`} />)}</div>
        <div className="hero-stat"><small>YONC CORE VALUE</small><b>5</b><span>道核心质量工序</span></div>
      </section>

      <section className="intro" id="about">
        <div className="section-label"><span>01</span> ABOUT YONC</div>
        <div className="intro-main"><p className="kicker">质量为保障 · 创新为动力</p><h2>让关键部件，成为<br/>工业分析的<span>可靠底座</span></h2></div>
        <div className="intro-copy">
          <p>优能创（上海）电气科技有限公司，是一家专业研发、生产、销售高端低能X射线管及配套服务为一体的高科技型企业。</p>
          <p>公司拥有经验丰富的研发团队和成熟的技工队伍，从源头把控产品品质，持续提升X射线管的性能稳定性与使用寿命。</p>
          <a href="/about">完整了解优能创 <b>→</b></a>
        </div>
        <div className="metrics">
          <div><b>04<sup>类</sup></b><span>核心X射线管方向</span></div>
          <div><b>05<sup>道</sup></b><span>核心质量工序</span></div>
          <div><b>100<sup>%</sup></b><span>出厂全参数检测</span></div>
          <div><b>01<sup>站</sup></b><span>研发生产服务一体化</span></div>
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-head"><div className="section-label light"><span>02</span> PRODUCTS</div><h2>核心产品</h2><p>面向分析、成像与工业检测<br/>提供可靠的低能X射线核心部件</p></div>
        <div className="product-stage">
          <div className="product-list">{products.map((p, i) => <a href={`/products/${p.slug}`} key={p.n} className={activeProduct === i ? "active" : ""} onMouseEnter={() => setActiveProduct(i)} onFocus={() => setActiveProduct(i)}><small>{p.n}</small><span>{p.title}</span><b>↗</b></a>)}</div>
          <div className="product-detail" key={activeProduct}>
            <div className="orb"><span>{products[activeProduct].n}</span><i/><i/><i/></div>
            <p>{products[activeProduct].en}</p><h3>{products[activeProduct].title}</h3><div className="rule"/><blockquote>{products[activeProduct].desc}</blockquote>
            <div className="tags">{products[activeProduct].applications.map(t => <span key={t}>{t}</span>)}</div>
            <a href={`/products/${products[activeProduct].slug}`}>查看产品详情 <b>→</b></a>
          </div>
        </div>
      </section>

      <section className="capability" id="capability">
        <div className="section-label"><span>03</span> MANUFACTURING</div>
        <div className="cap-copy"><p className="kicker">QUALITY FROM THE SOURCE</p><h2>完整工艺体系<br/>贯穿每支产品</h2><p>引进精良的生产设备和精密检测设备，从原材料到成品建立完整工艺闭环，让可靠性在每一道工序中被验证。</p></div>
        <div className="process-orbit"><div className="process-core">YONC<br/><small>QUALITY SYSTEM</small></div>{processSteps.map((step, i) => <span key={step} className={`process-node pn${i + 1}`}><b>0{i + 1}</b><small>{step}</small></span>)}</div>
      </section>

      <section className="factory-story">
        <div className="factory-photo"><img src="/yonc-factory.jpg" alt="优能创生产基地" /></div>
        <div className="factory-copy"><p className="kicker">YONC · SHANGHAI</p><h2>以制造为根基<br/>以品质赢得信赖</h2><p>质量可靠、性能稳定、价格合理、服务热情，是优能创始终坚守的标准。用户的信赖与支持，是我们持续前进的动力。</p><a href="/about">走进优能创 <b>↗</b></a></div>
      </section>

      <section className="service" id="service"><div><p className="eyebrow"><span/> SERVICE & SUPPORT</p><h2>不止交付产品<br/>更交付长期可靠</h2></div><div className="service-grid"><article><b>01</b><h3>选型支持</h3><p>结合应用、结构与系统条件，为客户提供产品选型与适配建议。</p></article><article><b>02</b><h3>配套服务</h3><p>围绕X射线管应用提供专业、及时、热情的配套服务。</p></article><article><b>03</b><h3>联合定制</h3><p>针对特殊应用需求，协同推进结构、工艺与性能验证。</p></article></div></section>
      <section className="contact" id="contact">
        <div className="contact-lead"><p>START A PROJECT</p><h2>让我们一起<br/>解决下一个<span>精密难题</span></h2><span>针对产品选型、应用适配与研发定制需求，我们期待与您进一步沟通。</span></div>
        <div className="contact-info">
          <article><small>PHONE</small><b>待客户补充</b><span>技术咨询电话</span></article>
          <article><small>EMAIL</small><b>待客户补充</b><span>商务与项目需求</span></article>
          <article><small>ADDRESS</small><b>上海 · 详细地址待补充</b><span>优能创（上海）电气科技有限公司</span></article>
          <p>正式联系方式确认后，本区域将开放电话、邮件和微信咨询入口。</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
