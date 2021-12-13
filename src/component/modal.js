import React, {useState} from "react";
import { CModal,CModalHeader,CModalBody,CModalFooter,CButton,CModalTitle } from "@coreui/react/dist/index";
import { useDidMount } from "rooks";



/**
 *  ! Вызов через глобальный эммитер `"open.modal"`        
 *  `buttonTitle`: String == event name      
 *  `title`: String     
 *  `child`: JSX     
 *  `size`: 'sm' | 'lg' | 'xl' | ''
 */
export default function Modal() {
    const [child, setChildren] = useState()
    const [title, setTitle] = useState('')
    const [btnTitle, setBtnTitle] = useState('click')
    const [size, setSize] = useState(null)
    const [visible, setVisible] = useState(false);
    
    useDidMount(()=> {
        EVENT.on("open.modal", (arg)=> {
            setSize(arg.size ?? 'sm');
            setChildren(arg.child ?? <var>null</var>)
            setTitle(arg.title)
            setBtnTitle(arg.buttonTitle)
            setVisible(!visible);
        });
    });

    return(
        <>
            <CModal size={size} alignment="center" visible={visible} onClose={()=> setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>{ title }</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    { child }
                </CModalBody>
                <CModalFooter>
                    { btnTitle ? <CButton color="secondary" onClick={()=> EVENT.emit(btnTitle)}>{ btnTitle }</CButton> : "" }
                    <CButton color="danger" onClick={()=> setVisible(false)}> Close </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}