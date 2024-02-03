import Draggable from '@/components/draggable/draggable';

interface OffersListProps {
  children: React.ReactNode;
}

const OffersList = (props: OffersListProps) => {
  const { children } = props;

  return (
    <Draggable as="ul" className="flex overflow-auto gap-4 scrollbar-hide">
      {children}
    </Draggable>
  );
};

export default OffersList;
