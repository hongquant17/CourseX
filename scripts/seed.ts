// import { Database } from "lucide-react";

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Maths" },
        { name: "Travel" },
        { name: "Marketing" },
        { name: "Engineering" },
      ],
    });

    console.log("Success");

  } catch (error) {
    console.log("Error while seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();