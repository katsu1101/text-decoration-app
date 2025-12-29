import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "英数デコの使い方",
  description:
    "英数デコは、英字・数字を「筆記体」「黒板文字」「丸文字」などの飾り文字に変換するツールです。使い方と注意点、表示が崩れるときの対処をまとめます。",
};

export default function Page() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">英数デコの使い方</h1>
        <p className="text-sm opacity-80">
          入力した英字・数字を、SNS投稿などで使える飾り文字に変換します。候補から選んでコピーするだけで使えます。
        </p>
        <p className="text-sm">
          <Link className="underline" href="/eisu">英数デコを使う</Link>
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
        <p className="text-sm opacity-80">
          ツール上の表示と、貼り付け先（X、Instagram、メモ帳など）の表示は環境によって少し違うことがあります。最終的には貼り付け先で確認するのがおすすめです。
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">注意点</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            飾り文字は、通常の文字より「対応している環境」が少ないことがあります。古い端末や一部アプリでは四角（□）になったり、別の見た目になる場合があります。
          </li>
          <li>
            一部の飾りは「結合文字（Combining Mark）」を使います。結合文字はフォントの都合で、入力欄ではズレて見えても、貼り付け先では正しく見えることがあります（またはその逆もあります）。
          </li>
          <li>
            絵文字や飾り記号が混ざると、行間や文字幅が広く見えることがあります。見た目を揃えたい場合は、記号や空白を減らして試してください。
          </li>
          <li>
            一部のサービスでは「検索」や「読み上げ」の精度が落ちることがあります（見た目は似ていても別文字のため）。
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">よくある質問</h2>
        <dl className="space-y-3">
          <div>
            <dt className="font-semibold">Q. ツール上だと崩れて見えるのに、Xに貼ると直ります。なぜ？</dt>
            <dd className="opacity-90">
              フォント（文字のデザインデータ）の違いが原因です。結合文字や特殊な飾り文字は、フォントによって「上に乗る／横にずれる」などの見え方が変わります。
              ツール上のプレビューより、貼り付け先の見え方を正として確認するのがおすすめです。
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Q. □（四角）になって表示できません</dt>
            <dd className="opacity-90">
              その環境（端末・OS・アプリ・フォント）がその文字に未対応です。別の飾り候補を試すか、端末やアプリを変えると表示できることがあります。
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Q. コピーしたのに貼り付けられません</dt>
            <dd className="opacity-90">
              ブラウザの権限や端末の仕様で、クリップボードが制限されることがあります。コピーがうまくいかない場合は、テキストを選択して手動コピー（Ctrl+C / 長押しコピー）を試してください。
            </dd>
          </div>

          <div>
            <dt className="font-semibold">Q. どこまでが「安全に使える」文字ですか？</dt>
            <dd className="opacity-90">
              一般的に、単一のUnicode文字として存在する飾り（例：丸文字、太字、筆記体など）は安定しやすいです。
              逆に、結合文字を多用する飾りや、記号を重ねるタイプは環境差が出やすいです。
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
