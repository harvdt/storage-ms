import Link from 'next/link';

import { cn } from '../../utils/lib/cn';

export default function Index() {
  return (
    <main className={cn("flex justify-center items-center min-h-screen")}>
      <div className={cn(
        "h-[32rem] w-[28rem] rounded-xl bg-white",
        "flex flex-col items-center",
      )}>
        <p className={cn(
          "text-main font-dm_serif_display text-center text-4xl",
          "[text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)] pt-10 ",
        )}>
          Halo,
        </p>
        <p className={cn(
          "text-main font-dm_serif_display text-center text-4xl",
          "[text-shadow:_5px_5px_4px_rgb(0_0_0_/_0.25)] px-16"
        )}>
          Selamat Datang di OSMS
        </p>

        
        <div className="flex items-center px-10 mt-8">
          <div className="h-3 w-3 bg-main rounded-full"></div>
          <div className="h-[2px] w-96 bg-main rounded-tr-lg rounded-br-lg"></div>
        </div>

        <div className={cn("flex justify-center items-center flex-col gap-y-10 mt-12")}>
          <Link
            href="/"
            className={cn(
              "h-12 w-60 bg-gradient-to-r from-main to-secondary rounded-lg [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]",
              "text-white font-lexend text-lg flex justify-center items-center"
            )}
          >
            User
          </Link>

          <Link
            href="/login"
            className={cn(
              "h-12 w-60 bg-gradient-to-r from-main to-secondary rounded-lg [box-shadow:_0px_4px_4px_rgb(0_0_0_/_0.50)]",
              "text-white font-lexend text-lg flex justify-center items-center"
            )}
          >
            Admin
          </Link>
        </div>
      </div>
    </main>
  );
}