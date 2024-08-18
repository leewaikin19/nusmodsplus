import * as React from 'react';
import { useCallback, useState } from 'react'
import { Plus } from 'react-feather';


import type { SemTimetableConfig } from 'types/timetables';
import type { ModuleCode, Semester } from 'types/modules';

import Modal from 'views/components/Modal';
import CloseButton from 'views/components/CloseButton';

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
          lessonType: document.getElementById("lessontype").value,
          moduleCode: document.getElementById("modCode").value,
          moduleCredit: "0",
          acadYear: "",
          department: "",
          faculty: "",
          venue: "",
          semesterData: [],
          timestamp: 0,
          title: document.getElementById("title").value,
          weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13],
    })
    closeModal()
  }

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

          <h3>Add a Module Block</h3>
          Module Code
          <input className="form-control form-control-lg" id="modCode" placeholder="place"/>
          Day
          <input className="form-control form-control-lg" id="day" placeholder="place"/>
          Start Time
          <input className="form-control form-control-lg" id="starttime" placeholder="place"/>
          End Time
          <input className="form-control form-control-lg" id="endtime" placeholder="place"/>
          Title
          <input className="form-control form-control-lg" id="title" placeholder="place"/>
          Lesson Type
          <input className="form-control form-control-lg" id="lessontype" placeholder="place"/>
          <button onClick={add}> ayyo</button>
        </div>

      </Modal>
    </>
  );
}
