'use client';
import { useState, useEffect } from "react";
import XYChart from "../../components/Scatter";
import Spiral3D from '../../components/TimeTrace';
import { SpeedTimeChart, calculateSpeed } from "../../components/ST";

export default function ResultPage() {
    const [drawData, setDrawData] = useState([]);
    const [result, setResult] = useState([]);
    const [speedData, setSpeedData] = useState([]); // ✅ Defined here

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

    // ✅ Compute speed data when drawData updates
    useEffect(() => {
        if (drawData.length > 1) {
            setSpeedData(calculateSpeed(drawData));
        }
    }, [drawData]);

    return (
        <div>
            <h1>Analysis Result</h1>
            <p>Total Points Recorded: {drawData.length}</p>
            <p>Your DOS result is: {result.DOS}</p>

            <XYChart data={drawData} />
            <SpeedTimeChart speedData={speedData} />
            <Spiral3D drawData={drawData} />
        </div>
    );
}
