'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = React.memo(
  ({ title, description, imageUrl, onClick }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const styles = React.useMemo(
      () => ({
        card: {
          background: 'linear-gradient(135deg, #2d2e33, #4b4b4b)',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out',
          width: '100%',
          color: 'white',
          cursor: 'pointer',
          gap: '10px',
        },
        cardHover: {
          transform: 'translateY(-5px)',
        },
        content: {
          flex: 1,
          color: '#fff',
        },
        title: {
          fontSize: '1.5rem',
          marginBottom: '10px',
        },
        description: {
          fontSize: '1rem',
        },
        image: {
          width: '80px',
          height: 'auto',
          marginLeft: '15px',
        },
      }),
      [],
    );

    return (
      <div
        onClick={
          onClick ||
          (() => {
            //
          })
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
      >
        {imageUrl && <img src={imageUrl} alt={title} style={styles.image} />}
        <div style={styles.content}>
          <h2 style={styles.title}>{title}</h2>
          <p style={styles.description}>{description}</p>
        </div>
      </div>
    );
  },
);
