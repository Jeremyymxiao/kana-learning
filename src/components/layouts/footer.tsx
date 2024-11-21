import Link from 'next/link';

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Company Info */}
            <div className="md:col-span-4 max-w-sm mx-auto md:mx-0 w-full text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">LearnKana</h3>
              <p className="text-gray-400 mb-4">
                Making Japanese learning accessible and enjoyable for everyone.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="md:col-span-4 max-w-sm mx-auto md:mx-0 w-full text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/chart" className="text-gray-400 hover:text-white transition-colors">Kana Chart</Link></li>
                <li><Link href="/test" className="text-gray-400 hover:text-white transition-colors">Practice</Link></li>
              </ul>
            </div>
  
            {/* Legal */}
            <div className="md:col-span-4 max-w-sm mx-auto md:mx-0 w-full text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href={{ pathname: '/terms-of-service' }} className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href={{ pathname: '/privacy-policy' }} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href={{ pathname: '/cookie-policy' }} className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link href={{ pathname: '/contact-us' }} className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} LearnKana. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-4 md:mt-0">
                Made with ❤️ for Japanese learners worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }