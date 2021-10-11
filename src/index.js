import { jsxPlugin } from 'dom-chef';
import select from 'select-dom';
import FilterBar from './filterBar';

const insertFilter = () => {
  select('.news').prepend(<FilterBar></FilterBar>);
};

const fetchData = () => {
  select('#dashboard .news');
};

window.addEventListener('load', () => {
  insertFilter();
});