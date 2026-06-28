"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "./actions";

export default function StatusSelect({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 disabled:opacity-50"
      defaultValue={currentStatus}
      disabled={isPending}
      onChange={(e) => {
        const newStatus = e.target.value;
        startTransition(() => {
          updateBookingStatus(id, newStatus);
        });
      }}
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
