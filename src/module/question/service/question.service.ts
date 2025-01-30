import {
  IDatabaseClient,
  IPagination,
  IWhereClause,
} from '@/module/db/repository';
import { IQuestion, IQuestionAnswer } from '../dto';

interface ICollection {
  question: IQuestion[];
  questionAnswer: IQuestionAnswer[];
}

export class QuestionService implements IDatabaseClient {
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
  };

  hasProperty<T>(obj: T, prop: keyof T): obj is T & Record<keyof T, unknown> {
    return typeof obj === 'object' && obj !== null && prop in obj;
  }

  async getList<T>(
    collectionName: string,
    pagination: IPagination,
    where: IWhereClause[],
    columns?: (keyof T)[],
  ): Promise<{ data: T[]; total: number }> {
    if (!this.dataDummy[collectionName as keyof ICollection]) {
      throw new Error(`Collection ${collectionName} does not exist.`);
    }

    let data = this.dataDummy[collectionName as keyof ICollection] as T[];

    // Apply filtering based on where clauses
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
