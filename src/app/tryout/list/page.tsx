'use client';
import React from 'react';
import { Header, CardV2 } from '@/components';
import { usePage } from './usePage';

const TryoutListPage: React.FC = React.memo(() => {
  const { style, state } = usePage();
  return (
    <div style={style.page}>
      <Header title="Try Out List" subtitle="Pilih tryout" />
      <div style={{ gap: '10px' }} className="flex-row">
        {state &&
          state.map((el, index) => (
            <CardV2
              key={index}
              title={el.title}
              rating={el.rating}
              reviews={el.review}
              questions={el.totalItem}
              time={el.totalTime}
            />
          ))}
      </div>
    </div>
  );
});

export default React.memo(TryoutListPage);
