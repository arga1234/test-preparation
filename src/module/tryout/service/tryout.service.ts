import {
  IDatabaseClient,
  IPagination,
  IWhereClause,
} from '@/module/db/repository';
import { IQuestion, IQuestionAnswer } from '@/module/question';
import { ITryoutCategoryDto, ITryoutItemDto } from '../dto';

interface ICollection {
  question: IQuestion[];
  questionAnswer: IQuestionAnswer[];
  'tryout-item': ITryoutItemDto[];
  'tryout-category': ITryoutCategoryDto[];
}

export class TryoutService implements IDatabaseClient {
  private dataDummy: ICollection = {
    question: [
      {
        id: '1',
        testId: '1',
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
        correctOption: 'd',
        explanation:
          '<p>Selamat datang di <strong>website kami</strong>. Klik <a href="https://example.com">di sini</a> untuk informasi lebih lanjut.</p>',
      },
      {
        id: '2',
        testId: '1',
        category: 'TWK-Bahasa Indonesia',
        question: 'Penulisan kata yang salah terdapat pada kalimat ...',
        correctOption: 'd',
        explanation:
          '<iframe width="100%" height="400px" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
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
          {
            id: 'e',
            text: 'Pohon itu tumbuh dengan sangat baik.',
            points: 0,
          },
        ],
      },
      {
        id: '3',
        testId: '1',
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
        testId: '1',
        category: 'TWK-Bahasa Indonesia',
        question:
          'Penggunaan huruf kapital yang salah terdapat pada kalimat ...',
        correctOption: 'a',
        option: [
          {
            id: 'a',
            text: 'Kami akan pergi ke jakarta minggu depan.',
            points: 5,
          },
          { id: 'b', text: 'Hari ini cuaca sangat cerah.', points: 0 },
          { id: 'c', text: 'Ayah membaca koran di ruang tamu.', points: 0 },
          {
            id: 'd',
            text: 'Para peserta berkumpul di aula sekolah.',
            points: 0,
          },
          { id: 'e', text: 'Dia membawa buku ke perpustakaan.', points: 0 },
        ],
      },
    ],
    questionAnswer: [
      {
        id: '1',
        tryId: '1001',
        questionId: '1',
        selectedOption: 'a',
        duration: 15,
      },
      {
        id: '2',
        tryId: '1001',
        questionId: '2',
        selectedOption: 'b',
        duration: 20,
      },
      {
        id: '3',
        tryId: '1001',
        questionId: '3',
        selectedOption: 'c',
        duration: 10,
      },
      {
        id: '4',
        tryId: '1001',
        questionId: '4',
        selectedOption: '',
        duration: 12,
      },
    ],
    'tryout-item': [
      {
        id: '1',
        title: 'Try Out SKD 1',
        totalItem: 42,
        totalTime: 67,
        rating: 3.8,
        review: 89,
        categoryId: '1',
      },
      {
        id: '2',
        title: 'Try Out SKD 2',
        totalItem: 56,
        totalTime: 90,
        rating: 4.2,
        review: 78,
        categoryId: '1',
      },
      {
        id: '3',
        title: 'Try Out SKD 3',
        totalItem: 34,
        totalTime: 78,
        rating: 4.5,
        review: 90,
        categoryId: '1',
      },
      {
        id: '4',
        title: 'Try Out SKD 4',
        totalItem: 67,
        totalTime: 89,
        rating: 3.9,
        review: 85,
        categoryId: '1',
      },
      {
        id: '5',
        title: 'Try Out SKD 5',
        totalItem: 78,
        totalTime: 100,
        rating: 4.1,
        review: 92,
        categoryId: '1',
      },
      {
        id: '6',
        title: 'Try Out SKB 1',
        totalItem: 23,
        totalTime: 56,
        rating: 3.5,
        review: 76,
        categoryId: '2',
      },
      {
        id: '7',
        title: 'Try Out SKB 2',
        totalItem: 45,
        totalTime: 78,
        rating: 4.0,
        review: 88,
        categoryId: '2',
      },
      {
        id: '8',
        title: 'Try Out SKB 3',
        totalItem: 67,
        totalTime: 90,
        rating: 4.3,
        review: 91,
        categoryId: '2',
      },
      {
        id: '9',
        title: 'Try Out SKB 4',
        totalItem: 89,
        totalTime: 100,
        rating: 3.7,
        review: 87,
        categoryId: '2',
      },
      {
        id: '10',
        title: 'Try Out SKB 5',
        totalItem: 34,
        totalTime: 67,
        rating: 4.4,
        review: 93,
        categoryId: '2',
      },
    ],
    'tryout-category': [
      {
        id: '1',
        title: 'Try Out SKD',
        description:
          'Tantang diri kamu untuk meraih skor tertinggi dari pengguna lain.',
        thumbnail:
          'https://www.dropbox.com/scl/fi/efiurp2btj3bnd1c4bdw5/rb_2150368549-1-1.png?rlkey=q55svu5hi3in1n7h5w3qn9n5z&st=tunvcxbp&raw=1',
      },
      {
        id: '2',
        title: 'Try Out SKB',
        description:
          'Kerjakan try out SKB sesuai bidang formasi yang kamu pilih.',
        thumbnail:
          'https://www.dropbox.com/scl/fi/1r2v26gg0leljy31ja1vp/hand-drawn-college-entrance-exam-illustration-b-1.png?rlkey=88k05cpbbn8wnglkxzoofm1up&st=nbq8moml&raw=1',
      },
    ],
  };

  hasProperty<T>(obj: T, prop: keyof T): obj is T & Record<keyof T, unknown> {
    return typeof obj === 'object' && obj !== null && prop in obj;
  }

  async getList<T>(
    collectionName: string,
    pagination: IPagination,
    where?: IWhereClause[],
    columns?: (keyof T)[],
  ): Promise<{ data: T[]; total: number }> {
    if (!this.dataDummy[collectionName as keyof ICollection]) {
      throw new Error(`Collection ${collectionName} does not exist.`);
    }

    let data = this.dataDummy[collectionName as keyof ICollection] as T[];

    // Apply filtering based on where clauses
    if (where) {
      data = data.filter((item) =>
        where.every(({ column, operator, value }) => {
          if (!this.hasProperty(item, column as keyof T)) return false;
          const itemValue = item[column as keyof T];
          switch (operator) {
            case '=':
              return itemValue === value;
            case '!=':
              return itemValue !== value;
            case '>':
              return itemValue > value;
            case '<':
              return itemValue < value;
            case '>=':
              return itemValue >= value;
            case '<=':
              return itemValue <= value;
            default:
              return false;
          }
        }),
      );
    }

    const total = data.length;

    // Apply column selection if specified
    if (columns) {
      data = data.map(
        (item) =>
          Object.fromEntries(
            Object.entries(item as { [s: string]: unknown }).filter(([key]) =>
              columns.includes(key as keyof T),
            ),
          ) as T,
      );
    }

    // Apply pagination
    const { offset, limit } = pagination;
    if (offset !== undefined) {
      data = data.slice(offset);
    }
    if (limit !== undefined) {
      data = data.slice(0, limit);
    }

    return {
      data: data as T[],
      total,
    };
  }
}
