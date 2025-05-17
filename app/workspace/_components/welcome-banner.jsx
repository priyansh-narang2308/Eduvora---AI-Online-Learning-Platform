import React from 'react';

const WelcomeBanner = () => {
    return (
        <div className="p-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">
                Ready to Elevate Your Learning?
            </h2>
            <p className="text-md opacity-90">
                Dive into expert-led courses, explore powerful tools, and transform your knowledge into skills.
            </p>
        </div>
    );
};

export default WelcomeBanner;
