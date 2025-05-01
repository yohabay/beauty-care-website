import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Beauty & Skincare Blog</h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Discover tips, tricks, and insights about skincare, beauty routines, and product recommendations.
            </p>
          </div>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-60 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge>{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {post.date} • {post.readTime} min read
                        </p>
                      </div>
                      <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="link" className="p-0 h-auto font-semibold">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Subscribe to Our Newsletter</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Get the latest beauty tips, product updates, and exclusive offers delivered to your inbox.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex space-x-2">
                  <input
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
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
              Blog
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

const blogPosts = [
  {
    id: 1,
    title: "10 Skincare Myths Debunked by Experts",
    slug: "skincare-myths-debunked",
    excerpt:
      "We've all heard skincare advice from friends, family, and the internet. But how much of it is actually true? We consulted with dermatologists to debunk the most common skincare myths.",
    date: "May 15, 2023",
    readTime: 8,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Layering Skincare Products",
    slug: "guide-layering-skincare-products",
    excerpt:
      "Confused about the correct order to apply your skincare products? This comprehensive guide breaks down the perfect layering technique for maximum effectiveness.",
    date: "April 28, 2023",
    readTime: 10,
    category: "Tutorials",
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4ee0e57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "How to Build a Skincare Routine for Sensitive Skin",
    slug: "skincare-routine-sensitive-skin",
    excerpt:
      "Dealing with sensitive skin can be challenging. Learn how to create a gentle yet effective skincare routine that calms irritation and strengthens your skin barrier.",
    date: "March 12, 2023",
    readTime: 7,
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1567721913486-6585f069b332?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Natural Ingredients That Transform Your Skin",
    slug: "natural-ingredients-transform-skin",
    excerpt:
      "Discover the power of nature with these incredible natural ingredients that can address various skin concerns, from acne to aging.",
    date: "February 20, 2023",
    readTime: 6,
    category: "Ingredients",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Seasonal Skincare: Adjusting Your Routine for Summer",
    slug: "seasonal-skincare-summer",
    excerpt:
      "As temperatures rise, your skin's needs change. Learn how to adapt your skincare routine for the summer months to keep your skin healthy and glowing.",
    date: "June 5, 2023",
    readTime: 5,
    category: "Seasonal",
    image:
      "https://images.unsplash.com/photo-1614859529896-355fb13fb8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "The Science Behind Anti-Aging Skincare",
    slug: "science-anti-aging-skincare",
    excerpt:
      "What actually works when it comes to anti-aging products? We dive into the science behind the most effective ingredients and treatments.",
    date: "January 8, 2023",
    readTime: 12,
    category: "Science",
    image:
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
]

