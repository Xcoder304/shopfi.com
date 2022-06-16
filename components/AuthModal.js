import { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import {
  selecteOpenLoginModal,
  setOpenLoginModal,
} from "../Redux/features/OtherStateteSlice";

// contents
import LoginContent from "./LoginContent";
import RegisterContent from "./RegisterContent";

const AuthModal = () => {
  const opened = useSelector(selecteOpenLoginModal);
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  return (
    <Modal
      opened={opened}
      onClose={() => dispatch(setOpenLoginModal(false))}
      title={isLoginOpen ? `Login to Your Account` : `Register for an Account`}
      overlayColor={theme.colors.dark[9]}
      overlayOpacity={0.7}
      overlayBlur={7}
      centered
    >
      {/* Modal content */}

      {isLoginOpen ? (
        <LoginContent setIsLoginOpen={setIsLoginOpen} />
      ) : (
        <RegisterContent setIsLoginOpen={setIsLoginOpen} />
      )}
    </Modal>
  );
};

export default AuthModal;
