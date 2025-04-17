import { UserInitialValues } from "../helpers/users-initial-values.helper";
import useGetUser from "../../shared/hooks/api/useGetUser";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import Cookies from "js-cookie";
import { Outlet, useLocation } from "react-router";

export default function ProfilePage() {
  const [user, setUser] = useState<User>(UserInitialValues);
  const location = useLocation();
  const { getUser } = useGetUser();

  useEffect(() => {
    const token = Cookies.get("accessHome");

    console.log(location)

    getUser(token).then(res => {
      setUser(res.data);
    });
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="flex w-full bg-[#fff4ef]">
        <div className="breadcrumbs text-sm">
          <ul>
            <li><a>Home</a></li>
            <li><a>Documents</a></li>
            <li>Add Document</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
