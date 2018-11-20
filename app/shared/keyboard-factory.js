/**
 * This keyboard handler will be used both sides (server and client)
 * to get the pressed keys by the user
 */

let modifiers = {
    '⇧': 16, shift: 16,
    '⌥': 18, alt: 18, option: 18,
    '⌃': 17, ctrl: 17, control: 17,
    '⌘': 91, command: 91
};

let special = {
    backspace: 8, tab: 9, clear: 12,
    enter: 13, 'return': 13,
    esc: 27, escape: 27, space: 32,
    left: 37, up: 38,
    right: 39, down: 40,
    del: 46, 'delete': 46,
    home: 36, end: 35,
    pageup: 33, pagedown: 34,
    ',': 188, '.': 190, '/': 191,
    '`': 192, '-': 189, '=': 187,
    ';': 186, '\'': 222,
    '[': 219, ']': 221, '\\': 220
};

let f = {
    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123
};

let mouse = {
    left: 1,
    right: 3,
    middle: 2
};

let KeyboardFactory = function (element, preventContext = true) {
    let Keyboard = {
        target: null,
        pressedKeys: [],
        mouse: {
            x: 0,
            y: 0,
            b: [],
            d: 0
        },
        clearMouseDelta: null,
        code(x) {
            return special[x] ||
                modifiers[x] ||
                f[x] ||
                x.toUpperCase().charCodeAt(0);
        },
        isKeyPressed(x) {
            return Keyboard.pressedKeys.indexOf(Keyboard.code(x)) !== -1;
        },
        pressKey(key) {
            let code = Keyboard.code(key);
            if (Keyboard.pressedKeys.indexOf(code) === -1) {
                Keyboard.pressedKeys.push(code);
            }
        },
        isButtonPressed(x) {
            return Keyboard.mouse.b.indexOf(mouse[x]) !== -1;
        },
        pressButton(x) {
            if (Keyboard.mouse.b.indexOf(mouse[x]) === -1) {
                Keyboard.mouse.b.push(mouse[x]);
            }
        },
        keyListener(event) {
            if (event.type === 'keydown') {
                Keyboard.target = event.target;
                if (Keyboard.pressedKeys.indexOf(event.keyCode) === -1) {
                    Keyboard.pressedKeys.push(event.keyCode);
                }
                return;
            }

            if (event.type === 'keyup') {
                let index = Keyboard.pressedKeys.indexOf(event.keyCode);
                if (index !== -1) {
                    Keyboard.pressedKeys.splice(index, 1);
                }
            }
        },
        mouseListener(event) {
            Keyboard.target = event.target;
            Keyboard.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            Keyboard.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Fix cross browser button that triggered the event
            event.which ? event.which :
                event.button === 1 ? 1 :
                    event.button === 2 ? 3 :
                        event.button === 4 ? 2 : 1;

            if (event.type.indexOf('mousedown') !== -1) {
                if (Keyboard.mouse.b.indexOf(event.which) === -1) {
                    Keyboard.mouse.b.push(event.which);
                }
                return;
            }

            if (event.type.indexOf('mouseup') !== -1) {
                let index = Keyboard.mouse.b.indexOf(event.which);
                if (index !== -1) {
                    Keyboard.mouse.b.splice(index, 1);
                }
            }

            if (event.type.indexOf('mousewheel') !== -1 || event.type.indexOf('DOMMouseScroll') !== -1) {
                let delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
                Keyboard.mouse.d = delta;
                clearTimeout(Keyboard.clearMouseDelta);
                Keyboard.clearMouseDelta = setTimeout(() => {
                    Keyboard.mouse.d = 0;
                }, 150);
            }
        },
        addEvent(type, handler) {
            if (element !== undefined) {
                let el = typeof element === 'string'
                    ? document.querySelectorAll(element)[0]
                    : element;

                if (el.addEventListener) {
                    el.addEventListener(type, handler, false);
                    if (type === 'mousewheel') {
                        el.addEventListener('DOMMouseScroll', handler, false);
                    }
                } else {
                    el.attachEvent(`on${type}`, handler);
                }

            }
        },
        preventContext(event) {
            event.preventDefault();
        },
        reset() {
            Keyboard.pressedKeys = [];
            Keyboard.mouse.b = [];
            Keyboard.mouse.d = 0;
        }
    };

    Keyboard.addEvent('keydown', Keyboard.keyListener);
    Keyboard.addEvent('keyup', Keyboard.keyListener);
    Keyboard.addEvent('mousemove', Keyboard.mouseListener);
    Keyboard.addEvent('mousedown', Keyboard.mouseListener);
    Keyboard.addEvent('mouseup', Keyboard.mouseListener);
    Keyboard.addEvent('mousewheel', Keyboard.mouseListener);
    Keyboard.addEvent('contextmenu', Keyboard.preventContext);

    return Keyboard;
};

module.exports = KeyboardFactory;
