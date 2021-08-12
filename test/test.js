Object.prototype.forEach = function(clb) {
    Object.keys(this).forEach((key)=> {
        clb(this[key], key)
    });
}
///////////////////////////////////////////////////////////////





let o = {
    name: 'test', 
    age: 12, 
    type: 'ms'
}



o.forEach((val, key)=> {
    val
    key
});
