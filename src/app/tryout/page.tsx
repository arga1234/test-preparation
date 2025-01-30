'use client';
import React from 'react';
import { Header, Card } from '@/components';
import { useRouter } from 'next/navigation';
import '../../css/Page.css'; // Import CSS file

const TryoutCategoryPage: React.FC = () => {
  const router = useRouter();
  const goToPage = (id: string) => {
    router.push(`/tryout/list?id=${id}`);
  };
  return (
    <div className="page">
      <Header title="Try Out" subtitle="Pilih tryout sesuai kategori" />
      <div style={{ gap: '10px' }} className="flex-row">
        <Card
          onClick={() => {
            goToPage('1');
          }}
          title="Try Out SKD"
          description="Tantang diri kamu untuk meraih skor tertinggi dari pengguna lain."
          imageUrl="https://www.dropbox.com/scl/fi/efiurp2btj3bnd1c4bdw5/rb_2150368549-1-1.png?rlkey=q55svu5hi3in1n7h5w3qn9n5z&st=tunvcxbp&raw=1"
        />
        <Card
          onClick={() => {
            goToPage('2');
          }}
          title="Try Out SKB"
          description="Kerjakan try out SKB sesuai bidang formasi yang kamu pilih."
          imageUrl="https://www.dropbox.com/scl/fi/1r2v26gg0leljy31ja1vp/hand-drawn-college-entrance-exam-illustration-b-1.png?rlkey=88k05cpbbn8wnglkxzoofm1up&st=nbq8moml&raw=1"
        />
      </div>
    </div>
  );
};

export default React.memo(TryoutCategoryPage);
