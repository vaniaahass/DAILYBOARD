import { simpanCatatanKeStorage, muatCatatanDariStorage } from "./storage.js";
import { validasiInput } from "./tugas.js";

// MINGGU 8 : FITUR CATATAN CEPAT (NOTES)
const seccatatan = document.createElement ("section");
const judulcatatan = document.createElement ("h3");

judulcatatan.textContent = "Catatan";
seccatatan.appendChild (judulcatatan);

const textareaCatatan = document.createElement ("textarea");
seccatatan.appendChild (textareaCatatan);

const tombolCatatan = document.createElement ("button");
tombolCatatan.textContent = "Tambah Catatan";
seccatatan.appendChild (tombolCatatan);

const daftarCatatanEl = document.createElement ("div");
daftarCatatanEl.id = "daftar-catatan";
seccatatan.appendChild (daftarCatatanEl);

tombolCatatan.addEventListener ("click", () => {
    if (textareaCatatan.value.trim () === "") return;

    tambahCatatan (textareaCatatan.value);
    textareaCatatan.value = "";
});

let daftarCatatan = [];

function tambahCatatan (isi) {
    if (!validasiInput (isi)) return;

    daftarCatatan.push ({
        id: Date.now (),
        isi,
        tanggal: new Date ().toLocaleDateString ()
    });

    simpanCatatanKeStorage (daftarCatatan);
    renderCatatan ();
}

function hapusCatatan (id) {
    daftarCatatan = daftarCatatan.filter ((c) => c.id !== id);
    simpanCatatanKeStorage (daftarCatatan);
    renderCatatan ();
}

function renderCatatan () {
    const container = document.getElementById ("daftar-catatan");
    container.innerHTML = "";

    daftarCatatan.forEach ((catatan) => {
        const div = document.createElement ("div");
        div.className = "catatan-item";

        div.innerHTML = `
            <p>${catatan.isi}</p>
            <small>${catatan.tanggal}</small>
        `;

        const tombolHapusCatatan = document.createElement ("button");
        tombolHapusCatatan.textContent = "Hapus";
        tombolHapusCatatan.className = "hapus-catatan";

        tombolHapusCatatan.addEventListener ("click", (e) => {
            e.stopPropagation ();
            hapusCatatan (catatan.id);
        });

        div.appendChild (tombolHapusCatatan);

        div.addEventListener ("dblclick", () => {
            const isiBaru = prompt ("Edit catatan:", catatan.isi);

            if (isiBaru !== null && validasiInput (isiBaru)) {
                editCatatan (catatan.id, isiBaru);
            }
        });

        container.appendChild (div);
    });
}

// MINGGU 9 : EDIT CATATAN
function editCatatan (id, isiBaru) {
    daftarCatatan = daftarCatatan.map ((c) =>
        c.id === id ? { ...c, isi: isiBaru } : c
    );

    simpanCatatanKeStorage (daftarCatatan); 
    renderCatatan ();
}


function initCatatan () {
    daftarCatatan = muatCatatanDariStorage ();
    renderCatatan ();
}

export { seccatatan, daftarCatatan, tambahCatatan, hapusCatatan, editCatatan, renderCatatan, initCatatan };