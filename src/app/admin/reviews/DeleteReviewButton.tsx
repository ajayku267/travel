"use client";

import { deleteReview } from "./actions";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteReviewButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    setLoading(true);
    await deleteReview(id);
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
    >
      <Trash2 size={13} />
    </button>
  );
}
