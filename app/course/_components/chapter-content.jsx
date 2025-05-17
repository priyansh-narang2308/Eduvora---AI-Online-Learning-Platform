import { Button } from "@/components/ui/button";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import axios from "axios";
import { CheckCircle, Loader, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { toast } from "sonner";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import parse from "html-react-parser";

const ChapterContent = ({ courseInfo, refreshData }) => {
  const courseContent = courseInfo?.courses?.courseContent;
  const [loading, setLoading] = useState(false);
  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);

  const { courses, enrollCourse } = courseInfo ?? {};
  const selectedChapter = courseContent?.[selectedChapterIndex];
  const videoData = selectedChapter?.youtubeVideo;
  const topics = selectedChapter?.courseData?.topics;

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const completedChapters = enrollCourse?.completedChapters || [];
    setIsCompleted(completedChapters.includes(selectedChapterIndex));
  }, [selectedChapterIndex, enrollCourse]);

  const { courseId } = useParams();

  const markChapterCompleted = async () => {
    try {
      setLoading(true);
      const completedChapters = Array.isArray(enrollCourse?.completedChapters)
        ? [...enrollCourse.completedChapters]
        : [];

      if (!completedChapters.includes(selectedChapterIndex)) {
        completedChapters.push(selectedChapterIndex);
      }

      await axios.put("/api/enroll-course", {
        courseId: courseId,
        completedChapter: completedChapters,
      });

      setIsCompleted(true);
      refreshData();
      toast.success("Chapter Marked as Complete!");
    } catch (error) {
      toast.error("Failed to mark chapter as complete");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markChapterIncomplete = async () => {
    try {
      setLoading(true);
      const completedChapters = Array.isArray(enrollCourse?.completedChapters)
        ? [...enrollCourse.completedChapters]
        : [];

      const updatedCompletedChapters = completedChapters.filter(
        (chapter) => chapter !== selectedChapterIndex
      );

      await axios.put("/api/enroll-course", {
        courseId: courseId,
        completedChapter: updatedCompletedChapters,
      });

      setIsCompleted(false);
      refreshData();
      toast.error("Chapter Marked as Incomplete!");
    } catch (error) {
      toast.error("Failed to mark chapter as incomplete");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to parse and render HTML content with syntax highlighting for <pre><code> blocks
  const renderContentWithSyntaxHighlighting = (htmlContent) => {
    return parse(htmlContent, {
      replace: (domNode) => {
        if (
          domNode.name === "pre" &&
          domNode.children.length > 0
        ) {
          const codeNode = domNode.children.find(
            (child) => child.name === "code"
          );
          if (codeNode) {
            const codeText = codeNode.children[0]?.data || "";
            const languageClass = codeNode.attribs?.class || "";
            const language = languageClass.replace("language-", "") || "text";

            return (
              <SyntaxHighlighter
                language={language}
                style={oneLight}
                wrapLongLines={true}
                showLineNumbers={true}
                className="rounded-lg my-4 shadow-md"
                customStyle={{ maxWidth: '100%', overflowX: 'auto' }}
              >
                {codeText}
              </SyntaxHighlighter>
            );
          }
        }
      },
    });
  };

  return (
    <div className="w-full max-w-full px-4 py-6 md:px-6 lg:px-8 overflow-hidden">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="max-w-full overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 break-words">
            {selectedChapterIndex + 1}.{" "}
            {selectedChapter?.courseData?.chapterName}
          </h2>
          <p className="text-gray-800 font-semibold mt-2 text-base md:text-lg">
            Explore videos and topics covered in this chapter.
          </p>
        </div>

        <div className="self-start sm:self-auto">
          {loading ? (
            <Button
              disabled
              className="cursor-not-allowed bg-gray-500 hover:bg-gray-500 whitespace-nowrap"
            >
              <Loader className="animate-spin mr-2 h-4 w-4" />
              Updating...
            </Button>
          ) : !isCompleted ? (
            <Button
              onClick={markChapterCompleted}
              className="cursor-pointer bg-blue-700 hover:bg-blue-900 whitespace-nowrap"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Complete
            </Button>
          ) : (
            <Button
              onClick={markChapterIncomplete}
              className="cursor-pointer bg-red-700 hover:bg-red-900 whitespace-nowrap"
            >
              <X className="mr-2 h-4 w-4" />
              Mark as Incomplete
            </Button>
          )}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Related Videos 🎥
        </h3>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {videoData?.slice(0, 2)?.map((video, index) => (
            <div
              key={index}
              className="w-full overflow-hidden rounded-md shadow-sm border border-gray-200"
            >
              <div className="aspect-video">
                <YouTube
                  videoId={video?.videoId}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: { modestbranding: 1 },
                  }}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Section */}
      <div className="mt-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Topics Covered 📚
        </h3>
        <div className="space-y-6">
          {topics?.map((topic, index) => (
            <div
              key={index}
              className="p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <h4 className="text-xl md:text-2xl font-semibold text-blue-600 mb-2 break-words">
                {index + 1}. {topic?.topic}
              </h4>
              <div className="text-sm md:text-base leading-7 text-gray-900 overflow-x-auto">
                {renderContentWithSyntaxHighlighting(topic?.content || "")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterContent;