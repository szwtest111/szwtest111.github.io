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
  assert.match(html, /产品与业务方向/);
  assert.match(html, /完整工艺体系/);
  assert.match(html, /data-scene="true"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the homepage rhythm responsive and motion-safe", async () => {
  const [css, page, experience, packageJson] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.ok((page.match(/data-scene/g) ?? []).length >= 7);
  assert.match(css, /homepage chapter rhythm/);
  assert.match(css, /clamp\(560px,68svh,720px\)/);
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
