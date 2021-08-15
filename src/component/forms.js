import { inputAndSpan } from "./inputs";

/**
 * 
 * @param {*} props text, content
 * @returns 
 */
function Standart(props) {
    return(
        <div className="form">
            <div className="title">{props.text}</div>
            {props.content}
        </div>
    );
}