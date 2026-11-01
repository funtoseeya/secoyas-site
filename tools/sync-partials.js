#!/usr/bin/env node
// Copies partials/header.html and partials/footer.html into every page in site/,
// between <!-- partial:NAME --> and <!-- /partial:NAME --> markers, and marks the
// current page in the nav with aria-current. Pages stay complete HTML files that
// can be uploaded as-is. Run after editing a partial: node tools/sync-partials.js

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const site = path.join(root, "site");
const partials = ["header", "footer"].map((name) => ({
  name,
  html: fs.readFileSync(path.join(root, "partials", name + ".html"), "utf8").trim(),
}));

function pages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return pages(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

let changed = 0;
for (const file of pages(site)) {
  const before = fs.readFileSync(file, "utf8");
  const rel = path.relative(site, file).split(path.sep).join("/");
  const url = "/" + rel.replace(/index\.html$/, "");
  let html = before;
  for (const { name, html: partial } of partials) {
    const re = new RegExp(`(<!-- partial:${name} -->)[\\s\\S]*?(<!-- /partial:${name} -->)`);
    if (!re.test(html)) continue;
    let block = partial;
    if (name === "header" && url !== "/") {
      block = block.replace(`<a href="${url}">`, `<a href="${url}" aria-current="page">`);
    }
    html = html.replace(re, `$1\n${block}\n$2`);
  }
  if (html !== before) {
    fs.writeFileSync(file, html);
    changed++;
    console.log("updated", rel);
  }
}
console.log(changed ? `${changed} page(s) updated` : "all pages already up to date");
