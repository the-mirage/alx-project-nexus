const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-12 px-10">
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md text-center">
        <div className="text-2xl sm:text-3xl font-bold text-[#42121b] mb-1">
          500+
        </div>
        <div className="text-sm sm:text-base text-gray-600">Products</div>
      </div>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md text-center">
        <div className="text-2xl sm:text-3xl font-bold text-[#42121b] mb-1">
          50K+
        </div>
        <div className="text-sm sm:text-base text-gray-600">
          Happy Customers
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md text-center">
        <div className="text-2xl sm:text-3xl font-bold text-[#42121b] mb-1">
          24/7
        </div>
        <div className="text-sm sm:text-base text-gray-600">Support</div>
      </div>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md text-center">
        <div className="text-2xl sm:text-3xl font-bold text-[#42121b] mb-1">
          Free
        </div>
        <div className="text-sm sm:text-base text-gray-600">
          Shipping (goods over $50)
        </div>
      </div>
    </div>
  );
};
export default QuickStats;
