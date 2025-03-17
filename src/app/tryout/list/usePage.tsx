import { ModuleContainer } from '@/module';
import { ITryoutItemDto } from '@/module/tryout';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export const usePage = () => {
  //state
  const [state, setState] = useState<ITryoutItemDto[]>();

  //memo
  const style = useMemo(
    () => ({
      page: {
        minHeight: '100vh',
        padding: '32px',
      },
    }),
    [],
  );
  const { getTryoutItem } = useMemo(() => {
    return new ModuleContainer().tryoutContainer.tryoutController();
  }, []);

  //hooks
  const searchParam = useSearchParams();
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
  }, [getTryoutItem, searchParam]);

  return { state, style };
};
