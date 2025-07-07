import {
  DINAMIC_ALPHA,
  DINAMIC_COLOR,
  DINAMIC_SCALE,
  SINGLE_TEXTURE,
  STATIC_SPEED
} from '@/store/modules/emitters/names';

export const BUBBLE_STREAM_PATH =  {
  name: 'Bubble Stream Path',
  config: {
    lifetime: {
      min: 1.8,
      max: 2
    },
    frequency: 0.1,
    emitterLifetime: 0,
    maxParticles: 500,
    addAtBack: false,
    pos: {
      x: 0,
      y: 0
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                time: 0,
                value: 1
              },
              {
                time: 1,
                value: 0.16
              }
            ]
          }
        }
      },
      {
        type: "movePath",
        config: {
          path: "sin(x/10)*20",
          speed: {
            list: [
              {
                time: 0,
                value: 150
              },
              {
                time: 1,
                value: 100
              }
            ]
          },
          minMult: 1
        }
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              {
                time: 0,
                value: 0.3
              },
              {
                time: 1,
                value: 0.4
              }
            ]
          },
          minMult: 0.5
        }
      },
      {
        type: "rotation",
        config: {
          accel: 0,
          minSpeed: 0,
          maxSpeed: 20,
          minStart: 270,
          maxStart: 270
        }
      },
      {
        type: "textureRandom",
        config: {
          textures: [
            "images/Bubbles99.png"
          ]
        }
      },
      {
        type: "spawnPoint",
        config: {}
      }
    ]
  }
}

export const HEART_POLYGON_PATH = {
  name: 'Heart',
  config: {
    lifetime: {
      min: 1,
      max: 4
    },
    frequency: 0.001,
    emitterLifetime: 0,
    maxParticles: 1000,
    addAtBack: false,
    pos: {
      x: 0,
      y: 0
    },
    behaviors: [
      {
        type: "spawnShape",
        config: {
          type: "polygonalChain",
          data: [
            {
              x: 0,
              y: -250
            },
            {
              x: 50,
              y: -300
            },
            {
              x: 120,
              y: -280
            },
            {
              x: 170,
              y: -220
            },
            {
              x: 190,
              y: -150
            },
            {
              x: 180,
              y: -80
            },
            {
              x: 140,
              y: -20
            },
            {
              x: 90,
              y: 30
            },
            {
              x: 50,
              y: 80
            },
            {
              x: 20,
              y: 140
            },
            {
              x: 0,
              y: 190
            },
            {
              x: -20,
              y: 140
            },
            {
              x: -50,
              y: 80
            },
            {
              x: -90,
              y: 30
            },
            {
              x: -140,
              y: -20
            },
            {
              x: -180,
              y: -80
            },
            {
              x: -190,
              y: -150
            },
            {
              x: -170,
              y: -220
            },
            {
              x: -120,
              y: -280
            },
            {
              x: -50,
              y: -300
            },
            {
              x: 0,
              y: -250
            }
          ]
        }
      },
      {
        type: "blendMode",
        config: {
          blendMode: "normal"
        }
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              {
                value: 0.5,
                time: 0
              },
              {
                value: 0.55,
                time: 1
              }
            ]
          },
          minMult: 1
        }
      },
      {
        type: "rotation",
        config: {
          accel: 0,
          minSpeed: 50,
          maxSpeed: 50,
          minStart: 265,
          maxStart: 275
        }
      },
      {
        type: "moveAcceleration",
        config: {
          accel: {
            x: 0,
            y: 0
          },
          minStart: 600,
          maxStart: 600,
          rotate: false
        }
      },
      {
        type: "textureSingle",
        config: {
          texture: "CartoonSmoke.png"
        }
      },
      {
        type: "moveSpeedStatic",
        config: {
          min: 30,
          max: 30
        }
      },
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                value: 1,
                time: 0
              },
              {
                value: 0.1,
                time: 0.1
              },
              {
                value: 0,
                time: 1
              }
            ]
          }
        }
      },
      {
        type: "color",
        config: {
          color: {
            list: [
              {
                value: "#ff0000",
                time: 0
              },
              {
                value: "FB5E26",
                time: 0.5
              },
              {
                value: "000000",
                time: 0.8
              },
              {
                value: "ffffff",
                time: 1
              }
            ]
          }
        }
      }
    ],
    spawnChance: 0
  },
  types: {
    texturesType: SINGLE_TEXTURE,
    colorType: DINAMIC_COLOR,
    alphaType: DINAMIC_ALPHA,
    scaleType: DINAMIC_SCALE,
    moveSpeedType: STATIC_SPEED,
  }
}
