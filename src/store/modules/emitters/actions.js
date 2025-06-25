// export const ACTION_RENAME_EMITTER = 'renameEmitter';

import { getAssetIdx, getEmitterByName } from './getters';
import { EMITTER_TYPE_DEFAULT } from './names';

const getDefaultConfig = () => {
  const config = {
    // min-required configuration
    lifetime: {
      min: 1,
      max: 1,
    },
    frequency: 0.1,
    spawnChance: 1,
    particlesPerWave: 1,
    emitterLifetime: -1,
    maxParticles: 1000,
    addAtBack: false,
    spawnType: 'point',
    pos: {
      x: 0,
      y: 0,
    },
    extraData: {
      path: 'x',
    },
  };



  return config;
};

export const addEmitter = ({ commit, state }, emitterName) => {
  commit('addEmitter', {
    name: emitterName,
    type: EMITTER_TYPE_DEFAULT,
    enabled: false,
    config: getDefaultConfig(state.v3Syntax),
    art: [],
    animConfig: {
      loop: false,
      framerate: -1,
    },
  });
};

export const renameEmitter = ({ commit, dispatch, getters }, { oldName, newName }) => {
  commit('renameEmitter', { oldName, newName });

  if (getters.current === oldName) {
    dispatch('setCurrentEmitter', newName);
  }
};
export const setEmitterEnabled = ({ commit }, emitterNameAndState) => {
  commit('toggleEmitter', emitterNameAndState);
};

// eslint-disable-next-line max-len
export const tryToAddAsset = (state, assetFilename) => new Promise((resolve, reject) => {
  const idx = getAssetIdx(state)(assetFilename);
  if (idx > -1) {
    reject(new Error(`filename '${assetFilename}' already exists.\n
    Remove is first or rename this file`));
  } else {
    resolve();
  }
});

export const addAsset = ({ commit, state }, assetNameAndBody) => {
  tryToAddAsset(
    state,
    assetNameAndBody.filename,
  ).then(() => {
    commit('addAsset', assetNameAndBody);
    return Promise.resolve();
  });
};

export const addBehaviorAsset = ({ commit, state }, assetNameAndBody) => {
  tryToAddAsset(
    state,
    assetNameAndBody.filename,
  ).then(() => {
    commit('addBehaviorAsset', assetNameAndBody);
    return Promise.resolve();
  });
};

export const addAssetToEmitter = ({ commit, state }, assetNameAndBody) => tryToAddAsset(
  state,
  assetNameAndBody.filename,
).then(() => {
  commit('addAsset', assetNameAndBody);
  commit('addAssetToEmitter', assetNameAndBody.filename);
  return Promise.resolve();
});

export const downloadEmitterConfig = ({ state }, emitterName) => {
  const emitter = getEmitterByName(state, emitterName);

  // const upgraded = upgradeConfig(emitter.config, cleanArt);

  const a = document.createElement('a');
  a.download = `${emitterName}.json`;
  a.href = `data:text/json;charset=utf-8,${
    encodeURIComponent(
      JSON.stringify(emitter.config, null, 2),
    )}`;
  a.click();
};

export const uploadEmitterConfig = (
  { commit },
  { emitterName, file },
) => new Promise((resolve, reject) => {
  if (!file || !window.FileReader) {
    reject(new Error('Could not load file'));
    return;
  }

  const reader = new FileReader();
  reader.readAsText(file);
  reader.onloadend = () => {
    try {
      const parsedBody = JSON.parse(reader.result);
      if (!parsedBody.extraData) {
        parsedBody.extraData = {};
      }
      if (!parsedBody.extraData.path) {
        parsedBody.extraData.path = 'x';
      }
      commit('setEmitterConfig', {
        emitterName,
        config: parsedBody,
      });
    } catch (e) {
      reject(e);
    }
  };

  reader.onerror = reject;
});
