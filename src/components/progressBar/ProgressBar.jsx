import React from 'react';

const ProgressBar = ({ progress }) => {
  const Parentdiv = {
    width: '100%',
    borderRadius: 10,
    margin: 5,
    textAlign: 'center',
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    borderRadius: 10,
    textAlign: 'center',
  };

  const progresstext = {
    padding: 10,
    color: 'black',
    fontWeight: 900,
    textAlign: 'center',
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
