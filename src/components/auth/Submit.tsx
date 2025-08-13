import { Button, ButtonProps } from "../ui/button";

export function Submit({ children, ...other }: ButtonProps) {
  return (
    <Button type="submit" {...other}>
      {children}
    </Button>
  );
}
