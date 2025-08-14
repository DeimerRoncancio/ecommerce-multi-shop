import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Breadcrumb({ namePage, isProduct }: { namePage: string, isProduct?: boolean }) {
  const [paths, setPaths] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const paths = location.pathname.split("/");
    setPaths(paths);
  }, [location])

  return (
    <div className="bg-[#fff4ef]">
      <div className="ajust-width flex justify-between items-center py-5">
        <h1 className="text-2xl font-semibold">{namePage}</h1>
        <div className="breadcrumbs text-sm">
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

                if (isProduct == true)
                  return (<li key={path} className="capitalize">{namePage}</li>)

                return (<li key={path} className="capitalize">{path}</li>)
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
