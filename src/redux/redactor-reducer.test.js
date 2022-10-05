import redactorReducer, {EDIT_TEXT, EDIT_UI, initialState, setEditModeAC} from "./redactor-reducer";
import { cloneDeep } from "lodash";

const state = cloneDeep(initialState);

describe("redactor-reducer all Action Creators (simple)", () => {

	test('Меняется playBackgroundMusic', () => {
		let action = setEditModeAC(EDIT_UI);
		let newState = redactorReducer(state, action);

		expect(newState.editMode).toBe(EDIT_UI);

		action = setEditModeAC(EDIT_TEXT);
		newState = redactorReducer(state, action);

		expect(newState.editMode).toBe(EDIT_TEXT);
	});



});