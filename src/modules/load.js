Object.prototype.forEach = function(clb) {
    Object.keys(this).forEach((key)=> {
        clb(this[key], key)
    });
}


window.sessionStorage.get = function(key) {
    let val = this.getItem(key)
    if(val) return JSON.parse(val)
}
window.sessionStorage.set = function(key, val) {
    this.setItem(key, JSON.stringify(val))
}
if(window.localStorage.getItem("user")!==null) window.user = JSON.parse(window.localStorage.getItem("user"))
window.story = window.localStorage.getItem("story")===null ? [] : JSON.parse(window.localStorage.getItem("story"))
window.modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Закрыть",
    cssClass: ['modal', 'modal-window'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        return true;
        return false;
    }
});