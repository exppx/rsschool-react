import NewsPage from '@/app/[locale]/(news)/page';

function Page(props: PageProps<'/[locale]'>) {
  return <NewsPage {...props} />;
}

export default Page;
