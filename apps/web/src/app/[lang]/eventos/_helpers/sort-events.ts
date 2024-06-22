import type { Event } from '@/lib/directus/schema';

interface EventType {
  type: Event['type'];
  start_date: Event['start_date'];
  end_date: Event['end_date'];
  date: Event['date'];
  date_complete: Event['date_complete'];
}

const getReferenceDate = (event: EventType) => {
  switch (event.type) {
    case 'long_event':
      return event.start_date!;
    case 'one_day_event':
      return event.date;
    default:
      return event.date_complete!;
  }
};

const sortEvents = <TEvent extends EventType>(data: TEvent[]): TEvent[] => {
  return data.sort((a, b) => {
    return (
      new Date(getReferenceDate(a)).getTime() -
      new Date(getReferenceDate(b)).getTime()
    );
  });
};

export { sortEvents };
