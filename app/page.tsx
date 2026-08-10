"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const slides = [
  { image: "/hero-light-xray.png", eyebrow: "PRECISION X-RAY TECHNOLOGY", title: <>洞见微观<br/><em>定义精密</em></>, copy: <>专注高端低能X射线管及配套服务<br/>以精密制造，赋能每一次可靠检测</> },
  { image: "/yonc-factory.jpg", eyebrow: "YONC · SHANGHAI", title: <>扎根制造<br/><em>长期可靠</em></>, copy: <>优能创（上海）电气科技有限公司<br/>研发、生产、销售与配套服务一体化</> },
  { image: "/hero-light-process.png", eyebrow: "MANUFACTURING PROCESS", title: <>制造工艺<br/><em>严格品控</em></>, copy: <>从关键工序到全参数检测<br/>以完整工艺体系守护稳定性能</> },
  { image: "/hero-light-application.png", eyebrow: "ENGINEERED FOR APPLICATIONS", title: <>多元应用<br/><em>精准适配</em></>, copy: <>服务荧光分析、工业成像、衍射分析<br/>厚度、密度与应力测量等领域</> },
];

export default function Home() {
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
        <div className="hero-content" key={slide}>
          <p className="eyebrow"><span /> {slides[slide].eyebrow}</p>
          <h1>{slides[slide].title}</h1>
          <p className="hero-copy">{slides[slide].copy}</p>
          <div className="hero-actions"><Link href="/products" className="primary">产品中心 <b>↗</b></Link><Link href="/about" className="text-link">了解我们 <span>→</span></Link></div>
        </div>
        <div className="hero-nav">
          <button type="button" className="hero-prev" onClick={() => go(slide - 1)} aria-label="上一张轮播图">←</button>
          <button type="button" className="hero-next" onClick={() => go(slide + 1)} aria-label="下一张轮播图">→</button>
        </div>
        <div className="hero-dots">{slides.map((_, i) => <button type="button" key={i} className={slide === i ? "active" : ""} onClick={() => go(i)} aria-label={`查看第${i + 1}张`} aria-current={slide === i ? "true" : undefined} />)}</div>
      </section>

      <section className="factory-story home-company" data-scene>
        <div className="factory-photo" data-reveal="left"><img src="/yonc-factory.jpg" alt="优能创生产基地" /></div>
        <div className="factory-copy" data-reveal="right"><p className="kicker">ABOUT US</p><h2>关于我们</h2><p>优能创（上海）电气科技有限公司，是一家专业研发、生产、销售高端低能X射线管及配套服务为一体的高科技型企业。</p><p>公司产品广泛应用于荧光分析、X射线成像、衍射分析、厚度测量、密度测量、应力分析以及其他相关X射线领域。</p><Link href="/about">查看公司简介 <b>↗</b></Link></div>
      </section>
      <section className="contact home-contact" data-scene>
        <div className="contact-lead" data-reveal="left"><p>CONTACT US</p><h2>联系我们</h2><span>欢迎就产品资料、配套服务、进口维修替代与研发定制需求与我们沟通。</span><Link href="/contact">查看联系方式 <b>↗</b></Link></div>
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
