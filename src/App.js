import React from "react";
import "./App.css";
import AccountList from "./components/AccountList";
function App() {
  return <AccountList enablePagination={true} enableSorting={true} />;
}

export default App;
