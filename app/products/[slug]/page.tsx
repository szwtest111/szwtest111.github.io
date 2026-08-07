import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { products } from "../../site-data";

export function generateStaticParams() {
  return products.map(product => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug);
  return { title: `${product?.title ?? "产品中心"}｜YONC优能创`, description: product?.desc };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug) ?? products[0];
  return (
    <main className="inner-page product-page">
      <SiteHeader />
      <section className="inner-hero product-hero"><div><p>PRODUCTS · {product.n}</p><h1>{product.title}</h1><span>{product.en}</span></div></section>
      <section className="product-overview">
        <div className="product-visual"><div className="tech-object"><i/><i/><span>YONC<br/><small>X-RAY TUBE</small></span></div><p>产品实拍图待客户资料补充后替换</p></div>
        <div className="product-copy"><p className="kicker">PRODUCT OVERVIEW</p><h2>{product.title}</h2><p>{product.desc}</p><div className="feature-row">{product.features.map((feature, i) => <span key={feature}><b>0{i + 1}</b>{feature}</span>)}</div><a href="/#contact">咨询这款产品 <b>↗</b></a></div>
      </section>
      <section className="application-section"><div><p className="kicker">APPLICATIONS</p><h2>面向真实工况<br/>匹配应用需求</h2></div><div className="application-grid">{product.applications.map((app, i) => <article key={app}><b>0{i + 1}</b><h3>{app}</h3><p>围绕设备结构、运行条件与检测目标进行专业适配。</p></article>)}</div></section>
      <section className="spec-section"><div><p className="kicker">TECHNICAL DATA</p><h2>技术参数</h2></div><div className="spec-table"><div><span>产品系列</span><b>{product.title}</b></div><div><span>应用方向</span><b>{product.applications.join(" / ")}</b></div><div><span>核心特性</span><b>{product.features.join(" / ")}</b></div><div className="pending"><span>详细型号及参数</span><b>待客户产品手册补充</b></div></div></section>
      <section className="product-nav"><p>其他产品</p>{products.filter(item => item.slug !== product.slug).map(item => <a key={item.slug} href={`/products/${item.slug}`}><span>{item.n}</span>{item.title}<b>↗</b></a>)}</section>
      <SiteFooter />
    </main>
  );
}
