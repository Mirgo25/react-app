import styles from './App.module.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localStorage.hook';

// const INITIAL_DATA = [
// 	{
// 		id: 1,
// 		title: 'Title #1',
// 		date: new Date(),
// 		text: 'Some text 1.'
// 	},
// 	{
// 		id: 2,
// 		title: 'Title #2',
// 		date: new Date(),
// 		text: 'Some text 2.'
// 	}
// ];

function mapItems(items) {
	if (!items?.length) return [];
	return items.map((i) => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = useLocalStorage('data');

	const addItem = (item) => {
		setItems([
			...mapItems(items),
			{
				post: item.post,
				title: item.title,
				date: new Date(item.date),
				id: items.length ? Math.max(...items.map(({ id }) => id)) + 1 : 1
			}
		]);
	};

	return (
		<div className={styles.app}>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={mapItems(items)} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
