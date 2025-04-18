import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";
import { BsInboxes, BsTelephone, BsTwitterX } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { IoLocationOutline, IoPersonCircleOutline, IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";

export const IconList = {
    instagram: FaInstagram,
    facebook: FaFacebook,
    x: BsTwitterX,
    tiktok: FaTiktok,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    location: SlLocationPin,
    phone: BsTelephone,
    email: TfiEmail,
    profile: IoPersonCircleOutline,
    wallet: IoWalletOutline,
    wishlist: IoMdHeartEmpty,
    purchases: BsInboxes,
    addresses: IoLocationOutline,
    settings: IoSettingsOutline
}

export type IconName = keyof typeof IconList;
