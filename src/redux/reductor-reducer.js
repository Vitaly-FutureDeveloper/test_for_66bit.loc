export const EDIT_TEXT = "EDIT_TEXT";
export const EDIT_UI = "EDIT_UI";


const SET_EDIT_MODE = "SET_EDIT_MODE";

export const initialState = {
	editMode: EDIT_UI,
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

export default reductorReducer;