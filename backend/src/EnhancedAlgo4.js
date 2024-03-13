import xlsx from 'xlsx';
const { readFile, utils } = xlsx;

const POPULATION_SIZE = 50;
const MAX_GENERATIONS = 100;
const MUTATION_RATE = 0.1;

function readDataFromExcel(filePath) {
    const workbook = readFile(filePath);
    const combinedSheet = workbook.Sheets["combined"];
    let combinedData = utils.sheet_to_json(combinedSheet);
    combinedData = combinedData.filter(section => section && section['Subject Code'] && section['Subject Code'].startsWith('AIML'));
    console.log(`Number of sections: ${combinedData.length}`); 
    const facultySheet = workbook.Sheets["faculty details"];
    let facultyData = utils.sheet_to_json(facultySheet);
    facultyData = facultyData.slice(129);

    const labSheet = workbook.Sheets["lab details"];
    let labData = utils.sheet_to_json(labSheet);
    labData = labData.filter(lab => ['Block 14(D2)', 'Block 12(D3)', 'Block 11 (D4)'].includes(lab['Block']));

    const examAtoms = combinedData.map(section => {
        return { id: section['Sr No'], name: section['Exam Name'] };
    });

    const timeSlotAtoms = [
        { id: 1, startTime: "09:30", endTime: "11:00" },
        { id: 2, startTime: "11:15", endTime: "12:45" },
        { id: 3, startTime: "13:15", endTime: "14:45" },
        { id: 4, startTime: "15:00", endTime: "16:30" }
    ];

    return { combinedData, facultyData, labData, examAtoms, timeSlotAtoms };
}

function initializePopulation(data) {
    const population = [];
    for (let i = 0; i < POPULATION_SIZE; i++) {
        const schedule = generateRandomSchedule(data);
        population.push(schedule);
    }
    return population;
}

function generateRandomSchedule(data) {
    const shuffledData = shuffleArray(data.combinedData);
    const usedSections = new Set();
    const usedLabs = new Set();
    const schedule = [];
    shuffledData.forEach((section, index) => {
        if (section['Date'] && !usedSections.has(section['Sr No'])) {
            const [day, month, year] = section['Date'].split('-');
            const timeSlot = getRandomAtom(data.timeSlotAtoms);
            let lab;
            let attempts = 0;
            do {
                lab = getRandomLab(data.labData, timeSlot, usedLabs);
                attempts++;
            } while (!lab && attempts < 10);
            if (lab) {
                usedLabs.add(lab.LabNo);
                usedSections.add(section['Sr No']);
                const exam = {
                    sectionId: section['Sr No'],
                    labId: lab.LabNo,
                    StartTime: timeSlot.startTime,
                    EndTime: timeSlot.endTime,
                    RoomId: lab.Block,
                    date: section['Date']
                };
                schedule.push(exam);
            }
        }
    });
    return schedule;
}

function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getRandomAtom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomLab(labData, timeSlot, usedLabs) {
    const availableLabs = labData.filter(lab => lab.Capacity > 0 && !usedLabs.has(lab.LabNo));
    return availableLabs[Math.floor(Math.random() * availableLabs.length)];
}

function evaluateFitness(schedule, labData, facultyData) {
    let fitness = 100;
    schedule.forEach((exam, index) => {
        const startTime = new Date(exam.StartTime);
        const endTime = new Date(exam.EndTime);
        const room = exam.RoomId;
        for (let i = index + 1; i < schedule.length; i++) {
            const otherExam = schedule[i];
            const otherStartTime = new Date(otherExam.StartTime);
            const otherEndTime = new Date(otherExam.EndTime);
            if (otherStartTime < endTime && otherEndTime > startTime && otherExam.RoomId === room) {
                fitness -= 20;
            }
        }
    });
    schedule.forEach((exam) => {
        const room = exam.RoomId;
        const lab = labData.find((lab) => lab['Lab No'] === room);
        if (lab && exam['Total students'] > lab.Capacity) {
            fitness -= 30;
        }
    });
    schedule.forEach((exam) => {
        const facultyId = exam.TeacherId;
        const faculty = facultyData.find((faculty) => faculty.ECode === facultyId);
        if (!faculty) {
            fitness -= 50;
        }
    });
    return fitness;
}

function selectParents(population) {
    const index1 = Math.floor(Math.random() * population.length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * population.length);
    } while (index1 === index2);
    return [population[index1], population[index2]];
}

function crossover(parent1, parent2) {
    const crossoverPoint = Math.floor(Math.random() * parent1.length);
    const offspring1 = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
    const offspring2 = parent2.slice(0, crossoverPoint).concat(parent1.slice(crossoverPoint));
    return [offspring1, offspring2];
}

function mutate(schedule, timeSlotAtoms, labData, usedLabs) {
    for (let i = 0; i < schedule.length; i++) {
        if (Math.random() < MUTATION_RATE) {
            const timeSlot = getRandomAtom(timeSlotAtoms);
            const lab = getRandomLab(labData, timeSlot, usedLabs);
            schedule[i].StartTime = timeSlot.startTime;
            schedule[i].EndTime = timeSlot.endTime;
            schedule[i].RoomId = lab.Block;
        }
    }
}

function runGeneticAlgorithm(data) {
    let population = initializePopulation(data);
    for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
        population.forEach(schedule => {
            schedule.fitness = evaluateFitness(schedule, data.labData, data.facultyData);
        });
        population.sort((a, b) => b.fitness - a.fitness);

        const newPopulation = population.slice(0, POPULATION_SIZE / 2);
        while (newPopulation.length < POPULATION_SIZE) {
            const [parent1, parent2] = selectParents(population);
            let [offspring1, offspring2] = crossover(parent1, parent2);
            const usedLabs = new Set();
            mutate(offspring1, data.timeSlotAtoms, data.labData, usedLabs);
            mutate(offspring2, data.timeSlotAtoms, data.labData, usedLabs);
            newPopulation.push(offspring1, offspring2);
        }
        population = newPopulation;
    }
    population.forEach(schedule => {
        schedule.fitness = evaluateFitness(schedule, data.labData, data.facultyData);
    });
    population.sort((a, b) => b.fitness - a.fitness);
    return population[0];
}

const data = readDataFromExcel('C:\\Users\\uppni\\OneDrive\\Desktop\\App Tech\\CUXAM Clone\\CUXAM\\backend\\src\\Practical Datesheet Nov 2023 (1).xlsx');
const bestSchedule = runGeneticAlgorithm(data);
console.log(`Best Schedule: ${JSON.stringify(bestSchedule, null, 2)}, Fitness: ${bestSchedule.fitness}`);