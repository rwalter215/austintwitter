//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WordMap from './components/WordMap/WordMap';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
	<div>
		<Sidebar />
		 <Router history={browserHistory}>
		 	<Route path="/" component={App} />
		 	<Route path="/wordCloud" component={WordMap} />
		 </Router>
		<Footer /> 
	 </div>
,document.getElementById('root')
);
