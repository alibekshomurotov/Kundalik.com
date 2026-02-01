// src/data/books.js
export const booksData = [
  {
    id: 1,
    title: "O'tgan kunlar",
    author: "Abdulla Qodiriy",
    category: "Adabiyot",
    grade: "9-11",
    pages: 320,
    year: 1926,
    description: "Abdulla Qodiriyning \"O'tgan kunlar\" romani XX asr o'zbek adabiyotining durdona asarlaridan biridir. Roman XIX asrning ikkinchi yarmida Buxoroda sodir bo'lgan voqealarni aks ettiradi. Asarda qadimgi an'analar va yangicha hayot yo'llari o'rtasidagi kurash, insoniy munosabatlar, sevgi va sadoqat kabi mavzular chuqur yoritilgan. Bosh qahramon Otabek va Kumushning muhabbati asarning asosiy mavzusi bo'lib, ularning hayoti orqali o'sha davrning ijtimoiy va madaniy hayoti keng o'z ifodasini topgan.",
    cover: "https://via.placeholder.com/150x200?text=O'tgan+kunlar",
    available: true,
    rating: 4.8,
    tags: ["roman", "tarixiy", "sevg", "o'zbek adabiyoti"],
    isbn: "978-9943-4927-1-5"
  },
  {
    id: 2,
    title: "Matematika 9-sinf",
    author: "O. Karimov, G. Ismoilova",
    category: "Matematika",
    grade: "9",
    pages: 256,
    year: 2022,
    description: "9-sinf o'quvchilari uchun mo'ljallangan matematika darsligi. Asosiy matematik tushunchalar, algebra, geometriya va trigonometriya bo'yicha to'liq materiallar. Har bir mavzu tushuntirilgan misollar, mashqlar va testlar bilan keltirilgan. Darslik O'zbekiston Respublikasi Xalq ta'limi vazirligi tomonidan tasdiqlangan.",
    cover: "https://via.placeholder.com/150x200?text=Matematika+9",
    available: true,
    rating: 4.5,
    tags: ["darslik", "algebra", "geometriya", "9-sinf"],
    isbn: "978-9943-12-456-7"
  },
  // ... boshqa kitoblar (8-10 ta)
];

export const categories = [
  { id: 1, name: "Adabiyot", count: 24 },
  { id: 2, name: "Matematika", count: 18 },
  { id: 3, name: "Fizika", count: 15 },
  { id: 4, name: "Kimyo", count: 12 },
  { id: 5, name: "Biologiya", count: 14 },
  { id: 6, name: "Ingliz tili", count: 22 },
  { id: 7, name: "Informatika", count: 16 },
  { id: 8, name: "Tarix", count: 20 },
  { id: 9, name: "Geografiya", count: 11 }
];