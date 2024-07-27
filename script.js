document.addEventListener("DOMContentLoaded", function() {
    const tasks = [
        { name: "USACO", duration: 3 },
        { name: "IOL", duration: 5 },
        { name: "AP Stats", duration: 2 },
        { name: "AP Chem", duration: 2 },
        { name: "APUSH", duration: 2 }
    ];

    const fixedTasks = [
        { name: "Gym", duration: 2, start: 11 },
        { name: "Lunch", duration: 1, start: 13 }
    ];

    const startTime = 7; // 7 AM
    const endTime = 22; // 10 PM

    function generateSchedule() {
        let schedule = [];
        let availableTime = [
            ...Array.from({ length: 11 - startTime }, (_, i) => startTime + i),
            ...Array.from({ length: endTime - 14 }, (_, i) => 14 + i)
        ];

        // Helper function to add a task to the schedule
        function addTask(task, startTime) {
            const taskSlot = {
                name: task.name,
                start: startTime,
                end: startTime + task.duration
            };
            schedule.push(taskSlot);
            availableTime = availableTime.filter(time => time < startTime || time >= taskSlot.end);
        }

        // Add fixed tasks (Gym and Lunch)
        fixedTasks.forEach(task => addTask(task, task.start));

        // Shuffle tasks
        const shuffledTasks = tasks.filter(task => task.name !== "IOL").sort(() => 0.5 - Math.random());

        // Add USACO first
        addTask(shuffledTasks[0], startTime);

        // Add AP tasks in remaining available time slots
        shuffledTasks.slice(1, 3).forEach(task => {
            const availableStart = availableTime.find(time => time + task.duration <= endTime);
            if (availableStart !== undefined) {
                addTask(task, availableStart);
            }
        });

        // Add IOL last, ensuring it fits within the remaining time
        const iolTask = tasks.find(task => task.name === "IOL");
        const lastAvailableStart = availableTime.find(time => time + iolTask.duration <= endTime);
        if (lastAvailableStart !== undefined) {
            addTask(iolTask, lastAvailableStart);
        }

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
        schedule.sort((a, b) => a.start - b.start);
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

    function generateAndDisplaySchedule() {
        const schedule = generateSchedule();
        displaySchedule(schedule);
    }

    // Attach generateAndDisplaySchedule to window to make it callable from HTML button
    window.generateAndDisplaySchedule = generateAndDisplaySchedule;

    // Generate initial schedule on load
    generateAndDisplaySchedule();
});
