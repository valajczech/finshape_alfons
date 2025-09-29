import {
    InspectorTabs,
    type PluginDefinition,
    createSchemaBuilder,
} from '@alfons-app/pdk';
import { name } from './package.json';
import type Zod from 'zod';
import BarChartValuesControl from './controls/BarItemControl';
import { DataArea20Regular } from '@fluentui/react-icons';

const $ = createSchemaBuilder(name);

const BarStyleSchema = $.object({
    frontColor: $.string().optional().setupInspector({
        control: 'ColorPicker',
        tab: InspectorTabs.Style,
    }),
    barWidth: $.number().default(25).setupInspector({
        control: 'Numeric',
        tab: InspectorTabs.Style,
    }),
    barBorderRadius: $.number().optional().default(10).setupInspector({
        control: 'Numeric',
        tab: InspectorTabs.Style,
    }),
    showGradient: $.boolean().default(false).setupInspector({
        control: 'Checkbox',
        tab: InspectorTabs.Style,
    }),
});

const BarChartItemSchema = $.object({
    value: $.number().finite().setupInspector({
        control: 'Numeric',
    }),
    label: $.string().setupInspector({
        control: 'Text',
    }),

    style: BarStyleSchema.optional().describe(
        'Defines the style of this particular bar.'
    ),
});

const BarChartValuesSchema = $.array(BarChartItemSchema).setupInspector({
    control: '@valajnpm/alfons-bar-chart-plugin:BarChartValuesControl',
    tab: 'DataArea20Filled',
    category: 'Data',
});

export type BarChartValuesType = Zod.infer<typeof BarChartValuesSchema>;

const BarChartSchema = $.object({
    data: BarChartValuesSchema.default([]),
    defaultBarStyle: BarStyleSchema.optional().describe(
        'Definesstyles which will get propagated to all bars in the chart.'
    ),
    height: $.number()
        .default(250)
        .describe('Sets the chart height')
        .setupInspector({
            control: 'Numeric',
        }),
    width: $.number()
        .default(250)
        .describe('Sets the chart width')
        .setupInspector({
            control: 'Numeric',
        }),
    isAnimated: $.boolean()
        .default(true)
        .setupInspector({ control: 'Checkbox', tab: InspectorTabs.Animation }),

    animationDuration: $.number().default(250).setupInspector({
        control: 'Numeric',
        tab: InspectorTabs.Animation,
    }),
});

const Definition = {
    Icon: () => <DataArea20Regular />,
    schema: BarChartSchema,
    shouldAllowChild: () => () => false,
    controls: {
        BarChartValuesControl,
    },
} satisfies PluginDefinition;

export default Definition;

export type BarChartProps = Zod.infer<typeof Definition.schema>;
