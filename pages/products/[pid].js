import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

export default function ProductDetailPage({ product }) {
  if (!product) {
    return <p>Loading...</p>;
  }

  const { title, description } = product;

  return (
    <Fragment>
      <h1>{title}</h1>
      <p>{description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const data = await fs.readFile(filePath, "utf-8");
  const { products } = JSON.parse(data);
  return products;
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getData();
  const paths = data.map(({ id }) => ({ params: { pid: id } }));
  return {
    paths,
    // paths: [{ params: { pid: "p1" } }],
    fallback: true,
  };
};
