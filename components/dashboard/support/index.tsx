"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  useDisclosure,
  Avatar,
  Chip,
  Textarea,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { useState } from "react";

import { useTicketStore } from "@/stores/use-ticket-store";
import {
  TicketCategory,
  TicketPriority,
  NewTicketData,
  Ticket,
} from "@/types/ticket";

const categories: { value: TicketCategory; label: string }[] = [
  { value: "API", label: "API Issues" },
  { value: "Technical", label: "Technical Support" },
  { value: "Billing", label: "Billing" },
  { value: "Other", label: "Other" },
];

const priorities: { value: TicketPriority; label: string }[] = [
  { value: "high", label: "High Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "low", label: "Low Priority" },
];

export default function TicketingSystem() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMessage, setNewMessage] = useState("");
  const [newTicket, setNewTicket] = useState<Partial<NewTicketData>>({});

  const {
    tickets,
    activeTicket,
    setActiveTicket,
    addTicket,
    addMessage,
    updateTicketStatus,
    fetchTickets,
  } = useTicketStore();

  React.useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleNewTicket = async () => {
    if (
      !newTicket.title ||
      !newTicket.category ||
      !newTicket.priority ||
      !newTicket.description
    ) {
      return;
    }

    await addTicket(newTicket as NewTicketData);
    setNewTicket({});
    onClose();
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeTicket) return;

    await addMessage(activeTicket.id, newMessage);
    setNewMessage("");
  };

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return "success";
      case "pending":
        return "warning";
      case "closed":
        return "default";
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
    }
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-theme(spacing.32))]">
      {/* Liste des tickets */}
      <div className="w-80 flex-none">
        <Card className="h-full">
          <CardHeader className="flex justify-between">
            <h3 className="text-xl font-bold">Tickets</h3>
            <Button
              color="primary"
              size="sm"
              startContent={<Icon icon="solar:add-circle-linear" width={18} />}
              onPress={onOpen}
            >
              New Ticket
            </Button>
          </CardHeader>
          <CardBody className="gap-2 overflow-y-auto p-2">
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                isPressable
                className={`border-1 ${
                  activeTicket?.id === ticket.id
                    ? "border-primary"
                    : "border-default-200"
                }`}
                onPress={() => setActiveTicket(ticket)}
              >
                <CardBody className="p-3">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-small">{ticket.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Chip
                          color={getPriorityColor(ticket.priority)}
                          size="sm"
                          variant="flat"
                        >
                          {ticket.priority}
                        </Chip>
                        <span className="text-tiny text-default-500">
                          {format(ticket.created, "dd/MM/yyyy HH:mm")}
                        </span>
                      </div>
                    </div>
                    <Chip
                      color={getStatusColor(ticket.status)}
                      size="sm"
                      variant="flat"
                    >
                      {ticket.status}
                    </Chip>
                  </div>
                </CardBody>
              </Card>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Zone de conversation */}
      <div className="flex-1">
        <Card className="h-full">
          {activeTicket ? (
            <>
              <CardHeader className="border-b-1 border-default-200">
                <div className="flex justify-between w-full items-center">
                  <div>
                    <h3 className="text-xl font-bold">{activeTicket.title}</h3>
                    <div className="flex gap-2 text-small text-default-500">
                      <span>#{activeTicket.id}</span>
                      <span>•</span>
                      <span>{activeTicket.category}</span>
                      <span>•</span>
                      <span>
                        Last updated:{" "}
                        {format(activeTicket.lastUpdated, "dd/MM/yyyy HH:mm")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      className="w-32"
                      classNames={{
                        trigger: "h-10",
                        value: `${
                          activeTicket.status === "open"
                            ? "text-success"
                            : activeTicket.status === "pending"
                              ? "text-warning"
                              : "text-default-500"
                        }`,
                      }}
                      label="Status"
                      labelPlacement="outside"
                      selectedKeys={[activeTicket.status]}
                      onChange={(e) =>
                        updateTicketStatus(
                          activeTicket.id,
                          e.target.value as Ticket["status"],
                        )
                      }
                    >
                      <SelectItem
                        key="open"
                        className="text-success"
                        startContent={
                          <Icon
                            className="text-success"
                            icon="solar:record-circle-bold"
                            width={18}
                          />
                        }
                      >
                        Open
                      </SelectItem>
                      <SelectItem
                        key="pending"
                        className="text-warning"
                        startContent={
                          <Icon
                            className="text-warning"
                            icon="solar:record-circle-bold"
                            width={18}
                          />
                        }
                      >
                        Pending
                      </SelectItem>
                      <SelectItem
                        key="closed"
                        className="text-red-400"
                        startContent={
                          <Icon
                            className="text-red-400"
                            icon="solar:record-circle-bold"
                            width={18}
                          />
                        }
                      >
                        Closed
                      </SelectItem>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col h-full">
                  {/* Messages */}
                  <div className="flex-1 space-y-4 overflow-y-auto p-2">
                    {activeTicket.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${
                          message.isStaff ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        <Avatar
                          isBordered
                          color={message.isStaff ? "primary" : "default"}
                          fallback={
                            <Icon
                              icon={
                                message.isStaff
                                  ? "solar:user-rounded-linear"
                                  : "solar:user-circle-linear"
                              }
                              width={20}
                            />
                          }
                          src={message.isStaff ? "/support.png" : "/user.png"}
                        />
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.isStaff ? "bg-default-100" : "bg-primary/10"
                          }`}
                        >
                          {message.content}
                          <p className="text-tiny text-default-400 mt-1">
                            {format(message.timestamp, "dd/MM/yyyy HH:mm")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-1 border-default-200 pt-4 mt-4">
                    <div className="flex gap-2">
                      <Textarea
                        classNames={{
                          input: "resize-none",
                        }}
                        // endContent={
                        //   <Button
                        //     isIconOnly
                        //     className="text-default-400"
                        //     size="sm"
                        //     variant="light"
                        //   >
                        //     <Icon icon="solar:paperclip-linear" width={20} />
                        //   </Button>
                        // } pour le moement je n'ai pas pas gerer l'upload de fichier.
                        maxRows={4}
                        minRows={1}
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button
                        isIconOnly
                        className="min-w-[40px]"
                        color="primary"
                        onPress={handleSendMessage}
                      >
                        <Icon icon="ci:paper-plane" width={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </>
          ) : (
            <CardBody className="h-full flex items-center justify-center">
              <div className="text-center space-y-2">
                <Icon
                  className="text-default-300"
                  icon="solar:chat-square-code-linear"
                  width={48}
                />
                <p className="text-default-500">
                  Select a ticket to view details
                </p>
              </div>
            </CardBody>
          )}
        </Card>
      </div>

      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        size="2xl"
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Support Ticket
              </ModalHeader>
              <ModalBody className="text-white">
                <Input
                  label="Title"
                  placeholder="Brief description of your issue"
                  value={newTicket.title || ""}
                  onChange={(e) =>
                    setNewTicket((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <Select
                  label="Category"
                  placeholder="Select issue category"
                  selectedKeys={newTicket.category ? [newTicket.category] : []}
                  onChange={(e) =>
                    setNewTicket((prev) => ({
                      ...prev,
                      category: e.target.value as TicketCategory,
                    }))
                  }
                >
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Priority"
                  placeholder="Select priority level"
                  selectedKeys={newTicket.priority ? [newTicket.priority] : []}
                  onChange={(e) =>
                    setNewTicket((prev) => ({
                      ...prev,
                      priority: e.target.value as TicketPriority,
                    }))
                  }
                >
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </Select>
                <Textarea
                  label="Description"
                  minRows={4}
                  placeholder="Detailed description of your issue..."
                  value={newTicket.description || ""}
                  onChange={(e) =>
                    setNewTicket((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleNewTicket}>
                  Create Ticket
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
