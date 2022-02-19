export const isNotEmpty = (val) => {
   return !isEmpty(val);
}

export const isEmpty = (val) => {
    if (val === undefined || val === null) {
        return true;
    }

    if (typeof val === 'string') {
        return val === '';
    }

    if (Array.isArray(val)) {
        return val.length === 0;
    }
}