import React from "react";
import YoutubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white p-8">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="flex flex-col space-y-6">
            <div className="text-3xl font-bold">PP</div>
            <div className="flex space-x-4">
              <a
                href="https://x.com/chappellroan?lang=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon className="text-xl cursor-pointer hover:text-gray-400" />
              </a>
              <a
                href="https://www.instagram.com/chappellroan/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="text-xl cursor-pointer hover:text-gray-400" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=GR3Liudev18"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeIcon className="text-xl cursor-pointer hover:text-gray-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/chappell-roan-140578322/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="text-xl cursor-pointer hover:text-gray-400" />
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-lg pb-5">Pink Pony Facts</h3>
            <a href="#" className="hover:text-gray-400">
              Birthplace
            </a>
            <a href="#" className="hover:text-gray-400">
              Origin
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-lg pb-5">Terms & Conditions</h3>
            <a href="#" className="hover:text-gray-400">
              Terms
            </a>
            <a href="#" className="hover:text-gray-400">
              Conditions
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-lg pb-5">Fair Use</h3>
            <a href="#" className="hover:text-gray-400">
              Use this is you want
            </a>
            <a href="#" className="hover:text-gray-400">
              We made this though
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-lg pb-5">Missouri S&T</h3>
            <a href="#" className="hover:text-gray-400">
              Go Miners
            </a>
            <a href="#" className="hover:text-gray-400">
              St. Pat's is awesome
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-sm">©️ 2025 Pink Pony Club LLC</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
