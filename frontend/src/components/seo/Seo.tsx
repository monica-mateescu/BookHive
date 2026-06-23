type SeoProps = {
  title: string;
  description?: string;
};

const Seo = ({ title, description }: SeoProps) => {
  return (
    <>
      <title>{`BookHive - ${title}`}</title>
      <meta
        name="description"
        content={
          description?.slice(0, 120) ??
          "Discover online book clubs, connect with readers, and join meaningful reading discussions."
        }
      />
    </>
  );
};

export default Seo;
