import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { applicationAreas, products } from "../site-data";
import { ProductsExplorer } from "./ProductsExplorer";

export const metadata: Metadata = {
  title: "产品中心｜YONC优能创",
  description: "浏览优能创X射线管封装、微焦点X射线管、高压电源及研发定制等产品与业务方向。",
};

export default function ProductsPage() {
  return (
    <main className="inner-page products-page">
      <SiteHeader />
      <section className="inner-hero products-hero">
        <div><nav className="breadcrumbs dark" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><b>产品中心</b></nav><p>PRODUCT CENTER</p><h1>产品业务体系<br/><em>清晰分类展示</em></h1><span>产品系列 · 维修替代 · 高压电源 · 研发定制</span></div>
      </section>
      <section className="products-intro"><div className="inner-label" data-reveal="left">01 · PRODUCT CATALOG</div><div data-reveal><p className="kicker">PRODUCTS & SERVICES</p><h2>产品与业务目录<br/>聚焦现有方向</h2></div><p data-reveal="right">产品型号、性能参数、适配范围与实拍图片将随资料完善持续更新。</p></section>
      <ProductsExplorer products={products} />
      <section className="application-reference" data-reveal>
        <div><p className="kicker">APPLICATION AREAS</p><h2>多元应用领域</h2><span>覆盖荧光分析、成像、衍射、厚度、密度与应力分析等相关领域。</span></div>
        <div>{applicationAreas.map(area => <span key={area}>{area}</span>)}</div>
      </section>
      <section className="inner-cta" data-reveal><p>CUSTOM ENGINEERING</p><h2>需要了解具体型号<br/>或研发定制方向？</h2><Link href="/#contact">联系优能创 <b>↗</b></Link></section>
      <SiteFooter />
    </main>
  );
}
