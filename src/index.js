import {h} from 'dom-chef';
import select from 'select-dom';

import * as styles from './styles.js';

const cardTypes = [
	'all',
	'follow',
	'fork',
	'push',
	'release',
	'repo',
	'sponsor',
	'watch_started'
];

let cards = [];
let moreButtonElement;
let initialized = false;

const getCardContainer = () => {
	return select('#dashboard .news').children[3];
};

const setCardContainer = cardElements => {
	const docFragment = document.createDocumentFragment();
	for (const card of cardElements) {
		docFragment.append(card);
	}

	if (moreButtonElement) {
		docFragment.append(moreButtonElement);
	}

	getCardContainer().replaceChildren(docFragment);
};

const initialize = () => {
	setCardContainer(cards);

	cards = [];
	initialized = false;
	moreButtonElement = null;
	select('#github-activity-filter-input').value = '';
	select('#github-activity-filter-dropdown').value = 'all';
};

const initializeCards = cardContainer => {
	if (!cardContainer) {
		return [];
	}

	if (!initialized) {
		const cardContainerArray = [...cardContainer.children];

		// Get added cards by clicking more button
		const moreCardContainer = cardContainerArray.find(element =>
			element.dataset.repositoryHovercardsEnabled !== undefined
		);

		const currentCards = cardContainerArray.filter(element =>
			element.tagName === 'DIV' && element.dataset.repositoryHovercardsEnabled === undefined
		);

		initializeCards(moreCardContainer);

		cards = [...currentCards, ...cards];

		if (!moreCardContainer) {
			initialized = true;

			if (cardContainer.lastElementChild.tagName === 'FORM') {
				moreButtonElement = cardContainer.lastElementChild;
				moreButtonElement.addEventListener('click', initialize);
			} else {
				moreButtonElement = null;
			}
		}
	}
};

const getFilteredCards = query => {
	initializeCards(getCardContainer());

	return cards.filter(card => {
		const text = card.textContent;
		return !query || text.toLowerCase().includes(query.toLowerCase());
	});
};

const onFilterChangeHandler = value => {
	let filteredCards = getFilteredCards(value);
	const type = select('#github-activity-filter-dropdown').value;

	if (type !== 'all') {
		filteredCards = filteredCards.filter(card => {
			return type === card.className;
		});
	}

	setCardContainer(filteredCards);
};

const onDropdownChangeHandler = () => {
	onFilterChangeHandler(select('#github-activity-filter-input').value);
};

const insertFilter = () => {
	const news = select('#dashboard .news');

	news.prepend(
		<div style={styles.outerContainer}>
			<h2 className="f4 text-normal pt-md-3">Activity filter</h2>
			<div style={styles.innerContainer}>
				<select
					id="github-activity-filter-dropdown"
					className="form-select form-select"
					style={styles.typeSelector}
					onChange={onDropdownChangeHandler}
				>
					{cardTypes.map(cardType =>
						<option value={cardType}>{cardType}</option>
					)}
				</select>
				<div style={{position: 'relative'}}>
					<input
						type="text"
						placeholder="Find activities…"
						id="github-activity-filter-input"
						className="form-control input-contrast input-block mb-3 js-filterable-field"
						style={styles.input}
						onChange={event => onFilterChangeHandler((event.target.value))}
					/>
					<img
						src="https://img.icons8.com/ios/50/000000/cancel.png"
						style={styles.closeButton}
						onClick={initialize}/>
				</div>
			</div>
		</div>
	);
};

window.addEventListener('load', () => {
	if (select('#dashboard .news')) {
		insertFilter();
	} else {
		// Console.log('not logged in');
	}
});
