"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EnrollCourseCard from './enroll-course-card';

const EnrollCourseList = () => {

    const [enrolledCoursesList, setEnrolledCoursesList] = useState([]);

    useEffect(() => {
        getEnrolledCourse();
    }, []);

    const getEnrolledCourse = async () => {
        const result = await axios.get("/api/enroll-course");
        console.log(result.data);
        setEnrolledCoursesList(result.data);
    };

    return enrolledCoursesList?.length > 0 && (
        <div className="mt-10 px-6">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Continue Learning your courses</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 py-8 max-w-7xl mx-auto mb-12'>
            {enrolledCoursesList?.map((course, index) => (
                <EnrollCourseCard course={course?.courses} enrollCourse={course?.enrollCourse} key={index} />
            ))}
            </div>
        </div>
    );
};

export default EnrollCourseList;