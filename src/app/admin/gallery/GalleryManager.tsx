"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { addGalleryImage, deleteGalleryImage } from "./actions";
import { toast } from "sonner";

export default function GalleryManager({ images }: { images: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    setLoadingId(id);
    try {
      const res = await deleteGalleryImage(id);
      if (res.success) {
        toast.success("Image deleted successfully");
      } else {
        toast.error(res.error || "Failed to delete image");
      }
    } catch (e) {
      toast.error("Failed to delete image");
    } finally {
      setLoadingId(null);
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoadingId("add");
    try {
      const res = await addGalleryImage(formData);
      if (res.success) {
        toast.success("Image added successfully");
        setIsAdding(false);
      } else {
        toast.error(res.error || "Failed to add image");
      }
    } catch (e) {
      toast.error("Failed to add image");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-gray-900">Gallery Images</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-xl text-sm"
        >
          <Plus size={16} /> {isAdding ? "Cancel" : "Upload Image"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image URL</label>
            <input name="url" type="url" required placeholder="https://example.com/image.jpg" className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Caption</label>
            <input name="caption" type="text" required placeholder="e.g. Innova Crysta" className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
            <select name="category" className="form-input appearance-none">
              <option value="Vehicles">Vehicles</option>
              <option value="Destinations">Destinations</option>
              <option value="Journeys">Journeys</option>
            </select>
          </div>
          <div className="sm:col-span-4 mt-2">
            <button type="submit" disabled={loadingId === "add"} className="btn-primary py-2 px-6 disabled:opacity-50">
              {loadingId === "add" ? <Loader2 size={18} className="animate-spin inline" /> : "Save Image"}
            </button>
          </div>
        </form>
      )}

      {images.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="text-4xl mb-3">🖼️</div>
          <div className="font-bold text-gray-900 mb-1">No images yet</div>
          <div className="text-sm text-gray-500">Click &apos;Upload Image&apos; to add your first photo.</div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
              <div className="relative h-40">
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleDelete(img.id)}
                    disabled={loadingId === img.id}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                  >
                    {loadingId === img.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm font-semibold text-gray-900 line-clamp-1">{img.caption}</div>
                <span className="badge badge-yellow text-xs mt-1">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
