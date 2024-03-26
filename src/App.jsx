import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';

function App() {
	const data = [
		{
			title: 'Title #1',
			date: new Date(),
			text: 'Some text 1.'
		},
		{
			title: 'Title #2',
			date: new Date(),
			text: 'Some text 2.'
		}
	];
	return (
		<>
			<h1>Header</h1>
			<p>Some text</p>
			<Button />
			<CardButton>New memory</CardButton>
			<CardButton>
				<JournalItem
					title={data[0].title}
					date={data[0].date}
					text={data[0].text}
				/>
			</CardButton>
			<CardButton>
				<JournalItem
					title={data[1].title}
					date={data[1].date}
					text={data[1].text}
				/>
			</CardButton>
		</>
	);
}

export default App;
