import React from 'react';
import CSS from 'csstype';
// @ts-ignore
import LinesEllipsis from 'react-lines-ellipsis';
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {exportComponentAsPNG } from 'react-component-export-image';

type TData = {
    "image": string,
    "color": string,
    "text": string
}

type Props = {
    data: TData
}

// @ts-ignore
const FancyButton = React.forwardRef((props, ref) => (<div ref={ref} className="previewer-wrapper">
        {props.children}
    </div>
));


export const Previewer: React.FC<Props> = (props) => {

    const styleDiv: CSS.Properties = {
        background: props.data.color
    };
    // @ts-ignore
    const htmlForBanner = () => {
        // @ts-ignore
        let find = document.getElementById('root').innerHTML

        let pattern = '<div id="previewer" (.*?)>(.*?)</div>';
        let matches = find.match(pattern);
        // @ts-ignore
        let result= matches;

        return result
    }

     let html = htmlForBanner();
    const ref = React.createRef();

        // @ts-ignore
    let block = <><FancyButton ref={ref}><div  id='previewer' className="previewer" style={styleDiv} >
                    <img id="target" alt='' src={props.data.image}/>

                    <div className="previewer-text">
                        <LinesEllipsis
                            text={props.data.text}
                            maxLine='3'
                            ellipsis=''
                        />
                    </div>

                </div></FancyButton>




                </>;

    let link = document.createElement('a');
    link.download = 'hello.html';

    let blob = new Blob(['<h1>Hello, world!</h1>'], {type: 'text/plain'});

    let reader = new FileReader();
    reader.readAsDataURL(blob); // конвертирует Blob в base64 и вызывает onload

    reader.onload = function() {
        // @ts-ignore
        link.href = reader.result; // url с данными

    };
    // @ts-ignore
    let downBlock = <div className="export"><div><button  onClick={() => exportComponentAsPNG(ref)} type="button" className="btn btn-primary" >сохранить в png</button>
            <CopyToClipboard text={html}>
                <button type="button" className="btn btn-success">скопировать баннер (html)</button>
            </CopyToClipboard>
            <CopyToClipboard text={JSON.stringify(props.data)}>
                <button type="button" className="btn btn-info">скопировать конфигурацию (json)</button>
            </CopyToClipboard>

        </div>
    </div>;

        return (
            <>
                {block}
                {downBlock}
            </>
        );

}
