"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Loader, Sparkle } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {useRouter} from "next/navigation"
import { toast } from "sonner";

const AddNewCourseDialog = ({ children }) => {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        courseName: "",
        courseDescription: "",
        includeVideo: false,
        numberOfChapters: 1,
        category: "",
        difficulty: ""
    });

    const router=useRouter()

    const onHandleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        console.log(formData);
    };

    const onGenerateCourse = async () => {
        const courseId = uuidv4();
        try {
            setLoading(true);
            const result = await axios.post("/api/generate-course-layout", {
                ...formData,
                courseId: courseId
            });
            console.log(result.data);
            if (result.data.resp ==="limit exceeded"){
                toast.warning("Please Subscribe to plan!")
                router.push("/workspace/billing")
            }
            toast.success("Course Created Successfully!")
            setLoading(false);
            router.push(`/workspace/edit-course/${result.data?.courseId}`)
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Error in creating course")
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create New Course</DialogTitle>
                    <DialogDescription>
                        Fill in the course details below to get started.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 mt-4">
                    <div className="space-y-2">
                        <Label>Course Name</Label>
                        <Input
                            placeholder="Enter course name..."
                            onChange={(event) => onHandleInputChange("courseName", event?.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Course Description</Label>
                        <Textarea
                            placeholder="Enter a brief description..."
                            className="resize-none"
                            onChange={(event) => onHandleInputChange("courseDescription", event?.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Number of Chapters</Label>
                        <Input type="number" min={1} placeholder="Enter number of chapters"
                            onChange={(event) => onHandleInputChange("numberOfChapters", event?.target.value)} />
                    </div>

                    <div className="flex items-center  gap-3">
                        <Label htmlFor="include-video">Include Video</Label>
                        <Switch id="include-video" onCheckedChange={() => onHandleInputChange("includeVideo", !formData?.includeVideo)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Difficulty Level</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                    {formData.difficulty || "Select Difficulty"}
                                </Button>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                                    <DropdownMenuItem
                                        key={level}
                                        onClick={() => onHandleInputChange("difficulty", level)}
                                    >
                                        {level}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Input placeholder="e.g., Programming, Design, Marketing" onChange={(event) => onHandleInputChange("category", event?.target.value)} />
                    </div>
                </div>

                <div className="items-center justify-center flex gap-3 pt-6">
                    <Button disabled={loading} onClick={onGenerateCourse} type="submit" className="bg-blue-600 w-full text-white hover:bg-blue-800 cursor-pointer">
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader className="animate-spin" />
                                <div>Generating Course</div>
                            </div>
                        ) : (
                            <>
                                <Sparkle />
                                Generate Course
                            </>
                        )}


                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddNewCourseDialog;
