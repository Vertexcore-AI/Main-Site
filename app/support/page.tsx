"use client";

import { motion } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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

          <div className="flex justify-center mb-20">
            {/* Standard Maintenance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                <img
                  src="/images/3D-Icons/shield.png"
                  alt="Shield"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">
                Standard Maintenance
              </h3>
              <p className="text-gray-400 mb-6">
                We keep your application secure and running smoothly.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Security patches & updates
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Uptime monitoring</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Priority bug fixes</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    Email support (48hr response)
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">99.99% uptime guarantee</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-500">Free</p>
              </div>
            </motion.div>

            {/* Dedicated Team */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 backdrop-blur-sm border-2 border-emerald-500/30 rounded-3xl p-8 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </span>
              </div>
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Dedicated Team</h3>
              <p className="text-gray-400 mb-6">24/7 availability with a dedicated team that knows your product inside-out.</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Everything in Standard</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">24/7 availability</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Dedicated Slack channel</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Priority bug fixes</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Monthly strategy calls</span>
                </div>
              </div>
              <div className="pt-4 border-t border-emerald-500/20">
                <p className="text-sm text-gray-500">Starting at</p>
                <p className="text-3xl font-bold text-white">$999<span className="text-lg text-gray-400">/mo</span></p>
              </div>
            </motion.div> */}

            {/* Enterprise SLA */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Enterprise SLA</h3>
              <p className="text-gray-400 mb-6">Mission-critical support with guaranteed uptime and response times.</p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Everything in Dedicated</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">99.99% uptime guarantee</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">&lt;1hr critical response time</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Custom SLA terms</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Dedicated account manager</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-500">Custom pricing</p>
                <p className="text-3xl font-bold text-white">Contact Us</p>
              </div>
            </motion.div> */}
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
                <img
                  src="/images/3D-Icons/e-mails.png"
                  alt="Email"
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
                <img
                  src="/images/3D-Icons/chat.png"
                  alt="Chat"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
              <p className="text-gray-400 mb-4">Chat with our team instantly</p>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                Start Chat
              </Button>
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
                <img
                  src="/images/3D-Icons/phone.png"
                  alt="Phone"
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
