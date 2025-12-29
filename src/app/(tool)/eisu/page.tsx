// src/app/eisu/page.tsx
import ClientPage      from "@/components/ClientPage";
import type {Metadata} from "next";
import Link            from "next/link";

export const metadata: Metadata = {
  title: "デコ文字メーカー｜英字デコ",
  description:
    "英数デコは、アルファベットや数字を文字装飾として変換するモードです。作成した文字はコピペしてX（旧Twitter）などに使えます。"
};

export default function EisuPage() {
  return <>
    <section className="px-4 pt-2 max-w-[1100px] mx-auto">
      <h1 className="text-sm font-medium leading-tight">
        英字デコ
      </h1>
      <p className="text-xs opacity-70 leading-snug">
        アルファベットを装飾文字に変換できます。
        <Link href="/guide/eisu" className="underline ml-1">
          使い方
        </Link>
      </p>
    </section>
    <ClientPage mode="eisu"/>

  </>;
}
