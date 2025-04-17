import { UserInitialValues } from "../helpers/users-initial-values.helper";
import useGetUser from "../../shared/hooks/api/useGetUser";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import Cookies from "js-cookie";
import { Outlet } from "react-router";

export default function ProfilePage() {
  const [user, setUser] = useState<User>(UserInitialValues);
  const { getUser } = useGetUser();

  useEffect(() => {
    const token = Cookies.get("accessHome");

    getUser(token).then(res => {
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <h2>Profile</h2>
      <h2>{user.name}</h2>
      <img src={user.profileImage?.imageUrl} alt="" />
      <Outlet />
    </>
  );
}
