import { useState } from "react";
import {
  Modal,
  useMantineTheme,
  LoadingOverlay,
  DEFAULT_THEME,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import {
  selecteOpenLoginModal,
  setOpenLoginModal,
} from "../Redux/features/OtherStateteSlice";

// contents
import LoginContent from "./LoginContent";
import RegisterContent from "./RegisterContent";
import { Toaster, toast } from "react-hot-toast";

const AuthModal = () => {
  const opened = useSelector(selecteOpenLoginModal);
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [loading, setloading] = useState(false);

  const customLoader = (
    <svg
      width="54"
      height="54"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke={DEFAULT_THEME.colors.blue[6]}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <LoadingOverlay
        loader={customLoader}
        visible={loading}
        zIndex={600}
        transitionDuration={500}
      />
      <Modal
        opened={opened}
        onClose={() => dispatch(setOpenLoginModal(false))}
        title={
          isLoginOpen ? `Login to Your Account` : `Register for an Account`
        }
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.7}
        overlayBlur={7}
        zIndex={400}
        centered
      >
        {/* Modal content */}

        {isLoginOpen ? (
          <LoginContent
            setIsLoginOpen={setIsLoginOpen}
            toast={toast}
            setloading={setloading}
          />
        ) : (
          <RegisterContent
            setIsLoginOpen={setIsLoginOpen}
            toast={toast}
            setloading={setloading}
          />
        )}
      </Modal>
    </>
  );
};

export default AuthModal;
