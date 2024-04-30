import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import { sumBy, groupBy } from "lodash";

function Statistic() {
    const [chartData, setChartData] = useState([]);

    const fetchTraining = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in fetch: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                const groupActivity = groupBy(data, "activity");
                const chartArray = Object.entries(groupActivity).map(([activity, data]) => ({
                    name: activity,
                    Duration: sumBy(data, "duration"),
                }));
                setChartData(chartArray);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        fetchTraining();
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <ResponsiveContainer width="90%" height={400}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        label={{ value: "Duration (min)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip />
                    <Bar dataKey="Duration" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Statistic;
