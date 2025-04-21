
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connectToDatabase } from '@/lib/mongodb';
import { toast } from "sonner";

interface MongoDBContextType {
  client: any;
  db: any;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
  reconnect: () => Promise<void>;
}

const MongoDBContext = createContext<MongoDBContextType>({
  client: null,
  db: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  reconnect: async () => {},
});

export const useMongoDb = () => useContext(MongoDBContext);

export const MongoDBProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<any>(null);
  const [db, setDb] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const connect = async () => {
    if (isConnecting || isConnected) return;
    
    setIsConnecting(true);
    setError(null);
    
    try {
      const { client: connectedClient, db: connectedDb } = await connectToDatabase();
      setClient(connectedClient);
      setDb(connectedDb);
      setIsConnected(true);
      toast.success("Database Connected", {
        description: "Successfully connected to MongoDB (mock for browser)"
      });
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error("Database Connection Failed", {
        description: error.message
      });
      console.error("MongoDB connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Connect on initial mount
  useEffect(() => {
    connect();

    // Cleanup on unmount
    return () => {
      if (client) {
        client.close().catch(console.error);
      }
    };
  }, []);

  const reconnect = async () => {
    setIsConnected(false);
    setClient(null);
    setDb(null);
    await connect();
  };

  return (
    <MongoDBContext.Provider value={{ client, db, isConnected, isConnecting, error, reconnect }}>
      {children}
    </MongoDBContext.Provider>
  );
};
