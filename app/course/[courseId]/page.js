"use client";

import React, { useEffect, useState } from 'react';
import ChapterListSidebar from '../_components/chapter-list-sidebar';
import ChapterContent from '../_components/chapter-content';
import axios from 'axios';
import { useParams } from 'next/navigation';

const Course = () => {

    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();

    useEffect(() => {
        getEnrolledCourseById();
    }, []);

    const getEnrolledCourseById = async () => {
        const result = await axios.get(`/api/enroll-course?courseId=${courseId}`);
        console.log(result.data);
        setCourseInfo(result.data);
    };

    return (
        <div>
            <div className='flex gap-10'>
                <ChapterListSidebar courseInfo={courseInfo} />
                <ChapterContent courseInfo={courseInfo} refreshData={()=>getEnrolledCourseById()} />
            </div>
        </div>
    );
};

export default Course;