'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Header, Card } from '@/components';
import { useRouter } from 'next/navigation';
import { ModuleContainer } from '@/module';
import { ITryoutCategoryDto } from '@/module/tryout';

const TryoutCategoryPage: React.FC = React.memo(() => {
  const router = useRouter();
  const [state, setState] = useState<ITryoutCategoryDto[]>();
  const goToPage = (id: string) => {
    router.push(`/tryout/list?id=${id}`);
  };
  const style = useMemo(
    () => ({
      page: {
        minHeight: '100vh',
        padding: '32px',
      },
    }),
    [],
  );
  const { getTryoutCategory } = useMemo(() => {
    return new ModuleContainer().tryoutContainer.tryoutController();
  }, []);

  useEffect(() => {
    getTryoutCategory()
      .then((res) => {
        setState(res);
      })
      .catch((err) => {
        console.log(err, 'error');
      })
      .finally(() => {
        console.log('done');
      });
  }, [getTryoutCategory]);
  return (
    <div style={style.page}>
      <Header title="Try Out Category" subtitle="Pilih kategori tryout" />
      <div style={{ gap: '10px' }} className="flex-row">
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
