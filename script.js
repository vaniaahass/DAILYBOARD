import { sectugas, daftarTugas, tambahTugas, renderTugasKustom, initTugas} from "./tugas.js";
import { seccatatan, initCatatan } from "./catatan.js";
import { ambilKutipan, ambilCuaca } from "./api.js";

// MINGGU 1 SETUP PROJECT & STRUKTUR HTML/CSS/JS
console.log ("DailyBoard siap dijalankan!");

// MINGGU 2 SELEKSI & MANIPULASI DOM
const app = document.getElementById ("app");

const judul = document.createElement ("h2");
judul.textContent = "Selamat datang di DailyBoard!";
app.appendChild (judul);

judul.style.color = "#2563eb";

// MINGGU 16 : OPTIMASI DENGAN DEBOUNCE
function debounce (fn, delay = 300) {
    let timer;

    return (...args) => {
        clearTimeout (timer);

        timer = setTimeout (() => {
            fn (...args);
        }, delay);
    };
}

// MINGGU 14 : DARK MODE & PENCARIAN
const toggleTema = document.createElement ("button");
toggleTema.id = "toggle-tema";
toggleTema.textContent = "Dark Mode";
app.appendChild (toggleTema);

toggleTema.addEventListener ("click", () => {
    document.body.classList.toggle ("dark-mode");

    const modeAktif = document.body.classList.contains ("dark-mode");

    localStorage.setItem ("tema", modeAktif ? "gelap" : "terang");
});

window.addEventListener ("DOMContentLoaded", () => {
    if (localStorage.getItem ("tema") === "gelap") {
        document.body.classList.add ("dark-mode");
    }
});

// Pencarian Tugas
const cariTugas = document.createElement ("input");
cariTugas.id = "cari-tugas";
cariTugas.placeholder = "Cari tugas...";
app.appendChild (cariTugas);

const cariTugasDebounced = debounce ((kataKunci) => {
    const hasil = daftarTugas.filter ((t) =>
        t.nama.toLowerCase ().includes (kataKunci)
    );

    renderTugasKustom (hasil);
}, 300);

cariTugas.addEventListener ("input", (e) => {
    cariTugasDebounced (e.target.value.toLowerCase ());
});

const enter = document.createElement ("br");
app.appendChild (enter);

// MINGGU 3 EVENT HANDLING
const inputt = document.createElement ("input");
app.appendChild (inputt);

const tomboll = document.createElement ("button");
tomboll.textContent = "Tambah Tugas";
app.appendChild (tomboll);

tomboll.addEventListener ("click", () => {
    tambahTugas (inputt.value);
    inputt.value = "";
});

app.appendChild (sectugas);
initTugas ();

app.appendChild (seccatatan);
initCatatan ();

// MINGGU 10 : FETCH API DASAR & ASYNC/AWAIT
const kutipan = document.createElement ("p");
kutipan.id = "kutipan-harian";
kutipan.textContent = "Memuat kutipan...";
app.appendChild (kutipan);

ambilKutipan ();

// MINGGU 11 WIDGET CUACA DENGAN API
const seccuaca = document.createElement ("section");
const judulcuaca = document.createElement ("h3");
judulcuaca.textContent = "CUACA";
seccuaca.appendChild (judulcuaca);
app.appendChild (seccuaca)

const formCuaca = document.createElement ("form");

const inputKota = document.createElement ("input");
inputKota.placeholder = "Masukkan nama kota";
inputKota.required = true;

const tombolCuaca = document.createElement ("button");
tombolCuaca.textContent = "Cek Cuaca";

formCuaca.appendChild (inputKota);
formCuaca.appendChild (tombolCuaca);
app.appendChild (formCuaca);

const infoCuaca = document.createElement ("div");
infoCuaca.id = "info-cuaca";
app.appendChild (infoCuaca);

formCuaca.addEventListener ("submit", (e) => {
    e.preventDefault ();

    const kota = inputKota.value.trim ();

    ambilCuaca (kota);
});

// MINGGU 12 : MENGGABUNGKAN BEBERAPA SUMBER DATA
async function muatSemuaWidget () {
    document.getElementById ("status").textContent = "Memuat data...";

    await Promise.all ([ambilKutipan(), ambilCuaca("Jakarta")]);

    document.getElementById ("status").textContent = "Data berhasil dimuat";
}

window.addEventListener ("DOMContentLoaded", muatSemuaWidget);