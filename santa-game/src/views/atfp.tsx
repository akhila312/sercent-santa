import { useState } from 'react';
import { Container, Title, Space, Card } from '@mantine/core';
import { FileUpload } from '../components/fileUploading';
import { AssignmentTable } from '../components/table';
import { assignSecretSanta } from '../components/secretSanta';
import { Employee, SecretSantaAssignment } from '@/types';
import { parseCSV, generateCSV } from '../components/csvParser';

  const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [previousAssignments, setPreviousAssignments] = useState<SecretSantaAssignment[]>([]);
  const [currentAssignments, setCurrentAssignments] = useState<SecretSantaAssignment[]>([]);

  const handleEmployeeUpload = (content: string) => {
    const parsedEmployees = parseCSV(content);
    setEmployees(parsedEmployees);
    
    if (previousAssignments.length > 0) {
      const assignments = assignSecretSanta(parsedEmployees, previousAssignments);
      setCurrentAssignments(assignments);
    }
  };

  const handlePreviousAssignmentsUpload = (content: string) => {
    const parsedAssignments = parseCSV(content) as SecretSantaAssignment[];
    setPreviousAssignments(parsedAssignments);
    
    if (employees.length > 0) {
      const assignments = assignSecretSanta(employees, parsedAssignments);
      setCurrentAssignments(assignments);
    }
  };

  const handleDownload = () => {
    const csvContent = generateCSV(currentAssignments);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'secret_santa_assignments.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1}>Secret Santa Assignment Generator</Title>
      <Space h="xl" />
      
      <Card shadow="sm" p="lg" mb="lg">
        <FileUpload
          onFileUpload={handleEmployeeUpload}
          label="Upload Employee List"
        />
      </Card>

      <Card shadow="sm" p="lg" mb="lg">
        <FileUpload
          onFileUpload={handlePreviousAssignmentsUpload}
          label="Upload Previous Assignments (Optional)"
        />
      </Card>

      {currentAssignments.length > 0 && (
        <Card shadow="sm" p="lg">
          <AssignmentTable
            assignments={currentAssignments}
            onDownload={handleDownload}
          />
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;