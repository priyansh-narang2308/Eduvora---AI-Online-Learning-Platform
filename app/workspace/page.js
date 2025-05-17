import React from 'react'
import WelcomeBanner from './_components/welcome-banner';
import CourseList from './_components/course-list';
import EnrollCourseList from './_components/enroll-course-list';

const Workspace = () => {
  return (
    <div>
      <WelcomeBanner/>
      <EnrollCourseList/>
      <CourseList/>
    </div>
  )
}

export default Workspace