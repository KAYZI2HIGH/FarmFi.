import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from "@/lib/utils";

const ProfileAvatar = ({ name, image, className }: { name: string; image: string, className?: string }) => {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={image || ""}
        className={cn("size-10 rounded-full", className)}
      />
      <AvatarFallback>
        {name &&
          name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
