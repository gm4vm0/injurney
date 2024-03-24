import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu */}
      <button
        className="text-lg ml-11 mt-11 md:hidden text-highlight"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>

      <div
        className={`fixed inset-0 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <ul className="p-8 space-y-4">
          <li>
            <Link
              href="/"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/injury"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Injury Aid
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/forum"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Forum
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Subscriptions
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Suggestions History
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Help
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <div className="items-center justify-between hidden p-4 text-white bg-gray-800 md:flex">
        <div>Injurney</div>
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/injury"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Injury Aid
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/forum"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Forum
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Subscriptions
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Suggestions History
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="hover:text-gray-300 hover:underline active:text-gray-400"
            >
              Help
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
