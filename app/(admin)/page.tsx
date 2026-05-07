"use client";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { IconChartTrending, IconCube, IconPerson, IconShieldCheck } from "@intentui/icons";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Data dummy untuk visualisasi tren autentikasi
const chartData = [
  { name: "Mon", value: 400 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 280 },
  { name: "Fri", value: 590 },
  { name: "Sat", value: 320 },
  { name: "Sun", value: 410 },
];

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C0202A] border-t-transparent" />
    </div>
  );

  return (
    <div className="min-h-screen animate-[fadeUp_0.8s_ease-out] space-y-8 pb-20 px-4">

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C0202A] mb-2">System Overview</p>
          <h1 className="text-3xl font-light tracking-tight text-slate-900 md:text-4xl">
            Analytics <span className="font-bold">Command</span> Center
          </h1>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 shadow-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-[11px] font-bold tracking-wider text-slate-600 uppercase">Live Blockchain Nodes</span>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={data?.data?.total_user} icon={<IconPerson />} trend="+12%" isPrimary={false} />
        <StatCard label="Products Auth" value={data?.data?.total_product} icon={<IconCube />} trend="+5%" isPrimary={true} />
        <StatCard label="Security Logs" value="842" icon={<IconShieldCheck />} trend="Secure" isPrimary={false} />
        <StatCard label="Uptime" value="99.9%" icon={<IconChartTrending />} trend="Optimal" isPrimary={false} />
      </section>

      {/* --- REFINED CHART SECTION --- */}
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_15px_50px_rgba(0,0,0,0.03)] transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">Authentication Traffic</h3>
            <p className="text-sm text-slate-400 font-medium">Weekly product verification activity on blockchain</p>
          </div>
          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-900">Weekly</button>
            <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600">Monthly</button>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C0202A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#C0202A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '12px' }}
                cursor={{ stroke: '#C0202A', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#C0202A"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend, isPrimary }: any) {
  return (
    <div className={`group relative overflow-hidden rounded-[28px] border p-7 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1 ${isPrimary ? 'bg-white border-[#C0202A]/20' : 'bg-white border-slate-200'
      }`}>
      <div className="flex items-center justify-between mb-6">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all duration-300 ${isPrimary ? 'bg-[#C0202A] text-white shadow-[0_8px_20px_rgba(192,32,42,0.3)]' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white'
          }`}>
          {icon}
        </div>
        <span className={`text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full ${isPrimary ? 'bg-[#C0202A]/10 text-[#C0202A]' : 'bg-slate-100 text-slate-400'
          }`}>{trend}</span>
      </div>
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1">{label}</h3>
        <p className="text-4xl font-light tracking-tighter text-slate-900">{value ?? "0"}</p>
      </div>
    </div>
  );
}