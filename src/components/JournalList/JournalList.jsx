import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
// import styles from './JournalList.module.css';

function JournalList({ items }) {
	if (!items.length) return <p>There are no items yet. Add some</p>;

	const sortItems = (a, b) => {
		if (a.date < b.date) return 1;
		return -1;
	};

	return (
		<>
			{items.sort(sortItems).map((el) => (
				<CardButton key={el.id}>
					<JournalItem title={el.title} date={el.date} post={el.post} />
				</CardButton>
			))}
		</>
	);
}

export default JournalList;
