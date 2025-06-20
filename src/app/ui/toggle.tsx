import { Root, type ToggleProps } from "@radix-ui/react-toggle";
import { cn } from "~/utils";

export const Toggle = ({
  className,
  containerClassName,
  ...props
}: ToggleProps & { containerClassName?: string }) => (
  <div
    className={cn(
      "flex cursor-pointer flex-col border-2 border-black bg-neutral-400 pb-2 transition-shadow",
      "first-of-type:rounded-l-sm first-of-type:*:rounded-l-sm last-of-type:rounded-r-sm last-of-type:*:rounded-r-sm",
      "has-data-[state=off]:shadow-[0_5px_2px_0_rgba(0,0,0,0.4)]",
      containerClassName,
    )}
  >
    <Root
      className={cn(
        "-mx-0.5 -mt-0.5 grid cursor-pointer place-items-center border-2 border-black p-4 text-neutral-700 transition-all *:size-6",
        "data-[state=off]:bg-neutral-300 data-[state=off]:shadow-[0_4px_3px_0_white_inset]",
        "data-[state=on]:translate-y-2.5 data-[state=on]:bg-neutral-300/70",
        className,
      )}
      {...props}
    />
  </div>
);

export const RedToggle = ({
  className,
  containerClassName,
  ...props
}: ToggleProps & { containerClassName?: string }) => (
  <div
    className={cn(
      "flex cursor-pointer flex-col rounded-sm border-2 border-black bg-red-600 transition-shadow",
      "has-data-[state=off]:shadow-[0_10px_2px_0_rgba(0,0,0,0.4)]",
      containerClassName,
    )}
  >
    <Root
      className={cn(
        "-m-0.5 grid place-items-center rounded-sm border-2 border-black p-2 font-bold text-lg text-white tracking-wider transition-all",
        "data-[state=off]:translate-y-1 data-[state=off]:bg-red-500",
        "data-[state=on]:translate-y-0 data-[state=on]:bg-red-500/70",
        className,
      )}
      {...props}
    />
  </div>
);

export const BlueToggle = (props: Omit<ToggleProps, "className">) => (
  <Toggle
    className="flex items-center justify-center gap-1 p-1 text-white *:size-4 data-[state=on]:translate-y-1 data-[state=off]:bg-blue-500 data-[state=on]:bg-blue-500/70 data-[state=off]:text-blue-800 data-[state=off]:shadow-[0_1px_2px_0_white_inset]"
    containerClassName="bg-blue-600 pb-0.5"
    {...props}
  />
);
