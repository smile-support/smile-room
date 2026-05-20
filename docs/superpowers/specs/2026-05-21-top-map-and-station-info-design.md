# TOPページ 全体マップ追加 & 施設カード駅情報追加 設計書

**日付**: 2026-05-21  
**対象ファイル**: `website/index.html`  
**ステータス**: 承認済み

---

## 概要

TOPページに2つの変更を加える。

1. **全体マップ**: Leaflet.js を使って2施設を1枚の地図に表示し、既存の個別マップの上に追加する
2. **駅情報**: 施設カード（`.f-card`）の住所直下に最寄り駅と車での所要時間を追加する

---

## 変更① 全体マップ（Leaflet.js）

### 配置

`map-section` 内、既存の `map-grid`（2列個別マップ）の**上**に新しい全体マップブロックを追加する。セクションタイトル・ラベルは既存のまま流用する。

### 実装方式

- **ライブラリ**: Leaflet.js 1.9.x（CDN）
- **タイル**: OpenStreetMap（APIキー不要・無料）
- **`<head>` に追加**:
  ```html
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  ```

### マーカー座標

> ⚠️ 以下は推定値。実装前に Google Maps で実際の住所をピンして緯度経度を確認すること。

| 施設 | 緯度（推定） | 経度（推定） |
|---|---|---|
| スマイルームおゆみ野 | 35.5685 | 140.1524 |
| スマイルームちはら台 | 35.5274 | 140.1648 |

### マーカーデザイン

SVG アイコンを使ったカスタムマーカー（`L.divIcon`）：

- **おゆみ野**: ピンク（サイトカラー `var(--pink-600)` = `oklch(0.56 0.150 25)` 相当 → `#c2185b`系）
- **ちはら台**: グレー（`#888`）
- 円形のピンスタイル（直径14px、白ボーダー2px、ドロップシャドウ）

### マップ設定

- **初期表示**: `map.fitBounds()` で2マーカーを収める（padding: 60px）
- **高さ**: `340px`（モバイルは `220px`）
- **操作**: ズーム・スクロール有効
- **属性表示**: OpenStreetMap のクレジット表示あり（Leaflet デフォルト）

### ポップアップ

マーカークリックで表示。内容：
```
施設名（太字）
住所
[詳細を見る →]（リンク）
```

### HTML 構造

```html
<!-- 全体マップ -->
<div class="overview-map-wrap">
  <div id="overview-map"></div>
</div>
<!-- 既存の個別マップ（そのまま） -->
<div class="map-grid">
  ...
</div>
```

### CSS

```css
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

## 変更② 施設カードへの駅情報追加

### 対象

`section.facilities` 内の `.f-card` × 2枚（おゆみ野・ちはら台）

### 配置

`.f-address`（住所）の直後、`.f-divider` の前に挿入。

### 表示内容

**おゆみ野**:
- 🚃 JR外房線「誉田」駅 車で約5分
- 🚃 JR外房線「鎌取」駅 車で約5分

**ちはら台**:
- 🚃 京成千原線「ちはら台」駅 車で約8分
- 🚃 JR外房線「誉田」駅 車で約8分

### デザイン

ピンクの左ボーダー（2px）で住所と駅情報を視覚的にまとめる。

```html
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
```

### CSS

現在 `.f-address` に `margin-bottom: 28px` が設定されている。`.f-station` を挟む場合は `.f-address` の下余白を `6px` に縮小し、`.f-station` 側で `.f-divider` との間隔（`margin-bottom: 20px`）を持つ。

```css
.f-address { margin-bottom: 6px; } /* .f-station がある場合の上書き（同一セレクタに追記） */

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
.f-station-row strong {
  color: var(--pink-600);
  font-weight: 700;
}
.f-station-icon { flex-shrink: 0; }
```

---

## 実装範囲

- 編集ファイル: `website/index.html` のみ
- 新規ファイルなし
- 外部依存: Leaflet.js CDN（`unpkg.com`）

## 実装順序

1. `<head>` に Leaflet CSS/JS を追加
2. `.f-station` CSS をスタイルブロックに追加
3. おゆみ野カードに `.f-station` を挿入
4. ちはら台カードに `.f-station` を挿入
5. `map-section` に `overview-map-wrap` と `#overview-map` を追加
6. `<script>` で Leaflet マップを初期化
