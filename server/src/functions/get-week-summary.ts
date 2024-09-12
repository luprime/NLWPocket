import dayjs from "dayjs";
import { db } from "../db";
import { and, count, gte, lte, sql, eq } from "drizzle-orm";
import { goalCompletions, goals } from "../db/schema";



export async function getWeekSummary() {
	return{
        summary: 'teste',
    }
}
