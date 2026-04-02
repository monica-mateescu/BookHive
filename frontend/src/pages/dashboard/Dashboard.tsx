const Dashboard = () => {
  return (
    <div className="flex h-screen flex-col items-center gap-5">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      <p className="text-gray-600">This is a protected area for admins only.</p>
    </div>
  );
};

export default Dashboard;
