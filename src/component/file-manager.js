import React, { useState, useEffect } from 'react';
import FileManager, { Permissions, ItemView } from 'devextreme-react/file-manager';
import dir from "../img/icon/dir.png";
import file from "../img/icon/file.svg";
import fileImg from "../img/icon/img-file.svg";
import fileXml from "../img/icon/xml.png";




export default function FileManagers(props) {
    const style = {position:'absolute', top:55, left:0}
    const [state, setState] = useState({})
    

    const onOptionChanged =(e)=> {
        if(e.fullName==='itemView.mode') setState({itemViewMode: e.value});
    }
    const customizeIcon =(fileSystemItem)=> {
        if(fileSystemItem.isDirectory) return dir;
        const fileExtension = fileSystemItem.getFileExtension();

        switch(fileExtension){
            case '.png': return fileImg;
            case '.xml': return fileXml;
            default: return file;
        }
    }
    const onLoadFile =(e)=> {
        console.log(e)
        console.log(globalThis.$state.user.files)
        globalThis.$state.user.files
    }


    return(
        <div style={{visibility:props.visible}} className="FileManager">
            <FileManager height={props.height??450}
                fileSystemProvider={globalThis.$state.user.files}
                customizeThumbnail={customizeIcon}
                onOptionChanged={onOptionChanged}
                onFileUploaded={onLoadFile}
            >
                <ItemView mode={state}></ItemView>
                <Permissions {...globalThis.$state.user.permision}>
                </Permissions>
            </FileManager>
        </div>
    );
}