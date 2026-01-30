export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="h-4 w-2/3 bg-neutral-700 rounded mb-3" />
      <div className="h-3 w-full bg-neutral-700 rounded mb-2" />
      <div className="h-3 w-5/6 bg-neutral-700 rounded" />

      <div className="mt-6 flex justify-between items-center">
        <div className="h-3 w-24 bg-neutral-700 rounded" />
        <div className="h-3 w-16 bg-neutral-700 rounded" />
      </div>
    </div>
  );
}
