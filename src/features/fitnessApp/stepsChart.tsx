import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import moment from 'moment-timezone';
import ChartComponent, { IChartData } from '../../common/barchart'


// export const formatDate = (date: any, format?: string) => {
//     if (!date) {
//         return '';
//     }
//     return moment(date)
//         .local()
//         .format(format || 'DD-MM-YYYY');
// };

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface IStepsChart {
    activityData: any;
}

export const StepsGraph: React.FC<IStepsChart> = (props) => {
    const { activityData } = props;
    const createChartData = {
        labels: activityData.map((ele: any) => ele.steps),
        datasets: [
            {
                label: 'Steps',
                data: activityData.map((ele: any) => ele.steps),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ]
    };
    console.log("createChartData", createChartData);
    console.log("activityData.map((ele: any) => ele.calories_burned),", activityData.map((ele: any) => ele.calories_burned),);
    return (
        <ChartComponent data={createChartData as unknown as IChartData} width={300} />
    );
};