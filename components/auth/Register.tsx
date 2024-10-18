"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Link,
  Checkbox,
  Card,
  CardBody,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterFormData } from "@/app/auth/register/schema";
import { signup } from "@/app/auth/actions";

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleFormSubmit = async (data: RegisterFormData) => {
    try {
      const result = await signup(data.email, data.password);

      if (result.error) {
        setMessage(result.error);
      } else if (result.success) {
        setMessage(result.success);
      }
    } catch (error) {
      console.error("Inscription échouée:", error);
      setMessage("Une erreur inattendue s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
      <div className="w-full text-left">
        <p className="pb-2 text-xl font-medium">Créer un compte</p>
        <p className="text-small text-default-500">
          Inscrivez-vous pour commencer
        </p>
      </div>

      {message && (
        <Card>
          <CardBody>
            <p
              className={
                message.includes("erreur") ? "text-danger" : "text-success"
              }
            >
              {message}
            </p>
          </CardBody>
        </Card>
      )}

      <form
        className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          label="Adresse Email"
          {...register("email")}
          errorMessage={errors.email?.message}
          placeholder="Entrez votre email"
          type="email"
          variant="underlined"
        />
        <Input
          endContent={
            <button type="button" onClick={toggleVisibility}>
              <Icon
                className="pointer-events-none text-2xl text-default-400"
                icon={isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"}
              />
            </button>
          }
          label="Mot de passe"
          {...register("password")}
          errorMessage={errors.password?.message}
          placeholder="Créez un mot de passe"
          type={isVisible ? "text" : "password"}
          variant="underlined"
        />
        <Input
          endContent={
            <button type="button" onClick={toggleVisibility}>
              <Icon
                className="pointer-events-none text-2xl text-default-400"
                icon={isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"}
              />
            </button>
          }
          label="Confirmer le mot de passe"
          {...register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
          placeholder="Confirmez votre mot de passe"
          type={isVisible ? "text" : "password"}
          variant="underlined"
        />
        <div className="flex items-center justify-between px-1 py-2">
          <Checkbox name="terms" size="sm">
            J'accepte les conditions d'utilisation
          </Checkbox>
        </div>
        <Button color="primary" type="submit">
          S'inscrire
        </Button>
      </form>

      <p className="text-center text-small">
        Vous avez déjà un compte ?&nbsp;
        <Link href="/auth/login" size="sm">
          Connectez-vous
        </Link>
      </p>
    </div>
  );
}
