'use client'
import { getAllProduce } from '@/lib/actions';
import React from 'react'
import ProduceListingGrid from '../ProduceListingGrid';
import { useQuery } from '@tanstack/react-query';
import ProduceGridListingSkeleton from './ProduceGridListingSkeleton';

const ProduceContainer =({
  filter,
  query,
}: {
  filter: string;
  query: string;
  }) => {
    const {
        data: crops,
        isLoading,
  } = useQuery({ queryKey: ["produce"], queryFn: () => getAllProduce() });
  
  if (isLoading) {
    return <ProduceGridListingSkeleton/>
  }
  return (
    <ProduceListingGrid
      query={query}
      crops={crops!}
      filter={filter}
    />
  );
};

export default ProduceContainer