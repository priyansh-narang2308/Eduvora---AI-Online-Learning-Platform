"use client";

import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

const Provider = ({ children }) => {

    const [userDetail, setUserDetail] = useState("");
    const [selectedChapterIndex, setSelectedChapterIndex] = useState("")

    const { user } = useUser();

    useEffect(() => {
        user && createNewUser();
    }, [user]);

    const createNewUser = async () => {
        const result = await axios.post("/api/user", {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        });
        console.log(result.data);
        setUserDetail(result.data);
    };

    return (
        <div>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                <SelectedChapterIndexContext.Provider value={{ selectedChapterIndex, setSelectedChapterIndex }} >
                    <div>
                        {children}
                    </div>
                </SelectedChapterIndexContext.Provider>
            </UserDetailContext.Provider>
        </div>
    );
};

export default Provider;