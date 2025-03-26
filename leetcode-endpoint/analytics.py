class Analytics:
    def __init__(self):
        self.count = 0
        self.avg_time = 0
        self.min_time = float("inf")
        self.max_time = 0
        self.min_time_question = ""
        self.max_time_question = ""

    def __str__(self):
        return f"Count: {self.count}, Avg Time: {self.avg_time}, Min Time: {self.min_time}, Max Time: {self.max_time}, Min Time Question: {self.min_time_question}, Max Time Question: {self.max_time_question}"
    
    def update_count(self):
        self.count += 1

    def update_times(self, time, question):
        self.avg_time = (self.avg_time + time) / self.count

        if time < self.min_time:
            self.min_time = time
            self.min_time_question = question

        if time > self.max_time:
            self.max_time = time
            self.max_time_question = question
