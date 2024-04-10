import { useEffect, useReducer } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;

	useEffect(() => {
		if (!(isValid.date && isValid.post && isValid.title)) {
			const timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);

			// Clear effect after disappearing the component or after render cycle
			return () => {
				clearTimeout(timerId);
			};
		}
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, values, onSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	const setFormValue = (e) => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: {
				[e.target.name]: e.target.value
			}
		});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<input
					type="text"
					name="title"
					value={values.title}
					// style={{ border: !formValidState.title ? '1px solid red' : undefined }}
					// className={`${styles.input} ${
					// 	!formValidState.title ? styles.invalid : ''
					// }`}
					className={cn(styles['input-title'], {
						[styles.invalid]: !isValid.title
					})}
					onChange={setFormValue}
				/>
				{/* <img src="/archive.svg" /> */}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="Calendar icon" />
					<span>Date</span>
				</label>
				<input
					id="date"
					type="date"
					name="date"
					value={values.date}
					// className={`${styles.input} ${
					// 	!formValidState.date ? styles.invalid : ''
					// }`}
					className={cn(styles.input, {
						[styles.invalid]: !isValid.date
					})}
					onChange={setFormValue}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="Folder icon" />
					<span>Tags</span>
				</label>
				<input
					type="text"
					name="tag"
					id="tag"
					value={values.tag}
					className={styles.input}
					onChange={setFormValue}
				/>
			</div>

			<textarea
				name="post"
				id=""
				cols="30"
				rows="10"
				value={values.post}
				// style={{ border: !formValidState.post ? '1px solid red' : undefined }}
				// className={`${styles.input} ${
				// 	!formValidState.post ? styles.invalid : ''
				// }`}
				className={cn(styles.input, {
					[styles.invalid]: !isValid.post
				})}
				onChange={setFormValue}
			></textarea>
			<Button text="Save" />
		</form>
	);
}

export default JournalForm;
