import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ComponentButton } from "../components/Button";
import { InputBase } from "../components/Input";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { MdDateRange, MdDriveFileRenameOutline } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { api } from "../database/axios";

interface SubscribeInFormData {
  login: string;
  password: string;
  name: string;
  birth_date: Date;
  address: string;
  cpf: string;
}

const subscribeInFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatória"),
  address: yup.string().required("Endereço obrigatória"),
  birth_date: yup.string().required("Data de nascimento obrigatória"),
  cpf: yup.string().required("CPF obrigatório"),
  login: yup.string().required("Login obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export function Subscribe() {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields, errors, isSubmitting },
  } = useForm<SubscribeInFormData>({
    defaultValues: {
      login: "",
      password: "",
      name: "",
      birth_date: undefined,
      address: "",
      cpf: "",
    },
    resolver: yupResolver(subscribeInFormSchema),
  });

  const handleSubscribe: SubmitHandler<SubscribeInFormData> = async (
    values
  ) => {
    const formatCpf = values.cpf.replace(/[^a-zA-Z0-9s]/g, "");

    const data = {
      ...values,
      birth_date: new Date(values.birth_date).toISOString(),
      cpf: formatCpf,
    };

    const response = await api.post("/clients", data);

    if (!response) {
      toast({
        title: "Erro ao criar Cliente",
        description: "Nome de login já existente",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      return;
    }

    toast({
      title: "Cliente criado com sucesso",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });

    reset();
    navigate("/");
  };

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
        onSubmit={handleSubmit(handleSubscribe)}
      >
        <VStack spacing={4}>
          <Heading size="lg" textAlign="center">
            Cadastro
          </Heading>
          <SimpleGrid columns={[1, 1, 2]} spacing={4}>
            <InputBase
              icon={
                <MdDriveFileRenameOutline
                  color={
                    (dirtyFields.name && "#43aa8b") ||
                    (errors.name?.message && "red") ||
                    "#000"
                  }
                />
              }
              error={errors.name?.message}
              nameRef="name"
              type="text"
              placeholder="Nome"
              outline={
                (dirtyFields.name && `1px solid #43aa8b`) ||
                (errors.name?.message && "1px solid red") ||
                ""
              }
              {...register("name")}
            />
            <InputBase
              icon={
                <FaRegAddressCard
                  color={
                    (dirtyFields.address && "#43aa8b") ||
                    (errors.address?.message && "red") ||
                    "#000"
                  }
                />
              }
              error={errors.address?.message}
              nameRef="address"
              placeholder="Endereço"
              type="text"
              outline={
                (dirtyFields.address && `1px solid #43aa8b`) ||
                (errors.address?.message && "1px solid red") ||
                ""
              }
              {...register("address")}
            />
            <InputBase
              icon={
                <MdDateRange
                  color={
                    (dirtyFields.birth_date && "#43aa8b") ||
                    (errors.birth_date?.message && "red") ||
                    "#000"
                  }
                />
              }
              error={errors.birth_date?.message}
              nameRef="birth_date"
              type="date"
              placeholder="Data de nascimento"
              outline={
                (dirtyFields.birth_date && `1px solid #43aa8b`) ||
                (errors.birth_date?.message && "1px solid red") ||
                ""
              }
              {...register("birth_date")}
            />

            <InputBase
              as={InputMask}
              mask="999.999.999-99"
              maskChar={null}
              icon={
                <CgFileDocument
                  color={
                    (dirtyFields.cpf && "#43aa8b") ||
                    (errors.cpf?.message && "red") ||
                    "#000"
                  }
                />
              }
              error={errors.cpf?.message}
              nameRef="cpf"
              placeholder="CPF"
              outline={
                (dirtyFields.cpf && `1px solid #43aa8b`) ||
                (errors.cpf?.message && "1px solid red") ||
                ""
              }
              {...register("cpf")}
            />
            <InputBase
              icon={
                <BiUser
                  color={
                    (dirtyFields.login && "#43aa8b") ||
                    (errors.login?.message && "red") ||
                    "#000"
                  }
                />
              }
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
                  color={
                    (dirtyFields.password && "#43aa8b") ||
                    (errors.password?.message && "red") ||
                    "#000"
                  }
                />
              }
              error={errors.password?.message}
              nameRef="password"
              type="password"
              placeholder="Senha"
              outline={
                (dirtyFields.password && `1px solid #43aa8b`) ||
                (errors.password?.message && "1px solid red") ||
                ""
              }
              {...register("password")}
            />
          </SimpleGrid>

          <Flex w="100%" gap={6} justifyContent="flex-end" mt={5}>
            <ComponentButton
              label="Enviar dados"
              bg="#000"
              type="submit"
              isLoading={isSubmitting}
            />
            <Link to="/">
              <ComponentButton label="Login" bg="#25239E" type="button" />
            </Link>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
}
