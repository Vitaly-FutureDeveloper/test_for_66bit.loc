import React, {useState} from "react";
import { Input, Button } from 'antd';
import styles from './TextEditor.module.scss';
import {setIniTextThunk} from "../../redux/reductor-reducer";
import {useDispatch} from "react-redux";



const { TextArea } = Input;



export const TextEditor = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');

	const onChangeText = (evt) => {
		setValue(evt.currentTarget.value);
	};

	const onSaveIniText = () => {
		dispatch( setIniTextThunk(value) );
	};

	return <section className={'text-content'}>
		<TextArea className={styles.textForm} rows={15} value={value} onChange={onChangeText} />
		<Button onClick={onSaveIniText} className={styles.submitBtn}>СОХРАНИТЬ</Button>
	</section>
}