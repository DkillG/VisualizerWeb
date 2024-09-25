'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PointDTO } from "@/types/point";
import { IoFingerPrint } from "react-icons/io5";
import { BASE_IMAGE_URL } from "@/shared/constants";

const Room = ({ points }: { points: PointDTO[] }) => {

  const ref = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<PointDTO | null>(null);

  useEffect(() => {

    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenu(null);
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return <div className="relative">
    <Image src={BASE_IMAGE_URL} alt="White kitchen image base" width={1240} height={873} />


    {menu && (
      <div
        ref={ref}
        className="absolute bg-black/50 p-2 rounded-md"
        style={{ left: `${menu.coords[0] + 4}%`, top: `${menu.coords[1] + 2}%` }}
      >
        Test
      </div>
    )}


    {points.map((point, i) => (
      <button
        key={i}
        onClick={() => setMenu(point)}
        style={{ left: `${point.coords[0]}%`, top: `${point.coords[1]}%` }}
        className="absolute text-2xl hover:scale-110 p-1 bg-zinc-800/40 rounded-full border border-zinc-300 ease-in-out duration-200"
      >
        <IoFingerPrint />
      </button>
    ))}
  </div>
}

export default Room;