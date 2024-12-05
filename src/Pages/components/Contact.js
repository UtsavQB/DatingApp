import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Form Data:', formData);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden md:flex">
        <div className="flex flex-col justify-center p-8 bg-gradient-to-br from-purple-600 to-blue-500 text-white md:w-1/2">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 bg-transparent border-b placeholder-white ${errors.name ? 'border-red-500' : 'border-white'
                  } focus:outline-none`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 bg-transparent border-b placeholder-white ${errors.email ? 'border-red-500' : 'border-white'
                  } focus:outline-none`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full p-2 bg-transparent border-b placeholder-white ${errors.subject ? 'border-red-500' : 'border-white'
                  } focus:outline-none`}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-2 bg-transparent border-b placeholder-white ${errors.message ? 'border-red-500' : 'border-white'
                  } focus:outline-none`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 py-2 rounded-lg font-bold hover:bg-pink-600 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="p-6 md:w-1/2">
          <h2 className="text-xl font-bold text-purple-600 mb-4">Contact us</h2>
          
          <ul className="space-y-14">
           
            <li className="flex items-start space-x-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-purple-600 flex-shrink-0 "
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="3" />
              </svg>
              <span className="leading-relaxed">
                <strong>Address:</strong> 198 West 21th Street, Suite 721<br /> New York NY 10016
              </span>
            </li>
           
            <li className="flex items-start space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-purple-600 flex-shrink-0"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="leading-relaxed">
                <strong>Email:</strong>  butcher7211@gmail.com
              </span>
            </li>
           
            <li className="flex items-start space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-purple-600 flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
              </svg>
              <span className="leading-relaxed">
                <strong>Website:</strong> loveNest.com
              </span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default App;
