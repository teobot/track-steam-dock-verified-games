import { useEffect, useState } from "react";

import axios from "axios";

import "../css/App.css";

import { Chart } from "react-google-charts";

import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [data, setData] = useState([]);

  function timeConverter(unixTimestamp) {
    const milliseconds = unixTimestamp * 1000; // 1575909015000
    const dateObject = new Date(milliseconds);
    return `${dateObject.getDate()}/${
      dateObject.getMonth() + 1
    }/${dateObject.getFullYear()} ${dateObject.getHours()}:${dateObject.getMinutes()}`;
  }

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://gist.githubusercontent.com/teobot/4c7c2c3d620ba53e0c925d732db2c7ea/raw" +
          `?t=${Date.now().toString()}`
      );

      const filteredArr = res.data.saves.reduce((acc, current) => {
        const x = acc.find((item) => item.timestamp === current.timestamp);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setData(filteredArr);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    container: {
      position: "relative",
      backgroundColor: "#191919",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    chartDiv: {
      width: window.innerWidth * 0.9,
      height: window.innerHeight * 0.6,
      padding: 25,
      backgroundColor: "#2C3333",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: 25,
      borderRadius: 15,
    },
    chartTitle: {
      fontSize: "1.5em",
      fontWeight: "bold",
      color: "#F5F2E7",
      marginBottom: 10,
    },
    loader: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    chartStyles: {
      width: "100%",
      height: "100%",
    },
  };

  const chartOptions = (title) => {
    return {
      title: title,
      curveType: "function",
      legend: "none",
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App" style={styles.container}>
      <div style={styles.chartDiv}>
        <span className="roboto" style={styles.chartTitle}>
          Deck Verified Games
        </span>
        <Chart
          style={styles.chartStyles}
          className="chart"
          height={styles.chartStyles.height}
          width={styles.chartStyles.width}
          chartType="LineChart"
          loader={
            <div style={styles.loader}>
              <ClipLoader color="#F5F2E7" loading={true} size={100} />
            </div>
          }
          data={[
            ["Timeline", "Deck Verified Games"],
            ...data.map((d) => [timeConverter(d.timestamp), d.deckVerified]),
          ]}
          options={chartOptions("Steam Deck Verified Games")}
        />
      </div>

      <div style={styles.chartDiv}>
        <span className="roboto" style={styles.chartTitle}>
          Deck Verified At Least Playable
        </span>
        <Chart
          className="chart"
          height={styles.chartStyles.height}
          width={styles.chartStyles.width}
          chartType="LineChart"
          loader={
            <div style={styles.loader}>
              <ClipLoader color="#F5F2E7" loading={true} size={100} />
            </div>
          }
          data={[
            ["Timeline", "Deck Verified At Least Playable"],
            ...data.map((d) => [
              timeConverter(d.timestamp),
              d.deckVerifiedAtLeastPlayable,
            ]),
          ]}
          options={chartOptions("Deck Verified At Least Playable")}
        />
      </div>

      <div style={styles.chartDiv}>
        <span className="roboto" style={styles.chartTitle}>
          Reports
        </span>
        <Chart
          className="chart"
          height={styles.chartStyles.height}
          width={styles.chartStyles.width}
          chartType="LineChart"
          loader={
            <div style={styles.loader}>
              <ClipLoader color="#F5F2E7" loading={true} size={100} />
            </div>
          }
          data={[
            ["Timeline", "Reports"],
            ...data.map((d) => [timeConverter(d.timestamp), d.reports]),
          ]}
          options={chartOptions("Reports")}
        />
      </div>
    </div>
  );
}

export default App;
