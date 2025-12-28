import ClientPage from "@/components/ClientPage";

export default function Page() {
  return (
    <>
      <ClientPage mode="jp" />
      <section className="px-4 py-6 max-w-[900px] mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          デコ文字メーカー｜X投稿に使える枠デコ・英字デコ・もり文字（結合文字）
        </h1>

        <p className="mb-4">
          デコ文字メーカーは、X（旧Twitter）の投稿やプロフィール、
          配信告知などに使える枠デコ・英字デコ・もり文字（結合文字）
          かんたんに作れる無料ツールです。
          入力した文字をそのままコピペして使えます。
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          使い方
        </h2>
        <ol className="list-decimal list-inside mb-4">
          <li>文字を入力します</li>
          <li>表示されたデコ文字を選びます</li>
          <li>コピーしてXなどに貼り付けます</li>
        </ol>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          対応しているデコレーション
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>枠デコ・囲み文字</li>
          <li>英字・アルファベット装飾</li>
          <li>結合文字（Unicode装飾）</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          よくある質問
        </h2>

        <dl className="space-y-3">
          <div>
            <dt className="font-semibold">
              Q. iPhoneとAndroidで見え方は同じですか？
            </dt>
            <dd>
              使用しているフォントやUnicode実装の違いにより、
              端末やアプリによって表示が異なる場合があります。
              Xでの表示を基準に確認してください。
            </dd>
          </div>

          <div>
            <dt className="font-semibold">
              Q. 枠デコがずれることがあります
            </dt>
            <dd>
              等幅フォントではない環境や、
              結合文字の影響で文字幅が揃わない場合があります。
            </dd>
          </div>
        </dl>
      </section>

    </>
  );
}
