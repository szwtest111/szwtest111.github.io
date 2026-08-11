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

test("product center provides family filters and full-card detail links", async () => {
  const [explorer, productData] = await Promise.all([
    readFile(new URL("../app/products/ProductsExplorer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-data.ts", import.meta.url), "utf8"),
  ]);

  assert.match(explorer, /按产品族浏览/);
  assert.match(explorer, /aria-pressed/);
  assert.match(explorer, /现有产品与业务/);
  assert.match(explorer, /后续完善方向/);
  assert.match(explorer, /product-catalog-card/);
  assert.doesNotMatch(explorer, /#catalog-/);
  assert.match(productData, /family: "xray-tube"/);
  assert.match(productData, /family: "power-source"/);
  assert.match(productData, /family: "service"/);
});
