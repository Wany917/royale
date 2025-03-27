import { useDisclosure } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface VideoProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title: string;
  description?: string;
}

export const Video = ({ 
  videoUrl = "/api/placeholder/640/360",
  thumbnailUrl = "/api/placeholder/640/360", 
  title,
  description
}: VideoProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Button
        className="bg-default-100 text-default-800 hover:bg-default-200"
        endContent={<Icon icon="lucide:play" width={20} />}
        size="lg"
        radius="full"
        variant="flat"
        onPress={onOpen}
      >
        Voir la démo
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="5xl"
        placement="center"
        classNames={{
          base: "bg-content1",
          header: "border-b-[1px] border-default-200",
          footer: "border-t-[1px] border-default-200",
          closeButton: "hover:bg-default-100 active:bg-default-200",
          body: "p-0"
        }}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  {description && (
                    <p className="text-sm text-default-500 mt-1">
                      {description}
                    </p>
                  )}
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center">
                  <video 
                    className="w-full max-h-[70vh] object-contain"
                    controls
                    src={videoUrl}
                    poster={thumbnailUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center gap-2">
                <Button
                  className="bg-foreground text-background"
                  onPress={onClose}
                  startContent={<Icon icon="lucide:arrow-right" width={16} />}
                >
                  Explorer les plans
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Video;