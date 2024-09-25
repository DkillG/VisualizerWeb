'use client';

import Image from "next/image";
import { BASE_IMAGE_URL } from "@/shared/constants";

const Room = () => {
  return <div className="relative">
    <Image src={BASE_IMAGE_URL} alt="White kitchen image base" width={1240} height={873} />
  </div>
}

export default Room;