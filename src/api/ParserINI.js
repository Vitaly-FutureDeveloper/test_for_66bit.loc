import {ConfigIniParser} from "config-ini-parser";
import {TYPE_NUMBER, TYPE_TEXT} from "../redux/constants/types";

const isNumeric = (num) => !isNaN(parseFloat(num)) && isFinite(num);

export const parseINIToObj = (iniContent) => {
	const parser = new ConfigIniParser();
	const objFromIni = parser.parse(iniContent)._ini.sections;

	const agregatedObj = objFromIni.map((item) => ({
		sectionId: Math.floor(Math.random() * 1000),
		name: item.name,
		options: item.options.map((optionsItem) => ({
			optionId: Math.floor(Math.random() * 1000000),
			name: optionsItem.name,
			value: optionsItem.value,
			type: isNumeric(optionsItem.value) ? TYPE_NUMBER : TYPE_TEXT,
		}))
	}));

	agregatedObj.splice(0, 1);

	return agregatedObj;
};

export const parseObjToINI = (objContent) => {
	const getOptions = (options) => {
		const stringArr = options.map((option) => {
			return `${option.name}=${option.value}\n`;
		});
		return stringArr.join('');
	};

	const parser = new ConfigIniParser();

	for(let i = 0; i < objContent.length; i++){
		parser.addSection(objContent[i].name);
		for(let j = 0; j < objContent[i].options.length; j++){
			//@sectionName, @optionName, @value
			parser.set(objContent[i].name, objContent[i].options[j].name, objContent[i].options[j].value);
		}
	}

	parser._ini.sections.splice(0, 1);
	const sections = parser._ini.sections;
	const arrayForString = sections.map((section) => {
		return `[${section.name.trim()}]\n${ getOptions(section.options).trim() }\n`
	});

	return arrayForString;
};