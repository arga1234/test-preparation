'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Header, CardV2 } from '@/components';
import { ModuleContainer } from '@/module';
import { ITryoutItemDto } from '@/module/tryout';
import { useSearchParams } from 'next/navigation';

const TryoutListPage: React.FC = React.memo(() => {
  const style = useMemo(
    () => ({
      page: {
        minHeight: '100vh',
        padding: '32px',
      },
    }),
    [],
  );
  const searchParam = useSearchParams();
  const [state, setState] = useState<ITryoutItemDto[]>();
  const { getTryoutItem } = useMemo(() => {
    return new ModuleContainer().tryoutContainer.tryoutController();
  }, []);

  useEffect(() => {
    const x = searchParam.get('id');
    getTryoutItem(x ? x : '1')
      .then((res) => {
        setState(res);
      })
      .catch(() => {
        //
      })
      .finally(() => {
        //
      });
  }, [getTryoutItem]);
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
