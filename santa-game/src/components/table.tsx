import { Table, Button } from '@mantine/core';
import { SecretSantaAssignment } from '@/types';

interface AssignmentTableProps {
  assignments: SecretSantaAssignment[];
  onDownload: () => void;
}

export const AssignmentTable: React.FC<AssignmentTableProps> = ({ assignments, onDownload }) => {
  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Employee Name</Table.Th>
            <Table.Th>Employee Email</Table.Th>
            <Table.Th>Secret Child Name</Table.Th>
            <Table.Th>Secret Child Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {assignments.map((assignment, index) => (
            <Table.Tr key={index}>
              <Table.Td>{assignment.Employee_Name}</Table.Td>
              <Table.Td>{assignment.Employee_EmailID}</Table.Td>
              <Table.Td>{assignment.Secret_Child_Name}</Table.Td>
              <Table.Td>{assignment.Secret_Child_EmailID}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Button onClick={onDownload} mt="md">
        Download Assignments
      </Button>
    </>
  );
};
    