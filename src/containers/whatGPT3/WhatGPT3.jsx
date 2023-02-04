import React, { useState, useEffect } from 'react';
// import Feature from '../../components/feature/Feature';
import './whatGPT3.css';
import ai from '../../assets/ai.png';

const WhatGPT3 = ({ recPipelineId }) => {
  console.log(`Recieved: whatgpt3 ${recPipelineId}`);
  const [urlLink, setUrlLink] = useState(ai);
  const [generatedCaption, setGeneratedCaption] = useState('Loading caption...');
  const [generatedTriplets, setGeneratedTriplets] = useState(['Loading triplets...']);
  const [pipelineId, setPipelineId] = useState(false);
  // const [movieId, setMovieId] = useState(false);

  if (pipelineId === false && recPipelineId) {
    setPipelineId(recPipelineId);
  }

  // useEffect(() => {
  //   if (!pipelineId) {
  //     setPipelineId(pipelineId1);
  //   }
  // }, [pipelineId]);
  if (recPipelineId) {
    useEffect(() => {
      const interval = setInterval(() => {
        fetch('http://localhost:5000/get_movie_id1', {
          method: 'POST',
          body: JSON.stringify(recPipelineId),
          headers: { 'content-type': 'application/json' },
        }).then((res) => res.json().then((data1) => {
          console.log(data1); console.log(data1.movie_id);
        }));
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        fetch('http://localhost:5000/get_generated_caption_url', {
          method: 'POST',
          body: JSON.stringify(recPipelineId),
          headers: { 'content-type': 'application/json' },
        }).then((res) => res.json().then((data1) => {
          console.log(data1.image_url); setUrlLink(data1.image_url);
        }));
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        fetch('http://localhost:5000/get_generated_text', {
          method: 'POST',
          body: JSON.stringify(recPipelineId),
          headers: { 'content-type': 'application/json' },
        }).then((res) => res.json().then((data1) => {
          console.log(data1.candidate); setGeneratedCaption(data1.candidate);
        }));
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        fetch('http://localhost:5000/get_generated_triplets', {
          method: 'POST',
          body: JSON.stringify(recPipelineId),
          headers: { 'content-type': 'application/json' },
        }).then((res) => res.json().then((data1) => {
          console.log(data1.triplets); setGeneratedTriplets(data1.triplets);
        }));
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }, []);
  }
  let updatedList = generatedTriplets;
  if (generatedTriplets.length > 1) {
    updatedList = generatedTriplets.map((listItems) => listItems.length === 3 && <p>{`${listItems[0]} -> ${listItems[1]} -> ${listItems[2]}`}</p>);
  }

  return (
    <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
      <div className="gpt3__whatgpt3-feature">
        {/* <Feature title="What is GPT-3" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by." /> */}
        <div className="gpt3__whatgpt3-image">
          {urlLink ? <img src={urlLink} /> : setUrlLink(ai)}
        </div>
      </div>
      <div className="gpt3__whatgpt3-heading">
        <h1 className="gradient__text">Generated caption: </h1>
        <p>{generatedCaption}</p>
      </div>
      <div className="gpt3__whatgpt3-heading">
        <h1 className="gradient__text">Generated triplets:</h1>
        {updatedList}
      </div>
    </div>
  );
};

export default WhatGPT3;
