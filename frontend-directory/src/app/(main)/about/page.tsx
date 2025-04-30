'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion, Variants } from 'framer-motion';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { when: 'beforeChildren', staggerChildren: 0.2, duration: 0.6 }
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
};

const Features = () => null; // placeholder

const teamMembers = [
  { name: "Vishaanth Muddu", linkedin: "https://www.linkedin.com/in/vishaanth-muddu/", img: "/vishaanth.jpg" },
  { name: "Maanav Damaraju", linkedin: "https://www.linkedin.com/in/maanavdamaraju/", img: "/maanav.jpg" },
  { name: "Logan Markley", linkedin: "https://www.linkedin.com/in/logan-c-markley/", img: "/logan.jpg" },
  { name: "Matthew Dominicis", linkedin: "https://www.linkedin.com/in/midxm6/", img: "/matthew.jpg" },
  { name: "Shreyas Mocherla", linkedin: "https://www.linkedin.com/in/aiwithshrey/", img: "/shreyas.jpg" },
  { name: "Ayman Awsaf Rahman", linkedin: "https://www.linkedin.com/in/ayman-awsaf-rahman/", img: "/ayman.jpg" },
];

export default function AboutPage() {
  return (
    <div className="bg-white pb-[50px]">
      {/* Stats Section */}
      <motion.section
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: "ROUTES GENERATED", value: "1,592", detail: "3.6 hours | 683 miles" },
            { title: "MONEY SAVED", value: "$2,953", detail: "3.6 hours | 683 miles" },
            { title: "USERS HELPED", value: "163", detail: "3.6 hours | 643 miles" },
          ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Who We Are */}
      <motion.section
        className="py-12 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Who Are We?</h2>
          <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed">
            We’re the <strong>Pink Pony Club</strong>: a team of six senior Computer Science
            students at Missouri S&T: Vishaanth Muddu, Maanav Damaraju, Logan Markley,
            Matthew Dominicis, Shreyas Mocherla, and Ayman Awsaf Rahman.
          </motion.p>
          <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed">
            For our Capstone II project, we’re partnering with <strong>Boeing</strong> to solve a
            real-world variant of the <strong>Traveling Salesman Problem (TSP)</strong>. Our
            challenge is to generate optimal aircraft routing solutions using data-driven heuristics
            and automation.
          </motion.p>
          <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed">
            Our team brings together strengths in algorithm design, backend development, user
            interface design, and systems thinking to deliver a robust, high-performance routing
            platform tailored to Boeing’s operational needs.
          </motion.p>
        </div>
      </motion.section>

      {/* How We Built This */}
      <motion.section
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">How We Built This</h2>
          <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed">
            Our frontend is built with <strong>React</strong>, <strong>TypeScript</strong>,
            <strong>Next.js</strong>, and <strong>Tailwind CSS</strong>, ensuring a modern,
            fast, and responsive interface for visualizing routing results.
          </motion.p>
          <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed">
            On the backend, we use shell scripting and <strong>PlantUML</strong> to automate the
            generation of route diagrams based on TSP outputs. We implemented custom heuristics
            and optimization logic to tackle real-world constraints and produce high-quality,
            repeatable results.
          </motion.p>
        </div>
      </motion.section>

      {/* Meet the Team */}
      <motion.section
        className="py-12 bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet the Team</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {teamMembers.map((member, idx) => (
              <SwiperSlide key={idx}>
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
                  variants={itemVariants}
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="rounded-full mb-4"
                  />
                  <h4 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h4>
                </motion.a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>
    </div>
  );
}

function StatCard({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
      <h5 className="text-sm font-medium uppercase text-gray-600">{title}</h5>
      <p className="text-4xl font-bold text-gray-900 my-2">{value}</p>
      <p className="text-gray-500">{detail}</p>
    </div>
  );
}
