import { useRouter } from 'next/navigation';
import { ModuleContainer } from '@/module';
import { ITryoutCategoryDto } from '@/module/tryout';
import { useCallback, useEffect, useMemo, useState } from 'react';

const usePage = () => {
  //state
  const [state, setState] = useState<ITryoutCategoryDto[]>();

  //hooks
  const router = useRouter();

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

  const { getTryoutCategory } = useMemo(() => {
    return new ModuleContainer().tryoutContainer.tryoutController();
  }, []);

  //method
  const goToPage = useCallback(
    (id: string) => {
      router.push(`/tryout/list?id=${id}`);
    },
    [router],
  );

  //hooks
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
