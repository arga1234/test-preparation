'use client';
import React from 'react';

interface ICardV2Props {
  title: string;
  rating: number;
  reviews: number;
  questions: number;
  time: number;
}

const CardV2 = React.memo(
  ({ title, rating, reviews, questions, time }: ICardV2Props) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const styles = React.useMemo(
      () => ({
        cardHover: {
          transform: 'translateY(-5px)',
        },
        card: {
          background: 'linear-gradient(135deg, #2d2e33, #4b4b4b)',
          color: '#FFF',
          padding: '16px',
          borderRadius: '8px',
          width: '320px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s ease-in-out',
        },
        header: { display: 'flex', alignItems: 'center' },
        iconContainer: {
          backgroundColor: '#FFF',
          padding: '8px',
          borderRadius: '8px',
        },
        icon: { width: '24px', height: '24px' },
        title: { fontSize: '18px', fontWeight: 'bold' },
        ratingContainer: {
          display: 'flex',
          alignItems: 'center',
          margin: '5px 0px',
        },
        star: { color: 'yellow', marginRight: '4px' },
        rating: { marginRight: '4px' },
        reviews: { color: '#FFF', marginLeft: '5px' },
        details: {
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '10px',
        },
        detailText: { color: '#FFF' },
        buttonContainer: { display: 'flex', justifyContent: 'space-between' },
        button: {
          flex: 1,
          backgroundColor: '#FFF',
          padding: '10px',
          borderRadius: '4px',
          color: '#2d2e33',
          fontWeight: 'bold',
          border: 'none',
          margin: '0 4px',
          cursor: 'pointer',
        },
      }),
      [],
    );

    return (
      <div
        style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>{title}</h2>
            <div style={styles.details}>
              <span style={styles.detailText}>📄 {questions} Soal</span>
              <span style={styles.detailText}>⏳ {time} Menit</span>
            </div>
          </div>
        </div>
        <div style={styles.ratingContainer}>
          <span style={styles.star}>★</span>
          <span style={styles.rating}>{rating}</span>
          <a href="#" style={styles.reviews}>
            {reviews} review
          </a>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Kerjakan</button>
          <button style={styles.button}>Leaderboard</button>
        </div>
      </div>
    );
  },
);

export { CardV2 };
