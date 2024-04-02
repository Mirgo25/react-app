import styles from './JournalItem.module.css';

function JournalItem({ title, date, text }) {
	const formatedDate = new Intl.DateTimeFormat('ua-UA').format(date);

	return (
		<>
			<h2 className={styles['journal-item__header']}>{title}</h2>
			<h2 className={styles['journal-item__body']}>
				<div className={styles['journal-item__date']}>{formatedDate}</div>
				<div className={styles['journal-item__text']}>{text}</div>
			</h2>
		</>
	);
}

export default JournalItem;
