import { FaLinkedin, FaXTwitter, FaFacebookF, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1 */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">M&M Coding Lingo</h2>
          <ul className="space-y-2">
            <li>Why Coding Lingo</li>
            <li>Board Of Directors</li>
            <li>Management Team</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Products</h3>
          <ul className="space-y-2">
            <li>Transcend Platform</li>
            <li>Digital Retail</li>
            <li>Intermediary Portals</li>
            <li>Originations</li>
            <li>Servicing</li>
            <li>Wholesale Finance</li>
            <li>Mobility Solutions</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Consultancy</h3>
          <ul className="space-y-2">
            <li>Information Security</li>
            <li>Digital Solutions</li>
            <li>AI, ML & Data Analytics</li>
            <li>Generative AI</li>
            <li>Emerging Technologies</li>
            <li>Cloud Services</li>
            <li>Data Engineering</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Insights</h3>
          <ul className="space-y-2">
            <li>Case Studies</li>
            <li>Industries</li>
            <li>Guides</li>
            <li>Blog</li>
            <li>Events</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Investors</h3>
          <ul className="space-y-2">
            <li>Company Information</li>
            <li>News</li>
            <li>Stock Data</li>
            <li>SEC Filings</li>
          </ul>
          </div>
        {/* column 6*/}
        <div>
          <h3 className="text-white font-semibold mt-6 mb-4">Marketplace</h3>
          <ul className="space-y-2">
            <li>Calculation Engine</li>
            <li>Document Generation</li>
            <li>API Library</li>
            <li>Loan Origination System</li>
            <li>Customer Care Portal</li>
            <li>Tax Calculation Engine</li>
          </ul>
        </div>

        {/* Column 7 */}
        <div>
          <h3 className="text-white font-semibold mb-4">Solutions</h3>
          <ul className="space-y-2">
            <li>Asset Finance</li>
            <li>Automotive Finance</li>
            <li>Equipment Finance</li>
          </ul>
        </div>
            {/*Column 8 */}
        <div>
          <h3 className="text-white font-semibold mt-6 mb-4">Contact Us</h3>
          <p className="text-sm">
            <strong>Office</strong> <br />
            Address: I-8 Markaz, Islamabad, Pakistan <br />
            Phone: +92 3175589136
          </p>

          <h3 className="text-white font-semibold mt-6 mb-2">Connect With Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-600 pt-6 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2025 M&M Coding Lingo Technologies. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a href="#">Terms of Use</a>
          <span>|</span>
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Human Rights Policy</a>
          <span>|</span>
          <a href="#">Modern Slavery Act</a>
        </div>
      </div>
    </footer>
  );
}
