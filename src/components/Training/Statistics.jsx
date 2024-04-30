import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { sumBy, groupBy } from "lodash";
import CircularProgress from "@mui/material/CircularProgress";

function Statistic() {
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTraining();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      {loading ? (
        <CircularProgress />
      ) : (
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
      )}
    </div>
  );
}

export default Statistic;
