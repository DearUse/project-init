import webpack from 'webpack'
import chalk from 'chalk';


import { configFactory } from '../config/webpack.config'



const buildConfig = configFactory('production')
const compiler = webpack(buildConfig);


compiler.run((params) => {
    console.log(params,'params')
    // if (err) {
    //     console.error(err.message,'error')
    //     return
    // }

    // console.log('compiler success!', err)
    // chalk.green(stats?.endTime)
})