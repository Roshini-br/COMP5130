import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Card,
  Container,
  Group,
  Loader,
  Menu,
  Radio,
  rem,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  IconChefHat,
  IconGardenCart,
  IconGridDots,
  IconLogout,
  IconMenu2,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconToolsKitchen,
  IconUserCircle,
} from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import UserInfo from "../UserInfo";
import classes from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [value, setValue] = useState<string | null>(null);
  const [searchString, setSearchString] = useState("");
  const {
    restaurants,
    userId,
    shouldForceRerouteToHome,
    toggleShouldForceRerouteToHome,
    showDrawer,
  } = useContext(AppContext);

  useEffect(() => {
    if (restaurants?.length) {
      setValue(restaurants[0]._id);
      selectRestaurant(restaurants[0]._id);
    }
  }, [restaurants]);

  useEffect(() => {
    if (shouldForceRerouteToHome && restaurants?.length) {
      navigate(`/${value}`);
      toggleShouldForceRerouteToHome();
    }
  }, [shouldForceRerouteToHome]);

  function selectRestaurant(value: string) {
    setValue(value);
    navigate(`/${value}`);
    toggleMobile();
  }

  function getRestaurantFilteredBySearchString() {
    if (searchString?.trim()) {
      return restaurants?.filter((restaurant) =>
        restaurant.name?.toUpperCase()?.includes(searchString.toUpperCase())
      );
    } else {
      return restaurants;
    }
  }

  function getRestaurantCards() {
    return getRestaurantFilteredBySearchString()?.map((item: any) => (
      <Radio.Card
        className={classes.root}
        radius="md"
        value={item._id}
        key={item._id}
      >
        <Group wrap="nowrap" align="flex-start" p={"sm"}>
          <Radio.Indicator />
          <Container flex={1} px={0}>
            <Group justify="space-between">
              <Text fw={700} size="md">
                {item.name}
              </Text>
              <Group gap={3}>
                <StarFilledIcon style={{ color: "#FFD700" }} />
                <Text size="sm" c="dimmed">
                  {item.rating}
                </Text>
              </Group>
            </Group>
            <Text size="sm" c="dimmed">
              {item.address}
            </Text>
          </Container>
        </Group>
      </Radio.Card>
    ));
  }

  return (
    <AppShell
      layout="alt"
      header={{ height: 80 }}
      navbar={{
        width: "25vw",
        breakpoint: "xs",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Stack justify="center" mt={15}>
          <Group justify="space-between" align="center">
            <Group px="md">
              <ActionIcon
                // opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="lg"
                variant="light"
                radius="xl"
              >
                <IconChefHat />
              </ActionIcon>

              <ActionIcon
                onClick={toggleDesktop}
                visibleFrom="sm"
                size="xl"
                variant="light"
                radius="xl"
              >
                <IconChefHat />
              </ActionIcon>
              <Title
                onClick={() => navigate(`/${value}`)}
                style={{ cursor: "pointer" }}
              >
                Foodie
              </Title>
            </Group>

            <Group justify="flex-end" pr={"lg"} gap={5} visibleFrom="md">
              <Button
                leftSection={<IconGardenCart />}
                size="md"
                variant="transparent"
                onClick={() => {
                  if (mobileOpened) {
                    toggleMobile();
                  }
                  if (desktopOpened) {
                    toggleDesktop();
                  }
                  navigate(`/cart/${userId}`);
                }}
              >
                Cart
              </Button>

              <Button
                leftSection={<IconToolsKitchen size={22} />}
                variant="transparent"
                size="md"
                onClick={() => {
                  if (mobileOpened) {
                    toggleMobile();
                  }
                  if (desktopOpened) {
                    toggleDesktop();
                  }
                  navigate(`/orders/${userId}`);
                }}
              >
                Orders
              </Button>
              <UserInfo />
            </Group>

            <Group hiddenFrom="md">
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon
                    aria-label="Settings"
                    size="lg"
                    variant="subtle"
                    mr={"xl"}
                  >
                    <IconGridDots />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconGardenCart
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => {
                      if (mobileOpened) {
                        toggleMobile();
                      }
                      if (desktopOpened) {
                        toggleDesktop();
                      }
                      navigate(`/cart/${userId}`);
                    }}
                  >
                    Cart
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconToolsKitchen
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => {
                      if (mobileOpened) {
                        toggleMobile();
                      }
                      if (desktopOpened) {
                        toggleDesktop();
                      }
                      navigate(`/orders/${userId}`);
                    }}
                  >
                    Orders
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    leftSection={
                      <IconUserCircle
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => {
                      if (mobileOpened) {
                        toggleMobile();
                      }
                      if (desktopOpened) {
                        toggleDesktop();
                      }
                      showDrawer();
                    }}
                  >
                    Profile
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Stack>
      </AppShell.Header>

      <AppShell.Navbar zIndex={10}>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <Container
            px={1}
            mx={10}
            mt={{
              base: "5rem",
              md: 5,
            }}
          >
            <Stack gap={8}>
              <Text fw={450} size="lg">
                Pick a restaurant
              </Text>
              <Text fw={400} size="xs" c={"dimmed"}>
                Choose a restaurant to see its menu
              </Text>
              <Card px={0} shadow="md" withBorder py={2} radius="md">
                <TextInput
                  placeholder="Search for a restaurant name..."
                  size="md"
                  leftSection={<IconSearch color="teal" />}
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                  variant="unstyled"
                  disabled={!value}
                />
              </Card>
            </Stack>
            <Stack>
              <Radio.Group value={value} onChange={selectRestaurant}>
                <Stack pt="md" gap="xs">
                  {value ? (
                    <>{getRestaurantCards()}</>
                  ) : (
                    <Group justify="center" mt={20}>
                      <Loader color="blue" size={"sm"} />
                    </Group>
                  )}
                </Stack>
              </Radio.Group>
            </Stack>
          </Container>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default Home;
