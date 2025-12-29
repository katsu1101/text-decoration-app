import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "使い方ガイド",
  description:
    "デコ文字メーカーの枠デコ・英数デコ・もり文字の使い方と注意点をまとめたガイドです。",
};

export default function Page() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">使い方ガイド</h1>
      <p className="text-sm opacity-80">
        各モードの「手順」「注意点」「よくある質問」をまとめています。
      </p>

      <ul className="list-disc list-inside space-y-2">
        <li>
          <Link className="underline" href="/guide/waku">枠デコ</Link>
          <span className="text-sm opacity-70">（文章を記号などで囲って装飾）</span>
        </li>
        <li>
          <Link className="underline" href="/guide/eisu">英数デコ</Link>
          <span className="text-sm opacity-70">（英数字を装飾に変換）</span>
        </li>
        <li>
          <Link className="underline" href="/guide/mori">もり文字</Link>
          <span className="text-sm opacity-70">（装飾多めで目立たせる）</span>
        </li>
      </ul>
    </section>
  );
}
