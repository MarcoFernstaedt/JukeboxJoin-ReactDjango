import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePagee";

const App = () => {
  return (
    // <div className="center">
      <Router className='center'>
        <HomePage />
      </Router>
    // </div>
  );
};

// select app div by id
const appDiv = document.getElementById("app");
// check if appDiv exist
if (appDiv !== null) {
  // mounting react component to the DOM
  const root = ReactDOM.createRoot(appDiv);
  // render app component
  root.render(<App />);
} else {
  console.log("App div not found");
}

export default App;
