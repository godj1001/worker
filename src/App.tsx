import * as React from "react";
import Style from "./App.module.scss";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { ScheduleStatus, useScheduleHooks } from "./hooks/useScheduleHooks";
import { transformNumber2Time } from "./utils";
const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const show = () => {};
const background = chrome.extension.getBackgroundPage();
console.log(background);

const App = () => {
  const now = dayjs();
  const day = now.day();
  const { startTime, setScheduleStatus, scheduleStatus } = useScheduleHooks();
  return (
    <div className={Style.App} id="wrapper">
      <div className={Style.content}>
        <div className={Style.title}>
          今天是{now.format("YYYY MM/DD")} {week[day]}{" "}
          {JSON.stringify(background)}
        </div>
        {scheduleStatus === ScheduleStatus.FREE && (
          <div>你是一个自由的打工人</div>
        )}
        {scheduleStatus === ScheduleStatus.WORKING && (
          <div className={Style.time}>{transformNumber2Time(startTime)}</div>
        )}
        {scheduleStatus === ScheduleStatus.RELAX && (
          <div>
            <div>打工人，休息一下</div>

            <div className={Style.time}>{transformNumber2Time(startTime)}</div>
          </div>
        )}
        <Button
          variant="contained"
          onClick={() => {
            chrome.storage.sync.get(["color"], function (res) {
              console.log("storage", res);
            });
            // let notification = new Notification("Hi there!");
            setScheduleStatus(ScheduleStatus.WORKING);
          }}
        >
          上班
        </Button>
      </div>
    </div>
  );
};

export default App;
