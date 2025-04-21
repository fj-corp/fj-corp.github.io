import { useState, useEffect } from "react";
import { db } from "./firebase";
import { MonthlyDataInterface, YearMonthPropsInterface } from "./Monthly-Data-Interface";
import { collection, getDocs } from 'firebase/firestore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import convertToMinutesSeconds from "./Seconds-To-Minutes-Function";

const MonthlyDataComponent: React.FC<YearMonthPropsInterface> = ({ data }) => {
    const [easyMonthlyData, setEasyMonthlyData] = useState<MonthlyDataInterface[]>([]);
    const [mediumMonthlyData, setMediumMonthlyData] = useState<MonthlyDataInterface[]>([]);
    const [hardMonthlyData, setHardMonthlyData] = useState<MonthlyDataInterface[]>([]);

    const [loading, setLoading] = useState(true);

    data.sort((a, b) => {
        const [yearA, monthA] = a.split("-").map(Number);
        const [yearB, monthB] = b.split("-").map(Number);
      
        if (yearA !== yearB) return yearA - yearB;
        return monthA - monthB;
    });


    useEffect(() => {
        
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const local_easyMonthlyData: MonthlyDataInterface[] = [];
                const local_mediumMonthlyData: MonthlyDataInterface[] = [];
                const local_hardMonthlyData: MonthlyDataInterface[] = [];

                // Fetch data for each month in parallel
                const fetchPromises = data.map(async (dateStr) => {
                    const newCollectionRef = `leetcode_data/monthly_data/${dateStr}`;
                    const thisMonthCollectionRef = collection(db, newCollectionRef);
                    const thisMonthDocRef = await getDocs(thisMonthCollectionRef);
            
                    thisMonthDocRef.docs.forEach((doc) => {
                        const docData = doc.data();
                        const newObjToBeSorted: MonthlyDataInterface = {
                            yearAndMonth: dateStr,
                            count: docData.count,
                            avg_time: convertToMinutesSeconds(docData.avg_time / 60),
                            min_time: convertToMinutesSeconds(docData.min_time / 60),
                            max_time: convertToMinutesSeconds(docData.max_time / 60),
                            min_time_question: docData.min_time_question,
                            max_time_question: docData.max_time_question,
                        };
            
                        if (doc.id === "Easy") {
                            local_easyMonthlyData.push(newObjToBeSorted);
                        } else if (doc.id === "Medium") {
                            local_mediumMonthlyData.push(newObjToBeSorted);
                        } else if (doc.id === "Hard") {
                            local_hardMonthlyData.push(newObjToBeSorted);
                        }
                    });
                });
            
                // Wait for all fetches to complete
                await Promise.all(fetchPromises);


                setEasyMonthlyData(local_easyMonthlyData);
                setMediumMonthlyData(local_mediumMonthlyData);
                setHardMonthlyData(local_hardMonthlyData);
            } catch (error) {
                console.error("Error fetching monthly data for line charts:", error);
            }
            finally {
                setLoading(false);
            }

        };

        fetchAllData();

    }, []);

    const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
              <div style={{
                backgroundColor: "#1f2937", // Tailwind's gray-800
                color: "#f9fafb",           // Tailwind's gray-100
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #374151", // Tailwind's gray-700
                boxShadow: "0 0 10px rgba(0,0,0,0.3)"
              }}>
                <p><strong>{label}</strong></p>
                <p>Count: {data.count}</p>
                <p>Avg Time: {data.avg_time} min</p>
                <p>Min Time: {data.min_time} min on Q: {data.min_time_question}</p>
                <p>Max Time: {data.max_time} min on Q: {data.max_time_question}</p>
              </div>
            );
          }
          return null;
        };



    return (
        <div className="mt-10">
            <h1 className='text-3xl text-white break-words font-light'>
                Here's a look at how much time (in minutes) I spent each month on Easy, Medium, and Hard problems. The graphs show data in that order.
            </h1>
        { loading ? (<div className="flex justify-center py-8">Loading graphs...</div>) 
            : (
                <>
                    <ResponsiveContainer width="100%" height={400} className="mt-6">
                        <LineChart data={easyMonthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="yearAndMonth" />
                            <YAxis dataKey="avg_time" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" name="Easy Count" />
                            <Line type="monotone" dataKey="avg_time" stroke="#98b65a" name="Average Time" />
                        </LineChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height={400} className="mt-6">
                        <LineChart data={mediumMonthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="yearAndMonth" />
                            <YAxis dataKey="avg_time" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" name="Medium Count" />
                            <Line type="monotone" dataKey="avg_time" stroke="#98b65a" name="Average Time" />
                        </LineChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height={400} className="mt-6">
                        <LineChart data={hardMonthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="yearAndMonth" />
                            <YAxis dataKey="avg_time" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" name="Hard Count" />
                            <Line type="monotone" dataKey="avg_time" stroke="#98b65a" name="Average Time" />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    )
};

export default MonthlyDataComponent;