import cron from "node-cron";
import { fetchPosts } from "../services/externalApi";
import { setCache } from "../services/cacheService"; 

// Run every 1 minute
cron.schedule("*/2 * * * *", async () => {
  console.log("Cron job started: Fetching external API data...");

  try {
    const posts = await fetchPosts();

    await setCache("posts_::1", posts, 60); 

    console.log("Cron job completed: Data cached successfully!");
  } catch (error) {
    console.error("Cron job failed:", error);
  }
});
