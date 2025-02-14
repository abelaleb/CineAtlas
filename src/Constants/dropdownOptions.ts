// src/Constants/dropdownOptions.ts
import ascendingIcon from '../assets/images/Ascending.svg';
import descendingIcon from '../assets/images/Descending.svg';
export const genreOptions = [
  { value: 'all', label: 'All' },
  { value: '28', label: 'Action' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '27', label: 'Horror' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Sci-Fi' },
];

export const ratingOptions = [
  { value: 'all', label: 'All' },
  { value: '10', label: '🔟 10' },
  { value: '9', label: '9️⃣ 9' },
  { value: '8', label: '🎱 8' },
  { value: '7', label: '7️⃣ 7' },
  { value: '6', label: '6️⃣ 6' },
  { value: '5', label: '5️⃣ 5' },
  { value: '4', label: '4️⃣ 4' },
  { value: '3', label: '3️⃣ 3' },
  { value: '2', label: '2️⃣ 2' },
  { value: '1', label: '1️⃣ 1' },
  { value: '0', label: '0️⃣ 0' },
];

export const yearOptions = [
  { value: 'all', label: 'All' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2010-2019', label: '2010-2019' },
  { value: '2000-2009', label: '2000-2009' },
  { value: '1990-1999', label: '1990-1999' },
];

export const languageOptions = [
  { value: ' ', label: 'All' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
];

export const sortOptions = [
  { value: 'none', label: 'All' },

  {
    value: 'vote_count.desc',
    label: 'Vote Count',
    icon: descendingIcon,
  },
  {
    value: 'vote_count.asc',
    label: 'Vote Count',
    icon: ascendingIcon,
  },
  { value: 'popularity.desc', label: 'Popularity', icon: descendingIcon },
  { value: 'popularity.asc', label: 'Popularity', icon: ascendingIcon },
  { value: 'title.desc', label: 'Title (Z-A)', icon: descendingIcon },
  { value: 'title.asc', label: 'Title (A-Z)', icon: ascendingIcon },
  {
    value: 'vote_average.desc',
    label: 'Average Vote ',
    icon: descendingIcon,
  },
  {
    value: 'vote_average.asc',
    label: 'Average Vote',
    icon: ascendingIcon,
  },
];
