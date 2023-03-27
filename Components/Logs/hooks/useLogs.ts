import React, { useEffect, useState } from "react";
import { useLoading } from "../../../Hooks/useLoading";
import { Log } from "../../../Models/Log";
import { LoggerRepo } from "../../../Repositories/LoggerRepo";
import { LogService } from "../../../Services/LogService";
import _ from "lodash";

export const useLogs = () => {
  const [logsPerPage, setLogsPerPage] = useState<Log[][]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const [pages, setPages] = useState(1);
  const numOfLogsPerPage = 100;

  useEffect(() => {
    fetchLogs(setLogsPerPage, setIsLoading, numOfLogsPerPage);
  }, []);

  useEffect(() => {
    setPages(logsPerPage.length);
  }, [logsPerPage]);

  return { logsPerPage: logsPerPage, isLoading, pages };
};

async function fetchLogs(
  setLogs: React.Dispatch<React.SetStateAction<Log[][]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  numOfLogsPerPage: number
) {
  try {
    const allLogs = await LogService.getAllLogs();
    setIsLoading(false);
    if (allLogs && allLogs.length > 0) {
      const logsInChunks = _.chunk(allLogs, numOfLogsPerPage);
      setLogs(logsInChunks);
    } else {
      LoggerRepo.error("Logs is " + allLogs + " in fetch Logs");
    }
  } catch (error: any) {
    setIsLoading(false);
    LoggerRepo.error("Error in Fetch Logs: ");
    LoggerRepo.error(error?.toString());
  }
}
