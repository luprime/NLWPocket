import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeeekPendingGoals } from "../../functions/get-week-pending-goals";

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
	app.get("/pending-goals", async () => {
		const { pendingGoals } = await getWeeekPendingGoals();

		return { pendingGoals };
	});
};
