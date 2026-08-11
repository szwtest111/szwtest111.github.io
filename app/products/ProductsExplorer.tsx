"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "../site-data";

type Selection = "all" | Product["slug"];

export function ProductsExplorer({ products }: { products: Product[] }) {
  const [selection, setSelection] = useState<Selection>("all");
  const visibleProducts = useMemo(
    () => selection === "all" ? products : products.filter(product => product.slug === selection),
    [products, selection],
  );
  const selectedProduct = selection === "all" ? undefined : products.find(product => product.slug === selection);

  return (
    <section className="products-explorer" aria-label="产品目录">
      <aside className="catalog-sidebar">
        <div className="catalog-sidebar-heading"><small>PRODUCT LIST</small><p>产品目录</p></div>
        <nav aria-label="产品目录筛选">
          <button type="button" className={selection === "all" ? "active" : ""} aria-pressed={selection === "all"} onClick={() => setSelection("all")}><span><b>全部产品</b><small>查看完整目录</small></span><i>{String(products.length).padStart(2, "0")}</i></button>
          {products.map(product => (
            <button type="button" key={product.slug} className={selection === product.slug ? "active" : ""} aria-pressed={selection === product.slug} onClick={() => setSelection(product.slug)}><span><b>{product.title}</b><small>{product.status}</small></span><i>{product.n}</i></button>
          ))}
        </nav>
        <div className="catalog-help"><span>需要进一步了解？</span><Link href="/contact">联系我们 <b>↗</b></Link></div>
      </aside>

      <div className="catalog-results" aria-live="polite">
        <div className="catalog-toolbar"><div><small>当前查看</small><span>{selectedProduct?.title ?? "全部产品"}</span></div><p>共 {String(visibleProducts.length).padStart(2, "0")} 项</p></div>
        <div className="catalog-group source-catalog-group">
          <div className="product-card-grid">
            {visibleProducts.map(product => (
              <Link href={`/products/${product.slug}`} className={`product-catalog-card ${product.status === "待补充" ? "is-pending" : ""}`} key={product.slug}>
                <div className="product-catalog-visual" aria-hidden="true"><span>{product.n}</span><strong>YONC</strong><i/><i/></div>
                <div className="product-catalog-body">
                  <div className="product-card-meta"><span>产品与业务目录</span><small>{product.status}</small></div>
                  <h2>{product.title}</h2>
                  <p>{product.desc}</p>
                  {product.items.length > 0 && <div className="product-card-items">{product.items.map(item => <span key={item}>{item}</span>)}</div>}
                  <b>查看详情 <i>↗</i></b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
