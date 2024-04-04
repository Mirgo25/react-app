import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

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

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));

		if (data) {
			setItems(
				data.map((item) => ({
					...item,
					date: new Date(item.date)
				}))
			);
		}
	}, []);

	useEffect(() => {
		if (items.length) {
			console.log('Write');
			localStorage.setItem('data', JSON.stringify(items));
		}
	}, [items]);

	const addItem = (item) => {
		setItems((oldItems) => [
			...oldItems,
			{
				text: item.text,
				title: item.title,
				date: new Date(item.date),
				id: oldItems.length ? Math.max(...oldItems.map(({ id }) => id)) + 1 : 1
			}
		]);
	};

	return (
		<div className={styles.app}>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={items} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem} />
			</Body>
		</div>
	);
}

export default App;
