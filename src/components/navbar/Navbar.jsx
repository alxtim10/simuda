const Navbar = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="shadow-xs text-md absolute w-fit flex items-center justify-center gap-5 bg-gray-300 py-2 px-5  rounded-full backdrop-blur-sm">
        <h1 className="cursor-pointer transition-all hover:text-gray-500">Home</h1>
        <h1 className="cursor-pointer transition-all hover:text-gray-500">Gallery</h1>
        <h1 className="cursor-pointer transition-all hover:text-gray-500">About</h1>
      </div>
    </section>
  );
};

export default Navbar;
