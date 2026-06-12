# スマイルームウェブサイト ブラッシュアップ 実装プラン

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** SEO修正・UI/UX改善・新機能追加によりスマイルームウェブサイトを全面ブラッシュアップする

**Architecture:** トップページ（index.html）は独立したスタンドアローンHTML。おゆみ野サブページは js/shared.js 経由で共通ヘッダー/フッター/アニメーションを管理。ちはら台サブページは chiharadai/shared-ch.js が同様に担当。新機能（シミュレーター・診断・資料DL）はインラインJSで実装しサーバー不要にする。

**Tech Stack:** バニラHTML/CSS/JS（外部依存なし）、IntersectionObserver API、localStorage

---

## ファイルマップ

| 変更種別 | ファイル | 内容 |
|---|---|---|
| 修正 | `oyumino/index.html` | meta description・JSON-LD の価格・URL 更新 |
| 修正 | `index.html` | ヘッダーTEL・空室バッジ・おすすめバッジ・フッターTEL・カウントアップ・スクロールアニメ・施設診断 |
| 修正 | `oyumino/pricing.html` | 月額シミュレーター追加 |
| 修正 | `chiharadai/pricing.html` | 月額シミュレーター追加 |
| 修正 | 各サブページ（oyumino/*, chiharadai/*） | `data-breadcrumb` 属性追加（shared.js は対応済み） |
| 新規 | `oyumino/brochure.html` | 資料ダウンロードページ |
| 新規 | `chiharadai/brochure.html` | 資料ダウンロードページ |

---

## Task 1: SEO修正（oyumino/index.html）

**Files:**
- Modify: `oyumino/index.html` 行 7（meta description）
- Modify: `oyumino/index.html` 行 12-31（JSON-LD）

- [ ] **Step 1: meta description の価格を修正する**

`oyumino/index.html` 7行目の meta description を変更：

```html
<!-- 変更前 -->
<meta name="description" content="千葉市緑区誉田町の高齢者対応賃貸住宅。月額59,800円〜（家賃・管理費込み）で年金で暮らせる価格帯。全室個室・24時間見守り・車椅子対応浴室完備。介護施設ではなく、自分らしく暮らせる賃貸住宅です。見学受付中。">

<!-- 変更後 -->
<meta name="description" content="千葉市緑区誉田町の高齢者対応賃貸住宅。月額102,000円〜（食費込み）。全室個室・24時間見守り・車椅子対応浴室完備。介護施設ではなく、自分らしく暮らせる賃貸住宅です。見学受付中。">
```

- [ ] **Step 2: JSON-LD の価格・URL を修正する**

`oyumino/index.html` の `<script type="application/ld+json">` ブロックを置換：

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "スマイルームおゆみ野",
  "description": "千葉市緑区誉田町の高齢者対応賃貸住宅。月額102,000円〜（食費込み）。",
  "telephone": "043-310-7467",
  "url": "https://smile-room-group.github.io/smile-room/oyumino/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "誉田町1-659-1",
    "addressLocality": "千葉市緑区",
    "addressRegion": "千葉県",
    "postalCode": "266-0005",
    "addressCountry": "JP"
  },
  "priceRange": "¥102,000〜/月",
  "openingHours": "Mo-Su 09:00-18:00"
}
```

- [ ] **Step 3: コミット**

```bash
git add oyumino/index.html
git commit -m "fix: meta description・JSON-LDの価格・URLを最新に修正"
```

---

## Task 2: トップページ（index.html）— ヘッダーTEL追加

**Files:**
- Modify: `index.html` — `.header-actions` 内に電話番号リンクを追加

- [ ] **Step 1: ヘッダーに電話番号を追加する**

`index.html` の `.header-actions` div を下記に差し替え：

```html
<div class="header-actions">
  <a href="tel:0433107467" class="header-tel" style="display:none;" id="header-tel-oyumino">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    <span class="tel-label">おゆみ野</span> 043-310-7467
  </a>
  <a href="tel:0436633618" class="header-tel" style="display:none;" id="header-tel-chiharadai">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    <span class="tel-label">ちはら台</span> 0436-63-3618
  </a>
  <a href="oyumino/contact.html" class="header-btn">見学予約</a>
</div>
```

ヘッダースタイルブロックに追記（`.top-header` セクション内）：

```css
.header-tel {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}
.header-tel:hover { color: var(--pink-600); }
.header-tel .tel-label {
  font-size: 10px;
  background: var(--pink-50, oklch(0.98 0.01 15));
  color: var(--pink-600);
  padding: 1px 6px;
  border-radius: 4px;
}
@media (max-width: 768px) { .header-tel { display: none !important; } }
```

スクロール連動でヘッダー電話番号を表示するスクリプトを `</script>` の直前に追記（既存のSVGピンスクリプトと同じブロックで可）：

```js
/* ヘッダー: スクロール後に電話番号表示 */
(function() {
  var shown = false;
  window.addEventListener('scroll', function() {
    if (!shown && window.scrollY > 200) {
      shown = true;
      document.getElementById('header-tel-oyumino').style.display = 'flex';
      document.getElementById('header-tel-chiharadai').style.display = 'flex';
    }
  });
})();
```

- [ ] **Step 2: コミット**

```bash
git add index.html
git commit -m "feat: トップページヘッダーにスクロール後TEL表示を追加"
```

---

## Task 3: トップページ — 施設カードに空室バッジ・おすすめバッジ・フッターTEL

**Files:**
- Modify: `index.html` — 施設カード・比較テーブル・フッター

- [ ] **Step 1: 施設カードのステータスバッジを強化する**

`index.html` の 2 か所ある `.f-status.open` を置換：

おゆみ野カード（1 か所目）：
```html
<!-- 変更前 -->
<div class="f-status open">入居受付中</div>

<!-- 変更後（おゆみ野） -->
<div class="f-status open">
  <span>入居受付中</span>
  <span class="f-vacancy">空室あり</span>
</div>
```

ちはら台カード（2 か所目）も同様に置換：
```html
<div class="f-status open">
  <span>入居受付中</span>
  <span class="f-vacancy">空室あり</span>
</div>
```

スタイルに追記：
```css
.f-vacancy {
  background: oklch(0.93 0.06 145 / 0.22);
  color: oklch(0.35 0.13 145);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 100px;
  margin-left: 6px;
}
```

- [ ] **Step 2: 比較テーブルにおすすめバッジを追加する**

`index.html` の比較テーブル thead を置換（ちはら台を「対象が広い」でおすすめに）：

```html
<thead>
  <tr>
    <th></th>
    <th class="th-pink">おゆみ野</th>
    <th class="th-blue">
      ちはら台
      <span style="display:block;font-size:11px;font-weight:600;margin-top:4px;background:oklch(0.93 0.06 145);color:oklch(0.35 0.13 145);border-radius:100px;padding:2px 10px;">✓ 対象が広い</span>
    </th>
  </tr>
</thead>
```

- [ ] **Step 3: フッターにちはら台電話番号を追加する**

`index.html` の `.footer-addr` の直後、フッター1カラム目に追記：

```html
<!-- 変更前 -->
<div class="footer-addr">
  〒266-0005 千葉県千葉市緑区誉田町1-659-1<br>
  運営：株式会社カイゴマン<br>
  TEL：<a href="tel:0433107467" style="color:inherit;">043-310-7467</a>
</div>

<!-- 変更後 -->
<div class="footer-addr">
  運営：株式会社カイゴマン<br>
  <strong style="font-size:13px;color:var(--pink-600);">おゆみ野</strong>
  〒266-0005 千葉県千葉市緑区誉田町1-659-1<br>
  TEL：<a href="tel:0433107467" style="color:inherit;">043-310-7467</a><br>
  <strong style="font-size:13px;color:oklch(0.470 0.092 225);">ちはら台</strong>
  〒290-0141 千葉県市原市ちはら台東八丁目19番地7<br>
  TEL：<a href="tel:0436633618" style="color:inherit;">0436-63-3618</a>
</div>
```

- [ ] **Step 4: コミット**

```bash
git add index.html
git commit -m "feat: 空室バッジ・比較おすすめバッジ・フッターちはら台TEL追加"
```

---

## Task 4: トップページ — カウントアップアニメーション・スクロールアニメ統一

**Files:**
- Modify: `index.html` — `<script>` ブロックに追記

- [ ] **Step 1: カウントアップ関数を追加する**

`index.html` の既存 `<script>` ブロック内（`renderPins` 関数の後）に追記：

```js
/* カウントアップアニメーション */
(function() {
  function countUp(el, target, duration) {
    var start = 0;
    var step = target / (duration / 16);
    var current = 0;
    var timer = setInterval(function() {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      var targets = { '77': 77, '24': 24, '0': 0 };
      var numEl = e.target.querySelector('.stat-num-val');
      if (!numEl) return;
      var val = parseInt(numEl.dataset.target, 10);
      countUp(numEl, val, 1200);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item').forEach(function(el) { io.observe(el); });
})();

/* スクロールフェードイン（トップページ） */
(function() {
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      var delay = e.target.dataset.delay ? parseInt(e.target.dataset.delay) * 100 : 0;
      setTimeout(function() { e.target.classList.add('in'); }, delay);
      io.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
})();
```

- [ ] **Step 2: stat-num の HTML 構造を更新する**

`index.html` の 3 つの `.stat-num` を下記パターンに更新：

```html
<!-- おゆみ野 77室 -->
<div class="stat-num"><span class="stat-num-val" data-target="77">77</span><small>室</small></div>

<!-- 24h -->
<div class="stat-num"><span class="stat-num-val" data-target="24">24</span><small>h</small></div>

<!-- 0円 -->
<div class="stat-num"><span class="stat-num-val" data-target="0">0</span><small>円</small></div>
```

CSS にスクロールアニメ用スタイルを追記（既存 `<style>` ブロック内）：

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.reveal.in {
  opacity: 1;
  transform: none;
}
```

- [ ] **Step 3: コミット**

```bash
git add index.html
git commit -m "feat: statsカウントアップ・スクロールフェードイン追加"
```

---

## Task 5: トップページ — 施設診断ウィジェット

**Files:**
- Modify: `index.html` — compare セクションの直前に診断セクションを挿入

- [ ] **Step 1: 診断セクションのHTMLを追加する**

`index.html` の `<!-- COMPARE -->` コメントの直前に下記を挿入：

```html
<!-- QUIZ -->
<section class="quiz-section">
  <div class="wrap">
    <div class="sec-label">FIND YOUR FIT</div>
    <div class="sec-title" style="margin-bottom:28px;">3つの質問で<br>あなたに合う施設を見つけよう</div>

    <div class="quiz-card" id="quiz">
      <div class="quiz-step" id="q1">
        <div class="quiz-q">Q1. 今のお住まいのエリアは？</div>
        <div class="quiz-opts">
          <button class="quiz-btn" onclick="quizNext('q1','oyumino')">千葉市緑区・若葉区<br><span>誉田・鎌取エリア</span></button>
          <button class="quiz-btn" onclick="quizNext('q1','chiharadai')">市原市・千葉市中央区<br><span>ちはら台・五井エリア</span></button>
          <button class="quiz-btn" onclick="quizNext('q1','both')">どちらでもない・わからない</button>
        </div>
      </div>

      <div class="quiz-step" id="q2" style="display:none;">
        <div class="quiz-q">Q2. 介護認定の状況は？</div>
        <div class="quiz-opts">
          <button class="quiz-btn" onclick="quizNext('q2','oyumino')">要介護1〜4の認定あり</button>
          <button class="quiz-btn" onclick="quizNext('q2','chiharadai')">自立・要支援、または要介護5</button>
          <button class="quiz-btn" onclick="quizNext('q2','both')">まだ認定を受けていない</button>
        </div>
      </div>

      <div class="quiz-step" id="q3" style="display:none;">
        <div class="quiz-q">Q3. 食事へのご希望は？</div>
        <div class="quiz-opts">
          <button class="quiz-btn" onclick="quizNext('q3','oyumino')">月ごとに自由に選びたい</button>
          <button class="quiz-btn" onclick="quizNext('q3','chiharadai')">3食込みで月額を固定したい</button>
          <button class="quiz-btn" onclick="quizNext('q3','both')">どちらでもよい</button>
        </div>
      </div>

      <div class="quiz-result" id="qresult" style="display:none;">
        <div class="quiz-result-inner" id="qresult-inner"></div>
        <button class="quiz-reset" onclick="quizReset()">もう一度やり直す</button>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: 診断ウィジェットのCSSを追加する**

既存 `<style>` ブロックに追記：

```css
/* ===== QUIZ ===== */
.quiz-section {
  padding: clamp(64px, 9vw, 100px) 0;
  background: var(--bg);
}
.quiz-card {
  background: var(--card);
  border-radius: 28px;
  box-shadow: var(--shadow-lg);
  padding: 48px 44px;
  max-width: 680px;
  margin: 0 auto;
}
.quiz-q {
  font-family: "Zen Maru Gothic", sans-serif;
  font-weight: 700;
  font-size: clamp(18px, 2.5vw, 22px);
  color: var(--ink);
  margin-bottom: 28px;
  text-align: center;
}
.quiz-opts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.quiz-btn {
  background: var(--bg-warm, oklch(0.98 0.008 40));
  border: 1.5px solid var(--line, oklch(0.88 0.015 40));
  border-radius: 16px;
  padding: 16px 22px;
  font-family: "Zen Maru Gothic", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  cursor: pointer;
  text-align: left;
  transition: all .2s;
  line-height: 1.5;
}
.quiz-btn span { display: block; font-size: 13px; font-weight: 500; color: var(--ink-soft, oklch(0.55 0.02 40)); margin-top: 3px; }
.quiz-btn:hover {
  background: var(--pink-50, oklch(0.98 0.01 15));
  border-color: var(--pink-300, oklch(0.78 0.07 15));
  transform: translateX(4px);
}
.quiz-result {
  text-align: center;
}
.quiz-result-inner {
  padding: 32px 0 24px;
}
.quiz-result-inner .result-label {
  font-size: 13px;
  color: var(--ink-mute, oklch(0.65 0.015 40));
  margin-bottom: 8px;
  letter-spacing: 0.1em;
}
.quiz-result-inner .result-name {
  font-family: "Zen Maru Gothic", sans-serif;
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 900;
  margin-bottom: 12px;
}
.quiz-result-inner .result-desc {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.8;
  margin-bottom: 28px;
}
.quiz-result-inner .result-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 36px;
  border-radius: 100px;
  font-family: "Zen Maru Gothic", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  text-decoration: none;
  transition: opacity .2s;
}
.quiz-result-inner .result-btn:hover { opacity: .88; }
.quiz-reset {
  background: none;
  border: none;
  font-size: 13px;
  color: var(--ink-mute);
  cursor: pointer;
  text-decoration: underline;
  margin-top: 12px;
}
@media (max-width: 600px) {
  .quiz-card { padding: 32px 20px; }
}
```

- [ ] **Step 3: 診断ロジックのJSを追加する**

既存 `<script>` ブロックに追記：

```js
/* 施設診断 */
(function() {
  var scores = { oyumino: 0, chiharadai: 0 };
  var currentStep = 'q1';
  var steps = ['q1', 'q2', 'q3'];

  window.quizNext = function(step, choice) {
    if (choice === 'oyumino') scores.oyumino++;
    else if (choice === 'chiharadai') scores.chiharadai++;
    else { scores.oyumino += 0.5; scores.chiharadai += 0.5; }

    document.getElementById(step).style.display = 'none';
    var nextIdx = steps.indexOf(step) + 1;
    if (nextIdx < steps.length) {
      currentStep = steps[nextIdx];
      document.getElementById(currentStep).style.display = 'block';
    } else {
      showResult();
    }
  };

  window.quizReset = function() {
    scores = { oyumino: 0, chiharadai: 0 };
    currentStep = 'q1';
    steps.forEach(function(s) { document.getElementById(s).style.display = 'none'; });
    document.getElementById('qresult').style.display = 'none';
    document.getElementById('q1').style.display = 'block';
  };

  function showResult() {
    var isOyumino = scores.oyumino >= scores.chiharadai;
    var name = isOyumino ? 'スマイルームおゆみ野' : 'スマイルームちはら台';
    var color = isOyumino ? 'var(--pink-600)' : 'oklch(0.470 0.092 225)';
    var href = isOyumino ? 'oyumino/' : 'chiharadai/';
    var desc = isOyumino
      ? '千葉市緑区エリアで、食事を月ごとに自由に選べる住まいです。リフト付き個浴と充実した設備で、要介護1〜4の方にとくにおすすめです。'
      : '市原市エリアで、3食込み月額定額のシンプルな暮らし。自立〜要介護5まで幅広く対応し、定員46名の充実した空間です。';
    var inner = document.getElementById('qresult-inner');
    inner.innerHTML =
      '<div class="result-label">あなたにおすすめの施設</div>' +
      '<div class="result-name" style="color:' + color + ';">' + name + '</div>' +
      '<div class="result-desc">' + desc + '</div>' +
      '<a href="' + href + '" class="result-btn" style="background:' + color + ';">詳しく見る →</a>';
    document.getElementById('qresult').style.display = 'block';
  }
})();
```

- [ ] **Step 4: コミット**

```bash
git add index.html
git commit -m "feat: 施設診断ウィジェット追加（3問でおゆみ野/ちはら台を提案）"
```

---

## Task 6: おゆみ野 pricing.html — 月額シミュレーター

**Files:**
- Modify: `oyumino/pricing.html` — 料金セクションの後にシミュレーターを追記

- [ ] **Step 1: シミュレーターHTMLを料金ページの最終セクション直前に追加する**

`oyumino/pricing.html` の `<div data-site-footer>` の直前に追記：

```html
<!-- ========== シミュレーター ========== -->
<section class="section" id="simulator" style="background:var(--bg-warm);">
  <div class="container">
    <div class="reveal" style="max-width:720px;">
      <span class="eyebrow">SIMULATOR <span class="jp">／ 月額かんたんシミュレーター</span></span>
      <h2 class="section-title">毎月いくらかかる？<br>かんたん3ステップで確認。</h2>
    </div>

    <div class="sim-card reveal">
      <div class="sim-row">
        <label class="sim-label">居室タイプ</label>
        <div class="sim-opts" id="sim-type">
          <button class="sim-opt active" data-val="102000" onclick="simSelect(this,'sim-type')">Aタイプ<small>102,000円</small></button>
          <button class="sim-opt" data-val="105000" onclick="simSelect(this,'sim-type')">Bタイプ<small>105,000円</small></button>
        </div>
      </div>

      <div class="sim-row">
        <label class="sim-label">お食事</label>
        <div class="sim-opts" id="sim-meal">
          <button class="sim-opt active" data-val="0" onclick="simSelect(this,'sim-meal')">込み（月額に含む）<small>+0円</small></button>
          <button class="sim-opt" data-val="-43000" onclick="simSelect(this,'sim-meal')">食事なし<small>-43,000円</small></button>
        </div>
      </div>

      <div class="sim-row">
        <label class="sim-label">介護サービス（目安）</label>
        <div class="sim-opts" id="sim-care">
          <button class="sim-opt active" data-val="0" onclick="simSelect(this,'sim-care')">利用しない<small>+0円</small></button>
          <button class="sim-opt" data-val="15000" onclick="simSelect(this,'sim-care')">軽め（週2〜3回）<small>+約15,000円</small></button>
          <button class="sim-opt" data-val="30000" onclick="simSelect(this,'sim-care')">しっかり（毎日）<small>+約30,000円</small></button>
        </div>
      </div>

      <div class="sim-result">
        <div class="sim-result-label">概算月額（税込）</div>
        <div class="sim-result-num" id="sim-total">102,000<span>円</span></div>
        <div class="sim-result-note">※ 介護サービスは介護保険自己負担分（1〜3割）の目安です。実際の金額はケアマネージャーにご確認ください。</div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: シミュレーターのCSSを追加する**

`oyumino/pricing.html` の `<style>` ブロックに追記：

```css
.sim-card {
  background: var(--card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--line-soft);
  padding: 40px 44px;
  max-width: 760px;
  margin-top: 40px;
}
.sim-row { margin-bottom: 28px; }
.sim-label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--ink-soft);
  margin-bottom: 10px;
}
.sim-opts { display: flex; gap: 10px; flex-wrap: wrap; }
.sim-opt {
  background: var(--bg-warm);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 12px 18px;
  font-family: "Zen Maru Gothic", sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  transition: all .2s;
  color: var(--ink);
}
.sim-opt small { font-size: 12px; font-weight: 500; color: var(--ink-mute); }
.sim-opt.active {
  background: var(--pink-50, oklch(0.98 0.01 15));
  border-color: var(--pink-400, oklch(0.72 0.10 15));
  color: var(--pink-600);
}
.sim-opt.active small { color: var(--pink-500); }
.sim-result {
  border-top: 1px dashed var(--line);
  padding-top: 28px;
  text-align: center;
}
.sim-result-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--pink-500);
  margin-bottom: 8px;
}
.sim-result-num {
  font-family: "Zen Maru Gothic", sans-serif;
  font-size: clamp(42px, 7vw, 64px);
  font-weight: 900;
  color: var(--pink-600);
  line-height: 1;
  margin-bottom: 12px;
}
.sim-result-num span { font-size: .35em; }
.sim-result-note { font-size: 12px; color: var(--ink-mute); line-height: 1.7; }
@media (max-width: 600px) { .sim-card { padding: 28px 20px; } }
```

- [ ] **Step 3: シミュレーターのJSを追加する**

`oyumino/pricing.html` の `<script src="../js/shared.js">` の直前に追記：

```html
<script>
function simSelect(btn, groupId) {
  var group = document.getElementById(groupId);
  group.querySelectorAll('.sim-opt').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  simCalc();
}
function simCalc() {
  var base = parseInt(document.querySelector('#sim-type .sim-opt.active').dataset.val, 10);
  var meal = parseInt(document.querySelector('#sim-meal .sim-opt.active').dataset.val, 10);
  var care = parseInt(document.querySelector('#sim-care .sim-opt.active').dataset.val, 10);
  var total = base + meal + care;
  document.getElementById('sim-total').innerHTML = total.toLocaleString() + '<span>円</span>';
}
</script>
```

- [ ] **Step 4: コミット**

```bash
git add oyumino/pricing.html
git commit -m "feat: おゆみ野 pricing - 月額かんたんシミュレーター追加"
```

---

## Task 7: ちはら台 pricing.html — 月額シミュレーター

**Files:**
- Modify: `chiharadai/pricing.html` — Task 6 と同パターン、金額のみ変更

- [ ] **Step 1: ちはら台シミュレーターHTMLを追加する**

`chiharadai/pricing.html` の `<div data-site-footer>` の直前に追記（Task 6 と同構造、数値だけ変更）：

```html
<!-- ========== シミュレーター ========== -->
<section class="section" id="simulator" style="background:var(--bg-warm);">
  <div class="container">
    <div class="reveal" style="max-width:720px;">
      <span class="eyebrow">SIMULATOR <span class="jp">／ 月額かんたんシミュレーター</span></span>
      <h2 class="section-title">毎月いくらかかる？<br>かんたん2ステップで確認。</h2>
    </div>

    <div class="sim-card reveal">
      <div class="sim-row">
        <label class="sim-label">月額（3食込み・定額）</label>
        <div class="sim-opts">
          <button class="sim-opt active" style="cursor:default;">定額プラン<small>103,000円／月</small></button>
        </div>
      </div>

      <div class="sim-row">
        <label class="sim-label">介護サービス（目安）</label>
        <div class="sim-opts" id="sim-care-ch">
          <button class="sim-opt active" data-val="0" onclick="simSelectCh(this,'sim-care-ch')">利用しない<small>+0円</small></button>
          <button class="sim-opt" data-val="15000" onclick="simSelectCh(this,'sim-care-ch')">軽め（週2〜3回）<small>+約15,000円</small></button>
          <button class="sim-opt" data-val="30000" onclick="simSelectCh(this,'sim-care-ch')">しっかり（毎日）<small>+約30,000円</small></button>
        </div>
      </div>

      <div class="sim-result">
        <div class="sim-result-label">概算月額（税込）</div>
        <div class="sim-result-num" id="sim-total-ch">103,000<span>円</span></div>
        <div class="sim-result-note">※ 介護サービスは介護保険自己負担分（1〜3割）の目安です。実際の金額はケアマネージャーにご確認ください。</div>
      </div>
    </div>
  </div>
</section>
```

Task 6 と同じ CSS も `chiharadai/pricing.html` の `<style>` に追記。

- [ ] **Step 2: JSを追加する**

`chiharadai/pricing.html` の `<script src="shared-ch.js">` の直前に追記：

```html
<script>
function simSelectCh(btn, groupId) {
  var group = document.getElementById(groupId);
  group.querySelectorAll('.sim-opt').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  simCalcCh();
}
function simCalcCh() {
  var care = parseInt(document.querySelector('#sim-care-ch .sim-opt.active').dataset.val, 10);
  var total = 103000 + care;
  document.getElementById('sim-total-ch').innerHTML = total.toLocaleString() + '<span>円</span>';
}
</script>
```

- [ ] **Step 3: コミット**

```bash
git add chiharadai/pricing.html
git commit -m "feat: ちはら台 pricing - 月額かんたんシミュレーター追加"
```

---

## Task 8: パンくずリスト — 各サブページに data-breadcrumb 属性追加

**Files:**
- Modify: `oyumino/facilities.html`, `oyumino/pricing.html`, `oyumino/access.html`, `oyumino/flow.html`, `oyumino/lifestyle.html`, `oyumino/contact.html`, `oyumino/news.html`, `oyumino/faq.html`
- Modify: `chiharadai/index.html`, `chiharadai/facilities.html`, `chiharadai/pricing.html`, `chiharadai/access.html`, `chiharadai/flow.html`, `chiharadai/lifestyle.html`, `chiharadai/contact.html`, `chiharadai/news.html`, `chiharadai/faq.html`

注意: shared.js と shared-ch.js は既に `setupBreadcrumb()` を実装済み。`<body>` タグに `data-breadcrumb='["ページ名"]'` を追加するだけでよい。

- [ ] **Step 1: おゆみ野サブページに data-breadcrumb を追加する**

各ファイルの `<body` タグを以下のように変更：

| ファイル | body タグ |
|---|---|
| `oyumino/facilities.html` | `<body data-breadcrumb='["施設・設備"]'>` |
| `oyumino/pricing.html` | `<body data-breadcrumb='["料金プラン"]'>` |
| `oyumino/access.html` | `<body data-breadcrumb='["アクセス・周辺"]'>` |
| `oyumino/flow.html` | `<body data-breadcrumb='["入居の流れ"]'>` |
| `oyumino/lifestyle.html` | `<body data-breadcrumb='["一日の暮らし"]'>` |
| `oyumino/contact.html` | `<body data-breadcrumb='["お問い合わせ"]'>` |
| `oyumino/news.html` | `<body data-breadcrumb='["お知らせ"]'>` |
| `oyumino/faq.html` | `<body data-breadcrumb='["よくある質問"]'>` |

- [ ] **Step 2: ちはら台サブページに data-breadcrumb を追加する**

| ファイル | body タグ |
|---|---|
| `chiharadai/index.html` | `<body data-breadcrumb='["ちはら台"]'>` |
| `chiharadai/facilities.html` | `<body data-breadcrumb='["施設・設備"]'>` |
| `chiharadai/pricing.html` | `<body data-breadcrumb='["料金プラン"]'>` |
| `chiharadai/access.html` | `<body data-breadcrumb='["アクセス・周辺"]'>` |
| `chiharadai/flow.html` | `<body data-breadcrumb='["入居の流れ"]'>` |
| `chiharadai/lifestyle.html` | `<body data-breadcrumb='["一日の暮らし"]'>` |
| `chiharadai/contact.html` | `<body data-breadcrumb='["お問い合わせ"]'>` |
| `chiharadai/news.html` | `<body data-breadcrumb='["お知らせ"]'>` |
| `chiharadai/faq.html` | `<body data-breadcrumb='["よくある質問"]'>` |

- [ ] **Step 3: コミット**

```bash
git add oyumino/ chiharadai/
git commit -m "feat: 全サブページにパンくずリスト（data-breadcrumb）追加"
```

---

## Task 9: 資料ダウンロードページ（oyumino/brochure.html）

**Files:**
- Create: `oyumino/brochure.html`

- [ ] **Step 1: おゆみ野の資料ダウンロードページを作成する**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>資料ダウンロード｜スマイルームおゆみ野</title>
<meta name="description" content="スマイルームおゆみ野の施設案内資料をダウンロードいただけます。料金・設備・入居条件など詳しい情報をまとめています。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/styles.css">
<style>
.brochure-hero {
  padding: clamp(60px,8vw,100px) 0 clamp(48px,7vw,80px);
  background: radial-gradient(60% 70% at 80% 10%, oklch(0.94 0.05 25), transparent 70%), var(--bg);
}
.brochure-card {
  background: var(--card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--line-soft);
  padding: 48px 52px;
  max-width: 640px;
  margin: 48px auto 0;
  box-shadow: var(--shadow-lg);
}
.form-group { margin-bottom: 22px; }
.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-soft);
  margin-bottom: 7px;
  letter-spacing: 0.06em;
}
.form-group label .req {
  color: var(--pink-600);
  margin-left: 4px;
  font-size: 11px;
}
.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  font-size: 16px;
  font-family: "Noto Sans JP", sans-serif;
  background: var(--bg);
  color: var(--ink);
  transition: border-color .15s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none;
  border-color: var(--pink-400);
}
.form-group textarea { height: 100px; resize: vertical; }
.form-submit {
  background: var(--pink-600);
  color: #fff;
  font-family: "Zen Maru Gothic", sans-serif;
  font-weight: 700;
  font-size: 18px;
  padding: 18px 40px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  width: 100%;
  margin-top: 8px;
  box-shadow: 0 6px 20px oklch(0.50 0.115 14 / 0.3);
  transition: opacity .2s, transform .2s;
}
.form-submit:hover { opacity: .88; transform: translateY(-2px); }
.brochure-note {
  font-size: 13px;
  color: var(--ink-mute);
  text-align: center;
  margin-top: 16px;
  line-height: 1.7;
}
.brochure-thanks {
  display: none;
  text-align: center;
  padding: 40px 0;
}
.brochure-thanks h3 {
  font-family: "Zen Maru Gothic", sans-serif;
  font-size: 24px;
  color: var(--pink-600);
  margin-bottom: 12px;
}
@media (max-width: 600px) { .brochure-card { padding: 32px 20px; } }
</style>
</head>
<body data-breadcrumb='["資料ダウンロード"]'>
<div data-site-header></div>

<section class="brochure-hero">
  <div class="container">
    <div class="reveal" style="max-width:640px;margin:0 auto;text-align:center;">
      <span class="eyebrow">BROCHURE <span class="jp">／ 資料ダウンロード</span></span>
      <h1 class="section-title" style="margin-bottom:16px;">施設案内資料を<br>無料でお送りします。</h1>
      <p class="section-lede">料金・設備・入居条件など、詳しい内容をまとめた資料をご用意しています。<br>お名前とメールアドレスをご入力ください。</p>
    </div>

    <div class="brochure-card reveal">
      <form id="brochure-form" onsubmit="brochureSubmit(event)">
        <div class="form-group">
          <label>お名前<span class="req">必須</span></label>
          <input type="text" name="name" placeholder="山田 花子" required>
        </div>
        <div class="form-group">
          <label>メールアドレス<span class="req">必須</span></label>
          <input type="email" name="email" placeholder="example@email.com" required>
        </div>
        <div class="form-group">
          <label>お電話番号</label>
          <input type="tel" name="tel" placeholder="090-0000-0000">
        </div>
        <div class="form-group">
          <label>ご関心の理由</label>
          <select name="reason">
            <option value="">-- 選択してください --</option>
            <option>本人の住まいを探している</option>
            <option>家族の住まいを探している</option>
            <option>ケアマネジャーとして情報収集</option>
            <option>その他</option>
          </select>
        </div>
        <div class="form-group">
          <label>ご質問・ご要望</label>
          <textarea name="message" placeholder="例：空室状況を教えてください"></textarea>
        </div>
        <button type="submit" class="form-submit">資料を請求する</button>
        <p class="brochure-note">送信後、担当者よりメールにてご連絡いたします。<br>営業時間内（9:00〜18:00）にご対応します。</p>
      </form>

      <div class="brochure-thanks" id="brochure-thanks">
        <h3>ありがとうございます！</h3>
        <p style="color:var(--ink-soft);line-height:1.8;margin-bottom:24px;">
          資料請求を受け付けました。<br>
          担当者より、メールにてご連絡いたします。<br>
          お急ぎの場合は <a href="tel:0433107467" style="color:var(--pink-600);font-weight:700;">043-310-7467</a> にお電話ください。
        </p>
        <a href="index.html" class="btn btn-secondary">おゆみ野トップページへ</a>
      </div>
    </div>
  </div>
</section>

<div data-site-footer></div>
<script>
function brochureSubmit(e) {
  e.preventDefault();
  document.getElementById('brochure-form').style.display = 'none';
  document.getElementById('brochure-thanks').style.display = 'block';
}
</script>
<script src="../js/shared.js"></script>
</body>
</html>
```

- [ ] **Step 2: コミット**

```bash
git add oyumino/brochure.html
git commit -m "feat: おゆみ野 資料ダウンロードページ追加"
```

---

## Task 10: 資料ダウンロードページ（chiharadai/brochure.html）

**Files:**
- Create: `chiharadai/brochure.html`

- [ ] **Step 1: ちはら台の資料ダウンロードページを作成する**

Task 9 と同一構造で、以下の差分のみ変更：
- `<title>` → `資料ダウンロード｜スマイルームちはら台`
- meta description → ちはら台版に変更
- `data-site-header` / `data-site-footer` → そのまま（shared-ch.js が処理）
- `<a href="tel:0433107467">043-310-7467</a>` → `<a href="tel:0436633618">0436-63-3618</a>`
- 感謝メッセージの電話番号も同様に変更
- `<a href="index.html">おゆみ野トップページへ</a>` → `<a href="index.html">ちはら台トップページへ</a>`
- `<script src="../js/shared.js">` → `<script src="shared-ch.js">`

完全なHTMLはTask 9 の内容をベースに上記を置換して作成する。

- [ ] **Step 2: コミット**

```bash
git add chiharadai/brochure.html
git commit -m "feat: ちはら台 資料ダウンロードページ追加"
```

---

## Task 11: ナビゲーション・フッターに資料DLリンクを追加

**Files:**
- Modify: `js/shared.js` — NAV 配列と footer に brochure.html リンクを追加
- Modify: `chiharadai/shared-ch.js` — 同様

- [ ] **Step 1: おゆみ野 shared.js のNAVにリンクを追加する**

`js/shared.js` の NAV 配列に追加：

```js
{ href: "brochure.html", label: "資料ダウンロード" },
```

フッターの「資料請求」リンクを更新：

```js
// 変更前
'<li><a href="contact.html">資料請求</a></li>'
// 変更後
'<li><a href="brochure.html">資料ダウンロード</a></li>'
```

- [ ] **Step 2: ちはら台 shared-ch.js も同様に更新する**

`chiharadai/shared-ch.js` も Step 1 と同様に NAV とフッターを更新。

- [ ] **Step 3: コミット**

```bash
git add js/shared.js chiharadai/shared-ch.js
git commit -m "feat: ナビ・フッターに資料ダウンロードリンク追加"
```

---

## Task 12: 最終プッシュ

- [ ] **Step 1: 全変更をプッシュする**

```bash
git push
```

- [ ] **Step 2: GitHub Pages でデプロイ確認**

数分後に `https://smile-room-group.github.io/smile-room/` を開き、各変更を目視確認：
- [ ] トップページのヘッダーにスクロール後TELが表示される
- [ ] Stats セクションで数字がカウントアップする
- [ ] 施設カードに「空室あり」バッジが表示される
- [ ] 比較テーブルに「✓ 対象が広い」バッジが表示される
- [ ] フッターにちはら台TELが表示される
- [ ] 診断ウィジェットが動作する（3問 → 結果表示）
- [ ] おゆみ野 pricing.html でシミュレーターが動く
- [ ] ちはら台 pricing.html でシミュレーターが動く
- [ ] おゆみ野 facilities.html などにパンくずリストが表示される
- [ ] oyumino/brochure.html が表示・フォーム送信できる
- [ ] chiharadai/brochure.html が表示・フォーム送信できる

---

## 実装順序まとめ

1. Task 1（SEO修正・5分）→ Task 2（ヘッダーTEL・5分）→ Task 3（バッジ・フッター・10分）
2. Task 4（カウントアップ・スクロール・10分）→ Task 5（診断・15分）
3. Task 6（おゆみ野シミュレーター・15分）→ Task 7（ちはら台シミュレーター・10分）
4. Task 8（パンくずリスト・10分）
5. Task 9（おゆみ野brochure・20分）→ Task 10（ちはら台brochure・10分）
6. Task 11（ナビ更新・5分）→ Task 12（プッシュ・確認）
