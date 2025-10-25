import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import React from "react";

const NewAndReasearch = () => {
  return (
    <div className="flex flex-col justify-center container gap-4">
      {/* title  */}
      <Heading className="text-center">NEWS AND RESEARCH INSIGHTS</Heading>

      {/* subtitle */}
      <Text className="text-center">
        Explore the latest courses, hackathons, events, industry news, and job
        trends in technology.
      </Text>

      {/* button */}
      <Button className="bg-[#10069d] text-white mx-auto">Learn more</Button>
    </div>
  );
};

export default NewAndReasearch;
