'use client'

import React, { useState } from "react"
import { motion, Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, when: "beforeChildren" }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <motion.div
      className="w-full py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-center mb-6"
        variants={itemVariants}
      >
        <h1 className="mb-3">
          Want to Contact Us?
        </h1>
        <p className="text-gray-600">
          Fill out this form to give us your thoughts!
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto border rounded-md p-6 bg-white"
        variants={containerVariants}
      >
        <div className="space-y-4">
          {[
            { id: "name", label: "Name", type: "text", value: formData.name },
            { id: "surname", label: "Surname", type: "text", value: formData.surname },
            { id: "email", label: "Email", type: "email", value: formData.email },
          ].map(({ id, label, type, value }) => (
            <motion.div key={id} variants={itemVariants} className="space-y-2">
              <label htmlFor={id} className="block text-sm font-medium">
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                placeholder={label}
                value={value}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </motion.div>
          ))}

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message…"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px] resize-none"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            variants={itemVariants}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  )
}
