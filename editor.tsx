import {
    InspectorTabs,
    type PluginDefinition,
    createSchemaBuilder,
} from '@alfons-app/pdk';
import { name } from './package.json';
import type Zod from 'zod';
import BarChartValuesControl from './controls/BarItemControl';
import { DataArea20Regular } from '@fluentui/react-icons';

// ? When I export this "$" object, I am unable to import it anywhere else. Not really sure why, it complains that
// ? it cannot find the namespace.
// ? If I would be able to do that, I would create a "schemas" directory/file, so the schemas are isolated and
// ? separation of concerns per file is preserved.
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

    // ? I was unable to make actions work in the schema.
    // ? I suppose I could omit the props from the inferred type (from the schema) and then use "BarChartPropsType",
    // ? which comes directly from the Bar Chart component
});

const BarChartValuesSchema = $.array(BarChartItemSchema).setupInspector({
    // ? Custom control
    control: '@valajnpm/alfons-bar-chart-plugin:BarChartValuesControl',
    tab: 'DataArea20Filled',
    category: 'Data',
});

export type BarChartValuesType = Zod.infer<typeof BarChartValuesSchema>;

const BarChartSchema = $.object({
    //? [] as default is here because in my opinion it does not make sense to have any defaults set and I could not
    //? figure out, how to "preselect" the preset automatically onload.
    //? Maybe Lifecycle hooks?
    data: BarChartValuesSchema.default([]),
    defaultBarStyle: BarStyleSchema.optional().describe(
        'Defines styles which will get propagated to all bars in the chart.'
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
