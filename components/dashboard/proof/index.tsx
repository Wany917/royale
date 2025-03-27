"use client";

import React from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button,
  Tabs, 
  Tab,
  Chip,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ScrollShadow
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { proofVideos, proofCategories, type ProofVideo } from "@/mock/_proof-videos";



export default function ProofPage() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedVideo, setSelectedVideo] = React.useState<ProofVideo | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const filteredVideos = React.useMemo(() => {
    if (selectedCategory === "all") return proofVideos;
    return proofVideos.filter(video => video.category.toLowerCase() === selectedCategory);
  }, [selectedCategory]);

  const handleVideoClick = (video: ProofVideo) => {
    setSelectedVideo(video);
    onOpen();
  };

  const formatViews = (views: number) => {
    return new Intl.NumberFormat('en', { notation: 'compact' }).format(views);
  };

  const getCategoryColor = (category: ProofVideo["category"]) => {
    switch (category) {
      case "Layer7": return "warning";
      case "Layer4": return "danger";
      case "API": return "primary";
      case "Tools": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <Card className="bg-default-50">
        <CardHeader className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Proof & Tutorials</h1>
            <p className="text-small text-default-500">Real-world demonstrations and guides</p>
          </div>
          <div className="flex gap-2">
            <Button
              color="primary"
              startContent={<Icon icon="solar:time-linear" width={20} />}
            >
              Latest
            </Button>
          </div>
        </CardHeader>
        <CardBody>
        <Tabs
        aria-label="Video categories"
        color="primary"
        variant="underlined"
        selectedKey={selectedCategory}
        onSelectionChange={(key) => setSelectedCategory(key.toString())}
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
      >
        {proofCategories.map((tab) => (
          <Tab
            key={tab.key}
            title={
              <div className="flex items-center gap-2">
                <Icon icon={tab.icon} width={20} />
                {tab.label}
              </div>
            }
          />
        ))}
      </Tabs>

          <ScrollShadow className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  isPressable
                  isHoverable
                  onPress={() => handleVideoClick(video)}
                  className="bg-content1/50"
                >
                  <CardBody className="p-0">
                    <div className="relative">
                      <Image
                        removeWrapper
                        alt={video.title}
                        className="z-0 w-full object-cover h-[200px]"
                        src={video.thumbnailUrl}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded-lg">
                        <span className="text-tiny text-white">{video.duration}</span>
                      </div>
                    </div>
                  </CardBody>
                  <CardBody className="px-3 py-2">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={getCategoryColor(video.category)}
                        >
                          {video.category}
                        </Chip>
                      </div>
                      <p className="text-small text-default-500 mt-1 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 text-small text-default-400">
                          <Icon icon="solar:eye-linear" width={16} />
                          {formatViews(video.views)} views
                        </div>
                        <span className="text-small text-default-400">
                          {new Date(video.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </ScrollShadow>
        </CardBody>
      </Card>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedVideo?.title}
              </ModalHeader>
              <ModalBody>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={selectedVideo?.videoUrl.replace('watch?v=', 'embed/')}
                    title={selectedVideo?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold">{selectedVideo?.title}</h3>
                  <p className="text-default-500 mt-2">{selectedVideo?.description}</p>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}