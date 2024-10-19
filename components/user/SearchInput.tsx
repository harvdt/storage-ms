import React, { ChangeEvent, FormEvent } from 'react';
import { IoSearch } from "react-icons/io5";

import { cn } from '../../utils/lib/cn';

type SearchInputProps = {
  placeholder?: string;
  searchStyles?: string;
  containerStyles?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent) => void;
};

const SearchInput = ({
  placeholder,
  searchStyles,
  containerStyles,
  value,
  onChange,
  onSubmit,
}: SearchInputProps) => {
  return (
    <div className={cn(
      "flex items-center px-4",
      "h-10 w-[80rem] rounded-lg bg-white opacity-50",
      "focus-within:opacity-100 transition-opacity duration-300",
      containerStyles,
    )}>
      <form
        className={cn("flex-grow")}
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit(e);
        }}
      >
        <input
          type="text"
          className={cn(
            "w-full bg-transparent focus:outline-none",
            "text-gray-900 font-bold font-lexend",
            searchStyles,
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange} 
        />
      </form>

      <IoSearch className={cn("h-6 w-6 flex-shrink-0 ml-4 text-black")} />
    </div>
  );
};

export default SearchInput;
