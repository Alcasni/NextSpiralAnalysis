"use client";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function XYChart({ data }) {
    return (
       <div style={{ width: "100%", height: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="X Coordinate" fill="white"/>
                    <YAxis type="number" dataKey="y" name="Y Coordinate" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={data} fill="#8884d8" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
