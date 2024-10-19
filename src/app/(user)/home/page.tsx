'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { FaWarehouse } from "react-icons/fa";

import SearchInput from '../../../../components/user/SearchInput';
import { cn } from '../../../../utils/lib/cn';

const items = Array(20).fill({
  name: "Nama Barang",
  location: "Gudang ATK",
  image: "/images/pulpen.png"
});

const storages = [
  { name: "Gudang ATK", location: "TSO Manyar" },
  { name: "Gudang Merch", location: "TSO Manyar" },
  { name: "Gudang 3", location: "TSO Manyar" },
  { name: "Gudang 4", location: "TSO Manyar" },
  { name: "Gudang 5", location: "TSO Manyar" },
  { name: "Gudang 6", location: "TSO Manyar" }
];

export default function Home() {
  // State to store search input values
  const [itemSearch, setItemSearch] = useState('');
  const [storageSearch, setStorageSearch] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
    item.location.toLowerCase().includes(itemSearch.toLowerCase())
  );

  const filteredStorages = storages.filter(storage =>
    storage.name.toLowerCase().includes(storageSearch.toLowerCase()) ||
    storage.location.toLowerCase().includes(storageSearch.toLowerCase())
  );

  return (
    <main>
      <SearchInput
        placeholder="Cari Barang"
        value={itemSearch}
        onChange={(e) => setItemSearch(e.target.value)}
      />

      <div className={cn(
        "mt-6 rounded-lg h-[23rem] w-[80rem] relative flex justify-center",
      )}>
        <div className={cn(
          "absolute inset-0 bg-white rounded-lg opacity-50",
          "z-[-1]"
        )}></div>

        <div className={cn(
          "p-4 h-full overflow-auto",
          "grid grid-cols-7 gap-5",
        )}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className={cn(
                "rounded-lg h-40 w-40",
                "bg-gradient-to-b from-main to-secondary flex flex-col justify-center items-center",
              )}>
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.name}
                />

                <p className={cn("font-lexend font-bold")}>
                  {item.name}
                </p>

                <p className={cn("font-lexend text-sm")}>
                  {item.location}
                </p>
              </div>
            ))
          ) : (
            <p className={cn("text-center col-span-7")}>No items found</p>
          )}
        </div>
      </div>

      <div className={cn("flex justify-between mt-6")}>
        <p className={cn("font-lexend font-bold text-3xl")}>
          TSO MANYAR
        </p>

        <SearchInput
          placeholder="Cari Gudang"
          value={storageSearch}
          onChange={(e) => setStorageSearch(e.target.value)}
          containerStyles="w-[66rem]"
        />
      </div>

      <div className={cn(
        "mt-6 rounded-lg h-[12rem] w-[80rem] relative flex justify-center",
      )}>
        <div className={cn(
          "absolute inset-0 bg-white rounded-lg opacity-50",
          "z-[-1]"
        )}></div>

        <div className={cn(
          "p-4 h-full overflow-auto",
          "grid grid-cols-4 gap-y-6 gap-x-8",
        )}>
          {filteredStorages.length > 0 ? (
            filteredStorages.map((item, index) => (
              <div key={index} className={cn(
                "rounded-lg h-32 w-72",
                "bg-gradient-to-b from-main to-secondary flex justify-center items-center",
              )}>
                <FaWarehouse size={56} />

                <div className={cn("mx-4")}>
                  <p className={cn("font-lexend font-bold text-xl")}>
                    {item.name}
                  </p>

                  <p className={cn("font-lexend")}>
                    {item.location}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={cn("text-center col-span-4")}>No storages found</p>
          )}
        </div>
      </div>
    </main>
  );
}
