"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "../site-data";

export function ProductsExplorer({ products }: { products: Product[] }) {
  const [active, setActive] = useState(products[0]?.slug ?? "");

  useEffect(() => {
    const sections = products
      .map(product => document.getElementById(`catalog-${product.slug}`))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id.replace("catalog-", ""));
    }, { rootMargin: "-22% 0px -58% 0px", threshold: [0, .2, .5] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [products]);

  return (
    <section className="products-explorer" aria-label="产品分类目录">
      <aside className="catalog-sidebar">
        <p>产品分类</p>
        <nav aria-label="产品分类快速导航">
          {products.map(product => (
            <a
              key={product.slug}
              href={`#catalog-${product.slug}`}
              className={active === product.slug ? "active" : ""}
              aria-current={active === product.slug ? "location" : undefined}
              onClick={() => setActive(product.slug)}
            ><small>{product.n}</small><span>{product.title}</span></a>
          ))}
        </nav>
        <div><span>未找到合适产品？</span><Link href="/#contact">联系技术人员 <b>↗</b></Link></div>
      </aside>
      <div className="catalog-results">
        <div className="catalog-toolbar"><span>全部产品与业务</span><small>共 {String(products.length).padStart(2, "0")} 个方向</small></div>
        {products.map(product => (
          <article id={`catalog-${product.slug}`} key={product.slug} className="product-row" data-reveal>
            <div className="product-row-index">{product.n}</div>
            <div className="product-row-visual" aria-hidden="true"><span>YONC</span><i/><i/></div>
            <div className="product-row-copy">
              <small>PRODUCT SERIES · {product.n}</small>
              <h2>{product.title}</h2>
              <p>{product.desc}</p>
              <div className="product-row-tags">{product.items.map(item => <span key={item}>{item}</span>)}</div>
            </div>
            <Link className="product-row-link" href={`/products/${product.slug}`} aria-label={`查看${product.title}详情`}><span>查看详情</span><b>↗</b></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
