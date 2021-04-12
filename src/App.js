import React from "react";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Users from "./screens/Users";
import Therapists from "./screens/Therapists";
import Invite from "./screens/Invite";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/users" component={Users} />
					<Route path="/administration" component={Therapists} />
					<Route path="/dashboard" component={Dashboard} />
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/invite/:uuid" component={Invite} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
