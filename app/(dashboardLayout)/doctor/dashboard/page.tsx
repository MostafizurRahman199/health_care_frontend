import React from "react";

export default function DoctorDashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-[#181c1c] tracking-tight">Doctor Dashboard</h1>
        <p className="text-sm text-[#3e4947] mt-1">
          Access your schedules, manage appointments, and review patient prescriptions.
        </p>
      </header>

      {/* Placeholder stats grid to make it look premium and meaningful */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#bdc9c6]/40 shadow-sm">
          <h2 className="text-sm font-semibold text-[#3e4947]">My Appointments</h2>
          <p className="text-3xl font-bold text-[#005c55] mt-2">8 Today</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#bdc9c6]/40 shadow-sm">
          <h2 className="text-sm font-semibold text-[#3e4947]">Pending Approvals</h2>
          <p className="text-3xl font-bold text-[#005c55] mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#bdc9c6]/40 shadow-sm">
          <h2 className="text-sm font-semibold text-[#3e4947]">Completed Sessions</h2>
          <p className="text-3xl font-bold text-[#005c55] mt-2">124</p>
        </div>
      </div>
    </div>
  );
}
