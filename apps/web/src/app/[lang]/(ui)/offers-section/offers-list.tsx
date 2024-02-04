import { cn } from '@/lib/utils';
import Draggable from '@/components/draggable/draggable';

interface OffersListProps {
  children: React.ReactNode;
  className?: string;
}

const OffersList = (props: OffersListProps) => {
  const { children, className } = props;

  return (
    <Draggable
      as="ul"
      className={cn('flex overflow-auto gap-4 scrollbar-hide', className)}
    >
      {children}
    </Draggable>
  );
};

export default OffersList;
