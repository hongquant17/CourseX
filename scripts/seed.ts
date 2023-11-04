import { Database } from "lucide-react";

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        
    } catch (error) {
        console.log("Error while seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}