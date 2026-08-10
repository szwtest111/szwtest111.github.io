import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "联系我们｜YONC优能创",
  description: "联系优能创（上海）电气科技有限公司，咨询X射线管产品、配套服务及研发定制需求。",
};

export default function ContactPage() {
  return (
    <main className="inner-page contact-page">
      <SiteHeader />
      <section className="inner-hero contact-hero"><div><nav className="breadcrumbs" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><b>联系我们</b></nav><p>CONTACT US</p><h1>联系我们</h1><span>期待与您进一步沟通产品与项目需求</span></div></section>
      <section className="contact-page-content">
        <div className="contact-page-lead" data-reveal="left"><p className="kicker">YONC · SHANGHAI</p><h2>优能创（上海）<br/>电气科技有限公司</h2><p>欢迎就X射线管产品资料、配套服务、进口维修替代及研发定制需求与我们联系。正式联系方式确认后，本页面将同步开放电话、邮箱和微信咨询入口。</p></div>
        <div className="contact-page-list" data-reveal="right">
          <article><small>PHONE</small><h3>后续待补充</h3><p>技术咨询电话</p></article>
          <article><small>EMAIL</small><h3>后续待补充</h3><p>商务与项目需求</p></article>
          <article><small>ADDRESS</small><h3>上海 · 详细地址待补充</h3><p>优能创（上海）电气科技有限公司</p></article>
        </div>
      </section>
      <section className="contact-page-note"><span>产品信息</span><p>如需查看当前产品与业务目录，可前往产品中心。</p><Link href="/products">进入产品中心 <b>↗</b></Link></section>
      <SiteFooter />
    </main>
  );
}
