import React, { useEffect, useRef } from "react";
import Beer from "/6pack.webp";
import VanillaTilt from "vanilla-tilt";
import BlurIn from "../components/blurText";

function Index() {
  const tiltRef = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 10,
      speed: 5,
    });
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center h-dvh w-full bg-zinc-800">
      <div data-tilt ref={tiltRef} className="absolute">
        <div className="relative w-dvw md:w-full h-full">
          <img
            className="w-full h-screen md:h-full object-cover"
            src={Beer}
            alt="Beer"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      </div>
      <BlurIn
        className="absolute bottom-10 md:bottom-auto md:inset-x-0 md:top-1/2 md:transform md:-translate-y-1/2 drop-shadow-lg text-white text-5xl text-center z-10"
        word="Coming Soon"
      />
    </div>
  );
}

export default Index;
