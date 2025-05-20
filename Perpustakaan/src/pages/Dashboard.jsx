import StatCard from '../components/StatCard'
import ActivityTable from '../components/ActivityTable'

export default function Dashboard() {
  return (
    <div className="pt-24 px-4 sm:px-6 md:px-8 bg-gray-100 min-h-screen text-gray-800 w-screen overflow-x-hidden box-border">
      
      <h1 className="text-2xl font-semibold mb-6">
        Selamat datang 👋
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Buku" value="1234" />
        <StatCard title="Anggota" value="512" />
        <StatCard title="Peminjaman Hari Ini" value="18" />
      </div>

      {/* Activity table */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          <ActivityTable />
        </div>
      </div>
      
    </div>
  )
}
