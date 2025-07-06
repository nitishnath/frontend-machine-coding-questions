import React, {useState, useEffect} from 'react';
import styles from './traffic-light.module.css';
const TrafficLight = () => {
    const [active, setActive] = useState('red')

    useEffect(() => {
        switch (active) {
            case 'red':
                setTimeout(() => {
                    setActive('yellow')
                }, 4000)
                break;

                case 'yellow':
                setTimeout(() => {
                    setActive('green')
                }, 500)
                break;

                case 'green':
                setTimeout(() => {
                    setActive('red')
                }, 3000)
                break;
            default:
                break;
        }
    },[active])

    console.log(active, 'active');
    

    return(
        <>
        <h1>Traffic Light</h1>
        <div className={styles.trafficLight}>
            <span className={styles.green} style={{ opacity: active === 'green' ? 1 : 0.5 }}>A</span>
            <span className={styles.yellow} style={{ opacity: active === 'yellow' ? 1 : 0.5 }}>B</span>
            <span className={styles.red} style={{ opacity: active === 'red' ? 1 : 0.5 }}>C</span>
        </div>
        </>
    )
}

export default TrafficLight;