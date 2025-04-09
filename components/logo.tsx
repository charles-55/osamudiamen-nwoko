import { Mountain } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full">
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
      </div>
      <span className="font-bold">Osamudiamen</span>
    </Link>
  )
}

