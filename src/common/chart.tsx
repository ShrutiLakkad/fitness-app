import { Line } from "react-chartjs-2";

export interface IChartData {
  labels: string[];
  datasets: IDataSets[];
  height: number;
  width: number;
}
export interface IDataSets {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}
interface IProps {
  data: IChartData;
  height?: number;
  width?: number;
}

const Chart: React.FC<IProps> = ({ data, height, width }) => {
  return (
    <Line
      data={data}
      width={width}
      style={{ position: "fixed", bottom: "20px" }}
      height={height}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            ticks: {
              // display: false,
            },
            grid: {
              display: false,
            },
          },
          x: {
            ticks: {
              color: "#000000",
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            position: "top" as const,
            labels: {
              color: "#000000",
            },
          },
          title: {
            display: true,
          },
        },
      }}
    />
  );
};

export default Chart;
