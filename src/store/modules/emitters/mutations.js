import {
  getAssetIdx,
  getEmitterByName,
  getCurrentEmitterIdx,
  getEmitterIdx, getBehaviorAssetIdx,
} from './getters';

import {
  SPAWN_TYPE_RING,
  SPAWN_TYPE_RECT, EMITTER_TYPE_PATH,
} from './names';

const getCurrentItem = (state) => {
  const currentIdx = state.all.findIndex((value) => value.name === state.current);
  return state.all[currentIdx];
};

export const addEmitter = (state, emitterObj) => {
  state.all.push(emitterObj);
};
export const setCurrentEmitter = (state, emitterName) => {
  state.current = emitterName;
};

export const removeEmitter = (state, emitterName) => {
  const currentIdx = getEmitterIdx(state, emitterName);
  state.all.splice(currentIdx, 1);

  if (state.current === emitterName) {
    state.current = '';
  }
};
// export const setEmitterType = (state, name, type) => state.emitters.get(name).type = type;
export const toggleEmitter = (state, { emitterName, enabled }) => {
  const emitter = getEmitterByName(state, emitterName);
  if (emitter) {
    emitter.enabled = enabled;
  }
};
export const renameEmitter = (state, { oldName, newName }) => {
  const emitter = getEmitterByName(state, oldName);
  if (emitter) {
    emitter.name = newName;
  } else {
    throw new Error(`No emitters found with name: ${oldName}`);
  }
};
export const toggleSyntaxVersion = () => {

};

// =============== Assets management ===============
export const addAsset = (state, assetNameAndData) => {
  state.assets.push({
    name: assetNameAndData.filename,
    body: assetNameAndData.fileData,
  });
  // Vue.set(state, 'assets', assets);
};

export const addBehaviorAsset = (state, assetNameAndData) => {
  const idx = getCurrentEmitterIdx(state);
  // delete prev textures
  state.all[idx].config.behaviors = state.all[idx].config.behaviors.filter((behavior) => !behavior.type.includes('texture'));
  state.all[idx].assetsBehaviors.push({
    name: assetNameAndData.filename,
    body: assetNameAndData.fileData,
  });
  const isAnimatedSingle = state.all[idx].config.behaviors.find((behavior) => behavior.type === 'animatedSingle');
  if (!isAnimatedSingle) {
    state.all[idx].config.behaviors.push({
      type: 'animatedSingle',
      config: {
        anim: {
          framerate: 30,
          loop: false,
          textures: [assetNameAndData.filename],
        },
      },
    });
  } else {
    state.all[idx].config.behaviors.map((behavior) => {
      if (behavior.type === 'animatedSingle') {
        behavior.config.anim.textures.push(assetNameAndData.filename);
      }
      return behavior;
    });
  }
};

export const removeEmitterAsset = (state, assetFilename) => {
  const current = getCurrentItem(state);
  const assetIdx = current.art.indexOf(assetFilename);

  current.art.splice(assetIdx, 1);
};
export const removeBehaviorAsset = (state, assetFilename) => {
  const idx = getBehaviorAssetIdx(state)(assetFilename);
  state.all[idx].assetsBehaviors.splice(idx, 1);
  removeEmitterAsset(state, assetFilename);
  const ix = getCurrentEmitterIdx(state);
  state.all[ix].config.behaviors.map((behavior) => {
    if (behavior.type === 'animatedSingle') {
      behavior.config.anim.textures.splice(idx, 1);
    }
    return behavior;
  });
};
export const removeAsset = (state, assetFilename) => {
  const idx = getAssetIdx(state)(assetFilename);
  state.assets.splice(idx, 1);
  removeEmitterAsset(state, assetFilename);
};
export const setEmitterAssets = (state, assetsList) => {
  getCurrentItem(state).art = assetsList;
};
export const addAssetToEmitter = (state, assetFilename) => {
  getCurrentItem(state).art.push(assetFilename);
};
// =============== End Assets management ===============

export const setEmitterConfig = (state, { emitterName, config }) => {
  // todo: validate uploaded config
  const idx = getEmitterIdx(state, emitterName);
  state.all[idx].config = config;
};

// =============== Emitter config manipulations ========
const setConfigProp = (state, propName, propValue) => {
  const idx = getCurrentEmitterIdx(state);
  state.all[idx].config = { ...state.all[idx].config, [propName]: propValue };
};

const setConfigPropWithAttr = (state, propName, propAttr, propValue) => {
  const idx = getCurrentEmitterIdx(state);
  state.all[idx].config[propName] = { ...state.all[idx].config[propName], [propAttr]: propValue };
};

export const setBlendMode = (state, mode) => setConfigProp(state, 'blendMode', mode);
export const setFrequency = (state, value) => setConfigProp(state, 'frequency', value);
export const setEmitterLifetime = (state, value) => setConfigProp(state, 'emitterLifetime', value);
export const setMaxParticles = (state, value) => setConfigProp(state, 'maxParticles', value);
export const setSpawnChance = (state, value) => setConfigProp(state, 'spawnChance', value);
export const setAddAtBack = (state, value) => setConfigProp(state, 'addAtBack', value);
export const setSpawnType = (state, value) => {
  const c = getCurrentItem(state).config;
  // create default required props per spawn type
  if (value === SPAWN_TYPE_RING ) {
    if (!c.spawnCircle) {
      c.spawnCircle = {
        x: 0, y: 0, r: 1, minR: 1,
      };
    }

    if (!c.spawnCircle.minR) c.spawnCircle.minR = 1;
  } else if (value === SPAWN_TYPE_RECT && !c.spawnRect) {
    c.spawnRect = {
      x: 0, y: 0, w: 1, h: 1,
    };
  }

  setConfigProp(state, 'spawnType', value);
};

export const setTypeSpawn = (state, value) => {
  const idx = getCurrentEmitterIdx(state);
  state.all[idx].config.behaviors =  state.all[idx].config.behaviors.filter((behavior) => behavior.type !== 'spawnShape');
  state.all[idx].spawnType = value;
};
export const setPPerWave = (state, value) => setConfigProp(state, 'particlesPerWave', value);
export const setPSpacing = (state, value) => setConfigProp(state, 'particleSpacing', value);
export const setAngleStart = (state, value) => setConfigProp(state, 'angleStart', value);
export const setSpawnPos = (state, {
  attr,
  value,
}) => setConfigPropWithAttr(state, 'pos', attr, value);
export const setSpawnCircle = (state, {
  attr,
  value,
}) => setConfigPropWithAttr(state, 'spawnCircle', attr, value);
export const setSpawnRect = (state, {
  attr,
  value,
}) => setConfigPropWithAttr(state, 'spawnRect', attr, value);

export const setLifetimeMin = (state, value) => setConfigPropWithAttr(state, 'lifetime', 'min', value);
export const setLifetimeMax = (state, value) => setConfigPropWithAttr(state, 'lifetime', 'max', value);


const getCurrentListedItem = (state, propName, behavior) => {
  const c = getCurrentItem(state).config;
  const co = c.behaviors.find((item) => item.type === behavior).config[propName].list;
  return co;
};
const setCurrentListItem = (state, propName, list) => {
  setConfigPropWithAttr(state, propName, 'list', list.sort((a, b) => a.time - b.time));
};

const validateList = (list) => {
  if (list[list.length - 1].time !== 1) {
    // the last item at the list should have time == 1
    // eslint-disable-next-line no-param-reassign
    list[list.length - 1].time = 1;
  }
  return list;
};

export const addNewListedStep = (state, {propName, behavior}) => {
  const list = getCurrentListedItem(state, propName, behavior);
  list.push({
    value: propName === 'color' ? 'ffffff' : 0,
    time: 1,
  });
  setCurrentListItem(state, propName, list);
};
export const removeListedStep = (state, { propName, index, behavior }) => {
  const list = getCurrentListedItem(state, propName, behavior);
  list.splice(index, 1);
  validateList(list);
  setCurrentListItem(state, propName, list);
};
export const setListedStepValue = (state, {
  propName, index, value, behavior,
}) => {
  const list = getCurrentListedItem(state, propName, behavior);
  list[index].value = value;
  // setCurrentListItem(state, propName, list);
};
export const setListedStepTime = (state, {
  propName, index, time, behavior,
}) => {
  const list = getCurrentListedItem(state, propName, behavior);
  if (index === list.length - 1 && time !== 1) {
    return;
  }
  list[index].time = time;
  list.sort((a, b) => a.time - b.time)
  // setCurrentListItem(state, propName, list);
};

export const setPPropIsSteppedValue = (state, { propName, value }) => {
  setConfigPropWithAttr(state, propName, 'isStepped', value);
};
export const setPPropEasing = (state, { propName, value }) => {
  let normalized = value.trim();
  normalized = normalized.replace(/(s|cp|e):/g, '"$1":');
  setConfigPropWithAttr(state, propName, 'ease', JSON.parse(normalized));
};

// export const setOldAPIPropStart = (state, { propName, value }) => {
//   // setConfigPropWithAttr(state, propName, 'start', value);
// };

// export const setOldAPIPropEnd = (state, { propName, value }) => {
//   // setConfigPropWithAttr(state, propName, 'end', value);
// };

export const setEmitterPath = (state, pathValue) => {
  setConfigPropWithAttr(state, 'extraData', 'path', pathValue);
};

// =============== End emitter config manipulations ========

export const setEmitterType = (state, typeValue) => {
  const idx = getCurrentEmitterIdx(state);

  if (typeValue === EMITTER_TYPE_PATH && !state.all[idx].config.extraData) {
    state.all[idx].config.extraData = {
      path: 'x',
    };
  }
  state.all[idx].type = typeValue;
};

const setAnimProp = (state, propName, propValue) => {
  const idx = getCurrentEmitterIdx(state);

  state.all[idx].animConfig = { ...state.all[idx].animConfig, [propName]: propValue };
};

export const setAnimationFramerate = (state, value) => {
  setAnimProp(state, 'framerate', value);
};
export const setAnimationLoop = (state, value) => {
  setAnimProp(state, 'loop', value);
};

export const updateBehaviorConfig = (state, { type, key, value }) => {
  const emitter = state.all.find((e) => e.name === state.current);
  if (!emitter) return;

  const behavior = emitter.config.behaviors.find((b) => b.type === type);
  if (!behavior) return;

  const keys = key.split('.');
  let target = behavior.config;

  for (let i = 0; i < keys.length - 1; i += 1) {
    if (!(keys[i] in target)) return;
    target = target[keys[i]];
  }

  target[keys[keys.length - 1]] = value;
};

export const setFrameRate = (state, value) => {
  const idx = getCurrentEmitterIdx(state);
  const behaviors = state.all[idx].config.behaviors.map((b) => {
    if (b.type === 'animatedSingle') {
      return {
        ...b,
        config: {
          ...b.config,
          anim: {
            ...b.config.anim,
            framerate: value,
          },
        },
      };
    }
    return b;
  });
  state.all[idx].config.behaviors = behaviors;
};

export const setLoop = (state, value) => {
  const idx = getCurrentEmitterIdx(state);
  const behaviors = state.all[idx].config.behaviors.map((b) => {
    if (b.type === 'animatedSingle') {
      return {
        ...b,
        config: {
          ...b.config,
          anim: {
            ...b.config.anim,
            loop: value,
          },
        },
      };
    }
    return b;
  });
  state.all[idx].config.behaviors = behaviors;
};


export const shapeBehaviorChange = (state, {type, key, value}) => {
  const idx = getCurrentEmitterIdx(state);
  const isExistShape =  state.all[idx].config.behaviors.find((b) => b.type === "spawnShape");
  if(isExistShape) {
    state.all[idx].config.behaviors = state.all[idx].config.behaviors.map((b) => {
      if (b.type === "spawnShape") {
        return {
          ...b,
          config: {
            ...b.config,
            data: {
              ...b.config.data,
              [key]: value,
            },
          },
        };
      }
      return b;
    });
  }else {
    state.all[idx].config.behaviors.push({
      type: 'spawnShape',
      config: {
        type,
        data: {
          [key]: value,
        },
      },
    });
  }
}


export const setSpawnPolygon = (state, value) => {
  const idx = getCurrentEmitterIdx(state);
  const behaviors = state.all[idx].config.behaviors;
  const shapeIdx = behaviors.findIndex(b => b.type === 'spawnShape');

  if (shapeIdx !== -1) {
    behaviors[shapeIdx].config.data = value;
  } else {
    behaviors.push({
      type: 'spawnShape',
      config: {
        type: 'polygonChain',
        data: value,
      },
    });
  }
};

export const setTexturesType = (state, value) => {
  const idx = getCurrentEmitterIdx(state);
  state.all[idx].config.behaviors = state.all[idx].config.behaviors.filter(b => !b.type.includes('texture'));
  state.all[idx].assetsBehaviors = []
  state.texturesType = value;
}
