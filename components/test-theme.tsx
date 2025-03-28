"use client";

import React from "react";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";

export default function ThemeTest() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Theme Test</h2>
      
      <Card className="max-w-md">
        <CardBody>
          <p className="text-foreground">This card should use theme colors</p>
        </CardBody>
        <CardFooter>
          <Button color="primary">Primary Button</Button>
          <Button color="secondary" className="ml-2">Secondary Button</Button>
        </CardFooter>
      </Card>
      
      <div className="flex space-x-2">
        <div className="w-20 h-20 bg-primary rounded-md flex items-center justify-center text-white">
          Primary
        </div>
        <div className="w-20 h-20 bg-secondary rounded-md flex items-center justify-center text-white">
          Secondary
        </div>
        <div className="w-20 h-20 bg-background border border-divider rounded-md flex items-center justify-center text-foreground">
          Background
        </div>
      </div>
    </div>
  );
}