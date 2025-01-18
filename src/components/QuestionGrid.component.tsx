import React, { useCallback, useMemo } from 'react';
import '../css/QuestionGrid.css';
import { IQuestion, IQuestionStatus } from '@/module/question';

interface QuestionGridProps {
  isDiscussion?: boolean;
  questions: IQuestion[];
  onQuestionClick: (index: number) => void;
}

const QuestionGrid: React.FC<QuestionGridProps> = React.memo(
  ({ questions, isDiscussion, onQuestionClick }) => {
    const getStatusClass = useCallback((status?: IQuestionStatus) => {
      switch (status) {
        case 'correct':
          return 'correct';
        case 'incorrect':
          return 'incorrect';
        case 'answered':
          return 'correct';
        default:
          return 'unanswered';
      }
    }, []);

    const renderQuestionNumbers = useMemo(() => {
      return questions.map(({ id, status, isActive }, index) => (
        <div
          key={id}
          className={`question-number ${isActive ? 'active' : getStatusClass(status)}`}
          onClick={() => onQuestionClick(index)}
        >
          {index + 1}
        </div>
      ));
    }, [questions, getStatusClass, onQuestionClick]);

    return (
      <div className="question-grid border-1">
        <div className="mb-10">
          <p>
            <b>Nomor Soal</b>
          </p>
        </div>
        <div className="legend">
          <p>
            <span className="correct"></span> = Benar
          </p>
          {isDiscussion && (
            <p>
              <span className="incorrect"></span> = Salah
            </p>
          )}
          <p>
            <span className="unanswered"></span> = Kosong
          </p>
          <p>
            <span className="active"></span> = Aktif
          </p>
        </div>
        <div className="grid">{renderQuestionNumbers}</div>
      </div>
    );
  },
);

export { QuestionGrid };
