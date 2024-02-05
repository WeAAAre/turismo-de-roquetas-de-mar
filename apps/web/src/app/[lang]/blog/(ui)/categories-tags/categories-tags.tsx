import { cn } from '@/lib/utils';

interface CategoriesTagsProps {
  categories: string[] | null;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const CategoriesTags = (props: CategoriesTagsProps) => {
  const { categories, className, variant = 'primary' } = props;

  if (!categories) return null;

  const categoryCls = cn('px-2 py-1 rounded-lg text-xs md:text-sm', {
    'bg-[#4B6BFB] text-white': variant === 'primary',
    'bg-[#4B6BFB]/10 text-[#4B6BFB] md:text-xs': variant === 'secondary',
  });

  return (
    <ul
      aria-label="Listado de categorías"
      className={cn('flex flex-wrap gap-2', className)}
    >
      {categories.map((category) => (
        <li className={categoryCls} key={category}>
          {category}
        </li>
      ))}
    </ul>
  );
};

export default CategoriesTags;
