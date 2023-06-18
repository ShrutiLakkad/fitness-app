import { Bar } from "react-chartjs-2";

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
}
interface IProps {
  data: IChartData;
  height?: number;
  width?: number;
}

const BarChart: React.FC<IProps> = ({ data, height, width }) => {
  return (
    <Bar
      data={data}
      width={width}
      style={{ position: "fixed", bottom: "20px" }}
      height={height}
      options={{
        maintainAspectRatio: false,
        responsive: true,
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

export default BarChart;
