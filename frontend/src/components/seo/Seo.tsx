type SeoProps = {
  title: string;
  description?: string;
  index?: boolean;
};

const Seo = ({ title, description, index = true }: SeoProps) => {
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
      {!index && <meta name="robots" content="noindex, nofollow" />}
    </>
  );
};

export default Seo;
