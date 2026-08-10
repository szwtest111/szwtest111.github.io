"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { applicationAreas, processSteps, products } from "./site-data";

const slides = [
  { image: "/hero-xray.png", eyebrow: "PRECISION X-RAY TECHNOLOGY", title: <>洞见微观<br/><em>定义精密</em></>, copy: <>专注高端低能X射线管及配套服务<br/>以精密制造，赋能每一次可靠检测</> },
  { image: "/yonc-factory.jpg", eyebrow: "YONC · SHANGHAI", title: <>扎根制造<br/><em>长期可靠</em></>, copy: <>优能创（上海）电气科技有限公司<br/>研发、生产、销售与配套服务一体化</> },
  { image: "/images/hero-process-candidates/yonc-process-01-glass-sealing.png", eyebrow: "MANUFACTURING PROCESS", title: <>制造工艺<br/><em>严格品控</em></>, copy: <>工艺画面为现阶段演示素材<br/>实际设备与流程将在资料完善后更新</> },
  { image: "/hero-application.png", eyebrow: "ENGINEERED FOR APPLICATIONS", title: <>多元应用<br/><em>精准适配</em></>, copy: <>服务荧光分析、工业成像、衍射分析<br/>厚度、密度与应力测量等领域</> },
];

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [slide, setSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || carouselPaused || !pageVisible) return;
    const timer = window.setTimeout(() => setSlide(v => (v + 1) % slides.length), 6500);
    return () => window.clearTimeout(timer);
  }, [carouselPaused, pageVisible, slide]);

  const go = (index: number) => setSlide((index + slides.length) % slides.length);

  return (
    <main className="home-page">
      <SiteHeader />
      <section className={`hero ${carouselPaused ? "carousel-paused" : ""}`} id="top" aria-roledescription="carousel" aria-label="YONC品牌展示" onMouseEnter={() => setCarouselPaused(true)} onMouseLeave={() => setCarouselPaused(false)} onFocusCapture={() => setCarouselPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setCarouselPaused(false); }}>
        {slides.map((item, index) => <div key={item.image} className={`hero-image ${slide === index ? "active" : ""} ${index === 1 ? "factory-slide" : ""}`} style={{ backgroundImage: `url('${item.image}')` }} aria-hidden={slide !== index} />)}
        <div className="hero-grid" />
        <div className="hero-content" key={slide}>
          <p className="eyebrow"><span /> {slides[slide].eyebrow}</p>
          <h1>{slides[slide].title}</h1>
          <p className="hero-copy">{slides[slide].copy}</p>
          <div className="hero-actions"><Link href="#products" className="primary">探索产品 <b>↗</b></Link><Link href="/about" className="text-link">了解优能创 <span>→</span></Link></div>
        </div>
        <div className="hero-nav">
          <button type="button" className="hero-prev" onClick={() => go(slide - 1)} aria-label="上一张轮播图">←</button>
          <button type="button" className="hero-next" onClick={() => go(slide + 1)} aria-label="下一张轮播图">→</button>
        </div>
        <div className="hero-dots">{slides.map((_, i) => <button type="button" key={i} className={slide === i ? "active" : ""} onClick={() => go(i)} aria-label={`查看第${i + 1}张`} aria-current={slide === i ? "true" : undefined} />)}</div>
        <div className="hero-stat"><small>YONC CORE VALUE</small><b>5</b><span>道核心质量工序</span></div>
      </section>

      <section className="intro" id="about" data-scene>
        <div className="section-label" data-reveal="left"><span>01</span> ABOUT YONC</div>
        <div className="intro-main" data-reveal><p className="kicker">质量为保障 · 创新为动力</p><h2>让关键部件，成为<br/>工业分析的<span>可靠底座</span></h2></div>
        <div className="intro-copy" data-reveal="right">
          <p>优能创（上海）电气科技有限公司，是一家专业研发、生产、销售高端低能X射线管及配套服务为一体的高科技型企业。</p>
          <p>公司拥有经验丰富的研发团队和成熟的技工队伍，从源头把控产品品质，持续提升X射线管的性能稳定性与使用寿命。</p>
          <Link href="/about">完整了解优能创 <b>→</b></Link>
        </div>
        <div className="metrics" data-reveal>
          <div><b>08<sup>项</sup></b><span>产品与业务方向</span></div>
          <div><b>05<sup>道</sup></b><span>核心质量工序</span></div>
          <div><b>100<sup>%</sup></b><span>出厂全参数检测</span></div>
          <div><b>03<sup>档</sup></b><span>微焦点规格已列明</span></div>
        </div>
      </section>

      <section className="products" id="products" data-scene>
        <div className="section-head" data-reveal><div className="section-label light"><span>02</span> PRODUCTS</div><h2>产品与业务方向</h2><p>产品体系持续完善<br/>具体型号与参数后续补充</p></div>
        <div className="product-stage" data-reveal>
          <div className="product-list">{products.map((p, i) => <Link href={`/products/${p.slug}`} key={p.n} className={activeProduct === i ? "active" : ""} onMouseEnter={() => setActiveProduct(i)} onFocus={() => setActiveProduct(i)}><small>{p.n}</small><span>{p.title}</span><b>↗</b></Link>)}</div>
          <div className="product-detail" key={activeProduct}>
            <div className="orb"><span>{products[activeProduct].n}</span><i/><i/><i/></div>
            <p>PRODUCT SERIES · {products[activeProduct].n}</p><h3>{products[activeProduct].title}</h3><div className="rule"/><blockquote>{products[activeProduct].desc}</blockquote>
            <div className="tags">{products[activeProduct].items.map(t => <span key={t}>{t}</span>)}</div>
            <Link href={`/products/${products[activeProduct].slug}`}>查看产品详情 <b>→</b></Link>
          </div>
        </div>
      </section>

      <section className="application-band" aria-label="应用领域" data-scene>
        <div className="section-label" data-reveal="left"><span>03</span> APPLICATIONS</div>
        <div data-reveal><p className="kicker">APPLICATION AREAS</p><h2>多元应用领域</h2></div>
        <div className="application-tags" data-reveal="right">{applicationAreas.map(area => <span key={area}>{area}</span>)}</div>
      </section>

      <section className="capability" id="capability" data-scene>
        <div className="section-label" data-reveal="left"><span>04</span> MANUFACTURING</div>
        <div className="cap-copy" data-reveal><p className="kicker">QUALITY FROM THE SOURCE</p><h2>完整工艺体系<br/>贯穿每支产品</h2><p>引进精良的生产设备和精密检测设备，从原材料到成品建立完整工艺闭环，让可靠性在每一道工序中被验证。</p></div>
        <div className="process-orbit" data-reveal="scale"><div className="process-core">YONC<br/><small>QUALITY SYSTEM</small></div>{processSteps.map((step, i) => <span key={step} className={`process-node pn${i + 1}`}><b>0{i + 1}</b><small>{step}</small></span>)}</div>
      </section>

      <section className="factory-story" data-scene>
        <div className="factory-photo" data-reveal="left"><img src="/yonc-factory.jpg" alt="优能创生产基地" /></div>
        <div className="factory-copy" data-reveal="right"><p className="kicker">YONC · SHANGHAI</p><h2>以制造为根基<br/>以品质赢得信赖</h2><p>质量可靠、性能稳定、价格合理、服务热情，是优能创始终坚守的标准。用户的信赖与支持，是我们持续前进的动力。</p><Link href="/about">走进优能创 <b>↗</b></Link></div>
      </section>

      <section className="service" id="service" data-scene><div data-reveal="left"><p className="eyebrow"><span/> SERVICE & SUPPORT</p><h2>服务与业务方向</h2></div><div className="service-grid"><article data-reveal><b>01</b><h3>配套服务</h3><p>围绕X射线管产品提供配套服务，具体服务内容与标准后续完善。</p></article><article data-reveal><b>02</b><h3>进口维修替代</h3><p>适配品牌、型号范围与维修服务内容将在资料完善后更新。</p></article><article data-reveal><b>03</b><h3>研发定制</h3><p>定制范围、合作流程与交付方式将在资料完善后更新。</p></article></div></section>
      <section className="contact" id="contact" data-scene>
        <div className="contact-lead" data-reveal="left"><p>START A PROJECT</p><h2>让我们一起<br/>解决下一个<span>精密难题</span></h2><span>针对产品资料、配套服务、进口维修替代与研发定制需求，我们期待与您进一步沟通。</span></div>
        <div className="contact-info" data-reveal="right">
          <article><small>PHONE</small><b>后续待补充</b><span>技术咨询电话</span></article>
          <article><small>EMAIL</small><b>后续待补充</b><span>商务与项目需求</span></article>
          <article><small>ADDRESS</small><b>上海 · 详细地址待补充</b><span>优能创（上海）电气科技有限公司</span></article>
          <p>正式联系方式确认后，本区域将开放电话、邮件和微信咨询入口。</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
