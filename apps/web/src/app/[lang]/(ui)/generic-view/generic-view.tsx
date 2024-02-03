import * as Grid from '@/components/grid/grid';

interface GenericViewProps {
  title: string;
  children: React.ReactNode;
}

const GenericView = (props: GenericViewProps) => {
  const { title, children } = props;

  return (
    <main className="bg-[rgb(105,98,109)]/10 pt-24 pb-10">
      <Grid.Root className="md:mx-20">
        <Grid.Item className="bg-white rounded-lg border p-4" col="12">
          <h1 className="text-4xl font-bold text-black/90">{title}</h1>
          <div className="mt-10">{children}</div>
        </Grid.Item>
      </Grid.Root>
    </main>
  );
};

export default GenericView;
