import { ForwardRefRenderFunction, InputHTMLAttributes, ReactElement, ReactNode } from "react";
import {
  FormControl,
  InputGroup,
  InputLeftElement,
  Input as InputChakra,
  InputProps as ChakraInputProps,
  forwardRef,
  Text,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps{
  icon?: ReactElement;
  nameRef: string;
  error?: string;
  inputMask?: any | ReactNode;
  mask?: string | Array<(string | RegExp)>
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { nameRef, icon, error, inputMask, mask, ...rest },
  ref
) => {
  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement children={icon} />
        <InputChakra
          as={inputMask}
          mask={mask}
          id={nameRef}
          name={nameRef}
          ref={ref}
          color="#000"
          _placeholder={{ color: "#000", opacity: "0.5" }}
          _focus={{ outline: "1px solid green" }}
          background="gray.200"
          {...rest}
        />
      </InputGroup>
      {error && (
        <Text fontSize="x-small" fontWeight="bold" color="red.500">
          {error}*
        </Text>
      )}
    </FormControl>
  );
};

export const InputBase = forwardRef(InputComponent);
