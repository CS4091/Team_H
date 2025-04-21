import Image from 'next/image';
// import FileUpload from '../components/FileUpload';
// import ResultsDisplay from '../components/ResultsDisplay';
// import { TSPResult } from '../api/tspClient';
import FlightIcon from '@mui/icons-material/Flight';
import Features from "./components/Features";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section id="home" className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Find the Most Efficient Route for your Trip!
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Make your life easier by finding the optimal route for your trip with our minimalist approach.
              </p>
              <div className="flex space-x-4">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
                  <Link href="/sign-in">
                    Get Started
                  </Link>
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition">
                  <Link href="/about">
                    Learn More
                  </Link>
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image 
                width={906}
                height={512}
                src="/PlaneOverCity.png" 
                alt="A plane flying over a city" 
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      <div style={{overflow: "hidden", position: "absolute", width: "100%", height: "100%", top: 0, left: 0, zIndex: "-1"}}>
        <FlightIcon style={{position: "absolute", animation: "glide1 7.5s ease-in-out infinite", rotate: "110deg",
          left: "-70px", top: "80px", fontSize: "80px", opacity: "70%", zIndex: "-1" }} />
      </div>
      <Features />
    </>
  );
}
