import React from "react";
import {Provider, useSelector} from "react-redux";
import store from "./redux/redux";

import "antd/dist/antd.min.css";
import "./App.scss";
import {TextEditor} from "./components/TextEditor/TextEditor";
import {Header} from "./components/Header/Header";
import {InterfaceEditor} from "./components/InterfaceEditor/InterfaceEditor";
import {getEditMode} from "./redux/redactor-selector";
import {EDIT_TEXT, EDIT_UI} from "./redux/redactor-reducer";


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
