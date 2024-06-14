import webpack from 'webpack'
import chalk from 'chalk';


import { configFactory } from '../config/webpack.config'



const buildConfig = configFactory('production')
const compiler = webpack(buildConfig);


compiler.run((err, stats:any) => {
    if (err) {
        console.error(err.message)
        return
    }

    console.log('compiler success!', err)
    chalk.green(stats?.endTime)
})