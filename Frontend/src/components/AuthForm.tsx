import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import AppContext from "./context/AppContext";
import { useDisclosure } from "@mantine/hooks";
import { createUser, loginUser } from "../services/user.service";
import { AxiosError } from "axios";

interface FormValues {
  username?: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
}

function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [authError, setAuthError] = useState("");
  const { userId, setUserId, toggleShouldForceRerouteToHome } =
    useContext(AppContext);
  const [openAuthModal, handleAuthModal] = useDisclosure(false);
  const [isAuthing, { open: setAuthing, close: unsetAuthing }] =
    useDisclosure(false);

  useEffect(() => {
    console.log(userId);
    const savedUserId = localStorage.getItem("userId");
    if (!userId && savedUserId && localStorage.getItem("token")) {
      setUserId(savedUserId);
      handleAuthModal.close();
    } else if (!savedUserId && !localStorage.getItem("token")) {
      toggleShouldForceRerouteToHome();
      handleAuthModal.open();
    } else {
      handleAuthModal.close();
    }
  }, [userId]);

  const form = useForm<FormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};
      if (!/^\S+@\S+$/.test(values.email)) {
        errors.email = "Invalid email format";
      }

      if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      }

      if (isRegister) {
        if (!values.username) {
          errors.username = "Name is mandatory";
        }
        if (!values.address) {
          errors.address = "Address is mandatory";
        }
        if (!/^\+?[0-9]+$/.test(values.phoneNumber || "")) {
          errors.phoneNumber =
            "Phone number must be a valid number e.g 9876765465";
        }
      }

      return errors;
    },
  });

  const handleSubmit = (values: FormValues) => {
    setAuthing();
    if (isRegister) {
      attemptRegister(values);
    } else {
      attemptLogin(values.email, values.password);
    }
  };

  async function attemptLogin(email: string, password: string) {
    try {
      const res = await loginUser(email, password);
      if (res?.data) {
        console.log(res.data);
        const { token, userId } = res.data;
        setUserId(userId);
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        handleAuthModal.close();
      }
    } catch (e) {
      console.log(e);
      setAuthError(((e as AxiosError).response as any)?.data.message);
    } finally {
      unsetAuthing();
    }
  }

  async function attemptRegister(payload: FormValues) {
    try {
      const res = await createUser(payload);
      if (res?.data) {
        setIsRegister(false);
        attemptLogin(payload.email, payload.password);
      }
    } catch (e) {
      console.log(e);
      setAuthError(((e as AxiosError).response as any)?.data.message);
    } finally {
      unsetAuthing();
    }
  }

  return (
    <Modal
      opened={openAuthModal}
      onClose={() => {}}
      title={
        <Text fw={600} size={"xl"}>
          {isRegister ? "Register" : "Login"}{" "}
        </Text>
      }
      radius={"md"}
      closeOnEscape={false}
      closeOnClickOutside={false}
      withCloseButton={false}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack gap={10}>
          {isRegister && (
            <Stack gap={10}>
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
            </Stack>
          )}
          <TextInput
            label="Email"
            placeholder="john.doe@example.com"
            {...form.getInputProps("email")}
            withAsterisk
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            withAsterisk
          />

          {isRegister ? (
            <Textarea
              label="Address"
              placeholder="456 Elm Street"
              {...form.getInputProps("address")}
              withAsterisk
            />
          ) : (
            <></>
          )}
          {authError ? (
            <Text size="sm" c="red">
              * {authError}
            </Text>
          ) : (
            <></>
          )}

          <Group justify="space-between" mt="md">
            <Button
              radius={"xl"}
              variant="transparent"
              onClick={() => {
                form.reset();
                setIsRegister((prev) => !prev);
              }}
            >
              {isRegister ? "Already Registered ?" : "New User, Register."}
            </Button>
            <Button
              type="submit"
              color="teal"
              radius={"xl"}
              loading={isAuthing}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default AuthForm;
