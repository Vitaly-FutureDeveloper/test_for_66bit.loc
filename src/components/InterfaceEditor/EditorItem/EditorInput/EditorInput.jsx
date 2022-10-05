import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Input} from 'antd';

import styles from './../../InterfaceEditor.module.scss';
import {getInputName, getInputType, getInputValue} from "../../../../redux/redactor-selector";
import {setOptionKeyThunk, setOptionValueThunk} from "../../../../redux/redactor-reducer";

export const EditorInput = ({indexOption, indexSections}) => {
	const dispatch = useDispatch();

	const [optionKeyEditMode, setOptionKeyEditMode] = useState(false);

	const inputType = useSelector( (state) => getInputType(state, indexSections, indexOption) );
	const inputName = useSelector( (state) => getInputName(state, indexSections, indexOption) );
	const inputValue = useSelector( (state) => getInputValue(state, indexSections, indexOption) );

	const onChangeValue = (evt) => {
		dispatch( setOptionValueThunk(indexSections, indexOption, evt.currentTarget.value) );
	};

	const onChangeKey = (evt) => {
		dispatch( setOptionKeyThunk(indexSections, indexOption, evt.currentTarget.value) );
	};

	return (
		<label className={styles.labelInput}>
			{
				optionKeyEditMode ?

					<Input className={styles.editorInput} onChange={onChangeKey} onBlur={ () => setOptionKeyEditMode(false) } placeholder="Значение опции" type='text' value={inputName} />
					:
					<div onClick={ () => setOptionKeyEditMode(true) }>{inputName}</div>
			}

			<Input className={styles.editorInput} onChange={onChangeValue} placeholder="Значение" type={inputType} value={inputValue} />
		</label>
	);
};