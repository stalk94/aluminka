function checkOverlappingRects(rect1, rect2) {
    let rectPoly1 = [
        [rect1.top, rect1.left], 
        [rect1.top, rect1.left+rect1.width],
        [rect1.top+rect1.height, rect1.left+rect1.width],
        [rect1.top+rect1.height, rect1.left]
    ];
    let rectPoly2 = [
        [rect2.top, rect2.left], 
        [rect2.top, rect2.left+rect2.width],
        [rect2.top+rect2.height, rect2.left+rect2.width],
        [rect2.top+rect2.height, rect2.left]
    ];
}



onmessage =(dat)=> {
    let data = dat.data
    
    Object.keys(data.elems).forEach((key)=> {
        let hit = checkOverlappingRects(data.his, data.elems[key])
        if(hit) postMessage({[key]: hit})
    });
}