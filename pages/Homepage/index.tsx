import React from "react";
import Banner from "./Banner";
import OurCourses from "./OurCourses";
import Certi from "./Certificate";
import NewAndReasearch from "./NewAndResearch";
import SuccessStories from "./SuccessStories";

const Homepage = () => {
  return (
    <div className="w-full flex flex-col gap-20 py-20">
      {/* banner */}
      <Banner />

      {/* our courses */}
      <OurCourses />

      {/* certificate */}
      <Certi />

      {/* news */}
      <NewAndReasearch />

      {/* stories */}
      <SuccessStories />
    </div>
  );
};

export default Homepage;
