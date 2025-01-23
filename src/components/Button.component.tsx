import React from 'react';
import '../css/Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      disabled={disabled ? true : false}
      className={disabled ? 'disabled' : className}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default React.memo(Button);
