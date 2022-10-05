import { createSelector } from 'reselect';

const getEditModeSelector = (state) => state.redactorPage.editMode;
export const getEditMode = createSelector(getEditModeSelector, (editMode) => editMode);

const getAllSectionsRedactorSelector = (state) => state.redactorPage.allSectionsRedactor;
export const getAllSectionsRedactor =
	createSelector(getAllSectionsRedactorSelector, (allSectionsRedactor) => allSectionsRedactor);


const getSectionNameSelector = (state, index) => state.redactorPage.allSectionsRedactor[index].name;
export const getSectionName =
	createSelector(getSectionNameSelector, (name) => name);


const getOptionsSelector = (state, index) => state.redactorPage.allSectionsRedactor[index].options;
export const getOptions =
	createSelector(getOptionsSelector, (options) => options);



const getNameSelector = (state, indexSections, indexOption) =>
	state.redactorPage.allSectionsRedactor[indexSections].options[indexOption].name;
export const getInputName =
	createSelector(getNameSelector, (name) => name);

const getValueSelector = (state, indexSections, indexOption) =>
	state.redactorPage.allSectionsRedactor[indexSections].options[indexOption].value;
export const getInputValue =
	createSelector(getValueSelector, (value) => value);

const getInputTypeSelector = (state, indexSections, indexOption) =>
	state.redactorPage.allSectionsRedactor[indexSections].options[indexOption].type;
export const getInputType =
	createSelector(getInputTypeSelector, (options) => options);
