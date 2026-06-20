import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, CheckCircle, AlertCircle, Utensils } from "lucide-react";

interface TableOrder {
  id: string;
  tableNumber: string;
  capacity: number;
  status: "empty" | "waiting" | "ordering" | "food_ready" | "served" | "completed";
  guests: number;
  orderTime?: Date;
  items?: string[];
}

const SAMPLE_TABLES: TableOrder[] = [
  {
    id: "1",
    tableNumber: "T1",
    capacity: 2,
    status: "empty",
    guests: 0
  },
  {
    id: "2",
    tableNumber: "T2",
    capacity: 4,
    status: "waiting",
    guests: 3,
    orderTime: new Date(Date.now() - 5 * 60000)
  },
  {
    id: "3",
    tableNumber: "T3",
    capacity: 4,
    status: "ordering",
    guests: 2,
    items: ["Paneer Tikka x2", "Naan x4"]
  },
  {
    id: "4",
    tableNumber: "T4",
    capacity: 6,
    status: "food_ready",
    guests: 4,
    items: ["Dal Makhani x1", "Paneer Butter Masala x1", "Rice x2"]
  },
  {
    id: "5",
    tableNumber: "T5",
    capacity: 2,
    status: "served",
    guests: 2,
    items: ["Masala Dosa x2"]
  }
];

export default function WaiterDashboard() {
  const [tables, setTables] = useState<TableOrder[]>(SAMPLE_TABLES);
  const [selectedTable, setSelectedTable] = useState<TableOrder | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "empty":
        return "bg-gray-100 text-gray-800";
      case "waiting":
        return "bg-blue-100 text-blue-800";
      case "ordering":
        return "bg-purple-100 text-purple-800";
      case "food_ready":
        return "bg-green-100 text-green-800";
      case "served":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "empty":
        return "Empty";
      case "waiting":
        return "Waiting Order";
      case "ordering":
        return "Ordering";
      case "food_ready":
        return "Food Ready";
      case "served":
        return "Served";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "empty":
        return <AlertCircle className="w-5 h-5" />;
      case "waiting":
        return <Clock className="w-5 h-5" />;
      case "ordering":
        return <Utensils className="w-5 h-5" />;
      case "food_ready":
        return <CheckCircle className="w-5 h-5" />;
      case "served":
        return <Users className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const updateTableStatus = (tableId: string, newStatus: TableOrder["status"]) => {
    setTables(tables.map(table =>
      table.id === tableId ? { ...table, status: newStatus } : table
    ));
    setSelectedTable(null);
  };

  const getNextActions = (status: TableOrder["status"]) => {
    switch (status) {
      case "empty":
        return ["waiting"];
      case "waiting":
        return ["ordering"];
      case "ordering":
        return ["food_ready"];
      case "food_ready":
        return ["served"];
      case "served":
        return ["completed"];
      default:
        return [];
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const stats = {
    empty: tables.filter(t => t.status === "empty").length,
    occupied: tables.filter(t => ["waiting", "ordering", "food_ready", "served"].includes(t.status)).length,
    ready: tables.filter(t => t.status === "food_ready").length
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Utensils className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold">Waiter Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage tables and serve customers</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-600">{stats.empty}</div>
                  <p className="text-sm text-muted-foreground mt-2">Empty Tables</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stats.occupied}</div>
                  <p className="text-sm text-muted-foreground mt-2">Occupied</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{stats.ready}</div>
                  <p className="text-sm text-muted-foreground mt-2">Food Ready</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tables Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {tables.map((table) => (
            <motion.div key={table.id} variants={itemVariants}>
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTable?.id === table.id ? "ring-2 ring-accent" : ""
                }`}
                onClick={() => setSelectedTable(table)}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{table.tableNumber}</h3>
                    <Badge className={getStatusColor(table.status)}>
                      <span className="flex items-center gap-1 text-xs">
                        {getStatusIcon(table.status)}
                        {getStatusLabel(table.status)}
                      </span>
                    </Badge>
                    <div className="mt-3 text-sm text-muted-foreground">
                      <p>{table.guests}/{table.capacity} guests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Table Details */}
        {selectedTable && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>Table {selectedTable.tableNumber} - Details</CardTitle>
                <CardDescription>
                  {selectedTable.guests} guests • Capacity: {selectedTable.capacity}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Current Status */}
                <div>
                  <h4 className="font-semibold mb-2">Current Status</h4>
                  <Badge className={`${getStatusColor(selectedTable.status)} text-base py-2 px-4`}>
                    <span className="flex items-center gap-2">
                      {getStatusIcon(selectedTable.status)}
                      {getStatusLabel(selectedTable.status)}
                    </span>
                  </Badge>
                </div>

                {/* Order Items */}
                {selectedTable.items && selectedTable.items.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {selectedTable.items.map((item, idx) => (
                        <div key={idx} className="bg-secondary p-3 rounded text-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order Time */}
                {selectedTable.orderTime && (
                  <div>
                    <h4 className="font-semibold mb-2">Order Time</h4>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor((Date.now() - selectedTable.orderTime.getTime()) / 60000)} minutes ago
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {getNextActions(selectedTable.status).map((nextStatus) => (
                      <Button
                        key={nextStatus}
                        className="bg-accent hover:bg-accent/90 text-white"
                        onClick={() => updateTableStatus(selectedTable.id, nextStatus as TableOrder["status"])}
                      >
                        {nextStatus === "waiting" && "Seat Guests"}
                        {nextStatus === "ordering" && "Take Order"}
                        {nextStatus === "food_ready" && "Deliver Food"}
                        {nextStatus === "served" && "Mark Served"}
                        {nextStatus === "completed" && "Complete"}
                      </Button>
                    ))}
                    {selectedTable.status === "completed" && (
                      <Button
                        variant="outline"
                        onClick={() => updateTableStatus(selectedTable.id, "empty")}
                        className="col-span-2"
                      >
                        Clear Table
                      </Button>
                    )}
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedTable(null)}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
