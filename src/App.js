import React, { useState, useEffect } from "react";
import Pages from "./pages/Pages";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import Scrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";

const App = () => {
  useEffect(() => {
    const bodyScrollBar = Scrollbar.init(document.body, {
      damping: 0.07,
    });
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Pages />
      </BrowserRouter>
    </div>
  );
};

export default App;
