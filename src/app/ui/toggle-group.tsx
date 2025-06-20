import { Item, type ToggleGroupItemProps } from "@radix-ui/react-toggle-group";
import { cn } from "~/utils";

export { Root as PlayToggleGroup } from "@radix-ui/react-toggle-group";

export const PlayToggle = ({ className, ...props }: ToggleGroupItemProps) => (
  <Item
    className={cn(
      "grid place-items-center border-black not-last-of-type:border-r-2 p-3 shadow-[0_1px_2px_0_white_inset] transition-colors *:size-5 *:fill-current disabled:grayscale-50 data-[state=off]:text-black/50 data-[state=on]:text-white",
      className,
    )}
    {...props}
  />
);
