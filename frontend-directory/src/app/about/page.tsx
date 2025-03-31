import Image from "next/image"


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">Pink Pony Club</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Route Generator
              </a>
              <a href="#" className="bg-gray-200 px-3 py-1 rounded-md text-gray-700 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-2">

            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Routes Generated */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-medium uppercase text-gray-700">ROUTES GENERATED</h3>
              <p className="text-5xl font-bold mt-2">1,592</p>
              <p className="text-gray-500 mt-2">3.6 hours | 683 miles</p>
            </div>

            {/* Money Saved */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-medium uppercase text-gray-700">MONEY SAVED</h3>
              <p className="text-5xl font-bold mt-2">$2953</p>
              <p className="text-gray-500 mt-2">3.6 hours | 683 miles</p>
            </div>

            {/* Users Helped */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-medium uppercase text-gray-700">USERS HELPED</h3>
              <p className="text-5xl font-bold mt-2">163</p>
              <p className="text-gray-500 mt-2">3.6 hours | 643</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Are We Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-gray-200 p-6 rounded-lg w-full md:w-64 h-32 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-400 rounded-t-full transform rotate-180"></div>
                <div className="w-16 h-16 flex mt-2">
                  <div className="w-8 h-8 bg-gray-400"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">Who Are We?</h2>
              <p className="text-gray-500 mt-1">subtitle</p>
              <p className="mt-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p className="mt-4 text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Do We Do Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
            <div className="bg-gray-200 p-6 rounded-lg w-full md:w-64 h-32 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-400 rounded-t-full transform rotate-180"></div>
                <div className="w-16 h-16 flex mt-2">
                  <div className="w-8 h-8 bg-gray-400"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">What Do We Do?</h2>
              <p className="text-gray-500 mt-1">subtitle</p>
              <p className="mt-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p className="mt-4 text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Do We Do It Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-gray-200 p-6 rounded-lg w-full md:w-64 h-32 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-400 rounded-t-full transform rotate-180"></div>
                <div className="w-16 h-16 flex mt-2">
                  <div className="w-8 h-8 bg-gray-400"></div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">How Do We Do It?</h2>
              <p className="text-gray-500 mt-1">subtitle</p>
              <p className="mt-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p className="mt-4 text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}