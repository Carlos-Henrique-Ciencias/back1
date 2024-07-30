const validCpf = (document) => {

    if (!document) return false

    document = document.replace(/[^\d]+/g, '');

    if (document.length !== 11) return false;

    if (/^(\d)\1+$/.test(document)) return false;

    let sum = 0;
    let rest;

    for (let index = 1; index <= 9; index++) {
        sum = sum + parseInt(document.substring(index - 1, index)) * (11 - index);
    }

    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) {
        rest = 0;
    }

    if (rest !== parseInt(document.substring(9, 10))) return false;
    sum = 0;

    for (let index = 1; index <= 10; index++) {
        sum = sum + parseInt(document.substring(index - 1, index)) * (12 - index);
    }

    rest = (sum * 10) % 11;

    if ((rest === 10) || (rest === 11)) {
        rest = 0;
    }

    if (rest !== parseInt(document.substring(10, 11))) return false;
    return true;
}

module.exports = {validCpf}