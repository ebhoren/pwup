/*
──────────────────────────────────────────
──────────────────────────────────────────
WIN
──────────────────────────────────────────
──────────────────────────────────────────
const windowHeight = win.height;
const path = win.path;
*/

const win = {
    get width() {
        return innerWidth;
    },

    get height() {
        return innerHeight;
    },

    get path() {
        return location.pathname;
    },

    get hostname() {
        return location.hostname;
    },

    get href() {
        return location.href;
    }
};

export default win;
