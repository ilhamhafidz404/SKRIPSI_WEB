"use client";
import { useDashboard } from "@/hooks/dashboard/useDashboard";

export default function DashboardPage() {


  const { data, isLoading, error } = useDashboard();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading dashboard</p>;

  return (
    <div className="space-y-6">
      {/* Header Sapaan */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getGreeting()}, User! 👋
        </h1>
        <p className="text-gray-500">Berikut adalah ringkasan performa Anda hari ini.</p>
      </div>

      {/* Dashboard Grid */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Card Total User */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Total Users</span>
            <div className="p-2 bg-blue-50 rounded-lg dark:bg-blue-900/20">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{data?.data?.total_user}</h2>
          <p className="text-sm text-green-600 mt-1 font-medium">+12.5% <span className="text-gray-400">vs bulan lalu</span></p>
        </div>

        {/* Card Total Product */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 transition-all hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Total Products</span>
            <div className="p-2 bg-purple-50 rounded-lg dark:bg-purple-900/20">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{data?.data?.total_product}</h2>
          <p className="text-sm text-green-600 mt-1 font-medium">+4.3% <span className="text-gray-400">vs bulan lalu</span></p>
        </div>
      </section>
    </div>
  );
}
