import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import CodeMirror from '@uiw/react-codemirror';
import {css} from '@codemirror/lang-css';
import {githubLight} from '@uiw/codemirror-theme-github';

import {Button} from 'antd';

import styles from './TextEditor.module.scss';
import {setINITextThunk} from "../../redux/redactor-reducer";
import {LocalStorage} from "../../api/localStorage";


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
		<CodeMirror
			className={styles.codeEditor}
			value={value}
			theme={githubLight}
			height="200px"
			extensions={[css()]}
			onChange={onChangeText}
		/>

		<Button onClick={onSaveIniText} className={styles.submitBtn}>СОХРАНИТЬ</Button>
	</section>
}