import { mkdir, writeFile } from "node:fs/promises";

const username = "khophisnow";
const endpoint = `https://api.github.com/users/${username}/events/public?per_page=12`;

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "khophisnow-portfolio-feed",
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const eventLabels = {
  PushEvent: "Pushed updates",
  CreateEvent: "Created something new",
  PullRequestEvent: "Opened or updated a pull request",
  IssuesEvent: "Worked on an issue",
  WatchEvent: "Starred a repository",
  ForkEvent: "Forked a repository",
  ReleaseEvent: "Published a release",
};

function summarize(event) {
  if (event.type === "PushEvent") {
    const commit = event.payload?.commits?.[0];
    return commit?.message ? commit.message.split("\n")[0] : "Updated project code";
  }

  if (event.type === "CreateEvent") {
    const refType = event.payload?.ref_type || "resource";
    return `Created a ${refType}`;
  }

  if (event.type === "PullRequestEvent") {
    const action = event.payload?.action || "updated";
    return `${action[0].toUpperCase()}${action.slice(1)} a pull request`;
  }

  if (event.type === "IssuesEvent") {
    const action = event.payload?.action || "updated";
    return `${action[0].toUpperCase()}${action.slice(1)} an issue`;
  }

  if (event.type === "WatchEvent") return "Starred a project worth tracking";
  if (event.type === "ForkEvent") return "Forked a project for exploration";
  if (event.type === "ReleaseEvent") return "Published a project release";

  return "Public GitHub activity";
}

const response = await fetch(endpoint, { headers });

if (!response.ok) {
  throw new Error(`GitHub returned ${response.status} ${response.statusText}`);
}

const events = await response.json();
const feed = {
  updatedAt: new Date().toISOString(),
  source: `https://github.com/${username}`,
  items: events.slice(0, 6).map((event) => ({
    id: event.id,
    title: eventLabels[event.type] || "GitHub activity",
    summary: summarize(event),
    repo: event.repo?.name || username,
    url: event.repo?.name ? `https://github.com/${event.repo.name}` : `https://github.com/${username}`,
    publishedAt: event.created_at,
  })),
};

await mkdir("public", { recursive: true });
await writeFile("public/github-feed.json", `${JSON.stringify(feed, null, 2)}\n`);
console.log(`Wrote ${feed.items.length} GitHub feed items to public/github-feed.json`);
