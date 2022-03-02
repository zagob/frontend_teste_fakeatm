import { Box, Flex, Heading, VStack } from "@chakra-ui/react";

import { ComponentButton } from "../components/Button";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { InputBase } from "../components/Input";
import { useEffect } from "react";

interface SignInFormData {
  login: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  login: yup.string().required("Login obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export function Home() {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    console.log(values);
  };

  return (
    <Flex
      background="linear-gradient(5deg, rgba(71,111,128,0.3) 0%, rgba(43,42,51,1) 100%)"
      alignItems="center"
      backgroundSize="cover"
      justifyContent="center"
      height="100vh"
      w="100%"
    >
      <Box
        padding={10}
        background="gray.800"
        borderRadius="8px"
        boxShadow="2px 2px 6px 1px rgba(0, 0, 0, 0.2)"
        opacity="1"
        as="form"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <VStack spacing={4}>
          <Heading size="lg" textAlign="center">
            Entrar
          </Heading>

          <InputBase
            icon={<BiUser color={dirtyFields.login ? "#43aa8b" : "#000"} />}
            nameRef="login"
            // error={errors.login}
            variant="outline"
            isInvalid={true}
            errorBorderColor="1px solid red"
            outline={dirtyFields.login ? `1px solid #43aa8b` : "#fff"}
            {...register("login")}
          />
          <InputBase
            icon={
              <RiLockPasswordLine
                color={dirtyFields.password ? "#43aa8b" : "#000"}
              />
            }
            nameRef="password"
            type="password"
            outline={dirtyFields.password ? `1px solid #43aa8b` : "none"}
            {...register("password")}
          />

          {/* <InputComponent
            // name={`s`}
            
            icon={<BiUser color="#000" />}
            {...register("login")}
          /> */}

          {/* <FormControl>
            <InputGroup>
              <InputLeftElement
                children={<BiUser color={isFilledLogin ? "#43aa8b" : "#000"} />}
              />
              <Input
                placeholder="Login"
                color="#000"
                _placeholder={{ color: "#000", opacity: "0.5" }}
                background="gray.200"
                border="none"
                outline={isFilledLogin ? `1px solid #43aa8b` : ""}
                {...register("login", {
                  required: true,
                })}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                children={
                  <RiLockPasswordLine
                    color={isFilledPassword ? "#43aa8b" : "#000"}
                  />
                }
              />
              <Input
                placeholder="Senha"
                color="#000"
                _placeholder={{ color: "#000", opacity: "0.5" }}
                background="gray.200"
                border="none"
                outline={isFilledPassword ? `1px solid #43aa8b` : ""}
                {...register("password", {
                  required: true,
                })}
              />
            </InputGroup>
          </FormControl> */}
          <Flex gap={6} justifyContent="center" mt={5}>
            <ComponentButton label="Entrar" bg="#000" />
            <ComponentButton label="Cadastre-se" bg="#25239E" />
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
}
