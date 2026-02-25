import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';

const ROOT = process.cwd();
const CRM_FILENAME = 'crm_5dc3e405.html';
const EXCLUDE = new Set(['.git', '.github', '.claude', 'node_modules', 'crm', '_internal', '_research', '_templates']);

function isClientFolder(name) {
  return !name.startsWith('_') && !name.startsWith('.') && !EXCLUDE.has(name);
}

function deriveTitle(filename) {
  return filename
    .replace(/^\d+_/, '')
    .replace(/\.\w+$/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function isImage(ext) {
  return ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'].includes(ext);
}

function scanFolder(folderPath, folderName) {
  let meta = { name: folderName, status: 'lead' };
  const metaPath = join(folderPath, '_meta.json');
  if (existsSync(metaPath)) {
    try {
      meta = { ...meta, ...JSON.parse(readFileSync(metaPath, 'utf-8')) };
    } catch (e) {
      console.warn(`Warning: Could not parse ${metaPath}`);
    }
  }

  const documents = [];
  const files = [];

  const entries = readdirSync(folderPath).sort();
  for (const entry of entries) {
    const fullPath = join(folderPath, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) continue;
    if (entry === '_meta.json' || entry.startsWith('.')) continue;

    const ext = extname(entry).toLowerCase();
    const path = `${folderName}/${entry}`;

    if (ext === '.md') {
      documents.push({
        filename: entry,
        title: deriveTitle(entry),
        content: readFileSync(fullPath, 'utf-8'),
        size: formatSize(stat.size),
        path
      });
    } else {
      const file = {
        filename: entry,
        title: deriveTitle(entry),
        ext,
        size: formatSize(stat.size),
        path
      };
      // Embed content for JSON files (small text files)
      if (ext === '.json') {
        try {
          file.content = readFileSync(fullPath, 'utf-8');
        } catch (e) { /* skip */ }
      }
      files.push(file);
    }
  }

  // Scan subdirectories (assets, n8n_workflows, etc.)
  for (const entry of entries) {
    const fullPath = join(folderPath, entry);
    if (!statSync(fullPath).isDirectory()) continue;
    if (entry.startsWith('.')) continue;

    try {
      for (const sub of readdirSync(fullPath).sort()) {
        const subPath = join(fullPath, sub);
        if (!statSync(subPath).isFile() || sub.startsWith('.')) continue;
        const ext = extname(sub).toLowerCase();
        const path = `${folderName}/${entry}/${sub}`;
        const file = {
          filename: `${entry}/${sub}`,
          title: `${entry}/${sub}`,
          ext,
          size: formatSize(statSync(subPath).size),
          path
        };
        if (ext === '.json') {
          try {
            file.content = readFileSync(subPath, 'utf-8');
          } catch (e) { /* skip */ }
        }
        files.push(file);
      }
    } catch (e) { /* skip unreadable dirs */ }
  }

  return { id: folderName, meta, documents, files };
}

// Scan all client folders
const folders = readdirSync(ROOT).filter(name => {
  try {
    return statSync(join(ROOT, name)).isDirectory() && isClientFolder(name);
  } catch { return false; }
});

const contacts = folders.map(name => scanFolder(join(ROOT, name), name));

// Sort: active first, then pitched, then lead, then rest
const statusOrder = { active: 0, pitched: 1, lead: 2, closed: 3, archived: 4 };
contacts.sort((a, b) => {
  const sa = statusOrder[a.meta.status] ?? 5;
  const sb = statusOrder[b.meta.status] ?? 5;
  if (sa !== sb) return sa - sb;
  return (b.meta.created || '').localeCompare(a.meta.created || '');
});

const html = buildHTML(contacts);
writeFileSync(join(ROOT, CRM_FILENAME), html);
console.log(`CRM built: ${CRM_FILENAME} (${contacts.length} contacts)`);

function buildHTML(contacts) {
  const data = JSON.stringify(contacts);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Small Group CRM</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #FAFAFA; --surface: #FFFFFF; --text-primary: #111111;
  --text-secondary: #555555; --text-muted: #999999;
  --accent: #1A1A2E; --accent-light: #16213E;
  --blue: #2563EB; --blue-light: #EFF6FF;
  --green: #059669; --green-light: #ECFDF5;
  --orange: #D97706; --orange-light: #FFFBEB;
  --red: #DC2626; --red-light: #FEF2F2;
  --border: #E5E7EB;
  --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03);
  --radius: 12px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; min-height: 100vh; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: var(--bg); color: var(--text-primary); -webkit-font-smoothing: antialiased; }

/* Header */
.header { position: sticky; top: 0; z-index: 100; background: var(--surface); border-bottom: 1px solid var(--border); padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.header-brand { font-weight: 800; font-size: 18px; letter-spacing: -0.03em; color: var(--accent); }
.header-right { display: flex; align-items: center; gap: 16px; }
.search-box { padding: 8px 16px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; font-family: inherit; width: 260px; outline: none; transition: border-color 0.2s; background: var(--bg); }
.search-box:focus { border-color: var(--accent); }
.stat-chip { font-size: 13px; color: var(--text-muted); font-weight: 500; }

/* Breadcrumb */
.breadcrumb { display: flex; align-items: center; gap: 8px; padding: 16px 32px 0; }
.breadcrumb a { font-size: 14px; color: var(--blue); text-decoration: none; font-weight: 500; cursor: pointer; }
.breadcrumb a:hover { text-decoration: underline; }
.breadcrumb .sep { color: var(--text-muted); font-size: 12px; }
.breadcrumb .current { font-size: 14px; color: var(--text-secondary); font-weight: 500; }

/* Main */
.main { padding: 24px 32px 60px; max-width: 1280px; margin: 0 auto; }

/* Dashboard Grid */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

/* Contact Card */
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow); cursor: pointer; transition: all 0.2s ease; }
.card:hover { box-shadow: var(--shadow-md); border-color: #ccc; transform: translateY(-2px); }
.card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
.card-name { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; }
.card-company { font-size: 14px; color: var(--text-secondary); margin-top: 2px; }
.card-industry { font-size: 13px; color: var(--text-muted); margin-top: 8px; }
.card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
.card-docs { font-size: 13px; color: var(--text-muted); font-weight: 500; }

/* Status Badge */
.badge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 100px; font-size: 12px; font-weight: 600; letter-spacing: 0.02em; }
.badge::before { content: ''; width: 7px; height: 7px; border-radius: 50%; }
.badge-lead { background: #F3F4F6; color: #6B7280; }
.badge-lead::before { background: #9CA3AF; }
.badge-pitched { background: var(--blue-light); color: var(--blue); }
.badge-pitched::before { background: var(--blue); }
.badge-active { background: var(--green-light); color: var(--green); }
.badge-active::before { background: var(--green); }
.badge-closed { background: var(--red-light); color: var(--red); }
.badge-closed::before { background: var(--red); }
.badge-archived { background: #F9FAFB; color: #9CA3AF; }
.badge-archived::before { background: #D1D5DB; }

/* Detail View */
.detail-header { margin-bottom: 32px; }
.detail-name { font-size: 32px; font-weight: 800; letter-spacing: -0.03em; }
.detail-company { font-size: 18px; color: var(--text-secondary); margin-top: 4px; }
.detail-meta { display: flex; flex-wrap: wrap; gap: 24px; margin-top: 16px; }
.detail-meta-item { font-size: 14px; color: var(--text-secondary); }
.detail-meta-item strong { color: var(--text-primary); font-weight: 600; }
.detail-notes { margin-top: 16px; padding: 16px; background: var(--bg); border-radius: 8px; font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
.detail-contact { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 16px; }
.detail-contact a { font-size: 14px; color: var(--blue); text-decoration: none; }
.detail-contact a:hover { text-decoration: underline; }

/* Section */
.section-title { font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px; margin-top: 32px; }

/* Document List */
.doc-list { display: flex; flex-direction: column; gap: 8px; }
.doc-item { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; cursor: pointer; transition: all 0.15s; }
.doc-item:hover { background: var(--blue-light); border-color: var(--blue); }
.doc-icon { font-size: 18px; flex-shrink: 0; }
.doc-info { flex: 1; min-width: 0; }
.doc-title { font-size: 15px; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.doc-filename { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
.doc-size { font-size: 13px; color: var(--text-muted); flex-shrink: 0; }

/* Viewer (shared for docs and files) */
.viewer-header { margin-bottom: 24px; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
.viewer-header-left { flex: 1; }
.viewer-title { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; }
.viewer-filename { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
.viewer-actions { flex-shrink: 0; }
.viewer-actions a { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; font-weight: 500; color: var(--text-secondary); text-decoration: none; transition: all 0.15s; }
.viewer-actions a:hover { border-color: var(--blue); color: var(--blue); }
.viewer-content { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 40px; box-shadow: var(--shadow); line-height: 1.7; font-size: 16px; color: var(--text-secondary); overflow: auto; }
.viewer-content h1 { font-size: 28px; font-weight: 700; color: var(--text-primary); margin: 24px 0 12px; letter-spacing: -0.02em; }
.viewer-content h2 { font-size: 22px; font-weight: 700; color: var(--text-primary); margin: 24px 0 10px; letter-spacing: -0.01em; }
.viewer-content h3 { font-size: 18px; font-weight: 600; color: var(--text-primary); margin: 20px 0 8px; }
.viewer-content p { margin: 0 0 16px; }
.viewer-content ul, .viewer-content ol { margin: 0 0 16px; padding-left: 24px; }
.viewer-content li { margin-bottom: 6px; }
.viewer-content table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
.viewer-content th, .viewer-content td { padding: 10px 14px; border: 1px solid var(--border); text-align: left; }
.viewer-content th { background: var(--bg); font-weight: 600; color: var(--text-primary); }
.viewer-content blockquote { border-left: 3px solid var(--accent); padding: 12px 20px; margin: 16px 0; background: var(--bg); border-radius: 0 8px 8px 0; }
.viewer-content code { font-size: 14px; background: var(--bg); padding: 2px 6px; border-radius: 4px; font-family: 'SF Mono', 'Fira Code', monospace; }
.viewer-content pre { background: var(--accent); color: #E5E7EB; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 16px 0; }
.viewer-content pre code { background: none; color: inherit; padding: 0; }
.viewer-content hr { border: none; border-top: 1px solid var(--border); margin: 24px 0; }
.viewer-content a { color: var(--blue); text-decoration: none; }
.viewer-content a:hover { text-decoration: underline; }
.viewer-content strong { color: var(--text-primary); }

/* File viewer specifics */
.viewer-image { text-align: center; }
.viewer-image img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: var(--shadow-md); }
.viewer-iframe { width: 100%; height: 80vh; border: 1px solid var(--border); border-radius: var(--radius); background: white; }

/* Empty State */
.empty { text-align: center; padding: 60px 20px; color: var(--text-muted); }
.empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
.empty-text { font-size: 16px; }

/* Responsive */
@media (max-width: 768px) {
  .header { padding: 0 16px; }
  .main { padding: 16px; }
  .grid { grid-template-columns: 1fr; }
  .search-box { width: 160px; }
  .detail-name { font-size: 24px; }
  .detail-meta { gap: 12px; }
  .viewer-content { padding: 24px; }
  .breadcrumb { padding: 12px 16px 0; }
  .viewer-iframe { height: 60vh; }
}
</style>
</head>
<body>

<div class="header">
  <div class="header-brand">Small Group CRM</div>
  <div class="header-right">
    <span class="stat-chip" id="stat-chip"></span>
    <input type="text" class="search-box" id="search" placeholder="Search contacts...">
  </div>
</div>
<div id="breadcrumb-container"></div>
<div class="main" id="app"></div>

<script src="https://cdn.jsdelivr.net/npm/marked@15.0.7/marked.min.js"></script>
<script>
const CRM_DATA = ${data};

const STATUS_LABELS = { lead: 'Lead', pitched: 'Pitched', active: 'Active', closed: 'Closed', archived: 'Archived' };
const IMG_EXTS = ['.png','.jpg','.jpeg','.webp','.gif','.svg'];
const IFRAME_EXTS = ['.html','.pdf'];

function fileIcon(ext) {
  switch (ext) {
    case '.md': return '\\u{1F4C4}';
    case '.html': return '\\u{1F310}';
    case '.pdf': return '\\u{1F4D5}';
    case '.json': return '\\u{2699}\\uFE0F';
    case '.jpeg': case '.jpg': case '.png': case '.webp': case '.gif': case '.svg': return '\\u{1F5BC}\\uFE0F';
    default: return '\\u{1F4CE}';
  }
}

// State
let view = 'dashboard';
let contactIdx = null;
let docIdx = null;
let fileIdx = null;
let searchQuery = '';

function getFilteredContacts() {
  if (!searchQuery) return CRM_DATA;
  const q = searchQuery.toLowerCase();
  return CRM_DATA.filter(c =>
    c.meta.name.toLowerCase().includes(q) ||
    (c.meta.company || '').toLowerCase().includes(q) ||
    (c.meta.industry || '').toLowerCase().includes(q) ||
    (c.meta.status || '').toLowerCase().includes(q) ||
    (c.meta.notes || '').toLowerCase().includes(q)
  );
}

function renderDashboard() {
  const contacts = getFilteredContacts();
  const statEl = document.getElementById('stat-chip');
  statEl.textContent = CRM_DATA.length + ' contact' + (CRM_DATA.length !== 1 ? 's' : '');
  document.getElementById('breadcrumb-container').innerHTML = '';

  if (contacts.length === 0) {
    return '<div class="empty"><div class="empty-icon">\\u{1F50D}</div><div class="empty-text">No contacts match your search</div></div>';
  }

  let html = '<div class="grid">';
  contacts.forEach((c, i) => {
    const realIdx = CRM_DATA.indexOf(c);
    const docCount = c.documents.length;
    const fileCount = c.files.length;
    html += '<div class="card" onclick="goDetail(' + realIdx + ')">';
    html += '<div class="card-header"><div><div class="card-name">' + esc(c.meta.name) + '</div>';
    if (c.meta.company) html += '<div class="card-company">' + esc(c.meta.company) + '</div>';
    html += '</div><span class="badge badge-' + esc(c.meta.status) + '">' + esc(STATUS_LABELS[c.meta.status] || c.meta.status) + '</span></div>';
    if (c.meta.industry) html += '<div class="card-industry">' + esc(c.meta.industry) + '</div>';
    html += '<div class="card-footer"><span class="card-docs">' + docCount + ' doc' + (docCount !== 1 ? 's' : '') + (fileCount > 0 ? ' &middot; ' + fileCount + ' file' + (fileCount !== 1 ? 's' : '') : '') + '</span>';
    if (c.meta.created) html += '<span class="card-docs">' + esc(c.meta.created) + '</span>';
    html += '</div></div>';
  });
  html += '</div>';
  return html;
}

function renderDetail(idx) {
  const c = CRM_DATA[idx];
  document.getElementById('breadcrumb-container').innerHTML =
    '<div class="breadcrumb"><a onclick="goDashboard()">All Contacts</a><span class="sep">\\u{203A}</span><span class="current">' + esc(c.meta.name) + '</span></div>';
  document.getElementById('stat-chip').textContent = '';

  let html = '<div class="detail-header">';
  html += '<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap"><div class="detail-name">' + esc(c.meta.name) + '</div>';
  html += '<span class="badge badge-' + esc(c.meta.status) + '">' + esc(STATUS_LABELS[c.meta.status] || c.meta.status) + '</span></div>';
  if (c.meta.company) html += '<div class="detail-company">' + esc(c.meta.company) + '</div>';

  const contactLinks = [];
  if (c.meta.email) contactLinks.push('<a href="mailto:' + esc(c.meta.email) + '">' + esc(c.meta.email) + '</a>');
  if (c.meta.phone) contactLinks.push('<a href="tel:' + esc(c.meta.phone) + '">' + esc(c.meta.phone) + '</a>');
  if (contactLinks.length) html += '<div class="detail-contact">' + contactLinks.join('') + '</div>';

  html += '<div class="detail-meta">';
  if (c.meta.industry) html += '<div class="detail-meta-item"><strong>Industry:</strong> ' + esc(c.meta.industry) + '</div>';
  if (c.meta.source) html += '<div class="detail-meta-item"><strong>Source:</strong> ' + esc(c.meta.source) + '</div>';
  if (c.meta.created) html += '<div class="detail-meta-item"><strong>Added:</strong> ' + esc(c.meta.created) + '</div>';
  html += '</div>';
  if (c.meta.notes) html += '<div class="detail-notes">' + esc(c.meta.notes) + '</div>';
  html += '</div>';

  // Documents (markdown)
  if (c.documents.length > 0) {
    html += '<div class="section-title">Documents</div><div class="doc-list">';
    c.documents.forEach((d, di) => {
      html += '<div class="doc-item" onclick="goDoc(' + idx + ',' + di + ')">';
      html += '<span class="doc-icon">' + fileIcon('.md') + '</span>';
      html += '<div class="doc-info"><div class="doc-title">' + esc(d.title) + '</div><div class="doc-filename">' + esc(d.filename) + '</div></div>';
      html += '<span class="doc-size">' + esc(d.size) + '</span>';
      html += '</div>';
    });
    html += '</div>';
  }

  // Files (everything else — all clickable now)
  if (c.files.length > 0) {
    html += '<div class="section-title">Files</div><div class="doc-list">';
    c.files.forEach((f, fi) => {
      html += '<div class="doc-item" onclick="goFile(' + idx + ',' + fi + ')">';
      html += '<span class="doc-icon">' + fileIcon(f.ext) + '</span>';
      html += '<div class="doc-info"><div class="doc-title">' + esc(f.title) + '</div><div class="doc-filename">' + esc(f.filename) + '</div></div>';
      html += '<span class="doc-size">' + esc(f.size) + '</span>';
      html += '</div>';
    });
    html += '</div>';
  }

  if (c.documents.length === 0 && c.files.length === 0) {
    html += '<div class="empty"><div class="empty-icon">\\u{1F4C2}</div><div class="empty-text">No documents yet</div></div>';
  }

  return html;
}

function renderDoc(cIdx, dIdx) {
  const c = CRM_DATA[cIdx];
  const d = c.documents[dIdx];
  document.getElementById('breadcrumb-container').innerHTML =
    '<div class="breadcrumb"><a onclick="goDashboard()">All Contacts</a><span class="sep">\\u{203A}</span><a onclick="goDetail(' + cIdx + ')">' + esc(c.meta.name) + '</a><span class="sep">\\u{203A}</span><span class="current">' + esc(d.title) + '</span></div>';
  document.getElementById('stat-chip').textContent = '';

  let html = '<div class="viewer-header"><div class="viewer-header-left">';
  html += '<div class="viewer-title">' + esc(d.title) + '</div>';
  html += '<div class="viewer-filename">' + esc(d.filename) + ' &middot; ' + esc(d.size) + '</div>';
  html += '</div></div>';

  let rendered = d.content;
  if (typeof marked !== 'undefined' && marked.parse) {
    try { rendered = marked.parse(d.content); } catch (e) { rendered = '<pre>' + esc(d.content) + '</pre>'; }
  } else {
    rendered = '<pre>' + esc(d.content) + '</pre>';
  }
  html += '<div class="viewer-content">' + rendered + '</div>';
  return html;
}

function renderFile(cIdx, fIdx) {
  const c = CRM_DATA[cIdx];
  const f = c.files[fIdx];
  document.getElementById('breadcrumb-container').innerHTML =
    '<div class="breadcrumb"><a onclick="goDashboard()">All Contacts</a><span class="sep">\\u{203A}</span><a onclick="goDetail(' + cIdx + ')">' + esc(c.meta.name) + '</a><span class="sep">\\u{203A}</span><span class="current">' + esc(f.title) + '</span></div>';
  document.getElementById('stat-chip').textContent = '';

  const filePath = encodeURI(f.path);

  let html = '<div class="viewer-header"><div class="viewer-header-left">';
  html += '<div class="viewer-title">' + esc(f.title) + '</div>';
  html += '<div class="viewer-filename">' + esc(f.filename) + ' &middot; ' + esc(f.size) + '</div>';
  html += '</div><div class="viewer-actions">';
  html += '<a href="' + filePath + '" target="_blank">Open in new tab \\u{2197}</a>';
  html += '</div></div>';

  // Render based on file type
  if (IMG_EXTS.includes(f.ext)) {
    html += '<div class="viewer-image"><img src="' + filePath + '" alt="' + esc(f.filename) + '" loading="lazy"></div>';
  } else if (f.ext === '.html') {
    html += '<iframe class="viewer-iframe" src="' + filePath + '" title="' + esc(f.filename) + '"></iframe>';
  } else if (f.ext === '.pdf') {
    html += '<iframe class="viewer-iframe" src="' + filePath + '" title="' + esc(f.filename) + '"></iframe>';
  } else if (f.ext === '.json' && f.content) {
    let formatted = f.content;
    try { formatted = JSON.stringify(JSON.parse(f.content), null, 2); } catch(e) {}
    html += '<div class="viewer-content"><pre><code>' + esc(formatted) + '</code></pre></div>';
  } else {
    html += '<div class="viewer-content" style="text-align:center;padding:60px"><p style="font-size:18px">This file type (' + esc(f.ext) + ') cannot be previewed inline.</p><p style="margin-top:12px"><a href="' + filePath + '" target="_blank" style="color:var(--blue)">Open in new tab \\u{2197}</a></p></div>';
  }
  return html;
}

function render() {
  const app = document.getElementById('app');
  switch (view) {
    case 'dashboard': app.innerHTML = renderDashboard(); break;
    case 'detail': app.innerHTML = renderDetail(contactIdx); break;
    case 'document': app.innerHTML = renderDoc(contactIdx, docIdx); break;
    case 'file': app.innerHTML = renderFile(contactIdx, fileIdx); break;
  }
  window.scrollTo(0, 0);
}

function goDashboard() { view = 'dashboard'; contactIdx = null; docIdx = null; fileIdx = null; render(); }
function goDetail(idx) { view = 'detail'; contactIdx = idx; docIdx = null; fileIdx = null; render(); }
function goDoc(cIdx, dIdx) { view = 'document'; contactIdx = cIdx; docIdx = dIdx; render(); }
function goFile(cIdx, fIdx) { view = 'file'; contactIdx = cIdx; fileIdx = fIdx; render(); }

function esc(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}

// Search
document.getElementById('search').addEventListener('input', function(e) {
  searchQuery = e.target.value;
  if (view === 'dashboard') render();
});

// Keyboard nav
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (view === 'document' || view === 'file') goDetail(contactIdx);
    else if (view === 'detail') goDashboard();
  }
});

// Init
render();
</script>
</body>
</html>`;
}
