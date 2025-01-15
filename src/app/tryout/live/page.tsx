'use client';

import QuestionComponent from '@/components/Question.component';
import QuestionGridComponent, {
  Question,
} from '@/components/QuestionGrid.component';
import React, { useCallback, useState } from 'react';

const TryoutLivePage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    undefined,
  );
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', status: 'unanswered' },
    { id: '2', status: 'unanswered' },
    { id: '3', status: 'unanswered' },
    { id: '4', status: 'unanswered' },
    { id: '5', status: 'unanswered' },
  ]);

  const onOptionSelect = useCallback((optionId: string) => {
    setSelectedOptionId(optionId);
  }, []);

  const onQuestionClick = useCallback(
    (id: string) => {
      const x: Question[] = questions.map((el) => {
        if (el.id === id) {
          return { ...el, status: 'active' };
        }

        return { ...el, status: 'unanswered' };
      });
      setQuestions(x);
    },
    [questions],
  );

  const x =
    '<ol><li>penjelasan nomor 1</li><li>penjelasan nomor 2</li><li>penjelasan nomor 3</li></ol>';
  return (
    <div
      style={{
        margin: '10px',
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
      }}
    >
      <QuestionComponent
        questionNumber={1}
        category="category"
        questionText="Anda menemukan fitur otomatisasi dalam spreadsheet yang dapat memangkas waktu pembuatan laporan bulanan hingga 70%. Bagaimana Anda memastikan tim memanfaatkan fitur ini?"
        options={[
          {
            id: 'a',
            text: 'A. Mengirim panduan penggunaan fitur di grup tim ',
            points: 1,
          },
          {
            id: 'b',
            text: 'B. Membuat template dengan fitur tersebut untuk digunakan tim ',
            points: 2,
          },
          {
            id: 'c',
            text: 'C. Mengadakan demo langsung dan praktik bersama tim ',
            points: 3,
          },
          {
            id: 'd',
            text: 'D. Menerapkan penggunaan fitur sebagai standar laporan unit ',
            points: 4,
          },
          {
            id: 'e',
            text: 'E. Menyarankan setiap anggota tim untuk mencoba fitur tersebut ',
            points: 5,
          },
        ]}
        explanation={x}
        onOptionSelect={onOptionSelect}
        selectedOptionId={selectedOptionId}
      />
      <QuestionGridComponent
        questions={questions}
        onQuestionClick={onQuestionClick}
      />
    </div>
  );
};

export default React.memo(TryoutLivePage);
