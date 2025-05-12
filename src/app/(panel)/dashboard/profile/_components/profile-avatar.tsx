"use client";

import Image from "next/image";
import { useState } from "react";
import defaultUserImage from "../../../../../../public/foto1.png";
import { Upload } from "lucide-react";

interface AvatarProfileProps {
  avatarUrl: string | null;
  userId: string;
}

export function AvatarProfile({ avatarUrl, userId }: AvatarProfileProps) {
  const [previewImage, setPreviewImage] = useState(avatarUrl);

  return (
    <div className="relative w-40 h-40 md:w-48 md:h-48">
      <div className="relative flex items-center justify-center w-full h-full">
        <span className="absolute cursor-pointer z-[2] bg-slate-50/80 p-2 rounded-full shadow-xl">
          <Upload size={16} color="#131313" />
        </span>

        <input
          type="file"
          className="opacity-0 cursor-pointer relative z-50 w-48 h-48"
        />
      </div>

      {previewImage ? (
        <Image
          src={previewImage}
          alt="Foto de perfil da clínica"
          fill
          className="w-full h-48 object-cover rounded-full bg-slate-200"
          quality={100}
          priority
          sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 60vw"
        />
      ) : (
        <Image
          src={defaultUserImage}
          alt="Foto de perfil da clínica"
          fill
          className="w-full h-48 object-cover rounded-full bg-slate-200"
          quality={100}
          priority
          sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 60vw"
        />
      )}
    </div>
  );
}
