import { xlsx } from './xlsxImporter.mjs';

// Define constants
const POPULATION_SIZE = 50;
const MAX_GENERATIONS = 1000;
const MUTATION_RATE = 0.1;

// Function to convert 12-hour time to 24-hour time
function convertTo24HourFormat(time12h) {
    const [time, period] = time12h.split(':');
    let hours = parseInt(time);
    if (period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
    }
    return `${hours.toString().padStart(2, '0')}:${period}`;
}

// Read data from Excel file
function readDataFromExcel(filePath) {
    const workbook = xlsx.read(filePath, { type: 'file' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
}


// Initialize population with random schedules
function initializePopulation(data) {
    const population = [];
    for (let i = 0; i < POPULATION_SIZE; i++) {
        const schedule = generateRandomSchedule(data);
        population.push(schedule);
    }
    return population;
}

// Function to generate a random schedule with fixed time slots
function generateRandomSchedule(data) {
    const schedule = [];
    const timeSlots = [
        { startTime: "09:30", endTime: "11:00" },
        { startTime: "11:15", endTime: "12:45" },
        { startTime: "13:15", endTime: "14:45" },
        { startTime: "15:00", endTime: "16:30" }
    ];

    // Iterate over each section
    data.forEach((section, index) => {
        // Check if the 'Date' property exists
        if (section['Date']) {
            // Split the date into day, month, and year
            const [day, month, year] = section['Date'].split('-');
            // Randomly select time slot
            const timeSlot = timeSlots[index % timeSlots.length];

            // Create an exam entry for the section
            const exam = {
                SectionId: section['Sr No'],
                SubjectCode: section['Subject Code'],
                StartTime: `${day}.${month}.${year} ${timeSlot.startTime}`, // Format date and time
                EndTime: `${day}.${month}.${year} ${timeSlot.endTime}`, // Format date and time
                RoomId: section['Lab No'],
                TeacherId: section['Internal Examiner'],
                ExamId: `Exam_${Math.random().toString(36).substr(2, 9)}`, // Random exam ID
            };
            schedule.push(exam);
        }
    });
    return schedule;
}


// Function to evaluate the fitness of a schedule
function evaluateFitness(schedule) {
    let fitness = 100; // Initialize fitness to a maximum value

    // Constraint 1: No overlapping exams in the same room at the same time
    schedule.forEach((exam, index) => {
        const startTime = new Date(exam.StartTime);
        const endTime = new Date(exam.EndTime);
        const room = exam.RoomId;

        for (let i = index + 1; i < schedule.length; i++) {
            const otherExam = schedule[i];
            const otherStartTime = new Date(otherExam.StartTime);
            const otherEndTime = new Date(otherExam.EndTime);

            if (otherStartTime < endTime && otherEndTime > startTime && otherExam.RoomId === room) {
                fitness -= 20; // Penalize for overlapping exams
            }
        }
    });

    // Add more constraints and update fitness accordingly

    return fitness;
}

// Function to perform selection based on fitness
function selection(population) {
    // Remove any empty or undefined schedules from the population
    const validPopulation = population.filter(schedule => schedule && schedule.length > 0);
    // Sort population based on fitness
    validPopulation.sort((a, b) => evaluateFitness(a) - evaluateFitness(b));
    // Select top individuals for reproduction
    const selected = validPopulation.slice(0, POPULATION_SIZE / 2);
    return selected;
}

// Function to perform crossover
function crossover(parent1, parent2) {
    // Check if either parent is empty or undefined
    if (!parent1 || !parent2 || parent1.length === 0 || parent2.length === 0) {
        console.error("One of the parents is empty or undefined.");
        return [[], []]; // Return empty arrays to avoid further errors
    }

    // Randomly select crossover point
    const crossoverPoint = Math.floor(Math.random() * Math.min(parent1.length, parent2.length));

    // Perform crossover
    const child1 = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
    const child2 = [...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint)];
    return [child1, child2];
}

// Function to perform mutation
function mutate(schedule) {
    // Iterate over each exam in the schedule
    schedule.forEach((exam, index) => {
        // Check if mutation should be applied to the current exam
        if (Math.random() < MUTATION_RATE) {
            // Apply mutation to schedule element while considering hard constraints
            // For demonstration purposes, let's say we randomly change the room for an exam
            const newRoom = `Room${Math.floor(Math.random() * 20) + 1}`;
            // Ensure the new room has sufficient capacity for the exam
            // Add additional logic here if needed
            exam.RoomId = newRoom;
        }
    });
}

// Function to run the genetic algorithm
function runGeneticAlgorithm(data) {
    // Initialize population with random schedules
    let population = initializePopulation(data);

    // Ensure population is not empty
    if (population.length === 0) {
        console.error("Population is empty. Unable to run the genetic algorithm.");
        return;
    }

    // Find the best schedule in the final population
    const bestSchedule = population.reduce((best, schedule) => evaluateFitness(schedule) > evaluateFitness(best) ? schedule : best);
    console.log("Best Schedule:", bestSchedule);
}


// Read data from Excel file
const filePath = "C:\\Users\\uppni\\OneDrive\\Desktop\\App Tech\\CUXAM Clone\\clone\\Practical Datesheet Nov 2023 (1).xlsx";
const data = readDataFromExcel(filePath);

// Call the function to run the genetic algorithm with the provided data
runGeneticAlgorithm(data);
