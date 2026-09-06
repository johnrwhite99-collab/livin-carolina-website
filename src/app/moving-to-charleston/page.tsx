import type { Metadata } from "next";
import { GuidePage, guideMetadata } from "@/components/GuidePage";

export async function generateMetadata(): Promise<Metadata> {
  return guideMetadata("moving-to-charleston");
}

export default function Page() {
  return <GuidePage slug="moving-to-charleston" />;
}
