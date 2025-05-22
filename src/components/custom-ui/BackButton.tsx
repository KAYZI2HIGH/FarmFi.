'use client'
import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const BackButton = ({ className }: ButtonProps) => {
  const router = useRouter()
  return (
    <button onClick={() => {
      router.back()
    }} className={cn("font-extrabold cursor-pointer",className)}>
      <ArrowLeft className=''/>
    </button>
  )
}

export default BackButton