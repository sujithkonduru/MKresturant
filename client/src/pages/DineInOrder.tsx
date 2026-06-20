import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, X, Send, AlertCircle } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Paneer Tikka", category: "starters", price: 280, description: "Grilled paneer cubes" },
  { id: 2, name: "Masala Dosa", category: "breakfast", price: 120, description: "Crispy dosa with filling" },
  { id: 3, name: "Dal Makhani", category: "north_indian", price: 320, description: "Creamy lentil curry" },
  { id: 4, name: "Paneer Butter Masala", category: "north_indian", price: 380, description: "Rich tomato curry" },
  { id: 5, name: "Butter Naan", category: "breads", price: 80, description: "Soft buttered bread" },
  { id: 6, name: "Gulab Jamun", category: "desserts", price: 150, description: "Sweet milk balls" },
];

const SPECIAL_INSTRUCTIONS = [
  "Less spicy",
  "No onion",
  "Extra cheese",
  "Jain food",
  "No garlic",
  "Extra butter"
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "breakfast", label: "Breakfast" },
  { id: "starters", label: "Starters" },
  { id: "north_indian", label: "North Indian" },
  { id: "breads", label: "Breads" },
  { id: "desserts", label: "Desserts" }
];

export default function DineInOrder() {
  const [tableNumber, setTableNumber] = useState("T12");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [specialInstructions, setSpecialInstructions] = useState<string[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const filteredMenu = selectedCategory === "all"
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(ci => ci.id === item.id);
    if (existingItem) {
      setCart(cart.map(ci =>
        ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
      ));
    } else {
      setCart([...cart, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const toggleSpecialInstruction = (instruction: string) => {
    setSpecialInstructions(prev =>
      prev.includes(instruction)
        ? prev.filter(i => i !== instruction)
        : [...prev, instruction]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = cartTotal * 0.05;
  const finalTotal = cartTotal + tax;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Please add items to your order");
      return;
    }
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setCart([]);
      setSpecialInstructions([]);
      setCustomerName("");
    }, 3000);
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

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4"
      >
        <Card className="max-w-md w-full border-2 border-green-500">
          <CardContent className="pt-12 pb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h2>
            <p className="text-muted-foreground mb-4">
              Your order has been sent to the kitchen. Our staff will serve you shortly.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-sm font-semibold">Order ID: ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p className="text-sm text-muted-foreground">Table: {tableNumber}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-2">Dine-in Ordering</h1>
          <Badge className="bg-accent text-white text-lg py-2 px-4">
            Table {tableNumber}
          </Badge>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Customer Name */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>

              {/* Menu */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Dishes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Category Tabs */}
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                      {CATEGORIES.map(cat => (
                        <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                          {cat.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {CATEGORIES.map(cat => (
                      <TabsContent key={cat.id} value={cat.id}>
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid md:grid-cols-2 gap-4 mt-4"
                        >
                          {filteredMenu.map(item => (
                            <motion.div key={item.id} variants={itemVariants}>
                              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <span className="text-accent font-bold">₹{item.price}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {item.description}
                                  </p>
                                  <Button
                                    size="sm"
                                    className="w-full bg-accent hover:bg-accent/90 text-white"
                                    onClick={() => addToCart(item)}
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add to Order
                                  </Button>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </motion.div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>

              {/* Special Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                  <CardDescription>Select any dietary preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {SPECIAL_INSTRUCTIONS.map(instruction => (
                      <Badge
                        key={instruction}
                        variant={specialInstructions.includes(instruction) ? "default" : "outline"}
                        className="cursor-pointer py-2 px-3 justify-center"
                        onClick={() => toggleSpecialInstruction(instruction)}
                      >
                        {instruction}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Cart Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Order
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No items added yet</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.id} className="bg-secondary p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-accent font-bold">₹{item.price}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-background rounded"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-background rounded"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (5%)</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span className="text-accent">₹{finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-white py-6 font-semibold"
                      onClick={handlePlaceOrder}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Place Order
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Import CheckCircle from lucide-react
import { CheckCircle } from "lucide-react";
