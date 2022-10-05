import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Descriptions, PageHeader} from "antd";

import {getEditMode} from "../../redux/redactor-selector";
import {EDIT_TEXT, EDIT_UI, setEditModeAC} from "../../redux/redactor-reducer";


export const Header = () => {
	const editMode = useSelector( getEditMode );

	const PRIMARY_BTN = "primary";
	const DEFAULT_BTN = "default";

	const dispatch = useDispatch();

	const [editBtnTypeText, setEditBtnTypeText] = useState('');
	const [editBtnTypeUI, setEditBtnTypeUI] = useState('');

	useEffect(() => {
		setEditBtnTypeText(() => editMode === EDIT_TEXT ? PRIMARY_BTN : DEFAULT_BTN );
		setEditBtnTypeUI(() => editMode === EDIT_UI ? PRIMARY_BTN : DEFAULT_BTN );
	}, [editMode]);



	const onChangeEditToText = () => {
		dispatch( setEditModeAC(EDIT_TEXT) );
	};
	const onChangeEditToUI = () => {
		dispatch( setEditModeAC(EDIT_UI) );
	};


	return <PageHeader
		ghost={false}
		title="Test Task"
		extra={[
			<Button onClick={onChangeEditToText} key="2" type={editBtnTypeText}>Текстовый редактор</Button>,
			<Button onClick={onChangeEditToUI} key="1" type={editBtnTypeUI}>Интерфейс</Button>,
		]}
	>
		<Descriptions  size="small" column={1}>
			<Descriptions.Item label="Created by">
				Vitaliy Future Developer
			</Descriptions.Item>

			<Descriptions.Item label="Specialist resume">
				<a target="_blank" href='https://ekaterinburg.hh.ru/resume/c3452b2dff08395f760039ed1f547061513548'>hh.ru</a>
			</Descriptions.Item>

			<Descriptions.Item label="Task">2022-10-05</Descriptions.Item>
		</Descriptions>


	</PageHeader>
};