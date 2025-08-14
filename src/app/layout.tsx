import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NerdMath - Math Beyond Boundaries",
  description:
    "영어 기반 수학 학습 플랫폼으로, 한자 기반 용어의 한계를 극복하고 글로벌 수학 사고력을 기르는 교육 서비스입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
