import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Button } from 'antd';

import styles from './InterfaceEditor.module.scss';
import {getAllSectionsRedactor} from "../../redux/redactor-selector";
import {EditorItem} from "./EditorItem/EditorItem";
import {initialSectionFromLocalStorageThunk, setSectionThunk} from "../../redux/redactor-reducer";



export const InterfaceEditor = () => {
	const dispatch = useDispatch();

	const allSectionRedactor = useSelector( getAllSectionsRedactor );

	useEffect(() => {
		dispatch( initialSectionFromLocalStorageThunk() );
	}, []);

	const onAddSection = () => {
		dispatch( setSectionThunk() );
	}

	return <section>
		<ul className={styles.sectionList}>
			{
				allSectionRedactor.map((section, index) => <EditorItem key={section.sectionId} indexSections={index} />)
			}
		</ul>

		<div className={styles.btnBlock}>
			<Button onClick={onAddSection} className={styles.btnBlock__plus}> </Button>
			<span>Добавить новую секцию</span>
		</div>
	</section>
}