import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Plus, 
  Edit2, 
  Trash2,
  Settings
} from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  availability: boolean;
}

interface RestaurantTable {
  id: number;
  tableNumber: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
}

interface StaffMember {
  id: number;
  name: string;
  role: "chef" | "waiter" | "manager";
  status: "active" | "inactive";
  assignedTables?: string[];
}

const SAMPLE_MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Paneer Tikka", category: "starters", price: 280, availability: true },
  { id: 2, name: "Dal Makhani", category: "north_indian", price: 320, availability: true },
  { id: 3, name: "Masala Dosa", category: "breakfast", price: 120, availability: true },
  { id: 4, name: "Gulab Jamun", category: "desserts", price: 150, availability: true },
];

const SAMPLE_TABLES: RestaurantTable[] = [
  { id: 1, tableNumber: "T1", capacity: 2, status: "available" },
  { id: 2, tableNumber: "T2", capacity: 4, status: "occupied" },
  { id: 3, tableNumber: "T3", capacity: 6, status: "reserved" },
  { id: 4, tableNumber: "T4", capacity: 4, status: "available" },
  { id: 5, tableNumber: "T5", capacity: 2, status: "occupied" },
];

const SAMPLE_STAFF: StaffMember[] = [
  { id: 1, name: "Rajesh Kumar", role: "chef", status: "active" },
  { id: 2, name: "Priya Singh", role: "waiter", status: "active", assignedTables: ["T1", "T2", "T3"] },
  { id: 3, name: "Amit Patel", role: "waiter", status: "active", assignedTables: ["T4", "T5"] },
  { id: 4, name: "Neha Sharma", role: "manager", status: "active" },
];

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(SAMPLE_MENU_ITEMS);
  const [tables, setTables] = useState<RestaurantTable[]>(SAMPLE_TABLES);
  const [staff, setStaff] = useState<StaffMember[]>(SAMPLE_STAFF);
  const [activeTab, setActiveTab] = useState("overview");
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuPrice, setNewMenuPrice] = useState("");

  const stats = {
    totalOrders: 156,
    revenue: 45230,
    customers: 342,
    averageRating: 4.7,
    occupancy: Math.round((tables.filter(t => t.status === "occupied").length / tables.length) * 100)
  };

  const addMenuItem = () => {
    if (newMenuName && newMenuPrice) {
      const newItem: MenuItem = {
        id: Math.max(...menuItems.map(m => m.id), 0) + 1,
        name: newMenuName,
        category: "starters",
        price: parseFloat(newMenuPrice),
        availability: true
      };
      setMenuItems([...menuItems, newItem]);
      setNewMenuName("");
      setNewMenuPrice("");
    }
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const toggleMenuAvailability = (id: number) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, availability: !item.availability } : item
    ));
  };

  const updateTableStatus = (id: number, newStatus: RestaurantTable["status"]) => {
    setTables(tables.map(table =>
      table.id === id ? { ...table, status: newStatus } : table
    ));
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
            <Settings className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage restaurant operations and analytics</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    <p className="text-xs text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.customers}</p>
                    <p className="text-xs text-muted-foreground">Customers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.averageRating}★</p>
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">{stats.occupancy}%</p>
                    <p className="text-xs text-muted-foreground">Occupancy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: "ORD-001", amount: "₹450", status: "Completed" },
                      { id: "ORD-002", amount: "₹320", status: "Completed" },
                      { id: "ORD-003", amount: "₹680", status: "Preparing" },
                    ].map((order) => (
                      <div key={order.id} className="flex justify-between items-center p-2 bg-secondary rounded">
                        <span className="font-medium">{order.id}</span>
                        <span className="text-accent font-bold">{order.amount}</span>
                        <Badge variant="outline">{order.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Dishes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Paneer Butter Masala", orders: 45 },
                      { name: "Dal Makhani", orders: 38 },
                      { name: "Masala Dosa", orders: 32 },
                    ].map((dish, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-secondary rounded">
                        <span className="font-medium">{dish.name}</span>
                        <Badge className="bg-accent text-white">{dish.orders} orders</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Add New Item */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Menu Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Dish name"
                      value={newMenuName}
                      onChange={(e) => setNewMenuName(e.target.value)}
                    />
                    <Input
                      placeholder="Price"
                      type="number"
                      value={newMenuPrice}
                      onChange={(e) => setNewMenuPrice(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-white"
                    onClick={addMenuItem}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>

              {/* Menu Items List */}
              <div className="grid gap-4">
                {menuItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={item.availability ? "default" : "secondary"}
                            className="cursor-pointer"
                            onClick={() => toggleMenuAvailability(item.id)}
                          >
                            {item.availability ? "Available" : "Unavailable"}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMenuItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {tables.map((table) => (
                <Card key={table.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">{table.tableNumber}</h3>
                      <p className="text-sm text-muted-foreground mb-3">Capacity: {table.capacity}</p>
                      <Badge
                        className={`${
                          table.status === "available"
                            ? "bg-green-100 text-green-800"
                            : table.status === "occupied"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                      </Badge>
                      <div className="mt-3 space-y-2">
                        {table.status !== "available" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={() => updateTableStatus(table.id, "available")}
                          >
                            Mark Available
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4"
            >
              {staff.map((member) => (
                <Card key={member.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">
                          {member.role}
                        </p>
                        {member.assignedTables && (
                          <p className="text-xs text-accent mt-1">
                            Tables: {member.assignedTables.join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={member.status === "active" ? "default" : "secondary"}
                        >
                          {member.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
