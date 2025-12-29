import ClientMoriPage  from "@/components/ClientMoroPage";
import type {Metadata} from "next";
import Link            from "next/link";
import React           from "react";

export const metadata: Metadata = {
  title: "デコ文字メーカー｜もり文字",
  description:
    "もり文字は、装飾記号を多めに使った文字装飾モードです。名前や短文を目立たせたいときに使えます。"
};

export default function MoriPage() {
  return <>
    <section className="px-4 pt-2 max-w-[1100px] mx-auto">
      <h1 className="text-sm font-medium leading-tight">
        もり文字
      </h1>
      <p className="text-xs opacity-70 leading-snug">
        装飾記号を多めに使った文字装飾モードです。名前や短文を目立たせたいときに使えます。
        <Link href="/guide/mori" className="underline ml-1">
          使い方
        </Link>
      </p>
    </section>
    <ClientMoriPage/>
  </>
}
