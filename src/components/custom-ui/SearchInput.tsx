'use client'
import React from 'react'
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import FormReseButton from './FormResetBtn';

const SearchInput = ({ query }: { query: string }) => {
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const searchQuery = formData.get("query") as string;
    router.push(`/account/marketplace?query=${encodeURIComponent(searchQuery)}`);
  };
  return (
    <Form
      action={handleSubmit}
      className="relative max-w-[680px] w-full search_form"
    >
      <Input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="What produce do you want to search for?"
        className="py-6 text-lg w-full bg-transparent border border-black shadow max-md:text-base focus-visible:border-black focus-visible:ring-black/50  "
      />
      <div className="flex gap-2 items-center justify-center absolute right-3 top-1/2 transform -translate-y-1/2">
        {query && <FormReseButton />}

        <button
          type="submit"
          className=" cursor-pointer"
        >
          <Search className=" h-5 w-5" />
        </button>
      </div>
    </Form>
  );
}

export default SearchInput