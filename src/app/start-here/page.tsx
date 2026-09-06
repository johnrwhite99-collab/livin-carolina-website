import type { Metadata } from "next";
import { GuidePage, guideMetadata } from "@/components/GuidePage";

export async function generateMetadata(): Promise<Metadata> {
  return guideMetadata("start-here");
}

export default function Page() {
  return <GuidePage slug="start-here" />;
}
