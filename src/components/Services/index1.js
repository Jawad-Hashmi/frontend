import Navbar from "../NavBar/Navbar";
import { motion } from "framer-motion";
import { Code2, Smartphone, Laptop, Bot } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description: "Modern, responsive, and scalable web applications built with the latest technologies.",
    icon: <Laptop className="w-10 h-10" />,
  },
  {
    title: "Software Development",
    description: "Custom desktop and enterprise software tailored to your business needs.",
    icon: <Code2 className="w-10 h-10" />,
  },
  {
    title: "Mobile App Development",
    description: "Intuitive and powerful mobile apps for both iOS and Android platforms.",
    icon: <Smartphone className="w-10 h-10" />,
  },
  {
    title: "AI Integration",
    description: "Leverage artificial intelligence to automate, analyze, and scale smarter.",
    icon: <Bot className="w-10 h-10" />,
  },
];
function Service1() {
  return (
    <>
    <Navbar/>
     <div className="mt-5 min-h-screen bg-black text-white flex flex-col items-center py-16 px-6">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        Our <span className="text-gray-400">Services</span>
      </motion.h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white text-black rounded-2xl shadow-lg p-8 flex flex-col items-start hover:shadow-2xl transition-all"
          >
            <div className="mb-4 text-black">{service.icon}</div>
            <h2 className="text-2xl font-semibold mb-3">{service.title}</h2>
            <p className="text-gray-700">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Service1;
