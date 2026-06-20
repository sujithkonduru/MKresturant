import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight, 
  X, 
  Plus, 
  Minus, 
  Lock,
  Star,
  Utensils,
  Wine,
  Coffee,
  ChefHat,
  Award,
  Shield,
  Truck,
  CreditCard,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  isVegetarian: boolean;
  isPopular?: boolean;
  isNew?: boolean;
}

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663778283739/SE7CbgfPW9YZFR8iB7rsUh/restaurant-hero-veg-spread-4gfJkciwVKKveAq9dy5bpo.webp';
const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663778283739/SE7CbgfPW9YZFR8iB7rsUh/mk-restaurant-logo-nDh5JqfHtC3TgbsDPp6MX4.webp';

const MENU_CATEGORIES = [
  "breakfast",
  "south_indian",
  "north_indian",
  "starters",
  "chinese",
  "snacks",
  "desserts",
  "drinks",
  "beverages"
];

const CATEGORY_LABELS: Record<string, string> = {
  breakfast: "Breakfast",
  south_indian: "South Indian",
  north_indian: "North Indian",
  starters: "Starters",
  chinese: "Chinese",
  snacks: "Snacks",
  desserts: "Desserts",
  drinks: "Drinks",
  beverages: "Beverages"
};

const CATEGORY_ICONS: Record<string, any> = {
  breakfast: Coffee,
  south_indian: Utensils,
  north_indian: ChefHat,
  starters: Wine,
  chinese: Utensils,
  snacks: Coffee,
  desserts: Coffee,
  drinks: Wine,
  beverages: Coffee
};

const SAMPLE_MENU: MenuItem[] = [
  // ─── Breakfast (4 items) ────────────────────────────────────────────
  {
    id: 1,
    name: "Idly",
    category: "breakfast",
    description: "Soft and fluffy steamed rice cakes served with sambar and chutney",
    price: 80,
    image: "https://www.awesomecuisine.com/wp-content/uploads/2018/10/Methi-Idly-Fenugreek-Leaves-Idli.jpg",
    rating: 4.5,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 2,
    name: "Masala Dosa",
    category: "breakfast",
    description: "Crispy golden dosa with spiced potato filling, served with chutney and sambar",
    price: 120,
    image: "https://simpleindianrecipes.com/portals/0/sirimages/Masala-Dosa-M.jpg",
    rating: 4.8,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 3,
    name: "Pongal",
    category: "breakfast",
    description: "Traditional South Indian breakfast made with rice and moong dal, tempered with ghee and black pepper",
    price: 140,
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/05/ven-pongal-recipe.jpg",
    rating: 4.3,
    isVegetarian: true,
    isPopular: false
  },
  {
    id: 4,
    name: "Uttapam",
    category: "breakfast",
    description: "Thick savory pancake with onions, tomatoes, and green chilies",
    price: 160,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrhs-kcsBQ8tBNtWaRMEIHPeyyzT63MxAf2pbtXUim8w&s=10",
    rating: 4.4,
    isVegetarian: true,
    isPopular: false
  },

  // ─── South Indian (3 items) ──────────────────────────────────────────
  {
    id: 5,
    name: "Rava Dosa",
    category: "south_indian",
    description: "Crispy dosa made with semolina, served with coconut chutney and sambar",
    price: 130,
    image: "https://www.vegrecipesofindia.com/wp-content/uploads/2018/09/rava-dosa-recipe-1.jpg",
    rating: 4.6,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 6,
    name: "Vada",
    category: "south_indian",
    description: "Crispy deep-fried lentil donuts served with chutney and sambar",
    price: 100,
    image: "https://somethingiscooking.com/wp-content/uploads/2017/04/Uzhunnu-Vada-3.jpg",
    rating: 4.4,
    isVegetarian: true,
    isPopular: false
  },
  {
    id: 7,
    name: "Puri Bhaji",
    category: "south_indian",
    description: "Deep-fried fluffy puris served with spicy potato curry",
    price: 150,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzv5bFK4pX5fSP2JJ12VjChiEcQN2hlolAQX59vpEbng&s=10",
    rating: 4.2,
    isVegetarian: true,
    isPopular: false
  },

  // ─── North Indian (4 items) ─────────────────────────────────────────
  {
    id: 8,
    name: "Paneer Butter Masala",
    category: "north_indian",
    description: "Soft paneer cubes in rich tomato-based creamy sauce with aromatic spices",
    price: 380,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663778283739/SE7CbgfPW9YZFR8iB7rsUh/dish-dal-makhani-cUfS3tAmDWdDFqmziKo274.webp",
    rating: 4.9,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 9,
    name: "Dal Makhani",
    category: "north_indian",
    description: "Creamy black lentil curry slow-cooked with butter and fresh cream",
    price: 320,
    image: "https://www.funfoodfrolic.com/wp-content/uploads/2023/04/Dal-Makhani-Blog-500x500.jpg",
    rating: 4.6,
    isVegetarian: true,
    isPopular: false
  },
  {
    id: 10,
    name: "Shahi Paneer",
    category: "north_indian",
    description: "Royal paneer curry in a rich and creamy gravy with nuts and aromatic spices",
    price: 400,
    image: "https://static.toiimg.com/photo/52446409.cms",
    rating: 4.7,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 11,
    name: "Kadai Paneer",
    category: "north_indian",
    description: "Paneer cooked with bell peppers and spices in a traditional kadai",
    price: 360,
    image: "https://www.awesomecuisine.com/wp-content/uploads/2020/01/kadai-paneer-500x375.jpg",
    rating: 4.5,
    isVegetarian: true,
    isPopular: false
  },

  // ─── Starters (3 items) ─────────────────────────────────────────────
  {
    id: 12,
    name: "Paneer Tikka",
    category: "starters",
    description: "Marinated paneer cubes grilled to perfection in tandoor with smoky flavor",
    price: 280,
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhWEwWfozDKGmqySOPdhysUBUJCBHRs9mpH3nEa5NBYVcl9ZiDyDg-9kLoVt38CT7d3aSNgKVal6HTqEKdIYiOZl0J3J7SAxSKiRlx1QMHxwSR2PO8i0KbeYxNFP_v5BD70k1zUqvDnJ9BH/s1600/Paneer_Tikka_5.jpg",
    rating: 4.7,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 13,
    name: "Gobi Manchurian",
    category: "starters",
    description: "Crispy cauliflower florets tossed in spicy Indo-Chinese sauce",
    price: 220,
    image: "https://palatesdesire.com/wp-content/uploads/2022/09/dry-gobi-manchurian-recipe@palates-desire.jpg",
    rating: 4.5,
    isVegetarian: true,
    isPopular: false
  },
  {
    id: 14,
    name: "Hara Bhara Kebab",
    category: "starters",
    description: "Green spinach and potato patties with a hint of mint and spices",
    price: 240,
    image: "https://www.cookclickndevour.com/wp-content/uploads/2016/05/hara-bhara-kabab-recipe-1.jpg",
    rating: 4.3,
    isVegetarian: true,
    isPopular: false
  },

  // ─── Chinese (3 items) ──────────────────────────────────────────────
  {
    id: 15,
    name: "Veg Fried Rice",
    category: "chinese",
    description: "Wok-tossed rice with fresh vegetables and aromatic Chinese spices",
    price: 250,
    image: "https://www.kannammacooks.com/wp-content/uploads/schezwan-veg-fried-rice-1.jpg",
    rating: 4.3,
    isVegetarian: true,
    isPopular: false
  },
  {
    id: 16,
    name: "Chilli Paneer",
    category: "chinese",
    description: "Crispy paneer cubes tossed in spicy chilli sauce with bell peppers",
    price: 290,
    image: "https://www.yummytummyaarthi.com/wp-content/uploads/2023/06/chilli-paneer-1.jpeg",
    rating: 4.6,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 17,
    name: "Veg Hakka Noodles",
    category: "chinese",
    description: "Stir-fried noodles with mixed vegetables and soy sauce",
    price: 260,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjiGUvoTxQJYxl9FnhWEuD1pAT0PkrI_4ca2awGyu_w&s=10",
    rating: 4.4,
    isVegetarian: true,
    isPopular: false
  },

  // ─── Snacks (3 items) ──────────────────────────────────────────────
  {
    id: 18,
    name: "Samosa",
    category: "snacks",
    description: "Crispy pastry filled with spiced potato and green peas mixture",
    price: 80,
    image: "https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800",
    rating: 4.4,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 19,
    name: "Vada Pav",
    category: "snacks",
    description: "Spicy potato fritter served in a bun with chutneys",
    price: 90,
    image: "https://www.cookwithmanali.com/wp-content/uploads/2018/04/Vada-Pav-500x375.jpg",
    rating: 4.2,
    isVegetarian: true,
    isPopular: false
  },
  {
    id: 20,
    name: "Pani Puri",
    category: "snacks",
    description: "Crispy hollow puris filled with spicy and tangy water",
    price: 120,
    image: "https://www.sidechef.com/recipe/3883dffb-5fa2-4ee9-8054-d8de1409899f.jpg?d=1408x1120",
    rating: 4.5,
    isVegetarian: true,
    isPopular: true
  },

  // ─── Desserts (3 items) ─────────────────────────────────────────────
  {
    id: 21,
    name: "Gulab Jamun",
    category: "desserts",
    description: "Soft and spongy milk solids in rose-flavored sugar syrup",
    price: 150,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663778283739/SE7CbgfPW9YZFR8iB7rsUh/dish-gulab-jamun-mphcUX2r9ZqsCYAsEYJi48.webp",
    rating: 4.8,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 22,
    name: "Rasmalai",
    category: "desserts",
    description: "Soft cheese patties soaked in creamy cardamom-flavored milk",
    price: 180,
    image: "https://www.awesomecuisine.com/wp-content/uploads/2020/01/rasmalai-500x375.jpg",
    rating: 4.7,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 23,
    name: "Kaju Katli",
    category: "desserts",
    description: "Rich diamond-shaped cashew fudge with edible silver leaf",
    price: 200,
    image: "https://www.cookwithkushi.com/wp-content/uploads/2021/05/kaju_katli_kaju_barfi_recipe-500x500.jpg",
    rating: 4.6,
    isVegetarian: true,
    isPopular: false
  },

  // ─── Drinks (2 items) ──────────────────────────────────────────────
  {
    id: 24,
    name: "Mango Lassi",
    category: "drinks",
    description: "Refreshing yogurt-based drink with sweet mango pulp",
    price: 180,
    image: "https://www.yellowthyme.com/wp-content/uploads/2023/03/Mango-Lassi-08589.jpg",
    rating: 4.5,
    isVegetarian: true,
    isPopular: true
  },
  {
    id: 25,
    name: "Masala Chai",
    category: "drinks",
    description: "Traditional Indian tea with aromatic spices and ginger",
    price: 80,
    image: "https://www.loveandotherspices.com/wp-content/uploads/2025/01/masala-chai-tea-2.jpg",
    rating: 4.4,
    isVegetarian: true,
    isPopular: false
  }
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("breakfast");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredMenu = SAMPLE_MENU.filter(item => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    setIsCartAnimating(true);
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
        quantity: 1,
        image: item.image
      }]);
    }
    setTimeout(() => setIsCartAnimating(false), 500);
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

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = cartTotal * 0.05;
  const finalTotal = cartTotal + tax;

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      {/* Header */}
     <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled
      ? "bg-white/98 backdrop-blur-xl shadow-lg border-b border-amber-100/50"
      : "bg-white shadow-sm border-b border-amber-100/30"
  }`}
>
      
        <div className="container flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <motion.img 
              src={LOGO_URL} 
              alt="Murali Krishna" 
              className="h-14 w-14 rounded-full ring-2 ring-amber-200/50"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">
                Murali Krishna
              </h1>
              <p className="text-xs text-amber-600/80 font-light tracking-wider">Premium Vegetarian Fine Dining</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {["Menu", "Reservations", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-amber-800/70 hover:text-amber-600 transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-amber-50 rounded-full transition-colors relative"
            >
              <Heart className="w-5 h-5 text-amber-700/70" />
            </motion.button>
            
            <motion.button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-amber-50 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={isCartAnimating ? { scale: [1, 1.2, 1] } : {}}
            >
              <ShoppingCart className="w-5 h-5 text-amber-700/70" />
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.button>
            
            <motion.button
              onClick={() => setLocation("/dashboards")}
              className="p-2 hover:bg-amber-50 rounded-full transition-colors hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Lock className="w-5 h-5 text-amber-700/70" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={HERO_IMAGE}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </motion.div>

        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-block"
          >
            <span className="px-6 py-2 border border-white/30 rounded-full text-sm tracking-widest font-light backdrop-blur-sm bg-white/10">
              EST. 2024
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
          >
            Culinary Excellence
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="w-24 h-0.5 bg-amber-400 mx-auto mb-6"
          />

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl font-light mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Premium Vegetarian Fine Dining Experience
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a href="#menu" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-10 py-6 text-base shadow-lg shadow-amber-600/30 transition-all duration-300"
              >
                Explore Menu
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.a>
            <motion.a href="#reservations" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/50 text-white hover:bg-white/20 rounded-full px-10 py-6 text-base backdrop-blur-sm transition-all duration-300"
              >
                Reserve Table
              </Button>
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap justify-center gap-8 text-white/80"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm">Award Winning</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-sm">100% Pure Veg</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-amber-400" />
              <span className="text-sm">Expert Chefs</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-b border-amber-100/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, label: "Free Delivery", desc: "On orders above ₹500" },
              { icon: CreditCard, label: "Secure Payment", desc: "100% safe transactions" },
              { icon: Coffee, label: "Fresh Food", desc: "Made with love & care" },
              { icon: Award, label: "Quality Guarantee", desc: "Premium ingredients" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-amber-800">{feature.label}</h4>
                <p className="text-sm text-amber-600/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 md:py-32 bg-gradient-to-b from-white to-amber-50/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 text-sm tracking-widest font-medium uppercase">Our Specialties</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4 text-amber-900">Menu</h2>
            <div className="w-24 h-0.5 bg-amber-500 mx-auto rounded-full" />
            <p className="text-amber-600/70 mt-4 max-w-2xl mx-auto">
              Discover our exquisite selection of authentic vegetarian dishes crafted with passion
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
              <Input
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 rounded-full border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-12">
              {MENU_CATEGORIES.map((category) => {
                const Icon = CATEGORY_ICONS[category] || Utensils;
                return (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-amber-600 data-[state=active]:text-white text-amber-800/70 bg-white/50 backdrop-blur-sm border border-amber-200/50 rounded-full px-5 py-2 text-sm font-medium hover:bg-amber-50 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {CATEGORY_LABELS[category]}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {MENU_CATEGORIES.map((category) => (
              <TabsContent key={category} value={category}>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredMenu.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      onHoverStart={() => setHoveredItem(item.id)}
                      onHoverEnd={() => setHoveredItem(null)}
                      className="group"
                    >
                      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white/80 backdrop-blur-sm">
                        <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white h-64">
                          <motion.div
                            animate={{
                              scale: hoveredItem === item.id ? 1.08 : 1,
                            }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full overflow-hidden"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: hoveredItem === item.id ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center gap-3"
                          >
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-300"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="w-4 h-4 inline mr-1" />
                              Add to Cart
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-white/90 hover:bg-white text-amber-800 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-300"
                              onClick={() => setFavorites(
                                favorites.includes(item.id)
                                  ? favorites.filter(id => id !== item.id)
                                  : [...favorites, item.id]
                              )}
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""
                                }`}
                              />
                            </motion.button>
                          </motion.div>

                          <div className="absolute top-3 left-3 flex gap-2">
                            {item.isPopular && (
                              <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                ★ Popular
                              </span>
                            )}
                            {item.isVegetarian && (
                              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                Veg
                              </span>
                            )}
                          </div>
                        </div>

                        <CardContent className="flex-1 p-5">
                          <h3 className="text-lg font-semibold text-amber-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-amber-600/70 text-sm mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-amber-700">
                              ₹{item.price}
                            </p>
                            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                              <span className="text-sm font-semibold text-amber-700">{item.rating}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-screen w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-100">
                <h2 className="text-2xl font-serif font-bold text-amber-900">Your Cart</h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-amber-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-amber-600" />
                </motion.button>
              </div>

              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <ShoppingCart className="w-16 h-16 text-amber-200 mx-auto mb-4" />
                  <p className="text-amber-600/70">Your cart is empty</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-amber-200 text-amber-600 hover:bg-amber-50"
                    onClick={() => setShowCart(false)}
                  >
                    Start Shopping
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-amber-50/50 rounded-lg p-3"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-amber-800 text-sm">{item.name}</h4>
                            <p className="text-amber-600 font-bold text-sm">₹{item.price}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-amber-200 rounded transition-colors"
                              >
                                <Minus className="w-3 h-3 text-amber-600" />
                              </motion.button>
                              <span className="w-6 text-center text-sm font-medium text-amber-800">{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-amber-200 rounded transition-colors"
                              >
                                <Plus className="w-3 h-3 text-amber-600" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto p-1 hover:bg-red-100 rounded transition-colors"
                              >
                                <X className="w-3 h-3 text-red-500" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-amber-100 pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-amber-600">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-amber-600">
                      <span>Tax (5%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-amber-900 border-t border-amber-100 pt-2">
                      <span>Total</span>
                      <span>₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg py-4 font-semibold shadow-lg shadow-amber-600/30 transition-all duration-300"
                  >
                    Proceed to Checkout
                    <ChevronRight className="w-4 h-4 inline ml-2" />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservations Section */}
      <section id="reservations" className="py-20 md:py-32 bg-amber-50/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 text-sm tracking-widest font-medium uppercase">Book Your Table</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4 text-amber-900">Reservations</h2>
            <div className="w-24 h-0.5 bg-amber-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-amber-700/70 mb-8 leading-relaxed">
                Experience our premium vegetarian cuisine in an elegant ambiance. 
                Book your table now for an unforgettable dining experience.
              </p>

              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Location", value: "Nellore, Andhra Pradesh" },
                  { icon: Phone, label: "Phone", value: "+91 87126 93074" },
                  { icon: Clock, label: "Hours", value: "11:00 AM - 11:00 PM" }
                ].map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-amber-800">{info.label}</p>
                      <p className="text-amber-600/70 text-sm">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-amber-100/50"
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-amber-800 mb-2">Name</label>
                  <Input 
                    placeholder="Your name" 
                    className="rounded-xl border-amber-200 focus:border-amber-400 focus:ring-amber-400" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-800 mb-2">Email</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="rounded-xl border-amber-200 focus:border-amber-400 focus:ring-amber-400" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-800 mb-2">Date</label>
                  <Input 
                    type="date" 
                    className="rounded-xl border-amber-200 focus:border-amber-400 focus:ring-amber-400" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-2">Time</label>
                    <Input type="time" className="rounded-xl border-amber-200 focus:border-amber-400 focus:ring-amber-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-amber-800 mb-2">Guests</label>
                    <select className="w-full px-4 py-2 rounded-xl border border-amber-200 bg-white focus:border-amber-400 focus:ring-amber-400">
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-4 font-semibold shadow-lg shadow-amber-600/30 transition-all duration-300"
                >
                  Reserve Table
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={LOGO_URL} alt="Murali Krishna" className="h-12 w-12 rounded-full" />
                <h3 className="text-xl font-serif font-bold">Murali Krishna</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Premium vegetarian fine dining experience with authentic Indian cuisine.
              </p>
              <div className="flex gap-3 mt-4">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-amber-200">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#menu" className="hover:text-amber-200 transition-colors">Menu</a></li>
                <li><a href="#reservations" className="hover:text-amber-200 transition-colors">Reservations</a></li>
                <li><a href="#contact" className="hover:text-amber-200 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-amber-200 transition-colors">About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-amber-200">Contact Info</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>sales@mksweets.com</li>
                <li>+91 87126 93074</li>
                <li>Nellore, Andhra Pradesh</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-amber-200">Opening Hours</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Mon - Sun</li>
                <li className="font-medium text-white/80">11:00 AM - 11:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
            <p>&copy; 2024 Murali Krishna Restaurant. All rights reserved. Made with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}