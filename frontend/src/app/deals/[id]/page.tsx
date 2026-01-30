import { fetchDealById } from "../../../lib/api";
import Link from "next/link";
import { Deal } from "../../../types/deal";
import ClaimDealButton from "../../../components/ClaimDealButton";

interface Props {
  params: { id: string };
}

export default async function DealDetailsPage({ params }: Props) {
  const deal: Deal | null = await fetchDealById(params.id);

  if (!deal) {
    return (
      <main className="min-h-screen">
        <div className="container py-24 text-center">
          <h1 className="text-2xl font-semibold mb-4">
            Deal not available
          </h1>
          <p className="opacity-70 mb-6 max-w-md mx-auto">
            This deal may be inactive, locked, or no longer exists.
          </p>
          <Link
            href="/deals"
            className="inline-block rounded-md bg-[var(--accent)] px-6 py-3 text-white font-medium hover:opacity-90 transition"
          >
            Back to Deals
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container py-14 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {deal.title}
        </h1>

        <p className="opacity-60 mb-8">
          Partner: {deal.partnerName}
        </p>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
          <p className="leading-relaxed opacity-80">
            {deal.description}
          </p>

          {deal.accessLevel === "locked" && (
            <div className="mt-6 rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-400">
              🔒 {deal.eligibilityText || "Verification required"}
            </div>
          )}

          <ClaimDealButton
            dealId={deal._id}
            locked={deal.accessLevel === "locked"}
          />
        </div>
      </div>
    </main>
  );
}
