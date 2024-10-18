"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Avatar,
  Chip,
  Divider,
  Progress,
  RadioGroup,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { createClient } from "@/utils/supabase/client";
import { PayPalIcon } from "@/components/icons";
import PaymentMethodRadio from "@/components/checkout/payment-method-radio";

const checkoutSteps = [
  {
    key: "review-order",
    icon: "solar:cart-check-linear",
    title: "Vérifier la commande",
    description: "Passez en revue les articles de votre commande.",
    isCompleted: true,
  },
  {
    key: "payment-method",
    icon: "solar:wallet-money-linear",
    title: "Choisir le mode de paiement",
    description: "Sélectionnez PayPal comme méthode de paiement.",
    isCompleted: true,
  },
  {
    key: "confirm-payment",
    icon: "solar:hand-money-linear",
    title: "Confirmer le paiement",
    description: "Finalisez votre commande et procédez au paiement.",
    isCompleted: false,
  },
];

export default function CheckoutForm({ user }: { user: User | null }) {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const getOrder = useCallback(async () => {
    setLoading(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", params.orderId)
        .single();

      if (orderError) throw orderError;

      if (order?.payment_status !== "PENDING")
        throw new Error("Order not pending !");

      const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select("*, product:product_id(*)")
        .eq("order_id", order.id);

      if (itemsError) throw itemsError;

      if (orderItems.length === 0) throw new Error("Order items not found !");

      setOrder(order);
      setOrderItems(orderItems);

      console.log(order);
      console.log(orderItems);
    } catch (error) {
      if (error?.code === "PGRST116") {
        setError("Commande non trouvée !");
        setLoading(false);
      } else {
        setError("Une erreur est survenue, veuillez réessayer plus tard !");
      }
    } finally {
      setLoading(false);
    }
  }, [params.orderId]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  const handlePayment = () => {
    setCurrentStep(2);
    setTimeout(() => {
      router.push("/thank-you");
    }, 5000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Progress
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
          color="secondary"
          size="sm"
        />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto mt-10 max-w-sm">
        <div className="flex items-center space-x-2 p-5">
          <Icon className="text-danger text-4xl" icon="mdi:alert-circle" />
          <p className="text-danger">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card className="w-full p-10">
        <CardHeader className="flex flex-col gap-3 px-4 pb-0 pt-3">
          <Avatar
            className="w-14 h-14 text-large"
            src={
              user?.user_metadata.avatar_url ||
              `https://i.pravatar.cc/150?u=${user?.id}`
            }
          />
          <Progress
            showValueLabel
            classNames={{
              label: "font-medium",
              indicator: "bg-gradient-to-r from-primary-400 to-secondary-500",
              value: "text-foreground/60",
            }}
            label="Processus de commande"
            value={80}
          />
        </CardHeader>
        <CardBody className="px-2 pt-3">
          <Listbox
            aria-label="Checkout steps"
            items={checkoutSteps}
            variant="flat"
          >
            {(item) => (
              <ListboxItem
                key={item.key}
                classNames={{
                  base: "w-full px-4 min-h-[70px] gap-3",
                  title: "text-medium font-medium",
                  description: "text-small",
                }}
                description={item.description}
                endContent={
                  <div className="flex flex-none">
                    {item.isCompleted ||
                    checkoutSteps.indexOf(item) <= currentStep ? (
                      <Icon
                        className="text-success"
                        icon="solar:check-circle-bold"
                        width={30}
                      />
                    ) : (
                      <Icon
                        className="text-default-400"
                        icon="solar:round-alt-arrow-right-bold"
                        width={30}
                      />
                    )}
                  </div>
                }
                startContent={
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-default-100">
                    <Icon
                      className="text-primary"
                      icon={item.icon}
                      width={24}
                    />
                  </div>
                }
                title={item.title}
              />
            )}
          </Listbox>
        </CardBody>
      </Card>

      <Card className="p-10">
        <CardHeader>
          <h2 className="text-2xl font-bold">Récapitulatif de la commande</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {orderItems.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <span>
                  {item.product.name}{" "}
                  <Chip size="sm" variant="flat">
                    x{item.quantity}
                  </Chip>
                </span>
                <span className="font-semibold">
                  {(item.quantity * item.price_at_time).toFixed(2)} €
                </span>
              </div>
            ))}
            <Divider />
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span>{order?.total_amount.toFixed(2)} €</span>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="p-10">
        <CardHeader>
          <h2 className="text-2xl font-bold">Méthode de paiement</h2>
        </CardHeader>
        <CardBody>
          <RadioGroup
            aria-label="Méthode de paiement"
            defaultValue="paypal"
            onChange={() => setCurrentStep(1)}
          >
            <PaymentMethodRadio
              description="Payer avec PayPal"
              icon={<PayPalIcon height={30} width={30} />}
              label="PayPal"
              value="paypal"
            />
          </RadioGroup>
        </CardBody>
      </Card>

      <div className="flex justify-center">
        <Button
          className="text-lg font-bold bg-gradient-to-r from-primary to-secondary text-white"
          size="lg"
          startContent={<Icon icon="mdi:cart-check" width={24} />}
          onPress={handlePayment}
        >
          Finaliser la commande et payer
        </Button>
      </div>
    </div>
  );
}
