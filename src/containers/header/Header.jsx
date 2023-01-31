import React, { useState, useEffect } from 'react';
// import { TextInput, View } from 'react-native';
// import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import WhatGPT3 from '../whatGPT3/WhatGPT3';
import './header.css';

const Header = () => {
  // const [imageClicked, setImageClicked] = useState();
  // const [isImageActive, setIsImageActive] = useState(false);
  // function clickEventHandler() {
  //   setIsImageActive(true);
  // }

  const [urlLink, setUrlLink] = useState(ai);
  const [pipelineId, setPipelineId] = useState(false);

  const [data, setdata] = useState(false);

  const handleChange = (event) => {
    setUrlLink(event.target.value);
  };

  useEffect(() => {
    if (urlLink !== ai) {
      fetch('http://localhost:5000/insert_pipeline_id', {
        method: 'POST',
        body: JSON.stringify(urlLink),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => {
          if (!res.ok) return Promise.reject(res);
          return res.json();
        }).then((receviedpipelineId) => { console.log(receviedpipelineId); setPipelineId(receviedpipelineId.pipeline_id); })
        .catch(console.error);
    }
  }, [data]);

  return (

    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">Let&apos;s Process Your Image With Nebula</h1>
        <p>Insert the URL Link below</p>

        <div className="gpt3__header-content__input">
          <input type="text" onChange={handleChange} id="urlLink" name="urlLink" placeholder="Your URL Link" />
          <button onClick={() => setdata((previous) => !previous)} type="button">Start</button>
        </div>

      </div>

      <div className="gpt3__header-image">
        <img src={urlLink} />
      </div>

      <div className="gpt3__header-image">
        {console.log(`Sending ${pipelineId}`)}
        {pipelineId && pipelineId !== ai && <WhatGPT3 recPipelineId={pipelineId} />}
      </div>

    </div>

  );
};

export default Header;
