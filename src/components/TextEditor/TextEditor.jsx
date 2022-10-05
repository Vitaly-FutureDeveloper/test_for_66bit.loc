import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { Input, Button } from 'antd';
import styles from './TextEditor.module.scss';
import {setINITextThunk} from "../../redux/redactor-reducer";
import {LocalStorage} from "../../api/localStorage";

const { TextArea } = Input;


export const TextEditor = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState('');

	useEffect(() => {
		setValue( LocalStorage.getINI() );
	}, []);

	const onChangeText = (evt) => {
		setValue(evt.currentTarget.value);
	};

	const onSaveIniText = () => {
		dispatch( setINITextThunk(value) );
	};

	return <section>
		<TextArea className={styles.textForm} rows={15} value={value} spellCheck={false} onChange={onChangeText} />
		<Button onClick={onSaveIniText} className={styles.submitBtn}>СОХРАНИТЬ</Button>
	</section>
}