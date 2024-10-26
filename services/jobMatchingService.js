import express from 'express';

    import { getAllJobs } from '../models/jobModel.js';
    import { cosineSimilarity } from 'ml-similarity';

    // Basic job matching using cosine similarity
    export const matchJobsForUser = async (userPreferences) => {
      const jobs = await getAllJobs();
      const matches = jobs.map(job => {
        return {
          job,
          score: cosineSimilarity(userPreferences, job.requirements)
        };
      });

      // Sort by highest match score
      matches.sort((a, b) => b.score - a.score);
      return matches.slice(0, 10); // Return top 10 matches
    };
    