"use client";

import { markInquiryResponded } from "./actions";
import { useState } from "react";

interface Props {
  id: string;
  responded: boolean;
}

export default function MarkRespondedButton({ id, responded }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await markInquiryResponded(id, !responded);
    setLoading(false);
  }

  if (responded) {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-3 py-1.5 bg-gray-100 text-gray-500 font-semibold rounded-lg text-sm ml-auto hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {loading ? "..." : "Mark Pending"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-3 py-1.5 bg-gray-100 text-gray-600 font-semibold rounded-lg text-sm ml-auto hover:bg-gray-200 transition-colors disabled:opacity-50"
    >
      {loading ? "..." : "Mark Responded"}
    </button>
  );
}
