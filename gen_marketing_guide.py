#!/usr/bin/env python3
"""スマイルームおゆみ野 ウェブ集客ガイド PDF生成"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import simpleSplit
import os

pdfmetrics.registerFont(TTFont('JP',   r'C:\Windows\Fonts\meiryo.ttc'))
pdfmetrics.registerFont(TTFont('JP-B', r'C:\Windows\Fonts\meiryob.ttc'))

# 出力先はこのスクリプトと同じフォルダ（フォルダ名変更に追従するため相対指定）
OUTPUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'web-marketing-guide.pdf')

W, H = A4
ML, MR, MT, MB = 13*mm, 13*mm, 13*mm, 10*mm
CW = W - ML - MR

BLUE   = colors.HexColor('#1d4ed8')
GREEN  = colors.HexColor('#047857')
AMBER  = colors.HexColor('#92400e')
BLUE_L = colors.HexColor('#eff6ff')
GREEN_L= colors.HexColor('#f0fdf4')
AMBER_L= colors.HexColor('#fffbeb')
WHITE  = colors.white
DARK   = colors.HexColor('#1f2937')
GRAY   = colors.HexColor('#9ca3af')
NUMS   = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧']

SECTIONS = [
    dict(
        step=1, color=BLUE, bg=BLUE_L,
        title='独自ドメイン取得',
        tag='ウェブの信頼性を高め、チラシ・名刺の URL を確定させる',
        items=[
            'お名前.com でドメインを検索・購入する（smileroom-oyumino.com 推奨、年約 1,500 円）',
            'GitHub リポジトリ → Settings → Pages → Custom domain を開く',
            '取得したドメイン名を入力して保存する（リポジトリに CNAME ファイルが作成される）',
            'お名前.com の DNS 設定に、GitHub Pages 指定の A レコード（4 件）を登録する',
            '数時間〜1 日で反映。「Enforce HTTPS」にチェックを入れると GitHub が自動で有効にする',
        ],
        tip='★  .com 推奨（年約 1,500 円）。.co.jp は法人登記証明書が必要で手間がかかる',
    ),
    dict(
        step=2, color=GREEN, bg=GREEN_L,
        title='Google Search Console 登録',
        tag='Google にサイトを通知して検索結果への表示を速める',
        items=[
            'ドメイン取得後に実施する（仮 URL で登録すると後で再登録が必要になる）',
            'search.google.com/search-console → 同じ Google アカウントでログイン',
            '「プロパティを追加」→「URL プレフィックス」タブでサイト URL を入力する',
            '所有権確認：「HTML タグ」を選択 → コードを index.html の <head> にコピペ',
            'Git に Push → GitHub Pages 反映後に「確認」ボタンを押す',
            'サイトマップ画面で sitemap.xml を送信する（全ページを Google に通知）',
        ],
        tip='★  sitemap.xml の作成は Claude Code で対応可能。登録後 1〜2 週間でインデックス開始',
    ),
    dict(
        step=3, color=AMBER, bg=AMBER_L,
        title='Google ビジネスプロフィール登録',
        tag='Google マップで 24 時間問い合わせを受け付けられるようにする',
        items=[
            'Search Console 確認完了後に登録する（同じ Google アカウントで連携が楽になる）',
            'business.google.com にアクセス →「ビジネスを追加」ボタンを押す',
            'カテゴリ検索で「サービス付き高齢者向け住宅」を選択する',
            '住所・電話番号（043-310-7467）・ウェブサイト URL を正確に入力する',
            '本人確認：ハガキが届く（約 1 週間）→ 記載のコードを入力して完了',
            '確認後すぐ：外観・共用部・居室の写真を 5 枚以上追加する',
            '説明文（750 字以内）に「ケアマネ相談可・見学無料・月額 59,800 円〜」を入れる',
        ],
        tip='★  写真が多い施設ほど Google マップ上位に表示されやすい。確認完了後すぐに写真を追加すること',
    ),
]

ITEM_FS    = 9.0
ITEM_LEAD  = 13.0
ITEM_V_GAP = 2.5
HEADER_H   = 15 * mm
TIP_FS     = 8.5
V_PAD_TOP  = 3.5 * mm
V_PAD_BOT  = 3.5 * mm
NUM_X_OFF  = 4 * mm
ITEM_X_OFF = 11.5 * mm


def item_max_w(sec_w):
    return sec_w - ITEM_X_OFF - 3*mm


def tip_max_w(sec_w):
    return sec_w - 10*mm


def section_height(sec, sw=None):
    if sw is None:
        sw = CW
    items_h = 0
    for item in sec['items']:
        ls = simpleSplit(item, 'JP', ITEM_FS, item_max_w(sw))
        items_h += len(ls) * ITEM_LEAD + ITEM_V_GAP
    tip_ls = simpleSplit(sec['tip'], 'JP-B', TIP_FS, tip_max_w(sw))
    tip_h = len(tip_ls) * TIP_FS * 1.6 + 4*mm
    return HEADER_H + V_PAD_TOP + items_h + V_PAD_BOT + tip_h


def tag_color(hc):
    if hc == BLUE:  return colors.HexColor('#bfdbfe')
    if hc == GREEN: return colors.HexColor('#a7f3d0')
    return colors.HexColor('#fde68a')


def tip_bg_color(hc):
    if hc == BLUE:  return colors.HexColor('#dbeafe')
    if hc == GREEN: return colors.HexColor('#d1fae5')
    return colors.HexColor('#fde68a')


def draw_section(cv, sec, x, y_top, w):
    hc = sec['color']
    bg = sec['bg']
    th = section_height(sec, w)
    yb = y_top - th

    # 背景
    cv.setFillColor(bg)
    cv.roundRect(x, yb, w, th, 5, fill=1, stroke=0)

    # ヘッダー（上角丸・下角四角）
    cv.setFillColor(hc)
    cv.roundRect(x, y_top - HEADER_H, w, HEADER_H, 5, fill=1, stroke=0)
    cv.rect(x, y_top - HEADER_H, w, 5, fill=1, stroke=0)

    # STEP バッジ
    bw, bh = 13*mm, 5.5*mm
    bx = x + 3.5*mm
    by_ = y_top - HEADER_H + (HEADER_H - bh) / 2
    cv.setFillColor(WHITE)
    cv.roundRect(bx, by_, bw, bh, 3, fill=1, stroke=0)
    cv.setFont('JP-B', 6.5)
    cv.setFillColor(hc)
    cv.drawCentredString(bx + bw/2, by_ + 1.5*mm, f'STEP {sec["step"]}')

    # タイトル
    cv.setFont('JP-B', 11.5)
    cv.setFillColor(WHITE)
    cv.drawString(x + 19*mm, y_top - 7.5*mm, sec['title'])

    # タグライン
    cv.setFont('JP', 7.5)
    cv.setFillColor(tag_color(hc))
    cv.drawString(x + 19*mm, y_top - 13.5*mm, sec['tag'])

    # アイテム
    iy = y_top - HEADER_H - V_PAD_TOP
    mw = item_max_w(w)
    for i, item in enumerate(sec['items']):
        ls = simpleSplit(item, 'JP', ITEM_FS, mw)
        cv.setFont('JP-B', 10)
        cv.setFillColor(hc)
        cv.drawString(x + NUM_X_OFF, iy - ITEM_LEAD, NUMS[i])
        cv.setFont('JP', ITEM_FS)
        cv.setFillColor(DARK)
        ly = iy - ITEM_LEAD
        for line in ls:
            cv.drawString(x + ITEM_X_OFF, ly, line)
            ly -= ITEM_LEAD
        iy = ly - ITEM_V_GAP

    # Tip ボックス
    tmw = tip_max_w(w)
    tip_ls = simpleSplit(sec['tip'], 'JP-B', TIP_FS, tmw)
    tip_h = len(tip_ls) * TIP_FS * 1.6 + 4*mm
    tip_box_y = yb + V_PAD_BOT
    cv.setFillColor(tip_bg_color(hc))
    cv.roundRect(x + 3*mm, tip_box_y, w - 6*mm, tip_h, 3, fill=1, stroke=0)
    cv.setFont('JP-B', TIP_FS)
    cv.setFillColor(hc)
    tly = tip_box_y + tip_h - 2*mm - TIP_FS
    for tl in tip_ls:
        cv.drawString(x + 5*mm, tly, tl)
        tly -= TIP_FS * 1.6

    return yb


# ==============================
# PDF 描画
# ==============================
c = canvas.Canvas(OUTPUT, pagesize=A4)
y = H - MT

# ---- メインヘッダー ----
hh = 15 * mm
c.setFillColor(BLUE)
c.roundRect(ML, y - hh, CW, hh, 5, fill=1, stroke=0)

c.setFont('JP-B', 13)
c.setFillColor(WHITE)
c.drawString(ML + 5*mm, y - 8*mm, 'スマイルームおゆみ野')

c.setFont('JP', 9.5)
c.setFillColor(colors.HexColor('#bfdbfe'))
c.drawString(ML + 5*mm, y - 13.5*mm, 'ウェブ集客 3 ステップ実施ガイド')

rb_w = 28*mm
rb_x = W - MR - rb_w
rb_y = y - 13*mm
c.setFillColor(colors.HexColor('#fbbf24'))
c.roundRect(rb_x, rb_y, rb_w, 6.5*mm, 3, fill=1, stroke=0)
c.setFont('JP-B', 8)
c.setFillColor(DARK)
c.drawCentredString(rb_x + rb_w/2, rb_y + 1.8*mm, '無料〜低コスト')

y -= hh + 4.5*mm

# ---- セクション ----
GAP = 4 * mm
for sec in SECTIONS:
    y = draw_section(c, sec, ML, y, CW)
    y -= GAP

# ---- フッター ----
c.setFont('JP', 7.5)
c.setFillColor(GRAY)
c.drawString(ML, MB + 2*mm,
    '所要目安：STEP 1（10 分）→ DNS 反映（数時間〜1 日）→ STEP 2（30 分）→ STEP 3（30 分 + ハガキ約 1 週間）')

c.save()
print(f'PDF 生成完了: {OUTPUT}')
