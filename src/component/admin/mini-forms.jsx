import React from 'react';
import { Card } from 'primereact/card';
import { useMouse } from 'rooks';


/**
 * При наведении на `target` раскрывается `child`
 */
export function PopUpForm({child, target}) {
    const [visible, setVisible] = React.useState(false);

    return(
        <div>
            <div style={{display:visible?"none":"block"}}
                onMouseEnter={()=> setVisible(true)}
            >
                { target }
            </div>
            <div style={{position:"fixed",display:visible?"block":"none",zIndex:2,left:useMouse().clientX+"px",top:useMouse().clientY+"px"}}
                onMouseLeave={()=> setVisible(false)}
            >
                { child }
            </div>
        </div>
    );
}
/**
 * Карточка с произвольным контентов в `child` и `header`    
 * две кнопки в низу        
 * footer: `[Function]`   
 */
export function MiniCard({child, header, footer}) {
    const headers = <span>{ header }</span>;
    const footers = (
        <span>
            <Button 
                onClick={footer[0]} 
                label="ok" 
                icon="pi pi-check" 
                style={{marginRight:'.25em'}}
            />
            <Button 
                onClick={footer[1]} 
                label="cancel" 
                icon="pi pi-times" 
                className="p-button-warning"
            />
        </span>
    );

    return(
        <Card footer={footers} header={headers}>
            { child }
        </Card>
    );
}

