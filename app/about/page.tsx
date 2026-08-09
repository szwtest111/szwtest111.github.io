import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { processSteps } from "../site-data";

export const metadata: Metadata = {
  title: "关于优能创｜YONC",
  description: "了解优能创（上海）电气科技有限公司的公司介绍、企业文化与完整质量工艺体系。",
};

export default function AboutPage() {
  return (
    <main className="inner-page">
      <SiteHeader />
      <section className="inner-hero about-hero"><div><nav className="breadcrumbs dark" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><b>关于优能创</b></nav><p>ABOUT YONC</p><h1>以质量为保障<br/><em>以创新为动力</em></h1><span>专业研发、生产、销售高端低能X射线管及配套服务</span></div></section>
      <section className="about-overview">
        <div className="inner-label" data-reveal="left">01 · COMPANY PROFILE</div>
        <div data-reveal><p className="kicker">优能创（上海）电气科技有限公司</p><h2>专注低能X射线技术<br/>服务精密分析与工业检测</h2></div>
        <div className="prose" data-reveal="right"><p>优能创（上海）电气科技有限公司，是一家专业研发、生产、销售高端低能X射线管及配套服务为一体的高科技型企业。</p><p>公司产品主要致力于结构分析X射线管、荧光分析X射线管、测厚X射线管、工业探伤X射线管，广泛应用于荧光分析领域、成像领域、衍射分析、厚度测量、密度测量、应力分析以及其他相关X射线领域。</p><p className="source-note">以上为客户后续提供的公司简介原文口径；产品中心则依据客户Word产品目录整理，具体分类以客户最终产品手册为准。</p></div>
      </section>
      <section className="about-image-band" data-reveal="scale"><img src="/yonc-factory.jpg" alt="优能创生产基地"/><div><b>YONC</b><span>SHANGHAI · CHINA</span></div></section>
      <section className="quality-system">
        <div className="quality-title" data-reveal="left"><p className="kicker">COMPLETE QUALITY SYSTEM</p><h2>从源头把控品质<br/>让稳定成为标准</h2><p>公司引进精良的生产设备和精密检测设备，拥有经验丰富的研发团队和成熟的技工队伍。每支出厂产品均经过全参数检测和严苛品控，持续提升产品的性能稳定性与使用寿命。</p></div>
        <div className="process-list">{processSteps.map((step, i) => <article key={step} data-reveal><b>0{i + 1}</b><h3>{step}</h3><p>{["具体检验项目与判定标准待客户补充", "具体设备与工艺参数待客户补充", "具体靶材及焊接标准待客户补充", "具体电压范围与装配规范待客户补充", "具体测试周期与判定标准待客户补充"][i]}</p></article>)}</div>
      </section>
      <section className="culture">
        <div className="inner-label" data-reveal>03 · CULTURE</div><h2 data-reveal>用户的信赖与支持<br/>是优能创前进的动力</h2>
        <div className="culture-grid"><article data-reveal><small>QUALITY</small><h3>质量可靠</h3><p>以完整工艺体系和严苛检测守住产品底线。</p></article><article data-reveal><small>STABILITY</small><h3>性能稳定</h3><p>围绕真实工况持续优化产品可靠性与寿命。</p></article><article data-reveal><small>SERVICE</small><h3>服务热情</h3><p>以专业、及时的响应支持每一次客户需求。</p></article><article data-reveal><small>INNOVATION</small><h3>持续创新</h3><p>以技术创新推动核心部件能力不断进步。</p></article></div>
      </section>
      <section className="inner-cta" data-reveal><p>OUR PURSUIT</p><h2>为客户提供更优的<br/>产品与服务</h2><Link href="/#contact">联系优能创 <b>↗</b></Link></section>
      <SiteFooter />
    </main>
  );
}
