import React, { useCallback, useMemo } from 'react';
import '../css/QuestionGrid.css';

interface Question {
  id: string;
  status: 'correct' | 'incorrect' | 'unanswered' | 'active';
}

interface QuestionGridProps {
  questions: Question[];
  onQuestionClick: (id: string) => void;
}

const QuestionGrid: React.FC<QuestionGridProps> = ({
  questions,
  onQuestionClick,
}) => {
  const getStatusClass = useCallback(
    (status: 'correct' | 'incorrect' | 'unanswered' | 'active') => {
      switch (status) {
        case 'correct':
          return 'correct';
        case 'incorrect':
          return 'incorrect';
        case 'active':
          return 'active';
        default:
          return 'unanswered';
      }
    },
    [],
  );

  const renderQuestionNumbers = useMemo(() => {
    return questions.map(({ id, status }, index) => (
      <div
        key={id}
        className={`question-number ${getStatusClass(status)}`}
        onClick={() => onQuestionClick(id)}
      >
        {index + 1}
      </div>
    ));
  }, [questions, getStatusClass, onQuestionClick]);

  return (
    <div className="question-grid">
      <div className="legend">
        <p>
          <span className="correct"></span> = Benar
        </p>
        <p>
          <span className="incorrect"></span> = Salah
        </p>
        <p>
          <span className="unanswered"></span> = Kosong
        </p>
        <p>
          <span className="active"></span> = Dipilih
        </p>
      </div>
      <div className="grid">{renderQuestionNumbers}</div>
    </div>
  );
};

export default React.memo(QuestionGrid);
