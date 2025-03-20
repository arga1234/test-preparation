'use client';
import React from 'react';
import { Header, Card } from '@/components';
import { usePage } from './usePage';

const TryoutCategoryPage: React.FC = React.memo(() => {
  const { style, state, goToPage } = usePage();
  return (
    <div style={style.page}>
      <Header title="Try Out" subtitle="Pilih kategori tryout" />
      <div style={{ gap: '10px', flexWrap: 'wrap' }} className="flex-row">
        {state &&
          state.map((el, index) => (
            <Card
              key={index}
              onClick={() => {
                goToPage(el.id);
              }}
              title={el.title}
              description={el.description}
              imageUrl={el.thumbnail}
            />
          ))}
      </div>
    </div>
  );
});

export default React.memo(TryoutCategoryPage);
