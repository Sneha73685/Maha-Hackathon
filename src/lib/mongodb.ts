
import { MongoClient, Db, Collection } from 'mongodb';

// Database models/schemas
export interface CountermeasureData {
  id: number;
  name: string;
  description: string;
  status: string;
  isActive: boolean;
  lastActivated?: Date;
}

export interface AlertData {
  id: number;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  resolved: boolean;
}

export interface DetectionData {
  id: number;
  droneType: string;
  location: { lat: number; lng: number };
  timestamp: Date;
  signalStrength: number;
  status: 'tracking' | 'lost' | 'neutralized';
}

// Since MongoDB's Node.js driver doesn't work in browsers, we'll create a mock implementation
// that simulates the MongoDB functionality for demo purposes

// Mock in-memory collections
const mockCollections: Record<string, any[]> = {
  countermeasures: [
    {
      id: 1,
      name: "Drone Jamming",
      description: "Electromagnetic interference to disable unauthorized drones",
      status: "active",
      isActive: true,
      lastActivated: new Date()
    },
    {
      id: 2,
      name: "Geofencing",
      description: "Create virtual boundaries to prevent drone entry",
      status: "inactive",
      isActive: false
    },
    {
      id: 3,
      name: "Aerial Interception",
      description: "Deploy counter-drone systems to neutralize threats",
      status: "standby",
      isActive: false
    }
  ],
  alerts: [],
  detections: []
};

// Mock Collection class with more flexible type handling
class MockCollection<T extends Record<string, any>> {
  private data: T[];
  private collectionName: string;

  constructor(collectionName: string, initialData: T[] = []) {
    this.collectionName = collectionName;
    this.data = initialData;
  }

  async find(query: Partial<T> = {}): Promise<{ toArray(): Promise<T[]> }> {
    // Simplified query filtering
    const filteredData = this.data.filter(item => 
      Object.entries(query).every(([key, value]) => item[key as keyof T] === value)
    );

    return {
      toArray: async () => filteredData
    };
  }

  async insertMany(docs: T[]): Promise<{ insertedCount: number }> {
    this.data.push(...docs);
    mockCollections[this.collectionName] = this.data;
    return { insertedCount: docs.length };
  }

  async insertOne(doc: T): Promise<{ insertedId: string }> {
    this.data.push(doc);
    mockCollections[this.collectionName] = this.data;
    return { insertedId: 'mock-id' };
  }

  async updateOne(filter: Partial<T>, update: { $set: Partial<T> }): Promise<{ modifiedCount: number }> {
    const index = this.data.findIndex(item => 
      Object.entries(filter).every(([key, value]) => item[key as keyof T] === value)
    );

    if (index !== -1 && update.$set) {
      this.data[index] = { ...this.data[index], ...update.$set };
      mockCollections[this.collectionName] = this.data;
      return { modifiedCount: 1 };
    }

    return { modifiedCount: 0 };
  }

  async bulkWrite(operations: any[]): Promise<{ modifiedCount: number }> {
    let modifiedCount = 0;

    for (const op of operations) {
      if (op.updateOne) {
        const { filter, update } = op.updateOne;
        const result = await this.updateOne(filter, update);
        modifiedCount += result.modifiedCount;
      }
    }

    return { modifiedCount };
  }

  async countDocuments(): Promise<number> {
    return this.data.length;
  }
}

// Mock DB class
class MockDb {
  collection<T extends Record<string, any>>(name: string): MockCollection<T> {
    return new MockCollection<T>(name, mockCollections[name] || []);
  }
}

// Mock client
class MockMongoClient {
  db(name: string): MockDb {
    console.log(`Using mock MongoDB client with database: ${name}`);
    return new MockDb();
  }

  async connect(): Promise<void> {
    console.log('Mock MongoDB client connected');
    return Promise.resolve();
  }

  async close(): Promise<void> {
    console.log('Mock MongoDB client closed');
    return Promise.resolve();
  }
}

// Mocked client and db instances
const mockClient = new MockMongoClient();
const mockDb = mockClient.db('domewatch');

// Export the mock implementation with the same interface as the original
export async function connectToDatabase(): Promise<{ client: any, db: any }> {
  try {
    // Log that we're using a mock implementation
    console.log('Using mock MongoDB implementation for browser environment');
    
    // Simulate connection
    await mockClient.connect();
    
    return { client: mockClient, db: mockDb };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Helper to get collections (using the mock implementation)
export function getCollection<T extends Record<string, any>>(collectionName: string): Promise<any> {
  console.log(`Getting mock collection: ${collectionName}`);
  return Promise.resolve(mockDb.collection<T>(collectionName));
}
