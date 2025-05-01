import Link from "next/link"
import Image from "next/image"
import { Check, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  // In a real app, this would come from your order state or API
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000)
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const orderItems = [
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

  const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="space-y-2">
              <h3 className="font-medium">Order Number</h3>
              <p>{orderNumber}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Order Date</h3>
              <p>{orderDate}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Shipping Address</h3>
              <p>
                Jane Doe
                <br />
                123 Main Street
                <br />
                Apt 4B
                <br />
                New York, NY 10001
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Payment Method</h3>
              <p>Credit Card (ending in 4242)</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Order Details</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
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
                      <span>Free</span>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">What's Next?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Your order is being processed and will be shipped within 1-2 business days.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Shipping Updates</h3>
                <p className="text-sm text-muted-foreground">
                  You will receive an email with tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">
            If you have any questions about your order, please contact our customer service team.
          </p>
          <div className="flex gap-4">
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
            <Link href="/account/orders">
              <Button variant="outline">View All Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

