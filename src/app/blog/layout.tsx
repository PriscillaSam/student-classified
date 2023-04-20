export const metadata = {
  title: "Blog",
  description: "Hehhehe",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Blog page header</h1>
      {children}
    </div>
  );
}

export const dynamicParams = false; // true | false,
