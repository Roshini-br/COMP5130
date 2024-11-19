import {
  Avatar,
  Button,
  Card,
  Drawer,
  Group,
  Loader,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "./context/AppContext";
import { UserInfoModel } from "../models/UserInfo";
import { getUserInfoById, updateUserInfoById } from "../services/user.service";
import { useForm } from "@mantine/form";
import { IconUserCircle } from "@tabler/icons-react";

interface FormValues {
  username: string;
  address: string;
  phoneNumber: string;
}

const UserInfoDisplay: React.FC<{
  userInfo: UserInfoModel | null;
  onEdit: () => void;
  logoutUser: () => void;
}> = ({ userInfo, onEdit, logoutUser }) => (
  <Stack>
    <Card withBorder radius={"md"}>
      <Stack>
        <Text>Phone Number: {userInfo?.phoneNumber ?? "Unknown"}</Text>
        <Text>Email: {userInfo?.email ?? "Unknown"}</Text>
        <Text>Address: {userInfo?.address ?? "Unknown"}</Text>
      </Stack>
    </Card>
    <Group grow>
      <Button variant="light" color="orange" onClick={onEdit}>
        Edit
      </Button>
      <Button variant="light" color="blue" onClick={logoutUser}>
        Logout
      </Button>
    </Group>
  </Stack>
);

const UserInfoForm: React.FC<{
  userId: string;
  initialValues: FormValues;
  onFormSubmit: (values: FormValues) => Promise<void>;
  onCancel: () => void;
}> = ({ initialValues, onFormSubmit, onCancel }) => {
  const form = useForm<FormValues>({
    initialValues,
    validate: (values) => {
      const errors: Partial<FormValues> = {};
      if (!values.username) errors.username = "Name is mandatory";
      if (!values.address) errors.address = "Address is mandatory";
      if (!/^\+?[0-9]+$/.test(values.phoneNumber || ""))
        errors.phoneNumber =
          "Phone number must be a valid number e.g 9876765465";
      return errors;
    },
  });

  const handleFormSubmit = async (values: FormValues) => {
    if (form.isValid()) {
      await onFormSubmit(values);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="John Doe"
          {...form.getInputProps("username")}
          withAsterisk
        />
        <TextInput
          label="Phone Number"
          placeholder="1234567890"
          {...form.getInputProps("phoneNumber")}
          withAsterisk
        />
        <Textarea
          label="Address"
          placeholder="456 Elm Street"
          {...form.getInputProps("address")}
          withAsterisk
        />
        <Group grow>
          <Button variant="light" color="green" type="submit">
            Save
          </Button>
          <Button variant="light" color="red" onClick={onCancel}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

function UserInfo() {
  const { userId, setUserId, shouldShowDrawer, showDrawer, hideDrawer } =
    useContext(AppContext);

  const [userInfo, setUserInfo] = useState<UserInfoModel | null>(null);
  const [isEditing, { toggle: toggleEditMode }] = useDisclosure(false);

  useEffect(() => {
    const fetchUserInfo = async (userId: string) => {
      try {
        const res = await getUserInfoById(userId);
        if (res?.data) {
          setUserInfo(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (userId) {
      fetchUserInfo(userId);
    }
  }, [userId]);

  const updateUserInfo = async (userId: string, payload: FormValues) => {
    try {
      const res = await updateUserInfoById(userId, payload);
      if (res?.data) {
        setUserInfo(res.data); // Refresh the user info after updating
        toggleEditMode(); // Close edit mode after submission
      }
    } catch (e) {
      console.log(e);
    }
  };

  function logout() {
    setUserId(null);
    localStorage.clear();
  }

  if (!userId) {
    return <></>;
  }

  return (
    <div>
      <Button
        leftSection={<IconUserCircle size={22} />}
        variant="transparent"
        size="md"
        onClick={showDrawer}
      >
        Profile
      </Button>
      <Drawer
        opened={shouldShowDrawer}
        onClose={hideDrawer}
        position="right"
        offset={8}
        radius={"md"}
      >
        <Stack mt={50}>
          {userInfo ? (
            <>
              <Stack align="center" justify="center">
                <Avatar
                  variant="filled"
                  radius="xl"
                  size="xl"
                  src=""
                  color="blue"
                />
                <Text fw={500} size="lg">
                  {userInfo?.username ?? "Unknown"}
                </Text>
              </Stack>
              {isEditing ? (
                <UserInfoForm
                  userId={userId}
                  initialValues={{
                    username: userInfo?.username || "",
                    address: userInfo?.address || "",
                    phoneNumber: userInfo?.phoneNumber || "",
                  }}
                  onFormSubmit={(values) => updateUserInfo(userId, values)}
                  onCancel={toggleEditMode}
                />
              ) : (
                <UserInfoDisplay
                  userInfo={userInfo}
                  onEdit={toggleEditMode}
                  logoutUser={logout}
                />
              )}
            </>
          ) : (
            <Group justify="center" mt={20}>
              <Loader size={"sm"} color="blue" />
            </Group>
          )}
        </Stack>
      </Drawer>
    </div>
  );
}

export default UserInfo;
