import React, { useState, useEffect } from 'react';
import FileManager, { Permissions, ItemView } from 'devextreme-react/file-manager';
import 'devextreme/dist/css/dx.light.css';
import ReactDOM from 'react-dom';
import dir from "../img/icon/dir.png";
import file from "../img/icon/file.svg";
import fileImg from "../img/icon/img-file.svg";
import fileXml from "../img/icon/xml.png";
import { useIntervalWhen } from "rooks";



const FileManagers =(props)=> {
    const [permisions, setPermisions] = useState({
        create:true,
        copy:true,
        move:true,
        delete:true,
        rename:true,
        upload:true,
        download:true
    });
    const [files, setFiles] = useState([])
    const [state, setState] = useState({})


    useIntervalWhen(()=> window.document.useState("files", setFiles), 8000, true)
    const onLoadFile =()=> {
        return {
            path: document.body.getAttribute("root"),
            files: files,
            token: store.get("token")
        }
    }
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


    return(
        <FileManager height={450}
            fileSystemProvider={files}
            customizeThumbnail={customizeIcon}
            onOptionChanged={onOptionChanged}
            onFileUploaded={()=> useApi("/file", onLoadFile(), (msg)=> {
                if(!msg.error) EVENT.emit("sucess", msg)
                else EVENT.emit("error", msg.error)
            })}
        >
            <ItemView mode={ state.itemViewMode }></ItemView>
            <Permissions {...permisions} >
            </Permissions>
        </FileManager>
    );
}


ReactDOM.render(<FileManagers/>, document.querySelector(".FileManager"))