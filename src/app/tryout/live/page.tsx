'use client';

import QuestionComponent from '@/components/Question.component';
import React, { useCallback } from 'react';

const TryoutLivePage = () => {
  const onOptionSelect = useCallback((optionId: string) => {
    console.log(optionId);
  }, []);
  return (
    <div style={{ margin: '10px' }}>
      <QuestionComponent
        questionNumber={1}
        category="category"
        questionText="This is Question Text"
        options={[{ id: 'a', text: 'This is question' }]}
        selectedOptionId="a"
        explanation="this is explanation"
        onOptionSelect={onOptionSelect}
      />
    </div>
  );
};

export default React.memo(TryoutLivePage);
