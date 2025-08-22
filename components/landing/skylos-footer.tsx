import { Facebook, Instagram, Twitter, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"

const data = {
  facebookLink: "https://facebook.com/skylos",
  instaLink: "https://instagram.com/skylos",
  twitterLink: "https://twitter.com/skylos",
  githubLink: "https://github.com/skylos",
  linkedinLink: "https://linkedin.com/company/skylos",
  contact: {
    email: "hello@skylos.ai",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
  },
  company: {
    name: "Skylos",
    ctaMessage: "Transform your business with proper AI solutions. We specialize in building intelligent applications that drive real results.",
  },
}

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
  { icon: Twitter, label: "Twitter", href: data.twitterLink },
  { icon: Linkedin, label: "LinkedIn", href: data.linkedinLink },
  { icon: Github, label: "GitHub", href: data.githubLink },
]

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
]

export default function SkylosFooter() {
  return (
    <>
      <style>{`
        .ai-footer {
          background-color: #0d1421;
          position: relative;
          overflow: hidden;
        }

        .ai-footer::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.3;
          background: #7a288a;
          filter: blur(140px);
          height: 60%;
          width: 50%;
          position: absolute;
          top: 20%;
          left: -25%;
          z-index: 0;
        }

        .ai-footer::after {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.2;
          background: #241b50;
          filter: blur(120px);
          height: 40%;
          width: 40%;
          position: absolute;
          bottom: 10%;
          right: -20%;
          z-index: 0;
        }

        .footer-container {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 30px 30px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 60px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .brand-icon {
          width: 50px;
          height: 50px;
          background: #7a288a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Lexend", sans-serif;
          font-weight: 700;
          font-size: 20px;
          color: #ffffff;
        }

        .brand-name {
          font-family: "Lexend", sans-serif;
          font-weight: 700;
          font-size: 28px;
          color: #ffffff;
          text-transform: uppercase;
        }

        .brand-description {
          font-family: "Lexend";
          font-size: 18px;
          line-height: 1.6;
          color: #ffffff;
          margin-bottom: 40px;
          max-width: 500px;
          font-weight: 500;
        }

        .social-links {
          display: flex;
          gap: 20px;
        }

        .social-link {
          width: 45px;
          height: 45px;
          background: rgba(122, 40, 138, 0.1);
          border: 1px solid #333;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7a288a;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #7a288a;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
        }

        .contact-title {
          font-family: "Lexend", sans-serif;
          font-weight: 700;
          font-size: 24px;
          color: #ffffff;
          margin-bottom: 30px;
        }

        .contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .contact-list-item {
          margin-bottom: 20px;
        }

        .contact-form {
          background: rgba(122, 40, 138, 0.1);
          border: 1px solid #333;
          border-radius: 12px;
          padding: 30px;
          margin-top: 20px;
        }

        .form-title {
          font-family: "Lexend", sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: #ffffff;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          font-family: "Lexend", sans-serif;
          font-size: 14px;
          color: #b39ddb;
          margin-bottom: 8px;
          display: block;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #444;
          border-radius: 8px;
          color: #ffffff;
          font-family: "Lexend", sans-serif;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;
          border-color: #7a288a;
          background: rgba(255, 255, 255, 0.08);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-submit {
          width: 100%;
          padding: 14px 20px;
          background: #7a288a;
          border: none;
          border-radius: 8px;
          color: #ffffff;
          font-family: "Lexend", sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-submit:hover {
          background: #8e2a9e;
          transform: translateY(-1px);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .contact-icon {
          width: 20px;
          height: 20px;
          color: #7a288a;
          flex-shrink: 0;
        }

        .footer-bottom {
          border-top: 1px solid #333;
          padding-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright {
          font-family: "lexend";
          font-size: 14px;
          color: #aaa;
        }

        .copyright a {
          color: #7a288a;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .copyright a:hover {
          color: #ffffff;
        }

        .footer-legal {
          display: flex;
          gap: 30px;
        }

        .footer-legal a {
          font-family: "Lexend";
          font-size: 14px;
          color: #aaa;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-legal a:hover {
          color: #ffffff;
        }

        /* Responsive Design */
        @media screen and (max-width: 1199px) {
          .footer-container {
            padding: 60px 20px 20px;
          }
          
          .footer-grid {
            gap: 60px;
          }
        }

        @media screen and (max-width: 767px) {
          .footer-container {
            padding: 40px 16px 16px;
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .brand-name {
            font-size: 24px;
          }
          
          .brand-description {
            font-size: 14px;
          }
          
          .social-links {
            gap: 15px;
          }
          
          .social-link {
            width: 40px;
            height: 40px;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .footer-legal {
            gap: 20px;
          }
        }
      `}</style>

      <footer className="ai-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand-logo">
                <div className="brand-icon">S</div>
                <span className="brand-name">{data.company.name}</span>
              </div>
              <p className="brand-description">{data.company.ctaMessage}</p>
              <div className="social-links">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="social-link" aria-label={label}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-contact">
              <h2 className="contact-title">Get In Touch</h2>
              <ul className="contact-list">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text} className="contact-list-item">
                    <div className="contact-item">
                      <Icon className="contact-icon" size={20} />
                      {isAddress ? <address style={{ fontStyle: "normal" }}>{text}</address> : <span>{text}</span>}
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="contact-form">
                <h3 className="form-title">Tell us about your AI challenge</h3>
                <form>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="form-input" 
                      placeholder="Your name"
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-input" 
                      placeholder="your@email.com"
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="business-type">Business Type</label>
                    <select id="business-type" name="business-type" className="form-select" required>
                      <option value="">Select your industry</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="retail">Retail & E-commerce</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="technology">Technology</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="challenge">What's your AI challenge?</label>
                    <textarea 
                      id="challenge" 
                      name="challenge" 
                      className="form-textarea" 
                      placeholder="Describe the business problem you'd like to solve with AI..."
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="form-submit">
                    Get AI Solution Proposal
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              &copy; 2025 {data.company.name}. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}