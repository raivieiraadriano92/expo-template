import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { ActivityIndicator, Pressable } from "react-native";
import Animated, {
  cancelAnimation,
  FadeIn,
  FadeOut,
  LayoutAnimationConfig,
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "group flex  items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary web:hover:opacity-90 active:opacity-90",
        destructive: "bg-destructive web:hover:opacity-90 active:opacity-90",
        outline:
          "border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        secondary: "bg-secondary web:hover:opacity-80 active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline"
      },
      size: {
        default: "h-10 px-4 py-2 native:h-12 native:px-5 native:py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 native:h-14",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "lg"
    }
  }
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "group-active:text-accent-foreground",
        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "text-primary group-active:underline"
      },
      size: {
        default: "",
        sm: "",
        lg: "native:text-lg",
        icon: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "lg"
    }
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    targetScale?: number;
  };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      disabled,
      className,
      variant,
      size,
      isLoading,
      children,
      onPressIn,
      onPressOut,
      style,
      targetScale = 0.98,
      ...props
    },
    ref
  ) => {
    const reducedMotion = useReducedMotion();

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }]
    }));

    return (
      <TextClassContext.Provider
        value={buttonTextVariants({
          variant,
          size,
          className: "web:pointer-events-none"
        })}
      >
        <LayoutAnimationConfig skipEntering>
          <AnimatedPressable
            className={cn(
              (disabled || isLoading) && "opacity-50 web:pointer-events-none",
              buttonVariants({ variant, size, className })
            )}
            disabled={disabled || isLoading}
            ref={ref}
            role="button"
            onPressIn={(e) => {
              "worklet";

              if (onPressIn) {
                runOnJS(onPressIn)(e);
              }

              cancelAnimation(scale);

              scale.value = withTiming(targetScale, { duration: 100 });
            }}
            onPressOut={(e) => {
              "worklet";

              if (onPressOut) {
                runOnJS(onPressOut)(e);
              }

              cancelAnimation(scale);

              scale.value = withTiming(1, { duration: 100 });
            }}
            style={[!reducedMotion && animatedStyle, style]}
            {...props}
          >
            <Animated.View
              className="flex-row items-center gap-2"
              layout={LinearTransition}
            >
              {children}
              {isLoading && (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                  <ActivityIndicator />
                </Animated.View>
              )}
            </Animated.View>
          </AnimatedPressable>
        </LayoutAnimationConfig>
      </TextClassContext.Provider>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };

export type { ButtonProps };
