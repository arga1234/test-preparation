import React from 'react';
import '../css/Button.css';

interface LabelProps {
  text: string;
  primary?: boolean;
}

const LabelComponent: React.FC<LabelProps> = ({ text, primary }) => {
  if (primary) {
    return <div className="label-body bg-primary">{text}</div>;
  }

  return <div className="label-body bg-regular">{text}</div>;
};

export default React.memo(LabelComponent);
