import { Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AuthContext } from "../hooks/AuthContext";

export function HeaderPainel() {
  const { signOut, client } = useContext(AuthContext);
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading fontSize="2xl">Bem Vindo(a)</Heading>
      <Flex alignItems="center" gap={5}>
        <Text fontSize="larger">Olá, {client.name}</Text>
        <IconButton
          onClick={() => signOut()}
          background="none"
          aria-label="Exit"
          transition="0.2s"
          outline="1px solid gray"
          _hover={{ background: "gray.600", outline: "1px solid gray" }}
          icon={<AiOutlinePoweroff />}
        />
      </Flex>
    </Flex>
  );
}
