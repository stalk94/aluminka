//const { SVG, Point } = require("@svgdotjs/svg.js")

//const root = SVG().addTo('body').size(700, 700)
//root.addClass("root")

window.onload =()=> {
    root.on("click", (ev)=> {
        let point = root.point()
        point.x = ev.screenX
        point.y = ev.screenY
        console.log(point)
    });
}


