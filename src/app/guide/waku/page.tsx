import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "枠デコの使い方",
  description:
    "枠デコ（記号などを組み合わせて文字の周りを囲む・飾る）の使い方と注意点を解説します。",
};

export default function Page() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">枠デコの使い方</h1>
        <p className="text-sm opacity-80">
          記号などを組み合わせて文字の周りを囲む・飾るモードです。
        </p>
        <p className="text-sm">
          <Link className="underline" href="/">枠デコを使う</Link>
          <span className="opacity-70">（ツールへ）</span>
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">手順</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>文字を入力</li>
          <li>候補を選ぶ</li>
          <li>コピーして貼り付け</li>
        </ol>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">注意点</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>端末やアプリのフォント差で見え方が変わる場合があります。</li>
          <li>短い文字列の方が安定します。</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">よくある質問</h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold">Q. 枠がズレます</dt>
            <dd className="opacity-90">
              記号などの扱いと文字幅の違いでズレることがあります。
            </dd>
            <dd className="opacity-90">
              別の候補や短い文字列を試すか、使用する場所に張り付けたあとに微調整してください。
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
