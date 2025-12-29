import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "もり文字の使い方",
  description:
    "もり文字は、文字の上に記号（結合文字）を重ねて“盛る”装飾を作るツールです。使い方と注意点、崩れやすいケースの対処を解説します。",
};

export default function Page() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">もり文字の使い方</h1>
        <p className="text-sm opacity-80">
          もり文字は、入力した文字に「上付きの記号」などを重ねて、キラキラ・もこもこ・呪文っぽい雰囲気の装飾を作るツールです。
          仕組みとしては、主に結合文字（Combining Mark）を使って重ねています。
        </p>
        <p className="text-sm">
          <Link className="underline" href="/mori">もり文字を使う</Link>
          <span className="opacity-70">（ツールへ）</span>
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">手順</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>文字を入力</li>
          <li>候補したい文字を選択</li>
          <li>装飾ボタンをクリック</li>
          <li>コピーして貼り付け</li>
        </ol>
        <p className="text-sm opacity-80">
          コツ：まず短い単語で試して、貼り付け先（Xなど）で見た目が崩れない組み合わせを見つけると安定します。
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">注意点</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>端末やアプリのフォント差で見え方が変わる場合があります。</li>
          <li>端末や張り付ける先によって使えない装飾がある場合があります。</li>
          <li>
            結合文字は環境差が出やすく、ツール上でズレて見えても貼り付け先では直る（またはその逆）ことがあります。
            最終的には貼り付け先で確認するのがおすすめです。
          </li>
          <li>
            盛りすぎると文字が読みにくくなったり、行間が広がったり、文字の一部が欠けることがあります。
            読みやすさを優先するなら、装飾は控えめにするのが安全です。
          </li>
          <li>
            一部の装飾は検索や読み上げ（アクセシビリティ）で不利になることがあります。
            重要な情報（日時やURLなど）には使わないほうが無難です。
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">よくある質問</h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold">Q. ツール上だと崩れて見えるのに、Xに貼ると直ります。なぜ？</dt>
            <dd className="opacity-90">
              フォントの違いが原因です。結合文字はフォント側の対応状況で表示位置が変わります。
              ツール上のプレビューは目安として、最終的には貼り付け先の表示を正として確認してください。
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Q. 逆に、ツール上では綺麗なのに貼り付け先で崩れます</dt>
            <dd className="opacity-90">
              貼り付け先のアプリや端末が、その結合文字の位置決めに弱い（または未対応）可能性があります。
              装飾の種類を変えるか、重ねる数を減らすと改善することが多いです。
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Q. □（四角）や？になって表示されます</dt>
            <dd className="opacity-90">
              その環境が文字に未対応です。別の装飾を試すか、OSやアプリを変えると表示できることがあります。
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Q. どのくらい“盛る”のが安全ですか？</dt>
            <dd className="opacity-90">
              一般的には、1文字あたりの重ねは少なめ（1〜2個）だと崩れにくいです。
              文字数が多い文章では、装飾を部分的に使う（先頭だけ盛る等）ほうが読みやすく安定します。
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
