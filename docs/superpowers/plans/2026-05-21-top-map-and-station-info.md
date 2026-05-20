# TOPページ 全体マップ＆駅情報追加 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `website/index.html` に Leaflet.js 全体マップと施設カード駅情報を追加する

**Architecture:** 単一ファイル（`index.html`）のみ変更。CSS・HTML・JS をすべてそのファイル内に記述する。Leaflet.js は CDN から読み込み、マップ初期化は `</body>` 直前の `<script>` ブロックで行う。

**Tech Stack:** Leaflet.js 1.9.4（CDN）、OpenStreetMap タイル、バニラ JS

---

## 変更ファイル

| ファイル | 変更内容 |
|---|---|
| `website/index.html` | Leaflet CDN 追加、CSS 追加、駅情報 HTML 追加、概要マップ HTML 追加、Leaflet 初期化スクリプト追加 |

---

## Task 1: Leaflet CDN を `<head>` に追加

**Files:**
- Modify: `website/index.html:10-11`（`<link rel="stylesheet" href="css/styles.css">` の直前）

- [ ] **Step 1: Leaflet の CSS と JS を挿入する**

`<link rel="stylesheet" href="css/styles.css">` の直前（現在の 11 行目）に以下を追加：

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

結果（11〜13行目）：
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<link rel="stylesheet" href="css/styles.css">
```

- [ ] **Step 2: ブラウザで index.html を開き、コンソールエラーがないか確認**

`F12` → Console タブ → Leaflet 関連のエラーがないこと（"L is not defined" 等が出ないこと）

---

## Task 2: CSS を `<style>` ブロックに追加

**Files:**
- Modify: `website/index.html`（`<style>` ブロック内の `.f-address` ルールと、`/* ===== RESPONSIVE =====` の直前）

- [ ] **Step 1: `.f-address` の `margin-bottom` を変更する**

現在（368〜375行目）：
```css
.f-address {
  font-size: 13px;
  color: var(--ink-mute);
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

変更後（`margin-bottom: 28px` → `6px`）：
```css
.f-address {
  font-size: 13px;
  color: var(--ink-mute);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

- [ ] **Step 2: `.f-station` と `#overview-map` の CSS を追加する**

`/* ===== RESPONSIVE =====` コメント（現在 759 行目付近）の直前に以下を挿入：

```css
/* ===== STATION INFO ===== */
.f-station {
  font-size: 12px;
  color: var(--ink-mute);
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 2px solid var(--pink-300);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.f-station-row {
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 1.6;
}
.f-station-row strong { color: var(--pink-600); font-weight: 700; }
.f-station-icon { flex-shrink: 0; font-style: normal; }

/* ===== OVERVIEW MAP ===== */
.overview-map-wrap {
  margin-bottom: 40px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}
#overview-map {
  height: 340px;
  width: 100%;
}
@media (max-width: 768px) {
  #overview-map { height: 220px; }
}
```

---

## Task 3: おゆみ野カードに駅情報を追加

**Files:**
- Modify: `website/index.html:847-848`（`.f-address` の閉じタグと `.f-divider` の間）

- [ ] **Step 1: `.f-station` を挿入する**

現在（844〜848行目）：
```html
          <div class="f-address">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            〒266-0005 千葉市緑区誉田町1-659-1
          </div>
          <div class="f-divider"></div>
```

変更後（`.f-address` と `.f-divider` の間に挿入）：
```html
          <div class="f-address">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            〒266-0005 千葉市緑区誉田町1-659-1
          </div>
          <div class="f-station">
            <div class="f-station-row">
              <span class="f-station-icon">🚃</span>
              <span>JR外房線「誉田」駅 <strong>車で約5分</strong></span>
            </div>
            <div class="f-station-row">
              <span class="f-station-icon">🚃</span>
              <span>JR外房線「鎌取」駅 <strong>車で約5分</strong></span>
            </div>
          </div>
          <div class="f-divider"></div>
```

- [ ] **Step 2: ブラウザで確認**

おゆみ野カードの住所下にピンクのボーダー付き駅情報が表示されること。「誉田」「鎌取」の強調テキストがピンク色になっていること。

---

## Task 4: ちはら台カードに駅情報を追加

**Files:**
- Modify: `website/index.html:872-873`（`.f-address` の閉じタグと `.f-divider` の間）

- [ ] **Step 1: `.f-station` を挿入する**

現在（869〜873行目）：
```html
          <div class="f-address">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            〒290-0141 千葉県市原市ちはら台東八丁目19番地7
          </div>
          <div class="f-divider"></div>
```

変更後：
```html
          <div class="f-address">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            〒290-0141 千葉県市原市ちはら台東八丁目19番地7
          </div>
          <div class="f-station">
            <div class="f-station-row">
              <span class="f-station-icon">🚃</span>
              <span>京成千原線「ちはら台」駅 <strong>車で約8分</strong></span>
            </div>
            <div class="f-station-row">
              <span class="f-station-icon">🚃</span>
              <span>JR外房線「誉田」駅 <strong>車で約8分</strong></span>
            </div>
          </div>
          <div class="f-divider"></div>
```

- [ ] **Step 2: 両カードの高さが揃っていること確認**

2つのカードの下端（ボタン位置）が横に揃って表示されること。

---

## Task 5: 全体マップの HTML を map-section に追加

**Files:**
- Modify: `website/index.html:895-896`（`sec-title` と `map-grid` の間）

- [ ] **Step 1: `overview-map-wrap` を挿入する**

現在（893〜896行目）：
```html
    <div class="sec-label">ACCESS</div>
    <div class="sec-title">施設へのアクセス</div>
    <div class="map-grid">
```

変更後：
```html
    <div class="sec-label">ACCESS</div>
    <div class="sec-title">施設へのアクセス</div>
    <div class="overview-map-wrap">
      <div id="overview-map"></div>
    </div>
    <div class="map-grid">
```

---

## Task 6: Leaflet 初期化スクリプトを追加

**Files:**
- Modify: `website/index.html`（`</body>` の直前）

- [ ] **Step 1: Leaflet 初期化スクリプトを挿入する**

`</body>` の直前（現在 1048 行目付近）に以下を追加：

```html
<script>
(function () {
  var map = L.map('overview-map');

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  function makeIcon(color) {
    return L.divIcon({
      className: '',
      html: '<div style="width:16px;height:16px;background:' + color + ';border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.28);"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -12]
    });
  }

  var oyumino = L.marker(
    [35.553588017736416, 140.19303115246873],
    { icon: makeIcon('#db2777') }
  ).addTo(map);
  oyumino.bindPopup(
    '<strong style="font-size:13px;">スマイルームおゆみ野</strong><br>' +
    '<span style="font-size:12px;color:#666;">〒266-0005 千葉市緑区誉田町1-659-1</span><br>' +
    '<a href="oyumino/" style="font-size:12px;color:#db2777;font-weight:700;">詳細を見る →</a>'
  );

  var chiharadai = L.marker(
    [35.54122598771486, 140.19911719112588],
    { icon: makeIcon('#888888') }
  ).addTo(map);
  chiharadai.bindPopup(
    '<strong style="font-size:13px;">スマイルームちはら台</strong><br>' +
    '<span style="font-size:12px;color:#666;">〒290-0141 千葉県市原市ちはら台東八丁目19番地7</span><br>' +
    '<a href="chiharadai/" style="font-size:12px;color:#888;font-weight:700;">詳細を見る →</a>'
  );

  var group = L.featureGroup([oyumino, chiharadai]);
  map.fitBounds(group.getBounds().pad(0.35));
})();
</script>
```

- [ ] **Step 2: ブラウザで確認する**

- MAP セクションにピンク（おゆみ野）とグレー（ちはら台）のマーカーが表示される
- 2施設が両方収まった状態でマップが表示される
- 各マーカーをクリックするとポップアップ（施設名・住所・リンク）が表示される
- 既存の個別 Google Maps iframes がその下に表示されること

---

## Task 7: 最終確認とコミット

- [ ] **Step 1: モバイル幅で確認する**

ブラウザの開発者ツールでモバイル幅（375px）に切り替え、以下を確認：
- 全体マップの高さが 220px になること
- 施設カードが 1 列表示になること
- 駅情報が正しく表示されること

- [ ] **Step 2: コミットする**

```bash
cd C:/Users/ISHIZAWA-PC2023/Desktop/Projects/smile-room-oyumino/website
git add index.html
git commit -m "feat: TOPページに全体マップ（Leaflet）と駅情報を追加"
```

- [ ] **Step 3: GitHub にプッシュする**

```bash
git push
```
