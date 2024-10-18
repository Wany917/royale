import React from "react";
import { Radio, cn } from "@nextui-org/react";

interface PaymentMethodRadioProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: string;
  isExpired?: boolean;
}

const PaymentMethodRadio: React.FC<PaymentMethodRadioProps> = ({
  icon,
  label,
  description,
  value,
  isExpired = false,
}) => (
  <Radio
    classNames={{
      base: cn(
        "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
        "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
        "data-[selected=true]:border-primary",
      ),
    }}
    value={value}
  >
    <div className="flex items-center gap-4">
      {icon}
      <div className="flex flex-col gap-1">
        <span
          className={cn("text-small font-medium", isExpired && "text-danger")}
        >
          {label}
        </span>
        <span className="text-tiny text-default-400">{description}</span>
      </div>
    </div>
  </Radio>
);

export default PaymentMethodRadio;
