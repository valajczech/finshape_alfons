import { useFieldArray, Controller } from 'react-hook-form';
import { type AlfonsControl } from '@alfons-app/pdk';
import type { barDataItem as TBarDataItem } from 'react-native-gifted-charts';
import { DismissFilled } from '@fluentui/react-icons';

const BarChartValuesControl: AlfonsControl<TBarDataItem> = ({ fieldProps }) => {
    const { control, name } = fieldProps;
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
        <div className="flex flex-col gap-3">
            {fields.map((item, index) => (
                <div
                    className="flex flex-row gap-2 rounded items-center bg-red-400 p-3"
                    key={item.id}
                >
                    <div className="flex w-28 flex-col gap-1">
                        <label className="text-sm font-medium text-white">
                            Label
                        </label>
                        <Controller
                            control={control}
                            name={`${name}.${index}.label`}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="w-full rounded border p-1 text-black"
                                    type="text"
                                />
                            )}
                        />
                    </div>
                    <div className="flex w-28 flex-col gap-1">
                        <label className="text-sm font-medium text-white">
                            Value
                        </label>
                        <Controller
                            control={control}
                            name={`${name}.${index}.value`}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="w-full rounded border p-1 "
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                    type="number"
                                />
                            )}
                        />
                    </div>
                    <button onClick={() => remove(index)}>
                        <DismissFilled fontSize={20} />
                    </button>
                </div>
            ))}
            <button
                className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                onClick={() => append({ label: 'Item', value: 10 })}
                type="button"
            >
                Add Item
            </button>
        </div>
    );
};
export default BarChartValuesControl;
