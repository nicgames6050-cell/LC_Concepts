import { Wrench, Home, Zap, Lightbulb, Package, Sparkles, Phone, Mail, MapPin, Clock, CheckCircle, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [cardsVisible, setCardsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const servicesRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCardsVisible(false);
    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => setCardsVisible(true), 100);
      }
    }, 50);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfTKEdiSOBYn-PsNe1HpI7i5M9mqTOzgzbQ5XEX53T323uQBw/formResponse?usp=pp_url&entry.1322833286=${encodeURIComponent(formData.name)}&entry.132484561=${encodeURIComponent(formData.email)}&entry.334617597=${encodeURIComponent(formData.phone)}&entry.862489943=${encodeURIComponent(formData.message)}`;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = googleFormUrl;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      alert('Thank you! Your quote request has been submitted. We will contact you soon.');
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#02377c' }}>
      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl shadow-lg z-50 rounded-3xl backdrop-blur-md" style={{ backgroundColor: 'rgba(2, 55, 124, 0.7)' }}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3">
              <img src="/LC_Concepts_LLC_Logo__4_-removebg-preview.png" alt="LC Concepts Logo" className="h-12 w-12" />
              <span className="text-2xl font-bold text-white hidden md:inline">LC Concepts</span>
            </button>
            <div className="flex space-x-4 md:space-x-8 items-center">
              <button onClick={() => setCurrentPage('about')} className="text-white hover:text-orange-400 transition-colors font-medium">About</button>
              <a href="#contact" onClick={(e) => { if (currentPage !== 'home') { e.preventDefault(); setCurrentPage('home'); setTimeout(() => { const element = document.getElementById('contact'); element?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}} className="text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:opacity-90 transition-all font-semibold shadow-md hover:shadow-lg text-sm md:text-base" style={{ backgroundColor: '#02377c', border: '2px solid white' }}>
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </nav>

      {currentPage === 'home' && (
        <>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/AdobeStock_90919557.jpg"
            alt="Professional handyman at work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex justify-end">
            <div className="max-w-xl">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 text-center">
                <div>Build.</div>
                <div>Fix.</div>
                <div>Repair.</div>
              </h1>
              <p className="text-xl text-white mb-8 leading-relaxed text-center">
                Professional handyman services for all your home improvement needs. Quality craftsmanship, reliable service, and competitive pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" className="text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all font-semibold text-lg shadow-lg hover:shadow-xl text-center" style={{ backgroundColor: '#02377c' }}>
                  Schedule Service
                </a>
                <a href="tel:+18433108707" className="bg-white px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg text-center" style={{ border: '2px solid #02377c', color: '#02377c' }}>
                  Call Now
                </a>
              </div>
              <div className="mt-12 flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-white">Rated 5.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#02377c' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Comprehensive handyman services to keep your home in perfect condition
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Home, title: "Home Repairs", desc: "Fix all types of household issues quickly and efficiently" },
              { icon: Wrench, title: "Golf-Cart Repairs", desc: "Expert golf cart maintenance and repair services" },
              { icon: Sparkles, title: "Christmas Lights", desc: "Professional holiday lighting installation and removal" },
              { icon: Zap, title: "Electrical Work", desc: "Safe and reliable electrical repairs and upgrades" },
              { icon: Lightbulb, title: "Lighting", desc: "Interior and exterior lighting design and installation" },
              { icon: Package, title: "Installation", desc: "Professional installation services for all your needs" }
            ].map((service, index) => (
              <div
                key={index}
                className={`bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${
                  cardsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <service.icon className="h-12 w-12 mb-4" style={{ color: '#02377c' }} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#02377c' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose LC Concepts</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We're committed to delivering exceptional service and craftsmanship
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Expert Craftsmen", desc: "Years of experience in home repair and improvement" },
              { title: "Reliable Service", desc: "On-time arrival and efficient project completion" },
              { title: "Fair Pricing", desc: "Transparent quotes with no hidden fees" },
              { title: "Quality Materials", desc: "We use only the best products for lasting results" },
              { title: "Satisfaction Guaranteed", desc: "Your happiness is our top priority" },
              { title: "Licensed & Insured", desc: "Full coverage for your peace of mind" }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: '#02377c' }} />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#02377c' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-200 mb-8">
                Ready to start your project? Contact us today for a free quote.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 flex-shrink-0 mt-1 text-white" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <a href="tel:+18433108707" className="text-gray-200 hover:text-orange-400 transition-colors">
                      (843) 310-8707
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 flex-shrink-0 mt-1 text-white" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a href="mailto:contact@lcconcepts.com" className="text-gray-200 hover:text-orange-400 transition-colors">
                      contact@lcconcepts.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 flex-shrink-0 mt-1 text-white" />
                  <div>
                    <p className="font-semibold text-white">Service Area</p>
                    <p className="text-gray-200">Bluffton and Hilton Head</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#02377c' }}
                >
                  Request a Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/LC Concepts LLC Logo.png" alt="LC Concepts Logo" className="h-10 w-10" />
                <span className="text-2xl font-bold">LC Concepts</span>
              </div>
              <p className="text-gray-400">
                Professional handyman services for all your home improvement needs.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-400 hover:text-orange-600 transition-colors">Services</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-orange-600 transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-orange-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>(843) 310-8707</li>
                <li>contact@lcconcepts.com</li>
                <li>Bluffton and Hilton Head</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LC Concepts. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </>
      )}

      {currentPage === 'about' && (
        <>
          {/* About Us Page */}
          <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold text-white mb-6">About LC Concepts</h1>
                <p className="text-2xl text-gray-200 max-w-3xl mx-auto">
                  Your trusted partner for professional handyman services in the Lowcountry
                </p>
              </div>

              {/* Our Story */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12 mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <p className="text-lg text-gray-100 leading-relaxed mb-4">
                  LC Concepts was founded with a simple mission: to provide exceptional handyman services with integrity, reliability, and craftsmanship. We understand that your home is your most valuable investment, and we treat every project with the care and attention it deserves.
                </p>
                <p className="text-lg text-gray-100 leading-relaxed">
                  Serving the Bluffton and Hilton Head communities, we've built our reputation on quality work, honest pricing, and outstanding customer service. From small repairs to major installations, we bring professionalism and expertise to every job.
                </p>
              </div>

              {/* Our Values */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Quality</h3>
                    <p className="text-gray-100">We never compromise on the quality of our work or materials.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Reliability</h3>
                    <p className="text-gray-100">On-time service and dependable results you can count on.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Excellence</h3>
                    <p className="text-gray-100">Committed to exceeding expectations on every project.</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
                <p className="text-xl text-gray-200 mb-8">
                  Let us help you with your next home project
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('home');
                    setTimeout(() => {
                      const element = document.getElementById('contact');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="inline-block bg-white px-8 py-4 rounded-lg hover:opacity-90 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                  style={{ color: '#02377c' }}
                >
                  Request a Quote
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <img src="/LC Concepts LLC Logo.png" alt="LC Concepts Logo" className="h-10 w-10" />
                    <span className="text-2xl font-bold">LC Concepts</span>
                  </div>
                  <p className="text-gray-400">
                    Professional handyman services for all your home improvement needs.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><button onClick={() => setCurrentPage('home')} className="text-gray-400 hover:text-orange-600 transition-colors">Home</button></li>
                    <li><button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-orange-600 transition-colors">About Us</button></li>
                    <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => { const element = document.getElementById('contact'); element?.scrollIntoView({ behavior: 'smooth' }); }, 100); }} className="text-gray-400 hover:text-orange-600 transition-colors">Contact</button></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Contact Info</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>(843) 310-8707</li>
                    <li>contact@lcconcepts.com</li>
                    <li>Bluffton and Hilton Head</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                <p>&copy; 2024 LC Concepts. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
