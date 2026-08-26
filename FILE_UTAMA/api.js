async function ambilKutipan () {
    const el = document.getElementById ("kutipan-harian");
    try {
        const res = await fetch ("https://dummyjson.com/quotes/random");
        const data = await res.json ();
        document.getElementById ("kutipan-harian").textContent = `"${data.quote}" - ${data.author}`;
         } catch (error) {
        console.error ("Gagal mengambil kutipan:", error);

        document.getElementById ("kutipan-harian").textContent =
            "Gagal memuat kutipan.";
    }
}

async function ambilCuaca (kota) {
    const apikey = "a02c61c1a9a651a28720335f2435a988";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apikey}&units=metric&lang=id`;

    const infoCuaca = document.getElementById ("info-cuaca"); 
    infoCuaca.textContent = "Memuat cuaca...";

    try {
        const res = await fetch (url);

        if (!res.ok) {
            const errorData = await res.json ();
            throw new Error (errorData.message);
        }

        const data = await res.json ();

        infoCuaca.innerHTML = `
            <p>${data.name}: ${data.main.temp}°C</p>
            <p>${data.weather[0].description}</p>
        `;

    } catch (error) {
        console.error ("Gagal mengambil cuaca:", error);

        infoCuaca.textContent = error.message;
    }
}

export { ambilKutipan, ambilCuaca };