"use client";
import { AnimatePresence, motion } from "framer-motion";
import ProduceCard from "./custom-ui/ProduceCard";

const ProduceListingGrid = ({
  filter,
  crops,
  query,
}: {
  filter: string;
  crops: Crop[];
  query: string;
}) => {
  const filteredCrops = query
    ? crops.filter(
        (crop) =>
          crop.category === filter &&
          crop.name.toLowerCase().includes(query?.toLowerCase())
      )
    : crops.filter((crop) => crop.category === filter);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-14 gap-y-8 place-items-center">
      <AnimatePresence>
        {filteredCrops.length ? (
          filteredCrops.map((crop, idx) => (
            <motion.div
              key={`${crop.name}-${idx}`}
              custom={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.05,
                type: "spring",
                damping: 15,
              }}
              exit={{ opacity: 0, y: 20 }}
            >
              <ProduceCard crop={crop} />
            </motion.div>
          ))
        ) : (
          <motion.h3
            className="col-span-5 text-center py-10 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No listings available. Check back later.
          </motion.h3>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProduceListingGrid;
