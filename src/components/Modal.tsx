import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ClientPropsData } from "../pages/ClientsAvailable";
import { ComponentButton } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientObjectEdit: ClientPropsData | null;
  handleEditClient: (data: ClientPropsData) => Promise<ClientPropsData | void>;
}

// interface EditFormData {
//     login: string;
//     password: string;
//     name: string;
//     birth_date: Date;
//     address: string;
//     cpf: string;
//   }

export function SimpleModal({
  isOpen,
  onClose,
  clientObjectEdit,
  handleEditClient,
}: ModalProps) {
  const { register, handleSubmit, reset } = useForm<ClientPropsData>({
    defaultValues: {
      name: clientObjectEdit?.name,
      ...clientObjectEdit,
    },
  });

  useEffect(() => {
    if (isOpen && clientObjectEdit) {
      reset({ ...clientObjectEdit });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="#2b2a33">
        <ModalHeader>{clientObjectEdit?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex as="form" onSubmit={handleSubmit(handleEditClient)}>
            <FormControl>
              <Input {...register("login")} />
              <Input {...register("name")} />
              <Input {...register("address")} />
              <Input {...register("cpf")} />
            </FormControl>
            <ComponentButton type="submit" bg="#000" label="Editar" />
          </Flex>
        </ModalBody>

        <button onClick={() => {}}>reset</button>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
