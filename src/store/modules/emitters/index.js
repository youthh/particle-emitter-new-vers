import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';
import {
  DINAMIC_SCALE, DINAMIC_SPEED,
  SINGLE_TEXTURE, STATIC_ALPHA, STATIC_COLOR
} from "@/store/modules/emitters/names";

export const checkName = (store) => (rule, value, callback) => {
  if (!value) {
    callback(new Error('Name can`t be empty'));
    return;
  }

  // if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
  //   callback(new Error('Use only letters, spaces and digits'));
  //   return;
  // }

  if (value.length > 50) {
    callback(new Error('Max length 50 characters'));
    return;
  }

  if (store.getters.nameExists(value)) {
    callback(new Error('Name already exists'));
    return;
  }

  callback();
};

/**
 * @typedef {SpawnCircleProp} SpawnCircleProp
 * @property {number} x
 * @property {number} y
 * @property {number} r
 * @property {number} [minR]
 *
 * @example
 * spawnCircle: {
 *     x: 0,
 *     y: 0,
 *     r: 10,
 *     minR: 5
 * },
 */

/**
 * @typedef {SpawnRectProp} SpawnRectProp
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

/**
 * @typedef {AssetsMap} AssetsMap
 * @property {string} name
 * @property {string} body
 */

export default {
  state: {
    all: [
      {
        name: 'def',
        currentEmitter: null,
        type: 'default',
        enabled: true,
        spawnType: 'rect',
        art: ['CartoonSmoke.png'],
        assetsBehaviors: [{
          name: 'CartoonSmoke.png',
          body: 'data:image/png;base64,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',
        }],
        animConfig: {
          loop: false,
          framerate: -1,
        },
        config: {
          lifetime: {
            min: 1,
            max: 4,
          },
          frequency: 0.001,
          emitterLifetime: 0,
          maxParticles: 150,
          addAtBack: false,
          pos: {
            x: 0,
            y: 0,
          },
          behaviors: [
            {
              "type": "spawnShape",
              "config": {
                "type": "rect",
                "data": {
                  "x": -300,
                  "y": 100,
                  "w": 400,
                  "h": 200
                }
              }
            },
            {
              type: 'alphaStatic',
              config: {
                alpha: 0.75,
              }
            },
            {
              type: 'blendMode',
              config: {
                blendMode: 'normal',
              }
            },
            {
              type: 'moveSpeed',
              config: {
                speed: {
                  list: [
                    {value: 500, time: 0},
                    {value: 450, time: 1},
                  ],
                },
                minMult: 1,
              },
            },
            {
              type: 'scale',
              config: {
                scale: {
                  list: [
                    {value: 0.50, time: 0},
                    {value: 0.55, time: 1},
                  ],
                },
                minMult: 1,
              },
            },
            {
              type: 'rotation',
              config: {
                accel: 0,
                minSpeed: 50,
                maxSpeed: 50,
                minStart: 265,
                maxStart: 275,
              },
            },
            {
              "type": "moveAcceleration",
              "config": {
                "accel": {
                  "x": 0,
                  "y": 0
                },
                "minStart": 600,
                "maxStart": 600,
                "rotate": false
              }
            },
            {
              type: 'textureSingle',
              config: {
                texture: 'CartoonSmoke.png',
              },
            },
            {
              type: 'colorStatic',
              config: {
                color: '#ffffff',
              }
            }
          ],
        },
      },
    ],
    current: 'def', // ''
    /** @type {AssetsMap[]} */
    assets: [{
      body: 'data:image/png;base64,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',
      name: 'CartoonSmoke.png',
    }],
    v3Syntax: true,
    texturesType: SINGLE_TEXTURE,
    colorType: STATIC_COLOR,
    alphaType: STATIC_ALPHA,
    scaleType: DINAMIC_SCALE,
    moveSpeedType: DINAMIC_SPEED,

  },
  getters,
  mutations,
  actions,
};
