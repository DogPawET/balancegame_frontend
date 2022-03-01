import styles from './Medal.module.css';
import goldMedal from '../../Sources/goldMedal.png';
import silverMedal from '../../Sources/silverMedal.png';
import bronzeMedal from '../../Sources/bronzeMedal.png';


function Medal({color, name}) {

    return (
        <div className={styles.medal}>
            {color === "gold" && <img className={styles.isGold} src={goldMedal} alt="Gold Medal Image"/>}
            {color === "silver" && <img className={styles.exceptGold} src={silverMedal} alt="Silver Medal Image"/>}
            {color === "bronze" && <img className={styles.exceptGold} src={bronzeMedal} alt="Bronze Medal Image"/>}
            <span>{name}</span>
        </div>  
    );
}

export default Medal;