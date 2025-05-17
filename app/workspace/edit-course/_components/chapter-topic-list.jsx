import React, { useState } from 'react';
import {
    Clock, BookOpen, Check, ChevronDown, ChevronUp,
    Award, BookMarked, GraduationCap
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ChapterTopicList = ({ course }) => {
    const courseLayout = course?.courseJson?.course;
    const [expandedChapter, setExpandedChapter] = useState(null);

    const toggleChapter = (index) => {
        setExpandedChapter(expandedChapter === index ? null : index);
    };

    if (!courseLayout?.chapters?.length) {
        return (
            <div className="flex items-center justify-center p-10 text-gray-500">
                No course chapters available
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 bg-gray-50 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-8">
                <GraduationCap className="text-blue-600 h-8 w-8 mr-3" />
                <h1 className="text-2xl font-bold text-gray-800">Course Curriculum</h1>
            </div>

            <div className="space-y-4">
                {courseLayout.chapters.map((chapter, chapterIndex) => (
                    <motion.div
                        key={chapterIndex}
                        layout
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                        transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
                    >
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 transition-all"
                            onClick={() => toggleChapter(chapterIndex)}
                        >
                            <div className="flex items-center">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white mr-4">
                                    <span className="font-semibold">{chapterIndex + 1}</span>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg text-gray-800">{chapter.chapterName}</h2>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span className="mr-4">{chapter?.duration}</span>
                                        <BookOpen className="h-3 w-3 mr-1" />
                                        <span>{chapter?.topics?.length} Topics</span>
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedChapter === chapterIndex ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="h-5 w-5 text-blue-600" />
                            </motion.div>
                        </div>

                        <AnimatePresence initial={false}>
                            {expandedChapter === chapterIndex && (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="p-4 border-t border-gray-100"
                                >
                                    <ul className="space-y-3">
                                        {chapter?.topics.map((topic, topicIndex) => (
                                            <li key={topicIndex} className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-blue-600 mr-3">
                                                    <span className="text-xs font-medium">{topicIndex + 1}</span>
                                                </div>
                                                <span className="flex-1 text-gray-700">{topic}</span>
                                                <span className="text-xs text-gray-400 ml-2">
                                                    {topicIndex === chapter.topics.length - 1 ? (
                                                        <Award className="h-4 w-4 text-amber-500" />
                                                    ) : (
                                                        <BookMarked className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Chapter Completion */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <Check className="h-4 w-4 text-green-500 mr-1" />
                                            <span>Complete all topics to unlock the next chapter</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Award className="h-4 w-4 text-amber-500 mr-1" />
                                            <span>Bonus content</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Course Completion */}
            <div className="mt-6 flex flex-col items-center">
                <div className="h-16 w-1 bg-gradient-to-b from-indigo-600 to-green-500"></div>
                <div className="mt-2 p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                    <Award className="h-6 w-6 mr-2" />
                    <h2 className="font-bold">Course Completion</h2>
                </div>
            </div>
        </div>
    );
};

export default ChapterTopicList;
