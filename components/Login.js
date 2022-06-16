import React from "react";
import { Modal } from "@mantine/core";

const Login = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Introduce yourself!"
      overlayColor={theme.colors.dark[9]}
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      {/* Modal content */}
    </Modal>
  );
};

export default Login;
