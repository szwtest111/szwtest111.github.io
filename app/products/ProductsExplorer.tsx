"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "../site-data";

type FamilyId = "all" | Product["family"];

const families: Array<{ id: FamilyId; label: string; note: string }> = [
  { id: "all", label: "全部方向", note: "浏览完整目录" },
  { id: "xray-tube", label: "X射线管", note: "封装、微焦点与阳极" },
  { id: "power-source", label: "电源与射线源", note: "高压电源及一体化方向" },
  { id: "service", label: "服务与定制", note: "维修替代及研发定制" },
  { id: "accessory", label: "配套产品", note: "探测器等配套方向" },
];

const familyNames: Record<Product["family"], string> = {
  "xray-tube": "X射线管",
  "power-source": "电源与射线源",
  service: "服务与定制",
  accessory: "配套产品",
};

export function ProductsExplorer({ products }: { products: Product[] }) {
  const [activeFamily, setActiveFamily] = useState<FamilyId>("all");
  const visibleProducts = useMemo(
    () => activeFamily === "all" ? products : products.filter(product => product.family === activeFamily),
    [activeFamily, products],
  );
  const currentProducts = visibleProducts.filter(product => product.status === "基础信息");
  const pendingProducts = visibleProducts.filter(product => product.status === "后续更新");
  const activeLabel = families.find(family => family.id === activeFamily)?.label ?? "全部方向";

  const ProductCard = ({ product, compact = false }: { product: Product; compact?: boolean }) => (
    <Link href={`/products/${product.slug}`} className={`product-catalog-card ${compact ? "is-compact" : ""}`}>
      <div className={`product-catalog-visual family-${product.family}`} aria-hidden="true">
        <span>{product.n}</span><strong>YONC</strong><i/><i/>
      </div>
      <div className="product-catalog-body">
        <div className="product-card-meta"><span>{familyNames[product.family]}</span><small>{product.status === "基础信息" ? "资料已列明" : "后续完善"}</small></div>
        <h2>{product.title}</h2>
        <p>{product.desc}</p>
        <div className="product-card-items">{product.items.map(item => <span key={item}>{item}</span>)}</div>
        <b>查看详情 <i>↗</i></b>
      </div>
    </Link>
  );

  return (
    <section className="products-explorer" aria-label="产品分类目录">
      <aside className="catalog-sidebar">
        <div className="catalog-sidebar-heading"><small>PRODUCT FAMILIES</small><p>按产品族浏览</p></div>
        <nav aria-label="产品族筛选">
          {families.map(family => {
            const count = family.id === "all" ? products.length : products.filter(product => product.family === family.id).length;
            return <button type="button" key={family.id} className={activeFamily === family.id ? "active" : ""} aria-pressed={activeFamily === family.id} onClick={() => setActiveFamily(family.id)}><span><b>{family.label}</b><small>{family.note}</small></span><i>{String(count).padStart(2, "0")}</i></button>;
          })}
        </nav>
        <div className="catalog-help"><span>不确定如何选择？</span><Link href="/contact">联系技术人员 <b>↗</b></Link></div>
      </aside>

      <div className="catalog-results" aria-live="polite">
        <div className="catalog-toolbar"><div><small>当前分类</small><span>{activeLabel}</span></div><p>共 {String(visibleProducts.length).padStart(2, "0")} 个产品与业务方向</p></div>
        {currentProducts.length > 0 && <div className="catalog-group"><div className="catalog-group-title"><h2>现有产品与业务</h2><span>{String(currentProducts.length).padStart(2, "0")}</span></div><div className="product-card-grid">{currentProducts.map(product => <ProductCard key={product.slug} product={product} />)}</div></div>}
        {pendingProducts.length > 0 && <div className="catalog-group pending-group"><div className="catalog-group-title"><h2>后续完善方向</h2><span>{String(pendingProducts.length).padStart(2, "0")}</span></div><p className="pending-note">以下方向已列入现有资料，具体介绍、型号和技术参数将在资料完善后更新。</p><div className="product-card-grid pending-grid">{pendingProducts.map(product => <ProductCard key={product.slug} product={product} compact />)}</div></div>}
        {visibleProducts.length === 0 && <div className="catalog-empty"><h2>该分类内容正在整理</h2><p>具体产品信息将在客户资料完善后更新。</p></div>}
      </div>
    </section>
  );
}
