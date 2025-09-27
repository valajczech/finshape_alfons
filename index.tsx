import type { Effect } from '@alfons-app/pdk';
import type { BarChartProps } from './editor';
import { BarChart } from 'react-native-gifted-charts';

const barChartPluginEffect: Effect<BarChartProps> = ({ data }) => {
    // const mapValues = (data: Array<number>) => {
    //     return data.map((val) => {
    //         return {
    //             value: val,
    //         };
    //     });
    // };

    // const barData = mapValues(data ?? []);

    return <BarChart data={data} />;
};

export default barChartPluginEffect;
