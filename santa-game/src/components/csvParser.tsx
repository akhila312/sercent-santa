import { Employee } from "@/types";
import { SecretSantaAssignment } from "@/types"; 

export const parseCSV = (csvContent: string): Employee[] => {
  const rows = csvContent.split('\n'); // Split content by newlines
  return rows.slice(1).map(row => {
    const [name, email] = row.split(','); // Split each row by comma
    return {
      Employee_Name: name || '',
      Employee_EmailID: email || ''
    };
  }).filter(employee => employee.Employee_Name && employee.Employee_EmailID); // Remove empty entries
};
  
  export const generateCSV = (assignments: SecretSantaAssignment[]): string => {
    const headers = ['Employee_Name', 'Employee_EmailID', 'Secret_Child_Name', 'Secret_Child_EmailID'];
    const rows = assignments.map(assignment => 
      [assignment.Employee_Name, assignment.Employee_EmailID, 
       assignment.Secret_Child_Name, assignment.Secret_Child_EmailID].join(',')
    );
    
    return [headers.join(','), ...rows].join('\n');
  };