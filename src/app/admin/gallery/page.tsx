import Link from "next/link";
import { db } from "@/lib/db";
import GalleryManager from "./GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await db.galleryImage.findMany({
    orderBy: { createdAt: "desc" }
  });
  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="max-w-7xl mx-auto px-6 py-8">
        <GalleryManager images={images} />
      </div>
    </div>
  );
}
