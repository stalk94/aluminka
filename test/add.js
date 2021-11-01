const {JSDOM} = require("jsdom");
const React = require("react")
const TestRenderer = require('react-test-renderer');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom
global.window = window
global.document = window.document
global.navigator = {
    userAgent: 'node.js',
};
global.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(id) {
    clearTimeout(id);
};
function copyProps(src, target) {
    Object.defineProperties(target, {
      ...Object.getOwnPropertyDescriptors(src),
      ...Object.getOwnPropertyDescriptors(target),
    });
}
copyProps(window, global)


const Test =()=> <div>
test
<var>1</var>
</div>

TestRenderer.create(<Test/>).toJSON()