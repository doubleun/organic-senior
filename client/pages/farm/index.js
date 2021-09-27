import Layout from "../layout/_layout";

export default function Farm() {
  return (
    <div>
      <h1>FARMMMM</h1>
    </div>
  );
}

Farm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
