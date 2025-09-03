import { Shield, Cloud, Users, Cpu, Database, Brain } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Information Security",
    description:
      "Experience unmatched security with NETSOL’s unified and unparalleled information security services and solutions.",
    icon: Shield,
  },
  {
    title: "Cloud Services",
    description:
      "Explore our range of robust cloud services for scalable and secure business solutions.",
    icon: Cloud,
  },
  {
    title: "Talent Partnerships",
    description:
      "Empower the industry’s best talent to help you develop and refine your technology strategy.",
    icon: Users,
  },
  {
    title: "Emerging Technologies",
    description:
      "Embrace the future with NETSOL, leading in AI, ML, Digital Twins, Blockchain and Web 3.0 technologies.",
    icon: Cpu,
  },
  {
    title: "Data Engineering",
    description:
      "Discover NETSOL’s cutting-edge data engineering solutions for streamlined data management and transformation across industries.",
    icon: Database,
  },
  {
    title: "AI, ML & Data Analytics",
    description:
      "Explore NETSOL’s AI, ML and data analytics solutions for automated decision-making, data-driven decision-making.",
    icon: Brain,
  },
];

// Animation Variants
const cardVariants = {
  hover: { rotate: [0, 2, -2, 2, 0] }, // shake effect
};

const iconVariants = {
  hover: { scale: 1.2, rotate: 10 }, // bounce & rotate
};

export default function ServiceCards() {
  return (
    <div className="bg-black py-12 px-4 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-md p-6 space-y-4 cursor-pointer"
              >
                {/* Icon now listens to card hover */}
                <motion.div
                  variants={iconVariants}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 flex items-center justify-center bg-black rounded-full"
                >
                  <Icon className="text-white w-6 h-6" />
                </motion.div>

                <h3 className="text-xl font-bold text-black">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="block text-black font-semibold hover:underline"
                >
                  Learn More
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
