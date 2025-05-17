import { BookOpen, ChevronDown, Menu, CheckCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from "react";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import Link from "next/link"

const ChapterListSidebar = ({ courseInfo }) => {
    const course = courseInfo?.courses;
    const courseContent = courseInfo?.courses?.courseContent;
    const enrollCourse = courseInfo?.enrollCourse;
    const completedChapters = enrollCourse?.completedChapters || [];

    const [openChapter, setOpenChapter] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterIndexContext);

    const toggleChapter = (index) => {
        setOpenChapter(openChapter === index ? null : index);
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden sticky flex items-center justify-between px-4 py-4 bg-gray-100 border-b border-gray-300 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800">{course?.courseName}</h2>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className="text-gray-700" />
                </button>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-80 bg-gray-100 min-h-screen border-r border-gray-600 shadow-sm sticky top-0">
                <SidebarContent
                    course={course}
                    courseContent={courseContent}
                    openChapter={openChapter}
                    toggleChapter={toggleChapter}
                    setSelectedChapterIndex={setSelectedChapterIndex}
                    completedChapters={completedChapters}
                />
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-white w-full h-full md:hidden overflow-y-auto shadow-lg"
                    >
                        <SidebarContent
                            course={course}
                            courseContent={courseContent}
                            openChapter={openChapter}
                            toggleChapter={toggleChapter}
                            setSelectedChapterIndex={(index) => {
                                setSelectedChapterIndex(index);
                                setMenuOpen(false); // Close on select
                            }}
                            completedChapters={completedChapters}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const SidebarContent = ({ course, courseContent, openChapter, toggleChapter, setSelectedChapterIndex, completedChapters }) => (
    <div className="flex sticky flex-col w-full top-0">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-100 bg-gray-200">
            <div className="mb-4">
                <Link href="/workspace">
                    <div className="inline-flex items-center gap- font-medium text-sm bg-black text-white transition px-3 py-1.5 rounded-lg">
                        <ArrowLeft size={16} />
                        Back to Home
                    </div>
                </Link>
            </div>

            <h2 className="text-3xl font-bold text-gray-800">{course?.courseName}</h2>
            <div className="flex items-center mt-2 text-gray-600">
                <BookOpen size={16} className="mr-2" />
                <span className="text-md">{course?.numberOfChapters} Chapters • {course?.difficulty}</span>
            </div>
        </div>


        <div className="flex-1 overflow-y-auto px-5 py-5">
            <h3 className="text-md font-semibold text-gray-600 mb-4 uppercase tracking-wider">
                Course Content
            </h3>

            <div className="space-y-2">
                {courseContent?.map((chapter, index) => {
                    const isCompleted = completedChapters.includes(index);
                    return (
                        <div
                            onClick={() => setSelectedChapterIndex(index)}
                            key={index}
                            className={`rounded-lg overflow-hidden border ${isCompleted ? "border-green-300 bg-green-50" : "border-gray-100 bg-white"} hover:border-gray-200 transition-all shadow-sm`}
                        >
                            <button
                                onClick={() => toggleChapter(index)}
                                className="w-full text-left p-4 flex items-center justify-between group"
                            >
                                <div className="flex items-center">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium mr-3 ${isCompleted ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-600"}`}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className={`text-base font-medium ${isCompleted ? "text-green-800" : "text-gray-800"} group-hover:text-blue-600 transition-colors flex items-center gap-2`}>
                                            {chapter?.courseData?.chapterName}
                                            {isCompleted && <CheckCircle size={20} className="text-green-600 mb-7 ml-10" />}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {chapter?.courseData?.topics?.length} topics
                                        </p>
                                    </div>
                                </div>
                                <ChevronDown
                                    size={18}
                                    className={`transition-transform duration-200 text-gray-400 group-hover:text-blue-500 ${openChapter === index ? "rotate-180 text-blue-500" : ""}`}
                                />
                            </button>

                            <AnimatePresence>
                                {openChapter === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="px-4 pb-3"
                                    >
                                        <div className="pl-11 mt-1 space-y-2">
                                            {chapter?.courseData?.topics?.map((topic, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="p-2 pl-3 rounded-md hover:bg-gray-50 transition flex items-center text-sm text-gray-700 border-l-2 border-blue-200 hover:border-blue-600"
                                                >
                                                    <span className="truncate">{topic?.topic || `Topic ${idx + 1}`}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

export default ChapterListSidebar;
