import {makeBoxMeasured, splitLines} from "@/lib/decorationsText";
import {ModeConfig}                  from "@/lib/type";

export const jpModeConfig: ModeConfig = {
  title: "枠デコ（日本語）",
  patterns: [
    {
      id: "rule",
      title: "罫線（上下）",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(splitLines(t), {top: "━", bottom: "━", left: " ", right: " "}, measurer),
    },
    {
      id: "box_round",
      title: "丸角ふきだし",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topLeft: "╭", top: "─", topRight: "─╮",
            left: "│", right: "│",
            bottomLeft: "╰", botCenter: "ｖ", bottom: "─", bottomRight: "─╯",
          },
          measurer
        ),
    },
    {
      id: "box_bold",
      title: "太枠看板",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topLeft: "┏", top: "━", topRight: "━┓",
            left: "┃", right: "┃",
            bottomLeft: "┗", botCenter: "┳", bottom: "━", bottomRight: "━┛",
          },
          measurer
        ),
    },
    {
      id: "ribbon",
      title: "リボン枠",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topLeft: "✦ ", top: "─", topRight: " ✦",
            left: " ", right: " ",
            bottomLeft: "✧ ", bottom: "─", bottomRight: " ✧",
          },
          measurer
        ),
    },
    {
      id: "ticket_bracket",
      title: "チケット（括弧）",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topLeft: "||◤", topRight: "◥||",
            left: "　", right: "　",
            bottomLeft: "||◣", bottomRight: "◢||",
          },
          measurer
        ),
    },
    {
      id: "plate_caps",
      title: "プレート（上下キャップ）",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topLeft: "◤", top: "▔", topRight: "◥",
            left: "", right: "",
            bottomLeft: "◣", bottom: "▁", bottomRight: "◢",
          },
          measurer
        ),
    },
    {
      id: "manga_shout",
      title: "漫画風（叫び）",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topLeft: "＿", top: "人", topRight: "＿",
            left: "＞", right: "　",
            bottomLeft: "￣", bottom: "Y", bottomRight: "￣",
          },
          measurer
        ),
    },
    {
      id: "show_time",
      title: "ショータイム",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topLeft: "＼＼", topCenter: "⧵ 　/", topRight: "／／",
            left: "　", right: "　",
            bottomLeft: "／／", botCenter: "/　 ⧵", bottomRight: "＼＼",
          },
          measurer
        ),
    },
    {
      id: "kira_kira",
      title: "きらきら枠",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topLeft: "୨୧", top: "‥∵‥", topRight: "୨୧",
            left: "　", right: "　",
            bottomLeft: "୨୧", bottom: "‥∵‥", bottomRight: "୨୧",
          },
          measurer
        ),
    },
    {
      id: "neko",
      title: "ねこ枠",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topCenter: "◣＿＿＿＿◢", top: "＿",
            left: "　", right: "　",
            bottom: "＿", bottomRight: "𓂃",
          },
          measurer
        ),
    },
    {
      id: "eva",
      title: "EVA風",
      buildMeasured: (t, measurer) =>
        makeBoxMeasured(
          splitLines(t),
          {
            topLeft: "╋━━",
            left: "　", right: "　",
            bottomRight: "━━━╋",
          },
          measurer
        ),
    },
  ],
  examples: [
    "7月4日は\n戸定梨香の誕生日！",
    "明日20:00 歌枠🎤\nみんな集合！",
    "新作公開しました✨\n感想ください！",
    "今夜はまったり雑談☕\n22:00〜\n来てくれたら嬉しいな",
    "おはようございます☀️\n今日もゆるっと\nがんばろ〜",
    "配信ありがとう！\n余韻がすごい…\nまた次も楽しみ",
    "告知です📢\n今週末コラボ！\n詳細はこのあと",
    "はじめての人も大歓迎！\n気軽にコメントしてね",
  ],
};
