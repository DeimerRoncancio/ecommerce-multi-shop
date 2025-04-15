import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";
import { BsTelephone, BsTwitterX } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";

export const IconList = {
    instagram: FaInstagram,
    facebook: FaFacebook,
    x: BsTwitterX,
    tiktok: FaTiktok,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    location: SlLocationPin,
    phone: BsTelephone,
    email: TfiEmail
}

export type IconName = keyof typeof IconList;
