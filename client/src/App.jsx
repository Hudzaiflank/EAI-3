import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintCard from "./components/ComplaintCard";
import DetailCard from "./components/DetailCard";
import UserDetailCard from "./components/UserDetailCard";
import PageHeader from "./components/PageHeader";
import Navigation from "./components/Navigation";
import {
  fetchComplaints,
  fetchComplaintDetail,
  fetchOpenComplaints,
  fetchUserDetail,
  fetchUsers,
} from "./services/api";

function App() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    user_id: "",
    title: "",
    description: "",
    status: "open",
  });

  const fetchData = () => {
    if (page === 1) {
      fetchComplaints().then((data) => setData(data));
    } else if (page === 2) {
      fetchComplaintDetail(5).then((data) => setData(data));
    } else if (page === 3) {
      fetchOpenComplaints().then((data) => setData(data));
    } else if (page === 4) {
      fetchUserDetail(3).then((data) => setData(data));
    } else {
      setData(null);
    }
  };

  const loadUsers = () => {
    fetchUsers().then((users) => {
      if (users) setUsers(users);
    });
  };

  useEffect(() => {
    fetchData();
    if (page === 1) loadUsers();
  }, [page]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mutation = `
      mutation {
        addComplaint(
          user_id: ${form.user_id},
          title: "${form.title}",
          description: "${form.description}",
          status: "${form.status}"
        ) {
          id
          title
        }
      }
    `;

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation }),
    })
      .then((res) => res.json())
      .then((resData) => {
        Swal.fire("Sukses!", "Data pengaduan berhasil ditambahkan!", "success");
        setForm({ user_id: "", title: "", description: "", status: "open" });
        fetchData();
      })
      .catch((err) => {
        Swal.fire("Gagal", "Terjadi kesalahan saat menambahkan", "error");
        console.error(err);
      });
  };

  const getSubjudul = () => {
    switch (page) {
      case 1:
        return "Menampilkan semua pengaduan & tambah data";
      case 2:
        return "Detail pengaduan ID 5";
      case 3:
        return "Pengaduan dengan status open";
      case 4:
        return "Pengaduan milik user tertentu";
      default:
        return "";
    }
  };

  const renderCards = () => {
    if (!data) return <p className="text-gray-300">Tidak ada data.</p>;

    if (Array.isArray(data)) {
      return data.map((item) => (
        <ComplaintCard key={item.id} complaint={item} />
      ));
    } else if (page === 2) {
      return <DetailCard complaint={data} />;
    } else if (page === 4) {
      return <UserDetailCard user={data} />;
    }

    return <p className="text-gray-300">Data tidak dikenali.</p>;
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full flex flex-col items-center">
        <PageHeader page={page} subtitle={getSubjudul()} />

        {page === 1 && (
          <ComplaintForm
            form={form}
            users={users}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}

        {renderCards()}

        <Navigation page={page} setPage={setPage} maxPage={4} />
      </div>
    </div>
  );
}

export default App;
