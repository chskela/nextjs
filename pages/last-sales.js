import useSWR from "swr";
import { useState, useEffect } from "react";

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const { data, error } = useSWR(
    "https://nextjs-course-24fe0-default-rtdb.europe-west1.firebasedatabase.app/sales.json",
    (url) =>
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          return Object.keys(data).map((id) => ({
            id,
            ...data[id],
          }));
        })
  );

  useEffect(() => {
    if (data) {
      setSales(data);
    }
  }, [data]);

  if (error) {
    return <p>Faled to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map(({ id, username, volume }) => (
        <li key={id}>
          {username} - ${volume}
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async (ctx) => {
  const sales = await fetch(
    "https://nextjs-course-24fe0-default-rtdb.europe-west1.firebasedatabase.app/sales.json"
  )
    .then((response) => response.json())
    .then((data) =>
      Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }))
    );

  return {
    props: {
      sales,
    },
  };
};
