import React, { useEffect, useRef } from "react";
import Beer from "/6pack.webp";
import { Helmet } from "react-helmet";
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
    <>
      <Helmet>
        <title>Coming Soon - Beer</title>
        <meta
          name="description"
          content="Stay tuned for our upcoming beer collection. Coming soon!"
        />
        <meta
          name="keywords"
          content="beer, coming soon, new collection, craft beer"
        />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="Coming Soon - Beer" />
        <meta
          property="og:description"
          content="Stay tuned for our upcoming beer collection. Coming soon!"
        />
        <meta property="og:image" content="/6pack.webp" />
        <meta property="og:url" content="https://6pack.co.nz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Coming Soon - Beer" />
        <meta
          name="twitter:description"
          content="Stay tuned for our upcoming beer collection. Coming soon!"
        />
        <meta name="twitter:image" content="/6pack.webp" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Coming Soon - Beer",
            description:
              "Stay tuned for our upcoming beer collection. Coming soon!",
            image: "/6pack.webp",
            url: "https://6pack.co.nz",
          })}
        </script>
      </Helmet>
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
    </>
  );
}

export default Index;
