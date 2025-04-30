export default function ProductList() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">List Data Produk</h1>

      <p className="mb-4 border-l-4 border-red-500 bg-red-100 p-4 text-sm text-red-700">
        Halaman Produk ini akan di tampilkan di halaman produk aktif
        <span className="font-bold">
          {" "}
          <br />
          Cara Penggunaannya:
          <br />
          1. Nyalakan switch untuk MEMILIH produk untuk ditampilkan pada halaman
          produk aktif. <br /> (nantinya pada halaman produk aktif akan
          menampilkan produk dan di tampilkan di halaman Pengguna)
          <br />
          <span className="mt-3 block font-bold">
            NB: Jika tidak ada perubahan, harap segarkan (refresh) halaman
            terlebih dahulu.
          </span>
        </span>
      </p>
    </div>
  );
}
