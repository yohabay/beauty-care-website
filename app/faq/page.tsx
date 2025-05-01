import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Find answers to common questions about our products, shipping, returns, and more.
            </p>
            <div className="w-full max-w-md">
              <div className="relative">
                <Input type="text" placeholder="Search for answers..." className="pr-10" />
                <Button className="absolute right-0 top-0 h-full rounded-l-none">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FAQ Content */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold mb-6">Products & Ingredients</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Are your products cruelty-free?</AccordionTrigger>
                    <AccordionContent>
                      Yes, all of our products are 100% cruelty-free. We never test on animals and we're certified by
                      Leaping Bunny and PETA as a cruelty-free brand.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What ingredients do you avoid in your formulations?</AccordionTrigger>
                    <AccordionContent>
                      We avoid harmful ingredients such as parabens, sulfates, phthalates, synthetic fragrances, and
                      artificial colors. Our products are formulated with clean, effective ingredients that are safe for
                      your skin and the environment.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Are your products suitable for sensitive skin?</AccordionTrigger>
                    <AccordionContent>
                      Many of our products are formulated with sensitive skin in mind. We recommend checking the product
                      descriptions for specific information. Our Gentle Cleansing Foam and Hydrating Facial Serum are
                      particularly good for sensitive skin types.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Do you offer samples of your products?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer sample sizes of select products. You can add samples to your order during checkout,
                      or you can purchase our Travel Essentials Kit which includes mini versions of our bestsellers.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How long do your products last once opened?</AccordionTrigger>
                    <AccordionContent>
                      Most of our products have a shelf life of 12 months after opening. You'll find a PAO (Period After
                      Opening) symbol on each product that indicates how long the product remains stable after it's been
                      opened.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Orders & Shipping</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-6">
                    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                    <AccordionContent>
                      Standard shipping typically takes 3-5 business days within the continental US. Express shipping
                      options are available at checkout for 1-2 business day delivery. International shipping times vary
                      by location, generally taking 7-14 business days.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer free standard shipping on all orders over $50 within the United States.
                      International orders over $100 qualify for free standard international shipping.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-8">
                    <AccordionTrigger>Can I change or cancel my order?</AccordionTrigger>
                    <AccordionContent>
                      We process orders quickly to ensure fast delivery. If you need to change or cancel your order,
                      please contact our customer service team immediately. We can usually accommodate changes if the
                      order hasn't been processed yet.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9">
                    <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we ship to most countries worldwide. International shipping rates are calculated at checkout
                      based on location and package weight. Please note that customers are responsible for any customs
                      fees or import taxes that may apply.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-10">
                    <AccordionTrigger>How can I track my order?</AccordionTrigger>
                    <AccordionContent>
                      Once your order ships, you'll receive a confirmation email with tracking information. You can also
                      log into your account on our website to view your order status and tracking details.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <Separator className="my-12" />

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold mb-6">Returns & Refunds</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-11">
                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                    <AccordionContent>
                      We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase,
                      you can return it within 30 days of delivery for a full refund or exchange. Products must be in
                      their original packaging and in unused condition.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-12">
                    <AccordionTrigger>How do I initiate a return?</AccordionTrigger>
                    <AccordionContent>
                      To initiate a return, please contact our customer service team or visit the "Returns" section in
                      your account. We'll provide you with a return shipping label and instructions on how to proceed.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-13">
                    <AccordionTrigger>How long does it take to process a refund?</AccordionTrigger>
                    <AccordionContent>
                      Once we receive your returned items, we'll inspect them and process your refund within 3-5
                      business days. The refund will be issued to your original payment method. It may take an
                      additional 2-7 business days for the refund to appear in your account, depending on your financial
                      institution.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-14">
                    <AccordionTrigger>What if my product arrives damaged?</AccordionTrigger>
                    <AccordionContent>
                      If your product arrives damaged or defective, please contact us within 48 hours of delivery with
                      photos of the damaged items and packaging. We'll arrange for a replacement or refund right away.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Account & Rewards</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-15">
                    <AccordionTrigger>How do I create an account?</AccordionTrigger>
                    <AccordionContent>
                      You can create an account by clicking on the "Sign In" button at the top of our website and
                      selecting "Create Account." You'll need to provide your email address and create a password. You
                      can also create an account during the checkout process.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-16">
                    <AccordionTrigger>What are the benefits of creating an account?</AccordionTrigger>
                    <AccordionContent>
                      Creating an account allows you to track orders, save your shipping information for faster
                      checkout, create wishlists, earn and redeem rewards points, and receive personalized product
                      recommendations based on your preferences.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-17">
                    <AccordionTrigger>How does your rewards program work?</AccordionTrigger>
                    <AccordionContent>
                      Our GlowRewards program lets you earn points for every purchase, product review, and social media
                      share. You'll earn 1 point for every $1 spent, and points can be redeemed for discounts on future
                      purchases. You'll also receive exclusive offers and early access to new product launches.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-18">
                    <AccordionTrigger>I forgot my password. How do I reset it?</AccordionTrigger>
                    <AccordionContent>
                      If you've forgotten your password, click on the "Sign In" button and select "Forgot Password."
                      Enter the email address associated with your account, and we'll send you instructions to reset
                      your password.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our customer service team is here to help. Contact us and we'll get back to you as soon as possible.
              </p>
              <Link href="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} GlowEssence. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/faq" className="text-sm font-medium transition-colors hover:text-primary">
              FAQ
            </Link>
            <Link href="/terms" className="text-sm font-medium transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-primary">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

