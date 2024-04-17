import React, { useState } from 'react';
import "./css/Contact.css";
import { FaLocationDot } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { FaPhoneAlt } from "react-icons/fa";
import { axios } from '../utilities';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    company: '',
    message: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      // Replace with your Flask app URL and endpoint
      const url = '/contact';
      axios.posting(url,formData).then((Response) => console.log(Response.data)).catch(e => console.log(e))

      // Clear form after successful submission (optional)
      setFormData({
        name: '',
        email: '',
        number: '',
        company: '',
        message: '',
      });
  };

  return (
    <div className="container">
      <section id="message" className="message ">
        <h2>Send us a message</h2>
        <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
          <div>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          </div>

          <div>
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          </div>
          

          <div>
          <label htmlFor="number">Your Phone Number:</label>
          <input
            type="tel"
            id="number"
            name="number"
            required
            value={formData.number}
            onChange={handleChange}
          />
          </div>
          

          <div>
          <label htmlFor="company">Company (optional):</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          </div>
          

          <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          />
          </div>
          
          <button type="submit">Submit</button>
        </form>
      </section>

      <section id="info" className="info">
        <h2>Contact Information</h2>
        <ul>
          <li>
          <FaLocationDot /> Location: Your Location Here
          </li>
          <li>
          <TfiEmail /> Email: youremail@example.com
          </li>
          <li>
          <FaPhoneAlt /> Phone: (555) 555-5555
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Contact;
