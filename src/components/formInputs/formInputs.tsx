
import React, {useEffect, useState} from 'react';

type TData = {
    "image": string,
    "color": string,
    "text" : string,
    "href" : string
}
type Props = {
    updateData: (object:TData)=>void,
}


export const FormInputs: React.FC<Props> = (props) => {
    const [data, setData] = useState({
        "image": "",
        "color": "",
        "text" : "",
        "href": ""
    });


    useEffect(() => {
        props.updateData(data)
        // eslint-disable-next-line
    }, [data]);


    function handleChange(event: any, type:"color"|"image"|"text"|"href") {

        let tmp:TData = JSON.parse(JSON.stringify(data));
        if(type === "image"){
            let reader = new FileReader();
            reader.onload = (event:ProgressEvent<FileReader>) => {
                // @ts-ignore
                tmp[type] = event.currentTarget.result;
                setData(tmp);


            };
            if(event.currentTarget.files[0]){
                reader.readAsDataURL(event.currentTarget.files[0]);
            }

        }else{
            tmp[type] = event.currentTarget.value;
            setData(tmp);
        }

    }

    return (
            <div className="form-group container-inner">
                <div className="custom-file form-control">
                    <input type="file" className="custom-file-input" id="customFile" onChange={(event) => handleChange(event,"image")}/>
                        <label className="custom-file-label" htmlFor="customFile">Выберите задний план для баннера</label>
                </div>

                <input className="form-control "  type="text" placeholder="Цвет в формате hex (#111111) или linear-gradient()" onChange={(event) => handleChange(event,"color")}/>
                <textarea className="form-control"  onChange={(event) => handleChange(event,"text")} placeholder="Текст внутри баннера"/>
                <input className="form-control "  type="text" placeholder="ссылка на нужную страницу страницу" onChange={(event) => handleChange(event,"href")}/>


            </div>
    );
}
