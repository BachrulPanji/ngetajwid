// Huruf Hijaiyah data
const hijaiyahLetters = ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "ه", "و", "ي"];

// 50 Hukum Tajwid Lengkap
const tajwidRules = [
  // Nun Mati & Tanwin (4 hukum)
  { id: 1, name: "Izhar Halqi", category: "nun-tanwin", definition: "Membaca nun mati/tanwin dengan jelas tanpa dengung", letters: "ء ه ع ح غ خ", example: "مِنْ أَنْفُسِهِمْ", color: "bg-red-500" },
  { id: 2, name: "Idgham Bighunnah", category: "nun-tanwin", definition: "Memasukkan nun mati/tanwin ke huruf berikutnya dengan dengung", letters: "ي ن م و", example: "مِنْ وَلِيٍّ", color: "bg-green-500" },
  { id: 3, name: "Idgham Bilaghunnah", category: "nun-tanwin", definition: "Memasukkan nun mati/tanwin ke huruf berikutnya tanpa dengung", letters: "ل ر", example: "مِنْ رَبِّهِمْ", color: "bg-blue-500" },
  { id: 4, name: "Iqlab", category: "nun-tanwin", definition: "Mengubah nun mati/tanwin menjadi mim dengan dengung", letters: "ب", example: "مِنْ بَعْدِ", color: "bg-yellow-500" },
  { id: 5, name: "Ikhfa Haqiqi", category: "nun-tanwin", definition: "Menyamarkan nun mati/tanwin dengan dengung", letters: "ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك", example: "مِنْ تَحْتِهَا", color: "bg-purple-500" },

  // Mim Mati (3 hukum)
  { id: 6, name: "Ikhfa Syafawi", category: "mim", definition: "Menyamarkan mim mati bertemu ba dengan dengung", letters: "ب", example: "أَمْ بِهِمْ", color: "bg-pink-500" },
  { id: 7, name: "Idgham Mimi", category: "mim", definition: "Memasukkan mim mati ke mim berikutnya dengan dengung", letters: "م", example: "لَهُمْ مَا", color: "bg-indigo-500" },
  { id: 8, name: "Izhar Syafawi", category: "mim", definition: "Membaca mim mati dengan jelas", letters: "26 huruf selain ب م", example: "أَمْ تَرَى", color: "bg-teal-500" },

  // Mad (18 hukum)
  { id: 9, name: "Mad Thobi'i", category: "mad", definition: "Mad asli sepanjang 2 harakat", letters: "ا و ي", example: "قَالَ", color: "bg-red-400" },
  { id: 10, name: "Mad Wajib Muttashil", category: "mad", definition: "Mad bertemu hamzah dalam satu kata, 4-5 harakat", letters: "ا و ي + ء", example: "جَاءَ", color: "bg-red-600" },
  { id: 11, name: "Mad Jaiz Munfashil", category: "mad", definition: "Mad bertemu hamzah di kata berbeda, 2-5 harakat", letters: "ا و ي + ء", example: "بِمَا أُنْزِلَ", color: "bg-red-300" },
  { id: 12, name: "Mad Shilah Qashirah", category: "mad", definition: "Ha dhamir bertemu selain hamzah, 2 harakat", letters: "ه", example: "لَهُ دِينٌ", color: "bg-orange-400" },
  { id: 13, name: "Mad Shilah Thowilah", category: "mad", definition: "Ha dhamir bertemu hamzah, 4-5 harakat", letters: "ه + ء", example: "فِيهِ أَيَاتٌ", color: "bg-orange-600" },
  { id: 14, name: "Mad Badal", category: "mad", definition: "Hamzah diikuti mad, 2 harakat", letters: "ء + ا و ي", example: "آمَنُوا", color: "bg-yellow-400" },
  { id: 15, name: "Mad Iwadh", category: "mad", definition: "Tanwin fathatain di akhir ayat, 2 harakat", letters: "ً", example: "عَلِيمًا", color: "bg-green-400" },
  { id: 16, name: "Mad Tamkin", category: "mad", definition: "Ya sukun setelah ya kasrah, 2 harakat", letters: "يْ setelah ي", example: "حُيِّيتُمْ", color: "bg-blue-400" },
  { id: 17, name: "Mad Farq", category: "mad", definition: "Alif setelah hamzah wasl, 6 harakat", letters: "ا setelah ء وصل", example: "آلذَّكَرَيْنِ", color: "bg-purple-400" },
  { id: 18, name: "Mad Lazim Mutsaqqal Kilmi", category: "mad", definition: "Mad bertemu huruf bertasydid dalam satu kata, 6 harakat", letters: "ا و ي + tasydid", example: "الضَّالِّينَ", color: "bg-gray-600" },
  { id: 19, name: "Mad Lazim Mukhaffaf Kilmi", category: "mad", definition: "Mad bertemu sukun asli dalam satu kata, 6 harakat", letters: "ا و ي + sukun", example: "آلْآنَ", color: "bg-gray-500" },
  { id: 20, name: "Mad Lazim Mutsaqqal Harfi", category: "mad", definition: "Mad di huruf hijaiyah bertasydid, 6 harakat", letters: "Huruf hijaiyah + tasydid", example: "الم", color: "bg-gray-700" },
  { id: 21, name: "Mad Lazim Mukhaffaf Harfi", category: "mad", definition: "Mad di huruf hijaiyah tidak bertasydid, 6 harakat", letters: "Huruf hijaiyah", example: "ن", color: "bg-gray-400" },
  { id: 22, name: "Mad Aridh Lissukun", category: "mad", definition: "Mad bertemu sukun karena waqaf, 2-6 harakat", letters: "ا و ي + waqaf", example: "الْعَالَمِينَ", color: "bg-cyan-500" },
  { id: 23, name: "Mad Lin", category: "mad", definition: "Waw/ya sukun setelah fathah bertemu sukun, 2-6 harakat", letters: "وْ يْ setelah fathah", example: "خَوْفٌ", color: "bg-lime-500" },
  { id: 24, name: "Mad Silah Kubra", category: "mad", definition: "Ha dhamir panjang bertemu hamzah, 4-5 harakat", letters: "ه + ا و ي + ء", example: "مَالَهُ أَخْلَدَهُ", color: "bg-rose-500" },
  { id: 25, name: "Mad Silah Sughra", category: "mad", definition: "Ha dhamir pendek tidak bertemu hamzah, 2 harakat", letters: "ه", example: "لَهُ مَا", color: "bg-rose-400" },
  { id: 26, name: "Mad Lazim Harfi Muqatta'ah", category: "mad", definition: "Mad pada huruf muqatta'ah, 6 harakat", letters: "Huruf pembuka surat", example: "طه", color: "bg-violet-600" },

  // Qalqalah (2 hukum)
  { id: 27, name: "Qalqalah Kubra", category: "qalqalah", definition: "Memantulkan huruf qalqalah di akhir ayat", letters: "ق ط ب ج د", example: "وَالْفَجْرِ", color: "bg-emerald-600" },
  { id: 28, name: "Qalqalah Sughra", category: "qalqalah", definition: "Memantulkan huruf qalqalah di tengah ayat", letters: "ق ط ب ج د", example: "أَقْرَأُ", color: "bg-emerald-400" },

  // Ra (2 hukum)
  { id: 29, name: "Tafkhim Ra", category: "lainnya", definition: "Membaca ra dengan tebal", letters: "ر", example: "رَبِّ", color: "bg-amber-600" },
  { id: 30, name: "Tarqiq Ra", category: "lainnya", definition: "Membaca ra dengan tipis", letters: "ر", example: "بِرٍّ", color: "bg-amber-400" },

  // Lam (2 hukum)
  { id: 31, name: "Tafkhim Lam", category: "lainnya", definition: "Membaca lam Allah dengan tebal", letters: "ل في لفظ الجلالة", example: "اللَّهُ", color: "bg-stone-600" },
  { id: 32, name: "Tarqiq Lam", category: "lainnya", definition: "Membaca lam Allah dengan tipis", letters: "ل في لفظ الجلالة", example: "بِاللَّهِ", color: "bg-stone-400" },

  // Waqaf & Ibtida (4 hukum)
  { id: 33, name: "Waqaf Tam", category: "lainnya", definition: "Berhenti sempurna, boleh dilanjut atau tidak", letters: "○", example: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ○", color: "bg-green-600" },
  { id: 34, name: "Waqaf Kafi", category: "lainnya", definition: "Berhenti cukup, lebih baik dilanjut", letters: "ج", example: "مَالِكِ يَوْمِ الدِّينِ ج", color: "bg-green-500" },
  { id: 35, name: "Waqaf Hasan", category: "lainnya", definition: "Berhenti baik, boleh dilanjut", letters: "ز", example: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ز", color: "bg-green-400" },
  { id: 36, name: "Waqaf Qabih", category: "lainnya", definition: "Berhenti buruk, harus dilanjut", letters: "لا", example: "الَّذِينَ أَنْعَمْتَ لا", color: "bg-red-600" },

  // Huruf Syamsiyah & Qamariyah (2 hukum)
  { id: 37, name: "Lam Syamsiyah", category: "lainnya", definition: "Lam alif tidak dibaca, huruf setelahnya bertasydid", letters: "ت ث د ذ ر ز س ش ص ض ط ظ ل ن", example: "الشَّمْسُ", color: "bg-yellow-600" },
  { id: 38, name: "Lam Qamariyah", category: "lainnya", definition: "Lam alif dibaca jelas", letters: "ا ب ج ح خ ع غ ف ق ك م ه و ي", example: "الْقَمَرُ", color: "bg-blue-600" },

  // Ghunnah (3 hukum)
  { id: 39, name: "Ghunnah Musyaddadah", category: "lainnya", definition: "Dengung pada mim/nun bertasydid, 2 harakat", letters: "مّ نّ", example: "إِنَّ", color: "bg-purple-600" },
  { id: 40, name: "Ghunnah Ikhfa", category: "lainnya", definition: "Dengung pada ikhfa haqiqi dan syafawi", letters: "Huruf ikhfa", example: "مِنْ تَحْتِهَا", color: "bg-purple-500" },
  { id: 41, name: "Ghunnah Idgham", category: "lainnya", definition: "Dengung pada idgham bighunnah", letters: "ي ن م و", example: "مِنْ وَلِيٍّ", color: "bg-purple-400" },

  // Huruf Khusus (9 hukum)
  { id: 42, name: "Isymam", category: "lainnya", definition: "Mengisyaratkan harakat tanpa suara", letters: "Dhammah", example: "تَأْمَنَّا", color: "bg-indigo-400" },
  { id: 43, name: "Imalah", category: "lainnya", definition: "Memiringkan alif ke arah ya", letters: "ا", example: "مَجْرَاهَا", color: "bg-indigo-500" },
  { id: 44, name: "Tashil", category: "lainnya", definition: "Melembutkan hamzah", letters: "ء", example: "أَأَنْذَرْتَهُمْ", color: "bg-indigo-600" },
  { id: 45, name: "Ibdal", category: "lainnya", definition: "Mengganti hamzah dengan huruf mad", letters: "ء → ا و ي", example: "يُؤْمِنُونَ", color: "bg-cyan-600" },
  { id: 46, name: "Naql", category: "lainnya", definition: "Memindah harakat hamzah ke huruf sebelumnya", letters: "ء", example: "الْأَرْضِ", color: "bg-cyan-500" },
  { id: 47, name: "Idgham Kabir", category: "lainnya", definition: "Memasukkan huruf berharakat ke huruf sejenis", letters: "Huruf sejenis", example: "يَلْهَثْ ذَلِكَ", color: "bg-teal-600" },
  { id: 48, name: "Saktah", category: "lainnya", definition: "Berhenti sejenak tanpa nafas", letters: "س", example: "وَقِيلَ مَنْ س رَاقٍ", color: "bg-slate-600" },
  { id: 49, name: "Roum", category: "lainnya", definition: "Melemahkan suara harakat akhir", letters: "Harakat akhir", example: "الْعَالَمِينَ", color: "bg-slate-500" },
  { id: 50, name: "Waqaf Lazim", category: "lainnya", definition: "Waqaf yang harus dilakukan", letters: "م", example: "إِنَّمَا يَسْتَجِيبُ الَّذِينَ يَسْمَعُونَ م", color: "bg-slate-700" },
];

// Quiz data
const quizQuestions = [
  { question: "Apa hukum tajwid pada: مِنْ أَنْفُسِهِمْ", ayat: "مِنْ أَنْفُسِهِمْ", options: ["Izhar Halqi", "Ikhfa Haqiqi", "Idgham", "Iqlab"], correct: 0, explanation: "Nun mati bertemu hamzah (ء), dibaca jelas tanpa dengung" },
  { question: "Berapa harakat panjang Mad Wajib Muttashil?", ayat: "جَاءَ", options: ["2 harakat", "4-5 harakat", "6 harakat", "2-6 harakat"], correct: 1, explanation: "Mad bertemu hamzah dalam satu kata, wajib dipanjangkan 4-5 harakat" },
  { question: "Hukum tajwid apa ini: مِنْ وَلِيٍّ", ayat: "مِنْ وَلِيٍّ", options: ["Izhar", "Idgham Bighunnah", "Ikhfa", "Iqlab"], correct: 1, explanation: "Nun mati bertemu waw, dimasukkan dengan dengung" },
  { question: "Huruf qalqalah adalah:", ayat: "أَقْرَأُ", options: ["ق ط ب ج د", "ء ه ع ح غ خ", "ي ن م و", "ل ر"], correct: 0, explanation: "Lima huruf yang harus dipantulkan: قطبجد" },
  { question: "Mad Badal contohnya:", ayat: "آمَنُوا", options: ["جَاءَ", "آمَنُوا", "مَآءً", "قَالَ"], correct: 1, explanation: "Hamzah diikuti alif mad, dibaca 2 harakat" },
  { question: "Ikhfa Syafawi terjadi ketika mim mati bertemu:", ayat: "أَمْ بِهِمْ", options: ["Mim", "Ba", "Nun", "Waw"], correct: 1, explanation: "Mim mati bertemu ba, dibaca samar dengan dengung" },
  { question: "Lam Syamsiyah tidak dibaca pada:", ayat: "الشَّمْسُ", options: ["الْقَمَرُ", "الشَّمْسُ", "الْكِتَابُ", "الْمَسْجِدُ"], correct: 1, explanation: "Lam tidak dibaca, syiin bertasydid" },
  { question: "Ghunnah adalah:", ayat: "إِنَّ", options: ["Suara dengung", "Suara jelas", "Suara panjang", "Suara pendek"], correct: 0, explanation: "Suara dengung yang keluar dari hidung" },
  { question: "Mad Aridh Lissukun terjadi karena:", ayat: "الْعَالَمِينَ", options: ["Hamzah", "Waqaf", "Tasydid", "Tanwin"], correct: 1, explanation: "Mad bertemu sukun karena berhenti (waqaf)" },
  { question: "Tafkhim Ra terjadi ketika ra:", ayat: "رَبِّ", options: ["Berkasrah", "Berfathah/berdhammah", "Sukun", "Bertanwin"], correct: 1, explanation: "Ra dibaca tebal ketika berfathah atau berdhammah" },
  { question: "Iqlab mengubah nun mati menjadi:", ayat: "مِنْ بَعْدِ", options: ["Mim", "Ba", "Waw", "Ya"], correct: 0, explanation: "Nun mati/tanwin diubah menjadi mim dengan dengung" },
  { question: "Mad Tamkin contohnya:", ayat: "حُيِّيتُمْ", options: ["آمَنُوا", "جَاءَ", "حُيِّيتُمْ", "قَالَ"], correct: 2, explanation: "Ya sukun setelah ya kasrah, dibaca 2 harakat" },
  { question: "Waqaf Tam ditandai dengan:", ayat: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ○", options: ["ج", "ز", "○", "م"], correct: 2, explanation: "Tanda bulat (○) menunjukkan waqaf sempurna" },
  { question: "Idgham Bilaghunnah hurufnya:", ayat: "مِنْ رَبِّهِمْ", options: ["ي ن م و", "ل ر", "ق ط ب ج د", "ء ه ع ح غ خ"], correct: 1, explanation: "Lam dan ra, dimasukkan tanpa dengung" },
  { question: "Mad Lazim panjangnya:", ayat: "الضَّالِّينَ", options: ["2 harakat", "4-5 harakat", "6 harakat", "2-6 harakat"], correct: 2, explanation: "Mad lazim selalu 6 harakat, tidak boleh kurang atau lebih" },
  { question: "Qalqalah Kubra terjadi di:", ayat: "وَالْفَجْرِ", options: ["Awal ayat", "Tengah ayat", "Akhir ayat", "Semua posisi"], correct: 2, explanation: "Qalqalah kubra terjadi di akhir ayat saat waqaf" },
  { question: "Huruf Ikhfa Haqiqi ada berapa?", ayat: "مِنْ تَحْتِهَا", options: ["4 huruf", "15 huruf", "26 huruf", "28 huruf"], correct: 1, explanation: "15 huruf: ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك" },
  { question: "Mad Iwadh terjadi pada:", ayat: "عَلِيمًا", options: ["Tanwin kasrah", "Tanwin dhammah", "Tanwin fathah", "Semua tanwin"], correct: 2, explanation: "Tanwin fathatain (ً) di akhir ayat saat waqaf" },
  { question: "Izhar Syafawi hurufnya:", ayat: "أَمْ تَرَى", options: ["2 huruf", "15 huruf", "26 huruf", "28 huruf"], correct: 2, explanation: "26 huruf selain ba dan mim" },
  { question: "Mad Shilah terjadi pada huruf:", ayat: "لَهُ دِينٌ", options: ["Ha", "Mim", "Nun", "Waw"], correct: 0, explanation: "Ha dhamir (kata ganti) yang disambung dengan kata berikutnya" },
];

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let selectedAnswer = null;

// Game variables
let memoryCards = [];
let flippedCards = [];
let memoryMoves = 0;
let memoryStartTime = null;
let memoryTimer = null;

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  generateHijaiyahCards();
  generateTajwidCards();
  loadQuestion();
  showSection("hijaiyah");
});

// Generate Hijaiyah cards
function generateHijaiyahCards() {
  const container = document.querySelector("#section-hijaiyah .grid");
  container.innerHTML = "";

  hijaiyahLetters.forEach((letter, index) => {
    const card = document.createElement("div");
    card.className = "hijaiyah-card bg-gradient-to-br from-purple-400 to-pink-400 text-white p-6 rounded-2xl text-center shadow-lg";
    card.innerHTML = `
                    <div class="arabic-text text-4xl font-bold mb-2">${letter}</div>
                    <div class="text-sm opacity-80">Huruf ${index + 1}</div>
                `;
    card.onclick = () => playHijaiyahSound(letter, index);
    container.appendChild(card);
  });
}

// Show hijaiyah letter details
function playHijaiyahSound(letter, index) {
  // Create visual feedback
  const card = event.currentTarget;
  card.style.transform = "scale(0.95)";
  card.style.background = "linear-gradient(135deg, #4ecdc4, #44a08d)";

  // Arabic letter names
  const arabicSounds = {
    ا: "أَلِف (Alif)",
    ب: "بَاء (Baa)",
    ت: "تَاء (Taa)",
    ث: "ثَاء (Thaa)",
    ج: "جِيم (Jeem)",
    ح: "حَاء (Haa)",
    خ: "خَاء (Khaa)",
    د: "دَال (Daal)",
    ذ: "ذَال (Dhaal)",
    ر: "رَاء (Raa)",
    ز: "زَاي (Zaay)",
    س: "سِين (Seen)",
    ش: "شِين (Sheen)",
    ص: "صَاد (Saad)",
    ض: "ضَاد (Daad)",
    ط: "طَاء (Taa)",
    ظ: "ظَاء (Dhaa)",
    ع: "عَين (Ain)",
    غ: "غَين (Ghain)",
    ف: "فَاء (Faa)",
    ق: "قَاف (Qaaf)",
    ك: "كَاف (Kaaf)",
    ل: "لاَم (Laam)",
    م: "مِيم (Meem)",
    ن: "نُون (Noon)",
    ه: "هَاء (Haa)",
    و: "وَاو (Waaw)",
    ي: "يَاء (Yaa)",
  };

  showNotification(`📖 ${arabicSounds[letter]}`, "success");

  // Reset after animation
  setTimeout(() => {
    card.style.transform = "";
    card.style.background = "";
  }, 1000);
}

// Create beep sound as fallback
function createBeepSound(frequency, duration) {
  if ("AudioContext" in window || "webkitAudioContext" in window) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }
}

// Section navigation
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".section-content").forEach((section) => {
    section.classList.add("hidden");
  });

  // Show selected section
  document.getElementById(`section-${sectionName}`).classList.remove("hidden");

  // Update tab styles
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.className = "tab-btn flex-1 py-3 px-4 rounded-xl font-semibold transition-all text-gray-600 hover:bg-gray-100";
  });

  document.getElementById(`tab-${sectionName}`).className = "tab-btn flex-1 py-3 px-4 rounded-xl font-semibold transition-all bg-purple-500 text-white";
}

// Generate Tajwid Cards
function generateTajwidCards() {
  const container = document.getElementById("tajwid-container");
  container.innerHTML = "";

  tajwidRules.forEach((rule) => {
    const card = document.createElement("div");
    card.className = `tajwid-rule-card ${rule.color} text-white p-4 rounded-2xl shadow-lg cursor-pointer transition-all hover:scale-105`;
    card.dataset.category = rule.category;
    card.innerHTML = `
                    <h4 class="font-bold text-lg mb-2">${rule.name}</h4>
                    <p class="text-sm opacity-90 mb-3">${rule.definition}</p>
                    <div class="arabic-text text-xl mb-2">${rule.example}</div>
                    <div class="text-xs opacity-80">Huruf: ${rule.letters}</div>
                `;
    card.onclick = () => showTajwidDetail(rule);
    container.appendChild(card);
  });
}

// Filter Tajwid
function filterTajwid(category) {
  const cards = document.querySelectorAll(".tajwid-rule-card");
  const buttons = document.querySelectorAll(".filter-btn");

  // Update button styles
  buttons.forEach((btn) => {
    btn.className = "filter-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold";
  });
  event.target.className = "filter-btn bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold";

  // Filter cards
  cards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Show Tajwid Detail
function showTajwidDetail(rule) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";
  modal.innerHTML = `
                <div class="bg-white rounded-3xl p-6 max-w-md w-full">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold text-purple-800">${rule.name}</h3>
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-2">Pengertian:</h4>
                            <p class="text-gray-600">${rule.definition}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-2">Huruf:</h4>
                            <p class="text-gray-600">${rule.letters}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-2">Contoh:</h4>
                            <div class="arabic-text text-2xl text-center p-3 bg-gray-100 rounded-lg">${rule.example}</div>
                        </div>
                    </div>
                </div>
            `;
  document.body.appendChild(modal);
}

// Quiz Functions
function loadQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  document.getElementById("current-question").textContent = currentQuestionIndex + 1;
  document.getElementById("total-questions").textContent = quizQuestions.length;

  document.getElementById("question-content").innerHTML = `
                <h4 class="font-bold text-purple-800 mb-3">${question.question}</h4>
                <div class="arabic-text text-2xl text-center p-4 bg-white rounded-xl mb-4">${question.ayat}</div>
            `;

  const optionsContainer = document.getElementById("answer-options");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn bg-white hover:bg-purple-100 text-purple-800 p-3 rounded-lg font-semibold border-2 border-purple-200 transition-all";
    button.textContent = option;
    button.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(button);
  });

  selectedAnswer = null;
  updateNavigationButtons();
}

function selectAnswer(index) {
  selectedAnswer = index;
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    if (i === index) {
      btn.className = "option-btn bg-purple-500 text-white p-3 rounded-lg font-semibold border-2 border-purple-500 transition-all";
    } else {
      btn.className = "option-btn bg-white hover:bg-purple-100 text-purple-800 p-3 rounded-lg font-semibold border-2 border-purple-200 transition-all";
    }
  });
}

function nextQuestion() {
  if (selectedAnswer !== null) {
    const question = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === question.correct) {
      correctAnswers++;
      score += 5;
      showNotification(`✅ Benar! ${question.explanation}`, "success");
    } else {
      wrongAnswers++;
      showNotification(`❌ Salah! ${question.explanation}`, "error");
    }

    updateStats();

    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showQuizResult();
    }
  } else {
    showNotification("⚠️ Pilih jawaban terlebih dahulu!", "error");
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn.disabled = currentQuestionIndex === 0;
  prevBtn.className = currentQuestionIndex === 0 ? "bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold";

  nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Selesai" : "Selanjutnya →";
}

function updateStats() {
  document.getElementById("score").textContent = score;
  document.getElementById("correct-count").textContent = correctAnswers;
  document.getElementById("wrong-count").textContent = wrongAnswers;

  const total = correctAnswers + wrongAnswers;
  const accuracy = total > 0 ? Math.round((correctAnswers / total) * 100) : 100;
  document.getElementById("accuracy").textContent = accuracy + "%";
}

function showQuizResult() {
  const total = correctAnswers + wrongAnswers;
  const accuracy = Math.round((correctAnswers / total) * 100);

  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";
  modal.innerHTML = `
                <div class="bg-white rounded-3xl p-6 max-w-md w-full text-center">
                    <div class="text-6xl mb-4">${accuracy >= 80 ? "🏆" : accuracy >= 60 ? "🥈" : "📚"}</div>
                    <h3 class="text-2xl font-bold text-purple-800 mb-4">Quiz Selesai!</h3>
                    <div class="space-y-2 mb-6">
                        <p class="text-lg">Skor: <span class="font-bold text-purple-600">${score}</span></p>
                        <p>Benar: <span class="font-bold text-green-600">${correctAnswers}</span></p>
                        <p>Salah: <span class="font-bold text-red-600">${wrongAnswers}</span></p>
                        <p>Akurasi: <span class="font-bold text-blue-600">${accuracy}%</span></p>
                    </div>
                    <div class="space-y-3">
                        <button onclick="restartQuiz(); this.parentElement.parentElement.parentElement.remove();" class="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold">
                            🔄 Ulangi Quiz
                        </button>
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" class="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold">
                            Tutup
                        </button>
                    </div>
                </div>
            `;
  document.body.appendChild(modal);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  selectedAnswer = null;
  loadQuestion();
  updateStats();
}

// Game Functions
function newGame1Question() {
  const gameQuestions = [
    { ayat: "مِنْ أَنْفُسِهِمْ", options: ["Izhar Halqi", "Ikhfa", "Idgham", "Iqlab"], correct: 0 },
    { ayat: "مِنْ وَلِيٍّ", options: ["Izhar", "Idgham Bighunnah", "Ikhfa", "Iqlab"], correct: 1 },
    { ayat: "مِنْ بَعْدِ", options: ["Izhar", "Idgham", "Ikhfa", "Iqlab"], correct: 3 },
    { ayat: "أَقْرَأُ", options: ["Mad", "Qalqalah", "Ghunnah", "Izhar"], correct: 1 },
    { ayat: "جَاءَ", options: ["Mad Badal", "Mad Wajib", "Mad Jaiz", "Mad Lazim"], correct: 1 },
  ];

  const randomQ = gameQuestions[Math.floor(Math.random() * gameQuestions.length)];

  document.getElementById("game1-ayat").textContent = randomQ.ayat;
  const optionsContainer = document.getElementById("game1-options");
  optionsContainer.innerHTML = "";

  randomQ.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "bg-white hover:bg-yellow-100 text-gray-800 py-2 px-3 rounded-lg font-semibold transition-all";
    button.textContent = option;
    button.onclick = () => checkGame1Answer(index, randomQ.correct);
    optionsContainer.appendChild(button);
  });
}

function checkGame1Answer(selected, correct) {
  if (selected === correct) {
    showNotification("🎉 Benar! Hebat sekali!", "success");
  } else {
    showNotification("❌ Coba lagi! Pelajari lagi hukum tajwidnya", "error");
  }
}

function newGame2Question() {
  const ayats = [
    { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", pieces: ["بِسْمِ", "اللَّهِ", "الرَّحْمَٰنِ", "الرَّحِيمِ"] },
    { text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", pieces: ["الْحَمْدُ", "لِلَّهِ", "رَبِّ", "الْعَالَمِينَ"] },
    { text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", pieces: ["إِيَّاكَ", "نَعْبُدُ", "وَإِيَّاكَ", "نَسْتَعِينُ"] },
  ];

  const randomAyat = ayats[Math.floor(Math.random() * ayats.length)];
  const shuffledPieces = [...randomAyat.pieces].sort(() => Math.random() - 0.5);

  document.getElementById("game2-target").innerHTML = "";
  const piecesContainer = document.getElementById("game2-pieces");
  piecesContainer.innerHTML = "";

  shuffledPieces.forEach((piece) => {
    const pieceEl = document.createElement("div");
    pieceEl.className = "arabic-text bg-white hover:bg-blue-100 px-3 py-2 rounded-lg cursor-pointer border-2 border-blue-200 transition-all";
    pieceEl.textContent = piece;
    pieceEl.draggable = true;
    pieceEl.onclick = () => addToTarget(piece, randomAyat.text);
    piecesContainer.appendChild(pieceEl);
  });
}

function addToTarget(piece, correctText) {
  const target = document.getElementById("game2-target");
  const currentText = target.textContent.trim();
  const newText = currentText ? currentText + " " + piece : piece;
  target.textContent = newText;

  if (newText === correctText) {
    target.className = "arabic-text text-lg mb-4 p-3 bg-green-100 rounded-lg text-center min-h-[60px] border-2 border-green-400";
    showNotification("🎉 Sempurna! Ayat tersusun dengan benar!", "success");
  }
}

function startMemoryGame() {
  const letters = ["ا", "ب", "ت", "ث", "ج", "ح", "خ", "د"];
  const names = ["أَلِف", "بَاء", "تَاء", "ثَاء", "جِيم", "حَاء", "خَاء", "دَال"];

  memoryCards = [];
  for (let i = 0; i < letters.length; i++) {
    memoryCards.push({ id: i * 2, type: "letter", content: letters[i], match: i * 2 + 1 });
    memoryCards.push({ id: i * 2 + 1, type: "name", content: names[i], match: i * 2 });
  }

  memoryCards = memoryCards.sort(() => Math.random() - 0.5);

  const container = document.getElementById("memory-game");
  container.innerHTML = "";

  memoryCards.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.className = "memory-card bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center cursor-pointer transition-all";
    cardEl.innerHTML = '<div class="text-2xl">?</div>';
    cardEl.onclick = () => flipCard(card.id, cardEl);
    container.appendChild(cardEl);
  });

  memoryMoves = 0;
  flippedCards = [];
  memoryStartTime = Date.now();

  memoryTimer = setInterval(updateMemoryTimer, 1000);
  updateMemoryStats();
}

function flipCard(cardId, cardEl) {
  if (flippedCards.length < 2 && !cardEl.classList.contains("flipped")) {
    const card = memoryCards.find((c) => c.id === cardId);
    cardEl.innerHTML = `<div class="${card.type === "letter" ? "arabic-text text-2xl" : "text-sm"}">${card.content}</div>`;
    cardEl.classList.add("flipped");
    cardEl.style.background = "#10b981";

    flippedCards.push({ id: cardId, element: cardEl, card: card });

    if (flippedCards.length === 2) {
      memoryMoves++;
      updateMemoryStats();

      setTimeout(() => {
        if (flippedCards[0].card.match === flippedCards[1].id) {
          // Match found
          flippedCards.forEach((fc) => {
            fc.element.style.background = "#059669";
            fc.element.onclick = null;
          });
          showNotification("✅ Cocok!", "success");
        } else {
          // No match
          flippedCards.forEach((fc) => {
            fc.element.innerHTML = '<div class="text-2xl">?</div>';
            fc.element.classList.remove("flipped");
            fc.element.style.background = "#8b5cf6";
          });
        }

        flippedCards = [];

        // Check if game is complete
        if (document.querySelectorAll('.memory-card[style*="059669"]').length === memoryCards.length) {
          clearInterval(memoryTimer);
          showNotification("🏆 Selamat! Permainan selesai!", "success");
        }
      }, 1000);
    }
  }
}

function updateMemoryTimer() {
  if (memoryStartTime) {
    const elapsed = Math.floor((Date.now() - memoryStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    document.getElementById("memory-time").textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
}

function updateMemoryStats() {
  document.getElementById("memory-moves").textContent = memoryMoves;
}

// Initialize games
newGame1Question();
newGame2Question();

// Dark mode toggle
function toggleDarkMode() {
  const body = document.body;
  const icon = document.getElementById("theme-icon");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    icon.textContent = "🌙";
    showNotification("☀️ Mode terang diaktifkan", "info");
  } else {
    body.classList.add("dark");
    icon.textContent = "☀️";
    showNotification("🌙 Mode gelap diaktifkan", "info");
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Slide in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Slide out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(full)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add some interactive animations
document.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    // Button click effect
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "";
    }, 150);
  }
});
