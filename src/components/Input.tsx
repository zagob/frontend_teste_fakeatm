import {
  FormControl,
  InputGroup,
  InputLeftElement,
  Input as InputChakra,
  InputProps as ChakraInputProps,
  forwardRef,
  Text,
} from "@chakra-ui/react";
import { ForwardRefRenderFunction, ReactElement } from "react";

interface InputProps extends ChakraInputProps {
  icon: ReactElement;
  nameRef: string;
  error?: string;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { nameRef, icon, error, ...rest },
  ref
) => {
  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement children={icon} />
        <InputChakra
          id={nameRef}
          name={nameRef}
          ref={ref}
          placeholder={nameRef}
          color="#000"
          _placeholder={{ color: "#000", opacity: "0.5" }}
          background="gray.200"
          {...rest}
        />
      </InputGroup>
      {error && <Text fontSize="x-small" fontWeight="bold" color="red.500">{error}*</Text>}
    </FormControl>
  );
};

export const InputBase = forwardRef(InputComponent);
