import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FormInputs} from "./components/formInputs/formInputs";
import {Previewer} from "./components/previewer/previewer";

type TData = {
    "image": string,
    "color": string,
    "text" : string,
    "href" : string
}

function App() {

    const [data, setData] = useState({
        "image": "",
        "color": "",
        "text" : "",
        "href" : ""
    });
    const updateData = (dataObj:TData) => {
        setData(dataObj)
    }


    return <div className="App">
        <div className="halfPage  form">
      <FormInputs updateData={updateData} />
        </div>
        <div className="halfPage" >
            <div className="container-inner" >
      <Previewer data={data} />
            </div>
        </div>
    </div>;
}

export default App;
