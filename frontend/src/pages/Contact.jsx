// pages/Contact.jsx
import { useState } from "react";
import api from "../api/axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact", formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-heading mb-4">Get in Touch</h1>
          <p className="text-gray-600 mb-6">
            Have questions? We'd love to hear from you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <span>123 Fashion Street, New York, NY 10001</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <span>support@store.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📞</span>
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded"
            required
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded"
            required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-2 border rounded"
            required
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
          <textarea
            placeholder="Message"
            rows="5"
            className="w-full px-4 py-2 border rounded"
            required
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          <button
            type="submit"
            className="w-full bg-brand text-white py-2 rounded hover:bg-opacity-90 transition"
          >
            Send Message
          </button>
          {submitted && (
            <p className="text-green-600 text-center">Thank you! We'll respond soon.</p>
          )}
        </form>
      </div>
    </div>
  );
}