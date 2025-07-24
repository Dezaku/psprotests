import React from "react";

export default function Hero() {
  return (
    <div id="container" className="">
      <main>
        <section id="hero">
          <div className="max-w-full flex justify-center">
            <div className="max-w-6xl flex flex-col gap-6 sm:gap-8 md:gap-16 items-center px-2 sm:px-4 md:px-8 w-full">
              
              {/* Header Section */}
              <div className="flex flex-col gap-9 items-center">
                <div className="flex flex-col gap-5">
                  <h1 className=" tracking-tight text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-center leading-[1] px-2">
                  Discover 🇵🇸Palestine protests near you and beyond.
                  </h1>
                  <h2 className="text-center text-s sm:text-m md:text-lg lg:text-xl font-regular">Witness the global stand for justice and human rights, wherever you are.</h2>
                </div>
                <button className="font-medium bg-orange-500 text-white py-2.5 px-5 sm:py-3 sm:px-6 md:py-[11px] md:px-[22px] w-fit rounded-full text-sm md:text-base hover:bg-orange-600 transition-colors">
                  Submit a Protest
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
