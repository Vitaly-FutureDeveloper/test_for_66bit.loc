import React from "react";
import {Provider, useSelector} from "react-redux";
import store from "./redux/redux";

import 'antd/dist/antd.css';
import './App.scss';
import {ConfigIniParser} from "config-ini-parser";
import {TextEditor} from "./components/TextEditor/TextEditor";
import { Button, Descriptions, PageHeader } from 'antd';
import {Header} from "./components/Header/Header";
import {getEditMode} from "./redux/reductor-selector";
import {EDIT_TEXT, EDIT_UI} from "./redux/reductor-reducer";
import {InterfaceEditor} from "./components/InterfaceEditor/InterfaceEditor";


function App() {
  return (
		<Provider store={store}>
			<AppContent />
		</Provider>
  );
}

const AppContent = () => {

	const editMode = useSelector( getEditMode );

	const iniContent = `
[FirstSection]
IntegerKey = 42
StringKey = That’s true

[NewSection]
StringKeyToo = It was added here
	`;
	let parser = new ConfigIniParser();
	parser.parse(iniContent);
	let value = parser.get("FirstSection", "IntegerKey");
	console.log(value);

	return <main className="main">
		<header>
			<Header />
		</header>

		<div className="content">
			{ editMode === EDIT_TEXT && <TextEditor /> }
			{ editMode === EDIT_UI && <InterfaceEditor /> }
		</div>

	</main>
}

export default App;
