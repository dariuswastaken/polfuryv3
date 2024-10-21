export const flattenModules = (module) => {
    return Object.keys(module).reduce((acc, key) => {
        if (typeof module[key] === 'object' && !Array.isArray(module[key])) {
            Object.assign(acc, module[key]);
        } else {
            acc[key] = module[key];
        }
        return acc;
    }, {});
};
