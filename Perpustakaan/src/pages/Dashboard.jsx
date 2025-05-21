import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import ActivityTable from '../components/ActivityTable';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({ buku: 0, anggota: 0, peminjaman: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };

    // Ambil total buku
    const bukuReq = axios.get('http://45.64.100.26:88/perpus-api/public/api/buku', { headers });
    // Ambil total member
    const memberReq = axios.get('http://45.64.100.26:88/perpus-api/public/api/member', { headers });
    // Ambil total peminjaman
    const pinjamReq = axios.get('http://45.64.100.26:88/perpus-api/public/api/peminjaman', { headers });

    Promise.all([bukuReq, memberReq, pinjamReq])
      .then(([bukuRes, memberRes, pinjamRes]) => {
        setStats({
          buku: Array.isArray(bukuRes.data) ? bukuRes.data.length : (bukuRes.data?.data?.length || 0),
          anggota: Array.isArray(memberRes.data) ? memberRes.data.length : (memberRes.data?.data?.length || 0),
          peminjaman: Array.isArray(pinjamRes.data) ? pinjamRes.data.length : (pinjamRes.data?.data?.length || 0),
        });
      })
      .catch(() => setStats({ buku: 0, anggota: 0, peminjaman: 0 }));
  }, []);

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-8 bg-gray-100 min-h-screen text-gray-800 w-screen overflow-x-hidden box-border">
      <h1 className="text-2xl font-semibold mb-6">
        Selamat datang 👋
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Buku" value={stats.buku} />
        <StatCard title="Anggota" value={stats.anggota} />
        <StatCard title="Peminjaman Hari Ini" value={stats.peminjaman} />
      </div>
      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          <ActivityTable />
        </div>
      </div>
    </div>
  );
}
