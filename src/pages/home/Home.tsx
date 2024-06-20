import React from "react"
// import './style.scss'
import Style from './style.scss'
import A from './aa.png';
import T from './tt.png';
import { Contact } from '../contact';

export const Home = () => {
    console.log(a)
    // console.log(`${UMI_CLIENT_API_URL}/dsa/a`);
    return (
        <div className={Style.home}>
            <div style={{border:'1px solid #ddd'}}>
                Contact

                <Contact/>
            </div>
            <img src={A}></img>
            <img src={T}></img>
            <span>12313</span>
            <span>{a}</span>
            <div className={Style.box}></div>
            {/* <span>{UMI_CLIENT_API_URL}</span> */}
        </div>
    )
}