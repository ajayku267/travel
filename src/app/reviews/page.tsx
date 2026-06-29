import type { Metadata } from "next";
import { db } from "@/lib/db";
import StarRating from "@/components/ui/StarRating";
import { CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: `Customer Reviews | ${settings.companyName} — 4.8★ Rated`,
    description:
      "Read genuine customer reviews of Go Nainital. 4.8 star rated taxi service across Nainital and Delhi NCR. 500+ happy customers.",
  };
}

export default async function ReviewsPage() {
  const reviews = await db.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  const totalRatings = reviews.length;
  const avgRating = totalRatings > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings
    : 4.8;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage: totalRatings > 0
      ? Math.round((reviews.filter((r) => r.rating === star).length / totalRatings) * 100)
      : 0,
  }));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4">
            Customer Reviews
          </span>
          <h1 className="text-4xl font-black text-white mb-4">What Our Customers Say</h1>
          <p className="text-gray-300 text-lg">
            Genuine reviews from thousands of satisfied customers across Nainital &amp; Delhi NCR
          </p>
        </div>
      </section>

      {/* Rating Overview */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
            {/* Average */}
            <div className="text-center flex-shrink-0">
              <div className="text-7xl font-black text-gray-900">{avgRating.toFixed(1)}</div>
              <StarRating rating={avgRating} size={24} className="justify-center my-2" />
              <div className="text-gray-500">{totalRatings} Reviews</div>
              <div className="mt-2">
                <div className="w-20 h-20 bg-blue-50 border-4 border-blue-500 rounded-full flex items-center justify-center mx-auto mt-3">
                  <span className="font-black text-blue-600 text-lg">G</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Google Rating</div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="flex-1 w-full">
              {ratingBreakdown.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3 mb-2">
                  <div className="text-sm text-gray-600 w-4">{star}</div>
                  <StarRating rating={star} size={14} />
                  <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-500 w-8">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {reviews.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No reviews yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-black text-lg">
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-900">{review.name}</span>
                          {review.verified && (
                            <CheckCircle size={14} className="text-green-500" />
                          )}
                        </div>
                        <div className="text-gray-500 text-xs">{review.location}</div>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-xs font-black text-blue-600">G</span>
                    </div>
                  </div>

                  <StarRating rating={review.rating} size={15} className="mb-3" />

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    &ldquo;{review.review}&rdquo;
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    {review.route && (
                      <span className="badge badge-yellow text-xs">🚖 {review.route}</span>
                    )}
                    <span className="text-xs text-gray-400 ml-auto">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Leave review CTA */}
      <section className="py-16 px-4 bg-yellow-400">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            Traveled with Us? Share Your Experience!
          </h2>
          <p className="text-gray-800 mb-6">
            Your review helps other travelers make the right choice.
          </p>
          <a
            href="https://wa.me/918392986174?text=Hi! I want to share my review for Go Nainital"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl"
          >
            💬 Share Review on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
