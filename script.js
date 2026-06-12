let keranjang = 0;

// Menampilkan Buku
function tampilkanBuku(data) {
    const container = document.getElementById("bookContainer");

    container.innerHTML = "";

    data.forEach((buku) => {

        container.innerHTML += `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">

            <img
                src="${buku.gambar}"
                alt="${buku.judul_buku}"
                class="w-full h-80 object-cover">

            <div class="p-4">

                <h2 class="font-bold text-lg mb-2">
                    ${buku.judul_buku}
                </h2>

                <p><b>Penulis:</b> ${buku.penulis}</p>
                <p><b>Penerbit:</b> ${buku.penerbit}</p>
                <p><b>Genre:</b> ${buku.genre}</p>

                <p class="text-green-600 font-bold mt-2">
                    Rp ${buku.harga.toLocaleString()}
                </p>

                <p class="mb-3">
                    Stok:
                    <span class="font-semibold">
                        ${buku.stok_buku}
                    </span>
                </p>

                ${
                    buku.stok_buku > 0
                    ?
                    `<button
                        onclick="tambahKeranjang(${buku.id})"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
                        Masukkan Keranjang
                    </button>`
                    :
                    `<button
                        disabled
                        class="bg-red-500 text-white px-4 py-2 rounded w-full cursor-not-allowed">
                        Stok Habis
                    </button>`
                }

            </div>

        </div>
        `;
    });
}

// Filter Genre
function filterGenre(genre) {
    const hasil = bukuData.filter(
        buku => buku.genre === genre
    );

    tampilkanBuku(hasil);
}

// Search
document.getElementById("search").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const hasil = bukuData.filter(buku =>

        buku.judul_buku.toLowerCase().includes(keyword) ||
        buku.penulis.toLowerCase().includes(keyword) ||
        buku.penerbit.toLowerCase().includes(keyword)

    );

    tampilkanBuku(hasil);
});

// Keranjang
function tambahKeranjang(id) {

    const buku = bukuData.find(
        item => item.id === id
    );

    if (buku && buku.stok_buku > 0) {

        buku.stok_buku--;
        keranjang++;

        document.getElementById("cartCount").innerText = keranjang;

        tampilkanBuku(bukuData);

    } else {

        alert("Stok Buku Habis!");

    }
}

// Tampilkan pertama kali
tampilkanBuku(bukuData);