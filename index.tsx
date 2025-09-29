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
                //? If the BarItem has its own styles, apply them
                ...style,
            })),
        [data, defaultBarStyle]
    );

    const hasData = values.length > 0;

    //? I was unable to make the Tamagui integration work. The Tamagui requires config, which would mean two things:
    //? Either it should be exported from Alfons/sandbox (?)
    //? Or I would have to add the TamaguiProvider here with custom config.
    //? However there should be a toplevel Provider somewhere, it should not "live" directly on the plugin element,
    //? so thats why I did not include it.
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
