import React from 'react';
import '../css/Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const ButtonComponent: React.FC<ButtonProps> = React.memo(
  ({ text, disabled, style, onClick, className }) => {
    return (
      <button
        style={style}
        disabled={disabled ? true : false}
        className={disabled ? 'disabled' : className}
        onClick={onClick}
      >
        {text}
      </button>
    );
  },
);

export { ButtonComponent };
