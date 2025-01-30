'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '../css/Card.css'; // Import CSS file

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      onClick={
        onClick
          ? () => onClick()
          : () => {
              //
            }
      }
      className="card"
    >
      <div className="content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <img src={imageUrl} alt={title} className="image" />
    </div>
  );
};
