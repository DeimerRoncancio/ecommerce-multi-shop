import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Breadcrumb() {
  const [paths, setPaths] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const paths = location.pathname.split("/");
    setPaths(paths);
  }, [location])

  return (
    <ul>
      {
        paths.map((path, index) => {
          if (index !== paths.length - 1) {
            return (
              <li key={path}><a className="capitalize" href={`http://localhost:5173/${path}`}>
                {
                  path === "" ? "Inicio" : path
                }
              </a></li>
            )
          }

          return (<li key={path} className="capitalize">{path}</li>)
        })
      }
    </ul>
  )
}
