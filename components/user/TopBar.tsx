import { BsCart3 } from "react-icons/bs";

import { cn } from "../../utils/lib/cn"

const TopBar = () => {
  return (
    <div className={cn("bg-white px-6 py-1 flex justify-between")}>
      <div>
        <p className={cn("font-bold text-black font-lexend text-xl")}>
          OSMS
        </p>

        <p className={cn("text-black font-lexend -mt-2 text-sm")}>
          Office Storage Management System
        </p>
      </div>
      
      <button className={cn("flex justify-center items-center")}>
        <BsCart3
          className={cn("text-main")}
          size={24}
        />
      </button>
    </div>
  )
}

export default TopBar