import { Container, Stack } from "@mantine/core";
import { Chart, OverView } from "../features/dashboard";

export default function Dashboard() {
  return (
    <Container size="lg">
      <Stack gap="lg">
        <OverView />
        <Chart />
      </Stack>
    </Container>
  );
}
