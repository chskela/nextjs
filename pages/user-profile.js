export default function UserProfilePage({ username }) {
  return <h1>{username}</h1>;
}

export const getServerSideProps = async (context) => {
  console.log(context.params);
  return {
    props: {
      username: "Max",
    },
  };
};
