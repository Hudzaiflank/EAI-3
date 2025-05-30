-- Drop dan buat ulang database
DROP DATABASE IF EXISTS complaint_db;
CREATE DATABASE complaint_db;
USE complaint_db;

-- Tabel users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- Tabel complaints
CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  status ENUM('open', 'in_progress', 'closed'),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Data dummy users (10 users)
INSERT INTO users (name, email) VALUES 
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com'),
('Charlie', 'charlie@example.com'),
('Dina', 'dina@example.com'),
('Edo', 'edo@example.com'),
('Fika', 'fika@example.com'),
('Gilang', 'gilang@example.com'),
('Hana', 'hana@example.com'),
('Ivan', 'ivan@example.com'),
('Joko', 'joko@example.com');

-- Data dummy complaints (30+ pengaduan)
INSERT INTO complaints (user_id, title, description, status) VALUES
(1, 'Lampu Jalan Mati', 'Lampu depan rumah mati sudah seminggu.', 'open'),
(1, 'Sampah Menumpuk', 'Sampah tidak diangkut selama 3 hari.', 'in_progress'),
(2, 'Pohon Tumbang', 'Ada pohon tumbang menghalangi jalan.', 'closed'),
(3, 'Jalan Berlubang', 'Lubang besar di depan kantor kelurahan.', 'open'),
(2, 'Air Mati', 'Tidak ada air sejak kemarin sore.', 'in_progress'),
(4, 'Trotoar Rusak', 'Trotoar pecah-pecah dan berbahaya.', 'open'),
(5, 'Tumpukan Sampah', 'Sampah menumpuk di belakang pasar.', 'closed'),
(6, 'Lampu Merah Tidak Berfungsi', 'Sangat berbahaya di jam sibuk.', 'open'),
(7, 'Saluran Air Mampet', 'Bau busuk dari got mampet.', 'in_progress'),
(8, 'Tiang Listrik Miring', 'Sepertinya akan roboh.', 'in_progress'),
(9, 'Genangan Air', 'Setiap hujan langsung banjir.', 'open'),
(10, 'Sampah di Sungai', 'Menyebabkan banjir tiap musim hujan.', 'open'),
(1, 'Jalan Licin', 'Bekas oli tumpah tidak dibersihkan.', 'closed'),
(2, 'Tanah Longsor Kecil', 'Terjadi longsor di pinggir jalan.', 'in_progress'),
(3, 'Pagar Roboh', 'Pagar pembatas jalan rusak.', 'closed'),
(4, 'Lampu PJU Redup', 'Kurang terang di malam hari.', 'open'),
(5, 'Siring Hilang', 'Penutup drainase hilang.', 'in_progress'),
(6, 'Tempat Sampah Penuh', 'Belum diambil 5 hari.', 'closed'),
(7, 'Parkir Liar', 'Mengganggu jalan umum.', 'open'),
(8, 'Pedagang di Trotoar', 'Mengganggu pejalan kaki.', 'in_progress'),
(9, 'Kabel Listrik Terjuntai', 'Bahaya untuk anak-anak.', 'open'),
(10, 'Kucing Mati di Jalan', 'Bau menyengat sejak 2 hari lalu.', 'closed'),
(1, 'Atap Halte Bocor', 'Mengganggu penumpang saat hujan.', 'open'),
(2, 'Papan Nama Hilang', 'Tidak ada papan penunjuk jalan.', 'in_progress'),
(3, 'Taman Rusak', 'Tanaman diinjak dan pagar patah.', 'closed'),
(4, 'Pohon Rindang Menghalangi Lampu Jalan', 'Lampu jadi tidak efektif.', 'open'),
(5, 'Trotoar Dijadikan Parkir', 'Sulit bagi pejalan kaki.', 'in_progress'),
(6, 'Sampah di Selokan', 'Penyebab utama banjir kecil.', 'closed'),
(7, 'Kucing Liar di Kantor', 'Mengganggu pengunjung.', 'open'),
(8, 'Tumpukan Material', 'Bahaya di pinggir jalan umum.', 'in_progress'),
(9, 'Lantai Trotoar Licin', 'Mudah terpeleset saat hujan.', 'closed');
