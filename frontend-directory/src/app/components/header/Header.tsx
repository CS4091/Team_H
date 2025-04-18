import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeaderDropdownMenu from "./HeaderDropdownMenu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface HeaderProps {
  authenticated: boolean;
  displayActions: boolean;
}

const Header: React.FC<HeaderProps> = ({ authenticated, displayActions }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-white py-4 px-20 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold">PP</div>
          <Link
            href="/"
            className="text-2xl font-semibold globals-text-shadow select-none cursor-pointer hover:text-gray-500 active:text-gray-700"
          >
            Pink Pony Club
          </Link>
        </div>

        {displayActions && (
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              {/*
              <Link
                href="/route-generator"
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Route Generator
              </Link>
              */}
              <Link href="/about" className="hover:text-gray-500">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-500">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              {authenticated ? (
                <>
                  <div className="w-[36px] h-[36px] bg-green-100 rounded-full mr-[-6px]" />
                  <ExpandMoreIcon
                    className={`hover:text-gray-400 active:text-gray-300 ${
                      dropdownIsOpen ? "text-gray-400 active:text-gray-400" : ""
                    }`}
                    sx={{ transform: "scaleX(1.1)" }}
                    onClick={() => {
                      setDropdownIsOpen(!dropdownIsOpen);
                    }}
                  />
                  <HeaderDropdownMenu
                    ref={dropdownRef}
                    isOpen={dropdownIsOpen}
                  />
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-1 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
