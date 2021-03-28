export default function UserIdPage({ id }) {
  return <h1>{id}</h1>;
}

export async function getServerSideProps({ params }) {
  const userId = params.uid;

  return {
    props: {
      id: "userId-" + userId,
    },
  };
}
