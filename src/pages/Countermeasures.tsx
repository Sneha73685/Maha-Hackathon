
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ShieldAlert, 
  ShieldOff, 
  Radar, 
  AlertTriangle, 
  PlayCircle, 
  PauseCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useMongoDb } from "@/context/MongoDBContext";
import { CountermeasureData, getCollection } from "@/lib/mongodb";

const initialCountermeasureTypes = [
  {
    id: 1,
    name: "Drone Jamming",
    description: "Electromagnetic interference to disable unauthorized drones",
    status: "active",
    icon: ShieldOff
  },
  {
    id: 2,
    name: "Geofencing",
    description: "Create virtual boundaries to prevent drone entry",
    status: "inactive",
    icon: Radar
  },
  {
    id: 3,
    name: "Aerial Interception",
    description: "Deploy counter-drone systems to neutralize threats",
    status: "standby",
    icon: AlertTriangle
  }
];

const Countermeasures: React.FC = () => {
  const [activeMeasures, setActiveMeasures] = useState<CountermeasureData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected, error } = useMongoDb();

  // Load countermeasures from database
  useEffect(() => {
    const loadCountermeasures = async () => {
      if (!isConnected) {
        // If not connected to MongoDB, use initial data
        setActiveMeasures(
          initialCountermeasureTypes.map(measure => ({
            ...measure,
            isActive: measure.status === "active"
          }))
        );
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const collection = await getCollection<CountermeasureData>("countermeasures");
        
        // Check if there are any countermeasures in the collection
        const count = await collection.countDocuments();
        
        if (count === 0) {
          // If no countermeasures in DB, initialize with default data
          const defaultData = initialCountermeasureTypes.map(measure => ({
            ...measure,
            isActive: measure.status === "active"
          }));
          
          // Insert default data
          await collection.insertMany(defaultData);
          setActiveMeasures(defaultData);
        } else {
          // Fetch existing countermeasures
          const measures = await collection.find().toArray();
          setActiveMeasures(measures);
        }
      } catch (err) {
        console.error("Error loading countermeasures:", err);
        toast.error("Failed to load countermeasures", {
          description: "Using fallback data instead"
        });
        
        // Fallback to initial data
        setActiveMeasures(
          initialCountermeasureTypes.map(measure => ({
            ...measure,
            isActive: measure.status === "active"
          }))
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCountermeasures();
  }, [isConnected]);

  const toggleCountermeasure = async (id: number) => {
    // Update state immediately for UI responsiveness
    const updatedMeasures = activeMeasures.map(measure => 
      measure.id === id 
        ? { ...measure, isActive: !measure.isActive, lastActivated: new Date() } 
        : measure
    );
    
    setActiveMeasures(updatedMeasures);
    
    const toggledMeasure = updatedMeasures.find(m => m.id === id);
    toast.info(`${toggledMeasure?.name} ${toggledMeasure?.isActive ? 'Activated' : 'Deactivated'}`, {
      description: `Countermeasure set to ${toggledMeasure?.isActive ? 'active' : 'inactive'} state`
    });

    // Update in database if connected
    if (isConnected && toggledMeasure) {
      try {
        const collection = await getCollection<CountermeasureData>("countermeasures");
        await collection.updateOne(
          { id: id },
          { $set: { isActive: toggledMeasure.isActive, lastActivated: new Date() } }
        );
      } catch (err) {
        console.error("Error updating countermeasure:", err);
        toast.error("Failed to update in database", {
          description: "Changes may not persist after refresh"
        });
      }
    }
  };

  const activateAllCountermeasures = async () => {
    const allActivated = activeMeasures.map(measure => ({
      ...measure, 
      isActive: true,
      lastActivated: new Date()
    }));
    
    setActiveMeasures(allActivated);
    
    toast.success("All Countermeasures Activated", {
      description: "Comprehensive drone defense system engaged"
    });

    // Update in database if connected
    if (isConnected) {
      try {
        const collection = await getCollection<CountermeasureData>("countermeasures");
        const bulkOps = allActivated.map(measure => ({
          updateOne: {
            filter: { id: measure.id },
            update: { $set: { isActive: true, lastActivated: new Date() } }
          }
        }));
        
        await collection.bulkWrite(bulkOps);
      } catch (err) {
        console.error("Error activating all countermeasures:", err);
        toast.error("Failed to update all in database", {
          description: "Changes may not persist after refresh"
        });
      }
    }
  };

  const deactivateAllCountermeasures = async () => {
    const allDeactivated = activeMeasures.map(measure => ({
      ...measure, 
      isActive: false
    }));
    
    setActiveMeasures(allDeactivated);
    
    toast.warning("All Countermeasures Deactivated", {
      description: "Drone defense system disengaged"
    });

    // Update in database if connected
    if (isConnected) {
      try {
        const collection = await getCollection<CountermeasureData>("countermeasures");
        const bulkOps = allDeactivated.map(measure => ({
          updateOne: {
            filter: { id: measure.id },
            update: { $set: { isActive: false } }
          }
        }));
        
        await collection.bulkWrite(bulkOps);
      } catch (err) {
        console.error("Error deactivating all countermeasures:", err);
        toast.error("Failed to update all in database", {
          description: "Changes may not persist after refresh"
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar activePage="countermeasures" />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-dome-dark flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 text-dome-purple animate-spin" />
              <p className="text-dome-purple">Loading countermeasures...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Database Connection Error", {
      description: "Using fallback data instead"
    });
  }

  return (
    <div className="flex h-screen">
      <Sidebar activePage="countermeasures" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-dome-dark overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-dome-purple" /> 
              Countermeasures
            </h1>
            
            <div className="space-x-2">
              {!isConnected && (
                <div className="px-3 py-1 bg-yellow-800/30 text-yellow-400 text-xs rounded-md inline-flex items-center mr-2">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Using Local Data
                </div>
              )}
              
              <Button 
                variant="default" 
                onClick={activateAllCountermeasures}
                className="bg-dome-green hover:bg-dome-green/80"
              >
                <PlayCircle className="mr-2" /> Activate All
              </Button>
              <Button 
                variant="destructive" 
                onClick={deactivateAllCountermeasures}
                className="bg-dome-red hover:bg-dome-red/80"
              >
                <PauseCircle className="mr-2" /> Deactivate All
              </Button>
            </div>
          </div>
          
          <Separator className="mb-6 bg-dome-purple/20" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeMeasures.map((measure) => {
              // Determine which icon to use based on the measure id
              const Icon = initialCountermeasureTypes.find(m => m.id === measure.id)?.icon || ShieldAlert;
              
              return (
                <Card 
                  key={measure.id} 
                  className={`
                    bg-dome-darker border-dome-purple/20 
                    ${measure.isActive ? 'border-dome-green/50' : 'border-dome-red/30'}
                  `}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Icon 
                        className={`
                          h-5 w-5 
                          ${measure.isActive ? 'text-dome-green' : 'text-dome-red'}
                        `} 
                      />
                      {measure.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground mb-2">
                      {measure.description}
                    </div>
                    {measure.lastActivated && (
                      <div className="text-xs text-muted-foreground mb-2">
                        Last updated: {new Date(measure.lastActivated).toLocaleString()}
                      </div>
                    )}
                    <Button 
                      onClick={() => toggleCountermeasure(measure.id)}
                      variant={measure.isActive ? "destructive" : "default"}
                      size="sm"
                      className="w-full"
                    >
                      {measure.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Countermeasures;
