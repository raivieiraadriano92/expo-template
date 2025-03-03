import { ComponentType } from "react";

import { cssInterop } from "nativewind";
import { SvgProps } from "react-native-svg";

export function iconWithClassName(icon: ComponentType<SvgProps>) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true
      }
    }
  });
}
