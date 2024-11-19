import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconGardenCart, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { CartItemAndQuantity, CartItems } from "../models/Cart";
import {
  clearCartItems,
  getCart,
  removeItemFromCart,
  updateItemQuantityInCart,
} from "../services/cart.service";
import AppContext from "./context/AppContext";
import { Restaurant } from "../models/Restaurant";
import { useNavigate } from "react-router-dom";
import { CreateOrderPayload } from "../models/Orders";
import { createNewOrder } from "../services/order.service";
import { useDisclosure } from "@mantine/hooks";
import PaymentForm from "./PaymentForm";

function Cart() {
  const { userId } = useContext(AppContext);
  const navigate = useNavigate();
  const [fetchedCartData, setFetchedCartData] = useState<CartItems>();
  const [paymentsOpen, paymentsHandler] = useDisclosure(false);
  const [amountPayable, setAmountPayable] = useState<number>(0);

  async function fetchCart() {
    try {
      const cartItems = await getCart(userId as string);
      console.log(cartItems);
      setFetchedCartData(cartItems);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  async function removeItem(item: Restaurant) {
    try {
      await removeItemFromCart(userId as string, item.menu[0].name, item._id);
      console.log("Deleted refetching");
      fetchCart();
    } catch (e) {
      console.log(e);
    }
  }
  async function updateQuantity(item: Restaurant, quantity: number) {
    try {
      await updateItemQuantityInCart(
        userId as string,
        item.menu[0].name,
        item._id,
        quantity
      );
      console.log("Updated refetching");
      fetchCart();
    } catch (e) {
      console.log(e);
    }
  }

  async function createOrder() {
    try {
      const createOrderPayloadItems = fetchedCartData?.items
        ?.flatMap((cartItem) => cartItem)
        .map((flattenCartItem) => ({
          restaurant: flattenCartItem.restaurant._id,
          name: flattenCartItem.restaurant.menu[0]?.name,
          quantity: flattenCartItem.quantity,
          price: flattenCartItem.restaurant.menu[0]?.price,
        }));

      const payload: CreateOrderPayload = {
        user: userId as string,
        items: createOrderPayloadItems ?? [],
      };

      await createNewOrder(payload);
      await clearCartItems(userId as string);

      navigate(`/orders/${userId}`);
    } catch (e) {
      console.log(e);
    }
  }

  function proceedToPay() {
    if (fetchedCartData) {
      setAmountPayable(parseFloat(fetchedCartData.totalAmount.toFixed(2)) ?? 0);
      paymentsHandler.open();
    }
  }

  return (
    <Stack mt={20} mb={100}>
      <PaymentForm
        opened={paymentsOpen}
        close={paymentsHandler.close}
        payableAmount={amountPayable}
        onPaymentComplete={createOrder}
      />
      {fetchedCartData?.items?.length ? (
        <Button
          variant="filled"
          color="violet"
          radius="xl"
          size="md"
          sx={(theme: any) => ({
            position: "fixed",
            bottom: theme.spacing.xl,
            right: theme.spacing.xl,
            zIndex: paymentsOpen ? -100 : 100,
            visibility: paymentsOpen ? "hidden" : "visible",
            boxShadow: theme.shadows.xl,
            backgroundColor: theme.colors.blue[6],
            "&:hover": {
              backgroundColor: theme.colors.blue[7],
            },
          })}
          onClick={proceedToPay}
        >
          <Group>
            <>Pay And Checkout</> <Divider orientation="vertical" />
            <>$ {fetchedCartData?.totalAmount?.toFixed(2)}</>
          </Group>
        </Button>
      ) : (
        <></>
      )}

      <Group>
        <IconGardenCart size={"2rem"} />
        <Title size={"1.9rem"}>Cart</Title>
      </Group>
      <Divider />

      {fetchedCartData ? (
        <>
          {fetchedCartData.items?.length ? (
            <Stack mt={20}>
              {fetchedCartData?.items?.flatMap(
                (cartItems: CartItemAndQuantity[]) =>
                  cartItems.map(
                    (
                      cartItemAndQuantity: CartItemAndQuantity,
                      index: number
                    ) => {
                      const { menu } = cartItemAndQuantity.restaurant;

                      const menuItem = menu[0];

                      return (
                        <Paper
                          shadow="xs"
                          style={{ width: "100%" }}
                          p={20}
                          key={index + Math.random() * cartItems.length}
                        >
                          <Stack gap={10}>
                            <Group justify="space-between">
                              <Text fw={600} size="lg">
                                {menuItem.name}
                              </Text>
                              <ActionIcon
                                variant="transparent"
                                size="xs"
                                c={"red"}
                                p={0}
                                onClick={() =>
                                  removeItem(cartItemAndQuantity.restaurant)
                                }
                              >
                                <IconTrash style={{ padding: 0 }} />
                              </ActionIcon>
                            </Group>
                            <Text c="dimmed" fs="italic">
                              by {cartItemAndQuantity.restaurant.name}
                            </Text>
                            <Group justify="space-between">
                              <Text size="xl" fw={300}>
                                $ {menuItem.price}
                              </Text>

                              <Button.Group>
                                <Button
                                  variant="default"
                                  size="xs"
                                  disabled={cartItemAndQuantity.quantity <= 1}
                                  onClick={() =>
                                    updateQuantity(
                                      cartItemAndQuantity.restaurant,
                                      --cartItemAndQuantity.quantity
                                    )
                                  }
                                >
                                  -
                                </Button>
                                <Button variant="default" size="xs">
                                  {cartItemAndQuantity.quantity}
                                </Button>
                                <Button
                                  variant="default"
                                  size="xs"
                                  onClick={() =>
                                    updateQuantity(
                                      cartItemAndQuantity.restaurant,
                                      ++cartItemAndQuantity.quantity
                                    )
                                  }
                                >
                                  +
                                </Button>
                              </Button.Group>
                            </Group>
                            <Divider />

                            <Group justify="space-between">
                              <Text fw={300} size="sm">
                                Total
                              </Text>
                              <Text fw={600} size="sm">
                                ${" "}
                                {(
                                  cartItemAndQuantity.quantity * menuItem.price
                                )?.toFixed(2)}
                              </Text>
                            </Group>
                          </Stack>
                        </Paper>
                      );
                    }
                  )
              )}
            </Stack>
          ) : (
            <Group justify="center" mt={20}>
              <Text fw={500} size="lg">
                You cart is empty !
              </Text>
            </Group>
          )}
        </>
      ) : (
        <Group justify="center" mt={20}>
          <Loader color="blue" size={"md"} />
        </Group>
      )}
    </Stack>
  );
}

export default Cart;
