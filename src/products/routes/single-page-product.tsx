import { Route } from "./+types/single-page-product";

export async function loader({ params }: Route.LoaderArgs) {
  return params;
}

export default function SinglePageProduct({ loaderData }: Route.ComponentProps) {
  const { id } = loaderData;
  
  return (
    <div>
      <h2>
        {id}
      </h2>
    </div>
  )
}
