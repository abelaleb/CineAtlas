import { MovieCards, TVShowCards, PeopleCards } from './Cards';
import { MovieChange, TVShowChange, PersonChange } from '@/types/types';

interface DynamicCardProps {
  mediaType: 'movie' | 'tv' | 'person';
  data: MovieChange | TVShowChange | PersonChange ;
}

const DynamicCard = ({ mediaType, data }: DynamicCardProps) => {
  switch (mediaType) {
    case 'movie':
      return <MovieCards movies={[data as MovieChange]} />;
    case 'tv':
      return <TVShowCards tvShows={[data as TVShowChange]} />;
    case 'person':
      return <PeopleCards people={[data as PersonChange]} />;
    default:
      return null;
  }
};

export default DynamicCard;