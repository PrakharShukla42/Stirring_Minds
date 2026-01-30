import DealCard from "../../components/DealCard";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { fetchDeals } from "../../lib/api";
import { Deal } from "../../types/deal";

export default async function DealsPage() {
  let deals: Deal[] = [];

  try {
    deals = await fetchDeals();
  } catch {
    return (
      <main className="min-h-screen">
        <div className="container py-12">
          <p className="text-red-400">Failed to load deals.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-3">Available Deals</h1>
        <p className="text-neutral-400 mb-10 max-w-2xl">
          Curated SaaS benefits for startups.
        </p>

        {deals.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <DealCard key={deal._id} deal={deal} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
