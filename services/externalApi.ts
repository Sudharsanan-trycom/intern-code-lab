import axios from "axios";
import Bottleneck from "bottleneck";

// Bottleneck limits external API calls
const limiter = new Bottleneck({
  maxConcurrent: 1,  // max 2 concurrent calls
  minTime: 2000        // at least 500ms between calls
});

limiter.on("queued", (info) => {
  console.log(`Job queued! Queue length `);
});

export const fetchPosts = limiter.wrap(async (): Promise<any> => {
  console.log("Making external API call at", new Date().toISOString());
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return response.data;
});
