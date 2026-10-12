/**
 * =========================================================================
 * KONFIGURASI SURAT CINTA DIGITAL
 * =========================================================================
 * Semua teks, musik, nama, dan foto dipusatkan di sini.
 */

export interface MemoryPhoto {
  id: number;
  image: string;
  rotation?: number; // derajat rotasi polaroid
}

export interface LoveConfig {
  // 1. Identitas
  recipientName: string; // Nama si dia
  senderName: string;    // Nama kamu
  
  // 2. Musik Latar (YouTube)
  youtube: {
    videoId: string;
    songTitle: string;
    artist: string;
    startSeconds: number;
    loop: boolean;
  };

  // 3. Pesan Hero (Layar Pembuka)
  hero: {
    greeting: string;
    subtitle: string;
    openButtonText: string;
    hintSound: string;
  };

  // 4. Galeri Kenangan (HANYA FOTO, TANPA TEKS)
  memories: MemoryPhoto[];

  // 5. Ungkapan Perasaan (Surat Cinta)
  letter: {
    title: string;
    content: string;
    closing: string;
  };

  // 6. Momen Pertanyaan (Klimaks)
  proposal: {
    question: string;
    yesButtonText: string;
    noButtonText: string;
    playfulHints: string[];
    yesResponse: {
      title: string;
      message: string;
      badgeText: string;
      whatsappMessage: string;
      whatsappNumber?: string;
    };
  };

  theme: 'pastel-pink' | 'maroon-gold' | 'lavender-white';
}

export const defaultConfig: LoveConfig = {
  // Nama Dia
  recipientName: "raissa auliya sharfina irawan",
  
  // Pengirim
  senderName: "orang yang ngangenin",

  // Musik: Reality Club - Wanting You Is Not A Crime
  youtube: {
    videoId: "buoQZThUnNI",
    songTitle: "Wanting You Is Not A Crime",
    artist: "Reality Club",
    startSeconds: 0,
    loop: true,
  },

  // Layar Pembuka
  hero: {
    greeting: "Hollaa, raissa auliya sharfina irawan 👋",
    subtitle: "Ada sesuatu yang ingin aku sampein lewat web ini...",
    openButtonText: "Buka 💌",
    hintSound: "Nyalakan suara ya 🎧",
  },

  // Foto Kenangan (Murni hanya foto, tanpa teks/caption/judul)
  memories: [
    {
      id: 1,
      image: "/images/foto1.jpg",
      rotation: -2,
    },
    {
      id: 2,
      image: "/images/foto2.jpg",
      rotation: 1.5,
    },
    {
      id: 3,
      image: "/images/foto3.jpg",
      rotation: -1.5,
    },
    {
      id: 4,
      image: "/images/foto4.jpg",
      rotation: 2,
    },
  ],

  // Ungkapan Perasaan
  letter: {
    title: "Untuk Raissa",
    content: "Aku tau kita baru deket belum lama ini, tapiii... banyak hal yang bikin aku nyaman saat sama kamu, pas kamu ngirim foto cantik kamu, kamu dengerin cerita random aku, kamu juga nyeritain semua tentang kamu, aku seneng banget, balik lagi aku tau kita mungkin belum 100% saling mengenal tapi aku pikir aku gabsa nahan perasaan ini kelamaan, soalnya takut kamu diambil orang, cewe cantik kan banyak yang mau, aku pikir gaada salahnya aku coba nyatain perasaan aku ke kamu, karena semua yang aku cari ada di kamu, maaf aku cukup pecundang cuma bisa lewat ketikan ini, tapi aku harap semua perasaan aku bisa tersampaikan ke kamu raissa auliya sharfina irawan, soo....",
    closing: "Dari orang yang selalu mikirin kamu,",
  },

  // Momen Pertanyaan (Klimaks)
  proposal: {
    question: "raissa auliya sharfina irawan , mau ga kamu jadi pacarku? 💖",
    yesButtonText: "Mau 💕",
    noButtonText: "Pikir-pikir dulu",
    playfulHints: [
      "Yakin?",
      "Coba pikir lagi 😆",
      "Cuma ada satu pilihan nih 💗",
    ],
    yesResponse: {
      title: "Makasih banyak cantikku cintaku i love you 💖✨🥺🫶",
      message: "kata aku mah mending vc sekarang buat kasih jawaban langsung ke aku, soalnya nungguin nihhh",
      badgeText: "Resmi Pacaran Mulai Hari Ini 💕",
      whatsappMessage: "Aku mau jadi pacar kamu! Mau VC sekarang nih 🥺💕",
      whatsappNumber: "", // Masukkan nomor WA jika ingin langsung balas ke WA
    },
  },

  theme: "pastel-pink",
};
