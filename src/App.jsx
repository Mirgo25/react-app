import './App.css';
import Button from './components/Button/Button';
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
      <JournalItem
        title={data[0].title}
        date={data[0].date.toString()}
        text={data[0].text}
      />
      <JournalItem
        title={data[1].title}
        date={data[1].date.toString()}
        text={data[1].text}
      />
    </>
  );
}

export default App;
