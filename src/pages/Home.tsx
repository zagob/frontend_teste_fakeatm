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
    formState: { dirtyFields, errors, isSubmitted, isSubmitting },
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

  const loginColors = dirtyFields.login && "#43aa8b";
  const loginError = errors.login?.message && "red";

  const passwordColors = dirtyFields.password && "#43aa8b";
  const passwordError = errors.password?.message && "red";

  return (
    <Flex
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
            icon={<BiUser color={loginColors || loginError || "#000"} />}
            nameRef="login"
            error={errors.login?.message}
            outline={
              (dirtyFields.login && `1px solid #43aa8b`) ||
              (errors.login?.message && "1px solid red") ||
              ""
            }
            {...register("login")}
          />
          <InputBase
            icon={
              <RiLockPasswordLine
                color={passwordColors || passwordError || "#000"}
              />
            }
            error={errors.password?.message}
            nameRef="password"
            type="password"
            outline={
              (dirtyFields.password && `1px solid #43aa8b`) ||
              (errors.password?.message && "1px solid red") ||
              ""
            }
            {...register("password")}
          />
          <Flex gap={6} justifyContent="center" mt={5}>
            <ComponentButton label="Entrar" bg="#000" />
            <ComponentButton label="Cadastre-se" bg="#25239E" />
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
}
