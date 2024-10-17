import Link from "next/link";
import { ImCancelCircle } from "react-icons/im";

import { cn } from '../../../../utils/lib/cn';

export default function Index() {
  return (
    <main className={cn("flex justify-center items-center min-h-screen")}>
      <div className={cn(
        "h-[32rem] w-[28rem] rounded-xl bg-white relative",
        "flex flex-col items-center",
      )}>
        <Link href="/">
          <ImCancelCircle
            className={cn(
              "text-main absolute top-6 left-7 text-3xl cursor-pointer",
            )}
          />
        </Link>

        <p className={cn(
          "text-main font-dm_serif_display text-center text-4xl",
          "[text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)] mt-4 ",
        )}>
          Login
        </p>
        <p className={cn(
          "text-main font-dm_serif_display text-center text-4xl",
          "[text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)] px-16 mt-4",
        )}>
          OSMS
        </p>

        <div className={cn(
          "h-[18rem] w-[22rem] border-[3px] border-main rounded-xl mt-6",
          "flex flex-col items-center",
        )}>
          <div className={cn(
            "h-14 w-64 rounded-md bg-gradient-to-r from-main to-secondary p-2 mt-6",
            "[box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]",
          )}>
            <p className={cn("text-center font-lexend font-bold text-white text-sm")}>
              Masukkan Username dan Password Anda
            </p>
          </div>

          <form className={cn("mt-6 flex flex-col gap-y-4")}>
            <div>
              <p className={cn("font-bold text-main font-lexend")}>
                Username:
              </p>
              <input
                className={cn(
                  "h-8 w-64 mt-2 rounded-md border-2 border-main focus:border-secondary",
                  "text-main pl-2 font-lexend font-semibold text-sm",
                  "placeholder-red-300",
                )}
                type='text'
                placeholder='Input your username'
              />
            </div>
            
            <div>
              <p className={cn("font-bold text-main font-lexend")}>
                Password:
              </p>
              <input
                className={cn(
                  "h-8 w-64 mt-2 rounded-md border-2 border-main focus:border-secondary",
                  "text-main pl-2 font-lexend font-semibold text-sm",
                  "placeholder-red-300",
                )}
                type='password'
                placeholder='Input your password'
              />
            </div>
          </form>
        </div>

        <button className={cn(
          "h-10 w-60 bg-gradient-to-r from-main to-secondary rounded-xl mt-5",
          "text-white font-lexend font-bold",
          "[box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]",
        )}>
          Login
        </button>
      </div>
    </main>
  );
}