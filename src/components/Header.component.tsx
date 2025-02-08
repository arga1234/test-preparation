import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = React.memo(
  ({ title, subtitle }) => {
    const styles: { [key: string]: React.CSSProperties } = React.useMemo(
      () => ({
        header: {
          marginBottom: '24px',
        },
        breadcrumb: {
          fontSize: '14px',
          color: '#b0b0b0',
        },
        headerH1: {
          fontSize: '32px',
          fontWeight: 'bold',
        },
      }),
      [],
    );

    return (
      <header style={styles.header}>
        <h1 style={styles.headerH1}>{title}</h1>
        <p style={styles.breadcrumb}>{subtitle}</p>
      </header>
    );
  },
);
