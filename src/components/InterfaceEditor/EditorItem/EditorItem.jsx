import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input} from 'antd';

import styles from './../InterfaceEditor.module.scss';
import {getOptions, getSectionName} from "../../../redux/redactor-selector";
import {EditorInput} from "./EditorInput/EditorInput";
import {setOptionThunk, setSectionKeyThunk} from "../../../redux/redactor-reducer";


export const EditorItem = ({indexSections}) => {
	const dispatch = useDispatch();

	const [sectionKeyEditMode, setSectionKeyEditMode] = useState(false);

	const sectionName = useSelector( (state) => getSectionName(state, indexSections) );
	const options = useSelector( (state) => getOptions(state, indexSections) );

	const onAddOption = () => {
		dispatch( setOptionThunk(indexSections) );
	};

	const onChangeKey = (evt) => {
		dispatch( setSectionKeyThunk(indexSections, evt.currentTarget.value) );
	};

	return <li className={styles.sectionList__item}>
		<div className={styles.sectionListWrap}>
			<header>
				{
					sectionKeyEditMode ?
						<Input className={styles.editorInput} onChange={onChangeKey} onBlur={ () => setSectionKeyEditMode(false) } placeholder="Значение секции" type='text' value={sectionName} />
						:
						<h2 onClick={ () => setSectionKeyEditMode(true) }>{sectionName}</h2>
				}

			</header>

			<div className={styles.sectionListBlock}>

				<div className={styles.inputsBlocks}>
					{
						options.map((option, index) => <EditorInput key={option.optionId} indexOption={index} indexSections={indexSections} />)
					}
				</div>

				<div className={styles.btnBlock}>
					<Button onClick={onAddOption} className={styles.btnBlock__plus}> </Button>
					<span>Добавить ключ</span>
				</div>

			</div>
		</div>
	</li>
}