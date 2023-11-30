import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const taskData = [
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "9|4",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "10|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "8|7",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "9|5",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "5|9",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "12|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "5|5",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "10|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "4|14",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "24|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "4|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "50|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "4|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "9|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "12|4",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "18|4",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "3|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "30|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "5|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "16|7",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "43|4",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "40|4",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "44|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "6|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "6|12",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "36|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "7|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "8|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "9|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "3|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "23|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "45|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "45|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "56|7",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "46|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "65|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "67|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "63|7",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "6|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "90|8",
  },
]


async function main() {

  await prisma.task.deleteMany();

  const taskPromises = taskData.map((task) => {
    return prisma.task.create({
      data: task,
    });
  });

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
