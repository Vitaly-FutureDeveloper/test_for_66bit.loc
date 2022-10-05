import React from "react";
import {Provider, useSelector} from "react-redux";
import store from "./redux/redux";

import 'antd/dist/antd.css';
import './App.scss';
import {ConfigIniParser} from "config-ini-parser";
import {TextEditor} from "./components/TextEditor/TextEditor";
import { Button, Descriptions, PageHeader } from 'antd';
import {Header} from "./components/Header/Header";
import {getEditMode} from "./redux/redactor-selector";
import {EDIT_TEXT, EDIT_UI} from "./redux/redactor-reducer";
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
