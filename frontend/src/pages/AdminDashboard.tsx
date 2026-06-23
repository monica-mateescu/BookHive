import { SeoNoIndex } from "@/components/seo";

const Dashboard = () => {
  return (
    <>
      <SeoNoIndex
        title="Admin dashboard"
        description="Admin dashboard for managing books and clubs."
      />

      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="mt-2 text-(--gray-primary)">
        This is a protected area for admins only.
      </div>
    </>
  );
};

export default Dashboard;
