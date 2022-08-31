import './App.css';
import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const pageSize = 12;
    return (
      <>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/Business" element={<News key="Business" pageSize={pageSize} country="in" category="Business" />} />
            <Route exact path="/Entertainment" element={<News key="Entertainment" pageSize={pageSize} country="in" category="Entertainment" />} />
            <Route exact path="/General" element={<News key="General" pageSize={pageSize} country="in" category="General" />} />
            <Route exact path="/Health" element={<News key="Health" pageSize={pageSize} country="in" category="Health" />} />
            <Route exact path="/Science" element={<News key="Science" pageSize={pageSize} country="in" category="Science" />} />
            <Route exact path="/Sports" element={<News key="Sports" pageSize={pageSize} country="in" category="Sports" />} />
            <Route exact path="/Technology" element={<News key="Technology" pageSize={pageSize} country="in" category="Technology" />} />
          </Routes>
        </Router>
      </>
    )
}
export default App;