import * as React from 'react';
import { useCallback, useState } from 'react'
import { Plus } from 'react-feather';
import classnames from 'classnames';
import CSS from "csstype";

import type { SemTimetableConfig } from 'types/timetables';
import type { ModuleCode, Semester } from 'types/modules';

import Modal from 'views/components/Modal';
import CloseButton from 'views/components/CloseButton';

import ttstyles from './TimetableModulesTable.scss';
import styles from './ShareTimetable.scss';
import { ControllerStateAndHelpers } from 'downshift';
import elements from 'views/elements';

type Props = {
  semester: Semester;
  timetable: SemTimetableConfig;
  hiddenModules: ModuleCode[];
};

type State = {
  isOpen: boolean;
};
export default function AddBlocks({semester, addCustomBlock}) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {setIsOpen(true)};
  const closeModal = () => setIsOpen(false)

  function add(){
    addCustomBlock(semester, {
      customBlock: true,
      classNo: "",
          colorIndex: 5,
          day: document.getElementById("day").value,
          endTime: document.getElementById("endtime").value,
          startTime: document.getElementById("starttime").value,
          lessonType: document.getElementById("lessonType").value,
          info: document.getElementById("info").value,
          moduleCode: document.getElementById("modCode").value,
          moduleCredit: "0",
          acadYear: "",
          department: "",
          faculty: "",
          venue: document.getElementById("venue").value,
          semesterData: [],
          timestamp: 0,
          title: document.getElementById("title").value,
          weeks: document.getElementById("weeks").value.split(',').map(x=>parseInt(x)),
    })
    closeModal()
  }

  //TODO Fix styling for button
  const buttonStyle: CSS.Properties = {
    marginTop: "10px"
  };

  const redStyle: CSS.Properties = {
    color: "#ff5138",
  };
  
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary btn-svg"
        onClick={openModal}
      >
        <Plus />
        Add Blocks
      </button>

      <Modal isOpen={isOpen} onRequestClose={closeModal} animate>
        <CloseButton absolutePositioned onClick={closeModal} />
        <div className={styles.header}>

          <h3 style={redStyle}>Add a Module Block</h3>
          Module Code
          <input className="form-control form-control-lg" id="modCode" placeholder="ABC1234"/>
          Additional Information
          <input className="form-control form-control-lg" id="info" placeholder="Any additional information"/>
          Day
          <input className="form-control form-control-lg" id="day" placeholder="Monday"/>
          Start Time
          <input className="form-control form-control-lg" id="starttime" placeholder="1300"/>
          End Time
          <input className="form-control form-control-lg" id="endtime" placeholder="1500"/>
          Title
          <input className="form-control form-control-lg" id="title" placeholder="Title"/>
          Lesson Type
          <input className="form-control form-control-lg" id="lessonType" placeholder="TUT [1]"/>
          Venue
          <input className="form-control form-control-lg" id="venue" placeholder="LT11"/>
          
          Weeks
          <input className="form-control form-control-lg" id="weeks" placeholder="1,2,3,5,7,8,13"/>
          <button className={classnames(ttstyles.titleBtn, 'btn-outline-primary btn btn-svg')} style={buttonStyle} onClick={add}> Add Block</button>
        </div>

      </Modal>
    </>
  );
}
