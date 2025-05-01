"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  Heart,
  LogIn,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Home() {
  // State management
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [showProductDetail, setShowProductDetail] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeProductImage, setActiveProductImage] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [selectedSize, setSelectedSize] = useState("medium")
  const [selectedColor, setSelectedColor] = useState("natural")
  const [quantity, setQuantity] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "products", "about", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...products]

    // Filter by price
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    // Sort products
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredProducts(result)
  }, [priceRange, selectedCategories, searchQuery, sortOption])

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = form.email.value
    const password = form.password.value

    // In a real app, you would validate credentials with your backend
    setIsLoggedIn(true)
    setUsername(email.split("@")[0])

    toast({
      title: "Login successful!",
      description: `Welcome back, ${email.split("@")[0]}!`,
    })
  }

  // Handle register
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = form.email.value

    // In a real app, you would send this to your backend
    setIsLoggedIn(true)
    setUsername(email.split("@")[0])

    toast({
      title: "Registration successful!",
      description: "Your account has been created.",
    })
  }

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
  }

  // Add to cart functionality
  const addToCart = (product: Product, qty = 1) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + qty } : item)),
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: qty }])
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  // Remove from cart functionality
  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    })
  }

  // Update cart quantity
  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  // Toggle wishlist functionality
  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id))
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      })
    } else {
      setWishlist([...wishlist, id])
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist.",
      })
    }
  }

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = form.email.value

    // In a real app, you would send this to your backend
    console.log("Subscribed email:", email)

    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    })

    form.reset()
  }

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    // In a real app, you would send this to your backend
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })

    form.reset()
  }

  // Open product detail
  const openProductDetail = (product: Product) => {
    setSelectedProduct(product)
    setActiveProductImage(product.images[0])
    setShowProductDetail(true)
    setQuantity(1)
    setSelectedSize("medium")
    setSelectedColor("natural")

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Toggle filters
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header
        id="home"
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">GlowEssence</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="#home"
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "home" ? "text-primary" : ""}`}
                onClick={() => setActiveSection("home")}
              >
                Home
              </Link>
              <Link
                href="#products"
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "products" ? "text-primary" : ""}`}
                onClick={() => setActiveSection("products")}
              >
                Products
              </Link>
              <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
                Blog
              </Link>
              <Link
                href="#about"
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "about" ? "text-primary" : ""}`}
                onClick={() => setActiveSection("about")}
              >
                About
              </Link>
              <Link
                href="#testimonials"
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "testimonials" ? "text-primary" : ""}`}
                onClick={() => setActiveSection("testimonials")}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "contact" ? "text-primary" : ""}`}
                onClick={() => setActiveSection("contact")}
              >
                Contact
              </Link>
              <Link href="/faq" className="text-sm font-medium transition-colors hover:text-primary">
                FAQ
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Search Products</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="mt-6 space-y-4">
                    {searchQuery && filteredProducts.length === 0 ? (
                      <p className="text-center text-muted-foreground">No products found</p>
                    ) : (
                      filteredProducts.slice(0, 5).map((product) => (
                        <div key={product.id} className="flex items-center gap-4 py-2">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              openProductDetail(product)
                              document.querySelector("[data-sheet-close]")?.click()
                            }}
                          >
                            View
                          </Button>
                        </div>
                      ))
                    )}
                    {searchQuery && filteredProducts.length > 5 && (
                      <Button
                        variant="link"
                        className="w-full"
                        onClick={() => {
                          document.querySelector("[data-sheet-close]")?.click()
                          const productsSection = document.getElementById("products")
                          productsSection?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        View all {filteredProducts.length} results
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Wishlist */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {wishlist.length}
                    </Badge>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Wishlist</SheetTitle>
                  <SheetDescription>Items you've saved for later</SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {wishlist.length === 0 ? (
                    <p className="text-center text-muted-foreground">Your wishlist is empty</p>
                  ) : (
                    wishlist.map((id) => {
                      const product = products.find((p) => p.id === id)
                      if (!product) return null

                      return (
                        <div key={id} className="flex items-center gap-4 py-2">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => addToCart(product)}>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => toggleWishlist(id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Shopping Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                      {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </Badge>
                  )}
                  <span className="sr-only">Shopping Cart</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                  <SheetDescription>Review your items before checkout</SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-muted-foreground">Your cart is empty</p>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-2">
                          <Image
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                              <div className="flex items-center border rounded-md">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 p-0"
                                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                >
                                  <span>-</span>
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 p-0"
                                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                >
                                  <span>+</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Separator />

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Subtotal</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Shipping</span>
                          <span>{cartTotal > 50 ? "Free" : "$5.00"}</span>
                        </div>
                        <div className="flex items-center justify-between font-medium">
                          <span>Total</span>
                          <span>${(cartTotal > 50 ? cartTotal : cartTotal + 5).toFixed(2)}</span>
                        </div>
                      </div>

                      <Link href="/checkout">
                        <Button className="w-full">Checkout</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Account */}
            {isLoggedIn ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
                    <User className="h-4 w-4" />
                    {username}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>My Account</SheetTitle>
                    <SheetDescription>Manage your account settings</SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    <div className="grid gap-2">
                      <h3 className="text-lg font-medium">Welcome, {username}!</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your orders, wishlist, and account settings.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Link href="/account/orders">
                        <Button variant="outline" className="justify-start w-full">
                          My Orders
                        </Button>
                      </Link>
                      <Link href="/account/settings">
                        <Button variant="outline" className="justify-start w-full">
                          Account Settings
                        </Button>
                      </Link>
                      <Link href="/account/addresses">
                        <Button variant="outline" className="justify-start w-full">
                          Shipping Addresses
                        </Button>
                      </Link>
                      <Link href="/account/payment">
                        <Button variant="outline" className="justify-start w-full">
                          Payment Methods
                        </Button>
                      </Link>
                    </div>
                    <Button variant="destructive" className="w-full" onClick={handleLogout}>
                      Log Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2 hidden md:flex">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="mt-4">
                      <form onSubmit={handleLogin}>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                          </div>
                          <Button type="submit" className="w-full">
                            Login
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                    <TabsContent value="register" className="mt-4">
                      <form onSubmit={handleRegister}>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="register-name">Name</Label>
                            <Input id="register-name" name="name" placeholder="John Doe" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="register-email">Email</Label>
                            <Input
                              id="register-email"
                              name="email"
                              type="email"
                              placeholder="name@example.com"
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="register-password">Password</Label>
                            <Input id="register-password" name="password" type="password" required />
                          </div>
                          <Button type="submit" className="w-full">
                            Register
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}

            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>GlowEssence</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <SheetClose asChild>
                    <Link
                      href="#home"
                      className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "home" ? "text-primary" : ""}`}
                      onClick={() => setActiveSection("home")}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#products"
                      className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "products" ? "text-primary" : ""}`}
                      onClick={() => setActiveSection("products")}
                    >
                      Products
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
                      Blog
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#about"
                      className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "about" ? "text-primary" : ""}`}
                      onClick={() => setActiveSection("about")}
                    >
                      About
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#testimonials"
                      className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "testimonials" ? "text-primary" : ""}`}
                      onClick={() => setActiveSection("testimonials")}
                    >
                      Testimonials
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="#contact"
                      className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === "contact" ? "text-primary" : ""}`}
                      onClick={() => setActiveSection("contact")}
                    >
                      Contact
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/faq" className="text-sm font-medium transition-colors hover:text-primary">
                      FAQ
                    </Link>
                  </SheetClose>
                </nav>
                <Separator className="my-4" />
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{username}</span>
                    </div>
                    <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Sign In</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <Tabs defaultValue="login">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                          </TabsList>
                          <TabsContent value="login" className="mt-4">
                            <form onSubmit={handleLogin}>
                              <div className="grid gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="mobile-email">Email</Label>
                                  <Input
                                    id="mobile-email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="mobile-password">Password</Label>
                                  <Input id="mobile-password" name="password" type="password" required />
                                </div>
                                <Button type="submit" className="w-full">
                                  Login
                                </Button>
                              </div>
                            </form>
                          </TabsContent>
                          <TabsContent value="register" className="mt-4">
                            <form onSubmit={handleRegister}>
                              <div className="grid gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="mobile-register-name">Name</Label>
                                  <Input id="mobile-register-name" name="name" placeholder="John Doe" required />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="mobile-register-email">Email</Label>
                                  <Input
                                    id="mobile-register-email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="mobile-register-password">Password</Label>
                                  <Input id="mobile-register-password" name="password" type="password" required />
                                </div>
                                <Button type="submit" className="w-full">
                                  Register
                                </Button>
                              </div>
                            </form>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {showProductDetail ? (
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <Button variant="ghost" className="mb-6" onClick={() => setShowProductDetail(false)}>
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Products
              </Button>

              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg border">
                    <Image
                      src={activeProductImage || "/placeholder.svg"}
                      alt={selectedProduct?.name || "Product"}
                      width={600}
                      height={600}
                      className="w-full object-cover transition-all hover:scale-105 aspect-square"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct?.images.map((img, i) => (
                      <button
                        key={i}
                        className={`rounded-md overflow-hidden border-2 ${activeProductImage === img ? "border-primary" : "border-transparent"}`}
                        onClick={() => setActiveProductImage(img)}
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`Product view ${i + 1}`}
                          width={80}
                          height={80}
                          className="w-16 h-16 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="w-fit">{selectedProduct?.category}</Badge>
                    {selectedProduct?.isNew && <Badge className="w-fit bg-green-500 hover:bg-green-600">New</Badge>}
                    {selectedProduct?.isBestSeller && (
                      <Badge className="w-fit bg-amber-500 hover:bg-amber-600">Best Seller</Badge>
                    )}
                  </div>

                  <h2 className="text-3xl font-bold">{selectedProduct?.name}</h2>

                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < (selectedProduct?.rating || 0) ? "fill-primary text-primary" : ""}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({selectedProduct?.reviews?.length || 0} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">${selectedProduct?.price.toFixed(2)}</p>
                    {selectedProduct?.oldPrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        ${selectedProduct.oldPrice.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <p className="text-muted-foreground">{selectedProduct?.description}</p>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Size</Label>
                      <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                        {["small", "medium", "large"].map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <RadioGroupItem value={size} id={`size-${size}`} />
                            <Label htmlFor={`size-${size}`} className="capitalize">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Color</Label>
                      <RadioGroup
                        value={selectedColor}
                        onValueChange={setSelectedColor}
                        className="flex flex-wrap gap-2"
                      >
                        {["natural", "rose", "lavender"].map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <RadioGroupItem value={color} id={`color-${color}`} />
                            <Label htmlFor={`color-${color}`} className="capitalize">
                              {color}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                          className="h-8 w-16 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row pt-4">
                    <Button
                      size="lg"
                      className="gap-2"
                      onClick={() => {
                        if (selectedProduct) {
                          addToCart(selectedProduct, quantity)
                        }
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2"
                      onClick={() => {
                        if (selectedProduct) {
                          toggleWishlist(selectedProduct.id)
                        }
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${selectedProduct && wishlist.includes(selectedProduct.id) ? "fill-primary text-primary" : ""}`}
                      />
                      {selectedProduct && wishlist.includes(selectedProduct.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="details">
                      <AccordionTrigger>Product Details</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>
                            <span className="font-medium">Ingredients:</span> {selectedProduct?.ingredients}
                          </p>
                          <p>
                            <span className="font-medium">How to Use:</span> {selectedProduct?.howToUse}
                          </p>
                          <p>
                            <span className="font-medium">Benefits:</span> {selectedProduct?.benefits}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="shipping">
                      <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p>Free shipping on all orders over $50.</p>
                          <p>Orders typically ship within 1-2 business days.</p>
                          <p>We offer a 30-day return policy for unused items in original packaging.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="reviews">
                      <AccordionTrigger>Customer Reviews ({selectedProduct?.reviews?.length || 0})</AccordionTrigger>
                      <AccordionContent>
                        {selectedProduct?.reviews?.length ? (
                          <div className="space-y-4">
                            {selectedProduct.reviews.map((review, index) => (
                              <div key={index} className="border-b pb-4 last:border-0">
                                <div className="flex items-center gap-2">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : ""}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium">{review.name}</span>
                                </div>
                                <p className="mt-2 text-sm">{review.comment}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{review.date}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>No reviews yet. Be the first to review this product!</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Reveal Your Natural Beauty
                      </h1>
                      <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        Discover our premium collection of skincare products made with natural ingredients to enhance
                        your beauty routine.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Button
                        size="lg"
                        className="px-8"
                        onClick={() => {
                          const productsSection = document.getElementById("products")
                          productsSection?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        Shop Now
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => {
                          const aboutSection = document.getElementById("about")
                          aboutSection?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jVIEbN5KRscST1DTg7Cc7u61qlugqJ.png"
                      alt="Beauty Products Collection"
                      width={550}
                      height={450}
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Products */}
            <section id="products" className="w-full py-12 md:py-24 lg:py-32">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Products</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                      Discover our collection of premium skincare products for every skin type.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8 mb-4">
                  <div className="flex items-center gap-2">
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">
                      Showing {filteredProducts.length} of {products.length} products
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2" onClick={toggleFilters}>
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Filters - Now on the right side and collapsible */}
                  <div
                    className={`${
                      showFilters ? "md:w-1/4 lg:w-1/5" : "w-0 md:hidden"
                    } transition-all duration-300 overflow-hidden`}
                  >
                    {showFilters && (
                      <div className="sticky top-24 space-y-6 p-4 border rounded-lg bg-background">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Filters</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setPriceRange([0, 100])
                              setSelectedCategories([])
                              setSortOption("featured")
                            }}
                          >
                            Reset
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Categories</h4>
                            <div className="space-y-2">
                              {categories.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`category-${category}`}
                                    checked={selectedCategories.includes(category)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedCategories([...selectedCategories, category])
                                      } else {
                                        setSelectedCategories(selectedCategories.filter((c) => c !== category))
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`category-${category}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                                  >
                                    {category}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Price Range</h4>
                            <div className="space-y-4">
                              <Slider
                                defaultValue={[0, 100]}
                                max={100}
                                step={1}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="py-4"
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-sm">${priceRange[0]}</span>
                                <span className="text-sm">${priceRange[1]}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Grid */}
                  <div className={`${showFilters ? "md:w-3/4 lg:w-4/5" : "w-full"}`}>
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-12">
                        <h3 className="text-lg font-medium">No products found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                          <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
                            <div className="relative">
                              <Image
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                width={300}
                                height={240}
                                className="w-full h-60 object-cover cursor-pointer"
                                onClick={() => openProductDetail(product)}
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80"
                                onClick={() => toggleWishlist(product.id)}
                              >
                                <Heart
                                  className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-primary text-primary" : ""}`}
                                />
                                <span className="sr-only">Add to wishlist</span>
                              </Button>
                              {product.isNew && (
                                <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">New</Badge>
                              )}
                              {product.isBestSeller && (
                                <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600">
                                  Best Seller
                                </Badge>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h3
                                    className="font-semibold cursor-pointer hover:text-primary"
                                    onClick={() => openProductDetail(product)}
                                  >
                                    {product.name}
                                  </h3>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    <span className="text-sm ml-1">{product.rating}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between pt-2">
                                  <div>
                                    <span className="font-bold">${product.price.toFixed(2)}</span>
                                    {product.oldPrice && (
                                      <span className="text-sm text-muted-foreground line-through ml-2">
                                        ${product.oldPrice.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                  <Button size="sm" onClick={() => addToCart(product)}>
                                    Add to Cart
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-center space-x-2 mt-8">
                      <Button variant="outline" size="icon" disabled>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Us</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                      We're committed to providing the highest quality beauty products with these guarantees.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg">
                      <div className="p-3 rounded-full bg-primary/10">{benefit.icon}</div>
                      <h3 className="text-xl font-bold">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Customer Love</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                      See what our customers are saying about their experience with our products.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">"{testimonial.comment}"</p>
                        <div className="flex items-center space-x-4">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="rounded-full w-10 h-10 object-cover"
                          />
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="flex justify-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jVIEbN5KRscST1DTg7Cc7u61qlugqJ.png"
                      alt="About Our Brand"
                      width={600}
                      height={400}
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Story</h2>
                      <p className="text-muted-foreground md:text-xl">
                        Founded in 2015, GlowEssence was born from a passion for natural beauty and skincare.
                      </p>
                    </div>
                    <p className="text-muted-foreground">
                      Our journey began when our founder, Sarah, struggled to find skincare products that were both
                      effective and free from harmful chemicals. After years of research and development, we created a
                      line of products that harness the power of nature's finest ingredients.
                    </p>
                    <p className="text-muted-foreground">
                      Today, we're proud to offer a complete range of skincare solutions that are ethically sourced,
                      cruelty-free, and formulated with your skin's health in mind.
                    </p>
                    <div>
                      <Link href="/about-us">
                        <Button>Learn More About Us</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Newsletter */}
            <section className="w-full py-12 md:py-24 lg:py-32 border-t">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Our Community</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Subscribe to our newsletter for exclusive offers, skincare tips, and new product announcements.
                    </p>
                  </div>
                  <div className="w-full max-w-md space-y-2">
                    <form className="flex space-x-2" onSubmit={handleSubscribe}>
                      <input
                        name="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                        placeholder="Enter your email"
                        type="email"
                        required
                      />
                      <Button type="submit">Subscribe</Button>
                    </form>
                    <p className="text-xs text-muted-foreground">
                      By subscribing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
              <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Get in Touch</h2>
                      <p className="text-muted-foreground md:text-xl">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <span>support@glowessence.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>123 Beauty Lane, Los Angeles, CA 90001</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <form onSubmit={handleContactSubmit}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="first-name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            First name
                          </label>
                          <input
                            id="first-name"
                            name="first-name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="last-name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Last name
                          </label>
                          <input
                            id="last-name"
                            name="last-name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="space-y-2 mt-4">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your message"
                          required
                        />
                      </div>
                      <Button className="w-full mt-4" type="submit">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} GlowEssence. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm font-medium transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="/shipping" className="text-sm font-medium transition-colors hover:text-primary">
              Shipping
            </Link>
            <Link href="/returns" className="text-sm font-medium transition-colors hover:text-primary">
              Returns
            </Link>
          </div>
        </div>
      </footer>

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}

// Types
interface Product {
  id: number
  name: string
  description: string
  price: number
  oldPrice?: number
  rating: number
  images: string[]
  category: string
  isNew?: boolean
  isBestSeller?: boolean
  date: string
  ingredients?: string
  howToUse?: string
  benefits?: string
  reviews?: {
    name: string
    rating: number
    comment: string
    date: string
  }[]
}

interface CartItem extends Product {
  quantity: number
}

// Sample data
const products: Product[] = [
  {
    id: 1,
    name: "Hydrating Facial Serum",
    description:
      "A lightweight serum that deeply hydrates and revitalizes your skin with hyaluronic acid and vitamin C.",
    price: 49.99,
    rating: 4.8,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GP5DIvPhWeUdMIVY3bqfkkG0Q9DKfd.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MQGcbFwbEJrkfy2vMq1OortpH1TIAY.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvJctCvUfxa7paHPojXiogKCtV24ul.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jVIEbN5KRscST1DTg7Cc7u61qlugqJ.png",
    ],
    category: "serum",
    date: "2023-01-15",
    ingredients: "Water, Hyaluronic Acid, Vitamin C, Glycerin, Aloe Vera Extract, Jojoba Oil",
    howToUse: "Apply 2-3 drops to clean, dry skin morning and night. Follow with moisturizer.",
    benefits: "Hydrates, brightens, and improves skin texture and tone.",
    reviews: [
      {
        name: "Emma T.",
        rating: 5,
        comment:
          "This serum has completely transformed my skin! It's so hydrating and my complexion looks brighter than ever.",
        date: "2023-03-10",
      },
      {
        name: "Michael R.",
        rating: 4,
        comment: "Great product, absorbs quickly and doesn't feel sticky. Noticed improvements after just a week.",
        date: "2023-02-22",
      },
    ],
  },
  {
    id: 2,
    name: "Rejuvenating Night Cream",
    description: "Wake up to refreshed skin with our overnight formula that repairs and nourishes while you sleep.",
    price: 59.99,
    oldPrice: 69.99,
    rating: 4.7,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvJctCvUfxa7paHPojXiogKCtV24ul.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GP5DIvPhWeUdMIVY3bqfkkG0Q9DKfd.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MQGcbFwbEJrkfy2vMq1OortpH1TIAY.png",
    ],
    category: "moisturizer",
    isBestSeller: true,
    date: "2023-02-10",
    ingredients: "Shea Butter, Retinol, Peptides, Vitamin E, Rosehip Oil, Ceramides",
    howToUse: "Apply a small amount to face and neck in the evening after cleansing. Gently massage until absorbed.",
    benefits: "Reduces fine lines, improves elasticity, and provides deep overnight hydration.",
    reviews: [
      {
        name: "Sarah L.",
        rating: 5,
        comment: "This night cream is amazing! I wake up with plump, hydrated skin every morning.",
        date: "2023-04-05",
      },
      {
        name: "David K.",
        rating: 5,
        comment: "My wife got this for me and I'm impressed. Skin feels much smoother after just a few weeks.",
        date: "2023-03-18",
      },
    ],
  },
  {
    id: 3,
    name: "Gentle Cleansing Foam",
    description: "A soft, foaming cleanser that removes impurities without stripping your skin's natural moisture.",
    price: 29.99,
    rating: 4.9,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MQGcbFwbEJrkfy2vMq1OortpH1TIAY.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvJctCvUfxa7paHPojXiogKCtV24ul.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GP5DIvPhWeUdMIVY3bqfkkG0Q9DKfd.png",
    ],
    category: "cleanser",
    date: "2023-01-05",
    ingredients: "Water, Glycerin, Aloe Vera, Chamomile Extract, Green Tea Extract, Cucumber Extract",
    howToUse: "Massage a small amount onto damp skin, rinse thoroughly with warm water. Use morning and evening.",
    benefits: "Removes makeup and impurities while maintaining skin's natural pH balance.",
    reviews: [
      {
        name: "Jennifer P.",
        rating: 5,
        comment:
          "Finally a cleanser that doesn't dry out my sensitive skin! Leaves my face feeling clean but not tight.",
        date: "2023-02-28",
      },
      {
        name: "Robert M.",
        rating: 4,
        comment: "Great for daily use. Removes all traces of dirt without irritation.",
        date: "2023-01-15",
      },
    ],
  },
  {
    id: 4,
    name: "Advanced Hydration Serum",
    description: "Our most advanced formula for intense hydration and targeting fine lines and uneven skin tone.",
    price: 89.99,
    rating: 4.9,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GP5DIvPhWeUdMIVY3bqfkkG0Q9DKfd.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MQGcbFwbEJrkfy2vMq1OortpH1TIAY.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvJctCvUfxa7paHPojXiogKCtV24ul.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jVIEbN5KRscST1DTg7Cc7u61qlugqJ.png",
    ],
    category: "serum",
    isBestSeller: true,
    date: "2023-03-20",
    ingredients: "Hyaluronic Acid, Niacinamide, Peptides, Vitamin C, Vitamin E, Ferulic Acid",
    howToUse:
      "Apply 3-4 drops to clean skin morning and evening. Follow with moisturizer and sunscreen during the day.",
    benefits: "Deeply hydrates, reduces fine lines, evens skin tone, and improves overall skin texture.",
    reviews: [
      {
        name: "Patricia L.",
        rating: 5,
        comment: "Worth every penny! This serum has dramatically improved my skin's texture and tone in just a month.",
        date: "2023-04-15",
      },
      {
        name: "Thomas B.",
        rating: 5,
        comment:
          "I've tried many serums and this is by far the best. Absorbs quickly and results are visible within weeks.",
        date: "2023-03-30",
      },
    ],
  },
  {
    id: 5,
    name: "Brightening Eye Cream",
    description: "Target dark circles and puffiness with this specialized formula for the delicate eye area.",
    price: 39.99,
    rating: 4.6,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvJctCvUfxa7paHPojXiogKCtV24ul.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GP5DIvPhWeUdMIVY3bqfkkG0Q9DKfd.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MQGcbFwbEJrkfy2vMq1OortpH1TIAY.png",
    ],
    category: "eye care",
    date: "2023-02-15",
    ingredients: "Caffeine, Vitamin K, Peptides, Hyaluronic Acid, Cucumber Extract, Green Tea Extract",
    howToUse: "Gently pat a small amount around the eye area morning and evening. Use ring finger for application.",
    benefits: "Reduces dark circles, minimizes puffiness, and hydrates the delicate eye area.",
    reviews: [
      {
        name: "Lisa M.",
        rating: 4,
        comment: "I've noticed a significant reduction in my dark circles after using this for a month.",
        date: "2023-03-20",
      },
      {
        name: "Kevin W.",
        rating: 5,
        comment: "Works great for reducing morning puffiness. A little goes a long way!",
        date: "2023-02-28",
      },
    ],
  },
  {
    id: 6,
    name: "Exfoliating Facial Scrub",
    description:
      "Gently remove dead skin cells and reveal a brighter, smoother complexion with this natural exfoliant.",
    price: 34.99,
    rating: 4.7,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MQGcbFwbEJrkfy2vMq1OortpH1TIAY.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvJctCvUfxa7paHPojXiogKCtV24ul.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GP5DIvPhWeUdMIVY3bqfkkG0Q9DKfd.png",
    ],
    category: "exfoliant",
    date: "2023-01-25",
    isNew: true,
    ingredients: "Jojoba Beads, Papaya Enzyme, Salicylic Acid, Aloe Vera, Chamomile Extract, Vitamin E",
    howToUse: "Apply to damp skin and massage in circular motions. Rinse thoroughly. Use 2-3 times per week.",
    benefits: "Removes dead skin cells, unclogs pores, and improves skin texture and tone.",
    reviews: [
      {
        name: "Amanda R.",
        rating: 5,
        comment: "This scrub is gentle yet effective. My skin feels so smooth after using it!",
        date: "2023-03-05",
      },
      {
        name: "Brian T.",
        rating: 4,
        comment: "Great exfoliator that doesn't irritate my sensitive skin. Use it twice a week with great results.",
        date: "2023-02-18",
      },
    ],
  },
  {
    id: 7,
    name: "Vitamin C Brightening Mask",
    description:
      "A weekly treatment to brighten dull skin and reduce the appearance of dark spots and hyperpigmentation.",
    price: 45.99,
    oldPrice: 55.99,
    rating: 4.8,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GP5DIvPhWeUdMIVY3bqfkkG0Q9DKfd.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MQGcbFwbEJrkfy2vMq1OortpH1TIAY.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvJctCvUfxa7paHPojXiogKCtV24ul.png",
    ],
    category: "mask",
    date: "2023-03-10",
    isNew: true,
    ingredients: "Vitamin C, Licorice Root Extract, Niacinamide, Turmeric Extract, Kaolin Clay, Aloe Vera",
    howToUse: "Apply a thin layer to clean, dry skin. Leave on for 15-20 minutes, then rinse. Use 1-2 times per week.",
    benefits: "Brightens skin tone, reduces dark spots, and provides antioxidant protection.",
    reviews: [
      {
        name: "Olivia S.",
        rating: 5,
        comment: "This mask gives my skin an instant glow! I use it before special events for an extra boost.",
        date: "2023-04-10",
      },
      {
        name: "Nathan P.",
        rating: 4,
        comment: "Noticed a visible difference in my dark spots after a few weeks of consistent use.",
        date: "2023-03-25",
      },
    ],
  },
  {
    id: 8,
    name: "Nourishing Lip Balm",
    description: "Keep your lips soft and hydrated with this nourishing balm infused with natural oils and butters.",
    price: 14.99,
    rating: 4.9,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvJctCvUfxa7paHPojXiogKCtV24ul.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GP5DIvPhWeUdMIVY3bqfkkG0Q9DKfd.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MQGcbFwbEJrkfy2vMq1OortpH1TIAY.png",
    ],
    category: "lip care",
    date: "2023-01-10",
    ingredients: "Shea Butter, Coconut Oil, Beeswax, Vitamin E, Jojoba Oil, Rosehip Oil",
    howToUse: "Apply to lips as needed throughout the day. Can be used under lipstick or on its own.",
    benefits: "Deeply hydrates, repairs dry or chapped lips, and provides long-lasting moisture.",
    reviews: [
      {
        name: "Jessica L.",
        rating: 5,
        comment: "Best lip balm I've ever used! Keeps my lips hydrated even in winter.",
        date: "2023-02-15",
      },
      {
        name: "Chris M.",
        rating: 5,
        comment: "Not greasy and lasts for hours. My go-to lip product now.",
        date: "2023-01-30",
      },
    ],
  },
]

const categories = [...new Set(products.map((product) => product.category))]

const benefits = [
  {
    title: "Natural Ingredients",
    description: "All products are made with ethically sourced natural ingredients.",
    icon: <Check className="h-6 w-6 text-primary" />,
  },
  {
    title: "Cruelty-Free",
    description: "We never test on animals and are certified cruelty-free.",
    icon: <Check className="h-6 w-6 text-primary" />,
  },
  {
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders over $50.",
    icon: <Check className="h-6 w-6 text-primary" />,
  },
  {
    title: "30-Day Guarantee",
    description: "Not satisfied? Get a full refund within 30 days.",
    icon: <Check className="h-6 w-6 text-primary" />,
  },
]

const testimonials = [
  {
    name: "Emma Thompson",
    location: "New York, NY",
    rating: 5,
    comment:
      "I've tried countless skincare products, but nothing compares to the Hydrating Facial Serum. My skin has never looked better!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Michael Chen",
    location: "Los Angeles, CA",
    rating: 5,
    comment:
      "The Rejuvenating Night Cream has completely transformed my skincare routine. I wake up with glowing skin every morning.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Sophia Rodriguez",
    location: "Miami, FL",
    rating: 4,
    comment:
      "I love how gentle yet effective the Cleansing Foam is. It's perfect for my sensitive skin and removes all makeup effortlessly.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  },
]

