
import React, {useEffect, useState} from 'react';

type TData = {
    "image": string,
    "color": string,
    "text" : string
}

type Props = {
    updateData: (object:TData)=>void,
}


export const FormInputs: React.FC<Props> = (props) => {
    const [data, setData] = useState({
        "image": "",
        "color": "",
        "text" : ""
    });

    useEffect(() => {
        // action on update of movies
        props.updateData(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);


    function handleChange(event: any, type:"color"|"image"|"text") {

        let tmp:TData = JSON.parse(JSON.stringify(data));
        if(type === "image"){
            let reader = new FileReader();
            reader.onload = (event:ProgressEvent<FileReader>) => {
                // @ts-ignore
                tmp[type] = event.currentTarget.result;
                setData(tmp);


            };
            reader.readAsDataURL(event.currentTarget.files[0]);

        }else{
            tmp[type] = event.currentTarget.value;
            setData(tmp);
        }

    }

    return (
        <div className="halfPage form ">
            <div className="form-group container-inner">
                <div className="custom-file form-control">
                    <input type="file" className="custom-file-input" id="customFile" onChange={(event) => handleChange(event,"image")}/>
                        <label className="custom-file-label" htmlFor="customFile">Выберите задний план для баннера</label>
                </div>

                <input className="form-control " type="text" placeholder="Цвет"    onChange={(event) => handleChange(event,"color")}/>
                <textarea className="form-control" id="exampleFormControlTextarea1" onChange={(event) => handleChange(event,"text")} placeholder="Текст внутри баннера"/>




                <div className="export">
                    <div>
                    <button type="button" className="btn btn-primary">сохранить в png</button>
                    <button type="button" className="btn btn-success">скопировать баннер (jsx)</button>
                    <button type="button" className="btn btn-info">скопировать конфигурацию (json)</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
