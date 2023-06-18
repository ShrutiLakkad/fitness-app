import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import moment from 'moment-timezone';
import ChartComponent, { IChartData } from '../../common/linechart'


// export const formatDate = (date: any, format?: string) => {
//     if (!date) {
//         return '';
//     }
//     return moment(date)
//         .local()
//         .format(format || 'DD-MM-YYYY');
// };

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface ICaloriesChart {
    activityData: any;
}

export const CaloriesGraph: React.FC<ICaloriesChart> = (props) => {
    const { activityData } = props;
    const createChartData = {
        labels: activityData.map((ele: any) => moment(ele.date).format('D MMMM')),
        datasets: [
            {
                label: 'Calories Burn',
                data: activityData.map((ele: any) => ele.calories_burned),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                // backgroundColor: "black",
                tension: 0.4
            },
        ]
    };
    return (
        <ChartComponent data={createChartData as unknown as IChartData} width={300} />
    );
};