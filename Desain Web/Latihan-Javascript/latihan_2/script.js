const data = {};
const hitung = document.querySelector(".hitung");
const ulang = document.querySelector(".ulang");
const harga = {
  Jakarta: {
    Eksekutif: 70000,
    Bisnis: 40000,
    Ekonomi: 10000,
  },
  Solo: {
    Eksekutif: 80000,
    Bisnis: 50000,
    Ekonomi: 20000,
  },
  Surabaya: { Eksekutif: 90000, Bisnis: 60000, Ekonomi: 30000 },
};

hitung.addEventListener("click", setTampil);
ulang.addEventListener("click", setUlang);

function setTampil() {
  data.nama = document.querySelector("#nama").value;
  data.tujuan = document.querySelector("#tujuan").value;
  data.kelas = document.querySelector("#kelas").value;
  data.jumlahTiket = Number(document.querySelector("#jumlah-tiket").value);
  data.member = document.querySelector('input[name="member"]:checked');
  if (document.querySelector('input[name="member"]:checked') === null) {
    data.member = false;
  } else {
    data.member = true;
  }
  const totalBayar = setTotalBayar(
    harga,
    data.member,
    data.tujuan,
    data.jumlahTiket,
    data.kelas
  );

  const diskon = data.member === true ? `10%` : `0%`;

  document.querySelector(".output-harga").textContent = `Rp ${
    harga[data.tujuan][data.kelas]
  }`;
  document.querySelector(".output-subTotal").textContent = `Rp ${
    harga[data.tujuan][data.kelas] * data.jumlahTiket
  }`;
  document.querySelector(".output-diskon").textContent = diskon;
  document.querySelector(".output-tBayar").textContent = `Rp ${totalBayar}`;
}

function setTotalBayar(harga, member, tujuan, jumlahTiket, kelas) {
  const baseHarga = harga[tujuan][kelas];
  if (member === true) {
    const sum = baseHarga * 0.9 * jumlahTiket;
    return sum;
  } else {
    const sum = baseHarga * jumlahTiket;
    return sum;
  }
}

function setUlang() {
  document.querySelector(".output-harga").textContent = "";
  document.querySelector(".output-subTotal").textContent = "";
  document.querySelector(".output-diskon").textContent = "";
  document.querySelector(".output-tBayar").textContent = "";
  document.querySelector("#nama").value = "";
  document.querySelector("#tujuan").value = "Jakarta";
  document.querySelector("#kelas").value = "Eksekutif";
  document.querySelector("#jumlah-tiket").value = "";
  const checkedStatus = document.querySelector('input[name="member"]:checked');
  if (checkedStatus) {
    checkedStatus.checked = false;
  }
}
