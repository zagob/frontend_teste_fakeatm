import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { formatNumberCoin } from "../utils/formatNumberCoin";

export interface PackagesProps {
  id?: string;
  type_note: number;
}

interface ListPackagesProps {
  packages: PackagesProps[];
}

export function ListPackages({ packages }: ListPackagesProps) {
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color="#fff" fontSize="md">
              Tipo da Nota
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {packages.map((item) => (
            <Tr key={item.id}>
              <Td>{formatNumberCoin(item.type_note)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
