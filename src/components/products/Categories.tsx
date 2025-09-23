const Categories = ({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  const categories = ["All", "T-Shirts", "Hoodies", "Dresses", "Bags"];

  return (
    <ul className="flex justify-around gap-4 bg-[#e8a812]/8 rounded-md py-1 mb-4">
      {categories.map((category) => (
        <li
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`cursor-pointer px-3 py-2 rounded-md transition-colors ${
            activeCategory === category
              ? "text-white bg-[#e8a812]"
              : "text-gray-600 hover:text-black hover:bg-[#e8a812]/30"
          }`}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};
export default Categories;
