#!/usr/bin/env node
const fs = require("fs");

const htmlFile = process.argv[2];
const assetsFile = process.argv[3];
if (!htmlFile) throw new Error("missing file argument");
if (!assetsFile) throw new Error("missing asset file argument");
const html = fs.readFileSync(htmlFile, "utf8");
const assets = JSON.parse(fs.readFileSync(assetsFile, "utf8"));

const occurrences = (html.match(/<script>.*?<\/script>/) || []).length;
if (occurrences !== 1) throw new Error(`Not sure how to deal that! (${occurrences} occurrences)`);
const uri = assets["runtime~main.js"];
const newHtml = html.replace(
  /<script>.*?<\/script>/,
  `<script src="${uri}"></script>`
);

fs.writeFileSync(htmlFile, newHtml, "utf8");
