import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormInputs} from "./components/formInputs/formInputs";
import {Previewer} from "./components/previewer/previewer";

type TData = {
    "image": string,
    "color": string,
    "text" : string
}

function App() {

    const [data, setData] = useState({
        "image": "",
        "color": "",
        "text" : ""
    });
    const updateData = (dataObj:TData) => {
        setData(dataObj)
    }

    return (
    <div className="App">
      <FormInputs updateData={updateData} />
      <Previewer data={data}/>
    </div>
  );
}

export default App;
