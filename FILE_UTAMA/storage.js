function simpanKeStorage (daftarTugas) { 
    localStorage.setItem ("daftarTugas", JSON.stringify (daftarTugas));
}

function muatDariStorage () {
    const data = localStorage.getItem ("daftarTugas");
    return data ? JSON.parse (data) : null; 
}

function simpanCatatanKeStorage (daftarCatatan) {
    localStorage.setItem ("daftarCatatan", JSON.stringify (daftarCatatan));
}

function muatCatatanDariStorage () {
    const data = localStorage.getItem ("daftarCatatan");
    return data ? JSON.parse (data) : []; 
}

export { simpanKeStorage, muatDariStorage, simpanCatatanKeStorage, muatCatatanDariStorage };