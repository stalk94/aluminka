import React from 'react';
import FileManager, { Permissions, ItemView } from 'devextreme-react/file-manager';
import dir from "../img/icon/dir.png";
import file from "../img/icon/file.svg";
import fileImg from "../img/icon/img-file.svg";
import fileXml from "../img/icon/xml.png";
import globalState from "../global.state";



export default function FileManagers({visible, height}) {
    const [state, setState] = React.useState({})
    

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
        globalState.user.files.set(e)
    }


    return(
        <div style={{visibility:visible?"visible":"hidden"}} className="FileManager">
            <FileManager height={height??450}
                fileSystemProvider={globalState.user.files.get()}
                customizeThumbnail={customizeIcon}
                onOptionChanged={onOptionChanged}
                onFileUploaded={onLoadFile}
            >
                <ItemView mode={state}/>
                <Permissions {...globalState.user.permision.get()}/>
            </FileManager>
        </div>
    );
}