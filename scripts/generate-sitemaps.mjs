import fs from "fs";
import path from "path";
import "dotenv/config";

const BASE = "https://neurobalance.co";
const API = process.env.VITE_API_URL;
const TOKEN = process.env.VITE_API_TOKEN;

if (!API || !TOKEN) {
  console.error("Missing VITE_API_URL or VITE_API_TOKEN");
  process.exit(1);
}

const MAX_URLS_PER_FILE = 49000;

const STATIC_PAGES = [
  "/",
  "/about",
  "/courses",
  "/courses/neuro-balance",
  "/courses/bio-balance",
  "/contact-us",
  "/neurological-symptom",
  "/reviews",
  "/atec",
  "/atec/question",
  "/symptoms",
  "/article",
];

const collections = [
  {
    key: "articles",
    route: (id) => `/article/${id}`,
    fetchPath:
      "articles?populate[banner][populate]=*&populate[viewCountAndSocial][populate]=*",
    pickId: (raw) => raw?.article?.documentId ?? raw?.documentId ?? raw?.slug,
    pickUpdated: (raw) =>
      raw?.article?.updatedAt ??
      raw?.updatedAt ??
      raw?.article?.publishedAt ??
      raw?.publishedAt,
    pickImage: (raw) =>
      raw?.article?.banner?.image?.url ??
      raw?.banner?.image?.url ??
      raw?.image?.url ??
      null,
  },
  {
    key: "symptoms",
    route: (id) => `/symptom-article/${id}`,
    fetchPath:
      "symtom-articles?populate[banner][populate]=*&populate[viewCountAndSocial][populate]=*",
    pickId: (raw) => raw?.documentId ?? raw?.slug ?? raw?.id,
    pickUpdated: (raw) => raw?.updatedAt ?? raw?.publishedAt,
    pickImage: (raw) => raw?.banner?.image?.url ?? null,
  },
];

const xml = {
  header: () => `<?xml version="1.0" encoding="UTF-8"?>`,
  urlsetOpen: () =>
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
  urlsetClose: () => `</urlset>`,
  sitemapIndexOpen: () =>
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  sitemapIndexClose: () => `</sitemapindex>`,
  url: ({ loc, lastmod, changefreq = "weekly", image }) =>
    [
      `  <url>`,
      `    <loc>${esc(loc)}</loc>`,
      `    <changefreq>${changefreq}</changefreq>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      image ? imageTag(image) : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  sitemap: (loc) => `  <sitemap>\n    <loc>${esc(loc)}</loc>\n  </sitemap>`,
};

const imageTag = (imgUrl) =>
  [
    `    <image:image>`,
    `      <image:loc>${esc(toAbs(imgUrl))}</image:loc>`,
    `    </image:image>`,
  ].join("\n");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toAbs = (u) => (u && u.startsWith("http") ? u : `${BASE}${u || ""}`);

function writePublic(file, content) {
  const out = path.join(process.cwd(), "public", file);
  fs.writeFileSync(out, content, "utf8");
  console.log("✓ wrote", file);
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

async function fetchAll(pathname, pageSize = 100) {
  let page = 1;
  const out = [];
  while (true) {
    const url = `${API}/${pathname}${
      pathname.includes("?") ? "&" : "?"
    }pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const json = await fetchJson(url);
    const data = Array.isArray(json?.data) ? json.data : [];
    out.push(...data);
    const meta = json?.meta?.pagination;
    if (!meta || page >= meta.pageCount) break;
    page++;
  }
  return out;
}

const normDate = (v) => {
  if (!v) return "";
  const d = String(v).split("T")[0];
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : "";
};

const chunk = (arr, size) => {
  const r = [];
  for (let i = 0; i < arr.length; i += size) r.push(arr.slice(i, i + size));
  return r;
};

async function buildStatic() {
  const today = new Date().toISOString().split("T")[0];
  const urls = STATIC_PAGES.map((p) =>
    xml.url({ loc: `${BASE}${p}`, lastmod: today, changefreq: "weekly" })
  );
  const content = [
    xml.header(),
    xml.urlsetOpen(),
    urls.join("\n"),
    xml.urlsetClose(),
  ].join("\n");
  writePublic("sitemap-pages.xml", content);
  return [`${BASE}/sitemap-pages.xml`];
}

async function buildCollection({
  key,
  route,
  fetchPath,
  pickId,
  pickUpdated,
  pickImage,
}) {
  const rows = await fetchAll(fetchPath);
  const items = rows
    .map((raw) => {
      const id = pickId(raw);
      if (!id) return null;
      const last = normDate(pickUpdated(raw));
      const img = pickImage(raw);
      const loc = `${BASE}${route(id)}`;
      return xml.url({ loc, lastmod: last, image: img || null });
    })
    .filter(Boolean);

  const parts = chunk(items, MAX_URLS_PER_FILE);
  const produced = [];

  parts.forEach((urls, idx) => {
    const file =
      parts.length === 1
        ? `sitemap-${key}.xml`
        : `sitemap-${key}-${idx + 1}.xml`;
    const content = [
      xml.header(),
      xml.urlsetOpen(),
      urls.join("\n"),
      xml.urlsetClose(),
    ].join("\n");
    writePublic(file, content);
    produced.push(`${BASE}/${file}`);
  });

  return produced;
}

async function main() {
  const produced = [];

  produced.push(...(await buildStatic()));
  for (const col of collections) produced.push(...(await buildCollection(col)));

  const indexXml = [
    xml.header(),
    xml.sitemapIndexOpen(),
    produced.map((loc) => xml.sitemap(loc)).join("\n"),
    xml.sitemapIndexClose(),
  ].join("\n");
  writePublic("sitemap-index.xml", indexXml);

  console.log("All sitemaps generated.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
