import React, { useState, useEffect } from 'react';
// import { TextInput, View } from 'react-native';
// import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import WhatGPT3 from '../whatGPT3/WhatGPT3';
import { ProgressBar } from '../../components';
import './header.css';

const Header = () => {
  // const [imageClicked, setImageClicked] = useState();
  // const [isImageActive, setIsImageActive] = useState(false);
  // function clickEventHandler() {
  //   setIsImageActive(true);
  // }

  const [urlLink, setUrlLink] = useState(ai);
  const [pipelineId, setPipelineId] = useState(ai);
  const [taskStatus, setTaskStatus] = useState(false);
  const [data, setdata] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(true);
  // const [buttonState, setButtonState] = useState({
  //   isDisabled: false,
  //   data: false,
  // });

  const handleChange = (event) => {
    setUrlLink(event.target.value);
  };

  function checkTaskStatus() {
    if (taskStatus === '' || taskStatus === 'done') {
      return '';
    }
    return true;
  }

  useEffect(() => {
    if (urlLink !== ai) {
      fetch('http://74.82.29.209:5000/insert_pipeline_id', {
        method: 'POST',
        body: JSON.stringify({ urlLink }),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => {
          if (!res.ok) return Promise.reject(res);
          return res.json();
        }).then((receviedpipelineId) => { if (pipelineId === ai) { console.log(receviedpipelineId); setPipelineId(receviedpipelineId.pipeline_id); } })
        .catch(console.error);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://74.82.29.209:5000/get_task_status', {
        method: 'POST',
        body: JSON.stringify(urlLink),
        headers: { 'content-type': 'application/json' },
      }).then((res) => res.json().then((data1) => {
        console.log(`task status: ${JSON.stringify(data1.current_task)}`); setTaskStatus(data1.current_task);
        if (!isFinished) {
          if (data1.current_task === 'llm') {
            setIsFinished(true);
          }
        }
      })).catch(console.error);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // const { isDisabledd, data } = buttonState;

  return (

    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">Let&apos;s Process Your Image With Nebula</h1>
        <p>Insert the URL Link below</p>
        <div className="gpt3__header-content__input">
          <input type="text" onChange={handleChange} id="urlLink" name="urlLink" value={urlLink === ai ? '' : urlLink} placeholder="Your URL Link" />
          <button onClick={() => setUrlLink('')} type="button">X</button>
        </div>
        <div className="gpt3__header-content__start">
          <button onClick={() => setdata((previous) => !previous)} type="button" disabled={checkTaskStatus()}> {checkTaskStatus() === '' ? 'Start' : 'Loading... Please wait.'}</button>
        </div>
        {(taskStatus === 'videoprocessing') && (
          <div className="gpt3__progressBar-image" style={{ width: '20%', padding: '0 4rem' }}>
            <ProgressBar progress="20" />
          </div>
        )}
        {(taskStatus === 'reid') && (
          <div className="gpt3__progressBar-image" style={{ width: '40%', padding: '0 8rem' }}>
            <ProgressBar progress="40" />
          </div>
        )}
        {(taskStatus === 'visual_clues') && (
          <div className="gpt3__progressBar-image" style={{ width: '60%', padding: '0 8rem' }}>
            <ProgressBar progress="60" />
          </div>
        )}
        {(taskStatus === 'fusion') && (
          <div className="gpt3__progressBar-image" style={{ width: '80%', padding: '0 8rem' }}>
            <ProgressBar progress="80" />
          </div>
        )}
        {(taskStatus === 'llm') && (
          <div className="gpt3__progressBar-image" style={{ width: '100%', padding: '0 8rem' }}>
            <ProgressBar progress="100" />
          </div>
        )}

        <div className="gpt3__header-image">
          <img src={urlLink} />
        </div>
        <div className="gpt3__whatgpt3">
          {console.log(`Sending ${pipelineId}`)}
          {console.log(`IsFinished ${taskStatus}`)}
          {pipelineId && pipelineId !== ai && <WhatGPT3 recPipelineId={pipelineId} isFinished={taskStatus} />}
        </div>
      </div>
    </div>

  );
};

export default Header;
