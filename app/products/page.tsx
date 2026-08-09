import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { applicationAreas, products } from "../site-data";

export const metadata: Metadata = {
  title: "产品中心｜YONC优能创",
  description: "浏览优能创当前资料列明的X射线管封装、微焦点X射线管、高压电源及研发定制等产品与业务方向。",
};

export default function ProductsPage() {
  return (
    <main className="inner-page products-page">
      <SiteHeader />
      <section className="inner-hero products-hero">
        <div><nav className="breadcrumbs dark" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><b>产品中心</b></nav><p>PRODUCT CENTER</p><h1>客户资料目录<br/><em>清晰对应展示</em></h1><span>产品系列 · 维修替代 · 高压电源 · 研发定制</span></div>
      </section>
      <section className="products-intro"><div className="inner-label" data-reveal="left">01 · PRODUCT CATALOG</div><div data-reveal><p className="kicker">CURRENT CLIENT MATERIALS</p><h2>产品与业务目录<br/>以客户资料为准</h2></div><p data-reveal="right">以下内容依据客户现阶段提供的Word资料整理。未提供的产品型号、性能参数、适配范围与实拍图片均明确标注为待补充，不作推测性展示。</p></section>
      <section className="product-catalog">
        {products.map(product => <Link href={`/products/${product.slug}`} key={product.slug} className="catalog-card" data-reveal><div className="catalog-number">{product.n}</div><div className="catalog-visual"><span>YONC</span><i/><i/></div><div className="catalog-copy"><small>PRODUCT SERIES · {product.n}</small><h2>{product.title}</h2><p>{product.desc}</p><div>{product.items.map(item => <span key={item}>{item}</span>)}</div><b>{product.status === "待后续更新" ? "查看待更新说明" : "查看资料详情"} ↗</b></div></Link>)}
      </section>
      <section className="application-reference" data-reveal>
        <div><p className="kicker">APPLICATION REFERENCE</p><h2>应用领域单独呈现</h2><span>以下内容来自客户后续提供的公司简介，不与某一个具体产品系列强行绑定。</span></div>
        <div>{applicationAreas.map(area => <span key={area}>{area}</span>)}</div>
      </section>
      <section className="inner-cta" data-reveal><p>CUSTOM ENGINEERING</p><h2>需要了解具体型号<br/>或研发定制方向？</h2><Link href="/#contact">联系优能创 <b>↗</b></Link></section>
      <SiteFooter />
    </main>
  );
}
