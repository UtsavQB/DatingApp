import React from 'react';
import Sidebar from '../common/Sidebar1';

const About = () => {
    const reasons = [
        { title: "Match Beyond the Swipe", description: "We go beyond surface-level matches, connecting you with people who share your passions and values." },
        { title: "Smart Matching Technology", description: "Our advanced algorithms learn about you and your preferences to deliver personalized matches every day." },
        { title: "Safety First", description: "We prioritize your peace of mind with strict verification processes and in-app security features." },
        { title: "For Everyone", description: "LoveNest is an inclusive platform for all orientations, genders, and relationship goals." },
    ];

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            {/* Sidebar */}
            <div className="lg:w-1/4">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 p-8 flex justify-center pe-52">
                <div className="max-w-4xl mx-auto bg-white shadow-md  rounded-lg p-6">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center">
                        About <span className="text-pink-600">LoveNest</span>
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
                        Welcome to <strong className="text-pink-600">LoveNest</strong>, where your journey to meaningful connections begins!
                    </p>

                    {/* Why LoveNest Section */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Why LoveNest?</h2>
                    <ul className="list-disc pl-6 space-y-4 text-gray-700">
                        {reasons.map((reason, index) => (
                            <li key={index} className="text-lg">
                                <strong className="text-pink-600">{reason.title}:</strong> {reason.description}
                            </li>
                        ))}
                    </ul>

                    {/* Our Vision Section */}
                    <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">Our Vision</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        We believe in creating a world where everyone can find a connection that feels right. Whether it's your next great romance, a meaningful friendship, or simply a fun date, LoveNest is here to help you take that first step.
                    </p>

                    {/* Call to Action */}
                    <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-4">Start Your Story Today</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Download <strong className="text-pink-600">LoveNest</strong> today and discover the joy of authentic connections. Your match is waiting!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
