import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-12 bg-gray-900 text-gray-400">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-3">AI LearnPlatform</h3>
                        <p className="text-sm">Revolutionizing education through artificial intelligence.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Courses</a></li> {/* Placeholder */}
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li> {/* Placeholder */}
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li> {/* Placeholder */}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-sm">
                    <p>&copy; {currentYear} AI LearnPlatform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
