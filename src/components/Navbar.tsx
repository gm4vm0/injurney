import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu */}
      <button className="md:hidden p-4" onClick={() => setIsOpen(!isOpen)}>
        Menu
      </button>

      <div
        className={`fixed inset-0 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <ul className="space-y-4 p-8">
          <li>
            <Link href="/" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Dashboard
            </Link>
          </li>
          <li>
            <Link href="/injury" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Injury Aid
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Profile
            </Link>
          </li>
          <li>
            <Link href="/forum" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Forum
            </Link>
          </li>
          <li>
            <Link href="/"  className="hover:text-gray-300 hover:underline active:text-gray-400">
                Subscriptions
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Suggestions History
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Help
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-between items-center p-4 bg-gray-800 text-white">
        <div>Injurney</div>
        <ul className="flex space-x-6">
        <li>
            <Link href="/" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Dashboard
            </Link>
          </li>
          <li>
            <Link href="/injury" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Injury Aid
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Profile
            </Link>
          </li>
          <li>
            <Link href="/forum" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Forum
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Subscriptions
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Suggestions History
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-300 hover:underline active:text-gray-400">
                Help
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
