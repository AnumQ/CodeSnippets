import React, { useEffect, useState } from "react";
import { log } from "../../consoleHelper";
import { Log } from "../../Models/Log";
import { LoggerRepo } from "../../Repositories/LoggerRepo";
import { LogService } from "../../Services/LogService";
import { LogsListView } from "../Logs/UI/LogsListView";

export const BookingLogs = ({ bookingCode }: { bookingCode: string }) => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const logs = await LogService.getLogsBasedOnBookingCode(bookingCode);
      if (!logs) {
        return LoggerRepo.error(`${fetchLogsError} ${logs}`);
      }
      setLogs(logs);
    }

    fetchLogs();
  }, []);

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h5>Logg</h5>
      <LogsListView logs={logs} />
    </div>
  );
};

const fetchLogsError = "Bookings logs: ";
