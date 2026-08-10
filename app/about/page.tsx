import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { companyHighlights } from "../site-data";

export const metadata: Metadata = {
  title: "关于我们｜YONC优能创",
  description: "了解优能创（上海）电气科技有限公司的公司简介。",
};

export default function AboutPage() {
  return (
    <main className="inner-page">
      <SiteHeader />
      <section className="inner-hero about-hero"><div><nav className="breadcrumbs dark" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><b>关于我们</b></nav><p>ABOUT US</p><h1>关于我们</h1><span>优能创（上海）电气科技有限公司</span></div></section>
      <section className="about-overview">
        <div className="inner-label" data-reveal="left">01 · COMPANY PROFILE</div>
        <div data-reveal><p className="kicker">优能创（上海）电气科技有限公司</p><h2>专注低能X射线技术<br/>服务精密分析与工业检测</h2></div>
        <div className="prose" data-reveal="right"><p>优能创（上海）电气科技有限公司，是一家专业研发、生产、销售高端低能X射线管及配套服务为一体的高科技型企业。</p><p>公司产品主要致力于结构分析X射线管、荧光分析X射线管、测厚X射线管、工业探伤X射线管，广泛应用于荧光分析领域、成像领域、衍射分析、厚度测量、密度测量、应力分析以及其他相关X射线领域。</p><p>公司引进精良的生产设备和精密检测设备，拥有经验丰富的研发团队和成熟的技工队伍，始终坚持“以质量为保障，以创新为动力”，并可依据客户应用场景提供标准与非标定制方案。</p></div>
      </section>
      <section className="company-highlights" aria-label="公司概览" data-reveal>
        {companyHighlights.map(item => <article key={item.label}><b>{item.value}</b><span>{item.label}</span></article>)}
      </section>
      <section className="about-image-band" data-reveal="scale"><img src="/yonc-factory.jpg" alt="优能创生产基地"/><div><b>YONC</b><span>SHANGHAI · CHINA</span></div></section>
      <SiteFooter />
    </main>
  );
}
