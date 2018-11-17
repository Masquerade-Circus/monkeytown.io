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

let KeyboardFactory = function (element) {
    let Keyboard = {
        target: null,
        pressedKeys: [],
        mouse: {
            x: 0,
            y: 0
        },
        code(x) {
            return special[x] ||
                modifiers[x] ||
                f[x] ||
                x.toUpperCase().charCodeAt(0);
        },
        isPressed(x) {
            return Keyboard.pressedKeys.indexOf(Keyboard.code(x)) !== -1;
        },
        pressKey(key) {
            Keyboard.pressedKeys.push(Keyboard.code(key));
        },
        keyDownListener(event) {
            Keyboard.target = event.target;
            if (Keyboard.pressedKeys.indexOf(event.keyCode) === -1) {
                Keyboard.pressedKeys.push(event.keyCode);
            }
        },
        keyUpListener(event) {
            let index = Keyboard.pressedKeys.indexOf(event.keyCode);
            if (index !== -1) {
                Keyboard.pressedKeys.splice(index, 1);
            }
        },
        mouseMoveListener(event) {
            Keyboard.target = event.target;
            Keyboard.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            Keyboard.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
    };

    if (element !== undefined) {
        let el = typeof element === 'string'
            ? document.querySelectorAll(element)[0]
            : element;

        el.addEventListener
            ? el.addEventListener('keydown', Keyboard.keyDownListener, false)
            : el.attachEvent('onkeydown', Keyboard.keyDownListener);

        el.addEventListener
            ? el.addEventListener('keyup', Keyboard.keyUpListener, false)
            : el.attachEvent('onkeyup', Keyboard.keyUpListener);

        el.addEventListener
            ? el.addEventListener('mousemove', Keyboard.mouseMoveListener, false)
            : el.attachEvent('onmousemove', Keyboard.mouseMoveListener);
    }

    return Keyboard;
};

module.exports = KeyboardFactory;
