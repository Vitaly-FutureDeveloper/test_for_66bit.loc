import {LocalStorage} from "../api/localStorage";

export const EDIT_TEXT = "EDIT_TEXT";
export const EDIT_UI = "EDIT_UI";

export const TYPE_TEXT = "TYPE_TEXT";
export const TYPE_NUMBER = "TYPE_NUMBER";


const SET_EDIT_MODE = "SET_EDIT_MODE";

export const initialState = {
	editMode: EDIT_UI,

	allSectionsReductor : [
		{
			sectionId: 0,
			sectionValues: [
				{
					valueId: 0,
					valueType: '',
					valueName: '',
					valueText: '',
				},
			],
		}
	],
};


const reductorReducer = (state=initialState, action) => {
	switch (action.type) {

		case SET_EDIT_MODE: {
			return {...state, editMode: action.edit}
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

export const setIniTextThunk = (iniText) => {
	return async (dispatch) => {
		LocalStorage.setIni(iniText);
	};
};

export default reductorReducer;