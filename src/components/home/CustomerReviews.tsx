import Link from "next/link";
import { db } from "@/lib/db";
import StarRating from "@/components/ui/StarRating";
import { CheckCircle, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function CustomerReviews() {
  const reviews = await db.review.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const allReviews = await db.review.findMany({ select: { rating: true } });
  const avgRating = allReviews.length > 0
    ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    : 4.8;

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50" id="reviews">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="badge badge-yellow mb-3">Customer Reviews</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 section-title">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <StarRating rating={avgRating} size={22} />
            <span className="text-2xl font-black text-gray-900">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-gray-500">/ 5.0 Average Rating</span>
          </div>
          <p className="text-gray-500 mt-2">Based on 500+ genuine customer reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="review-card group">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-black text-lg shadow-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900">{review.name}</span>
                      {review.verified && (
                        <CheckCircle size={15} className="text-green-500" />
                      )}
                    </div>
                    <div className="text-gray-500 text-xs">{review.location}</div>
                  </div>
                </div>
                {/* Google G */}
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-xs font-black text-blue-600">G</span>
                </div>
              </div>

              {/* Stars */}
              <StarRating rating={review.rating} size={16} className="mb-3" />

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                &ldquo;{review.review}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                {review.route && (
                  <span className="badge badge-yellow text-xs">
                    🚖 {review.route}
                  </span>
                )}
                <span className="text-xs text-gray-400 ml-auto">
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all"
          >
            Read All Reviews <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
