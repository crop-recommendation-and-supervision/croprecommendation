import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Contact Us</h1>
              <p className="text-lg text-gray-700">
                Have questions about our crop recommendation system? We're here to help. Reach out to our team for
                support, feedback, or partnership inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-6">Send Us a Message</h2>
                <Card>
                  <CardContent className="pt-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Full Name
                          </label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                          </label>
                          <Input id="email" type="email" placeholder="Your email" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" placeholder="How can we help you?" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea id="message" placeholder="Your message" rows={5} />
                      </div>

                      <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <ContactInfoCard
                    icon={<MapPin className="h-6 w-6 text-green-600" />}
                    title="Our Location"
                    details={["Agricultural Research Center", "123 Farming Avenue", "Cropville, AG 12345"]}
                  />

                  <ContactInfoCard
                    icon={<Phone className="h-6 w-6 text-green-600" />}
                    title="Phone Numbers"
                    details={["+1 (555) 123-4567 (General Inquiries)", "+1 (555) 987-6543 (Technical Support)"]}
                  />

                  <ContactInfoCard
                    icon={<Mail className="h-6 w-6 text-green-600" />}
                    title="Email Addresses"
                    details={["info@agrismart.example.com", "support@agrismart.example.com"]}
                  />

                  <ContactInfoCard
                    icon={<Clock className="h-6 w-6 text-green-600" />}
                    title="Working Hours"
                    details={["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 2:00 PM", "Sunday: Closed"]}
                  />
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 rounded-xl overflow-hidden shadow-md">
                  <img
                    src="/placeholder.svg?height=300&width=600"
                    alt="Office location map"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Find answers to common questions about our crop recommendation system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <FaqCard
                question="How accurate are the crop recommendations?"
                answer="Our system has been trained on over 2,000 data points and achieves an accuracy rate of over 90% in controlled testing environments. The recommendations take into account multiple factors including soil composition, climate conditions, and historical data."
              />

              <FaqCard
                question="Can I upload my own dataset for analysis?"
                answer="Yes, registered users can upload CSV files containing soil and climate data for batch processing. The system will analyze each row and provide crop recommendations for each set of parameters."
              />

              <FaqCard
                question="How do I get access to the full system?"
                answer="You need to create an account and submit a registration request. Our admin team will review your request and grant access, typically within 1-2 business days."
              />

              <FaqCard
                question="Is my agricultural data kept private?"
                answer="Yes, we take data privacy seriously. Your uploaded data and recommendations are only accessible to you and authorized administrators. We do not share individual data with third parties without explicit consent."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ContactInfoCard({
  icon,
  title,
  details,
}: {
  icon: React.ReactNode
  title: string
  details: string[]
}) {
  return (
    <Card className="border-gray-200">
      <CardContent className="flex items-start space-x-4 pt-6">
        <div className="mt-1">{icon}</div>
        <div>
          <h3 className="font-semibold text-green-800 mb-2">{title}</h3>
          <div className="space-y-1">
            {details.map((detail, index) => (
              <p key={index} className="text-gray-600">
                {detail}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FaqCard({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  return (
    <Card className="border-gray-200">
      <CardContent className="pt-6">
        <h3 className="font-semibold text-green-800 text-lg mb-2">{question}</h3>
        <p className="text-gray-600">{answer}</p>
      </CardContent>
    </Card>
  )
}
