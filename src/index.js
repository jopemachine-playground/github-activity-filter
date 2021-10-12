import { h } from 'dom-chef';
import select from 'select-dom';

const cardTypes = [
  'all',
  'follow',
  'fork',
  'push',
  'release',
  'repo',
  'sponsor',
  'watch_started',
];

let cards;
let type = 'all';

const inputStyle = { backgroundColor: '#03060A', color: '#C7CFD8', borderRadius: 5, height: 25 };

const initialize = () => {
  cards = null;
  select('#github-activity-filter-input').value = '';
};

const getCardContainer = () => {
  return select('#dashboard .news').children[3];
};

const getCards = () => {
  if (!cards) {
    const cardContainer = getCardContainer();

    cards = [...cardContainer.children].filter(element => {
      return element.tagName === 'DIV';
    });

    cardContainer.lastElementChild.addEventListener('onclick', initialize);
  }

  return cards;
};

const getFilteredCards = (query) => {
  return getCards().filter(card => {
    const text = card['innerText'];
    return !query || text.toLowerCase().includes(query.toLowerCase());
  });
};

const onFilterChangeHandler = (value) => {
  let filteredCards = getFilteredCards(value);

  if (type !== 'all') {
    filteredCards = filteredCards.filter((card) => {
      return type === card.className; 
    });
  }

  const docFragment = document.createDocumentFragment();
  filteredCards.forEach(card => { docFragment.appendChild(card); });

  getCardContainer().replaceChildren(docFragment);
};

const onDropdownChangeHandler = (e) => {
  type = e.target.value;
  onFilterChangeHandler(select('#github-activity-filter-input').value);
};

const insertFilter = () => {
  const news = select('#dashboard .news');

  news.prepend(
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="f4 text-normal pt-md-3">Activity filter</h2>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>
        <select id="github-activity-filter-dropdown" onChange={onDropdownChangeHandler} style={{
          ...inputStyle,
          width: 75,
          marginRight: 8,
        }}>
          {cardTypes.map((cardType) =>
            <option value={cardType}>{cardType}</option>
          )}
        </select>
        <input id="github-activity-filter-input" type="text" onChange={(e) => onFilterChangeHandler((e.target.value))}
          style={{
            ...inputStyle,
            width: 275,
          }}>
        </input>
      </div>
    </div>
  );
};

window.addEventListener('load', () => {
  if (select('#dashboard .news')) {
    insertFilter();
  } else {
    // console.log('not logged in');
  }
});