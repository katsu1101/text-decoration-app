import ClientPage      from "@/components/ClientPage";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "デコ文字メーカー｜枠デコ",
  description:
    "デコ文字メーカーは、X（旧Twitter）向けの文字装飾をコピペで作れる無料アプリです。" +
    "枠デコは、文字の周りを飾るモードです。"
};

export default function Page() {
  return (
    <>
      <section className="px-4 pt-2 max-w-[1100px] mx-auto">
        <h1 className="text-sm font-medium leading-tight">
          デコ文字メーカー（枠デコ）
        </h1>
        <p className="text-xs opacity-70 leading-snug">
          X（旧Twitter）投稿向けのデコ文字・枠デコを作れる無料ツール。
          <a href="../guide/waku" className="underline ml-1">
            使い方
          </a>
        </p>
      </section>
      <ClientPage mode="waku"/>
    </>
  );
}
