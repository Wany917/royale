import { useEffect } from "react";
import { useRouter } from "next/router";
import { Card, CardBody, CardFooter, CardFooterProps, Button, Spinner } from "@heroui/react";
import { useServicesStore } from '@/stores/use-services';
import { ServiceType, Service } from '@/types/services';


export default function ServicesOverview() {
    const router = useRouter();
    const { services, isLoading, error, fetchServices } = useServicesStore();
  
    useEffect(() => {
      fetchServices();
    }, [fetchServices]);
  
    const handleServiceClick = (service: Service) => {
      switch (service.type) {
        case ServiceType.STRESSER:
          router.push('/dashboard/attack');
          break;
        case ServiceType.API:
          router.push('/dashboard/api-manager');
          break;
        case ServiceType.SRC:
          // Reste sur la même page mais affiche les détails
          useServicesStore.getState().setActiveService(service);
          break;
        case ServiceType.C2:
          // Affiche un modal de connexion
          // À implémenter
          break;
      }
    };
  
    if (isLoading) return <Spinner />;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardBody>
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <div className="flex flex-col gap-2">
                <p>Status: {service.status}</p>
                <p>Expires: {new Date(service.expiryDate).toLocaleDateString()}</p>
                
                {/* Informations spécifiques selon le type de service */}
                {service.type === ServiceType.SRC && (
                  <p>License ID: {service.licenseId}</p>
                )}
                {service.type === ServiceType.API && (
                  <p>Remaining Requests: {service.planDetails.remainingRequests}</p>
                )}
                
                <Button
                  color="primary"
                  onPress={() => handleServiceClick(service)}
                >
                  {service.type === ServiceType.STRESSER ? 'Launch Attack Dashboard' :
                   service.type === ServiceType.API ? 'Open API Manager' :
                   service.type === ServiceType.SRC ? 'View Details' :
                   'Connect'}
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
};