import { getAllProduce } from '@/lib/actions';
import React from 'react'
import ProduceCard from './custom-ui/ProduceCard';
import { getRandomItems } from '@/utils/getRandomItems';

const ExploreMoreCommodities = async () => {
  const crops = await getAllProduce()

  if (!crops || crops.length === 0) {
    return <div className="text-center text-gray-500">No crops available</div>;
  }

  const randomCrops = getRandomItems(crops, 4);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-14 gap-y-8 place-items-center">
      {randomCrops.map((crop, idx) => {
        if (idx < 4) {
          return (
            <div key={`${crop.name}-${idx}`}>
              <ProduceCard crop={crop} />
            </div>
          );
        }
      })}
    </div>
  );
}

export default ExploreMoreCommodities

export const revalidate = 5