"use client";

import { motion } from "framer-motion";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  const contactDetails = [
    {
      icon: "/images/3D-Icons/e-mails_3d.png",
      title: "Email",
      value: "support@vertexcore.ai",
      description: "Send us an email anytime",
      href: "mailto:support@vertexcore.ai",
    },
    {
      icon: "/images/3D-Icons/Smartphone.png",
      title: "WhatsApp / Phone",
      value: "+94 77 803 6074",
      description: "Chat with us on WhatsApp",
      href: "https://wa.me/94778036074",
    },
    {
      icon: "/images/3D-Icons/linkedin.png",
      title: "LinkedIn",
      value: "VertexCore AI",
      description: "Connect with us professionally",
      href: "https://linkedin.com/company/vertexcore-ai",
    },
    {
      icon: "/images/3D-Icons/facebook.png",
      title: "Facebook",
      value: "VertexCore AI",
      description: "Follow us on Facebook",
      href: "https://www.facebook.com/share/1A5gtX6d9n/",
    },
    {
      icon: "/images/3D-Icons/map.png",
      title: "Address",
      value: "No 108 Mullegama,Ambatenna (Kandy)",
      description: "Visit us at",
      href: "#",
    },
  ];

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
              <span className="text-white">Get in </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              We're here to help transform your ideas into reality. Reach out
              through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactDetails.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  contact.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <img
                    src={contact.icon}
                    alt={contact.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {contact.title}
                </h3>
                <p className="text-emerald-400 font-medium mb-2">
                  {contact.value}
                </p>
                <p className="text-gray-400 text-sm">{contact.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
