import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import React from "react";

const OurCourses = () => {
  return (
    <div className="container flex justify-center flex-col">
      {/* heading */}
      <Heading size="lg" className="text-center">
        OUR COURSES
      </Heading>

      {/* subtitle */}
      <Text className="text-center mt-4">
        Explore a wide range of subjects from the basics to advanced
        applications, develop essential skills, and grow through interactive
        lessons and real-world projects designed by NineEdu’s team of educators
        and experts.
      </Text>

      {/* button */}
      <Button className="mx-auto mt-4">Explore all</Button>
    </div>
  );
};

export default OurCourses;
