import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  label: string;
  bg?: string;
}

export function ComponentButton({ bg, label, ...rest }: ButtonProps) {
  return (
    <Button
      type="submit"
      background={bg}
      _hover={{ filter: "brightness(0.6)", transition: "0.2s" }}
      {...rest}
    >
      {label}
    </Button>
  );
}
