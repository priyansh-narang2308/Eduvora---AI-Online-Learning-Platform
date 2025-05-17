"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseInfo from '../_components/course-info';
import ChapterTopicList from '../_components/chapter-topic-list';

const EditCourse = ({ viewCourse = false }) => {

    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState("");

    const { courseId } = useParams();

    useEffect(() => {
        getCourseData();
    }, []);

    const getCourseData = async () => {
        setLoading(true);
        const result = await axios.get(`/api/courses?courseId=${courseId}`);
        console.log(result.data);
        setLoading(false);
        setCourse(result.data);
    };

    return (
        <div>
            <CourseInfo course={course} viewCourse={viewCourse} />
            <ChapterTopicList course={course} />
        </div>
    );
};

export default EditCourse;