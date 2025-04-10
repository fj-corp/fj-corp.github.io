import google.auth
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import os
from collections import defaultdict
from analytics import Analytics
from firebaseAuth import initializeFirebase
from setEnvironmentVariables import setEnvVariables

def getLeetcodeSheet():
    try:
        credentials, project = google.auth.default()
        service = build('sheets', 'v4', credentials=credentials)
        sheet = service.spreadsheets().values().get(spreadsheetId=os.environ.get("SPREADSHEET_ID"), range=os.environ.get("SPREADSHEET_RANGE")).execute()
        return sheet

    except HttpError as e:
        print(f"An error occurred during execution of getLeetcodeSheet: {e}")
        return None
    
def readLeetcodeSheet() -> tuple:
    sheet = getLeetcodeSheet() # get the excel sheet

    monthlyData = defaultdict(lambda: defaultdict(Analytics)) # 2024-10 -> {'Easy' -> [count, avg_time, min_time, max_time, question x 2], 'Medium', 'Hard'}
    runningDifficultyTimeCounter = defaultdict(int) # Easy, Medium, Hard
    runningDifficultyCount = defaultdict(int) # Easy, Medium, Hard
    sanitizedOriginalData = []
    if sheet:
        values = sheet.get("values", [])
        # ['Question #. Question Name', 'Time Spent', 'Difficulty', 'Addtional Comments', 'Worth Reviewing', 'Date Completed (YYYY-MM-DD)', 'Daily']
        # Main graphing data loop over
        for rowIdx in range(1, len(values)):
            currRow = values[rowIdx]

            date = currRow[5]
            difficulty = currRow[2]
            timeSpent = currRow[1]
            question = currRow[0]

            
            if date in ("End of 150", "") or timeSpent == "N/A":
                continue


            split_date = date.split("/")
            monthPlusYearDate = f"{split_date[2]}-{split_date[0]}" # year-month

            analyticsObj = monthlyData[monthPlusYearDate][difficulty]
            analyticsObj.update_count()

            formatTime = timeSpent.split(":")
            timeSpent = (int(formatTime[0]) * 60 + int(formatTime[1])) * 60 + int(formatTime[2])

            question = question.split(". ")
            question = '-'.join(question)

            analyticsObj.update_times(timeSpent, question)

            runningDifficultyTimeCounter[difficulty] += timeSpent 
            runningDifficultyCount[difficulty] += 1

            monthPlusYearPlusDate = f"{split_date[2]}-{split_date[0]}-{split_date[1]}" # year-month-day, lexicographically sorted for javascript to sort easily
            sanitizedOriginalData.append([currRow[0], currRow[1], difficulty, currRow[3], currRow[4], monthPlusYearPlusDate, currRow[6]])


        # Just updating 'runningDifficultyTimeCounter' to get average from 'runningDifficultyTimeCounter' of how many questions were done
        for difficulty, count in runningDifficultyCount.items():
            runningDifficultyTimeCounter[difficulty] = runningDifficultyTimeCounter[difficulty] // count

    return monthlyData, runningDifficultyTimeCounter, runningDifficultyCount, sanitizedOriginalData
        

def uploadToFirestore(monthlyData: dict, runningDifficultyTimeCounter: dict, runningDifficultyCount: dict, originalData: list) -> bool:
    firestoreDb = initializeFirebase() # initialize firebase db
    collectionRef = firestoreDb.collection("leetcode_data") # collection reference

    monthPlusYearRef = collectionRef.document("monthly_data") # monthly data document reference 
    for monthPlusYearDate, difficultyData in monthlyData.items():
        monthPlusYearCollectionRef = monthPlusYearRef.collection(monthPlusYearDate)
        for difficulty, analyticsObj in difficultyData.items():
            monthPlusYearCollectionRef.document(difficulty).set({
                "count": analyticsObj.count,
                "avg_time": analyticsObj.avg_time,
                "min_time": analyticsObj.min_time,
                "max_time": analyticsObj.max_time,
                "min_time_question": analyticsObj.min_time_question,
                "max_time_question": analyticsObj.max_time_question
            }, merge=True)

    runningDifficultyTimeCounterRef = collectionRef.document("running_difficulty_time_data")
    for difficulty, time in runningDifficultyTimeCounter.items():
        runningDifficultyTimeCounterRef.set({
            difficulty: time
        }, merge=True)

    runningDifficultyCountRef = collectionRef.document("running_difficulty_count_data")
    for difficulty, count in runningDifficultyCount.items():
        runningDifficultyCountRef.set({
            difficulty: count
        }, merge=True)

    originalDataRef = collectionRef.document("original_data")
    for idx, data in enumerate(originalData):
        originalDataRef.collection("submissions").document(str(idx)).set({
            "question": data[0],
            "time_spent": data[1],
            "difficulty": data[2],
            "additional_comments": data[3],
            "worth_reviewing": data[4],
            "date_completed": data[5],
            "daily": data[6]
        }, merge=True)


    return True

if __name__ == "__main__":
    try:
        setEnvVariables()
        monthlyData, runningDifficultyTimeCounter, runningDifficultyCount, originalData = readLeetcodeSheet()
        uploadToFirestore(monthlyData, runningDifficultyTimeCounter, runningDifficultyCount, originalData)
        print("Firestore upload successfully.")
    except Exception as e:
        print(e)
        


# @functions_framework.cloud_event
# def leetcode_ETL(cloud_event):
#     """Background Cloud Function to be triggered by Cloud Scheduler.
#     Args:
#         cloud_event (CloudEvent): The CloudEvent that triggered this function.
#     """
#     try:
#         # Get the current time in EST
#         est_timezone = pytz.timezone('US/Eastern')
#         current_time_est = datetime.datetime.now(est_timezone)
#         print(f"Function triggered at: {current_time_est.strftime('%Y-%m-%d %H:%M:%S %Z%z')}")

#         monthlyData, runningDifficultyTimeCounter, runningDifficultyCount = readLeetcodeSheet()
#         uploadToFirestore(monthlyData, runningDifficultyTimeCounter, runningDifficultyCount)
#         print("Firestore upload successfully.")
#     except Exception as e:
#         print(f"Error: {e}")