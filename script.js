document.addEventListener("DOMContentLoaded", function() {
    const tasks = [
        { name: "USACO", duration: 3 },
        { name: "IOL", duration: 5 },
        { name: "AP Stats", duration: 2 },
        { name: "AP Chem", duration: 2 },
        { name: "APUSH", duration: 2 },
        { name: "Gym", duration: 2 },
        { name: "Lunch", duration: 1 }
    ];

    const startTime = 7; // 7 AM
    const endTime = 22; // 10 PM

    function generateSchedule() {
        let currentTime = startTime;
        const schedule = [];
        
        // Helper function to add a task to the schedule
        function addTask(task) {
            schedule.push({
                name: task.name,
                start: currentTime,
                end: currentTime + task.duration
            });
            currentTime += task.duration;
        }
        
        // Add USACO first
        addTask(tasks[0]);

        // Add Gym and Lunch
        addTask(tasks[5]); // Gym
        addTask(tasks[6]); // Lunch

        // Add two of the AP tasks
        addTask(tasks[2]); // AP Stats
        addTask(tasks[3]); // AP Chem

        // Add IOL
        addTask(tasks[1]);

        // Add APUSH
        addTask(tasks[4]);

        return schedule;
    }

    function formatTime(time) {
        const hours = Math.floor(time);
        const minutes = (time - hours) * 60;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHours}:${minutes === 0 ? '00' : minutes} ${ampm}`;
    }

    function displaySchedule(schedule) {
        const scheduleContainer = document.getElementById("schedule");
        scheduleContainer.innerHTML = "";
        schedule.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.className = "task";
            taskElement.innerHTML = `
                <span>${task.name}</span>
                <span class="time">${formatTime(task.start)} - ${formatTime(task.end)}</span>
            `;
            scheduleContainer.appendChild(taskElement);
        });
    }

    const schedule = generateSchedule();
    displaySchedule(schedule);
});
