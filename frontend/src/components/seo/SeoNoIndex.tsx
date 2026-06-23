type SeoNoIndexProps = {
  title: string;
  description?: string;
};

const SeoNoIndex = ({ title, description }: SeoNoIndexProps) => {
  return (
    <>
      <title>{`${title} - BookHive`}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
};

export default SeoNoIndex;
