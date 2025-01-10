import React from 'react';
import { PeopleCards } from './Cards';
import Pagination from './Pagination';
import { PersonChange } from '@/types/types';

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
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">Trending People</h1>
      </div>
        <PeopleCards people={currentPeople} />
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
