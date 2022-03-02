import { Button } from "@chakra-ui/react";

interface ButtonProps {
  label: string;
  bg?: string;
}

export function ComponentButton({ bg, label }: ButtonProps) {
  return (
    <Button
      type="submit"
      background={bg}
      _hover={{ filter: "brightness(0.6)", transition: "0.2s" }}
    >
      {label}
    </Button>
  );
}
