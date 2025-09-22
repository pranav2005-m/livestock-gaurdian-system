import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, MapPin, Bell, Battery, ChevronLeft, ChevronRight } from "lucide-react";

// ---------------- Button Component ----------------
function Button({ children, className = "", variant, size, ...props }) {
  const base =
    "px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500";
  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
    outline: "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white active:bg-green-700",
    white: "bg-white text-green-600 hover:bg-gray-50 hover:text-green-700",
  };
  const sizes = {
    sm: "text-sm px-3 py-1.5",
    lg: "text-lg px-6 py-3",
    default: "",
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ---------------- Card Components ----------------
function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-2xl border bg-white shadow-lg hover:shadow-xl transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

// ---------------- Image Slider ----------------
function ImageSlider() {
  const images = [
    {
      src: "https://static.vecteezy.com/system/resources/thumbnails/038/971/338/small_2x/ai-generated-modern-outdoor-cowshed-at-dairy-farm-with-herd-of-milking-holstein-cows-eating-hay-from-manger-photo.jpg",
      alt: "Healthy Cows",
      title: "Cow Monitoring",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSBwZduRJ6-dZz_nxVVGZ30jta4SH0Cg_3zg&s",
      alt: "Goat Herd",
      title: "Goat Tracking",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTZi18Y5GCOEOQ7WAWYxp1dwLbSfJDzHizLQ&s",
      alt: "Buffalo Grazing",
      title: "Buffalo Care",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-green-600/20">
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-2xl font-bold">{image.title}</h3>
                <p className="text-green-100 mt-2">
                  Advanced monitoring for your livestock
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 hover:text-green-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 hover:text-green-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------- HomePage Component ----------------
export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-green-700">🐄 Livestock Guardian</h1>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
            <a href="#home" className="hover:text-green-600 transition-colors duration-200">
              Home
            </a>
            <a href="#features" className="hover:text-green-600 transition-colors duration-200">
              Features
            </a>
            <a href="#products" className="hover:text-green-600 transition-colors duration-200">
              Products
            </a>
            <a href="#about" className="hover:text-green-600 transition-colors duration-200">
              About
            </a>
            <a href="#contact" className="hover:text-green-600 transition-colors duration-200">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-3">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="h-0.5 bg-current"></div>
              <div className="h-0.5 bg-current"></div>
              <div className="h-0.5 bg-current"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col p-4 space-y-3">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors duration-200">Home</a>
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors duration-200">Features</a>
              <a href="#products" className="text-gray-700 hover:text-green-600 transition-colors duration-200">Products</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors duration-200">About</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors duration-200">Contact</a>

              <div className="flex gap-3 pt-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Home Section */}
      <section id="home" className="pt-20 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Smart Livestock
                <span className="text-green-600 block">Guardian System</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Protect, Monitor, and Grow your livestock with advanced IoT technology.
                Real-time health monitoring, GPS tracking, and instant alerts to keep
                your animals safe and healthy.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="shadow-lg">🛒 Shop Now</Button>
              <Button size="lg" variant="outline" className="shadow-lg">📖 Learn More</Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Happy Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5000+</div>
                <div className="text-sm text-gray-600">Animals Protected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Slider */}
          <div>
            <ImageSlider />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced technology designed specifically for modern livestock management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Cards */}
            <Card className="hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <ShieldCheck size={40} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Health Monitoring</h3>
                <p className="text-gray-600">
                  Track heart rate, temperature, and activity patterns in real-time
                  with advanced sensors.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <MapPin size={40} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">GPS Tracking</h3>
                <p className="text-gray-600">
                  Always know the exact location of your livestock with precise GPS tracking technology.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Bell size={40} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Instant Alerts</h3>
                <p className="text-gray-600">
                  Receive immediate notifications for unusual behavior, health issues, or potential dangers.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:transform hover:scale-105 transition-all duration-300">
              <CardContent className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Battery size={40} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Long Battery Life</h3>
                <p className="text-gray-600">
                  Reliable performance with extended battery life and solar charging capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h2>
            <p className="text-xl text-gray-600">
              Professional-grade monitoring devices for every type of livestock
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-sm hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src="https://m.media-amazon.com/images/I/710jPe+8B9L.jpg"
                  alt="Guardian Tracker Device"
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  New
                </div>
              </div>
              <CardContent className="text-center">
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Guardian Tracker</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Advanced wearable sensor with GPS tracking, health monitoring, 
                  and long-lasting battery life designed for all livestock types.
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-green-700">₹15,999</span>
                  <span className="text-gray-500 line-through ml-2">₹19,999</span>
                </div>
                <Button className="w-full shadow-lg hover:shadow-xl">
                  🛒 Buy Now
                </Button>
                <p className="text-sm text-gray-500 mt-3">
                  Free shipping • 2 year warranty
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Livestock Guardian
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We are passionate about revolutionizing livestock management through 
                innovative IoT technology. Our mission is to empower farmers with 
                real-time insights and automated monitoring solutions.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With years of experience in agricultural technology, we understand 
                the challenges farmers face. Our Guardian System provides peace of 
                mind and helps optimize livestock health and productivity.
              </p>
              <Button size="lg">Learn Our Story</Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop&crop=center"
                alt="Farm with technology"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Protect Your Livestock Today
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Join hundreds of farmers already using our Guardian System to 
            monitor and protect their valuable livestock.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="white" className="shadow-lg">
              🚀 Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 shadow-lg">
              📞 Call Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4 text-white">
                🐄 Livestock Guardian
              </h3>
              <p className="text-gray-400 mb-4">
                Smart monitoring solutions to keep your livestock safe, 
                healthy, and productive.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                <div className="w-8 h-8 bg-green-600 rounded-full"></div>
                <div className="w-8 h-8 bg-green-600 rounded-full"></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-green-400 transition-colors duration-200">Home</a></li>
                <li><a href="#features" className="hover:text-green-400 transition-colors duration-200">Features</a></li>
                <li><a href="#products" className="hover:text-green-400 transition-colors duration-200">Products</a></li>
                <li><a href="#about" className="hover:text-green-400 transition-colors duration-200">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Installation Guide</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Warranty</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors duration-200">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Contact Info</h3>
              <div className="space-y-3">
                <p className="flex items-center">
                  <span className="mr-2">📧</span> support@guardian.com
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📞</span> +91 98765 43210
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📍</span> Chennai, Tamil Nadu
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Livestock Guardian. All rights reserved. 
              Made with ❤️ for farmers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}