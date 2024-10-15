import osUtils from "os-utils";
import fs from "fs";
import os from "os";

const POLL_INTERVAL = 500;

export const pollResources = () => {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const { usage } = getStorageData();
  }, POLL_INTERVAL);
};

export const getStaticData = () => {
  const { total } = getStorageData();
  const { model: cpuModel } = os.cpus()[0];
  const totalMemoryGb = Math.floor(osUtils.totalmem() / 1024);

  return {
    total,
    cpuModel,
    totalMemoryGb,
  };
};

const getCpuUsage = () => {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
};

const getRamUsage = () => {
  return 1 - osUtils.freememPercentage();
};

const getStorageData = () => {
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
};
