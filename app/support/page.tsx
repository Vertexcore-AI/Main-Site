"use client";

import { motion } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const supportPlans = [
  {
    id: "standard",
    name: "Standard Maintenance",
    icon: "/images/3D-Icons/shield.png",
    tagline: "We keep your application secure and running smoothly.",
    features: [
      "Security patches & updates",
      "Uptime monitoring",
      "Priority bug fixes",
      "Email support (48hr response)",
      "99.99% uptime guarantee",
    ],
    highlighted: false,
    cta: "Get Started",
    ctaHref: "/contact",
    accent: "neutral",
  },
  {
    id: "dedicated",
    name: "Dedicated Team",
    icon: "/images/3D-Icons/laptop.png",
    tagline: "24/7 availability with a team that knows your product inside-out.",
    features: [
      "Everything in Standard",
      "24/7 availability",
      "Dedicated Slack channel",
      "Priority bug fixes",
      "Monthly strategy calls",
    ],
    highlighted: true,
    cta: "Choose Plan",
    ctaHref: "/consultation",
    accent: "emerald",
  },
  {
    id: "enterprise",
    name: "Enterprise SLA",
    icon: "/images/3D-Icons/rocket.png",
    tagline: "Mission-critical support with guaranteed uptime and response times.",
    features: [
      "Everything in Dedicated",
      "99.99% uptime guarantee",
      "<1hr critical response time",
      "Custom SLA terms",
      "Dedicated account manager",
    ],
    highlighted: false,
    cta: "Contact Us",
    ctaHref: "/contact",
    accent: "purple",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">World-Class </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                Support & Maintenance
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Choose the support model that fits your needs. From standard
              maintenance to enterprise SLAs, we ensure your applications run
              flawlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Support Section */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-emerald-400">Support Models</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional support packages designed to keep your software secure, performant, and always available.
            </p>
          </motion.div> */}

          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {supportPlans.map((plan, index) => {
              const isEmerald = plan.accent === "emerald";
              const isPurple = plan.accent === "purple";
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                    plan.highlighted
                      ? "border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                      : isPurple
                        ? "border border-gray-700 hover:border-purple-500/40"
                        : "border border-gray-700 hover:border-emerald-500/30"
                  }`}
                >
                  <div className="w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                    <Image
                      src={plan.icon}
                      alt={plan.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 text-center">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 mb-6 text-center">{plan.tagline}</p>

                  <div className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <a
                      href={plan.ctaHref}
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 bg-gray-800 text-white border border-gray-700 hover:border-emerald-500/40"
                    >
                      {plan.cta}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Get in <span className="text-emerald-400">Touch</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Need help choosing the right plan or have questions? Our team is
              here to assist you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Email Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/images/3D-Icons/e-mails.png"
                  alt="Email"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Email Support
              </h3>
              <p className="text-gray-400 mb-4">Get detailed help via email</p>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                support@vertexcoreai.com
              </Button>
            </motion.div>

            {/* Live Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/images/3D-Icons/laptop.png"
                  alt="Chat"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
              <p className="text-gray-400 mb-4">Chat with our team instantly</p>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">Start Chat</Button>
            </motion.div>

            {/* Phone Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/images/3D-Icons/phone.png"
                  alt="Phone"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Phone Support
              </h3>
              <p className="text-gray-400 mb-4">Speak directly with experts</p>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                Schedule Call
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
