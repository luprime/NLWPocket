import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { db } from "../db";
import { and, count, lte, sql } from "drizzle-orm";
import { goalCompletions, goals } from "../db/schema";

dayjs.extend(weekOfYear);

export function getWeeekPendingGoals() {
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
		db
			.select({
				id: goals.id,
				title: goals.title,
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
				createdAt: goals.createdAt,
			})
			.from(goals)
			.where(lte(goals.createdAt, lastDayOfWeek)),
	);

	const goalCompletionCounts = db.$with("goal_completion_counts").as(
		db
			.select({
				goalId: goalCompletions.goalId,
				compleitonCount: count(goalCompletions.id),
			})
			.from(goalCompletions)
			.groupBy(goalCompletions.goalId),
	);
}
