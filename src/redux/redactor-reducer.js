import {cloneDeep} from "lodash";

import {LocalStorage} from "../api/localStorage";
import {parseINIToObj, parseObjToINI} from "../api/ParserINI";
import {TYPE_TEXT} from "./constants/types";

export const EDIT_TEXT = "EDIT_TEXT";
export const EDIT_UI = "EDIT_UI";

const SET_EDIT_MODE = "SET_EDIT_MODE";
const SET_ALL_SECTIONS_REDACTOR = "SET_ALL_SECTIONS_REDACTOR";

const SET_SECTION = "SET_SECTION";
const SET_OPTION = "SET_OPTION";

const SET_SECTION_KEY = "SET_SECTION_KEY";

const SET_OPTION_KEY = "SET_OPTION_KEY"
const SET_OPTION_VALUE = "SET_OPTION_VALUE"

export const initialState = {
	editMode: EDIT_UI,

	allSectionsRedactor : [],
/**
 * Должен иметь такую структуру
allSectionsRedactor : [
	{
		sectionId: 0,
		name: '',
		options: [
		{
			optionId: 0,
			type: '',
			name: '',
			value: '',
		},
	],
	}
]
*/
};


const getNewOption = (optionLength='') => ({
	optionId: Math.floor(Math.random() * 1000000),
	type: TYPE_TEXT,
	name: `DefaultKey${optionLength}`,
	value: 'DefaultValue',
});

const getNewSection = (sectionLength) => ({
	sectionId: Math.floor(Math.random() * 1000),
	name: `NewSection${sectionLength}`,
	options: [ getNewOption() ]
});


const redactorReducer = (state=initialState, action) => {
	switch (action.type) {

		case SET_EDIT_MODE: {
			return {...state, editMode: action.edit}
		}

		case SET_ALL_SECTIONS_REDACTOR: {
			return {...state, allSectionsRedactor: action.sections}
		}

		case SET_SECTION: {
			const body = cloneDeep(state);
			const sectionLength = body.allSectionsRedactor.length;
			body.allSectionsRedactor.push( getNewSection(sectionLength) );
			return body;
		}

		case SET_SECTION_KEY: {
			const body = {
				...state,
				...state.allSectionsRedactor,
				...state.allSectionsRedactor[action.indexSections],
			};
			body.allSectionsRedactor[action.indexSections].name = action.name;
			return body;
		}

		case SET_OPTION : {
			const body = cloneDeep(state);
			const optionLength = body.allSectionsRedactor[action.indexSections].options.length;
			body.allSectionsRedactor[action.indexSections].options.push( getNewOption(optionLength) );
			return body;
		}

		case SET_OPTION_KEY: {
			const body = {
				...state,
				...state.allSectionsRedactor,
				...state.allSectionsRedactor[action.indexSections].options[action.indexOption],
			};
			body.allSectionsRedactor[action.indexSections].options[action.indexOption].name = action.name;
			return body;
		}

		case SET_OPTION_VALUE: {
			const body = {
				...state,
				...state.allSectionsRedactor,
				...state.allSectionsRedactor[action.indexSections].options[action.indexOption],
			};
			body.allSectionsRedactor[action.indexSections].options[action.indexOption].value = action.value;
			return body;
		}

		default: {
			return state;
		}

	}

};

export const setEditModeAC = (edit) => ({
	type: SET_EDIT_MODE,
	edit,
});

export const setAllSectionsRedactorAC = (sections) => ({
	type: SET_ALL_SECTIONS_REDACTOR,
	sections,
});
export const initialSectionFromLocalStorageThunk = () => async (dispatch, getState) => {
	const iniText = LocalStorage.getINI();
	const objectFromINI = parseINIToObj(iniText);

	dispatch( setAllSectionsRedactorAC(objectFromINI) );
};

const _iniFromObjectToLocalStorageThunk = () => async (dispatch, getState) => {
	const sections = getState().redactorPage.allSectionsRedactor;
	const iniFromObj = parseObjToINI( sections ).join('\n');

	LocalStorage.setINI(iniFromObj);
};

const setSectionAC = () => ({ type: SET_SECTION });
export const setSectionThunk = () => async (dispatch) => {
	await dispatch( setSectionAC() );
	dispatch( _iniFromObjectToLocalStorageThunk() );
}

const setSectionKeyAC = (indexSections, name) => ({
	type: SET_SECTION_KEY,
	indexSections,
	name,
});
export const setSectionKeyThunk = (indexSections, name) => async (dispatch) => {
	await dispatch( setSectionKeyAC(indexSections, name) );
	dispatch( _iniFromObjectToLocalStorageThunk() );
}

const setOptionAC = (indexSections) => ({
	type: SET_OPTION,
	indexSections,
});
export const setOptionThunk = (indexSections) => async (dispatch) => {
	await dispatch( setOptionAC(indexSections) );
	dispatch( _iniFromObjectToLocalStorageThunk() );
}

const setOptionKeyAC = (indexSections, indexOption, name) => ({
	type: SET_OPTION_KEY,
	indexSections,
	indexOption,
	name,
});
export const setOptionKeyThunk = (indexSections, indexOption, name) => async (dispatch) => {
	await dispatch( setOptionKeyAC(indexSections, indexOption, name) );
	dispatch( _iniFromObjectToLocalStorageThunk() );
}

const setOptionValueAC = (indexSections, indexOption, value) => ({
	type: SET_OPTION_VALUE,
	indexSections,
	indexOption,
	value,
});
export const setOptionValueThunk = (indexSections, indexOption, value) => async (dispatch) => {
	await dispatch( setOptionValueAC(indexSections, indexOption, value) );
	dispatch( _iniFromObjectToLocalStorageThunk() );
}

export const setINITextThunk = (iniText) => {
	return async (dispatch) => {
		const objectFromINI = parseINIToObj(iniText);

		dispatch( setAllSectionsRedactorAC(objectFromINI) );

		LocalStorage.setINI(iniText);
	};
};

export default redactorReducer;