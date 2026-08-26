import { simpanKeStorage, muatDariStorage } from "./storage.js";

// SECTION TUGAS (menggunakan document.createElement)
const sectugas = document.createElement ("section");
const judultugas = document.createElement ("h3");
judultugas.textContent = "TUGAS";
sectugas.appendChild (judultugas);

const listTugas = document.createElement ("ul");
listTugas.id = "daftar-tugas";
sectugas.appendChild (listTugas);

// FASE 2 : FITUR TO-DO LIST INTERAKTIF
// MINGGU 4 MENAMPILKAN DAFTAR TUGAS
let daftarTugas = [
    { id: 1, nama : "Belajar JavaScript", selesai: false },
    { id: 2, nama : "Olahraga pagi", selesai: false },
];

// MINGGU 5 TAMBAH & HAPUS TUGAS
let nextId = 3;

// MINGGU 6 TANDAI SELESAI & FILTER TUGAS
const tombolSemua = document.createElement ("button");
tombolSemua.textContent = "Semua";
tombolSemua.addEventListener ("click", () => renderTugas ("semua"));

const tombolSelesai = document.createElement ("button");
tombolSelesai.textContent = "Selesai";
tombolSelesai.addEventListener ("click", () => renderTugas ("selesai"));

const tombolBelum = document.createElement ("button");
tombolBelum.textContent = "Belum Selesai";
tombolBelum.addEventListener ("click", () => renderTugas ("belum"));

sectugas.appendChild (tombolSemua);
sectugas.appendChild (tombolSelesai);
sectugas.appendChild (tombolBelum);

let clickTimer = null;

// MINGGU 6 
function renderTugas (filter = "semua") {
    const list = document.getElementById ("daftar-tugas");
    list.innerHTML = "";

    const tugasTersaring = daftarTugas.filter ((t) => {
        if (filter === "selesai") return t.selesai;
        if (filter === "belum") return !t.selesai;
        return true;
    });

    tugasTersaring.forEach ((tugas) => {
    const li = document.createElement ("li");
    li.className = "tugas-item";
    li.dataset.id = tugas.id;
    li.textContent = tugas.nama;
    li.style.textDecoration = tugas.selesai ? "line-through" : "none";

    li.addEventListener ("click", () => {
        if (clickTimer) clearTimeout (clickTimer);
        clickTimer = setTimeout (() => {
            toggleSelesai (tugas.id);
        }, 220);
    });

    li.addEventListener ("dblclick", (e) => {
        e.stopPropagation ();
        clearTimeout (clickTimer);
        const namaBaru = prompt ("Edit tugas:", tugas.nama);

        if (namaBaru !== null && validasiInput (namaBaru)) {
            editTugas (tugas.id, namaBaru);
        }
    });


        const tombolHapus = document.createElement ("button");
        tombolHapus.textContent = "Hapus";

        tombolHapus.addEventListener ("click", (e) => {
            e.stopPropagation ();
            clearTimeout (clickTimer);
            hapusTugas (tugas.id);
        });

        li.appendChild (tombolHapus);
        list.appendChild (li);
    });

    aktifkanDragDrop ();
}

// FASE 3 : LOCALSTORAGE (MINGGU 7) 
function tambahTugas (nama) {
    if (!validasiInput (nama)) return;

    daftarTugas.push ({ id: nextId++, nama, selesai: false });
    simpanKeStorage (daftarTugas); 
    renderTugas ();
}

function hapusTugas (id) {
    daftarTugas = daftarTugas.filter ((t) => t.id !== id);
    simpanKeStorage (daftarTugas);
    renderTugas ();
}

function toggleSelesai (id) {
    daftarTugas = daftarTugas.map ((t) =>
        t.id === id ? { ...t, selesai: !t.selesai } : t
    );

    simpanKeStorage (daftarTugas); //>>
    renderTugas ();
}

// MINGGU 9 : EDIT DATA & VALIDASI INPUT
function editTugas (id, namaBaru) {
    daftarTugas = daftarTugas.map ((t) =>
        t.id === id ? { ...t, nama: namaBaru } : t
    );

    simpanKeStorage (daftarTugas); //>>
    renderTugas ();
}

function validasiInput (nilai) {
    if (nilai.trim () === "") {
        alert ("Input tidak boleh kosong!");
        return false;
    }

    if (nilai.length > 100) {
        alert ("Input maksimal 100 karakter!");
        return false;
    }

    return true;
}

// MINGGU 13 : DRAG AND DROP
function aktifkanDragDrop () {
    const items = document.querySelectorAll (".tugas-item");
    const list = document.getElementById ("daftar-tugas");

    items.forEach ((item) => {
        item.setAttribute ("draggable", true);

        item.addEventListener ("dragstart", (e) => {
            clearTimeout (clickTimer);
            e.dataTransfer.setData ("text/plain", item.dataset.id);
            e.dataTransfer.effectAllowed = "move";

            setTimeout (() => item.classList.add ("dragging"), 0);
        });

        item.addEventListener ("dragend", () => {
            item.classList.remove ("dragging");
            items.forEach ((i) => i.classList.remove ("drag-over"));
        });

        item.addEventListener ("dragenter", (e) => {
            e.preventDefault ();
            if (item.classList.contains ("dragging")) return;
            item.classList.add ("drag-over");
        });

        item.addEventListener ("dragleave", () => {
            item.classList.remove ("drag-over");
        });
    });

    if (!list.dataset.dropReady) {
        list.dataset.dropReady = "true";

        list.addEventListener ("dragover", (e) => {
            e.preventDefault ();
            e.dataTransfer.dropEffect = "move";
        });

        list.addEventListener ("drop", (e) => {
            e.preventDefault ();

            const id = e.dataTransfer.getData ("text/plain");
            const target = e.target.closest (".tugas-item");

            list.querySelectorAll (".tugas-item").forEach ((i) =>
                i.classList.remove ("drag-over", "dragging")
            );

            if (!target || target.dataset.id === id) return;

            const targetId = target.dataset.id;
            const tugas = daftarTugas.find ((t) => t.id == id);
            const posisi = daftarTugas.findIndex ((t) => t.id == targetId);

            daftarTugas = daftarTugas.filter ((t) => t.id != id);
            daftarTugas.splice (posisi, 0, tugas);

            simpanKeStorage (daftarTugas); //>>
            renderTugas ();
        });
    }
}


function renderTugasKustom (hasil) {
    const list = document.getElementById ("daftar-tugas");
    list.innerHTML = "";

    hasil.forEach ((tugas) => {
        const li = document.createElement ("li");
        li.className = "tugas-item";
        li.dataset.id = tugas.id;
        li.textContent = tugas.nama;

        li.style.textDecoration =
            tugas.selesai ? "line-through" : "none";

        list.appendChild (li);
    });
}

function initTugas () {
    const data = muatDariStorage ();
    if (data) {
        daftarTugas = data;
        nextId = daftarTugas.reduce ((max, t) => Math.max (max, t.id), 0) + 1;
    }
    renderTugas ();
}

export {
    sectugas,
    daftarTugas,
    tambahTugas,
    hapusTugas,
    toggleSelesai,
    editTugas,
    renderTugas,
    renderTugasKustom,
    validasiInput,
    aktifkanDragDrop,
    initTugas,
};