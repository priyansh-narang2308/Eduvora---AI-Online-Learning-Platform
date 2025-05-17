"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CourseCard from '../_components/course-card';

const ExplorePage = () => {

    const [courseList, setCourseList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        user && getCourseInfo();
    }, [user]);
    const getCourseInfo = async () => {
        // courseid=0 means fetch all the courses not only by the user
        const result = await axios.get("/api/courses?courseId=0");
        console.log(result.data);
        setCourseList(result.data);
    };

    return (
        <div>
            <h2 className='font-bold text-3xl mb-6 p-4'>Explore More Courses</h2>
            <div className='flex gap-5 max-w-2xl'>
                <Input placeholder="Search..." />
                <Button className="cursor-pointer bg-blue-500 hover:bg-blue-800 max-w-md"> <SearchIcon /> Search</Button>
            </div>

                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 py-8 max-w-7xl mx-auto mb-12'>
                    {courseList?.map((course, index) => (
                        <CourseCard course={course} key={index} />
                    ))}
                </div>
            
        </div>
    );
};

export default ExplorePage;