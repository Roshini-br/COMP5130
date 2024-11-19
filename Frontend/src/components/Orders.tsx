import {
  Accordion,
  Avatar,
  Divider,
  Group,
  Stack,
  Title,
  Text,
  Paper,
  ActionIcon,
  Loader,
} from "@mantine/core";
import { IconArrowRight, IconToolsKitchen } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";

import { OrderItem, OrdersType } from "../models/Orders";
import { getOrdersForUser } from "../services/order.service";
import AppContext from "./context/AppContext";
import { compareDesc, format, parseISO } from "date-fns";

function Orders() {
  const { userId } = useContext(AppContext);

  const [fetchedOrdersData, setFetchedOrdersData] = useState<OrdersType[]>();

  async function fetchOrders() {
    try {
      const res = await getOrdersForUser(userId as string);
      console.log(res?.data);
      if (res?.data) {
        const sortedOrders = res?.data?.sort((a: OrdersType, b: OrdersType) =>
          compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
        );
        setFetchedOrdersData(sortedOrders);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  function AccordionLabel({
    _id,
    createdAt,
    orderStatus,
    totalAmount,
  }: OrdersType) {
    return (
      <Group wrap="nowrap">
        <Avatar radius="xl" size="lg" color="blue">
          <IconToolsKitchen />
        </Avatar>
        <Stack gap={5}>
          <Text truncate="end">#{_id}</Text>
          <Text fw={600}>Total: ${totalAmount?.toFixed(2)}</Text>
          <Text size="sm" c="dimmed" fw={400}>
            Create on: {format(Date.parse(createdAt), "d MMMM yyyy")}
          </Text>
        </Stack>
      </Group>
    );
  }

  return (
    <Stack mt={20} mb={100}>
      <Group>
        <IconToolsKitchen size={"2rem"} />
        <Title size={"1.9rem"}>Orders</Title>
      </Group>
      <Divider />

      {fetchedOrdersData ? (
        <>
          {fetchedOrdersData?.length ? (
            <Accordion
              chevronPosition="right"
              variant="separated"
              defaultValue={fetchedOrdersData[0]?._id}
            >
              {fetchedOrdersData?.map((order: OrdersType, index: number) => {
                return (
                  <Accordion.Item value={order._id} key={order._id}>
                    <Accordion.Control>
                      <AccordionLabel {...order} />
                    </Accordion.Control>
                    <Accordion.Panel>
                      {order.items?.map((menuItem: OrderItem) => (
                        <Paper
                          style={{ width: "100%" }}
                          p={10}
                          key={index + Math.random() * fetchedOrdersData.length}
                        >
                          <Stack gap={10}>
                            <Group justify="space-between">
                              <Text fw={600} size="md">
                                {menuItem.name}
                              </Text>
                            </Group>

                            <Group justify="space-between">
                              <Text size="md" fw={300}>
                                $ {menuItem.price}
                              </Text>

                              <Group gap={8}>
                                <Text size="md" fw={300}>
                                  Qty:
                                </Text>
                                <Text>{menuItem.quantity}</Text>
                              </Group>
                            </Group>
                            <Divider />

                            <Group justify="space-between">
                              <Text fw={300} size="md">
                                Total
                              </Text>
                              <Text fw={600} size="md">
                                ${" "}
                                {(menuItem.quantity * menuItem.price)?.toFixed(
                                  2
                                )}
                              </Text>
                            </Group>
                          </Stack>
                        </Paper>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          ) : (
            <Group justify="center" mt={20}>
              <Text fw={500} size="lg">
                No Orders yet !
              </Text>
            </Group>
          )}
        </>
      ) : (
        <Group justify="center" mt={20}>
          <Loader color="blue" size={"sm"} />
        </Group>
      )}
    </Stack>
  );
}

export default Orders;
