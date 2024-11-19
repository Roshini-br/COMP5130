import {
  AspectRatio,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Loader,
  Overlay,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuType from "../models/Menu";
import { Restaurant } from "../models/Restaurant";
import AppContext from "./context/AppContext";
import { IconGardenCart, IconSearch } from "@tabler/icons-react";
import { addToCart } from "../services/cart.service";
import AddToCart from "../models/AddToCart";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

const Menu = () => {
  const { restaurantId } = useParams();
  const { restaurants, userId } = useContext(AppContext);
  const [searchString, setSearchString] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
  const [
    itemAddingToCart,
    { open: setAddingToCart, close: unsetAddingToCart },
  ] = useDisclosure(false);

  useEffect(() => {
    if (restaurants?.length) {
      const filteredRestaurant = restaurants.find(
        (restaurant: Restaurant) => restaurant._id === restaurantId
      );
      setSelectedRestaurant(filteredRestaurant);
    }
  }, [restaurantId, restaurants]);

  async function addItemToCart(menuItem: MenuType, menuItemId: string) {
    try {
      setAddingToCart();
      notifications.show({
        id: menuItemId,
        position: "bottom-right",
        withCloseButton: false,
        title: "On it",
        message: "Adding the food item to you cart",
        loading: true,
        withBorder: true,
        color: "teal",
      });
      const payload: AddToCart = {
        ...menuItem,
        user: userId as string,
        restaurant: selectedRestaurant?._id as string,
        quantity: 1,
      };

      const response = await addToCart(payload);

      console.log(response);

      notifications.update({
        id: menuItemId,
        position: "bottom-right",
        withCloseButton: true,
        title: "Done",
        message: "Food item added to cart",
        loading: false,
        color: "teal",
        autoClose: 5000,
      });
    } catch (e) {
      console.log(e);
      notifications.update({
        id: menuItemId,
        title: "Oops",
        message: "Something went wrong adding to cart, Please try again",
        color: "red",
        loading: false,
        withCloseButton: true,
        autoClose: 5000,
      });
    } finally {
      unsetAddingToCart();
    }
  }

  function getMenuItemsFilteredByFoodName() {
    if (searchString?.trim()) {
      return selectedRestaurant?.menu?.filter((menuItem) =>
        menuItem?.name?.toUpperCase()?.includes(searchString.toUpperCase())
      );
    } else {
      return selectedRestaurant?.menu;
    }
  }

  if (!restaurants) {
    return (
      <Stack align="center" mt={20}>
        <Loader color="blue" size={"md"} />
        <Text>Loading menu ...</Text>
      </Stack>
    );
  }

  return (
    <Stack mt={15}>
      <AspectRatio
        ratio={16 / 9}
        maw={"100%"}
        w={"100%"}
        mx="auto"
        pos="relative"
      >
        <Image radius="md" src={selectedRestaurant?.image} />
        <Overlay radius="md" opacity={0.85} zIndex={2} />
        <Group
          style={{
            position: "absolute",
            top: "0%",
            zIndex: 7,
            background: "transparent",
          }}
          justify="flex-end"
          align="end"
          p={20}
        >
          <Text
            c="white"
            fw={700}
            fs="italic"
            truncate="end"
            style={{ fontSize: "2rem" }}
          >
            {selectedRestaurant?.name}
          </Text>
        </Group>
      </AspectRatio>

      <Card px={0} shadow="lg" withBorder py={2} radius="md">
        <TextInput
          placeholder="Search food ..."
          size="lg"
          leftSection={<IconSearch color="teal" />}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          variant="unstyled"
        />
      </Card>
      <Grid>
        {getMenuItemsFilteredByFoodName()?.map(
          (menuItem: MenuType, index: number) => (
            <Grid.Col
              span={{
                xs: 1,
                sm: 3,
                base: 12,
                xl: 4,
              }}
              key={index}
            >
              <Card shadow="sm">
                <Card.Section>
                  <Image
                    src={menuItem.image}
                    height={160}
                    alt={menuItem.name}
                  />
                </Card.Section>
                <Stack gap={2} mt={10}>
                  <Text fw={600}>{menuItem.name}</Text>
                  <Text size="xl" fw={300}>
                    $ {menuItem.price}
                  </Text>
                  <Text size="sm" c="dimmed" fs="italic" fw={400}>
                    {menuItem.description}
                  </Text>
                  <Button
                    mt="sm"
                    leftSection={<IconGardenCart size={20} />}
                    variant="light"
                    onClick={() => {
                      addItemToCart(menuItem, menuItem.name + index.toString());
                    }}
                    disabled={itemAddingToCart}
                  >
                    Add to cart
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          )
        )}
      </Grid>
    </Stack>
  );
};

export default Menu;
