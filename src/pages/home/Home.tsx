import React from "react"
// import './style.scss'
import Style from './style.scss'
import A from './aa.png';
import T from './tt.png';

export const Home = () => {
    console.log(a)
    console.log(`${UMI_CLIENT_API_URL}/dsa/a`);
    return (
        <div className={Style.home}>
            <img src={A}></img>
            <img src={T}></img>
            <span>12313</span>
            <span>{a}</span>
            {/* <span>{UMI_CLIENT_API_URL}</span> */}
        </div>
    )
}