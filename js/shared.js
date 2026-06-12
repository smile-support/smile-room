/* スマイルームおゆみ野 - 共通ヘッダー/フッター + Tweaks */

(function () {
  const NAV = [
    { href: "index.html", label: "おゆみ野ホーム" },
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
        <a href="index.html" class="brand" aria-label="スマイルームおゆみ野 トップへ">
          <img src="../images/logo.png" alt="スマイルームおゆみ野" class="brand-logo">
        </a>
        <nav class="site-nav" aria-label="メインナビゲーション">${navHtml}</nav>
        <div class="header-right">
          <a href="tel:0433107467" class="header-tel" aria-label="電話で問い合わせ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            043-310-7467
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
                <a href="index.html" class="footer-logo-wrap" aria-label="スマイルームおゆみ野 トップへ">
                  <img src="../images/logo.png" alt="スマイルームおゆみ野" class="brand-logo">
                </a>
              </div>
              <p style="color:oklch(0.8 0.01 30);margin:0 0 6px;">自分らしく暮らせる、<br>あたらしい住まいのかたち。</p>
              <p style="font-size:12.5px;color:oklch(0.7 0.01 30);margin:0;">〒266-0005<br>千葉県千葉市緑区誉田町1-659-1</p>
              <div class="footer-tel">043-310-7467</div>
              <small style="color:oklch(0.7 0.01 30);">受付時間 9:00 - 18:00（年中無休）</small>
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
                <li><a href="#">プライバシーポリシー</a></li>
                <li><a href="#">サイトマップ</a></li>
              </ul>
            </div>
            <div>
              <h4>2施設</h4>
              <ul>
                <li><a href="../">スマイルームトップ</a></li>
                <li><a href="../chiharadai/">スマイルームちはら台</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 株式会社カイゴマン All Rights Reserved.</span>
            <span>スマイルームおゆみ野</span>
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

  /* ===== font-size switcher ===== */
  function setupFontSize() {
    const stored = localStorage.getItem("smileroom-fontsize") || "normal";
    document.documentElement.setAttribute("data-fontsize", stored);

    document.querySelectorAll(".font-size-switcher button").forEach(btn => {
      btn.setAttribute("aria-pressed", btn.dataset.fsz === stored ? "true" : "false");
      btn.addEventListener("click", () => {
        const size = btn.dataset.fsz;
        document.documentElement.setAttribute("data-fontsize", size);
        localStorage.setItem("smileroom-fontsize", size);
        document.querySelectorAll(".font-size-switcher button").forEach(b => {
          b.setAttribute("aria-pressed", b.dataset.fsz === size ? "true" : "false");
        });
      });
    });
  }

  /* ===== floating bar ===== */
  function setupFloatingBar() {
    const bar = document.createElement("div");
    bar.className = "floating-bar";
    bar.innerHTML = `
    <a href="tel:0433107467" class="fb-tel" aria-label="電話で問い合わせ">
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
    items.forEach(item => {
      crumbs.push({ label: item, href: null });
    });

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

    const ldItems = crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.label,
      ...(c.href ? { "item": location.origin + "/" + c.href } : {})
    }));
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": ldItems
    });
    document.head.appendChild(ld);
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

  /* ===== Tweaks: テーマ切り替え ===== */
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "sakura"
  }/*EDITMODE-END*/;

  const THEMES = [
    { id: "sakura", name: "やさしい桜", swatches: ["#f9dde2", "#e89aab", "#b85068"] },
    { id: "cream", name: "クリーム＆ベージュ", swatches: ["#f5e9d3", "#e2b97e", "#a86a3a"] },
    { id: "sakura-leaf", name: "桜＆若葉", swatches: ["#f9dde2", "#e89aab", "#7fae7c"] }
  ];

  let tweakState = { ...TWEAK_DEFAULTS };

  function applyTheme(theme) {
    if (theme === "sakura") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  function setTweak(key, value) {
    tweakState[key] = value;
    if (key === "theme") applyTheme(value);
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: value } }, "*");
    } catch (e) {}
  }

  function renderTweaksPanel() {
    let panel = document.getElementById("__tweaks_panel");
    if (panel) return panel;
    panel = document.createElement("div");
    panel.id = "__tweaks_panel";
    panel.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; z-index: 9999;
      background: white; border-radius: 18px; padding: 20px 22px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08);
      font-family: "Noto Sans JP", sans-serif;
      width: 280px; border: 1px solid #f0d8de;
    `;
    panel.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <strong style="font-family:'Zen Maru Gothic',sans-serif;font-size:15px;">Tweaks</strong>
        <button id="__tweaks_close" aria-label="閉じる" style="background:none;border:0;font-size:20px;cursor:pointer;color:#999;line-height:1;">×</button>
      </div>
      <div style="font-size:12px;color:#888;letter-spacing:0.06em;margin-bottom:8px;">カラーテーマ</div>
      <div id="__tweaks_themes" style="display:flex;flex-direction:column;gap:8px;"></div>
    `;
    document.body.appendChild(panel);

    const themes = panel.querySelector("#__tweaks_themes");
    THEMES.forEach(t => {
      const btn = document.createElement("button");
      btn.style.cssText = `
        display:flex; align-items:center; gap:12px;
        padding: 10px 12px; border-radius: 12px;
        border: 1.5px solid ${tweakState.theme === t.id ? '#e89aab' : '#eee'};
        background: ${tweakState.theme === t.id ? '#fef4f6' : 'white'};
        cursor: pointer; font-family: inherit; font-size: 13px; text-align: left;
        transition: all .15s;
      `;
      btn.innerHTML = `
        <span style="display:flex;gap:-4px;">
          ${t.swatches.map((c, i) => `<span style="width:18px;height:18px;border-radius:50%;background:${c};margin-left:${i ? -6 : 0}px;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.1);"></span>`).join("")}
        </span>
        <span>${t.name}</span>
      `;
      btn.onclick = () => {
        setTweak("theme", t.id);
        themes.querySelectorAll("button").forEach((b, i) => {
          const active = THEMES[i].id === t.id;
          b.style.border = `1.5px solid ${active ? '#e89aab' : '#eee'}`;
          b.style.background = active ? '#fef4f6' : 'white';
        });
      };
      themes.appendChild(btn);
    });

    panel.querySelector("#__tweaks_close").onclick = () => {
      panel.style.display = "none";
      try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (e) {}
    };
    return panel;
  }

  function setupTweaks() {
    applyTheme(tweakState.theme);

    window.addEventListener("message", (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") {
        const p = renderTweaksPanel();
        p.style.display = "block";
      } else if (d.type === "__deactivate_edit_mode") {
        const p = document.getElementById("__tweaks_panel");
        if (p) p.style.display = "none";
      }
    });
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (e) {}
  }

  /* ===== init ===== */
  function init() {
    renderHeader();
    renderFooter();
    setupReveal();
    setupTweaks();
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
