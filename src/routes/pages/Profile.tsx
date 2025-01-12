import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "../../types/user";

export default function Profile() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    profileImage: {
      id: "",
      imageId: "",
      imageUrl: "",
      name: "",
    },
    secondName: "",
    lastnames: "",
    phoneNumber: 0,
    gender: "",
    admin: false,
    enabled: false,
  });

  useEffect(() => {
    const token = Cookies.get("accessHome");

    axios
      .get(
        `https://multi-shop-api-76abbcfe5b70.herokuapp.com/app/users/get-user/${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  return (
    <>
      <h2>Profile</h2>
      <h2>{user.name}</h2>
      <img src={user.profileImage?.imageUrl} alt="" />
    </>
  );
}
