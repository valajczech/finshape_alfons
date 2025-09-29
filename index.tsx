import type { Element } from '@alfons-app/pdk';
import type { BarChartProps } from './editor';
import { BarChart } from 'react-native-gifted-charts';
import { Text, View } from 'react-native';
import { useMemo } from 'react';

const barChartPlugin: Element<BarChartProps> = ({
    data,
    defaultBarStyle,
    ...props
}) => {
    const values = useMemo(
        () =>
            data.map(({ style, ...rest }) => ({
                ...rest,
                ...defaultBarStyle,
                // If the BarItem has its own styles, apply them
                ...style,
            })),
        [data, defaultBarStyle]
    );

    const hasData = values.length > 0;

    return (
        <View>
            {hasData ? (
                <BarChart data={values} {...props} hideRules />
            ) : (
                <Text>No Data</Text>
            )}
        </View>
    );
};

export default barChartPlugin;
