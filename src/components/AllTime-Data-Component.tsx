import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import AllTimeDataInterface from "./AllTime-Data-Interface";
import convertToMinutesSeconds from "./Seconds-To-Minutes-Function";

/*
    Component is responsbile for just showing Easy: {count, avg_time}, Medium... You get the idea.
    The data sits right underneath "Raw historical data yada yada" and above the search box.
*/

const AllTimeDataComponent = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [allData, setAllData] = useState<Record<string, AllTimeDataInterface>>({});


    useEffect(() => {

        const fetchAllData = async () => {
            try {
                const localDictionary: Record<string, AllTimeDataInterface> = {};

                const leetcodeCollectionRef = collection(db, "leetcode_data");
                const running_DifficultyCountData_Ref = await getDocs(leetcodeCollectionRef);
                running_DifficultyCountData_Ref.docs.forEach((doc) => {
                    const docData = doc.data();
                    if (doc.id === 'running_difficulty_count_data') {
                        for (const key in docData) {
                            if (!localDictionary[key]) {
                                localDictionary[key] = { count: 0, avg_time: 0 };
                            }
                            localDictionary[key].count = docData[key];
                        }
                    } else if (doc.id === 'running_difficulty_time_data') {
                        for (const key in docData) {
                            if (!localDictionary[key]) {
                                localDictionary[key] = { count: 0, avg_time: 0 };
                            }
                            localDictionary[key].avg_time = convertToMinutesSeconds(docData[key] / 60);
                        }
                    }
                    
                });

                setAllData(localDictionary);

            }
            catch (error) {
                console.error("Error fetching running_difficulty documents: ", error);
            } finally {
                setLoading(false);
            }

        };

        fetchAllData();

    }, []);

    return (
        <>
            {loading ? (
                <div className="flex justify-center py-8">Loading all data...</div>
            ) : (
                <div className="flex flex-row items-center justify-center mt-6 px-2 space-x-8">
                    <p className="text-lg">
                        Easy: {allData["Easy"]?.count} problems, {allData["Easy"]?.avg_time} min average time
                    </p>
                    <p className="text-lg">
                        Medium: {allData["Medium"]?.count} problems, {allData["Medium"]?.avg_time} min average time
                    </p>
                    <p className="text-lg">
                        Hard: {allData["Hard"]?.count} problems, {allData["Hard"]?.avg_time} min average time
                    </p>
                </div>
            )}
        </>
    );

};

export default AllTimeDataComponent;