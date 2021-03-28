import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function HomePage({ products }) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>
          <Link href={`/products/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const data = await fs.readFile(filePath, "utf-8");
  const { products } = JSON.parse(data);

  if (!products) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  if (products.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};
