import { useToast } from "@chakra-ui/react";

export function ToastChakraError(
  message: string,
  statusType: "info" | "warning" | "success" | "error"
) {
  const toast = useToast();
  return toast({
    title: message,
    status: statusType,
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
}
