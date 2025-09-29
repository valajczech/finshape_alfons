# @valajczech/alfons-bar-chart-plugin

This is a Bar Chart Plugin for Alfons - the visual React IDE.

## Installation

Use `bun` to install the plugin from the NPM registry:

```bash
bun install @valajczech/alfons-bar-chart-plugin
```

## Usage

```typescript
import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

export default function App() {
    const barData = [
        { value: 50, label: 'Mon' },
        { value: 80, label: 'Tue' },
        { value: 90, label: 'Wed' },
        { value: 70, label: 'Thu' },
        { value: 60, label: 'Fri' },
    ];

    return (
        <SafeAreaView>
            <Text>Weekly Sales</Text>
            <BarChart
                data={barData}
                barWidth={40}
                spacing={20}
                frontColor="#177AD5"
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </SafeAreaView>
    );
}
```

## Features

-   Customize the **style of bars** (color, width, rounded corners, gradient).
-   Add, edit, and remove **bar items** with labels and values.
-   Apply a **default style** to all bars, or override per bar.
-   Configure **chart size** (height & width).
-   Enable or disable **animations** , with adjustable duration.
-   Manage bar data easily with a built-in **custom control** .
-   Clean and simple interface with intuitive controls.

## License

UNLICENSED
