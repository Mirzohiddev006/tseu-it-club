import express from "express";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  // simple startup log for local runs
  // eslint-disable-next-line no-console
  console.log(`Backend placeholder server listening on port ${PORT}`);
});

export default app;
