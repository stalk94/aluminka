
/**
 * 
 * @param {*} props name, type, text
 * @returns 
 */
export function inputAndSpan(props) {
    return(
        <div className="line">
            <span>{props.text}:</span><input type={props.type} name={props.name}></input>
        </div>
    );
}

