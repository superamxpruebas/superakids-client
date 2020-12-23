import React from "react";
import Login from "./screens/Login";
import Pruebas from "./screens/Pruebas";
import Dashboard from "./screens/Dashboard";
import Users from "./screens/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/users" component={Users} />
					<Route path="/dashboard" component={Dashboard} />
					<Route exact path="/" component={Dashboard} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
