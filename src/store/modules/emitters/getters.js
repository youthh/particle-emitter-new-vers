/* eslint-disable arrow-body-style */

import {
  DINAMIC_SPEED,
  STATIC_ALPHA,
  STATIC_SCALE,
} from "@/store/modules/emitters/names";

export const enabledEmitters = (state) => state.all.filter(({enabled}) => enabled);
export const getEmitterByName = (state, name) => {
  return state.all.find((emitter) => emitter.name === name);
};

export const currentConfig = (state) => {
  const idx = state.all.findIndex((e) => e.name === state.current);
  return state.all[idx].config;
};

// Behavior getters
export const getRotationBehavior = (state) => {
  const rotatiponBehavior = state.all[0].config.behaviors.find((behavior) => behavior?.type === 'rotation').config;
  return rotatiponBehavior;
};
export const getMoveAccelerationBehavior = (state) => {
  const rotatiponBehavior = state.all[0].config.behaviors
    .find((behavior) => behavior?.type === 'moveAcceleration')?.config;
  return rotatiponBehavior;
};
export const getBurstSpawnBehavior = (state) => {
  const rotatiponBehavior = state.all[0].config.behaviors
    .find((behavior) => behavior?.type === 'spawnBurst')?.config;
  return rotatiponBehavior;
};
export const getScaleBehavior = (state) => {
  const rotatiponBehavior = state.all[0].config.behaviors
    .find((behavior) => behavior?.type === 'scale')?.config;
  return rotatiponBehavior;
};

export const getShapeBehavior = (state) => {
  const rotatiponBehavior = state.all[0].config.behaviors
    .find((behavior) => behavior?.type === 'spawnShape')?.config;
  return rotatiponBehavior;
};

export const getEmitterIdx = (state, name) => state.all.findIndex((e) => e.name === name);

export const getCurrentEmitter = (state) => getEmitterByName(state, state.current);
export const getCurrentEmitterIdx = (state) => state.all.findIndex((e) => e.name === state.current);

export const nameExists = (state) => (emitterName) => {
  return state.all.some((emitter) => emitter.name === emitterName);
};
export const emittersList = (state) => state.all.map(({name, type, enabled}) => ({
  name,
  type,
  enabled,
  isCurrent: state.current === name,
}));

export const getCurrentTypeTextures = (state) => state.texturesType

export const v3Syntax = (state) => state.v3Syntax;

export const assetsList = (state) => state.assets;
export const assetsListNames = (state) => state.assets.map((item) => item.name);
export const currentAssetsList = (state) => getCurrentEmitter(state).art;

export const getAssetIdx = (state) => (name) => {
  return state.all[0].assetsBehaviors.findIndex((item) => item.name === name);
};

export const getAssetItem = (state) => (fileName) => {
  return [...state.assets, ...state.all[0].assetsBehaviors].find((item) => item.name === fileName);
};

export const getSpawnType = (state) => state.all[0].spawnType;

export const getAnimateSingleTextures = (state) => {
  const idx = getCurrentEmitterIdx(state);

  const assets = state.all[idx].assetsBehaviors;
  return assets;
};
export const getBehaviorAssetIdx = (state) => (name) => {
  const idx = getCurrentEmitterIdx(state);

  return state.all[idx].assetsBehaviors.findIndex((item) => item.name === name);
};

export const getAnimateSingleTexturesConfig = (state) => {
  const idx = getCurrentEmitterIdx(state);

  return state.all[idx].config.behaviors.find((b) => b.type === 'animatedSingle')?.config.anim;
};

export const getEnabledBehavior = (state) => (name) => {
  // return state.all[0].enabledBehaviors.find((b) => b.name === name);
  const enabledBehaviors = state.all[0].config.behaviors.map(behaviors => behaviors.type)
  return enabledBehaviors.some((b) => b === name);
}

export const getColorType = (state) => {
  return state.colorType

}

export const getAlphaType = (state) => {
  return state.alphaType
}

export const getScaleType = (state) => {
  return state.scaleType
}
export const getMoveSpeedType = (state) => {
  return state.moveSpeedType
}
export const getScaleStatic = (state) => {
  return state.all[0].config.behaviors.find((behavior) => behavior?.type === STATIC_SCALE)?.config;
}

export const getStaticAlpha = (state) => {
  return state.all[0].config.behaviors.find((behavior) => behavior?.type === STATIC_ALPHA)?.config;
}
export const getStaticMoveSpeed = (state) => {
  return state.all[0].config.behaviors.find((behavior) => behavior?.type.includes(DINAMIC_SPEED))?.config;
}

export const getBlendMode = (state) => {
  return state.all[0].config.behaviors.find((behavior) => behavior?.type === 'blendMode')?.config.blendMode;
}

export const getPathMoveConfig = (state) => {
  return state.all[0].config.behaviors.find((behavior) => behavior?.type === 'movePath')?.config;
}

export const getConfigType = (state) => {
  return state.configType
}
