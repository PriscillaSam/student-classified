export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return <h1>Title: {slug}</h1>;
}

export async function generateStaticParams() {
  return [{ slug: "how-to-code" }, { slug: "angular-vs-react" }];
}
