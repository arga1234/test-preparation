'use client';

import QuestionComponent from '@/components/Question.component';
import React, { useCallback, useState } from 'react';

const TryoutLivePage = () => {
  const onOptionSelect = useCallback((optionId: string) => {
    setSelectedOptionId(optionId);
  }, []);
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    undefined,
  );

  const x =
    '<ol><li>penjelasan nomor 1</li><li>penjelasan nomor 2</li><li>penjelasan nomor 3</li></ol>';
  return (
    <div style={{ margin: '10px' }}>
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
    </div>
  );
};

export default React.memo(TryoutLivePage);
