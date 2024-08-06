const Activities = () => {
  return (
    <section className="px-5">
      <div>
        <h1 className="text-xl font-bold">Activities</h1>
        <p className="mt-2 text-sm">
          SIMUDA&apos;s activites to create a bond between each member
        </p>
      </div>

      <div className="grid grid-cols-3 w-full h-48 gap-2 mt-10">
        <div className="bg-gray-400 w-full col-span-2"></div>
        <div className="bg-gray-200 w-full col-span-1"></div>
      </div>
      <div className="grid grid-cols-3 w-full h-40 gap-2 mt-1">
        <div className="bg-gray-200 w-full col-span-1"></div>
        <div className="bg-gray-300 w-full col-span-2"></div>
      </div>
    </section>
  );
};

export default Activities;
