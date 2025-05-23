import { stats } from "@/lib/constants";
import { AnimatedCounter } from "@/utils/AnimatedCounter";
import React from "react";

const Stats = () => {
  return (
    <section className="px-5 md:px-[50px] py-[50px] md:py-[75px] grid grid-cols-2 md:grid-cols-4 gap-10">
      {stats.map((stat, idx) => (
        <div className="flex flex-col place-items-center" key={idx}>
          <div className="text-[28px] md:text-[35px] font-bold leading-[52px] flex">
            {stat.currency && <p>{stat.currency}</p>}
            <AnimatedCounter
              end={stat.count}
              duration={2}
            />
            <p>{ stat.unit}</p>
          </div>
          <p className="text-[15px] md:text-[17px] font-medium md:leading-[28px] text-center">
           {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Stats;
