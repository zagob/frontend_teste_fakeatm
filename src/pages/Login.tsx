import { Box, Flex, Heading, Text, useToast, VStack } from "@chakra-ui/react";

import { ComponentButton } from "../components/Button";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { InputBase } from "../components/Input";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";

interface SignInFormData {
  login: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  login: yup.string().required("Login obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export function Login() {
  const toast = useToast();
  const { signIn } = useContext(AuthContext);
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
    const response = await signIn(values);

    if (response === "err") {
      return toast({
        duration: 2000,
        position: "top-right",
        isClosable: true,
        status: "warning",
        title: "Login ou Senha inválidos",
      });
    }
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
            placeholder="Login"
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
            placeholder="Senha"
            type="password"
            outline={
              (dirtyFields.password && `1px solid #43aa8b`) ||
              (errors.password?.message && "1px solid red") ||
              ""
            }
            {...register("password")}
          />
          <Flex w="100%" gap={6} justifyContent="center" mt={5}>
            <ComponentButton
              w="100%"
              label="Entrar"
              bg="#000"
              type="submit"
              isLoading={isSubmitting}
            />
            <Link to="/cadastro">
              <ComponentButton
                w="100%"
                label="Cadastre-se"
                bg="#25239E"
                type="button"
              />
            </Link>
          </Flex>
          <Link to="/clientes">
            <Text
              transition="0.2s"
              _hover={{ color: "#b9fbc0" }}
              textAlign="center"
            >
              Clientes cadastrados na plataforma
            </Text>
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
}
