import { Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconUpload, IconX } from '@tabler/icons-react';

interface FileUploadProps {
  onFileUpload: (content: string) => void;
  label: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, label }) => {
  const theme = useMantineTheme();

  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content);
    };
    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      accept={['text/csv']}
      maxSize={5 * 1024 ** 2}
    >
      <Group justify="center" gap="xl" style={{ minHeight: 120, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={theme.colors[theme.primaryColor]?.[6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[6]}
          />
        </Dropzone.Reject>
        <div>
          <Text size="xl" inline>
            {label}
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Drag and drop CSV file here or click to select file
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
