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
  return { title: `${product?.title ?? "产品中心"}｜YONC优能创`, description: product?.desc ?? "优能创当前客户资料列明的产品与业务方向。" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug) ?? products[0];
  const providedItemCount = product.items.filter(item => !item.includes("待")).length;
  return (
    <main className="inner-page product-page">
      <SiteHeader />
      <section className="inner-hero product-hero"><div><nav className="breadcrumbs dark" aria-label="面包屑"><Link href="/">首页</Link><span>/</span><Link href="/products">产品中心</Link><span>/</span><b>{product.title}</b></nav><p>PRODUCT SERIES · {product.n}</p><h1>{product.title}</h1><span>{product.status} · 具体型号与参数以客户后续资料为准</span></div></section>
      <section className="product-overview">
        <div className="product-visual" data-reveal="left"><div className="tech-object"><i/><i/><span>YONC<br/><small>PRODUCT DATA</small></span></div><p>产品实拍图待客户资料补充后替换</p></div>
        <div className="product-copy" data-reveal="right"><p className="kicker">CURRENT MATERIALS</p><h2>{product.title}</h2><p>{product.desc}</p><div className="feature-row"><span><b>01</b>{product.status}</span><span><b>02</b>{providedItemCount ? `${providedItemCount}项已列明` : "下属条目待补充"}</span><span><b>03</b>技术参数待补充</span></div><Link href="/#contact">联系优能创 <b>↗</b></Link></div>
      </section>
      <section className="application-section"><div data-reveal="left"><p className="kicker">PROVIDED ITEMS</p><h2>客户资料当前<br/>列明内容</h2></div><div className="application-grid">{product.items.map((item, i) => <article key={item} data-reveal><b>{String(i + 1).padStart(2, "0")}</b><h3>{item}</h3><p>除以上名称外，具体型号、参数及产品图片待客户补充。</p></article>)}</div></section>
      <section className="spec-section"><div data-reveal="left"><p className="kicker">INFORMATION BOUNDARY</p><h2>资料边界</h2></div><div className="spec-table" data-reveal="right"><div><span>产品或业务方向</span><b>{product.title}</b></div><div><span>客户已提供条目</span><b>{product.items.join(" / ")}</b></div><div><span>资料状态</span><b>{product.status}</b></div><div className="pending"><span>型号、参数与实拍图</span><b>待客户正式产品资料补充</b></div></div></section>
      <section className="product-nav"><p data-reveal>其他产品</p>{products.filter(item => item.slug !== product.slug).map(item => <Link key={item.slug} href={`/products/${item.slug}`} data-reveal><span>{item.n}</span>{item.title}<b>↗</b></Link>)}</section>
      <SiteFooter />
    </main>
  );
}
