const fs = require("fs");
const shell = require('shelljs');


// replace(/$/g)
global.reg ={
    minMax:(min, max)=> new RegExp(`/^[a-z0-9_-]{${min??3},${max??16}}$/`),             
    isNumber: new RegExp(/^\d{1,}$/),
    chank:(start, end)=> new RegExp(`/\d{${start},${end}}(?=(\d{3})+(?!\d))/g`),
    to: new RegExp(/^(?:.*\.(?=(fone)$))?[^.]*$/i),
    unwrap:(str)=> new RegExp(`/${str[0]}(.*?)${str[1]}/`),
}
/** 
 * inp:`string`|`[]`,out:`string` 
 */
exports.copyDirs =(inp, out)=> {
    if(typeof inp === "string") shell.cp('-R', inp, out);
    else if(inp instanceof Array) inp.forEach((dir)=> {
        shell.cp('-R', dir, out);
    });
}
/** 
 * paths: `string`|`[]`|`{}` 
 */
exports.readFilesDir =(paths)=> {
    let bufer = '';
    let o = {}

    if(typeof paths === "string") shell.ls(paths).forEach((file)=> {
        let st = file.split("/");
        o[st[st.length-1]] = fs.readFileSync(file, {encoding:"utf-8"})
    });
    else if(paths instanceof Array){
        paths.forEach((filePath)=> shell.ls(filePath).forEach((file)=> {
            bufer += fs.readFileSync(file, {encoding:"utf-8"})
        }));
    }
    else if(paths instanceof Object && typeof paths === "object"){
        Object.values(paths).forEach((filePath)=> shell.ls(filePath).forEach((file)=> {
            bufer += fs.readFileSync(file, {encoding:"utf-8"})
        }));
    }

    return o
}


global.bundle =(filesPath)=> shell.cat([...filesPath])
global.getDir =(dirPath, fd)=> exports.readFilesDir(`${dirPath}*.${fd}`)