import Link from "next/link";
import { Star, CheckCircle, Plus } from "lucide-react";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import DeleteReviewButton from "./DeleteReviewButton";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await db.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 font-black">🚖</div>
            <div>
              <div className="font-bold">Go Nainital — Admin</div>
              <div className="text-xs text-gray-400">Review Management</div>
            </div>
          </div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-white">← Dashboard</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Customer Reviews</h1>
            <div className="text-sm text-gray-500 mt-0.5">
              {reviews.length} reviews · avg {avgRating}★ ·{" "}
              {reviews.filter((r) => r.featured).length} featured
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded-xl text-sm hover:bg-yellow-500 transition-colors">
            <Plus size={16} /> Add Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="text-4xl mb-3">⭐</div>
            <div className="font-bold text-gray-900 mb-1">No reviews yet</div>
            <div className="text-sm text-gray-500">Reviews will appear here once added.</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900">{review.name}</span>
                      {review.verified && <CheckCircle size={14} className="text-green-500" />}
                    </div>
                    <div className="text-xs text-gray-500">{review.location}</div>
                  </div>
                  {review.featured && (
                    <span className="badge badge-yellow text-xs">Featured</span>
                  )}
                </div>

                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-100"}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">{review.rating}/5</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                  {review.review}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div>
                    {review.route && (
                      <div className="text-xs text-gray-400">🚖 {review.route}</div>
                    )}
                    <div className="text-xs text-gray-400">{formatDate(review.date)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DeleteReviewButton id={review.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
