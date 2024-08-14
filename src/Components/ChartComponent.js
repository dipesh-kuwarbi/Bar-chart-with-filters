import { Bar } from "react-chartjs-2";

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.interest_rate),
    datasets: [
      {
        label: "Number of lenders offering rate",
        data: data.map((item) => item.count_of_lenders),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ChartComponent;
