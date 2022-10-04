import reductorReducer, {EDIT_TEXT, EDIT_UI, initialState, setEditModeAC} from "./reductor-reducer";
import { cloneDeep } from "lodash";

const state = cloneDeep(initialState);

describe("reductor-reducer all Action Creators (simple)", () => {

	test('Меняется playBackgroundMusic', () => {
		let action = setEditModeAC(EDIT_UI);
		let newState = reductorReducer(state, action);

		expect(newState.editMode).toBe(EDIT_UI);

		action = setEditModeAC(EDIT_TEXT);
		newState = reductorReducer(state, action);

		expect(newState.editMode).toBe(EDIT_TEXT);
	});



});