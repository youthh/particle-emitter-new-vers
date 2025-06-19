export default {
  namespaced: true,
  state: {
    renderType: 1, // UNKNOWN: 0, WEBGL: 1, CANVAS: 2
    image: {
      filename: '',
      fileData: '',
      pos: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
    },
    color: '#808080',
    emitOnMouseClick: false,
    updateOnMouseMove: true,
  },
  getters: {
    renderType: (stage) => stage.renderType,
    color: (state) => state.color,
    imgFile: (state) => state.image.filename,
    imgData: (state) => state.image.fileData,
    imgPos: (state) => state.image.pos,
    imgScale: (state) => state.image.scale,
  },
  mutations: {
    changeRenderType(state, render) {
      state.renderType = render;
    },
    changeColor(state, color) {
      state.color = color;
    },
    changeImgPos(state, pos) {
      state.image.pos = pos;
    },
    changeImgScale(state, scale) {
      state.image.scale = scale;
    },
    changeImg(state, imgData) {
      state.image.fileData = imgData.fileData;
      state.image.filename = imgData.filename;
    },
    toggleEmitOnMouseClick(state, enabled) {
      state.emitOnMouseClick = enabled;
    },
    toggleUpdateOnMouseMove(state, enabled) {
      state.updateOnMouseMove = enabled;
    },
  },
  actions: {

  },
};
