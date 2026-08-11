import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the YONC homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>YONC优能创｜高端低能X射线管<\/title>/i);
  assert.match(html, /优能创（上海）电气科技有限公司/);
  assert.match(html, /产品中心/);
  assert.match(html, /关于我们/);
  assert.match(html, /联系我们/);
  assert.match(html, /data-scene="true"/);
  assert.doesNotMatch(html, /研发制造|服务与业务方向|多元应用领域/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps pages independent and navigation free of homepage anchors", async () => {
  const [css, page, header, contact, experience, packageJson] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.equal((page.match(/data-scene/g) ?? []).length, 2);
  assert.doesNotMatch(page, /href="(?:\/)?#/);
  assert.doesNotMatch(header, /href="(?:\/)?#/);
  assert.doesNotMatch(header, /研发制造|服务支持|企业动态/);
  assert.match(header, /href="\/about"/);
  assert.match(header, /href="\/products"/);
  assert.match(header, /href="\/contact"/);
  assert.match(contact, /联系我们/);
  assert.match(css, /@media\(max-width:900px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(experience, /SCENE_SELECTOR/);
  assert.match(experience, /max-width: 900px/);
  assert.match(experience, /-18%/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(
    access(new URL("public/_sites-preview", templateRoot)),
  );
});

test("product center uses source-backed names without invented details", async () => {
  const [explorer, productData, productPage, sourceMap] = await Promise.all([
    readFile(new URL("../app/products/ProductsExplorer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/products/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../client-materials/source-to-website-map.md", import.meta.url), "utf8"),
  ]);

  assert.match(explorer, /产品目录/);
  assert.match(explorer, /全部产品/);
  assert.match(explorer, /aria-pressed/);
  assert.match(explorer, /product-catalog-card/);
  assert.doesNotMatch(explorer, /产品族|family-/);
  assert.match(productData, /35um焦点X射线管/);
  assert.match(productData, /30KV/);
  assert.match(productData, /结构分析X射线管/);
  assert.doesNotMatch(productData, /适配品牌|维修内容|交付标准|合作流程/);
  assert.doesNotMatch(productPage, /技术参数待补充|具体型号、参数/);
  assert.match(sourceMap, /不允许自行补充/);

  await Promise.all([
    access(new URL("../client-materials/originals/images/yonc-factory-original.jpg", import.meta.url)),
    access(new URL("../client-materials/originals/images/yonc-logo-original.jpg", import.meta.url)),
    access(new URL("../client-materials/transcripts/company-profile.md", import.meta.url)),
    access(new URL("../client-materials/transcripts/product-catalog-from-word.md", import.meta.url)),
  ]);
});
