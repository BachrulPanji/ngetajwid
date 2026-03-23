/** ========================================================
 * TEMPAT UNTUK MENEMPELKAN LINK API (Ubah string di bawah ini)
 * ======================================================== */
const API_ALQURAN = "https://equran.id/api/v2/surat";
const API_ALQURAN_DETAIL = "https://equran.id/api/v2/surat/{NomorSurat}";
const API_TAFSIR = "https://equran.id/api/v2/tafsir/{id}";
const API_DOA = "https://equran.id/api/doa";
const API_JADWAL_SHOLAT = "https://equran.id/api/v2/shalat";

// Konstanta DOM
const loadingIndicator = document.getElementById("loading-indicator");

// Inisialisasi awal
document.addEventListener("DOMContentLoaded", () => {
    // Mengecek mode gelap tersimpan atau preferensi sistem (opsional)
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        document.getElementById("theme-icon").textContent = "Mode Terang";
    }

    // Memuat data awal
    fetchDaftarSurat();
    fetchDaftarDoa();
    initJadwalDropdowns();
});

// ==========================================
// 1. FITUR AL-QUR'AN & TAFSIR
// ==========================================
let allSuratList = []; // Global untuk pencarian surat

async function fetchDaftarSurat() {
    if (!API_ALQURAN) return;

    try {
        showLoading(true);
        const response = await fetch(API_ALQURAN);
        const data = await response.json();

        // SESUAIKAN DENGAN STRUKTUR RESPON API ANDA
        // Contoh untuk equran.id v2: data.data adalah array surat
        allSuratList = data.data || data;

        renderSuratList(allSuratList);
    } catch (error) {
        console.error("Gagal mengambil daftar surat:", error);
        document.getElementById("alquran-list").innerHTML = `<div class="col-span-full text-red-500 p-4 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/20">Error mengambil API Alquran: ${error.message}</div>`;
    } finally {
        showLoading(false);
    }
}

function renderSuratList(surats) {
    const listContainer = document.getElementById("alquran-list");
    listContainer.innerHTML = "";

    if (!Array.isArray(surats)) {
        listContainer.innerHTML = `<div class="col-span-full">Struktur data API tidak valid. Harap sesuaikan mapping response di file script.js.</div>`;
        return;
    }

    surats.forEach((surat) => {
        // SESUAIKAN PROPERTY KEY DENGAN API ANDA
        const nomor = surat.nomor || surat.id;
        const namaLatin = surat.namaLatin || surat.nama_latin;
        const namaArab = surat.nama || surat.nama_arab;
        const arti = surat.arti || surat.arti_surat;
        const jumlahAyat = surat.jumlahAyat || surat.jumlah_ayat;

        const card = document.createElement("div");
        card.className = "bg-white dark:bg-slate-800 p-5 rounded-2xl border border-purple-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transform transition-all shadow-sm cursor-pointer flex justify-between items-center group";
        card.onclick = () => fetchDetailSurat(nomor);

        card.innerHTML = `
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/60 dark:to-indigo-900/60 rounded-xl font-black text-purple-700 dark:text-purple-300 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                    ${nomor}
                </div>
                <div>
                    <h3 class="font-bold text-slate-800 dark:text-white text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">${namaLatin}</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">${arti} &bull; <span class="text-indigo-500 dark:text-indigo-400">${jumlahAyat} Ayat</span></p>
                </div>
            </div>
            <div class="arabic-text text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300">
                ${namaArab}
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function filterSurat() {
    const query = document.getElementById("search-surat").value.toLowerCase();
    const filtered = allSuratList.filter(s => {
        const nama = s.namaLatin || s.nama_latin || "";
        return nama.toLowerCase().includes(query);
    });
    renderSuratList(filtered);
}

// Global variable menyimpan detail surat untuk toggle Ayat/Tafsir
let currentSuratDetail = null;
let currentTafsirData = null; // New global for tafsir caching
let autoScrollInterval = null;
let isAutoScrolling = false;
let scrollSpeed = 2; // Default speed

async function fetchDetailSurat(nomor) {
    if (!API_ALQURAN_DETAIL) {
        alert("API_ALQURAN_DETAIL belum diatur di script.js");
        return;
    }

    try {
        showLoading(true);
        // Memanggil API detail berdasarkan nomor surat mengatasi variabel {NomorSurat}
        let url = API_ALQURAN_DETAIL;
        if (url.includes("{NomorSurat}")) {
            url = url.replace("{NomorSurat}", nomor);
        } else if (url.includes("{id}")) {
            url = url.replace("{id}", nomor);
        } else {
            url = url.endsWith('/') ? url + nomor : url + '/' + nomor;
        }

        const response = await fetch(url);
        const data = await response.json();

        // Sesuaikan dengan respon API Anda
        currentSuratDetail = data.data || data;
        currentTafsirData = null; // Reset tafsir cache when opening new surat

        // Update Modal Title
        const titleElement = document.getElementById("detail-surat-title");
        if (titleElement) {
            titleElement.textContent = currentSuratDetail.namaLatin || currentSuratDetail.nama_latin || "Detail Surat";
        }

        openSuratDetailModal();
        toggleTafsirMode(false); // Default menampilkan ayat
    } catch (error) {
        console.error("Gagal mengambil detail surat:", error);
        alert("Terjadi kesalahan sistem saat mengambil data surat.");
    } finally {
        showLoading(false);
    }
}

async function toggleTafsirMode(showTafsir) {
    const btnAyat = document.getElementById("btn-show-ayat");
    const btnTafsir = document.getElementById("btn-show-tafsir");
    const contentBox = document.getElementById("detail-surat-content");

    if (!currentSuratDetail) return;

    if (showTafsir) {
        btnTafsir.className = "px-4 py-2 bg-slate-800 text-white rounded-md text-sm font-semibold";
        btnAyat.className = "px-4 py-2 bg-slate-200 text-slate-700 rounded-md text-sm font-semibold";
        
        // Fetch Tafsir if not already loaded
        if (!currentTafsirData || currentTafsirData.nomor !== currentSuratDetail.nomor) {
            try {
                showLoading(true);
                let url = API_TAFSIR.replace("{id}", currentSuratDetail.nomor);
                const response = await fetch(url);
                const data = await response.json();
                currentTafsirData = data.data || data;
            } catch (error) {
                console.error("Gagal mengambil tafsir:", error);
                contentBox.innerHTML = `<div class="p-4 bg-red-50 text-red-600 rounded-xl">Gagal memuat tafsir surat.</div>`;
                return;
            } finally {
                showLoading(false);
            }
        }
        renderTafsirHTML(contentBox);
    } else {
        btnAyat.className = "px-4 py-2 bg-slate-800 text-white rounded-md text-sm font-semibold";
        btnTafsir.className = "px-4 py-2 bg-slate-200 text-slate-700 rounded-md text-sm font-semibold";
        renderAyatHTML(contentBox);
    }
}

function renderAyatHTML(container) {
    if (!currentSuratDetail) return;

    const badges = document.getElementById("surat-meta-badges");
    if (badges) {
        badges.innerHTML = `
            <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-md border border-purple-200 dark:border-purple-800/50">${currentSuratDetail.tempatTurun}</span>
            <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-md border border-indigo-200 dark:border-indigo-800/50">${currentSuratDetail.jumlahAyat} Ayat</span>
        `;
    }

    // Reset Audio Player source
    const player = document.getElementById("full-audio-player");
    const qoriSelector = document.getElementById("qori-selector");
    if (player && qoriSelector) {
        stopFullAudio();
        player.src = currentSuratDetail.audioFull[qoriSelector.value];
    }

    container.innerHTML = `
        <!-- Surat Description Card -->
        <div class="bg-white dark:bg-slate-800 border border-purple-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm mb-4">
            <h4 class="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-3 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Tentang Surat
            </h4>
            <div class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                ${currentSuratDetail.deskripsi}
            </div>
        </div>
        
        <div class="space-y-6">
            ${currentSuratDetail.ayat.map(ayat => `
                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-purple-100 dark:border-slate-700 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-100 to-transparent dark:from-purple-900/30 rounded-bl-3xl opacity-50"></div>
                    
                    <div class="flex justify-between items-start mb-6 border-b border-purple-50 dark:border-slate-700 pb-4 relative z-10">
                        <span class="w-10 h-10 flex items-center justify-center bg-purple-100 dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold rounded-full shadow-sm text-sm group-hover:scale-110 transition-transform">
                            ${ayat.nomorAyat}
                        </span>
                        <div class="arabic-text text-3xl font-bold text-slate-800 dark:text-white leading-[2.5] text-right ml-4">
                            ${ayat.teksArab}
                        </div>
                    </div>
                    <p class="text-purple-700 dark:text-purple-400 mt-4 mb-3 text-sm font-semibold tracking-wide italic leading-relaxed">
                        ${ayat.teksLatin}
                    </p>
                    <div class="flex gap-3">
                        <div class="w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full flex-shrink-0"></div>
                        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">${ayat.teksIndonesia}</p>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
}

// ==========================================
// FULL AUDIO LOGIC
// ==========================================

function toggleFullAudio() {
    const player = document.getElementById("full-audio-player");
    if (player.paused) {
        startFullAudio();
    } else {
        pauseFullAudio();
    }
}

function startFullAudio() {
    const player = document.getElementById("full-audio-player");
    const playIcon = document.getElementById("audio-icon-play");
    const pauseIcon = document.getElementById("audio-icon-pause");
    const btn = document.getElementById("btn-play-full-audio");

    player.play();
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    btn.classList.add("bg-indigo-600");
    btn.classList.remove("bg-purple-600");
}

function pauseFullAudio() {
    const player = document.getElementById("full-audio-player");
    const playIcon = document.getElementById("audio-icon-play");
    const pauseIcon = document.getElementById("audio-icon-pause");
    const btn = document.getElementById("btn-play-full-audio");

    player.pause();
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
    btn.classList.add("bg-purple-600");
    btn.classList.remove("bg-indigo-600");
}

function stopFullAudio() {
    const player = document.getElementById("full-audio-player");
    if (player) {
        player.pause();
        player.currentTime = 0;
    }
    pauseFullAudio();
}

function changeQori(qoriId) {
    if (!currentSuratDetail) return;

    const player = document.getElementById("full-audio-player");
    const wasPlaying = !player.paused;

    player.src = currentSuratDetail.audioFull[qoriId];
    if (wasPlaying) {
        player.play();
    }
}

function renderTafsirHTML(container) {
    const tafsirs = currentTafsirData ? currentTafsirData.tafsir : null;

    container.innerHTML = "";

    if (tafsirs && Array.isArray(tafsirs)) {
        tafsirs.forEach((tafsirItem) => {
            const ayatNo = tafsirItem.ayat || "";
            const textTafsir = tafsirItem.teks || tafsirItem.tafsir || "";

            const div = document.createElement("div");
            div.className = "bg-white dark:bg-slate-800 p-6 border border-purple-50 dark:border-slate-700 rounded-2xl mb-4 shadow-sm hover:shadow-md transition-shadow";
            div.innerHTML = `
                <div class="flex items-center space-x-3 mb-4">
                    <span class="w-8 h-8 flex items-center justify-center bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold rounded-lg text-xs">
                        ${ayatNo}
                    </span>
                    <h4 class="font-bold text-slate-800 dark:text-white">Tafsir Ayat ${ayatNo}</h4>
                </div>
                <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify whitespace-pre-line">${textTafsir}</p>
            `;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = `<div class="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl">Tafsir tidak tersedia untuk surat ini.</div>`;
    }
}

function openSuratDetailModal() {
    document.getElementById("alquran-detail-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal

    // Reset auto scroll state
    stopAutoScroll();
}

function closeSuratDetail() {
    stopAutoScroll();
    stopFullAudio();
    document.getElementById("alquran-detail-modal").classList.add("hidden");
    document.body.style.overflow = "auto";
    currentSuratDetail = null;
}

// ==========================================
// AUTO SCROLL LOGIC
// ==========================================

function toggleAutoScroll() {
    const playIcon = document.getElementById("scroll-icon-play");
    const pauseIcon = document.getElementById("scroll-icon-pause");
    const btn = document.getElementById("btn-auto-scroll");

    if (isAutoScrolling) {
        stopAutoScroll();
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
        btn.classList.remove("bg-white/40");
    } else {
        startAutoScroll();
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
        btn.classList.add("bg-white/40");
    }
}

function startAutoScroll() {
    isAutoScrolling = true;
    const contentBox = document.getElementById("detail-surat-content");

    if (autoScrollInterval) clearInterval(autoScrollInterval);

    // Interval based on speed. Higher speed = more frequent scroll or bigger increment.
    // We'll use a fixed interval and variable increment for smoothness.
    autoScrollInterval = setInterval(() => {
        contentBox.scrollTop += 1;
    }, 100 / scrollSpeed);
}

function stopAutoScroll() {
    isAutoScrolling = false;
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }

    // Reset icons if they exist in DOM
    const playIcon = document.getElementById("scroll-icon-play");
    const pauseIcon = document.getElementById("scroll-icon-pause");
    const btn = document.getElementById("btn-auto-scroll");

    if (playIcon) playIcon.classList.remove("hidden");
    if (pauseIcon) pauseIcon.classList.add("hidden");
    if (btn) btn.classList.remove("bg-white/40");
}

function updateScrollSpeed(value) {
    scrollSpeed = parseInt(value);
    document.getElementById("scroll-speed-val").textContent = value;

    if (isAutoScrolling) {
        startAutoScroll(); // Restart with new speed
    }
}

// ==========================================
// 2. FITUR DOA HARIAN
// ==========================================
let allDoaList = []; // Global untuk fitur pencarian

async function fetchDaftarDoa() {
    if (!API_DOA) return;

    try {
        const response = await fetch(API_DOA);
        const data = await response.json();

        // Sesuaikan struktur array dengan API
        allDoaList = data.data || data;

        renderDoaList(allDoaList);
    } catch (error) {
        console.error("Gagal mengambil daftar doa:", error);
        document.getElementById("doa-list").innerHTML = `<div class="col-span-full text-red-500">Error: ${error.message}</div>`;
    }
}

function renderDoaList(doas) {
    const listContainer = document.getElementById("doa-list");
    listContainer.innerHTML = "";

    if (!Array.isArray(doas)) return;

    if (doas.length === 0) {
        listContainer.innerHTML = `<div class="col-span-full text-center py-6 text-slate-500">Tidak ada doa yang ditemukan.</div>`;
        return;
    }

    // Ambil doa tersimpan dari localStorage untuk membandingkan state Save
    let savedDoas = [];
    try { savedDoas = JSON.parse(localStorage.getItem('savedDoas') || '[]'); } catch (e) { savedDoas = []; }

    doas.forEach((doa) => {
        // SESUAIKAN PROPERTY DENGAN API DOA ANDA (MyQuran / eQuran)
        const judul = doa.doa || doa.nama_doa || doa.nama || "Nama Doa";
        const arab = doa.ayat || doa.doa_arab || doa.ar || "Teks arab tidak tersedia";
        const latin = doa.latin || doa.doa_latin || doa.tr || "";
        const arti = doa.artinya || doa.arti || doa.idn || "Tidak ada terjemahan";
        const card = document.createElement("div");
        card.className = "bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transform transition-transform shadow-sm group";

        const isSaved = savedDoas.includes(judul);
        const saveIconStr = isSaved ? "Tersimpan" : "Simpan";
        const saveColorClass = isSaved ? "bg-emerald-500 text-white border-emerald-500 shadow-md" : "bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 shadow-sm";

        card.innerHTML = `
            <div class="mb-5 flex space-x-3 items-start relative z-10">
                <div class="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/60 dark:to-emerald-900/60 rounded-xl font-black text-teal-700 dark:text-teal-300 shadow-sm flex-shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <h3 class="font-bold text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">${judul}</h3>
            </div>
            
            <div class="flex space-x-2 mt-auto pt-4 border-t border-teal-50 dark:border-slate-700">
                <button class="baca-btn flex-[2] bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-2 px-4 rounded-xl font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all outline-none">Baca</button>
                <button class="save-btn flex-1 py-2 px-3 rounded-xl text-sm font-bold border transition-all hover:-translate-y-0.5 ${saveColorClass}">${saveIconStr}</button>
            </div>
        `;

        card.querySelector('.baca-btn').onclick = () => showDoaDetail(judul, arab, latin, arti);
        card.querySelector('.save-btn').onclick = (e) => toggleSaveDoa(judul, e.target);

        listContainer.appendChild(card);
    });
}

function filterDoa() {
    const query = document.getElementById("search-doa").value.toLowerCase();
    const filtered = allDoaList.filter(doa => {
        const judul = doa.doa || doa.nama_doa || doa.nama || "";
        return judul.toLowerCase().includes(query);
    });
    renderDoaList(filtered);
}

function showDoaDetail(judul, arab, latin, arti) {
    document.getElementById("doa-modal-title").textContent = judul;
    document.getElementById("doa-modal-arab").textContent = arab;
    document.getElementById("doa-modal-latin").textContent = latin;
    document.getElementById("doa-modal-arti").textContent = arti;

    document.getElementById("doa-detail-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeDoaDetail() {
    document.getElementById("doa-detail-modal").classList.add("hidden");
    document.body.style.overflow = "auto";
}

function toggleSaveDoa(judul, btn) {
    let savedDoas = [];
    try { savedDoas = JSON.parse(localStorage.getItem('savedDoas') || '[]'); } catch (e) { savedDoas = []; }

    if (savedDoas.includes(judul)) {
        savedDoas = savedDoas.filter(d => d !== judul);
        btn.textContent = "Simpan";
        btn.className = "save-btn flex-1 py-1.5 px-3 rounded-md text-sm font-semibold border transition-colors bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-500";
    } else {
        savedDoas.push(judul);
        btn.textContent = "Tersimpan";
        btn.className = "save-btn flex-1 py-1.5 px-3 rounded-md text-sm font-semibold border transition-colors bg-green-600 text-white border-green-600";
    }
    localStorage.setItem('savedDoas', JSON.stringify(savedDoas));
}
// ==========================================
// 3. FITUR JADWAL SHOLAT
// ==========================================

async function initJadwalDropdowns() {
    // Populate bulan
    const selectBulan = document.getElementById("select-bulan");
    const bulanNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    selectBulan.innerHTML = "";
    bulanNames.forEach((nama, i) => {
        selectBulan.innerHTML += `<option value="${i + 1}">${nama}</option>`;
    });

    // Set current month/year
    const today = new Date();
    selectBulan.value = today.getMonth() + 1;
    document.getElementById("input-tahun").value = today.getFullYear();

    // Fetch provinsi if API is equran
    if (API_JADWAL_SHOLAT.includes("equran.id")) {
        try {
            const res = await fetch("https://equran.id/api/v2/shalat/provinsi");
            const data = await res.json();
            const selectProv = document.getElementById("select-prov");
            data.data.forEach(prov => {
                const opt = document.createElement('option');
                opt.value = prov;
                opt.textContent = prov;
                selectProv.appendChild(opt);
            });
        } catch (e) { console.error("Gagal load provinsi"); }
    }
}

async function fetchKabKota() {
    const prov = document.getElementById("select-prov").value;
    const selectKota = document.getElementById("select-kota");
    selectKota.innerHTML = `<option value="">Pilih Kab/Kota...</option>`;
    if (!prov || !API_JADWAL_SHOLAT.includes("equran.id")) return;

    try {
        const res = await fetch("https://equran.id/api/v2/shalat/kabkota", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provinsi: prov })
        });
        const data = await res.json();
        data.data.forEach(kota => {
            const opt = document.createElement('option');
            opt.value = kota;
            opt.textContent = kota;
            selectKota.appendChild(opt);
        });
    } catch (e) { console.error("Gagal load kabkota"); }
}

async function fetchJadwalSholat() {
    if (!API_JADWAL_SHOLAT) {
        alert("Harap isi konstanta API_JADWAL_SHOLAT di script.js terlebih dahulu.");
        return;
    }

    const container = document.getElementById("jadwal-container");
    container.innerHTML = `<div class="col-span-full text-center py-6 text-slate-500">Mengambil data jadwal sholat...</div>`;

    try {
        const inputKota = document.getElementById("select-kota").value;
        const inputProv = document.getElementById("select-prov").value;
        const inputBulan = document.getElementById("select-bulan").value;
        const inputTahun = document.getElementById("input-tahun").value;

        // Mendapatkan tanggal hari ini (hanya dipakai sebagai fallback fallback)
        const today = new Date();
        const year = inputTahun || today.getFullYear();
        const month = inputBulan || (today.getMonth() + 1);
        const day = String(today.getDate()).padStart(2, '0');

        // Cek jika menggunakan API eQuran (Metode POST)
        if (API_JADWAL_SHOLAT.includes("equran.id")) {
            if (!inputProv || !inputKota || !inputBulan || !inputTahun) {
                container.innerHTML = `<div class="col-span-full text-red-500 text-center py-4 bg-slate-50 dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600">Pastikan Anda telah mengisi Provinsi, Kota, Bulan, dan Tahun.</div>`;
                return;
            }

            const response = await fetch(API_JADWAL_SHOLAT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    provinsi: inputProv,
                    kabkota: inputKota,
                    bulan: parseInt(month, 10),
                    tahun: parseInt(year, 10)
                })
            });
            const data = await response.json();
            const jadwalList = data.data ? data.data.jadwal : null;

            if (jadwalList && Array.isArray(jadwalList)) {
                renderJadwalTable(jadwalList, inputProv, inputKota, month, year);
                return;
            }
            container.innerHTML = `<div class="col-span-full text-red-500 text-center">Data jadwal tidak ditemukan. Pastikan nama kota & provinsi benar sesuai Kemenag.</div>`;
            return;
        }

        // Jika bukan eQuran (Misal MyQuran) menggunakan API GET biasa
        const finalUrl = `${API_JADWAL_SHOLAT}/${year}/${String(month).padStart(2, '0')}/${day}`;
        const response = await fetch(finalUrl);
        const data = await response.json();

        // Pada API myquran v2: jadwal ada di data.data.jadwal
        const jadwal = data.data ? data.data.jadwal : null;

        if (!jadwal) {
            container.innerHTML = `<div class="col-span-full text-red-500">Data jadwal tidak ditemukan atau API invalid format.</div>`;
            return;
        }

        // Karena Myquran hanya 1 data harian (jika endpoint param harian), let's render it
        // Idealnya jika user ingin bulanan, URL endpoint harus menunjuk bulanan.
        renderJadwalTable([jadwal], inputProv || "Daerah Anda", inputKota || "ID Kota", month, year);

    } catch (error) {
        console.error("Gagal mengambil jadwal sholat:", error);
        container.innerHTML = `<div class="col-span-full text-red-500 text-center py-4">Error: ${error.message} - Pastikan link API formatnya benar.</div>`;
    }
}

function renderJadwalTable(jadwalList, prov, kota, bulan, tahun) {
    const bulanNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const namaBulan = bulanNames[parseInt(bulan) - 1] || bulan;

    let html = `
    <div id="print-area" class="bg-white dark:bg-slate-800 p-2 sm:p-4 rounded-md">
        <div class="text-center mb-6">
            <h3 class="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-wider print-text-black">Jadwal Sholat Bulanan</h3>
            <p class="text-slate-600 dark:text-slate-400 font-semibold print-text-black">${kota}, ${prov}</p>
            <p class="text-sm text-slate-500 dark:text-slate-400 print-text-black">Bulan ${namaBulan} ${tahun}</p>
        </div>
        <div class="overflow-x-auto">
        <table class="w-full text-xs sm:text-sm text-center text-slate-600 dark:text-slate-300 border-collapse border border-slate-300 dark:border-slate-600 print-table">
            <thead class="text-slate-700 uppercase bg-slate-100 dark:bg-slate-700 dark:text-slate-300 font-semibold print-bg-gray">
                <tr>
                    <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 print-border">Tgl</th>
                    <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 print-border">Imsak</th>
                    <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 print-border">Subuh</th>
                    <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 print-border">Terbit</th>
                    <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 print-border">Dhuha</th>
                    <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 print-border">Dzuhur</th>
                    <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 print-border">Ashar</th>
                    <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 print-border">Maghrib</th>
                    <th scope="col" class="px-2 sm:px-4 py-2 sm:py-3 border border-slate-300 dark:border-slate-600 print-border">Isya</th>
                </tr>
            </thead>
            <tbody>
    `;

    const todayDate = String(new Date().getDate()).padStart(2, '0');
    const isCurrentMonth = new Date().getMonth() + 1 == parseInt(bulan) && new Date().getFullYear() == parseInt(tahun);

    jadwalList.forEach((j, index) => {
        // equran list contains j.tanggal. format might be just a single number (1-31) or full date relying on API
        // For myquran fallback, usually it's `tanggal` like "Senin, 01/03/2026"
        const dayStr = String(j.tanggal).padStart(2, '0');
        const isToday = isCurrentMonth && dayStr === todayDate;

        const rowClass = isToday ? "bg-indigo-50 dark:bg-slate-600 font-bold text-indigo-700 dark:text-white print-bg-light" : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700";

        // Sometimes API might not return all 8 (e.g no terbit/dhuha). We standardise
        html += `
            <tr class="${rowClass}">
                <td class="px-2 sm:px-4 py-2 border border-slate-300 dark:border-slate-600 print-border">${j.tanggal || (index + 1)}</td>
                <td class="px-2 sm:px-4 py-2 border border-slate-300 dark:border-slate-600 print-border">${j.imsak || "-"}</td>
                <td class="px-2 sm:px-4 py-2 border border-slate-300 dark:border-slate-600 print-border">${j.subuh || "-"}</td>
                <td class="px-2 sm:px-4 py-2 border border-slate-300 dark:border-slate-600 print-border">${j.terbit || "-"}</td>
                <td class="px-2 sm:px-4 py-2 border border-slate-300 dark:border-slate-600 print-border">${j.dhuha || "-"}</td>
                <td class="px-2 sm:px-4 py-2 border border-slate-300 dark:border-slate-600 print-border">${j.dzuhur || "-"}</td>
                <td class="px-2 sm:px-4 py-2 border border-slate-300 dark:border-slate-600 print-border">${j.ashar || "-"}</td>
                <td class="px-2 sm:px-4 py-2 border border-slate-300 dark:border-slate-600 print-border">${j.maghrib || "-"}</td>
                <td class="px-2 sm:px-4 py-2 border border-slate-300 dark:border-slate-600 print-border">${j.isya || "-"}</td>
            </tr>
        `;
    });

    html += `</tbody></table></div></div>`;
    document.getElementById("jadwal-container").innerHTML = html;
}

function printJadwal() {
    const printContent = document.getElementById("print-area");
    if (!printContent) {
        alert("Silakan Tampilkan Jadwal sholat terlebih dahulu sebelum mencetak.");
        return;
    }

    // Kita memanggil sistem print bawaan browser
    // CSS `@media print` sudah menangani penyembunyian elemen yang tidak relevan
    window.print();
}

// ==========================================
// UTILITIES (Navigasi, UI, Dark Mode)
// ==========================================

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll(".section-content").forEach((section) => {
        section.classList.add("hidden");
    });

    // Show selected section
    document.getElementById(`section-${sectionName}`).classList.remove("hidden");

    // Update tab styles
    document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.className = "tab-btn flex-1 py-3 px-4 rounded-md font-semibold transition-all text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700";
    });

    const activeBtn = document.getElementById(`tab-${sectionName}`);
    if (activeBtn) {
        activeBtn.className = "tab-btn flex-1 py-3 px-4 rounded-md font-semibold transition-all bg-slate-800 text-white dark:bg-slate-700";
    }
}

function toggleDarkMode() {
    const html = document.documentElement;
    const icon = document.getElementById("theme-icon");

    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        icon.textContent = "Mode Gelap";
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add("dark");
        icon.textContent = "Mode Terang";
        localStorage.setItem('theme', 'dark');
    }
}

function showLoading(isLoading) {
    if (isLoading) {
        loadingIndicator.classList.remove("hidden");
    } else {
        loadingIndicator.classList.add("hidden");
    }
}
