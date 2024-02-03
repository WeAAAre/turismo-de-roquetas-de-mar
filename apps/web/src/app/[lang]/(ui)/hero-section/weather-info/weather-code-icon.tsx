import { WiWindy as UndefinedWeatherCode } from '@react-icons/all-files/wi/WiWindy';
import { WiThunderstorm as ThunderstormIcon } from '@react-icons/all-files/wi/WiThunderstorm';
import { WiSnowWind as SnowIcon } from '@react-icons/all-files/wi/WiSnowWind';
import { WiRainWind as RainWindIcon } from '@react-icons/all-files/wi/WiRainWind';
import { WiFog as FogIcon } from '@react-icons/all-files/wi/WiFog';
import { WiDaySunny as SunIcon } from '@react-icons/all-files/wi/WiDaySunny';
import { WiDayCloudy as CloudSunIcon } from '@react-icons/all-files/wi/WiDayCloudy';
import { WiCloudy as CloudsIcon } from '@react-icons/all-files/wi/WiCloudy';

import { cn } from '@/lib/utils';

interface WeatherCodeProps extends React.SVGProps<SVGSVGElement> {
  code: number;
}

const WeatherCodeIcon = (props: WeatherCodeProps) => {
  const { code, ...restProps } = props;

  switch (code) {
    case 0:
      return (
        <SunIcon
          {...restProps}
          className={cn('text-[#febc2f]', restProps.className)}
        />
      );
    case 1:
    case 2:
      return <CloudSunIcon {...restProps} />;
    case 3:
      return <CloudsIcon {...restProps} />;
    case 45:
    case 48:
      return <FogIcon {...restProps} />;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
    case 85:
    case 86:
      return <RainWindIcon {...restProps} />;
    case 95:
    case 96:
    case 99:
      return <ThunderstormIcon {...restProps} />;
    case 71:
    case 73:
    case 75:
    case 77:
      return <SnowIcon {...restProps} />;
    default:
      return <UndefinedWeatherCode />;
  }
};

export default WeatherCodeIcon;
