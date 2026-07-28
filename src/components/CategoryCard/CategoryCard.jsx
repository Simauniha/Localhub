import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  const IconComponent = category.icon;
  return (
    <Link
      to={`/listings?category=${category.id}`}
      className={`chip block rounded-2xl p-6 text-white bg-gradient-to-br ${category.color} shadow-lg hover:shadow-xl transition-all`}
    >
      <div className="text-3xl">
        {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
      </div>
      <div className="mt-3 font-bold text-lg">{category.name}</div>
    </Link>
  );
}
