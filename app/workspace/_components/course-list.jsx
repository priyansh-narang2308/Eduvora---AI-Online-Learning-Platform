"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AddNewCourseDialog from './add-new-course-dialog';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import CourseCard from './course-card';

const CourseList = () => {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && getCourseInfo();
    }, [user]);
    const getCourseInfo = async () => {
        const result = await axios.get("/api/courses");
        console.log(result.data);
        setCourseList(result.data);
    };

    return (
        <div className="mt-10 px-6">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Your Courses</h2>

            {courseList?.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 p-10 bg-secondary border border-gray-200 rounded-xl shadow-sm text-center">
                    <Image src="/online-education.png" alt="No Courses" width={100} height={100} className="opacity-90" />
                    <h3 className="text-2xl font-semibold text-gray-700">
                        No courses created yet
                    </h3>
                    <p className="text-md text-gray-500 max-w-md">
                        Start building your course and share your knowledge with the world. It's quick and easy.
                    </p>
                    <AddNewCourseDialog>
                        <Button className="mt-3 bg-blue-600 text-white cursor-pointer hover:bg-blue-800 transition-all">
                            Create Your First Course
                        </Button>
                    </AddNewCourseDialog>
                </div>
            ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 py-8 max-w-7xl mx-auto mb-12'>
                        {courseList?.map((course, index) => (
                            <CourseCard course={course} key={index} />
                        ))}
                    </div>
            )}
        </div>
    );
};

export default CourseList;
