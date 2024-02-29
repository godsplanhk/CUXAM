import * as fs from 'fs';
import { Exam } from './types/exam';
import { Schedule } from './types/schedule';
import { Teacher } from './types/types';


const POPULATION_SIZE = 50;
const MAX_GENERATIONS = 100;
const MUTATION_RATE = 0.1;



interface Lab {
    labId: string
    capacity: number
    block: string
}


function getFacultyDataFromJSON() {
    const teacherData = JSON.parse(fs.readFileSync('C:\\Users\\uppni\\OneDrive\\Desktop\\App Tech\\CUXAM Clone\\CUXAM\\backend\\src\\teacher.json', 'utf8'));
    return teacherData.data;
}

function initializePopulation(data: any) {
    const population: Schedule[] = [];
    for (let i = 0; i < POPULATION_SIZE; i++) {
        const schedule = generateRandomSchedule(data);
        population.push({exams:schedule,fitness:0});
    }
    return population;
}

type usedLab = Pick<Lab, 'labId'>
type teacherID = Pick<Teacher, "Ecode">
function generateRandomSchedule(data: any) {
    const shuffledData = shuffleArray(data.combinedData);
    const usedSections = new Set();
    const usedLabs = new Set<usedLab>();
    const schedule: Exam[] = [];
    let lastTeacherInTimeRange:teacherID[] = [];
    shuffledData.forEach((section: any, index: number) => {
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

                let teacher;
                attempts = 0;
                do {
                    teacher = getRandomTeacher(data.facultyData, timeSlot, lastTeacherInTimeRange);
                    attempts++;
                } while (!teacher && attempts < 10);
                if (teacher) {
                    if (timeSlot.startTime >= "09:30" && timeSlot.endTime <= "12:45") {
                        lastTeacherInTimeRange = teacher.ECode;
                    }

                    const exam: Exam = {
                        sectionId: section['Sr No'],
                        labId: lab.LabNo,
                        StartTime: timeSlot.startTime,
                        EndTime: timeSlot.endTime,
                        RoomId: lab.Block,
                        date: section['Date'],
                        TeacherId: teacher.ECode
                    };
                    schedule.push(exam);
                }
            }
        }
    });

    return schedule;
}

function getRandomTeacher(facultyData: any[], timeSlot: any, lastTeacherInTimeRange: teacherID[] | null) {
    const availableTeachers = facultyData;
    const selected = Math.floor(Math.random() * availableTeachers.length);
    const teacher = availableTeachers[selected];
    availableTeachers.splice(selected, 1);
    return teacher;
}

function shuffleArray(array: any[]) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getRandomAtom(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomLab(labData: any[], timeSlot: any, usedLabs: Set<usedLab>) {
    const availableLabs = labData.filter((lab: any) => lab.Capacity > 0 && !usedLabs.has(lab.LabNo));
    return availableLabs[Math.floor(Math.random() * availableLabs.length)];
}

function evaluateFitness(schedule: Schedule, labData: any[], facultyData: any[]) {
    let fitness = 100;
    schedule.exams.forEach((exam, index) => {
        const startTime = new Date(exam.StartTime);
        const endTime = new Date(exam.EndTime);
        const room = exam.RoomId;
        for (let i = index + 1; i < schedule.exams.length; i++) {
            const otherExam = schedule.exams[i];
            const otherStartTime = new Date(otherExam.StartTime);
            const otherEndTime = new Date(otherExam.EndTime);
            if (otherStartTime < endTime && otherEndTime > startTime && otherExam.RoomId === room) {
                fitness -= 20;
            }
        }
    });
    schedule.exams.forEach((exam) => {
        const room = exam.RoomId;
        const lab = labData.find((lab) => lab['Lab No'] === room);
        if (lab && exam['Total students'] > lab.Capacity) {
            fitness -= 30;
        }
    });
    schedule.exams.forEach((exam) => {
        const facultyId = exam.TeacherId;
        const faculty = facultyData.find((faculty) => faculty.ECode === facultyId);
        if (!faculty) {
            fitness -= 50;
        }
    });
    return fitness;
}

function selectParents(population: Schedule[]) {
    const index1 = Math.floor(Math.random() * population.length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * population.length);
    } while (index1 === index2);
    return [population[index1], population[index2]];
}

function crossover(parent1: Schedule, parent2: Schedule) {
    const crossoverPoint = Math.floor(Math.random() * parent1.exams.length);
    const offspring1 = { exams: parent1.exams.slice(0, crossoverPoint).concat(parent2.exams.slice(crossoverPoint)),fitness:0 };
    const offspring2 = { exams: parent2.exams.slice(0, crossoverPoint).concat(parent1.exams.slice(crossoverPoint)),fitness:0 };
    return [offspring1, offspring2];
}

function mutate(schedule: Schedule, timeSlotAtoms: any[], labData: any[], usedLabs: Set<usedLab>) {
    for (let i = 0; i < schedule.exams.length; i++) {
        if (Math.random() < MUTATION_RATE) {
            const timeSlot = getRandomAtom(timeSlotAtoms);
            const lab = getRandomLab(labData, timeSlot, usedLabs);
            schedule.exams[i].StartTime = timeSlot.startTime;
            schedule.exams[i].EndTime = timeSlot.endTime;
            schedule.exams[i].RoomId = lab.Block;
        }
    }
}

function runGeneticAlgorithm(data: any) {
    let population = initializePopulation(data);
    for (let generation = 0; generation < MAX_GENERATIONS; generation++) {
        type Schedule = {
            exams: Exam[];
            fitness: number; // Add the 'fitness' property
        };

        population.forEach((schedule: Schedule) => {
            schedule.exams.forEach((scheduleItem: Exam) => {
                scheduleItem.fitness = evaluateFitness(scheduleItem, data.labData, data.facultyData);
            });
        });
        population.sort((a, b) => b[0].fitness - a[0].fitness);

        const newPopulation: Schedule[] = population.slice(0, POPULATION_SIZE / 2);
        while (newPopulation.length < POPULATION_SIZE) {
            const [parent1, parent2] = selectParents(population);
            let [offspring1, offspring2] = crossover(parent1, parent2);
            const usedLabs = new Set<usedLab>();
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
