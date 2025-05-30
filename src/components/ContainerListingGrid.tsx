import React from 'react'
import ProduceListingGrid from './ProduceListingGrid';
import { getAllProduce } from '@/lib/actions';

const ContainerListingGrid = async ({ query, filter }: { query: string, filter: string }) => {
  const crops = await getAllProduce();
  return (
    <ProduceListingGrid
      query={query}
      crops={crops}
      filter={filter}
    />
  );
}

export default ContainerListingGrid