const biodata = {};
const submit = document.querySelector(".submit");
const reset = document.querySelector(".reset");
const display = document.querySelector(".container-output");

submit.addEventListener("click", getBiodata);
reset.addEventListener("click", () => {
  resetForm();
});

function getBiodata() {
  display.style.display = "block";

  biodata.nim = document.querySelector("#nim").value.trim() || "N/A";
  biodata.nama = document.querySelector("#nama").value.trim() || "N/A";
  biodata.kelamin = document.querySelector("#kelamin").value || "N/A";
  biodata.agama = document.querySelector("#agama").value || "N/A";

  const checkedStatus = document.querySelector('input[name="status"]:checked');
  biodata.status = checkedStatus ? checkedStatus.value : "N/A";

  biodata.jurusan = document.querySelector("#jurusan").value.trim() || "N/A";
  biodata.komentar = document.querySelector("#komentar").value.trim() || "N/A";

  displayBiodata();
}

function resetForm() {
  document.querySelector("#nim").value = "";
  document.querySelector("#nama").value = "";
  document.querySelector("#kelamin").value = "Laki-laki";
  document.querySelector("#agama").value = "Islam";
  const checkedStatus = document.querySelector('input[name="status"]:checked');
  if (checkedStatus) {
    checkedStatus.checked = false;
  }
  document.querySelector("#jurusan").value = "";
  document.querySelector("#komentar").value = "";

  display.style.display = "none";

  for (const key in biodata) {
    biodata[key] = "";
  }
}

function displayBiodata() {
  display.innerHTML = "";
  const table = document.createElement("table");
  const hr = document.createElement("hr");

  const rows = [
    createRow("NIM", biodata.nim),
    createRow("Nama Mahasiswa", biodata.nama),
    createRow("Jenis Kelamin", biodata.kelamin),
    createRow("Agama", biodata.agama),
    createRow("Status", biodata.status),
    createRow("Jurusan di UNJ", biodata.jurusan),
    createRow("Komentar", biodata.komentar),
  ];

  rows.forEach((row) => table.appendChild(row));

  display.appendChild(hr);
  display.appendChild(table);
}

function createRow(label, value) {
  const row = document.createElement("tr");

  const labelCell = document.createElement("td");
  labelCell.textContent = label;

  const valueCell = document.createElement("td");
  valueCell.textContent = value;

  row.appendChild(labelCell);
  row.appendChild(valueCell);

  return row;
}
