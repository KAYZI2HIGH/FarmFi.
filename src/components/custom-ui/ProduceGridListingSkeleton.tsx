import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProduceGridListingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-14 gap-y-8 place-items-center">
      {Array.from({ length: 10 }).map((_, idx) => (
        <Skeleton key={idx} className="h-[150px] w-full bg-black/20" />
      ))}
    </div>
  )
}

export default ProduceGridListingSkeleton