'use client';
import { useState, useEffect } from "react";
import XYChart from "../../components/Scatter";
import Spiral3D from '../../components/TimeTrace';
import { SpeedTimeChart, calculateSpeed } from "../../components/ST";
import Header from '../../components/Header';
import styles from '../../styles/Result.module.css';
// import { useLottie } from "lottie-react";
// import animationData from '../../../public/Icons/loading.json'

export default function ResultPage() {
    const [drawData, setDrawData] = useState([]);
    const [result, setResult] = useState([]);
    const [speedData, setSpeedData] = useState([]); 

    // const options = {
    //     animationData,
    //     loop: true
    //   };
    // const {View} = useLottie(options)

    useEffect(() => {
        if (typeof window !== "undefined") { 
            const storedDrawData = localStorage.getItem("drawData");
            const storedResult = localStorage.getItem("resultFromApi");

            if (storedDrawData && storedResult) {
                const parsedDrawData = JSON.parse(storedDrawData);
                setDrawData(parsedDrawData);
                setResult(JSON.parse(storedResult));
            }
        }
    }, []);

    useEffect(() => {
        if (drawData.length > 1) {
            setSpeedData(calculateSpeed(drawData));
        }
    }, [drawData]);

    return (
        <>
        <Header showVideo={false}/>
        <div style={{backgroundColor:'black',color:'black',paddingTop:'80px'}}>
            <h2 style={{color:'white'}}>Analysis Result</h2>
            <p style={{color:'white'}}>Your DOS result is: {result.DOS}</p>
            <div className={styles.chartGrid}>
  <div className={styles.graphCard}>
    <h3>Spiral XY Plot</h3>
    <div className={styles.chartContainer}>
      <XYChart data={drawData} />
    </div>
  </div>

  <div className={styles.graphCard}>
    <h3>Speed vs. Time</h3>
    <div className={styles.chartContainer}>
      <SpeedTimeChart speedData={speedData} />
    </div>
  </div>

  <div className={styles.graphCard}>
    <h3>3D Spiral View</h3>
    <div className={styles.chartContainer}>
      <Spiral3D drawData={drawData} />
    </div>
  </div>

  <div className={styles.graphCard}>
    <h3>Pressure vs Time</h3>
    <div className={styles.chartContainer}>
      <p>Coming soon...</p>
    </div>
  </div>

  <div className={styles.graphCard}>
    <h3>Tremor Polar Plot</h3>
    <div className={styles.chartContainer}>
      {/* <>{View}</> */}
    </div>
  </div>

  <div className={styles.graphCard}>
    <h3>Speed vs Angle</h3>
    <div className={styles.chartContainer}>
      <p>Coming soon...</p>
    </div>
  </div>
</div>


        </div>
        </>
    );
}
