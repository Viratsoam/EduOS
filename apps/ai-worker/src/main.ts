import { Worker } from "bullmq";
import IORedis from "ioredis";
import { readOptionalEnv } from "@eduos/shared";
import { handleAiGenerationJob } from "./processors/ai-generation.processor";
import { handleIngestionJob } from "./processors/ingestion.processor";
import type { EduosWorkerJob } from "./queues/jobs";

const connection = new IORedis(readOptionalEnv("REDIS_URL", "redis://localhost:6379"), {
  maxRetriesPerRequest: null,
});

const worker = new Worker<EduosWorkerJob>(
  "eduos-ai",
  async (job) => {
    switch (job.data.type) {
      case "content.ingest":
        return handleIngestionJob(job.data);
      case "ai.generate":
        return handleAiGenerationJob(job.data);
      default:
        throw new Error("Unsupported EduOS worker job");
    }
  },
  { connection },
);

worker.on("completed", (job) => {
  console.log(`Completed ${job.name}:${job.id}`);
});

worker.on("failed", (job, error) => {
  console.error(`Failed ${job?.name}:${job?.id}`, error);
});
