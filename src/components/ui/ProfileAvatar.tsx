import { FC } from "react"
import { Avatar } from "@mui/material";
interface TaskCardProps {
  alt: string
  name: string,
}

export const avatarMap: Record<string, string> = {
  bear: "/images/avatars/bear.png",
  cat: "/images/avatars/cat.png",
  dog: "/images/avatars/dog.png",
  koala: "/images/avatars/koala.png",
  meerkat: "/images/avatars/meerkat.png",
  panda: "/images/avatars/panda.png",
  rabbit: "/images/avatars/rabbit.png",
};

export const ProfileAvatar: FC<TaskCardProps> = ({ alt, name }) => {
  const src = avatarMap[name] || "/avatars/default.png";

  return (
    <Avatar alt={alt} src={src} />
  )
}

export default ProfileAvatar;