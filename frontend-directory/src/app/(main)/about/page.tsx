'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const teamMembers = [
  { name: "Vishaanth Muddu", linkedin: "https://www.linkedin.com/in/vishaanth-muddu/", img: "/images/vishaanth.jpg" },
  { name: "Maanav Damaraju", linkedin: "https://www.linkedin.com/in/maanavdamaraju/", img: "/images/maanav.jpg" },
  { name: "Logan Markley", linkedin: "https://www.linkedin.com/in/logan-c-markley/", img: "/images/logan.jpg" },
  { name: "Matthew Dominicis", linkedin: "https://www.linkedin.com/in/midxm6/", img: "/images/matthew.jpg" },
  { name: "Shreyas Mocherla", linkedin: "https://www.linkedin.com/in/aiwithshrey/", img: "/images/shreyas.jpg" },
  { name: "Ayman Awsaf Rahman", linkedin: "https://www.linkedin.com/in/ayman-awsaf-rahman/", img: "/images/ayman.jpg" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="ROUTES GENERATED" value="1,592" detail="3.6 hours | 683 miles" />
          <StatCard title="MONEY SAVED" value="$2,953" detail="3.6 hours | 683 miles" />
          <StatCard title="USERS HELPED" value="163" detail="3.6 hours | 643 miles" />
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">Who Are We?</h2>
          <p className="text-gray-600 mt-4">
            We’re the <strong>Pink Pony Club</strong>: a team of six senior Computer Science students at Missouri S&T: Vishaanth Muddu, Maanav Damaraju, Logan Markley, Mathew Dominicis, Shreyas Mocherla, and Ayman Awsaf Rahman.
          </p>
          <p className="text-gray-600 mt-4">
            For our Capstone II project, we’re partnering with <strong>Boeing</strong> to solve a real-world variant of the <strong>Traveling Salesman Problem (TSP)</strong>. Our challenge is to generate optimal aircraft routing solutions using data-driven heuristics and automation. The project involves optimizing routes across multiple nodes with constraints specific to Boeing’s aerospace operations.
          </p>
          <p className="text-gray-600 mt-4">
            Our team brings together strengths in algorithm design, backend development, user interface design, and systems thinking to deliver a robust, high-performance routing platform tailored to Boeing’s operational needs.
          </p>
        </div>
      </section>


      {/* How We Built This */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold">How We Built This</h2>
          <p className="text-gray-600 mt-4">
            Our frontend is built with <strong>React</strong>, <strong>TypeScript</strong>, <strong>Next.js</strong>, and <strong>Tailwind CSS</strong>, ensuring a modern, fast, and responsive interface for visualizing routing results.
          </p>
          <p className="text-gray-600 mt-4">
            On the backend, we use shell scripting and <strong>PlantUML</strong> to automate the generation of route diagrams based on TSP outputs. We implemented custom heuristics and optimization logic to tackle real-world constraints and produce high-quality, repeatable results.
          </p>
        </div>
      </section>


      {/* Meet the Team */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Meet the Team</h2>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {teamMembers.map((member, idx) => (
              <SwiperSlide key={idx}>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, detail }: { title: string, value: string, detail: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-sm font-medium uppercase text-gray-700">{title}</h3>
      <p className="text-5xl font-bold mt-2">{value}</p>
      <p className="text-gray-500 mt-2">{detail}</p>
    </div>
  );
}
