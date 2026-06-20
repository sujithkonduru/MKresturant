import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ChefHat, 
  Bell, 
  Users, 
  Utensils,
  Timer,
  Check,
  X,
  ChefHat as ChefHatIcon,
  ShoppingBag,
  ArrowRight
} from "lucide-react";

interface KitchenOrder {
  id: string;
  tableNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    specialInstructions?: string;
  }>;
  status: "new" | "preparing" | "ready" | "completed";
  createdAt: Date;
  estimatedTime: number;
  customerName?: string;
  orderType?: "dine-in" | "takeaway" | "delivery";
}

const SAMPLE_KITCHEN_ORDERS: KitchenOrder[] = [
  {
    id: "ORD-001",
    tableNumber: "T12",
    items: [
      { name: "Paneer Tikka", quantity: 2, specialInstructions: "Less spicy" },
      { name: "Butter Naan", quantity: 4 },
      { name: "Dal Makhani", quantity: 1 }
    ],
    status: "new",
    createdAt: new Date(),
    estimatedTime: 25,
    customerName: "Rahul Sharma",
    orderType: "dine-in"
  },
  {
    id: "ORD-002",
    tableNumber: "T15",
    items: [
      { name: "Masala Dosa", quantity: 2 },
      { name: "Sambar", quantity: 2 }
    ],
    status: "preparing",
    createdAt: new Date(Date.now() - 10 * 60000),
    estimatedTime: 15,
    customerName: "Priya Patel",
    orderType: "dine-in"
  },
  {
    id: "ORD-003",
    tableNumber: "T8",
    items: [
      { name: "Paneer Butter Masala", quantity: 1, specialInstructions: "No onion" },
      { name: "Garlic Naan", quantity: 2 },
      { name: "Gulab Jamun", quantity: 2 }
    ],
    status: "ready",
    createdAt: new Date(Date.now() - 20 * 60000),
    estimatedTime: 0,
    customerName: "Amit Singh",
    orderType: "takeaway"
  }
];

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<KitchenOrder[]>(SAMPLE_KITCHEN_ORDERS);
  const [filter, setFilter] = useState<"all" | "new" | "preparing" | "ready">("all");
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-500/10 text-red-600 border-red-200";
      case "preparing":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
      case "ready":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "completed":
        return "bg-gray-500/10 text-gray-600 border-gray-200";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="w-4 h-4" />;
      case "preparing":
        return <Clock className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Check className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new": return "New Order";
      case "preparing": return "Preparing";
      case "ready": return "Ready";
      case "completed": return "Completed";
      default: return status;
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "new": return 25;
      case "preparing": return 50;
      case "ready": return 75;
      case "completed": return 100;
      default: return 0;
    }
  };

  const getOrderTypeIcon = (type?: string) => {
    switch (type) {
      case "dine-in": return <Users className="w-4 h-4" />;
      case "takeaway": return <ShoppingBag className="w-4 h-4" />;
      case "delivery": return <ChefHatIcon className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: "preparing" | "ready" | "completed") => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setNotification(`${order.id} ${getStatusLabel(newStatus)}!`);
      setTimeout(() => setNotification(null), 3000);
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stats = [
    {
      label: "New Orders",
      value: orders.filter(o => o.status === "new").length,
      color: "text-red-600",
      bg: "bg-red-50",
      icon: AlertCircle,
    },
    {
      label: "Preparing",
      value: orders.filter(o => o.status === "preparing").length,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      icon: Clock,
    },
    {
      label: "Ready",
      value: orders.filter(o => o.status === "ready").length,
      color: "text-green-600",
      bg: "bg-green-50",
      icon: CheckCircle,
    },
    {
      label: "Total Orders",
      value: orders.length,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: Utensils,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-green-200 p-4 flex items-center gap-3"
            >
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="font-medium">{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-3 bg-accent/10 rounded-2xl"
              >
                <ChefHat className="w-8 h-8 text-accent" />
              </motion.div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Kitchen Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage incoming orders and kitchen operations</p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border"
            >
              <Bell className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">
                {orders.filter(o => o.status === "new").length} new orders
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-2 mb-8 flex-wrap"
        >
          {(["all", "new", "preparing", "ready"] as const).map((status) => (
            <motion.div key={status} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status)}
                className={`capitalize ${
                  filter === status 
                    ? "bg-accent hover:bg-accent/90"
                    : "hover:bg-accent/10"
                }`}
              >
                {status === "all" ? "All Orders" : status}
                {status !== "all" && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 ${
                      filter === status ? "bg-white/20 text-white" : ""
                    }`}
                  >
                    {orders.filter(o => o.status === status).length}
                  </Badge>
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Orders Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                className="cursor-pointer"
              >
                <Card className={`overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 ${
                  order.status === "new" ? "border-l-4 border-l-red-500" :
                  order.status === "preparing" ? "border-l-4 border-l-yellow-500" :
                  order.status === "ready" ? "border-l-4 border-l-green-500" :
                  "border-l-4 border-l-gray-300 opacity-60"
                }`}>
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getStatusProgress(order.status)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${
                        order.status === "new" ? "bg-red-500" :
                        order.status === "preparing" ? "bg-yellow-500" :
                        order.status === "ready" ? "bg-green-500" :
                        "bg-gray-400"
                      }`}
                    />
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-2xl font-bold">{order.id}</CardTitle>
                          <Badge className={`${getStatusColor(order.status)} border`}>
                            <span className="flex items-center gap-1.5">
                              {getStatusIcon(order.status)}
                              {getStatusLabel(order.status)}
                            </span>
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>Table {order.tableNumber}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="flex items-center gap-1">
                            {getOrderTypeIcon(order.orderType)}
                            {order.orderType || "Dine-in"}
                          </span>
                          {order.customerName && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span>{order.customerName}</span>
                            </>
                          )}
                        </CardDescription>
                      </div>
                      {order.status !== "completed" && (
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            transition: { duration: 2, repeat: Infinity }
                          }}
                          className={`w-3 h-3 rounded-full ${
                            order.status === "new" ? "bg-red-500" :
                            order.status === "preparing" ? "bg-yellow-500" :
                            order.status === "ready" ? "bg-green-500" :
                            "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Utensils className="w-4 h-4" />
                        Items
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-secondary/50 p-3 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{item.name}</span>
                              <Badge variant="outline" className="ml-2">
                                x{item.quantity}
                              </Badge>
                            </div>
                            {item.specialInstructions && (
                              <div className="flex items-center gap-1 mt-1 text-xs text-accent">
                                <span>📝</span>
                                <span className="italic">{item.specialInstructions}</span>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Time Info */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {order.status === "ready"
                            ? "Ready for pickup"
                            : order.status === "completed"
                            ? "Completed"
                            : `Est. ${order.estimatedTime} mins`}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Timer className="w-3 h-3" />
                        <span>
                          {new Date(order.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {order.status !== "completed" && (
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {order.status === "new" && (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="col-span-2"
                          >
                            <Button
                              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm hover:shadow"
                              onClick={() => updateOrderStatus(order.id, "preparing")}
                            >
                              <ChefHatIcon className="w-4 h-4 mr-2" />
                              Start Cooking
                            </Button>
                          </motion.div>
                        )}
                        {order.status === "preparing" && (
                          <>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                className="w-full bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow"
                                onClick={() => updateOrderStatus(order.id, "ready")}
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Mark Ready
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => updateOrderStatus(order.id, "completed")}
                              >
                                Complete
                              </Button>
                            </motion.div>
                          </>
                        )}
                        {order.status === "ready" && (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="col-span-2"
                          >
                            <Button
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow"
                              onClick={() => updateOrderStatus(order.id, "completed")}
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Complete Order
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {order.status === "completed" && (
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Order Completed</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2">No orders in this status</h3>
              <p className="text-muted-foreground">
                All orders are being processed or completed. Check back later!
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setFilter("all")}
              >
                View All Orders
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}