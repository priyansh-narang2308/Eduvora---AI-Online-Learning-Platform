"use client";

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, Settings, TrendingUp, Loader } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const CourseInfo = ({ course }) => {
    const courseLayout = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const generateCourseContent = async () => {
        // here is to call the api to generate the content
        setLoading(true);
        try {
            const result = await axios.post("/api/generate-course-content", {
                courseJson: courseLayout,
                courseTitle: courseLayout?.courseName,
                courseId: course?.cid
            });
            console.log(result.data);
            setLoading(false);
            router.replace("/workspace")
            toast.success("Course Content Generated!")
        } catch (error) {
            console.log("Error: ", error);
            setLoading(false);
            toast.error("Error! Please try again")
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:p-10">
            {course?.bannerImageUrl && (
                <div className="mb-8 rounded-3xl overflow-hidden shadow-md">
                    <Image
                        src={course.bannerImageUrl}
                        alt="Course banner"
                        width={1200}
                        height={400}
                        className="w-full h-60 md:h-80 object-cover aspect-auto"
                    />
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl p-8 space-y-10 border border-gray-200">

                <div className="space-y-3">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        {courseLayout?.courseName || "Course Title"}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {courseLayout?.courseDescription || "Course description goes here."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="text-blue-600 w-6 h-6" />
                            <h3 className="text-xl font-semibold text-gray-800">Duration</h3>
                        </div>
                        <p className="text-md text-gray-600">{courseLayout?.totalDuration || 'Approx. 8 hours'}</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="text-red-600 w-6 h-6" />
                            <h3 className="text-xl font-semibold text-gray-800">Difficulty</h3>
                        </div>
                        <p className="text-md text-gray-600">{courseLayout?.difficulty || 'Intermediate'}</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-2">
                            <Book className="text-green-600 w-6 h-6" />
                            <h3 className="text-xl font-semibold text-gray-800">Chapters</h3>
                        </div>
                        <p className="text-md text-gray-600">
                            {courseLayout?.chapters?.length || 0} Modules
                        </p>
                    </div>
                </div>

                <Button
                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-800"
                    onClick={generateCourseContent}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Generating Content…
                        </>
                    ) : (
                        <>
                            <Settings className="mr-2 h-4 w-4" />
                            Generate Content
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default CourseInfo;
