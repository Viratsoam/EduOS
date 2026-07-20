import type { ContentIngestJob } from "../queues/jobs";

export interface IngestionResult {
  indexed: boolean;
  message: string;
  resourceId: string;
}

export async function handleIngestionJob(job: ContentIngestJob): Promise<IngestionResult> {
  return {
    indexed: false,
    message:
      "Ingestion scaffold ready. Text extraction, chunking, embeddings, and OpenSearch indexing are next.",
    resourceId: job.resourceId,
  };
}
