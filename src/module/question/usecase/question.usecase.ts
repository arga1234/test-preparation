import { IQuestion } from '../dto';
import { QuestionCollection } from '../entity';
export interface IQuestionUsecase {
  getQuestionCollection: (id: string) => QuestionCollection;
}

export class QuestionDummyUsecase implements IQuestionUsecase {
  private dataDummy: IQuestion[] = [
    {
      id: '1',
      category: 'TWK-Bahasa Indonesia',
      question: 'Penggunaan tanda baca yang salah terdapat pada kalimat ...',
      option: [
        { id: 'a', text: 'Siap ... gerak!', points: 0 },
        {
          id: 'b',
          text: 'Proporsi guru pria dan wanita di sekolah itu adalah 1:4.',
          points: 0,
        },
        {
          id: 'c',
          text: 'Ayo kita pergi ke taman kota sekarang juga!',
          points: 0,
        },
        {
          id: 'd',
          text: 'Sila;h;kan pilih produk yang Anda inginkan.',
          points: 5,
        },
        {
          id: 'e',
          text: 'Apa yang menyebabkan bunga tulip mekar di musim semi?',
          points: 0,
        },
      ],
      correctOption: 'a',
    },
    {
      id: '2',
      category: 'TWK-Bahasa Indonesia',
      question: 'Penulisan kata yang salah terdapat pada kalimat ...',
      correctOption: 'b',
      option: [
        {
          id: 'a',
          text: 'Saya tidak tahu bagaimana menghadapinya.',
          points: 0,
        },
        {
          id: 'b',
          text: 'Mereka telah mengapresiasi usaha kita semua.',
          points: 0,
        },
        {
          id: 'c',
          text: 'Kegiatan tersebut dihadiri oleh ratusan orang.',
          points: 0,
        },
        { id: 'd', text: 'Apaka hkau sudah makan siang?', points: 5 },
        { id: 'e', text: 'Pohon itu tumbuh dengan sangat baik.', points: 0 },
      ],
    },
    {
      id: '3',
      category: 'TWK-Bahasa Indonesia',
      question: 'Kalimat yang menggunakan ejaan yang benar adalah ...',
      correctOption: 'c',
      option: [
        { id: 'a', text: 'Bagaimana kabarmu hari ini.', points: 0 },
        {
          id: 'b',
          text: 'Kita perlu mengkoordinasikan acara ini segera.',
          points: 0,
        },
        {
          id: 'c',
          text: 'Perusahaan itu memiliki proyeksi laba yang baik.',
          points: 5,
        },
        { id: 'd', text: 'Buku ini adalah milikku?', points: 0 },
        {
          id: 'e',
          text: 'Mereka sedang bermain di taman bersama-sama.',
          points: 0,
        },
      ],
    },
    {
      id: '4',
      category: 'TWK-Bahasa Indonesia',
      question: 'Penggunaan huruf kapital yang salah terdapat pada kalimat ...',
      correctOption: 'd',
      option: [
        {
          id: 'a',
          text: 'Kami akan pergi ke jakarta minggu depan.',
          points: 5,
        },
        { id: 'b', text: 'Hari ini cuaca sangat cerah.', points: 0 },
        { id: 'c', text: 'Ayah membaca koran di ruang tamu.', points: 0 },
        { id: 'd', text: 'Para peserta berkumpul di aula sekolah.', points: 0 },
        { id: 'e', text: 'Dia membawa buku ke perpustakaan.', points: 0 },
      ],
    },
    {
      id: '5',
      category: 'TWK-Bahasa Indonesia',
      question: 'Pemakaian kata depan yang salah terdapat pada kalimat ...',
      correctOption: 'e',
      option: [
        { id: 'a', text: 'Dia belajar di perpustakaan sejak pagi.', points: 0 },
        {
          id: 'b',
          text: 'Kami akan menghadiri seminar pada hari Jumat.',
          points: 0,
        },
        { id: 'c', text: 'Pertemuan akan di mulai pukul 10.00.', points: 5 },
        { id: 'd', text: 'Mereka berdiskusi tentang proyek baru.', points: 0 },
        {
          id: 'e',
          text: 'Kita berjalan menyusuri taman setiap pagi.',
          points: 0,
        },
      ],
    },
    {
      id: '6',
      category: 'TWK-Nasionalisme',
      question:
        'Sikap nasionalisme dalam kehidupan sehari-hari ditunjukkan oleh tindakan ...',
      correctOption: 'a',
      option: [
        {
          id: 'a',
          text: 'Menggunakan produk lokal dan mendukung UMKM.',
          points: 5,
        },
        { id: 'b', text: 'Hanya mengutamakan kepentingan pribadi.', points: 0 },
        { id: 'c', text: 'Meniru budaya asing tanpa seleksi.', points: 0 },
        { id: 'd', text: 'Membanggakan produk luar negeri.', points: 0 },
        {
          id: 'e',
          text: 'Acuh terhadap perkembangan budaya bangsa.',
          points: 0,
        },
      ],
    },
    {
      id: '7',
      category: 'TWK-Nasionalisme',
      question:
        'Salah satu bentuk ancaman terhadap nasionalisme di era globalisasi adalah ...',
      correctOption: 'b',
      option: [
        {
          id: 'a',
          text: 'Meningkatnya rasa cinta terhadap tanah air.',
          points: 0,
        },
        {
          id: 'b',
          text: 'Penyebaran budaya asing yang bertentangan dengan nilai-nilai Pancasila.',
          points: 5,
        },
        {
          id: 'c',
          text: 'Peningkatan jumlah kegiatan budaya lokal.',
          points: 0,
        },
        {
          id: 'd',
          text: 'Kecintaan pada lagu kebangsaan Indonesia.',
          points: 0,
        },
        {
          id: 'e',
          text: 'Pemanfaatan teknologi untuk memperkenalkan budaya Indonesia.',
          points: 0,
        },
      ],
    },
    {
      id: '8',
      category: 'TWK-Nasionalisme',
      question:
        'Sumpah Pemuda yang diikrarkan pada tanggal 28 Oktober 1928 menunjukkan bahwa ...',
      correctOption: 'c',
      option: [
        {
          id: 'a',
          text: 'Persatuan bangsa lebih penting daripada keberagaman.',
          points: 0,
        },
        {
          id: 'b',
          text: 'Pemuda Indonesia berkomitmen pada kesatuan bangsa.',
          points: 5,
        },
        {
          id: 'c',
          text: 'Bahasa daerah lebih utama dibanding bahasa Indonesia.',
          points: 0,
        },
        {
          id: 'd',
          text: 'Kolonialisme tidak berdampak pada persatuan bangsa.',
          points: 0,
        },
        {
          id: 'e',
          text: 'Indonesia hanya terdiri dari satu suku bangsa.',
          points: 0,
        },
      ],
    },
    {
      id: '9',
      category: 'TWK-Nasionalisme',
      question:
        'Tindakan yang mencerminkan nasionalisme dalam menjaga keutuhan NKRI adalah ...',
      correctOption: 'd',
      option: [
        {
          id: 'a',
          text: 'Menghormati perbedaan suku, agama, dan budaya.',
          points: 5,
        },
        {
          id: 'b',
          text: 'Mengutamakan kepentingan kelompok tertentu.',
          points: 0,
        },
        { id: 'c', text: 'Mengabaikan hak asasi manusia.', points: 0 },
        { id: 'd', text: 'Menolak kerja sama dengan negara lain.', points: 0 },
        {
          id: 'e',
          text: 'Menghindari pengembangan potensi daerah.',
          points: 0,
        },
      ],
    },
    {
      id: '10',
      category: 'TWK-Nasionalisme',
      question: 'Perwujudan nasionalisme dapat dilakukan melalui ...',
      correctOption: 'e',
      option: [
        { id: 'a', text: 'Mengikuti upacara bendera secara rutin.', points: 5 },
        {
          id: 'b',
          text: 'Mempelajari budaya bangsa lain tanpa memahami budaya sendiri.',
          points: 0,
        },
        { id: 'c', text: 'Merendahkan peran bahasa Indonesia.', points: 0 },
        {
          id: 'd',
          text: 'Mengabaikan perkembangan nasional di bidang teknologi.',
          points: 0,
        },
        {
          id: 'e',
          text: 'Mengutamakan hubungan dengan bangsa lain.',
          points: 0,
        },
      ],
    },
  ];

  getQuestionCollection = (testId: string) => {
    const qc = localStorage.getItem(testId);
    if (qc) {
      return new QuestionCollection(JSON.parse(qc));
    }
    return new QuestionCollection(
      this.dataDummy.map((el, index) => ({ ...el, number: index + 1 })),
    );
  };
}
