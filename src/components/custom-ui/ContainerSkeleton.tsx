import { getAllProduce } from '@/lib/actions';
import React from 'react'
import ProduceListingGrid from '../ProduceListingGrid';

const ProduceContainer = async({
  filter,
  query,
}: {
  filter: string;
  query: string;
  }) => {
    const crops = await getAllProduce();
  return (
    <ProduceListingGrid
      query={query}
      crops={crops}
      filter={filter}
    />
  );
};

export default ProduceContainer