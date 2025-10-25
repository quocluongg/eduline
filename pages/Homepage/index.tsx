import React from "react";
import Banner from "./Banner";
import Stats from "./Stats";
import NewAndReasearch from "./NewAndResearch";
import SuccessStories from "./SuccessStories";
import News from "./News";
import Marquee from "./Marquee";

const Homepage = () => {
  return (
    <div className="w-full flex flex-col gap-20 lg:py-10 py-4">
      {/* banner */}
      <Banner />

      {/* certificate */}
      <Stats />

      {/* stories */}
      <SuccessStories />

      {/* our courses */}
      <News />

      {/* news */}
      <NewAndReasearch />

      <Marquee />
    </div>
  );
};

export default Homepage;
