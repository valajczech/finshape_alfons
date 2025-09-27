import { type PluginDefinition, createSchemaBuilder } from '@alfons-app/pdk';
import { name } from './package.json';
import type Zod from 'zod';
import { Group2Line } from '@fluent-ui/icons';
import type { barDataItem as BarDataItemType } from 'react-native-gifted-charts';

const $ = createSchemaBuilder(name);

// const BarChartItemSchema = $.number({
//     required_error: 'The value cannot be undefined',
// })
//     .finite()
//     .describe('KEK!')

// TODO: this should satisfy the type barDataItem from the library
const BarChartValueSchema: Zod.ZodType<BarDataItemType> = $.object({
    value: $.number().finite(),
});

const BarCharSchema = $.object({
    data: $.array(BarChartValueSchema).default([]).setupInspector({
        control: 'Data[]',
    }),
});

const Definition = {
    // FIXME: Icon
    Icon: () => <Group2Line />,
    schema: BarCharSchema,
    shouldAllowChild: () => () => false,
} satisfies PluginDefinition;

export default Definition;

export type BarChartProps = Zod.infer<typeof Definition.schema>;
