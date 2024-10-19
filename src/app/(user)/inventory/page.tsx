'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { FaWarehouse } from "react-icons/fa";
import { FaFilter } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

import SearchInput from '../../../../components/user/SearchInput';
import { cn } from '../../../../utils/lib/cn';

const items = Array(40).fill({
  name: "Nama Barang",
  location: "Gudang ATK",
  image: "/images/pulpen.png"
});

const storages = [
  {
    name: "Gudang ATK",
    location: "TSO Manyar",
  },
  {
    name: "Gudang Merch",
    location: "TSO Manyar",
  },
  {
    name: "Gudang 3",
    location: "TSO Manyar",
  },
  {
    name: "Gudang 4",
    location: "TSO Manyar",
  },
  {
    name: "Gudang 5",
    location: "TSO Manyar",
  },
  {
    name: "Gudang 6",
    location: "TSO Manyar",
  },
]

export default function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  return (
    <main>
      <div className={cn("flex justify-between w-[80rem]")}>
        <SearchInput
          placeholder="Cari Kategori"
          containerStyles="w-[76rem]"
        />

        <button onClick={toggleModal}>
          <FaFilter
            size={42}
            className={cn("opacity-50 hover:opacity-100")}
          />
        </button>
      </div>

      <div className={cn(
        "mt-6 rounded-lg h-[40rem] w-[80rem] relative flex flex-col justify-center",
      )}>
        <div className={cn(
          "absolute inset-0 bg-white rounded-lg opacity-50",
          "z-[-1]"
        )}></div>

        <div className={cn(
          "p-4 h-full overflow-auto",
          "grid grid-cols-7 gap-5",
        )}>
          {items.map((item, index) => (
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
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className={cn("fixed inset-0 bg-black bg-opacity-20 flex justify-end pr-6 pt-36 z-50")}
          onClick={handleOverlayClick}
        >
          <div className={cn("bg-white pt-4 pl-4 rounded-lg h-[25rem] w-80")}>
            <button onClick={toggleModal}>
              <ImCancelCircle className={cn("text-main text-3xl cursor-pointer",)}/>
            </button>

            <div className={cn("h-[21rem] overflow-y-auto")}>
              {storages.map((item, index) => (
                <div key={index} className={cn(
                  "rounded-lg h-28 w-[18rem] my-2",
                  "bg-gradient-to-b from-main to-secondary flex items-center pl-8",
                )}>
                  <FaWarehouse size={40} />

                  <div className={cn("mx-4")}>
                    <p className={cn("font-lexend font-bold text-xl")}>
                      {item.name}
                    </p>
                    
                    <p className={cn("font-lexend")}>
                      {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
