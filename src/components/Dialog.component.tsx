import React, { useMemo } from 'react';

interface DialogBoxProps {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode; // Form content defined by child component
}

const DialogBox: React.FC<DialogBoxProps> = React.memo(
  ({ isVisible, title, onClose, onSubmit, children }) => {
    const styles: { [key: string]: React.CSSProperties } = useMemo(
      () => ({
        dialogOverlay: {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        dialogModal: {
          backgroundColor: '#fff',
          borderRadius: '8px',
          minWidth: '400px',
          maxWidth: '90%',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        },
        dialogHeader: {
          padding: '16px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        dialogCloseButton: {
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
        },
        dialogContent: {
          padding: '16px',
        },
        dialogFooter: {
          padding: '16px',
          borderTop: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px',
        },
        dialogButton: {
          padding: '8px 16px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ddd',
          cursor: 'pointer',
          backgroundColor: '#f5f5f5',
        },
        dialogSubmitButton: {
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
        },
      }),
      [],
    );

    if (!isVisible) return null;

    return (
      <div style={styles.dialogOverlay}>
        <div style={styles.dialogModal}>
          <div style={styles.dialogHeader}>
            <h2>{title}</h2>
            <button style={styles.dialogCloseButton} onClick={onClose}>
              &times;
            </button>
          </div>
          <div style={styles.dialogContent}>{children}</div>
          <div style={styles.dialogFooter}>
            <button style={styles.dialogButton} onClick={onClose}>
              Cancel
            </button>
            <button
              style={{ ...styles.dialogButton, ...styles.dialogSubmitButton }}
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
