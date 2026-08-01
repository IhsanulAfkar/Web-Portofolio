import * as Flags from 'country-flag-icons/react/3x2';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(en);

type Props = {
  name: string;
  className?: string;
};

const RenderCountryIcon = ({ name, className }: Props) => {
  const code =
    countries.getAlpha2Code(name, 'en') ??
    name.toUpperCase();

  const Flag = Flags[code as keyof typeof Flags];

  if (!Flag) return null;

  return <Flag className={className} />;
};

export default RenderCountryIcon;