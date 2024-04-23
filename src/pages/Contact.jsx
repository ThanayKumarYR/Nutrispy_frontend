import React, { useState } from 'react';
import { axios } from '../utilities';
import "./css/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', number: '', company: '', message: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = '/contact';
    axios.posting(url, formData).then((Response) => console.log(Response.data)).catch(e => console.log(e))

    setFormData({
      name: '', email: '', number: '', company: '', message: '',
    });
  };

  return (
    <section className="container contact">
      <h1 className='title'>Send us a message</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" id="number" name="number" inputMode='numeric' required value={formData.number} onChange={handleChange}
          />
        </div>
        <div>
          <label>Company (optional):</label>
          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange}
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            id="message" name="message" rows="5" required value={formData.message} onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* <section id="info" className="info">
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
      </section> */}
    </section>
  );
};

export default Contact;
