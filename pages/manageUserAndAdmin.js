import { useState } from "react";
import Head from "next/head";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Button,
  Modal,
} from "@mantine/core";
import { Pencil, Trash, Plus } from "tabler-icons-react";
import { GetAllUsers } from "../utils/AuthFuntions";
import DelecteUser from "../components/ManageUserModals/DelecteUser";
import EditUser from "../components/ManageUserModals/EditUser";
import AddNewUser from "../components/ManageUserModals/AddNewUser";
import { Toaster, toast } from "react-hot-toast";

const ManageUserAndAdmin = ({ AllUsersData }) => {
  const [openModal, setopenModal] = useState(false);
  const [deletedModalOpened, setdeletedModalOpened] = useState(false);
  const [editModalOpened, seteditModalOpened] = useState(false);
  const [addNewUserModalOpened, setaddNewUserModalOpened] = useState(false);

  const theme = useMantineTheme();

  // ids
  const [UserID, setUserID] = useState(null);
  const [currentIndex, setcurrentIndex] = useState(null);

  const Open_Delete_Modal = (id, index) => {
    setopenModal(true);
    setdeletedModalOpened(true);
    seteditModalOpened(false);
    setaddNewUserModalOpened(false);
    setcurrentIndex(index);
    setUserID(id);
  };

  const Open_Edit_Modal = (id) => {
    setopenModal(true);
    seteditModalOpened(true);
    setdeletedModalOpened(false);
    setaddNewUserModalOpened(false);
    setUserID(id);
  };

  const Open_Add_New_User_Modal = () => {
    setopenModal(true);
    setaddNewUserModalOpened(true);
    setdeletedModalOpened(false);
    seteditModalOpened(false);
  };

  const rows = AllUsersData.users.map(
    ({ _id, name, profileImg, isAdmin, email, createdAt }, index) => (
      <>
        <tr key={index}>
          <td>
            <Group spacing="sm">
              <Avatar size={30} src={profileImg} radius={30} />
              <Text size="sm" weight={500}>
                {name}
              </Text>
            </Group>
          </td>

          <td>
            <Badge
              color={isAdmin ? "blue" : "green"}
              variant={theme.colorScheme === "dark" ? "light" : "outline"}
            >
              {isAdmin ? "Admin" : "User"}
            </Badge>
          </td>
          <td>{email}</td>
          <td>{createdAt && new Date(createdAt).toLocaleDateString()}</td>
          <td>
            <Group spacing={0} position="right">
              <ActionIcon>
                <Pencil size={20} onClick={() => Open_Edit_Modal(_id)} />
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={() => Open_Delete_Modal(_id, index)}
              >
                <Trash size={20} />
              </ActionIcon>
            </Group>
          </td>
        </tr>
      </>
    )
  );

  return (
    <>
      <Head>
        <title>Manage Users & Admin - Shopfi</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal
        opened={openModal}
        onClose={() => setopenModal(false)}
        title={"Wanna Delete"}
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.7}
        overlayBlur={7}
        zIndex={400}
        centered
      >
        {/* Modal content */}
        {deletedModalOpened && (
          <DelecteUser
            AllUsersData={AllUsersData}
            currentIndex={currentIndex}
            setopenModal={setopenModal}
            UserID={UserID}
            toast={toast}
          />
        )}

        {editModalOpened && <EditUser UserID={UserID} toast={toast} />}

        {addNewUserModalOpened && <AddNewUser />}
      </Modal>

      <div className="w-full">
        <div className="mt-5 flex items-end justify-end mr-2">
          <Button
            leftIcon={<Plus size={16} />}
            className="w-72 h-12 bg-App_green_L hover:bg-App_green_D transition-all duration-300 ease-out capitalize text-white text-base"
            onClick={Open_Add_New_User_Modal}
          >
            add a new user or admin
          </Button>
        </div>

        <ScrollArea>
          <h3 className="text-2xl capitalize text-blue-600 select-none mb-2 text-center mt-6">
            manage users & admins
          </h3>
          <div className="w-[95%] md:w-[90%] my-10 mx-auto">
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
              <thead>
                <tr>
                  <th>Users</th>
                  <th>Roles</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const res = await GetAllUsers();

  return {
    props: { AllUsersData: res },
  };
};

export default ManageUserAndAdmin;
