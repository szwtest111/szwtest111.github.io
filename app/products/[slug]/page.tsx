import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { products } from "../../site-data";

export function generateStaticParams() {
  return products.map(product => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug);
  return { title: `${product?.title ?? "产品中心"}｜YONC优能创`, description: product?.desc ?? "优能创产品与业务方向。" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug) ?? products[0];
  return (
    <main className="inner-page product-page">
      <SiteHeader />
      <section className="inner-hero product-hero"><div><nav className="breadcrumbs dark" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><Link href="/products">产品中心</Link><span>/</span><b>{product.title}</b></nav><p>PRODUCT SERIES · {product.n}</p><h1>{product.title}</h1><span>{product.status}</span></div></section>
      <section className="product-overview">
        <div className="product-visual" data-reveal="left"><div className="tech-object"><i/><i/><span>YONC<br/><small>PRODUCT DATA</small></span></div><p>产品图片待补充</p></div>
        <div className="product-copy" data-reveal="right"><p className="kicker">CURRENT INFORMATION</p><h2>{product.title}</h2><p>{product.desc}</p><div className="feature-row"><span><b>01</b>{product.status}</span><span><b>02</b>{product.items.length > 0 ? `${product.items.length}项明细` : "详细内容待补充"}</span></div><Link href="/contact">联系优能创 <b>↗</b></Link></div>
      </section>
      {product.items.length > 0 && <section className="application-section"><div data-reveal="left"><p className="kicker">AVAILABLE DETAILS</p><h2>已有明细</h2></div><div className="application-grid">{product.items.map((item, i) => <article key={item} data-reveal><b>{String(i + 1).padStart(2, "0")}</b><h3>{item}</h3></article>)}</div></section>}
      <section className="spec-section"><div data-reveal="left"><p className="kicker">CURRENT INFORMATION</p><h2>当前资料</h2></div><div className="spec-table" data-reveal="right"><div><span>产品或业务名称</span><b>{product.title}</b></div><div><span>已有明细</span><b>{product.items.length > 0 ? product.items.join(" / ") : "待补充"}</b></div><div><span>资料状态</span><b>{product.status}</b></div><div className="pending"><span>产品图片</span><b>待补充</b></div></div></section>
      <section className="product-nav"><p data-reveal>其他产品</p>{products.filter(item => item.slug !== product.slug).map(item => <Link key={item.slug} href={`/products/${item.slug}`} data-reveal><span>{item.n}</span>{item.title}<b>↗</b></Link>)}</section>
      <SiteFooter />
    </main>
  );
}
