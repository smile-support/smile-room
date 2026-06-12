/* スマイルームちはら台 - 共通ヘッダー/フッター + Tweaks */

(function () {
  const NAV = [
    { href: "index.html", label: "ちはら台ホーム" },
    { href: "facilities.html", label: "施設・設備" },
    { href: "pricing.html", label: "料金プラン" },
    { href: "lifestyle.html", label: "一日の暮らし" },
    { href: "access.html", label: "アクセス・周辺" },
    { href: "flow.html", label: "入居の流れ" },
    { href: "faq.html", label: "よくある質問" },
    { href: "news.html", label: "お知らせ" },
    { href: "contact.html", label: "お問い合わせ" },
    { href: "brochure.html", label: "資料ダウンロード" },
  ];

  function currentPage() {
    const path = location.pathname.split("/").pop() || "index.html";
    return path;
  }

  function renderHeader() {
    const cur = currentPage();
    const navHtml = NAV.map(n =>
      `<a href="${n.href}" class="${n.href === cur ? 'active' : ''}">${n.label}</a>`
    ).join("");
    const headerEl = document.querySelector("[data-site-header]");
    if (!headerEl) return;
    headerEl.innerHTML = `
    <header class="site-header">
      <div class="container">
        <a href="index.html" class="brand" aria-label="スマイルームちはら台 トップへ">
          <img src="../images/logo-chiharadai.jpg" alt="スマイルームちはら台" class="brand-logo" style="height:64px;width:139px;display:block;object-fit:contain;flex-shrink:0;">
        </a>
        <nav class="site-nav" aria-label="メインナビゲーション">${navHtml}</nav>
        <div class="header-right">
          <a href="tel:0436633618" class="header-tel" aria-label="電話で問い合わせ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            0436-63-3618
          </a>
          <a href="contact.html" class="btn btn-primary header-reserve">見学予約</a>
          <button class="nav-toggle" aria-label="メニューを開く" onclick="document.body.classList.toggle('nav-open')">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `;
  }

  function renderFooter() {
    const footerEl = document.querySelector("[data-site-footer]");
    if (!footerEl) return;
    footerEl.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="footer-brand">
                <a href="index.html" class="footer-logo-wrap" aria-label="スマイルームちはら台 トップへ">
                  <img src="../images/logo-chiharadai.jpg" alt="スマイルームちはら台" class="brand-logo" style="height:64px;width:139px;display:block;object-fit:contain;flex-shrink:0;">
                </a>
              </div>
              <p style="color:oklch(0.8 0.01 225);margin:6px 0;">自分らしく暮らせる、<br>あたらしい住まいのかたち。</p>
              <p style="font-size:12.5px;color:oklch(0.7 0.01 225);margin:0;">〒290-0141<br>千葉県市原市ちはら台東八丁目19番地7</p>
              <div class="footer-tel">0436-63-3618</div>
              <small style="color:oklch(0.7 0.01 225);">受付時間 9:00 - 18:00（年中無休）</small>
            </div>
            <div>
              <h4>施設について</h4>
              <ul>
                <li><a href="facilities.html">施設・設備</a></li>
                <li><a href="pricing.html">料金プラン</a></li>
                <li><a href="lifestyle.html">一日の暮らし</a></li>
                <li><a href="access.html">アクセス・周辺</a></li>
              </ul>
            </div>
            <div>
              <h4>はじめての方へ</h4>
              <ul>
                <li><a href="flow.html">入居までの流れ</a></li>
                <li><a href="faq.html">よくある質問</a></li>
                <li><a href="contact.html">見学のご予約</a></li>
                <li><a href="brochure.html">資料ダウンロード</a></li>
              </ul>
            </div>
            <div>
              <h4>運営会社</h4>
              <ul>
                <li>株式会社 カイゴマン</li>
                <li><a href="news.html">お知らせ・ブログ</a></li>
                <li><a href="../privacy.html">プライバシーポリシー</a></li>
              </ul>
            </div>
            <div>
              <h4>2施設</h4>
              <ul>
                <li><a href="../">スマイルームトップ</a></li>
                <li><a href="../oyumino/">スマイルームおゆみ野</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 株式会社カイゴマン All Rights Reserved.</span>
            <span>スマイルームちはら台</span>
          </div>
        </div>
      </footer>
    `;
  }

  /* ===== reveal on scroll ===== */
  function setupReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay ? parseInt(e.target.dataset.delay) * 120 : 0;
          setTimeout(() => e.target.classList.add("in"), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  }

  /* ===== floating bar ===== */
  function setupFloatingBar() {
    const bar = document.createElement("div");
    bar.className = "floating-bar";
    bar.innerHTML = `
    <a href="tel:0436633618" class="fb-tel" aria-label="電話で問い合わせ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      電話で問い合わせ
    </a>
    <a href="contact.html" class="fb-cta" aria-label="見学を予約する">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      見学を予約する
    </a>
  `;
    document.body.appendChild(bar);
  }

  /* ===== breadcrumb ===== */
  function setupBreadcrumb() {
    const raw = document.body.dataset.breadcrumb;
    if (!raw) return;
    let items;
    try { items = JSON.parse(raw); } catch (e) { return; }
    const crumbs = [{ label: "ホーム", href: "index.html" }];
    items.forEach(item => { crumbs.push({ label: item, href: null }); });
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "パンくずリスト");
    nav.className = "breadcrumb container";
    nav.innerHTML = crumbs.map((c, i) => {
      const isLast = i === crumbs.length - 1;
      const sep = i > 0 ? `<span class="sep" aria-hidden="true">›</span>` : "";
      const label = isLast
        ? `<span aria-current="page">${c.label}</span>`
        : `<a href="${c.href}">${c.label}</a>`;
      return sep + label;
    }).join("");
    const header = document.querySelector(".site-header");
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(nav, header.nextSibling);
    }
  }

  /* ===== anchor menu ===== */
  function setupAnchorMenu() {
    const anchors = document.querySelectorAll(".anchor-menu a");
    if (!anchors.length) return;
    const sections = Array.from(anchors)
      .map(a => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          anchors.forEach(a => a.classList.remove("active"));
          const active = document.querySelector(`.anchor-menu a[href="#${e.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => io.observe(s));
  }

  /* ===== init ===== */
  function init() {
    renderHeader();
    renderFooter();
    setupReveal();
    setupFloatingBar();
    setupBreadcrumb();
    setupAnchorMenu();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
