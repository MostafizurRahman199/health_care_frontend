import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-[#181c1c] tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-[#3e4947] mt-1">
          System overview, management controls, and platform metrics.
        </p>
      </header>

      {/* Placeholder stats grid to make it look premium and meaningful */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#bdc9c6]/40 shadow-sm">
          <h2 className="text-sm font-semibold text-[#3e4947]">Total Doctors</h2>
          <p className="text-3xl font-bold text-[#005c55] mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#bdc9c6]/40 shadow-sm">
          <h2 className="text-sm font-semibold text-[#3e4947]">Active Patients</h2>
          <p className="text-3xl font-bold text-[#005c55] mt-2">148</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#bdc9c6]/40 shadow-sm">
          <h2 className="text-sm font-semibold text-[#3e4947]">Today's Appointments</h2>
          <p className="text-3xl font-bold text-[#005c55] mt-2">24</p>
        </div>
      </div>
    </div>
  );
}
