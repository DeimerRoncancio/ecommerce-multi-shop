import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";

export default function ProtectedAuth() {
  const [loading, setLoading] = useState(false);
  const cookie = Cookies.get("accessHome");
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://multi-shop-api-76abbcfe5b70.herokuapp.com/app/users/token-validation/${cookie}`,
      )
      .then(() => {})
      .catch(() => {
        redirect("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : (
        <Outlet />
      )}
    </>
  );
}
