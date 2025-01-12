import React from 'react';
import '../css/Button.css';

interface LabelProps {
  text: string;
  primary?: boolean;
}

const Button: React.FC<LabelProps> = ({ text, primary }) => {
  if (primary) {
    return (
      <div className="bg-primary" style={{ padding: '4px' }}>
        {text}
      </div>
    );
  }

  return (
    <div className="bg-regular" style={{ padding: '4px' }}>
      {text}
    </div>
  );
};

export default React.memo(Button);
