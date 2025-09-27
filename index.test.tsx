import type { TestProps } from '@alfons-app/pdk';
import { renderHook } from '@testing-library/react-hooks';
import barChartPluginEffect from './index';
import definition from './editor';

const getMockTestProps = (testID: string = 'test') => ({ testID, ['data-test-id']: testID }) as TestProps;

describe('effects-bar_chart_plugin', () => {
  it('should run effect on init and props update', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const testProps = definition.schema.parse({});
      ...testProps,
      ...getMockTestProps(),
      children: [],
    };

    renderHook(() => barChartPluginEffect(props));
    
    expect(consoleSpy).toHaveBeenCalledWith('barChartPluginEffect', props);

    consoleSpy.mockRestore();
  });
});
