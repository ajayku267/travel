import Link from "next/link";
import { Phone, Mail, CheckCircle, Clock } from "lucide-react";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import MarkRespondedButton from "./MarkRespondedButton";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await db.contactInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 font-black">🚖</div>
            <div>
              <div className="font-bold">Haryana Taxi — Admin</div>
              <div className="text-xs text-gray-400">Contact Inquiries</div>
            </div>
          </div>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-white">← Dashboard</Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-gray-900">Contact Inquiries</h1>
          <div className="flex gap-2">
            <span className="badge bg-green-100 text-green-700 text-xs">
              {inquiries.filter((i) => i.responded).length} Responded
            </span>
            <span className="badge bg-orange-100 text-orange-700 text-xs">
              {inquiries.filter((i) => !i.responded).length} Pending
            </span>
          </div>
        </div>

        {inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="text-4xl mb-3">📭</div>
            <div className="font-bold text-gray-900 mb-1">No inquiries yet</div>
            <div className="text-sm text-gray-500">Contact form submissions will appear here.</div>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-black">
                      {inquiry.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{inquiry.name}</div>
                      <div className="text-xs text-gray-500">{formatDate(inquiry.createdAt.toISOString())}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {inquiry.responded ? (
                      <span className="badge bg-green-100 text-green-700 text-xs flex items-center gap-1">
                        <CheckCircle size={11} /> Responded
                      </span>
                    ) : (
                      <span className="badge bg-orange-100 text-orange-700 text-xs flex items-center gap-1">
                        <Clock size={11} /> Pending
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <span className="badge badge-yellow text-xs">{inquiry.subject}</span>
                </div>

                <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 mb-4">
                  {inquiry.message}
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-gray-900 font-bold rounded-lg text-sm"
                  >
                    <Phone size={13} /> {inquiry.phone}
                  </a>
                  {inquiry.email && (
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 font-semibold rounded-lg text-sm"
                    >
                      <Mail size={13} /> {inquiry.email}
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${inquiry.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-green-500 text-white font-bold rounded-lg text-sm"
                  >
                    💬 WhatsApp
                  </a>
                  <MarkRespondedButton id={inquiry.id} responded={inquiry.responded} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
