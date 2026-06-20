import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import DashboardAccess from "@/pages/DashboardAccess";
import KitchenDashboard from "@/pages/KitchenDashboard";
import WaiterDashboard from "@/pages/WaiterDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import DineInOrder from "@/pages/DineInOrder";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboards"} component={DashboardAccess} />
      <Route path={"/kitchen"} component={KitchenDashboard} />
      <Route path={"/waiter"} component={WaiterDashboard} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/dine-in"} component={DineInOrder} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
