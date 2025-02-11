import { Employee, SecretSantaAssignment } from "@/types";

export const assignSecretSanta = (
    employees: Employee[],
    previousAssignments: SecretSantaAssignment[] = []
  ): SecretSantaAssignment[] => {
    const assignments: SecretSantaAssignment[] = [];
    const availableRecipients = [...employees];
  
    for (const giver of employees) {
      const previousRecipient = previousAssignments.find(
        assignment => assignment.Employee_EmailID === giver.Employee_EmailID
      )?.Secret_Child_EmailID;
  
      const validRecipients = availableRecipients.filter(recipient =>
        recipient.Employee_EmailID !== giver.Employee_EmailID &&
        recipient.Employee_EmailID !== previousRecipient
      );
  
      if (validRecipients.length === 0) {
        // If no valid recipients, reset and try again
        return assignSecretSanta(employees, previousAssignments);
      }
  
      const randomIndex = Math.floor(Math.random() * validRecipients.length);
      const recipient = validRecipients[randomIndex];
  
      assignments.push({
        ...giver,
        Secret_Child_Name: recipient?.Employee_Name || '',
        Secret_Child_EmailID: recipient?.Employee_EmailID || ''
      });
      const recipientIndex = availableRecipients.findIndex(
        r => r.Employee_EmailID === recipient?.Employee_EmailID
      );
      availableRecipients.splice(recipientIndex, 1);
    }

    return assignments;
  };
  