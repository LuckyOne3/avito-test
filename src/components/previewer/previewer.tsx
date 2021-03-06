import React from 'react';
// @ts-ignore
import {CopyToClipboard} from 'react-copy-to-clipboard';
// @ts-ignore
import Hyphenated from 'react-hyphen';
// @ts-ignore
import ru from 'hyphenated-ru';
import {exportComponentAsPNG} from 'react-component-export-image';
import RenderDom from 'react-dom/server';
import styled from 'styled-components';
import {ServerStyleSheet} from 'styled-components';


type TData = {
    "image": string,
    "color": string,
    "text" : string,
    "href" : string
}

type Props = {
    data: TData
}
type BackProps = {
    background: string
}

const WrapperForBanner = styled.div<BackProps>`
  position: relative;
  width: 141px;
  height: 188px;
  cursor: pointer;
  margin: auto;
  color:white;
  text-align: left;
  background: ${props => props.background ? props.background : `grey`};
  border-radius: 8px;
  
  &:after {
  position: absolute;
  top: -3px;
  right: -5px;
  content: '';
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #f71b47;
  border: 3px solid #fff;
}
  

`;

const TextInBanner = styled.div`

position: absolute;
width: 121px;
  left: 0px;
  margin-left: 10px;
  margin-right: 10px;
  bottom: 16px;
  font-size: 18px;
  line-height: 20px;
  max-height: 60px;
  overflow: hidden;
  overflow-wrap: break-word;
  font-family: Arial, sans-serif;

`;

const ImgInBanner = styled.img`
    height: auto;
    top: 10px;
    width: 100%;
    object-fit: cover;
    position: absolute;
    max-height: 90px;
`;



const HtmlForScreenShot = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
    <div  ref={ref} className="previewer-wrapper">
        {props.children}
    </div>
));

export const Previewer: React.FC<Props> = (props) => {

    const DownloadHtml = () => {
        const sheet = new ServerStyleSheet();
        const html = RenderDom.renderToString(sheet.collectStyles(
            <a href={props.data.href}>
            <WrapperForBanner id='previewer' background={props.data.color}>
                <ImgInBanner src={props.data.image || undefined}/>
                <TextInBanner>

                    {props.data.text }

                </TextInBanner>
            </WrapperForBanner>
            </a>
        ));
        const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
        const a = document.createElement('a');
        const file = new Blob([html, styleTags], {
            type: 'text/html',
        });
        a.href = URL.createObjectURL(file);
        a.download = 'banner';
        a.hidden = true;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        sheet.seal()
    }

    const ref = React.createRef() as React.RefObject<HTMLDivElement>;


    return (
        <>
            <HtmlForScreenShot ref={ref} >
                <a href={props.data.href}>
                <WrapperForBanner id='previewer' background={props.data.color}>
                    <ImgInBanner alt='' src={props.data.image}/>
                    <TextInBanner>

                            {props.data.text }

                    </TextInBanner>
                </WrapperForBanner>
                </a>
            </HtmlForScreenShot>
            <div className="export">
                <div>
                    <button onClick={() => exportComponentAsPNG(ref)} type="button"
                            className="btn btn-primary">сохранить в png
                    </button>
                    <CopyToClipboard>
                        <button type="button" className="btn btn-success" onClick={DownloadHtml}>скопировать баннер (html)
                        </button>
                    </CopyToClipboard>
                    <CopyToClipboard text={JSON.stringify(props.data)}>
                        <button type="button" className="btn btn-info">скопировать конфигурацию (json)</button>
                    </CopyToClipboard>

                </div>
            </div>
        </>
    );

}
