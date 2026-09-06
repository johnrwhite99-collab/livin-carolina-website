import type { Metadata } from "next";
import { GuidePage, guideMetadata } from "@/components/GuidePage";

export async function generateMetadata(): Promise<Metadata> {
  return guideMetadata("cost-of-living");
}

export default function Page() {
  return <GuidePage slug="cost-of-living" />;
}
