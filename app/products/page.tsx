import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { productDirections, products } from "../site-data";
import { ProductsExplorer } from "./ProductsExplorer";

export const metadata: Metadata = {
  title: "产品中心｜YONC优能创",
  description: "浏览优能创现有资料中的产品与业务目录。",
};

export default function ProductsPage() {
  return (
    <main className="inner-page products-page">
      <SiteHeader />
      <section className="inner-hero products-hero">
        <div><nav className="breadcrumbs dark" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><b>产品中心</b></nav><p>PRODUCT CENTER</p><h1>产品中心</h1><span>产品名称与明细均以现有资料为准</span></div>
      </section>
      <section className="products-intro"><div className="inner-label" data-reveal="left">01 · PRODUCT CATALOG</div><div data-reveal><p className="kicker">PRODUCTS & SERVICES</p><h2>目录清晰呈现<br/>内容准确对应</h2></div><p data-reveal="right">左侧列出当前产品目录。已提供的规格和子项直接展示，其余内容统一标记为待补充。点击产品卡片可查看现有明细。</p></section>
      <ProductsExplorer products={products} />
      <section className="application-reference" data-reveal>
        <div><p className="kicker">PRODUCT DIRECTIONS</p><h2>主要产品方向</h2><span>公司简介中列出的四类产品方向。</span></div>
        <div>{productDirections.map(direction => <span key={direction}>{direction}</span>)}</div>
      </section>
      <section className="inner-cta" data-reveal><p>CONTACT YONC</p><h2>需要进一步了解<br/>产品与业务信息？</h2><Link href="/contact">联系优能创 <b>↗</b></Link></section>
      <SiteFooter />
    </main>
  );
}
