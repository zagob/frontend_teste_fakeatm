import { NumberInputProps } from "@chakra-ui/react";
import { HTMLInputTypeAttribute, ReactNode } from "react";

export function formatNumberCoin(value: number) {
  return new Intl.NumberFormat("PT-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
