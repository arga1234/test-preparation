import React from 'react';
import '../css/Dialog.css';

interface DialogBoxProps {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode; // Form content defined by child component
}

const DialogBox: React.FC<DialogBoxProps> = React.memo(
  ({ isVisible, title, onClose, onSubmit, children }) => {
    if (!isVisible) return null;

    return (
      <div className="dialog-overlay">
        <div className="dialog-modal">
          <div className="dialog-header">
            <h2>{title}</h2>
            <button className="dialog-close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="dialog-content">{children}</div>
          <div className="dialog-footer">
            <button className="dialog-button" onClick={onClose}>
              Cancel
            </button>
            <button
              className="dialog-button dialog-submit-button"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export { DialogBox };
