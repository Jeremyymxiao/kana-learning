import Link from 'next/link';

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Company Info */}
            <div className="md:col-span-3 max-w-sm mx-auto md:mx-0 w-full text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">LearnKana</h3>
              <p className="text-gray-400 mb-4">
                Making Japanese learning accessible and enjoyable for everyone.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="md:col-span-3 max-w-sm mx-auto md:mx-0 w-full text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/chart" className="text-gray-400 hover:text-white transition-colors">Kana Chart</Link></li>
              </ul>
            </div>
  
            {/* Legal */}
            <div className="md:col-span-3 max-w-sm mx-auto md:mx-0 w-full text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/contact-us" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="md:col-span-3 max-w-sm mx-auto md:mx-0 w-full text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="https://iuu.ai/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">iuu AI</a></li>
                <li><a href="https://magicbox.tools/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">MagicBox.Tools</a></li>
                <li><a href="https://aiwith.me/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">AI With Me</a></li>
                <li><a href="https://allinai.tools" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">All in AI Tools</a></li>
                <li><a href="https://SeekAIs.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">SeekAIs</a></li>
                <li><a href="https://AIToolly.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">AIToolly</a></li>
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