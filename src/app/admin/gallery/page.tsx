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
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 font-black">🚖</div>
            <div>
              <div className="font-bold">Haryana Taxi — Admin</div>
              <div className="text-xs text-gray-400">Gallery Management</div>
            </div>
          </div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-white">← Dashboard</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <GalleryManager images={images} />
      </div>
    </div>
  );
}
