export function runLoaderByEnv<T>(plugins: T, env: string, sc: Array<'development' | 'production' | string>) {
    if (sc.length === 0) return []
    const isBack = sc.includes(env)
    return isBack ? plugins : []
}