import { StarIcon } from "../icons/index.jsx";
export default function ReviewCard({ review }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div className="font-bold">{review.user}</div>
        <div className="text-xs text-slate-500">{review.date}</div>
      </div>
      <div className="flex mt-1 text-amber-500 gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className={"w-4 h-4 " + (i < review.rating ? "text-amber-500" : "text-slate-300 dark:text-slate-600")} />
        ))}
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
    </div>
  );
}
