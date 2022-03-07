import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { api } from "../../database/axios";
import { InputBase } from "../Input";
import { OperationsProps } from "../ListOperations";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOperations: React.Dispatch<React.SetStateAction<OperationsProps[]>>;
}

const OperationFormSchema = yup.object().shape({
  value: yup
    .number()
    .required("valor obrigatório")
    .max(5000, "Máximo permitido é de R$5.000,00"),
  note_preference: yup.number().required("Nota obrigatória"),
});

export function ModalAddOperation({
  isOpen,
  onClose,
  setOperations,
}: ModalProps) {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<OperationsProps>({
    resolver: yupResolver(OperationFormSchema),
  });

  async function handleAddOperation(data: OperationsProps) {
    const { value, note_preference } = data;

    const CountPackage = value / note_preference;
    const operationAccept = (value / note_preference) % 1;

    if (CountPackage > 50) {
      return toast({
        duration: 5000,
        title:
          "A operação está com limite de pacotes acima de 50, tente novamente!",
        position: "top-right",
        status: "warning",
        isClosable: true,
      });
    }

    if (operationAccept !== 0) {
      return toast({
        duration: 5000,
        title: "Operacao Invalida",
        position: "top-right",
        status: "warning",
        isClosable: true,
      });
    }

    if (
      note_preference === 10 ||
      note_preference === 50 ||
      note_preference === 100
    ) {
      const response = await api.post("/operations/create", data);
      setOperations((item: OperationsProps[]) => item.concat(response.data));

      const asyncIterable = {
        [Symbol.asyncIterator]() {
          return {
            i: 1,
            next() {
              if (this.i <= CountPackage) {
                return Promise.resolve({ value: this.i++, done: false });
              }

              return Promise.resolve({ done: true });
            },
          };
        },
      };

      (async function () {
        for await (let num of asyncIterable) {
          const responsePackage = await api.post(
            `/packages/create/${response.data.id}`,
            {
              type_note: note_preference,
            }
          );
        }
      })();
      onClose();
      return;
    }

    toast({
      duration: 5000,
      title: "Preferência de nota é aceito somente os valores 10, 50 ou 100",
      position: "top-right",
      status: "warning",
      isClosable: true,
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="#2b2a33">
        <ModalHeader>Adicionar Operação</ModalHeader>
        <ModalCloseButton />
        <Box as="form" onSubmit={handleSubmit(handleAddOperation)}>
          <ModalBody>
            <Flex flexDirection="column">
              <VStack spacing={5}>
                <FormControl>
                  <FormLabel>Valor</FormLabel>
                  <InputBase
                    nameRef="value"
                    {...register("value")}
                    placeholder="R$100,00"
                    error={errors.value?.message}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Preferência de nota</FormLabel>
                  <InputBase
                    nameRef="note_preference"
                    {...register("note_preference")}
                    placeholder="10, 50, 100"
                    error={errors.note_preference?.message}
                  />
                </FormControl>
              </VStack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={isSubmitting}
            >
              Criar
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
}
