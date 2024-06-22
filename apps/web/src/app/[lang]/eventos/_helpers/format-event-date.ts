import type { Event } from '@/lib/directus/schema';

interface FormatEventDateProps {
  type: Event['type'];
  start_date: Event['start_date'];
  end_date: Event['end_date'];
  date: Event['date'];
}

const formatEventDate = (event: FormatEventDateProps) => {
  const { type, start_date: startDate, end_date: endDate, date } = event;

  if (type === 'long_event') {
    const dateFormat = new Intl.DateTimeFormat('es', {
      month: 'long',
      day: 'numeric',
    });

    const yearFormat = new Intl.DateTimeFormat('es', {
      year: 'numeric',
    });

    return `${dateFormat.format(new Date(startDate ?? ''))} - ${dateFormat.format(new Date(endDate ?? ''))}, ${yearFormat.format(new Date(startDate ?? ''))}`;
  }

  if (type === 'one_day_event') {
    const dateFormat = new Intl.DateTimeFormat('es', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    return `${dateFormat.format(new Date(date ?? ''))}`;
  }

  const dateFormat = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `${dateFormat.format(new Date(date ?? ''))}`;
};

export { formatEventDate };
