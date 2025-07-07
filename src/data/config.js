import {
  DINAMIC_ALPHA,
  DINAMIC_COLOR,
  DINAMIC_SCALE, DINAMIC_SPEED, RANDOM_TEXTURE,
  SINGLE_TEXTURE, SPAWN_TYPE_POLYGONAL, SPAWN_TYPE_TORUS,
  STATIC_SPEED
} from '@/store/modules/emitters/names';

export const BUBBLE_STREAM_PATH = {
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
  },
  assetsBehaviors: [{
    body: 'data:image/png;base64,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',
    name: 'CartoonSmoke.png',
  }],
  types: {
    texturesType: SINGLE_TEXTURE,
    colorType: DINAMIC_COLOR,
    alphaType: DINAMIC_ALPHA,
    scaleType: DINAMIC_SCALE,
    moveSpeedType: STATIC_SPEED,
  },
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
  },
  spawnType: SPAWN_TYPE_POLYGONAL,
  assetsBehaviors: [{
    body: 'data:image/png;base64,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',
    name: 'CartoonSmoke.png',
  }],
}

export const FLAME_AND_SMOKE = {
  name: 'Flame and Smoke' ,
  config: {
    lifetime: {
      min: 0.5,
      max: 0.7
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
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                value: 0.62,
                time: 0
              },
              {
                value: 0,
                time: 0.6
              },
              {
                value: 0,
                time: 0.7
              },
              {
                value: 0.8,
                time: 0.71
              },
              {
                value: 0,
                time: 1
              }
            ],
            isStepped: false
          }
        }
      },
      {
        type: "moveSpeed",
        config: {
          speed: {
            list: [
              {
                value: 500,
                time: 0
              },
              {
                value: 450,
                time: 0.7
              },
              {
                value: 450,
                time: 1
              }
            ],
            isStepped: true
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
                value: 0.25,
                time: 0
              },
              {
                value: 0.75,
                time: 1
              }
            ],
            isStepped: false
          },
          minMult: 1
        }
      },
      {
        type: "color",
        config: {
          color: {
            list: [
              {
                value: "fff191",
                time: 0
              },
              {
                value: "ff622c",
                time: 0.6
              },
              {
                value: "111111",
                time: 0.7
              },
              {
                value: "333333",
                time: 1
              }
            ],
            isStepped: false
          }
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
        type: "textureRandom",
        config: {
          textures: [
            "particle.png",
            "Fire.png"
          ]
        }
      },
      {
        type: "spawnShape",
        config: {
          type: "torus",
          data: {
            x: 0,
            y: 0,
            radius: 10,
            innerRadius: 0,
            affectRotation: false
          }
        }
      }
    ]
  },
  assetsBehaviors: [
    {name: "particle.png", body: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAQAAAC0jZKKAAACPElEQVR4AbXXcW/TMBAF8EtCypa1LCDB9/98ILG1dKNNCOZZT8h6N4562eZTzH8/ni6dfWns4kqtvbMOT2tmv+0XasG/F1aTLFxd5lDcCS8o0tyX58K9bVA9WZe40LNNqLkevrJr1HvrC1vgQoM820/UqQZubQBKWDKjDJjP+wg41/J/eAOQsGb2rWDlvKzMTyEMaJvBIHNpBdswOfhoZ4VL2h3Irc+srSiJPYv9B1Mr3IHcCS2ZJTFf2+RZ1NEWD5PF7mmQ/nfs85I9klb4KrNCa2YkZitcXmVZpwL3zFtwpYH6l3cWtqDMPP+Fb+zWPthW6BvUIJmZuOTN7APqKOjB9vZAuAM6ArvFE9CSeI5Y1B7PPfAFMPKMKMWVZmbCzKusoveoKcODjQDzgx3c6GnUFnADOAFGV5V16B7PI2BkBRjgmf4IWBbYu8I6lPuhSa2w4xP8k7CF/l5Q7HuiZW9ST+wpjgKLvP9ed6gAJXztWcG/2CaAJ/tKlJSnm7RTTHHATQAnwAFKWCn/H3y2eH2L2ZfDIf06rXD8m768l//cAvzN/kBe709a8cPFQ4jXFA8hHpvVh1D9scmrqfbYrD/oO0s5caYrDvraqwlwW3811V6mvXUrLtOq6x+NYCt0vIqv/2hgcUPWqoFFRixlB9tEIxZHWKHJLmuGQraifijUMTbIq63QzDLGrh+8wVYO3rI6nzdohc+81H3cDHiijxvNfAJ9Wv855hJL5nnlB2Tw8ojzC7UelrXqk/cPn233eGpGsfAAAAAASUVORK5CYII="},
    {name: "Fire.png", body: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQIAAAAzCAMAAABLwPbeAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAv19/Lx/P7z8Pn2/fj69PGV9oAwAAAT5JREFUeF7t2kluRCEMBFAzGjP9uv9ps0ORonTSkA123g2wMEMBafQvlc8i2RLb7PjCufGURPolXxkv9JZIM3kcfsbVC+mUGuO3XBNSRyreUx/SpXS8rXvSI00sNosQGLt6JAWSw4khdLvGOMPR7hRYvIKN4FSlaw38ieyC0SboM1x+hSyMA07BfSngQEh0PZnYlhspEDN2safF5jKQE2nQsIubzWRgQY5kfBmopIJn7PKkwsQuLtabICfr6ZATUiA6bKtCCgzsG6SA79gX6HrS2GQutsSBI8/14+84wldXQMIEjCfkHovZA9HDOJLFaDayVDGekCGQDlLtZoRLOHw1t9oMWUiXxpsRmdmfNPyQRsVtxCNGi5A9KSaBN95KlJGQ8QJXIQPK4O8KMBJZUUbf+FCrTfLBrdnAM0Q68wHyD6PwTkMVWQAAAABJRU5ErkJggg=="}
  ],
  types: {
    texturesType: RANDOM_TEXTURE,
    colorType: DINAMIC_COLOR,
    alphaType: DINAMIC_ALPHA,
    scaleType: DINAMIC_SCALE,
    moveSpeedType: DINAMIC_SPEED,
  },
  spawnType: SPAWN_TYPE_TORUS
}


export const FLAME_AND_SMOKE_POLYGON = {
  name: 'Flame and Smoke Polygon',
  config: {
    "lifetime": {
      "min": 0.1,
      "max": 0.75
    },
    "frequency": 0.001,
    "emitterLifetime": 0,
    "maxParticles": 1000,
    "addAtBack": false,
    "pos": {
      "x": 0,
      "y": 0
    },
    "behaviors": [
      {
        "type": "alpha",
        "config": {
          "alpha": {
            "list": [
              {
                "time": 0,
                "value": 0.62
              },
              {
                "time": 1,
                "value": 0
              }
            ]
          }
        }
      },
      {
        "type": "moveSpeedStatic",
        "config": {
          "min": 50,
          "max": 50
        }
      },
      {
        "type": "scale",
        "config": {
          "scale": {
            "list": [
              {
                "time": 0,
                "value": 0.05
              },
              {
                "time": 1,
                "value": 0.15
              }
            ]
          },
          "minMult": 1
        }
      },
      {
        "type": "color",
        "config": {
          "color": {
            "list": [
              {
                "time": 0,
                "value": "fff191"
              },
              {
                "time": 1,
                "value": "ff622c"
              }
            ]
          }
        }
      },
      {
        "type": "rotation",
        "config": {
          "accel": 0,
          "minSpeed": 50,
          "maxSpeed": 50,
          "minStart": 265,
          "maxStart": 275
        }
      },
      {
        "type": "textureRandom",
        "config": {
          "textures": [
            "images/particle.png",
            "images/Fire.png"
          ]
        }
      },
      {
        "type": "spawnShape",
        "config": {
          "type": "polygonalChain",
          "data": [
            [
              {
                "x": -300,
                "y": 100
              },
              {
                "x": -300,
                "y": -100
              }
            ],
            [
              {
                "x": -300,
                "y": -100
              },
              {
                "x": -250,
                "y": -100
              }
            ],
            [
              {
                "x": -300,
                "y": 0
              },
              {
                "x": -250,
                "y": 0
              }
            ],
            [
              {
                "x": -200,
                "y": 100
              },
              {
                "x": -200,
                "y": -100
              }
            ],
            [
              {
                "x": -100,
                "y": 100
              },
              {
                "x": -100,
                "y": -100
              },
              {
                "x": -50,
                "y": -50
              },
              {
                "x": -100,
                "y": 0
              },
              {
                "x": -50,
                "y": 100
              }
            ],
            [
              {
                "x": 0,
                "y": 100
              },
              {
                "x": 0,
                "y": -100
              }
            ],
            [
              {
                "x": 0,
                "y": -100
              },
              {
                "x": 50,
                "y": -100
              }
            ],
            [
              {
                "x": 0,
                "y": 0
              },
              {
                "x": 50,
                "y": 0
              }
            ],
            [
              {
                "x": 0,
                "y": 100
              },
              {
                "x": 50,
                "y": 100
              }
            ]
          ]
        }
      }
    ]
  },
  assetsBehaviors: [
    {name: "particle.png", body: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAQAAAC0jZKKAAACPElEQVR4AbXXcW/TMBAF8EtCypa1LCDB9/98ILG1dKNNCOZZT8h6N4562eZTzH8/ni6dfWns4kqtvbMOT2tmv+0XasG/F1aTLFxd5lDcCS8o0tyX58K9bVA9WZe40LNNqLkevrJr1HvrC1vgQoM820/UqQZubQBKWDKjDJjP+wg41/J/eAOQsGb2rWDlvKzMTyEMaJvBIHNpBdswOfhoZ4VL2h3Irc+srSiJPYv9B1Mr3IHcCS2ZJTFf2+RZ1NEWD5PF7mmQ/nfs85I9klb4KrNCa2YkZitcXmVZpwL3zFtwpYH6l3cWtqDMPP+Fb+zWPthW6BvUIJmZuOTN7APqKOjB9vZAuAM6ArvFE9CSeI5Y1B7PPfAFMPKMKMWVZmbCzKusoveoKcODjQDzgx3c6GnUFnADOAFGV5V16B7PI2BkBRjgmf4IWBbYu8I6lPuhSa2w4xP8k7CF/l5Q7HuiZW9ST+wpjgKLvP9ed6gAJXztWcG/2CaAJ/tKlJSnm7RTTHHATQAnwAFKWCn/H3y2eH2L2ZfDIf06rXD8m768l//cAvzN/kBe709a8cPFQ4jXFA8hHpvVh1D9scmrqfbYrD/oO0s5caYrDvraqwlwW3811V6mvXUrLtOq6x+NYCt0vIqv/2hgcUPWqoFFRixlB9tEIxZHWKHJLmuGQraifijUMTbIq63QzDLGrh+8wVYO3rI6nzdohc+81H3cDHiijxvNfAJ9Wv855hJL5nnlB2Tw8ojzC7UelrXqk/cPn233eGpGsfAAAAAASUVORK5CYII="},
    {name: "Fire.png", body: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQIAAAAzCAMAAABLwPbeAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAv19/Lx/P7z8Pn2/fj69PGV9oAwAAAT5JREFUeF7t2kluRCEMBFAzGjP9uv9ps0ORonTSkA123g2wMEMBafQvlc8i2RLb7PjCufGURPolXxkv9JZIM3kcfsbVC+mUGuO3XBNSRyreUx/SpXS8rXvSI00sNosQGLt6JAWSw4khdLvGOMPR7hRYvIKN4FSlaw38ieyC0SboM1x+hSyMA07BfSngQEh0PZnYlhspEDN2safF5jKQE2nQsIubzWRgQY5kfBmopIJn7PKkwsQuLtabICfr6ZATUiA6bKtCCgzsG6SA79gX6HrS2GQutsSBI8/14+84wldXQMIEjCfkHovZA9HDOJLFaDayVDGekCGQDlLtZoRLOHw1t9oMWUiXxpsRmdmfNPyQRsVtxCNGi5A9KSaBN95KlJGQ8QJXIQPK4O8KMBJZUUbf+FCrTfLBrdnAM0Q68wHyD6PwTkMVWQAAAABJRU5ErkJggg=="}
  ],
  types: {
    texturesType: RANDOM_TEXTURE,
    colorType: DINAMIC_COLOR,
    alphaType: DINAMIC_ALPHA,
    scaleType: DINAMIC_SCALE,
    moveSpeedType: STATIC_SPEED,
  }
}
