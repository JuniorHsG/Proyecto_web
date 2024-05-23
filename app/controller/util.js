function generateUUID() {
    return 'xx3xxxxx-x8xx-xxxx-yxxx-xxxx5xxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
    }

module.exports = {
    generateUUID
};