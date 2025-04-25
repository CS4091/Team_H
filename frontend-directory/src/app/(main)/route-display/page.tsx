// NOTE: THIS PAGE AND 'route-display' DIRECTORY SHOULD BE MOVED UNDER AUTH ONCE FINISHED

import Image from "next/image";
import Link from "next/link";

export default function RouteDisplayPage() {
  const tripSteps = [
    { city: "Atlanta", region: "Georgia, USA" },
    { city: "St. Louis", region: "Missouri, USA" },
    { city: "Amsterdam", region: "Netherlands" },
    { city: "Tokyo", region: "Japan" },
    { city: "Toronto", region: "Ontario, Canada" },
  ];

  return (
    <>
      <div className="flex flex-row gap-1 h-[89.5svh]">
        <nav className="h-[89.5svh] w-[12%] bg-gray-300 border-2 border-solid border-2 border-solid">
          SIDEBAR PLACEHOLDER
        </nav>

        <div className="w-full max-w-[88%] h-[89.5svh] gap-1 flex flex-col">
          <div className="w-full h-[71%] flex flex-row gap-1">
            {/* Map Section */}
            <div className="rounded-lg border-2 border-solid w-full h-full bg-red-100">
              GOOGLE MAPS PLACEHOLDER
            </div>

            {/* Trip Stats Section */}
            <div className="w-1/3 p-3 justify-between flex flex-col bg-white rounded-lg border-2 border-solid">
              <div className="font-bold text-[34px] text-center leading-[1.1] pt-2">
                “Goated Trip” from Atlanta to Boston
              </div>
              <div className="flex flex-col gap-2">
                <div className="border-2 border-solid rounded-lg p-2 text-center">
                  💲
                  <div className="h-[14px]" />
                  Estimated Total Cost:
                  <br />
                  $1208.28
                </div>
                <div className="border-2 border-solid rounded-lg p-2 text-center">
                  💲
                  <div className="h-[14px]" />
                  Estimated Total Cost:
                  <br />
                  $1208.28
                </div>
                <div className="border-2 border-solid rounded-lg p-2 text-center">
                  💲
                  <div className="h-[14px]" />
                  Estimated Total Cost:
                  <br />
                  $1208.28
                </div>
              </div>
              <div className="border-2 border-solid rounded-lg p-1 text-center italic text-gray-500 text-[12px]">
                Route Generation Date:
                <br />
                May 17th, 2025
              </div>
            </div>
          </div>

          {/* LocationCard Navigation Section */}
          <div className="w-auto h-[29%] rounded-lg border-2 border-solid p-6 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-full">
              <button
                className="text-2xl px-2 text-gray-400 hover:text-gray-600"
                aria-label="Previous"
              >
                &#8592;
              </button>
              <div className="flex gap-[4px]">
                {tripSteps.map((step, idx) => (
                  <div
                    key={step.city}
                    className="flex flex-col items-center w-[120px]"
                  >
                    <div
                      className={`rounded-full w-10 h-10 flex items-center justify-center font-semibold
                    ${
                      idx === 2
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    >
                      {step.city[0]}
                    </div>
                    <div className="text-xs mt-1 text-center">
                      <div>{step.city}</div>
                      <div className="text-gray-400 italic">{step.region}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="text-2xl px-2 text-gray-400 hover:text-gray-600"
                aria-label="Next"
              >
                &#8594;
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center mt-12">
              <span className="w-3 h-3 rounded-full bg-gray-400 mx-1"></span>
              <span className="w-24 h-1 bg-gray-400 mx-1"></span>
              <span className="w-3 h-3 rounded-full bg-gray-400 mx-1"></span>
              <span className="w-24 h-1 bg-gray-400 mx-1"></span>
              <span className="w-3 h-3 rounded-full bg-blue-600 mx-1"></span>
              <span className="w-24 h-1 bg-gray-300 mx-1"></span>
              <span className="w-3 h-3 rounded-full bg-gray-300 mx-1"></span>
              <span className="w-24 h-1 bg-gray-300 mx-1"></span>
              <span className="w-3 h-3 rounded-full bg-gray-300 mx-1"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
