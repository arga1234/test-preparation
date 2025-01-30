'use client';
import React, { useState } from 'react';
import { ButtonComponent } from './Button.component';
import { DialogBox } from './Dialog.component';

interface IDialogButtonProps {
  label: string;
  buttonClassName?: string;
  onSubmit: () => void;
  children: React.ReactNode;
  dialogTitle?: string;
}

export const DialogButton: React.FC<IDialogButtonProps> = React.memo(
  ({ label, children, dialogTitle, buttonClassName, onSubmit }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    return (
      <>
        <ButtonComponent
          className={buttonClassName ? buttonClassName : 'primary'}
          text={label}
          onClick={() => {
            setIsVisible(true);
          }}
        />
        <DialogBox
          title={dialogTitle ? dialogTitle : 'Manage Data'}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onSubmit={onSubmit}
        >
          {children}
        </DialogBox>
      </>
    );
  },
);
