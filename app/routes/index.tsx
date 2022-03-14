import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import type { Beverage } from "@prisma/client";

// Import the Prisma client
import db from "~/lib/db.server";

// Each route can define a "loader" function that will be called
// on the server before rendering to provide data to the route.
type LoaderData = { items: Array<Beverage> };
export const loader: LoaderFunction = async () => {
  const data = {
    items: await db.beverage.findMany(),
  };

  return data;
};

export default function IndexRoute() {
  // This hook returns the JSON parsed data from your route loader function.
  const data = useLoaderData<LoaderData>();

  return (
    <>
      {data.items.map((item) => (
        <span key={item.id} style={{ marginRight: "2px" }}>
          {item.name === "coffee" ? <span>🟫</span> : <span>🟦</span>}
        </span>
      ))}
    </>
  );
}
