// Import xlsx module
import { xlsx } from './xlsxImporter.mjs';

// Define constants
const POPULATION_SIZE = 50;
const MAX_GENERATIONS = 1000;
const MUTATION_RATE = 0.1;

// Read data from Excel file
function readDataFromExcel(filePath) {
    const workbook = xlsx.read(filePath, { type: 'file' });

    // Read data from the "combined" sheet
    const combinedSheet = workbook.Sheets["combined"];
    const combinedData = xlsx.utils.sheet_to_json(combinedSheet);

    // Read data from the "faculty details" sheet
    const facultySheet = workbook.Sheets["faculty details"];
    const facultyData = xlsx.utils.sheet_to_json(facultySheet);

    // Read data from the "lab details" sheet
    const labSheet = workbook.Sheets["lab details"];
    const labData = xlsx.utils.sheet_to_json(labSheet);

    return { combinedData, facultyData, labData };
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

// Generate a random schedule with fixed time slots
function generateRandomSchedule(data) {
    console.log("Generating a random schedule...");

    const combinedData = data.combinedData;
    const facultyData = data.facultyData;
    const labData = data.labData;

    const schedule = [];
    const usedSections = new Set();
    const usedLabs = new Set();

    // Randomly shuffle the combined data to ensure randomness in scheduling
    const shuffledData = shuffleArray(combinedData);

    // Iterate over each section in the shuffled data
    shuffledData.forEach((section, index) => {
        console.log("Current section:", section); // Log the current section

        if (section['Date'] && !usedSections.has(section['Sr No'])) {
            const [day, month, year] = section['Date'].split('-');

            // Randomly select a time slot
            const timeSlot = getRandomTimeSlot();

            // Randomly select a lab with sufficient capacity
            const lab = getRandomLab(labData, timeSlot, usedLabs);

            if (lab) {
                // Randomly select an internal examiner from faculty data
                const internalExaminer = getRandomInternalExaminer(facultyData);

                // Create an exam entry for the section
                const exam = {
                    SectionId: section['Sr No'],
                    SubjectCode: section['Subject Code'],
                    StartTime: `${day}.${month}.${year} ${timeSlot.startTime}`, // Format date and time
                    EndTime: `${day}.${month}.${year} ${timeSlot.endTime}`, // Format date and time
                    RoomId: lab.LabNo,
                    TeacherId: internalExaminer.ECode,
                    ExamId: `Exam_${Math.random().toString(36).substr(2, 9)}`, // Random exam ID
                };

                // Add the exam to the schedule
                schedule.push(exam);

                // Mark section and lab as used
                usedSections.add(section['Sr No']);
                usedLabs.add(lab.LabNo);
            }
        }
    });

    console.log("Generated schedule:", schedule);
    return schedule;
}

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to get a random time slot
function getRandomTimeSlot() {
    const timeSlots = [
        { startTime: "09:30", endTime: "11:00" },
        { startTime: "11:15", endTime: "12:45" },
        { startTime: "13:15", endTime: "14:45" },
        { startTime: "15:00", endTime: "16:30" }
    ];
    return timeSlots[Math.floor(Math.random() * timeSlots.length)];
}

// Function to get a random lab with sufficient capacity
function getRandomLab(labData, timeSlot, usedLabs) {
    // Assuming labData is an array of lab objects with 'Capacity' property
    const availableLabs = labData.filter(lab => lab.Capacity > 0 && !usedLabs.has(lab.LabNo));
    return availableLabs[Math.floor(Math.random() * availableLabs.length)];
}

// Function to get a random internal examiner
function getRandomInternalExaminer(facultyData) {
    return facultyData[Math.floor(Math.random() * facultyData.length)];
}

// Function to evaluate the fitness of a schedule
function evaluateFitness(schedule, labData, facultyData) {
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

    // Constraint 2: Room capacity
    schedule.forEach((exam) => {
        const room = exam.RoomId;
        const lab = labData.find((lab) => lab['Lab No'] === room);
        if (lab && exam['Total students'] > lab.Capacity) {
            fitness -= 30; // Penalize for exceeding room capacity
        }
    });

    // Constraint 3: Faculty availability
    schedule.forEach((exam) => {
        const facultyId = exam.TeacherId;
        const faculty = facultyData.find((faculty) => faculty.ECode === facultyId);
        if (!faculty) {
            fitness -= 50; // Penalize for missing faculty
        }
    });

    // Additional constraints can be added here

    return fitness;
}

// Function to run the genetic algorithm
function runGeneticAlgorithm(data) {
    // Initialize population with random schedules
    console.log("Initializing population...");
    let population = initializePopulation(data);
    console.log("Population size after initialization:", population.length);

    // Ensure population is not empty
    if (population.length === 0) {
        console.error("Population is empty. Unable to run the genetic algorithm.");
        return;
    }

    // Evaluate the fitness of each schedule in the population
    console.log("Evaluating fitness of each schedule...");
    population.forEach(schedule => {
        schedule.fitness = evaluateFitness(schedule, data.labData, data.facultyData);
    });

    // Sort population based on fitness
    population.sort((a, b) => b.fitness - a.fitness);

    // Get the best schedule from the sorted population
    const bestSchedule = population[0];

    // Display the details of each exam in the best schedule
    console.log("Best Schedule:");
    bestSchedule.forEach(exam => {
        console.log(`Exam ID: ${exam.ExamId}, Section ID: ${exam.SectionId}, Subject Code: ${exam.SubjectCode}, Start Time: ${exam.StartTime}, End Time: ${exam.EndTime}, Room ID: ${exam.RoomId}, Teacher ID: ${exam.TeacherId}`);
    });

    // Evaluate fitness for schedules with fitness >= 90
    const highFitnessSchedules = population.filter(schedule => schedule.fitness >= 90);
    console.log("Schedules with fitness >= 90:");
    highFitnessSchedules.forEach(schedule => {
        console.log("Fitness:", schedule.fitness);
    });

    // Find the highest fitness
    const highestFitness = Math.max(...population.map(schedule => schedule.fitness));
    console.log("Highest fitness:", highestFitness);
}

// Read data from Excel file
const filePath = "C:\\Users\\uppni\\OneDrive\\Desktop\\App Tech\\CUXAM Clone\\clone\\Practical Datesheet Nov 2023 (1).xlsx";
const data = readDataFromExcel(filePath);

// Call the function to run the genetic algorithm with the provided data
runGeneticAlgorithm(data);
