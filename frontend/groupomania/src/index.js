import React from 'react';
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

import App from './App';
//import "./styles";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
