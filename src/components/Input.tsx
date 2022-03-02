import {
  FormControl,
  InputGroup,
  InputLeftElement,
  Input as InputChakra,
  InputProps as ChakraInputProps,
  forwardRef,
} from "@chakra-ui/react";
import { ForwardRefRenderFunction, ReactElement } from "react";

interface InputProps extends ChakraInputProps {
  icon: ReactElement;
  nameRef: string;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { nameRef, icon, ...rest },
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
          border="none"
          {...rest}
        />
      </InputGroup>
    </FormControl>
  );
};

export const InputBase = forwardRef(InputComponent);
