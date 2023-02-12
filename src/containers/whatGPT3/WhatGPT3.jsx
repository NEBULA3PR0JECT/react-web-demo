import React, { useState, useEffect } from 'react';
// import Feature from '../../components/feature/Feature';
import Graph from 'react-graph-vis';
import './whatGPT3.css';
import ai from '../../assets/ai.png';

const options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: '#000000',
  },
};

// function randomColor() {
//   const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
//   const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
//   const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
//   return `#${red}${green}${blue}`;
// }
// let isGeneratedTriplets = false;
let isCreatedGraph = false;
// let isGeneratedCaption = false;

const WhatGPT3 = ({ recPipelineId, isFinished }) => {
  console.log(`Recieved: whatgpt3 ${recPipelineId}`);
  console.log(`Recieved: taskStatus,  ${isFinished}`);
  const [pipelineId, setPipelineId] = useState(false);
  // const [nodeInfo, setNodeInfo] = useState({});
  // const [isGeneratedCaption, setIsGeneratedCaption] = useState(false);
  // const [isGeneratedTriplets, setIsGeneratedTriplets] = useState(false);
  const [urlLink, setUrlLink] = useState(ai);
  // const [isCreatedNodes, setIsCreatedNodes] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState(false);
  const [generatedTriplets, setGeneratedTriplets] = useState(false);
  const [graphState, setGraphState] = useState({
    counter: 0,
    tripletidx: 0,
    graph: {
      nodes: [
        // { id: 1, label: 'person', color: '#e04141' },
        // { id: 2, label: 'has', color: '#e09c41' },
        // { id: 3, label: 'bike', color: '#e0df41' },
      ],
      edges: [
        // { from: 1, to: 2 },
        // { from: 2, to: 3 },
      ],
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log('Selected nodes:');
        console.log(nodes);
        console.log('Selected edges:');
        console.log(edges);
        alert(`Selected node: ${nodes}`);
      },
      doubleClick: () => {
        // createNode();
      },
    },
  });
  const { graph, events } = graphState;
  // const [isFetching, setIsFetching] = useState(true);
  // const [isFetching, setIsFetching] = useState(true);
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
        fetch('http://74.82.29.209:5000/get_generated_caption_url', {
          method: 'POST',
          body: JSON.stringify(recPipelineId),
          headers: { 'content-type': 'application/json' },
        }).then((res) => res.json().then((data1) => {
          console.log(data1.image_url); setUrlLink(data1.image_url);
        })).catch(console.error);
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        fetch('http://74.82.29.209:5000/get_generated_text', {
          method: 'POST',
          body: JSON.stringify(recPipelineId),
          headers: { 'content-type': 'application/json' },
        }).then((res) => res.json().then((data1) => {
          console.log(data1.candidate); setGeneratedCaption(data1.candidate);
        })).catch(console.error);
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        fetch('http://74.82.29.209:5000/get_generated_triplets', {
          method: 'POST',
          body: JSON.stringify(recPipelineId),
          headers: { 'content-type': 'application/json' },
        }).then((res) => res.json().then((data1) => {
          console.log(`triplets length: ${Object.keys(data1.triplets).length}`);
          if (Object.keys(data1.triplets).length > 0) {
            console.log(`triplets: ${JSON.stringify(data1.triplets)}`);
            setGeneratedTriplets(data1.triplets);
            // isGeneratedTriplets = true;
          }
        })).catch(console.error);
      }, 300);
      return () => {
        clearInterval(interval);
      };
    }, []);
  }

  const createNodesGraph = (tripletsNodes) => {
    setGraphState(({ graph: { nodes, edges }, ...rest }) => {
      return {
        ...rest,
        graph: {
          nodes: [
            ...nodes,
            tripletsNodes,
          ],
          edges: [
            ...edges,
          ],
        },
      };
    });
  };

  const createEdgesGraph = (tripletsEdges) => {
    setGraphState(({ graph: { nodes, edges }, ...rest }) => {
      return {
        ...rest,
        graph: {
          nodes: [
            ...nodes,
          ],
          edges: [
            ...edges,
            tripletsEdges,
          ],
        },
      };
    });
  };

  // if (isGeneratedTriplets && !isCreatedGraph) {
  if (generatedTriplets && isFinished === 'llm' && !isCreatedGraph) {
    console.log(`Generated triplets JSON: ${JSON.stringify(generatedTriplets)}`);
    const tripletsNodes = generatedTriplets.graph.nodes;
    const tripletsEdges = generatedTriplets.graph.edges;
    console.log(`Generated Nodes JSON: ${JSON.stringify(tripletsNodes)}`);
    console.log(`Generated Edges JSON: ${JSON.stringify(tripletsEdges)}`);
    for (let index = 0; index < tripletsNodes.length; index += 1) {
      createNodesGraph(tripletsNodes[index]);
    }
    for (let index = 0; index < tripletsEdges.length; index += 1) {
      createEdgesGraph(tripletsEdges[index]);
    }
    isCreatedGraph = true;
  }
  // isCreatedGraph = true;
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetch('http://74.82.29.209:5000/get_fetching_status', {
  //       method: 'POST',
  //       body: JSON.stringify(recPipelineId),
  //       headers: { 'content-type': 'application/json' },
  //     }).then((res) => res.json().then((data1) => {
  //       console.log(data1); setIsFetching(data1.fetching_status);
  //     }));
  //   }, 300);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // let updatedList = generatedTriplets;
  // if (generatedTriplets.length > 1) {
  //   updatedList = generatedTriplets.map((listItems) => listItems.length === 3 && <p>{`${listItems[0]} -> ${listItems[1]} -> ${listItems[2]}`}</p>);
  // }

  // const updatedList = createNode(0);
  // if (updatedList) {
  //   createNode(0);
  //   updatedList = false;
  // }
  return (
    <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
      <div className="gpt3__whatgpt3-feature">
        {/* <Feature title='What is GPT-3' text='We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by.' /> */}
        <div className="gpt3__whatgpt3-image">
          {urlLink ? <img src={urlLink} /> : setUrlLink(ai)}
        </div>
      </div>
      <div className="gpt3__whatgpt3-heading">
        <h1 className="gradient__text">Caption: </h1>
      </div>
      <div className="gpt3__whatgpt3-heading">
        <p>{generatedCaption}</p>
      </div>
      <div className="gpt3__whatgpt3-heading">
        <h1 className="gradient__text">Triplets: </h1>
      </div>
      <div className="gpt3__whatgpt3-heading-triplet">
        <Graph graph={graph} options={options} events={events} style={{ height: '640px' }} />
      </div>
    </div>
  );
};

export default WhatGPT3;
