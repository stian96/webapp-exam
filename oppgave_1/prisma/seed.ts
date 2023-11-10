import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const taskData = [
  {
    id: "1", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "9|4",
  },
  {
    id: "2", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "10|2",
  },
  {
    id: "3", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "8|7",
  },
  {
    id: "4", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "9|5",
  },
  {
    id: "5", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "5|9",
  },
  {
    id: "6", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "12|3",
  },
  {
    id: "7", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "5|5",
  },
  {
    id: "8", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "10|3",
  },
  {
    id: "9", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "4|14",
  },
  {
    id: "10", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "24|6",
  },
  {
    id: "11", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "4|2",
  },
  {
    id: "12", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "50|3",
  },
  {
    id: "13", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "4|6",
  },
  {
    id: "14", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "9|3",
  },
  {
    id: "15", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "12|4",
  },
  {
    id: "16", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "18|4",
  },
  {
    id: "17", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "3|6",
  },
  {
    id: "18", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "30|6",
  },
  {
    id: "19", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "5|2",
  },
  {
    id: "20", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "16|7",
  },
  {
    id: "21", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "43|4",
  },
  {
    id: "22", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "40|4",
  },
  {
    id: "23", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "44|2",
  },
  {
    id: "24", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "6|8",
  },
  {
    id: "25", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "6|12",
  },
  {
    id: "26", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "36|3",
  },
  {
    id: "27", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "7|2",
  },
  {
    id: "28", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "8|8",
  },
  {
    id: "29", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "9|6",
  },
  {
    id: "30", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "3|3",
  },
  {
    id: "31", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "23|8",
  },
  {
    id: "32", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "45|8",
  },
  {
    id: "33", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "45|6",
  },
  {
    id: "34", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "56|7",
  },
  {
    id: "35", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "46|2",
  },
  {
    id: "36", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "65|8",
  },
  {
    id: "37", text: "Skriv resultatet av regneoperasjonen", type: "add", data: "67|6",
  },
  {
    id: "38", text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "63|7",
  },
  {
    id: "39", text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "6|2",
  },
  {
    id: "40", text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "90|8",
  },
]

async function main() {

  // Sletter alle eksisterende oppgaver først
  await prisma.task.deleteMany();

  // Oppretter nye oppgaver
  const taskPromises = taskData.map((task) => {
    return prisma.task.create({
      data: task,
    });
  });

  // Venter på at alle oppgavene skal bli opprettet
  await Promise.all(taskPromises);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
