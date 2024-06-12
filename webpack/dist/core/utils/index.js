"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runLoaderByEnv = void 0;
function runLoaderByEnv(plugins, env, sc) {
    if (sc.length === 0)
        return [];
    const isBack = sc.includes(env);
    return isBack ? plugins : [];
}
exports.runLoaderByEnv = runLoaderByEnv;
