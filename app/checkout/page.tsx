"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, Info, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function CheckoutPage() {
  const [step, setStep] = useState<"information" | "shipping" | "payment">("information")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  // Sample cart items - in a real app, this would come from your cart state
  const cartItems = [
    {
      id: 1,
      name: "Hydrating Facial Serum",
      price: 49.99,
      quantity: 1,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GP5DIvPhWeUdMIVY3bqfkkG0Q9DKfd.png",
    },
    {
      id: 4,
      name: "Advanced Hydration Serum",
      price: 89.99,
      quantity: 1,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RvJctCvUfxa7paHPojXiogKCtV24ul.png",
    },
  ]

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = shippingMethod === "express" ? 15 : subtotal >= 50 ? 0 : 5
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleSubmitInformation = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("shipping")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      })

      // Redirect to order confirmation page
      window.location.href = "/checkout/confirmation"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shopping
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="text-muted-foreground">Complete your purchase securely</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      step === "information" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    } mr-2`}
                  >
                    1
                  </div>
                  <span className="font-medium">Information</span>
                </div>
                <div className="h-px w-8 bg-border"></div>
                <div className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      step === "shipping" || step === "payment"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    } mr-2`}
                  >
                    2
                  </div>
                  <span className="font-medium">Shipping</span>
                </div>
                <div className="h-px w-8 bg-border"></div>
                <div className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    } mr-2`}
                  >
                    3
                  </div>
                  <span className="font-medium">Payment</span>
                </div>
              </div>
            </div>

            {step === "information" && (
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitInformation}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="(123) 456-7890" required />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="first-name">First Name</Label>
                              <Input id="first-name" required />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" required />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                            <Input id="apartment" />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" required />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="state">State</Label>
                              <Input id="state" required />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="zip">ZIP Code</Label>
                              <Input id="zip" required />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit">Continue to Shipping</Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === "shipping" && (
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitShipping}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                        <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                          <div className="flex items-center justify-between border rounded-md p-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="standard" id="standard" />
                              <Label htmlFor="standard" className="flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                <div>
                                  <p className="font-medium">Standard Shipping</p>
                                  <p className="text-sm text-muted-foreground">3-5 business days</p>
                                </div>
                              </Label>
                            </div>
                            <div className="font-medium">{subtotal >= 50 ? "Free" : "$5.00"}</div>
                          </div>
                          <div className="flex items-center justify-between border rounded-md p-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="express" id="express" />
                              <Label htmlFor="express" className="flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                <div>
                                  <p className="font-medium">Express Shipping</p>
                                  <p className="text-sm text-muted-foreground">1-2 business days</p>
                                </div>
                              </Label>
                            </div>
                            <div className="font-medium">$15.00</div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep("information")}>
                          Back to Information
                        </Button>
                        <Button type="submit">Continue to Payment</Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === "payment" && (
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmitPayment}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <Tabs defaultValue="credit-card" onValueChange={(value) => setPaymentMethod(value)}>
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                            <TabsTrigger value="paypal">PayPal</TabsTrigger>
                          </TabsList>
                          <TabsContent value="credit-card" className="space-y-4 mt-4">
                            <div className="grid gap-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" required />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" required />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="name-on-card">Name on Card</Label>
                              <Input id="name-on-card" required />
                            </div>
                          </TabsContent>
                          <TabsContent value="paypal" className="mt-4">
                            <div className="text-center p-6 border rounded-md">
                              <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                              <Image
                                src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg"
                                alt="PayPal"
                                width={111}
                                height={69}
                                className="mx-auto"
                              />
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setStep("shipping")}>
                          Back to Shipping
                        </Button>
                        <Button type="submit" disabled={isProcessing}>
                          {isProcessing ? "Processing..." : "Place Order"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {subtotal < 50 && shippingMethod === "standard" && (
                    <div className="flex items-center gap-2 text-sm bg-muted p-3 rounded-md">
                      <Info className="h-4 w-4 text-primary" />
                      <span>Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping!</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm bg-muted p-3 rounded-md">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Your order is eligible for our 30-day satisfaction guarantee!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

