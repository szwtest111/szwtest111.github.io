import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { products } from "../site-data";

export const metadata: Metadata = {
  title: "产品中心｜YONC优能创",
  description: "浏览优能创结构分析、荧光分析、测厚及工业探伤X射线管产品。",
};

export default function ProductsPage() {
  return (
    <main className="inner-page products-page">
      <SiteHeader />
      <section className="inner-hero products-hero">
        <div><nav className="breadcrumbs dark" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><b>产品中心</b></nav><p>PRODUCT CENTER</p><h1>精密核心部件<br/><em>服务真实工况</em></h1><span>结构分析 · 荧光分析 · 测厚 · 工业探伤</span></div>
      </section>
      <section className="products-intro"><div className="inner-label" data-reveal="left">01 · PRODUCT MATRIX</div><div data-reveal><p className="kicker">YONC X-RAY TUBES</p><h2>四大产品方向<br/>面向多元分析与检测</h2></div><p data-reveal="right">围绕荧光分析、成像、衍射、厚度、密度与应力测量等领域，优能创提供稳定可靠的低能X射线核心部件与专业适配服务。</p></section>
      <section className="product-catalog">
        {products.map(product => <Link href={`/products/${product.slug}`} key={product.slug} className="catalog-card" data-reveal><div className="catalog-number">{product.n}</div><div className="catalog-visual"><span>YONC</span><i/><i/></div><div className="catalog-copy"><small>{product.en}</small><h2>{product.title}</h2><p>{product.desc}</p><div>{product.applications.map(item => <span key={item}>{item}</span>)}</div><b>查看产品详情 ↗</b></div></Link>)}
      </section>
      <section className="inner-cta" data-reveal><p>CUSTOM ENGINEERING</p><h2>需要特定结构或<br/>应用适配方案？</h2><Link href="/#contact">联系优能创 <b>↗</b></Link></section>
      <SiteFooter />
    </main>
  );
}
