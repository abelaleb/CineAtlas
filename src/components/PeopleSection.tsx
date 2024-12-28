import React from 'react';
import { PersonChange } from '@/api/tmdb';
import { PeopleCards } from './Cards';
import Pagination from './Pagination';

interface PeopleSectionProps {
  people: PersonChange[];
  currentPeople: PersonChange[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  peoplePostPerPage: number;
}

const PeopleSection: React.FC<PeopleSectionProps> = ({
  people,
  currentPeople,
  currentPage,
  setCurrentPage,
  peoplePostPerPage,
}) => {
  return (
    <div className="flex flex-col">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Trending People</h1>
      </div>
      <div className="flex gap-4 p-4">
        <PeopleCards people={currentPeople} />
      </div>
      <Pagination
        totalPosts={people.length}
        postsPerPage={peoplePostPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default PeopleSection;
