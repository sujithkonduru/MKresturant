import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { 
  ChefHat, 
  Users, 
  Settings, 
  QrCode, 
  LogOut, 
  Home, 
  Star, 
  Utensils,
  Bell,
  Clock,
  TrendingUp,
  ArrowRight
} from "lucide-react";

export default function DashboardAccess() {
  const [, setLocation] = useLocation();

  const dashboards = [
    {
      id: "kitchen",
      title: "Kitchen Dashboard",
      description: "Manage incoming orders and kitchen operations in real-time",
      icon: ChefHat,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      path: "/kitchen",
      stats: "12 orders pending"
    },
    {
      id: "waiter",
      title: "Waiter Dashboard",
      description: "Manage tables, serve customers, and coordinate with kitchen",
      icon: Users,
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      path: "/waiter",
      stats: "8 active tables"
    },
    {
      id: "admin",
      title: "Admin Dashboard",
      description: "Complete control over menu, staff, analytics, and operations",
      icon: Settings,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      path: "/admin",
      stats: "45 menu items"
    },
    {
      id: "dine-in",
      title: "Dine-in Ordering",
      description: "QR code ordering system for tables with contactless dining",
      icon: QrCode,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      iconColor: "text-indigo-600",
      path: "/dine-in",
      stats: "15 active QR codes"
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Animated Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 relative"
        >
          <div className="inline-flex items-center gap-3 bg-accent/10 px-6 py-2 rounded-full mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Utensils className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm font-medium text-accent">Staff & Operations Portal</span>
          </div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Murali Krishna
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-2 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Premium Vegetarian Fine Dining
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Open 11:00 AM - 11:00 PM</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>4.8 ★ (2.3k reviews)</span>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-accent/80 to-accent border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">+12 staff online</span>
          </motion.div>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {dashboards.map((dashboard) => {
            const Icon = dashboard.icon;
            return (
              <motion.div 
                key={dashboard.id} 
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className={`h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden border ${dashboard.borderColor}`}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${dashboard.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${dashboard.bgColor} group-hover:bg-white/20 transition-colors duration-300`}>
                        <motion.div
                          animate={dashboard.id === "kitchen" ? floatingIconVariants.animate : {}}
                        >
                          <Icon className={`w-8 h-8 ${dashboard.iconColor} group-hover:text-white transition-colors duration-300`} />
                        </motion.div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-muted-foreground bg-white/80 px-3 py-1 rounded-full">
                          {dashboard.stats}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                      {dashboard.title}
                    </h3>
                    
                    <p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300 mb-6">
                      {dashboard.description}
                    </p>

                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-white group-hover:bg-white group-hover:text-accent transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => setLocation(dashboard.path)}
                    >
                      <span>Access Dashboard</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Orders Today", value: "48", icon: TrendingUp, color: "text-emerald-600" },
            { label: "Active Tables", value: "15", icon: Users, color: "text-blue-600" },
            { label: "Staff Online", value: "12", icon: Users, color: "text-purple-600" },
            { label: "Pending Items", value: "8", icon: Bell, color: "text-orange-600" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="outline"
            className="px-8 hover:bg-accent hover:text-white transition-all duration-300 group"
            onClick={() => setLocation("/")}
          >
            <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            className="px-8 hover:bg-red-600 hover:text-white transition-all duration-300 group border-red-200 hover:border-red-600"
            onClick={() => {
              localStorage.removeItem('authToken');
              setLocation("/login");
            }}
          >
            <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Logout
          </Button>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Kitchen Operations",
              description: "View incoming orders, manage preparation, and track order status in real-time.",
              icon: ChefHat,
              color: "text-orange-600"
            },
            {
              title: "Waiter Management",
              description: "Manage table assignments, take orders, and coordinate with kitchen for smooth service.",
              icon: Users,
              color: "text-blue-600"
            },
            {
              title: "Admin Control",
              description: "Manage menu, staff, analytics, and restaurant operations from a centralized dashboard.",
              icon: Settings,
              color: "text-green-600"
            }
          ].map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <info.icon className={`w-5 h-5 ${info.color}`} />
                <h3 className="font-semibold">{info.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{info.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 text-center text-sm text-muted-foreground border-t border-gray-200 pt-8"
        >
          <p>© 2024 Murali Krishna Restaurant. All rights reserved.</p>
          <p className="text-xs mt-1">Version 2.0.1 • Premium Vegetarian Fine Dining</p>
        </motion.div>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}