import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { createPayment } from "../services/payments.service";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#000",
      fontFamily: '"Roboto", sans-serif',
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#a0aec0", // Placeholder text color
      },
    },
    invalid: {
      color: "#e63946", // Red color for errors
      iconColor: "#e63946",
    },
  },
};

const cardBrandIcons: any = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  diners: "Diners",
  jcb: "JCB",
  unionpay: "UnionPay",
  unknown: "Unknown",
};

export interface PaymentFormProps {
  opened: boolean;
  close: () => void;
  payableAmount: number;
  onPaymentComplete: () => void;
}

const PaymentForm = ({
  opened,
  close,
  payableAmount,
  onPaymentComplete,
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [cardBrand, setCardBrand] = useState("unknown");

  const handleCardNumberChange = (event: any) => {
    setCardBrand(event.brand || "unknown");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setErrorMessage("Card Number Element not found");
      return;
    }

    setLoading(true);

    try {
      const { data } = await createPayment(payableAmount);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
          },
        }
      );

      console.log(error);
      console.log(paymentIntent);

      if (error) {
        setErrorMessage((error as any).message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setPaymentStatus("Payment successful!");
        onPaymentComplete();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text size="xl" fw={500}>
          Payment
        </Text>
      }
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      radius={"md"}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md" mt={15}>
          <Box
            style={{
              position: "relative",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <CardNumberElement
              options={ELEMENT_OPTIONS}
              onChange={handleCardNumberChange}
            />
            <Text
              size="sm"
              sx={{ position: "absolute", top: "10px", right: "10px" }}
              c={"teal"}
              fw={800}
            >
              {cardBrandIcons[cardBrand]}
            </Text>
          </Box>
          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <CardExpiryElement options={ELEMENT_OPTIONS} />
          </div>

          <div
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <CardCvcElement options={ELEMENT_OPTIONS} />
          </div>

          {errorMessage && <Text c="red">{errorMessage}</Text>}

          {paymentStatus && <Text c="green">{paymentStatus}</Text>}

          <Group justify="center" grow>
            <Button
              type="button"
              disabled={loading}
              radius={"md"}
              color="grey"
              variant="subtle"
              onClick={close}
            >
              Cancel
            </Button>
            <Button type="submit" loading={!stripe || loading} radius={"md"}>
              Pay ${payableAmount}
            </Button>
          </Group>
        </Stack>
      </form>

      {/* Loading overlay */}
      {loading && <LoadingOverlay visible />}
    </Modal>
  );
};

export default PaymentForm;
