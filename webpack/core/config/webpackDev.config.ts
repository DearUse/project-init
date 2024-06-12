import { Configuration } from 'webpack-dev-server'

type WebPackConfig = import("webpack").Compiler | import("webpack").MultiCompiler | Configuration


export const config: WebPackConfig  = {
    hot: true,
    port:'8010',
    // proxy:{
        
    // }
}