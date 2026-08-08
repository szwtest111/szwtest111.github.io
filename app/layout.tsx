import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const publicSiteUrl = process.env.GITHUB_PAGES === "true"
  ? "https://szwtest111.github.io"
  : "https://precision-xray-demo.szw19980501.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl),
  title: "YONC优能创｜高端低能X射线管",
  description: "优能创（上海）电气科技有限公司，专业研发、生产、销售高端低能X射线管及配套服务。",
  icons: { icon: "/yonc-logo.jpg", shortcut: "/yonc-logo.jpg" },
  openGraph: { title: "YONC优能创｜高端低能X射线管", description: "以质量为保障，以创新为动力。", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "YONC优能创｜高端低能X射线管", description: "以质量为保障，以创新为动力。", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
