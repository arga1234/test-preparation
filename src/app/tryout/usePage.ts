import { useRouter } from 'next/navigation';
import { ModuleContainer } from '@/module';
import { ITryoutCategoryDto } from '@/module/tryout';
import { useCallback, useEffect, useMemo, useState } from 'react';

const usePage = () => {
  const router = useRouter();
  const [state, setState] = useState<ITryoutCategoryDto[]>();

  const goToPage = useCallback(
    (id: string) => {
      router.push(`/tryout/list?id=${id}`);
    },
    [router],
  );

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

  return { state, style, goToPage };
};

export { usePage };
