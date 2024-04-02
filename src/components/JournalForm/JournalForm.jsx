import { useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		date: true,
		text: true
	});

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);

		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState((state) => ({ ...state, title: false }));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({ ...state, title: true }));
		}
		if (!formProps.text?.trim().length) {
			setFormValidState((state) => ({ ...state, text: false }));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({ ...state, text: true }));
		}
		if (!formProps.date) {
			setFormValidState((state) => ({ ...state, date: false }));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({ ...state, date: true }));
		}
		if (!isFormValid) {
			return;
		}
		onSubmit(formProps);
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<input
				type="text"
				name="title"
				// style={{ border: !formValidState.title ? '1px solid red' : undefined }}
				// className={`${styles.input} ${
				// 	!formValidState.title ? styles.invalid : ''
				// }`}
				className={cn(styles.input, {
					[styles.invalid]: !formValidState.title
				})}
			/>
			<input
				type="date"
				name="date"
				// className={`${styles.input} ${
				// 	!formValidState.date ? styles.invalid : ''
				// }`}
				className={cn(styles.input, {
					[styles.invalid]: !formValidState.date
				})}
			/>
			<input type="text" name="tag" />
			<textarea
				name="text"
				id=""
				cols="30"
				rows="10"
				// style={{ border: !formValidState.text ? '1px solid red' : undefined }}
				// className={`${styles.input} ${
				// 	!formValidState.text ? styles.invalid : ''
				// }`}
				className={cn(styles.input, {
					[styles.invalid]: !formValidState.text
				})}
			></textarea>
			<Button text="Save" />
		</form>
	);
}

export default JournalForm;
