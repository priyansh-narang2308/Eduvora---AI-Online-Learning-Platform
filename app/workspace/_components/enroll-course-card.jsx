import Image from 'next/image';
import React from 'react';
import { Book, Video, Layers, BrainCircuit, FolderGit2, Clock, VideoIcon, Settings, PlayCircleIcon, Loader, LoaderCircle, PlayCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';


const EnrollCourseCard = ({ course, enrollCourse }) => {

    const courseJson = course?.courseJson?.course;

  const calculatePerProgress = () => {
    const completed = enrollCourse?.completedChapters?.length ?? 0;
    const total = course?.courseContent?.length ?? 1; 
    return ((completed / total) * 100).toFixed(0); 
  };


    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full h-full flex flex-col border border-gray-200 overflow-hidden">
            <div className="relative h-48 w-full">
                <Image
                    src={course?.bannerImageUrl || '/default-course-banner.jpg'}
                    alt={courseJson?.courseName || 'Course banner'}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start gap-3 mb-4">
                    <Layers className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 line-clamp-2">
                        {courseJson?.courseName || 'Python Course'}
                    </h2>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed line-clamp-3 mb-6">
                    {courseJson?.courseDescription || 'Learn Python programming fundamentals'}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-base text-gray-600 mt-auto mb-6">
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                        <Book className="w-5 h-5 text-blue-600" />
                        <span>{courseJson?.numberOfChapters || 0} Chapters</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                        <BrainCircuit className="w-5 h-5 text-purple-600" />
                        <span>{courseJson?.difficulty || 'Intermediate'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                        <FolderGit2 className="w-5 h-5 text-teal-600" />
                        <span>{courseJson?.category || 'Programming'}</span>
                    </div>
                    {courseJson?.includeVideo && (
                        <div className="flex items-center gap-2 bg-rose-100 px-3 py-1 rounded-full text-rose-700">
                            <Video className="w-5 h-5" />
                            <span>Videos</span>
                        </div>
                    )}
            <div className="w-full space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-blue-800">Progress</span>
                <span className="text-lg font-semibold text-blue-800">{calculatePerProgress()}%</span>
              </div>
              <Progress value={calculatePerProgress()} />
            </div>

            <Link
              href={`/workspace/view-course/${course?.cid}`}
              className="mt-auto  w-full bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
           <PlayCircle/>  Continue Learning
            </Link>


                </div>

                {/* Chapters List */}
                {/* <div className="mt-4 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Chapters Overview</h3>
          <ul className="space-y-2">
            {courseJson?.chapters?.slice(0, 3).map((chapter, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-800 font-medium text-lg">{chapter.chapterName}</span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" /> {chapter.duration}
                </span>
              </li>
            ))}
            {courseJson?.chapters?.length > 3 && (
              <li className="text-center text-gray-500 text-lg">
                +{courseJson.chapters.length - 3} more chapters
              </li>
            )}
          </ul>
        </div> */}

               

            </div>
        </div>
    );
};

export default EnrollCourseCard;