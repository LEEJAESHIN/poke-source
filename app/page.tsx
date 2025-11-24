import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main
        className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-cover bg-no-repeat dark:bg-black sm:items-start"
        style={{ backgroundPosition: '51% 70%' }}
      >

        <div className="flex w-full items-center justify-center mb-8">
          <Image src="/PokeSrc_logo.png" alt="PokéSrc Logo" width={300} height={100} priority />
        </div>
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <form action="/search" method="get">
            <Input
              name="q"
              className="bg-white rounded-full px-6 py-3 pl-12 w-full"
              placeholder="포켓몬 이름 초성을 검색하세요."
            />
          </form>
        </div>
      </main>
    </div>
  );
}
