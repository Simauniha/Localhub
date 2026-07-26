import { Link } from "react-router-dom";
export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/listings?category=${category.id}`}
      className={`chip block rounded-2xl p-6 text-white bg-gradient-to-br ${category.color} shadow-lg`}
    >
      <div className="text-4xl">{category.icon}</div>
      <div className="mt-3 font-bold text-lg">{category.name}</div>
    </Link>
  );
}
