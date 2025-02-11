import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import Dashboard from './views/atfp';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Dashboard />
    </MantineProvider>
  );
}
