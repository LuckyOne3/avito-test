
import React from 'react';

type TData = {
    "image": string,
    "color": string,
    "text" : string
}

type Props = {
    data: TData
}

export const Previewer: React.FC<Props> = (props) => {
    return (
        <div className="halfPage">
            <div className="container-inner">
                {props.data.color}
                <br/>
                {props.data.text}
                <br/>

                <img id="target" alt="background" src={props.data.image}/>
            </div>
        </div>
    );
}
