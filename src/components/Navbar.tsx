import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="md:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
        Menu
      </button>

      <div
        className={`fixed inset-0 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        {/* Menu Content */}
        <ul className="space-y-4 p-8">
          <li>Dashboard</li>
          <li>Injury Aid Tool</li>
          <li>Personal Info</li>
          <li>Community Forum</li>
          <li>Subscription</li>
          <li>Suggestions History</li>
          <li>Help</li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-between items-center p-4 bg-gray-800 text-white">
        <div>Injurney</div>
        {/* Desktop Menu Items */}
        <ul className="flex space-x-4">
          <li>Dashboard</li>
          <li>Injury Aid Tool</li>
          <li>Personal Info</li>
          <li>Community Forum</li>
          <li>Subscription</li>
          <li>Suggestions History</li>
          <li>Help</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
