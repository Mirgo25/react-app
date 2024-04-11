import { useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (!(isValid.date && isValid.post && isValid.title)) {
			focusError(isValid);
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
				<Input
					type="text"
					name="title"
					value={values.title}
					ref={titleRef}
					// style={{ border: !formValidState.title ? '1px solid red' : undefined }}
					// className={`${styles.input} ${
					// 	!formValidState.title ? styles.invalid : ''
					// }`}
					// className={cn(styles['input-title'], {
					// 	[styles.invalid]: !isValid.title
					// })}
					isValid={isValid.title}
					appearance="title"
					onChange={setFormValue}
				/>
				{/* <img src="/archive.svg" /> */}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="Calendar icon" />
					<span>Date</span>
				</label>
				<Input
					id="date"
					type="date"
					name="date"
					value={values.date}
					ref={dateRef}
					// className={`${styles.input} ${
					// 	!formValidState.date ? styles.invalid : ''
					// }`}
					// className={cn(styles.input, {
					// 	[styles.invalid]: !isValid.date
					// })}
					isValid={isValid.date}
					onChange={setFormValue}
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="Folder icon" />
					<span>Tags</span>
				</label>
				<Input
					type="text"
					name="tag"
					id="tag"
					value={values.tag}
					// className={styles.input}
					onChange={setFormValue}
				/>
			</div>

			<textarea
				name="post"
				id=""
				cols="30"
				rows="10"
				value={values.post}
				ref={postRef}
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
