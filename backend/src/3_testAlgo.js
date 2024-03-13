// Object to store exam information
const examAtoms = {};

// Object to store time slot information
const timeSlotAtoms = {};

// Define constants
const POPULATION_SIZE = 50;
const MAX_GENERATIONS = 1000;
const MUTATION_RATE = 0.1;

// Sample data for testing
const batches = Array.from({ length: 20 }, (_, i) => ({
    BatchId: `Batch_${i + 1}`,
    BatchName: `Batch ${i + 1}`,
    Course: 'Computer Science',
    Branch: 'AIT CSE',
    Semester: 5,
    Subjects: ['CS101', 'CS102', 'CS103', 'CS104', 'CS105'], // Sample subjects
}));

const teachers = Array.from({ length: 20 }, (_, i) => ({
    ECode: `T${i + 1}`,
    TName: `Teacher ${i + 1}`,
    SubjectId: ['CS101', 'CS102', 'CS103', 'CS104', 'CS105'], // Sample subjects
}));

// Correcting the section data to include only A and B groups
const sections = Array.from({ length: 20 }, (_, i) => ({
    SectionId: `Sec${i + 1}`,
    BatchId: batches[i % batches.length].BatchId,
    Group: String.fromCharCode(65 + i % 2), // A, B groups only
    ECode: teachers[i % teachers.length].ECode,
    StudentCount: Math.floor(Math.random() * 50) + 30, // Random student count
}));

const subjects = Array.from({ length: 20 }, (_, i) => ({
    SubjectCode: `CS${i + 1}`,
    SubjectName: `Computer Science ${i + 1}`,
}));

const availableRooms = Array.from({ length: 20 }, (_, i) => ({
    RoomId: `Room${i + 1}`,
    Capacity: Math.floor(Math.random() * 50) + 30, // Random capacity
}));

// Function to initialize population with random schedules
function initializePopulation() {
    const population = [];
    for (let i = 0; i < POPULATION_SIZE; i++) {
        const schedule = generateRandomSchedule();
        population.push(schedule);
    }
    return population;
}

// Function to generate a random schedule with fixed time slots
function generateRandomSchedule() {
    const schedule = [];
    const timeSlots = [
        { startTime: "09:30", endTime: "11:00" },
        { startTime: "11:15", endTime: "12:45" },
        { startTime: "13:15", endTime: "14:45" },
        { startTime: "15:00", endTime: "16:30" }
    ];

    // Iterate over each section
    sections.forEach(section => {
        // Randomly select subject, teacher, room, and time slot
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const teacher = teachers.find(teacher => teacher.ECode === section.ECode);
        const room = availableRooms[Math.floor(Math.random() * availableRooms.length)];
        const timeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];

        // Create an exam entry for the section
        const examId = `Exam_${Math.random().toString(36).substr(2, 9)}`; // Random exam ID
        examAtoms[examId] = {
            SubjectCode: subject.SubjectCode,
            TeacherId: teacher ? teacher.ECode : null,
            RoomId: room.RoomId
        };
        const timeSlotId = `${timeSlot.startTime}-${timeSlot.endTime}`; // Time slot ID
        timeSlotAtoms[timeSlotId] = {
            StartTime: timeSlot.startTime,
            EndTime: timeSlot.endTime
        };
        const exam = {
            SectionId: section.SectionId,
            SubjectCode: subject.SubjectCode,
            StartTime: timeSlot.startTime,
            EndTime: timeSlot.endTime,
            RoomId: room.RoomId,
            TeacherId: teacher ? teacher.ECode : null,
            ExamId: examId
        };
        schedule.push(exam);
    });
    return schedule;
}

// Function to evaluate the fitness of a schedule
function evaluateFitness(schedule) {
    let fitness = 100; // Initialize fitness to a maximum value

    // Iterate over each exam in the schedule
    schedule.forEach((exam, index) => {
        const startTime = exam.StartTime;
        const endTime = exam.EndTime;
        const room = exam.RoomId;
        const section = exam.SectionId;
        const teacher = exam.TeacherId;

        // Constraint 1: No overlapping exams in the same room at the same time
        for (let i = index + 1; i < schedule.length; i++) {
            const otherExam = schedule[i];
            if (
                otherExam.StartTime < endTime &&
                otherExam.EndTime > startTime &&
                otherExam.RoomId === room
            ) {
                fitness -= 20; // Penalize for overlapping exams
            }
        }

        // Constraint 2: No teacher should have more than one exam at the same time
        for (let i = index + 1; i < schedule.length; i++) {
            const otherExam = schedule[i];
            if (
                otherExam.StartTime < endTime &&
                otherExam.EndTime > startTime &&
                otherExam.TeacherId === teacher
            ) {
                fitness -= 20; // Penalize for teacher overlap
            }
        }

        // Constraint 3: Check room capacity
        const roomCapacity = availableRooms.find(r => r.RoomId === room).Capacity;
        if (roomCapacity < sections.find(s => s.SectionId === section).StudentCount) {
            fitness -= 10; // Penalize if room capacity is insufficient
        }

        // Constraint 4: Check gap between consecutive exams for each section
        const prevEndTime = index > 0 ? schedule[index - 1].EndTime : null;
        if (prevEndTime && startTime - prevEndTime < 30) {
            fitness -= 10; // Penalize if gap between exams is less than 30 minutes
        }

        // Constraint 5: Check gap between consecutive exams for each teacher
        const prevTeacherExam = schedule.find((e, i) => e.TeacherId === teacher && i < index);
        if (prevTeacherExam && startTime - prevTeacherExam.EndTime < 30) {
            fitness -= 10; // Penalize if gap between teacher's exams is less than 30 minutes
        }
    });

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

    // Log parent lengths
    console.log("Parent 1 Length:", parent1.length);
    console.log("Parent 2 Length:", parent2.length);

    // Determine the minimum length of the two parents
    const minLength = Math.min(parent1.length, parent2.length);

    // Randomly select crossover point
    const crossoverPoint = Math.floor(Math.random() * minLength);
    console.log("Crossover Point:", crossoverPoint);

    // Perform crossover
    const child1 = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
    const child2 = [...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint)];
    return [child1, child2];
}

// Function to perform mutation
function mutate(schedule) {
    console.log("Before Mutation:", schedule); // Log schedule before mutation

    // Iterate over each exam in the schedule
    for (let i = 0; i < schedule.length; i++) {
        // Check if mutation should be applied to the current exam
        if (Math.random() < MUTATION_RATE) {
            // Apply mutation to schedule element while considering hard constraints
            // For demonstration purposes, let's say we randomly change the room for an exam
            const exam = schedule[i];
            const originalRoom = exam.RoomId;
            const newRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
            // Ensure the new room has sufficient capacity for the exam
            if (newRoom.Capacity >= exam.StudentCount) {
                exam.RoomId = newRoom.RoomId;
            }
            else {
                console.log(`Mutation skipped for Exam ${exam.ExamId} due to insufficient room capacity.`);
            }
        }
    }

    console.log("After Mutation:", schedule); // Log schedule after mutation
}

// Function to run the genetic algorithm
function runGeneticAlgorithm() {
    // Initialize population with random schedules
    let population = initializePopulation();
    for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
        const selected = selection(population);
        const newPopulation = [];
        for (let i = 0; i < selected.length; i += 2) {
            const [child1, child2] = crossover(selected[i], selected[i + 1]);
            mutate(child1);
            mutate(child2);
            newPopulation.push(child1, child2);
        }
        population = newPopulation;
    }
    // Find the best schedule in the final population
    const bestSchedule = population.reduce((best, schedule) => evaluateFitness(schedule) > evaluateFitness(best) ? schedule : best);
    console.log("Best Schedule:", bestSchedule);
}

// Call the function to run the genetic algorithm
runGeneticAlgorithm();