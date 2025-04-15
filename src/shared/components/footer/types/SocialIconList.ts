import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";

export const SocialIconList = {
    instagram: FaInstagram,
    facebook: FaFacebook,
    x: BsTwitterX,
    tiktok: FaTiktok,
    youtube: FaYoutube,
    linkedin: FaLinkedin
}

export type SocialIconName = keyof typeof SocialIconList;
