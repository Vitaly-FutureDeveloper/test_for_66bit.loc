import { createSelector } from 'reselect';

const getEditModeSelector = (state) => state.reductorPage.editMode;
export const getEditMode = createSelector(getEditModeSelector, (editMode) => editMode);

const getAllSectionsReductorSelector = (state) => state.reductorPage.allSectionsReductor;
export const getAllSectionsReductor =
	createSelector(getAllSectionsReductorSelector, (allSectionsReductor) => allSectionsReductor);