import { memo } from "react";

import Svg, { SvgProps } from "react-native-svg";

type CreateIconParams = SvgProps & {
  path: Partial<Record<IconVariant, JSX.Element | JSX.Element[]>>;
};

type IconProps = SvgProps & {
  variant?: IconVariant;
};

type IconVariant = "light" | "bulk" | "bold";

export function createIcon({ path }: CreateIconParams) {
  const createdIcon = ({ variant = "light", ...props }: IconProps) => (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      {path[variant]}
    </Svg>
  );

  return memo(createdIcon);
}
