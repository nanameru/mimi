/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Proprietary Software license
 * that can be found at https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html.
 */
var Live2DCubismCore;
(function (Live2DCubismCore) {
  /** C calls. */
  var _csm = /** @class */ (function () {
    function _csm() {}
    _csm.getVersion = function () {
      return _em.ccall('csmGetVersion', 'number', [], []);
    };
    _csm.getLatestMocVersion = function () {
      return _em.ccall('csmGetLatestMocVersion', 'number', [], []);
    };
    _csm.getMocVersion = function (moc, mocSize) {
      return _em.ccall('csmGetMocVersion', 'number', ['number', 'number'], [moc, mocSize]);
    };
    _csm.getLogFunction = function () {
      return _em.ccall('csmGetLogFunction', 'number', [], []);
    };
    _csm.getSizeofModel = function (moc) {
      return _em.ccall('csmGetSizeofModel', 'number', ['number'], [moc]);
    };
    _csm.reviveMocInPlace = function (memory, mocSize) {
      return _em.ccall('csmReviveMocInPlace', 'number', ['number', 'number'], [memory, mocSize]);
    };
    _csm.initializeModelInPlace = function (moc, memory, modelSize) {
      return _em.ccall(
        'csmInitializeModelInPlace',
        'number',
        ['number', 'number', 'number'],
        [moc, memory, modelSize]
      );
    };
    _csm.hasMocConsistency = function (memory, mocSize) {
      return _em.ccall('csmHasMocConsistency', 'number', ['number', 'number'], [memory, mocSize]);
    };
    _csm.getRenderOrders = function (model) {
      return _em.ccall('csmGetRenderOrders', 'number', ['number'], [model]);
    };
    _csm.getParameterCount = function (model) {
      return _em.ccall('csmGetParameterCount', 'number', ['number'], [model]);
    };
    _csm.getParameterIds = function (model) {
      return _em.ccall('csmGetParameterIds', 'number', ['number'], [model]);
    };
    _csm.getParameterMinimumValues = function (model) {
      return _em.ccall('csmGetParameterMinimumValues', 'number', ['number'], [model]);
    };
    _csm.getParameterTypes = function (model) {
      return _em.ccall('csmGetParameterTypes', 'number', ['number'], [model]);
    };
    _csm.getParameterMaximumValues = function (model) {
      return _em.ccall('csmGetParameterMaximumValues', 'number', ['number'], [model]);
    };
    _csm.getParameterDefaultValues = function (model) {
      return _em.ccall('csmGetParameterDefaultValues', 'number', ['number'], [model]);
    };
    _csm.getParameterValues = function (model) {
      return _em.ccall('csmGetParameterValues', 'number', ['number'], [model]);
    };
    _csm.getParameterRepeats = function (model) {
      return _em.ccall('csmGetParameterRepeats', 'number', ['number'], [model]);
    };
    _csm.getParameterKeyCounts = function (model) {
      return _em.ccall('csmGetParameterKeyCounts', 'number', ['number'], [model]);
    };
    _csm.getParameterKeyValues = function (model) {
      return _em.ccall('csmGetParameterKeyValues', 'number', ['number'], [model]);
    };
    _csm.getPartCount = function (model) {
      return _em.ccall('csmGetPartCount', 'number', ['number'], [model]);
    };
    _csm.getPartIds = function (model) {
      return _em.ccall('csmGetPartIds', 'number', ['number'], [model]);
    };
    _csm.getPartOpacities = function (model) {
      return _em.ccall('csmGetPartOpacities', 'number', ['number'], [model]);
    };
    _csm.getPartParentPartIndices = function (model) {
      return _em.ccall('csmGetPartParentPartIndices', 'number', ['number'], [model]);
    };
    _csm.getPartOffscreenIndices = function (model) {
      return _em.ccall('csmGetPartOffscreenIndices', 'number', ['number'], [model]);
    };
    _csm.getDrawableCount = function (model) {
      return _em.ccall('csmGetDrawableCount', 'number', ['number'], [model]);
    };
    _csm.getDrawableIds = function (model) {
      return _em.ccall('csmGetDrawableIds', 'number', ['number'], [model]);
    };
    _csm.getDrawableConstantFlags = function (model) {
      return _em.ccall('csmGetDrawableConstantFlags', 'number', ['number'], [model]);
    };
    _csm.getDrawableDynamicFlags = function (model) {
      return _em.ccall('csmGetDrawableDynamicFlags', 'number', ['number'], [model]);
    };
    _csm.getDrawableTextureIndices = function (model) {
      return _em.ccall('csmGetDrawableTextureIndices', 'number', ['number'], [model]);
    };
    _csm.getDrawableDrawOrders = function (model) {
      return _em.ccall('csmGetDrawableDrawOrders', 'number', ['number'], [model]);
    };
    _csm.getDrawableOpacities = function (model) {
      return _em.ccall('csmGetDrawableOpacities', 'number', ['number'], [model]);
    };
    _csm.getDrawableMaskCounts = function (model) {
      return _em.ccall('csmGetDrawableMaskCounts', 'number', ['number'], [model]);
    };
    _csm.getDrawableMasks = function (model) {
      return _em.ccall('csmGetDrawableMasks', 'number', ['number'], [model]);
    };
    _csm.getDrawableVertexCounts = function (model) {
      return _em.ccall('csmGetDrawableVertexCounts', 'number', ['number'], [model]);
    };
    _csm.getDrawableVertexPositions = function (model) {
      return _em.ccall('csmGetDrawableVertexPositions', 'number', ['number'], [model]);
    };
    _csm.getDrawableVertexUvs = function (model) {
      return _em.ccall('csmGetDrawableVertexUvs', 'number', ['number'], [model]);
    };
    _csm.getDrawableIndexCounts = function (model) {
      return _em.ccall('csmGetDrawableIndexCounts', 'number', ['number'], [model]);
    };
    _csm.getDrawableIndices = function (model) {
      return _em.ccall('csmGetDrawableIndices', 'number', ['number'], [model]);
    };
    _csm.getDrawableMultiplyColors = function (model) {
      return _em.ccall('csmGetDrawableMultiplyColors', 'number', ['number'], [model]);
    };
    _csm.getDrawableScreenColors = function (model) {
      return _em.ccall('csmGetDrawableScreenColors', 'number', ['number'], [model]);
    };
    _csm.getDrawableParentPartIndices = function (model) {
      return _em.ccall('csmGetDrawableParentPartIndices', 'number', ['number'], [model]);
    };
    _csm.getDrawableBlendModes = function (model) {
      return _em.ccall('csmGetDrawableBlendModes', 'number', ['number'], [model]);
    };
    _csm.getOffscreenCount = function (model) {
      return _em.ccall('csmGetOffscreenCount', 'number', ['number'], [model]);
    };
    _csm.getOffscreenBlendModes = function (model) {
      return _em.ccall('csmGetOffscreenBlendModes', 'number', ['number'], [model]);
    };
    _csm.getOffscreenOpacities = function (model) {
      return _em.ccall('csmGetOffscreenOpacities', 'number', ['number'], [model]);
    };
    _csm.getOffscreenOwnerIndices = function (model) {
      return _em.ccall('csmGetOffscreenOwnerIndices', 'number', ['number'], [model]);
    };
    _csm.getOffscreenMultiplyColors = function (model) {
      return _em.ccall('csmGetOffscreenMultiplyColors', 'number', ['number'], [model]);
    };
    _csm.getOffscreenScreenColors = function (model) {
      return _em.ccall('csmGetOffscreenScreenColors', 'number', ['number'], [model]);
    };
    _csm.getOffscreenMaskCounts = function (model) {
      return _em.ccall('csmGetOffscreenMaskCounts', 'number', ['number'], [model]);
    };
    _csm.getOffscreenMasks = function (model) {
      return _em.ccall('csmGetOffscreenMasks', 'number', ['number'], [model]);
    };
    _csm.getOffscreenConstantFlags = function (model) {
      return _em.ccall('csmGetOffscreenConstantFlags', 'number', ['number'], [model]);
    };
    _csm.mallocMoc = function (mocSize) {
      return _em.ccall('csmMallocMoc', 'number', ['number'], [mocSize]);
    };
    _csm.mallocModelAndInitialize = function (moc) {
      return _em.ccall('csmMallocModelAndInitialize', 'number', ['number'], [moc]);
    };
    _csm.malloc = function (size) {
      return _em.ccall('csmMalloc', 'number', ['number'], [size]);
    };
    _csm.setLogFunction = function (handler) {
      _em.ccall('csmSetLogFunction', null, ['number'], [handler]);
    };
    _csm.updateModel = function (model) {
      _em.ccall('csmUpdateModel', null, ['number'], [model]);
    };
    _csm.readCanvasInfo = function (model, outSizeInPixels, outOriginInPixels, outPixelsPerUnit) {
      _em.ccall(
        'csmReadCanvasInfo',
        null,
        ['number', 'number', 'number', 'number'],
        [model, outSizeInPixels, outOriginInPixels, outPixelsPerUnit]
      );
    };
    _csm.resetDrawableDynamicFlags = function (model) {
      _em.ccall('csmResetDrawableDynamicFlags', null, ['number'], [model]);
    };
    _csm.free = function (memory) {
      _em.ccall('csmFree', null, ['number'], [memory]);
    };
    _csm.initializeAmountOfMemory = function (size) {
      _em.ccall('csmInitializeAmountOfMemory', null, ['number'], [size]);
    };
    return _csm;
  })();
  /** Necessary alignment for mocs (in bytes). */
  Live2DCubismCore.AlignofMoc = 64;
  /** Necessary alignment for models (in bytes). */
  Live2DCubismCore.AlignofModel = 16;
  /** .moc3 file version Unknown */
  Live2DCubismCore.MocVersion_Unknown = 0;
  /** .moc3 file version 3.0.00 - 3.2.07 */
  Live2DCubismCore.MocVersion_30 = 1;
  /** .moc3 file version 3.3.00 - 3.3.03 */
  Live2DCubismCore.MocVersion_33 = 2;
  /** .moc3 file version 4.0.00 - 4.1.05 */
  Live2DCubismCore.MocVersion_40 = 3;
  /** .moc3 file version 4.2.00 - 4.2.04 */
  Live2DCubismCore.MocVersion_42 = 4;
  /** .moc3 file version 5.0.00 - 5.2.03 */
  Live2DCubismCore.MocVersion_50 = 5;
  /** .moc3 file version 5.3.00 - */
  Live2DCubismCore.MocVersion_53 = 6;
  /** Normal Parameter. */
  Live2DCubismCore.ParameterType_Normal = 0;
  /** Parameter for blend shape. */
  Live2DCubismCore.ParameterType_BlendShape = 1;
  /** Normal blend. */
  Live2DCubismCore.ColorBlendType_Normal = 0;
  /** Add blend. */
  Live2DCubismCore.ColorBlendType_Add = 3;
  /** AddGlow blend. */
  Live2DCubismCore.ColorBlendType_AddGlow = 4;
  /** Darken blend. */
  Live2DCubismCore.ColorBlendType_Darken = 5;
  /** Multiply blend. */
  Live2DCubismCore.ColorBlendType_Multiply = 6;
  /** ColorBurn blend. */
  Live2DCubismCore.ColorBlendType_ColorBurn = 7;
  /** LinearBurn blend. */
  Live2DCubismCore.ColorBlendType_LinearBurn = 8;
  /** Lighten blend. */
  Live2DCubismCore.ColorBlendType_Lighten = 9;
  /** Screen blend. */
  Live2DCubismCore.ColorBlendType_Screen = 10;
  /** ColorDodge blend. */
  Live2DCubismCore.ColorBlendType_ColorDodge = 11;
  /** Overlay blend. */
  Live2DCubismCore.ColorBlendType_Overlay = 12;
  /** SoftLight blend. */
  Live2DCubismCore.ColorBlendType_SoftLight = 13;
  /** HardLight blend. */
  Live2DCubismCore.ColorBlendType_HardLight = 14;
  /** LinearLight blend. */
  Live2DCubismCore.ColorBlendType_LinearLight = 15;
  /** Hue blend. */
  Live2DCubismCore.ColorBlendType_Hue = 16;
  /** Color blend. */
  Live2DCubismCore.ColorBlendType_Color = 17;
  /** Add compatible blend. */
  Live2DCubismCore.ColorBlendType_AddCompatible = 1;
  /** Multiply compatible blend. */
  Live2DCubismCore.ColorBlendType_MultiplyCompatible = 2;
  /** Over blend. */
  Live2DCubismCore.AlphaBlendType_Over = 0;
  /** Atop blend. */
  Live2DCubismCore.AlphaBlendType_Atop = 1;
  /** Out blend. */
  Live2DCubismCore.AlphaBlendType_Out = 2;
  /** ConjointOver blend. */
  Live2DCubismCore.AlphaBlendType_ConjointOver = 3;
  /** DisjointOver blend. */
  Live2DCubismCore.AlphaBlendType_DisjointOver = 4;
  /** Cubism version. */
  var Version = /** @class */ (function () {
    function Version() {}
    /**
     * Queries Core version.
     *
     * @return Core version.
     */
    Version.csmGetVersion = function () {
      return _csm.getVersion();
    };
    /**
     * Gets Moc file supported latest version.
     *
     * @return Moc file latest format version.
     */
    Version.csmGetLatestMocVersion = function () {
      return _csm.getLatestMocVersion();
    };
    Version.csmGetMocVersion = function (data, mocBytes) {
      if (data instanceof Moc) {
        return _csm.getMocVersion(data._ptr, mocBytes.byteLength);
      }
      // Allocate memory.
      var memory = _csm.mallocMoc(data.byteLength);
      if (!memory) {
        return 0;
      }
      // Initialize memory.
      var destination = new Uint8Array(_em.HEAPU8.buffer, memory, data.byteLength);
      destination.set(new Uint8Array(data));
      var mocVersion = _csm.getMocVersion(memory, data.byteLength);
      _csm.free(memory);
      return mocVersion;
    };
    return Version;
  })();
  Live2DCubismCore.Version = Version;
  /** Cubism logging. */
  var Logging = /** @class */ (function () {
    function Logging() {}
    /**
     * Sets log handler.
     *
     * @param handler  Handler to use.
     */
    Logging.csmSetLogFunction = function (handler) {
      // Cache log handler.
      Logging.logFunction = handler;
      // Wrap function to pointer.
      var pointer = _em.addFunction(Logging.wrapLogFunction, 'vi');
      // Sets log handler.
      _csm.setLogFunction(pointer);
    };
    /**
     * Queries log handler.
     *
     * @return Log handler.
     */
    Logging.csmGetLogFunction = function () {
      return Logging.logFunction;
    };
    /**
     * Wrap log function.
     *
     * @param messagePtr number
     *
     * @return string
     */
    Logging.wrapLogFunction = function (messagePtr) {
      // Pointer to string.
      var messageStr = _em.UTF8ToString(messagePtr);
      // Run log function.
      Logging.logFunction(messageStr);
    };
    return Logging;
  })();
  Live2DCubismCore.Logging = Logging;
  /** Cubism moc. */
  var Moc = /** @class */ (function () {
    /**
     * Initializes instance.
     *
     * @param mocBytes Moc bytes.
     */
    function Moc(mocBytes) {
      // Allocate memory.
      var memory = _csm.mallocMoc(mocBytes.byteLength);
      if (!memory) {
        return;
      }
      // Initialize memory.
      var destination = new Uint8Array(_em.HEAPU8.buffer, memory, mocBytes.byteLength);
      destination.set(new Uint8Array(mocBytes));
      // Revive moc.
      this._ptr = _csm.reviveMocInPlace(memory, mocBytes.byteLength);
      if (!this._ptr) {
        _csm.free(memory);
      }
    }
    /**
     * Checks consistency of a moc.
     *
     * @param mocBytes Moc bytes.
     *
     * @returns '1' if Moc is valid; '0' otherwise.
     */
    Moc.prototype.hasMocConsistency = function (mocBytes) {
      // Allocate memory.
      var memory = _csm.mallocMoc(mocBytes.byteLength);
      if (!memory) {
        return;
      }
      // Initialize memory.
      var destination = new Uint8Array(_em.HEAPU8.buffer, memory, mocBytes.byteLength);
      destination.set(new Uint8Array(mocBytes));
      var hasConsistency = _csm.hasMocConsistency(memory, mocBytes.byteLength);
      _csm.free(memory);
      return hasConsistency;
    };
    /** Creates [[Moc]] from [[ArrayBuffer]].
     *
     * @param buffer Array buffer
     *
     * @return [[Moc]] on success; [[null]] otherwise.
     */
    Moc.fromArrayBuffer = function (buffer) {
      if (!buffer) {
        return null;
      }
      var moc = new Moc(buffer);
      return moc._ptr ? moc : null;
    };
    /** Releases instance. */
    Moc.prototype._release = function () {
      _csm.free(this._ptr);
      this._ptr = 0;
    };
    return Moc;
  })();
  Live2DCubismCore.Moc = Moc;
  /** Cubism model. */
  var Model = /** @class */ (function () {
    /**
     * Initializes instance.
     *
     * @param moc Moc
     */
    function Model(moc) {
      this._ptr = _csm.mallocModelAndInitialize(moc._ptr);
      if (!this._ptr) {
        return;
      }
      this.parameters = new Parameters(this._ptr);
      this.parts = new Parts(this._ptr);
      this.drawables = new Drawables(this._ptr);
      this.offscreens = new Offscreens(this._ptr);
      this.canvasinfo = new CanvasInfo(this._ptr);
      var length = _csm.getDrawableCount(this._ptr) + _csm.getOffscreenCount(this._ptr);
      this.renderOrders = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getRenderOrders(this._ptr),
        length
      );
    }
    /**
     * Creates [[Model]] from [[Moc]].
     *
     * @param moc Moc
     *
     * @return [[Model]] on success; [[null]] otherwise.
     */
    Model.fromMoc = function (moc) {
      var model = new Model(moc);
      return model._ptr ? model : null;
    };
    /**
     * Gets object render orders.
     *
     * @returns {Int32Array} Object render orders.
     */
    Model.prototype.getRenderOrders = function () {
      return this.renderOrders;
    };
    /** Updates instance. */
    Model.prototype.update = function () {
      _csm.updateModel(this._ptr);
    };
    /** Releases instance. */
    Model.prototype.release = function () {
      _csm.free(this._ptr);
      this._ptr = 0;
    };
    return Model;
  })();
  Live2DCubismCore.Model = Model;
  /** Canvas information interface. */
  var CanvasInfo = /** @class */ (function () {
    /**
     * Initializes instance.
     *
     * @param modelPtr Native model pointer.
     */
    function CanvasInfo(modelPtr) {
      if (!modelPtr) {
        return;
      }
      // Preserve the pointer ant heap for get data throw args.
      var _canvasSize_data = new Float32Array(2);
      var _canvasSize_nDataBytes = _canvasSize_data.length * _canvasSize_data.BYTES_PER_ELEMENT;
      var _canvasSize_dataPtr = _csm.malloc(_canvasSize_nDataBytes);
      var _canvasSize_dataHeap = new Uint8Array(
        _em.HEAPU8.buffer,
        _canvasSize_dataPtr,
        _canvasSize_nDataBytes
      );
      _canvasSize_dataHeap.set(new Uint8Array(_canvasSize_data.buffer));
      var _canvasOrigin_data = new Float32Array(2);
      var _canvasOrigin_nDataBytes =
        _canvasOrigin_data.length * _canvasOrigin_data.BYTES_PER_ELEMENT;
      var _canvasOrigin_dataPtr = _csm.malloc(_canvasOrigin_nDataBytes);
      var _canvasOrigin_dataHeap = new Uint8Array(
        _em.HEAPU8.buffer,
        _canvasOrigin_dataPtr,
        _canvasOrigin_nDataBytes
      );
      _canvasOrigin_dataHeap.set(new Uint8Array(_canvasOrigin_data.buffer));
      var _canvasPPU_data = new Float32Array(1);
      var _canvasPPU_nDataBytes = _canvasPPU_data.length * _canvasPPU_data.BYTES_PER_ELEMENT;
      var _canvasPPU_dataPtr = _csm.malloc(_canvasPPU_nDataBytes);
      var _canvasPPU_dataHeap = new Uint8Array(
        _em.HEAPU8.buffer,
        _canvasPPU_dataPtr,
        _canvasPPU_nDataBytes
      );
      _canvasPPU_dataHeap.set(new Uint8Array(_canvasPPU_data.buffer));
      // Call function and get result
      _csm.readCanvasInfo(
        modelPtr,
        _canvasSize_dataHeap.byteOffset,
        _canvasOrigin_dataHeap.byteOffset,
        _canvasPPU_dataHeap.byteOffset
      );
      _canvasSize_data = new Float32Array(
        _canvasSize_dataHeap.buffer,
        _canvasSize_dataHeap.byteOffset,
        _canvasSize_dataHeap.length
      );
      _canvasOrigin_data = new Float32Array(
        _canvasOrigin_dataHeap.buffer,
        _canvasOrigin_dataHeap.byteOffset,
        _canvasOrigin_dataHeap.length
      );
      _canvasPPU_data = new Float32Array(
        _canvasPPU_dataHeap.buffer,
        _canvasPPU_dataHeap.byteOffset,
        _canvasPPU_dataHeap.length
      );
      this.CanvasWidth = _canvasSize_data[0];
      this.CanvasHeight = _canvasSize_data[1];
      this.CanvasOriginX = _canvasOrigin_data[0];
      this.CanvasOriginY = _canvasOrigin_data[1];
      this.PixelsPerUnit = _canvasPPU_data[0];
      // Free heap memory
      _csm.free(_canvasSize_dataHeap.byteOffset);
      _csm.free(_canvasOrigin_dataHeap.byteOffset);
      _csm.free(_canvasPPU_dataHeap.byteOffset);
    }
    return CanvasInfo;
  })();
  Live2DCubismCore.CanvasInfo = CanvasInfo;
  /** Cubism model parameters */
  var Parameters = /** @class */ (function () {
    /**
     * Initializes instance.
     *
     * @param modelPtr Native model.
     */
    function Parameters(modelPtr) {
      var length = 0;
      var length2 = null;
      this.count = _csm.getParameterCount(modelPtr);
      length = _csm.getParameterCount(modelPtr);
      this.ids = new Array(length);
      var _ids = new Uint32Array(_em.HEAPU32.buffer, _csm.getParameterIds(modelPtr), length);
      for (var i = 0; i < _ids.length; i++) {
        this.ids[i] = _em.UTF8ToString(_ids[i]);
      }
      length = _csm.getParameterCount(modelPtr);
      this.minimumValues = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getParameterMinimumValues(modelPtr),
        length
      );
      length = _csm.getParameterCount(modelPtr);
      this.types = new Int32Array(_em.HEAP32.buffer, _csm.getParameterTypes(modelPtr), length);
      length = _csm.getParameterCount(modelPtr);
      this.maximumValues = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getParameterMaximumValues(modelPtr),
        length
      );
      length = _csm.getParameterCount(modelPtr);
      this.defaultValues = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getParameterDefaultValues(modelPtr),
        length
      );
      length = _csm.getParameterCount(modelPtr);
      this.values = new Float32Array(_em.HEAPF32.buffer, _csm.getParameterValues(modelPtr), length);
      length = _csm.getParameterCount(modelPtr);
      this.repeats = new Int32Array(_em.HEAP32.buffer, _csm.getParameterRepeats(modelPtr), length);
      length = _csm.getParameterCount(modelPtr);
      this.keyCounts = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getParameterKeyCounts(modelPtr),
        length
      );
      length = _csm.getParameterCount(modelPtr);
      length2 = new Int32Array(_em.HEAP32.buffer, _csm.getParameterKeyCounts(modelPtr), length);
      this.keyValues = new Array(length);
      var _keyValues = new Uint32Array(
        _em.HEAPU32.buffer,
        _csm.getParameterKeyValues(modelPtr),
        length
      );
      for (var i = 0; i < _keyValues.length; i++) {
        this.keyValues[i] = new Float32Array(_em.HEAPF32.buffer, _keyValues[i], length2[i]);
      }
    }
    return Parameters;
  })();
  Live2DCubismCore.Parameters = Parameters;
  /** Cubism model parts */
  var Parts = /** @class */ (function () {
    /**
     * Initializes instance.
     *
     * @param modelPtr Native model.
     */
    function Parts(modelPtr) {
      var length = 0;
      this.count = _csm.getPartCount(modelPtr);
      length = _csm.getPartCount(modelPtr);
      this.ids = new Array(length);
      var _ids = new Uint32Array(_em.HEAPU32.buffer, _csm.getPartIds(modelPtr), length);
      for (var i = 0; i < _ids.length; i++) {
        this.ids[i] = _em.UTF8ToString(_ids[i]);
      }
      length = _csm.getPartCount(modelPtr);
      this.opacities = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getPartOpacities(modelPtr),
        length
      );
      length = _csm.getPartCount(modelPtr);
      this.parentIndices = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getPartParentPartIndices(modelPtr),
        length
      );
      length = _csm.getPartCount(modelPtr);
      this.offscreenIndices = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getPartOffscreenIndices(modelPtr),
        length
      );
    }
    return Parts;
  })();
  Live2DCubismCore.Parts = Parts;
  /** Cubism model drawables */
  var Drawables = /** @class */ (function () {
    /**
     * Initializes instance.
     *
     * @param modelPtr Native model.
     */
    function Drawables(modelPtr) {
      this._modelPtr = modelPtr;
      var length = 0;
      var length2 = null;
      this.count = _csm.getDrawableCount(modelPtr);
      length = _csm.getDrawableCount(modelPtr);
      this.ids = new Array(length);
      var _ids = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableIds(modelPtr), length);
      for (var i = 0; i < _ids.length; i++) {
        this.ids[i] = _em.UTF8ToString(_ids[i]);
      }
      length = _csm.getDrawableCount(modelPtr);
      this.constantFlags = new Uint8Array(
        _em.HEAPU8.buffer,
        _csm.getDrawableConstantFlags(modelPtr),
        length
      );
      length = _csm.getDrawableCount(modelPtr);
      this.dynamicFlags = new Uint8Array(
        _em.HEAPU8.buffer,
        _csm.getDrawableDynamicFlags(modelPtr),
        length
      );
      length = _csm.getDrawableCount(modelPtr);
      this.textureIndices = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getDrawableTextureIndices(modelPtr),
        length
      );
      length = _csm.getDrawableCount(modelPtr);
      this.drawOrders = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getDrawableDrawOrders(modelPtr),
        length
      );
      length = _csm.getDrawableCount(modelPtr);
      this.opacities = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getDrawableOpacities(modelPtr),
        length
      );
      length = _csm.getDrawableCount(modelPtr);
      this.maskCounts = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getDrawableMaskCounts(modelPtr),
        length
      );
      length = _csm.getDrawableCount(modelPtr);
      this.vertexCounts = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getDrawableVertexCounts(modelPtr),
        length
      );
      length = _csm.getDrawableCount(modelPtr);
      this.indexCounts = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getDrawableIndexCounts(modelPtr),
        length
      );
      length = _csm.getDrawableCount(modelPtr);
      this.multiplyColors = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getDrawableMultiplyColors(modelPtr),
        length * 4
      );
      length = _csm.getDrawableCount(modelPtr);
      this.screenColors = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getDrawableScreenColors(modelPtr),
        length * 4
      );
      length = _csm.getDrawableCount(modelPtr);
      this.parentPartIndices = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getDrawableParentPartIndices(modelPtr),
        length
      );
      length = _csm.getDrawableCount(modelPtr);
      this.blendModes = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getDrawableBlendModes(modelPtr),
        length * 2
      );
      length = _csm.getDrawableCount(modelPtr);
      length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableMaskCounts(modelPtr), length);
      this.masks = new Array(length);
      var _masks = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableMasks(modelPtr), length);
      for (var i = 0; i < _masks.length; i++) {
        this.masks[i] = new Int32Array(_em.HEAP32.buffer, _masks[i], length2[i]);
      }
      length = _csm.getDrawableCount(modelPtr);
      length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableVertexCounts(modelPtr), length);
      this.vertexPositions = new Array(length);
      var _vertexPositions = new Uint32Array(
        _em.HEAPU32.buffer,
        _csm.getDrawableVertexPositions(modelPtr),
        length
      );
      for (var i = 0; i < _vertexPositions.length; i++) {
        this.vertexPositions[i] = new Float32Array(
          _em.HEAPF32.buffer,
          _vertexPositions[i],
          length2[i] * 2
        );
      }
      length = _csm.getDrawableCount(modelPtr);
      length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableVertexCounts(modelPtr), length);
      this.vertexUvs = new Array(length);
      var _vertexUvs = new Uint32Array(
        _em.HEAPU32.buffer,
        _csm.getDrawableVertexUvs(modelPtr),
        length
      );
      for (var i = 0; i < _vertexUvs.length; i++) {
        this.vertexUvs[i] = new Float32Array(_em.HEAPF32.buffer, _vertexUvs[i], length2[i] * 2);
      }
      length = _csm.getDrawableCount(modelPtr);
      length2 = new Int32Array(_em.HEAP32.buffer, _csm.getDrawableIndexCounts(modelPtr), length);
      this.indices = new Array(length);
      var _indices = new Uint32Array(_em.HEAPU32.buffer, _csm.getDrawableIndices(modelPtr), length);
      for (var i = 0; i < _indices.length; i++) {
        this.indices[i] = new Uint16Array(_em.HEAPU16.buffer, _indices[i], length2[i]);
      }
    }
    /** Resets all dynamic drawable flags.. */
    Drawables.prototype.resetDynamicFlags = function () {
      _csm.resetDrawableDynamicFlags(this._modelPtr);
    };
    return Drawables;
  })();
  Live2DCubismCore.Drawables = Drawables;
  /** Cubism model offscreens */
  var Offscreens = /** @class */ (function () {
    /**
     * Initializes instance.
     *
     * @param modelPtr Native model.
     */
    function Offscreens(modelPtr) {
      var length = 0;
      var length2 = null;
      this.count = _csm.getOffscreenCount(modelPtr);
      length = _csm.getOffscreenCount(modelPtr);
      this.blendModes = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getOffscreenBlendModes(modelPtr),
        length * 2
      );
      length = _csm.getOffscreenCount(modelPtr);
      this.opacities = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getOffscreenOpacities(modelPtr),
        length
      );
      length = _csm.getOffscreenCount(modelPtr);
      this.ownerIndices = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getOffscreenOwnerIndices(modelPtr),
        length
      );
      length = _csm.getOffscreenCount(modelPtr);
      this.multiplyColors = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getOffscreenMultiplyColors(modelPtr),
        length * 4
      );
      length = _csm.getOffscreenCount(modelPtr);
      this.screenColors = new Float32Array(
        _em.HEAPF32.buffer,
        _csm.getOffscreenScreenColors(modelPtr),
        length * 4
      );
      length = _csm.getOffscreenCount(modelPtr);
      this.maskCounts = new Int32Array(
        _em.HEAP32.buffer,
        _csm.getOffscreenMaskCounts(modelPtr),
        length
      );
      length = _csm.getOffscreenCount(modelPtr);
      this.constantFlags = new Uint8Array(
        _em.HEAPU8.buffer,
        _csm.getOffscreenConstantFlags(modelPtr),
        length
      );
      length = _csm.getOffscreenCount(modelPtr);
      length2 = new Int32Array(_em.HEAP32.buffer, _csm.getOffscreenMaskCounts(modelPtr), length);
      this.masks = new Array(length);
      var _masks = new Uint32Array(_em.HEAPU32.buffer, _csm.getOffscreenMasks(modelPtr), length);
      for (var i = 0; i < _masks.length; i++) {
        this.masks[i] = new Int32Array(_em.HEAP32.buffer, _masks[i], length2[i]);
      }
    }
    return Offscreens;
  })();
  Live2DCubismCore.Offscreens = Offscreens;
  /** Utility functions. */
  var Utils = /** @class */ (function () {
    function Utils() {}
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasBlendAdditiveBit = function (bitfield) {
      return (bitfield & (1 << 0)) == 1 << 0;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasBlendMultiplicativeBit = function (bitfield) {
      return (bitfield & (1 << 1)) == 1 << 1;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasIsDoubleSidedBit = function (bitfield) {
      return (bitfield & (1 << 2)) == 1 << 2;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasIsInvertedMaskBit = function (bitfield) {
      return (bitfield & (1 << 3)) == 1 << 3;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasIsVisibleBit = function (bitfield) {
      return (bitfield & (1 << 0)) == 1 << 0;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasVisibilityDidChangeBit = function (bitfield) {
      return (bitfield & (1 << 1)) == 1 << 1;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasOpacityDidChangeBit = function (bitfield) {
      return (bitfield & (1 << 2)) == 1 << 2;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasDrawOrderDidChangeBit = function (bitfield) {
      return (bitfield & (1 << 3)) == 1 << 3;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasRenderOrderDidChangeBit = function (bitfield) {
      return (bitfield & (1 << 4)) == 1 << 4;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasVertexPositionsDidChangeBit = function (bitfield) {
      return (bitfield & (1 << 5)) == 1 << 5;
    };
    /**
     * Checks whether flag is set in bitfield.
     *
     * @param bitfield Bitfield to query against.
     *
     * @return [[true]] if bit set; [[false]] otherwise
     */
    Utils.hasBlendColorDidChangeBit = function (bitfield) {
      return (bitfield & (1 << 6)) == 1 << 6;
    };
    return Utils;
  })();
  Live2DCubismCore.Utils = Utils;
  /** Memory functions. */
  var Memory = /** @class */ (function () {
    function Memory() {}
    /**
     * HACK:
     * Extend memory size allocated during module initialization.
     * If the specified size is less than or equal to 16777216(byte), the default of 16 MB is allocated.
     *
     * @see https://github.com/emscripten-core/emscripten/blob/main/src/settings.js#L161
     *
     * @param size allocated memory size [byte(s)]
     */
    Memory.initializeAmountOfMemory = function (size) {
      if (size > 16777216) {
        _csm.initializeAmountOfMemory(size);
      }
    };
    return Memory;
  })();
  Live2DCubismCore.Memory = Memory;
  /** Emscripten Cubism Core module. */
  var _em_module = (function () {
    var _scriptDir =
      'undefined' != typeof document && document.currentScript
        ? document.currentScript.src
        : void 0;
    return function (_em_module) {
      _em_module = _em_module || {};
      var a,
        n,
        l = {};
      for (n in (a = a || (void 0 !== _em_module ? _em_module : {})))
        a.hasOwnProperty(n) && (l[n] = a[n]);
      var x,
        y,
        v,
        w,
        p = !1,
        q = !1,
        r = !1,
        p = 'object' == typeof window,
        q = 'function' == typeof importScripts,
        r =
          'object' == typeof process &&
          'object' == typeof process.versions &&
          'string' == typeof process.versions.node &&
          !p &&
          !q,
        t = !p && !r && !q,
        u = '',
        D =
          (r
            ? ((u = __dirname + '/'),
              (v = function (b, c) {
                var d = z(b);
                return (
                  d ||
                    ((x = x || require('fs')),
                    (b = (y = y || require('path')).normalize(b)),
                    (d = x.readFileSync(b))),
                  c ? d : d.toString()
                );
              }),
              (w = function (b) {
                return (assert((b = (b = v(b, !0)).buffer ? b : new Uint8Array(b)).buffer), b);
              }),
              1 < process.argv.length && process.argv[1].replace(/\\/g, '/'),
              process.argv.slice(2),
              process.on('uncaughtException', function (b) {
                throw b;
              }),
              process.on('unhandledRejection', B),
              (a.inspect = function () {
                return '[Emscripten Module object]';
              }))
            : t
              ? ('undefined' != typeof read &&
                  (v = function (b) {
                    var c = z(b);
                    return c ? C(c) : read(b);
                  }),
                (w = function (b) {
                  var c;
                  if (!(c = z(b))) {
                    if ('function' == typeof readbuffer) return new Uint8Array(readbuffer(b));
                    assert('object' == typeof (c = read(b, 'binary')));
                  }
                  return c;
                }),
                'undefined' != typeof print &&
                  (((console = 'undefined' == typeof console ? {} : console).log = print),
                  (console.warn = console.error =
                    'undefined' != typeof printErr ? printErr : print)))
              : (p || q) &&
                (q
                  ? (u = self.location.href)
                  : document.currentScript && (u = document.currentScript.src),
                (u =
                  0 !== (u = _scriptDir ? _scriptDir : u).indexOf('blob:')
                    ? u.substr(0, u.lastIndexOf('/') + 1)
                    : ''),
                (v = function (b) {
                  try {
                    var c = new XMLHttpRequest();
                    return (c.open('GET', b, !1), c.send(null), c.responseText);
                  } catch (d) {
                    if ((b = z(b))) return C(b);
                    throw d;
                  }
                }),
                q) &&
                (w = function (b) {
                  try {
                    var c = new XMLHttpRequest();
                    return (
                      c.open('GET', b, !1),
                      (c.responseType = 'arraybuffer'),
                      c.send(null),
                      new Uint8Array(c.response)
                    );
                  } catch (d) {
                    if ((b = z(b))) return b;
                    throw d;
                  }
                }),
          a.print || console.log.bind(console)),
        E = a.printErr || console.warn.bind(console);
      for (n in l) l.hasOwnProperty(n) && (a[n] = l[n]);
      function da() {
        return {
          exports: (function (asmLibraryArg, wasmMemory, wasmTable) {
            var scratchBuffer = new ArrayBuffer(8),
              b = new Int32Array(scratchBuffer),
              c = new Float32Array(scratchBuffer),
              d = new Float64Array(scratchBuffer);
            function f(index, value) {
              b[index] = value;
            }
            function g() {
              return d[0];
            }
            function h(value) {
              d[0] = value;
            }
            function j(value) {
              c[0] = value;
            }
            function k() {
              return c[0];
            }
            ((scratchBuffer = wasmMemory.buffer), (U = new Uint8Array(scratchBuffer)));
            var U,
              global,
              buffer,
              m,
              n,
              o,
              p,
              q,
              r,
              s,
              t,
              u,
              v,
              w,
              x,
              y,
              z,
              A,
              C,
              H,
              I,
              J,
              K,
              L,
              M,
              scratchBuffer = function (offset, s) {
                var V, W;
                if ('undefined' == typeof Buffer)
                  for (V = atob(s), W = 0; W < V.length; W++) U[offset + W] = V.charCodeAt(W);
                else
                  for (V = Buffer.from(s, 'base64'), W = 0; W < V.length; W++) U[offset + W] = V[W];
              };
            return (
              scratchBuffer(
                1024,
                'QW4gZXJyb3Igb2NjdXJyZWQgaW4gdGhlIGludGVycG9sYXRpb24gZm9yIGJsZW5kIHNoYXBlcy4gQ29tYmluYXRpb25Db3VudCBpcyAlZC4ACgBbQ1NNXSBbRV1XYXJwRGVmb3JtZXI6OlRyYW5zZm9ybVRhcmdldCgpIGVycm9yLiBbJWRdIHAwMT0oJS40ZiAsICUuNGYpCgBbQ1NNXSBbRV1Jbml0aWFsaXplRGVmb3JtZXJzKCk6IFVua25vd24gRGVmb3JtZXIgVHlwZS4KAFtDU01dIFtFXWNzbUhhc01vY0NvbnNpc3RlbmN5OiBUaGlzIG1vYzMgc2l6ZSBpcyBpbnZhbGlkLgoAW0NTTV0gW0VdJXM6ICVzCgBbQ1NNXSBbV11Sb3RhdGlvbkRlZm9ybWVyOiBOb3QgZm91bmQgdHJhbnNmb3JtZWQgRGlyZWN0aW9uLgoAW0NTTV0gW0VdVXBkYXRlRGVmb3JtZXJIaWVyYXJjaHkoKTogVW5rbm93biBEZWZvcm1lciBUeXBlLgoAJXMKACAgAE1PQzMAImFkZHJlc3MiIGlzIG51bGwuACUwMlggAFtDU01dIFtFXWNzbUhhc01vY0NvbnNpc3RlbmN5OiBGaWxlVHlwZSBpcyBpbnZhbGlkLgoAImFkZHJlc3MiIGFsaWdubWVudCBpcyBpbnZhbGlkLgBbQ1NNXSBbRV1jc21IYXNNb2NDb25zaXN0ZW5jeTogVGhpcyBtb2MzIHZlciBpcyBpbnZhbGlkIFt2ZXI6JWRdLgoAInNpemUiIGlzIGludmFsaWQuAFtDU01dIFtFXWNzbUhhc01vY0NvbnNpc3RlbmN5OiBUaGUgQ29yZSB1bnN1cHBvcnQgbGF0ZXIgdGhhbiBtb2MzIHZlcjpbJWRdLiBUaGlzIG1vYzMgdmVyIGlzIFslZF0uCgAibW9kZWwiIGlzIGludmFsaWQuAFtDU01dIFtFXWNzbUhhc01vY0NvbnNpc3RlbmN5OiBIZWFkZXIgc2VjdGlvbiBpcyBpbnZhbGlkLgoAIm91dFNpemVJblBpeGVscyIgaXMgbnVsbC4AW0NTTV0gW0VdY3NtSGFzTW9jQ29uc2lzdGVuY3k6IERhdGEgc2VjdGlvbiBpcyBpbnZhbGlkLgoAIm91dE9yaWdpbkluUGl4ZWxzIiBpcyBudWxsLgBbQ1NNXSBbRV1jc21SZXZpdmVNb2NJblBsYWNlIGlzIGZhaWxlZC4gQ29ycnVwdGVkICBtb2MzIGZpbGUuCgAib3V0UGl4ZWxzUGVyVW5pdCIgaXMgbnVsbC4AW0NTTV0gW0VdY3NtUmV2aXZlTW9jSW5QbGFjZSBpcyBmYWlsZWQuIFRoZSBDb3JlIHVuc3VwcG9ydCBsYXRlciB0aGFuIG1vYzMgdmVyOlslZF0uIFRoaXMgbW9jMyB2ZXIgaXMgWyVkXS4KACJtb2MiIGlzIGludmFsaWQuAFtDU01dIFtFXWNzbVJldml2ZU1vY0luUGxhY2UgaXMgZmFpbGVkLiBUaGlzIG1vYzMgc2l6ZSBpcyBpbnZhbGlkLgoAInNpemUiIGlzIGludmFsaWQAW0NTTV0gW0VdY3NtR2V0TW9jVmVyc2lvbiBpcyBmYWlsZWQuIENvcnJ1cHRlZCBtb2MzIGZpbGUuCgBMaXZlMkQgQ3ViaXNtIFNESyBDb3JlIFZlcnNpb24gJWQuJWQuJWQAY3NtR2V0TW9jVmVyc2lvbgBjc21IYXNNb2NDb25zaXN0ZW5jeQBjc21SZXZpdmVNb2NJblBsYWNlAGNzbVJlYWRDYW52YXNJbmZvAGNzbUdldFNpemVvZk1vZGVsAGNzbUluaXRpYWxpemVNb2RlbEluUGxhY2UAY3NtVXBkYXRlTW9kZWwAY3NtR2V0UmVuZGVyT3JkZXJzAGNzbUdldFBhcmFtZXRlckNvdW50AGNzbUdldFBhcmFtZXRlcklkcwBjc21HZXRQYXJhbWV0ZXJUeXBlcwBjc21HZXRQYXJhbWV0ZXJNaW5pbXVtVmFsdWVzAGNzbUdldFBhcmFtZXRlck1heGltdW1WYWx1ZXMAY3NtR2V0UGFyYW1ldGVyRGVmYXVsdFZhbHVlcwBjc21HZXRQYXJhbWV0ZXJWYWx1ZXMAY3NtR2V0UGFyYW1ldGVyUmVwZWF0cwBjc21HZXRQYXJ0Q291bnQAY3NtR2V0UGFydElkcwBjc21HZXRQYXJ0T3BhY2l0aWVzAGNzbUdldFBhcnRQYXJlbnRQYXJ0SW5kaWNlcwBjc21HZXRQYXJ0T2Zmc2NyZWVuSW5kaWNlcwBjc21HZXREcmF3YWJsZUNvdW50AGNzbUdldERyYXdhYmxlSWRzAGNzbUdldERyYXdhYmxlQ29uc3RhbnRGbGFncwBjc21HZXREcmF3YWJsZUR5bmFtaWNGbGFncwBjc21HZXREcmF3YWJsZUJsZW5kTW9kZXMAY3NtR2V0RHJhd2FibGVUZXh0dXJlSW5kaWNlcwBjc21HZXREcmF3YWJsZURyYXdPcmRlcnMAY3NtR2V0RHJhd2FibGVPcGFjaXRpZXMAY3NtR2V0RHJhd2FibGVNYXNrQ291bnRzAGNzbUdldERyYXdhYmxlTWFza3MAY3NtR2V0RHJhd2FibGVWZXJ0ZXhDb3VudHMAY3NtR2V0RHJhd2FibGVWZXJ0ZXhQb3NpdGlvbnMAY3NtR2V0RHJhd2FibGVWZXJ0ZXhVdnMAY3NtR2V0RHJhd2FibGVJbmRleENvdW50cwBjc21HZXREcmF3YWJsZUluZGljZXMAY3NtR2V0RHJhd2FibGVNdWx0aXBseUNvbG9ycwBjc21HZXREcmF3YWJsZVNjcmVlbkNvbG9ycwBjc21HZXREcmF3YWJsZVBhcmVudFBhcnRJbmRpY2VzAGNzbVJlc2V0RHJhd2FibGVEeW5hbWljRmxhZ3MAY3NtR2V0UGFyYW1ldGVyS2V5Q291bnRzAGNzbUdldFBhcmFtZXRlcktleVZhbHVlcwBjc21HZXRPZmZzY3JlZW5Db3VudABjc21HZXRPZmZzY3JlZW5CbGVuZE1vZGVzAGNzbUdldE9mZnNjcmVlbk9wYWNpdGllcwBjc21HZXRPZmZzY3JlZW5Pd25lckluZGljZXMAY3NtR2V0T2Zmc2NyZWVuTXVsdGlwbHlDb2xvcnMAY3NtR2V0T2Zmc2NyZWVuU2NyZWVuQ29sb3JzAGNzbUdldE9mZnNjcmVlbk1hc2tDb3VudHMAY3NtR2V0T2Zmc2NyZWVuTWFza3MAY3NtR2V0T2Zmc2NyZWVuQ29uc3RhbnRGbGFncw=='
              ),
              scratchBuffer(3596, 'Cg=='),
              scratchBuffer(3635, '//////8='),
              scratchBuffer(3704, 'LSsgICAwWDB4AChudWxsKQ=='),
              scratchBuffer(3728, 'EQAKABEREQAAAAAFAAAAAAAACQAAAAAL'),
              scratchBuffer(3760, 'EQAPChEREQMKBwABEwkLCwAACQYLAAALAAYRAAAAERER'),
              scratchBuffer(3809, 'Cw=='),
              scratchBuffer(3818, 'EQAKChEREQAKAAACAAkLAAAACQALAAAL'),
              scratchBuffer(3867, 'DA=='),
              scratchBuffer(3879, 'DAAAAAAMAAAAAAkMAAAAAAAMAAAM'),
              scratchBuffer(3925, 'Dg=='),
              scratchBuffer(3937, 'DQAAAAQNAAAAAAkOAAAAAAAOAAAO'),
              scratchBuffer(3983, 'EA=='),
              scratchBuffer(3995, 'DwAAAAAPAAAAAAkQAAAAAAAQAAAQAAASAAAAEhIS'),
              scratchBuffer(4050, 'EgAAABISEgAAAAAAAAk='),
              scratchBuffer(4099, 'Cw=='),
              scratchBuffer(4111, 'CgAAAAAKAAAAAAkLAAAAAAALAAAL'),
              scratchBuffer(4157, 'DA=='),
              scratchBuffer(
                4169,
                'DAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAwMTIzNDU2Nzg5QUJDREVGLTBYKzBYIDBYLTB4KzB4IDB4AGluZgBJTkYAbmFuAE5BTgAuAAAAABgcAAAAAAAAAwAAAAQAAAAEAAAABgAAAIP5ogBETm4A/CkVANFXJwDdNPUAYtvAADyZlQBBkEMAY1H+ALveqwC3YcUAOm4kANJNQgBJBuAACeouAByS0QDrHf4AKbEcAOg+pwD1NYIARLsuAJzphAC0JnAAQX5fANaROQBTgzkAnPQ5AItfhAAo+b0A+B87AN7/lwAPmAUAES/vAApaiwBtH20Az342AAnLJwBGT7cAnmY/AC3qXwC6J3UA5evHAD178QD3OQcAklKKAPtr6gAfsV8ACF2NADADVgB7/EYA8KtrACC8zwA29JoA46kdAF5hkQAIG+YAhZllAKAUXwCNQGgAgNj/ACdzTQAGBjEAylYVAMmocwB74mAAa4zAABnERwDNZ8MACejcAFmDKgCLdsQAphyWAESv3QAZV9EApT4FAAUH/wAzfj8AwjLoAJhP3gC7fTIAJj3DAB5r7wCf+F4ANR86AH/yygDxhx0AfJAhAGokfADVbvoAMC13ABU7QwC1FMYAwxmdAK3EwgAsTUEADABdAIZ9RgDjcS0Am8aaADNiAAC00nwAtKeXADdV1QDXPvYAoxAYAE12/ABknSoAcNerAGN8+AB6sFcAFxXnAMBJVgA71tkAp4Q4ACQjywDWincAWlQjAAAfuQDxChsAGc7fAJ8x/wBmHmoAmVdhAKz7RwB+f9gAImW3ADLoiQDmv2AA78TNAGw2CQBdP9QAFt7XAFg73gDem5IA0iIoACiG6ADiWE0AxsoyAAjjFgDgfcsAF8BQAPMdpwAY4FsALhM0AIMSYgCDSAEA9Y5bAK2wfwAe6fIASEpDABBn0wCq3dgArl9CAGphzgAKKKQA05m0AAam8gBcd38Ao8KDAGE8iACKc3gAr4xaAG/XvQAtpmMA9L/LAI2B7wAmwWcAVcpFAMrZNgAoqNIAwmGNABLJdwAEJhQAEkabAMRZxADIxUQATbKRAAAX8wDUQ60AKUnlAP3VEAAAvvwAHpTMAHDO7gATPvUA7PGAALPnwwDH+CgAkwWUAMFxPgAuCbMAC0XzAIgSnACrIHsALrWfAEeSwgB7Mi8ADFVtAHKnkABr5x8AMcuWAHkWSgBBeeIA9N+JAOiUlwDi5oQAmTGXAIjtawBfXzYAu/0OAEiatABnpGwAcXJCAI1dMgCfFbgAvOUJAI0xJQD3dDkAMAUcAA0MAQBLCGgALO5YAEeqkAB05wIAvdYkAPd9pgBuSHIAnxbvAI6UpgC0kfYA0VNRAM8K8gAgmDMA9Ut+ALJjaADdPl8AQF0DAIWJfwBVUikAN2TAAG3YEAAySDIAW0x1AE5x1ABFVG4ACwnBACr1aQAUZtUAJwedAF0EUAC0O9sA6nbFAIf5FwBJa30AHSe6AJZpKQDGzKwArRRUAJDiagCI2YkALHJQAASkvgB3B5QA8zBwAAD8JwDqcagAZsJJAGTgPQCX3YMAoz+XAEOU/QANhowAMUHeAJI5nQDdcIwAF7fnAAjfOwAVNysAXICgAFqAkwAQEZIAD+jYAGyArwDb/0sAOJAPAFkYdgBipRUAYcu7AMeJuQAQQL0A0vIEAEl1JwDrtvYA2yK7AAoUqgCJJi8AZIN2AAk7MwAOlBoAUTqqAB2jwgCv7a4AXCYSAG3CTQAtepwAwFaXAAM/gwAJ8PYAK0CMAG0xmQA5tAcADCAVANjDWwD1ksQAxq1LAE7KpQCnN80A5qk2AKuSlADdQmgAGWPeAHaM7wBoi1IA/Ns3AK6hqwDfFTEAAK6hAAz72gBkTWYA7QW3ACllMABXVr8AR/86AGr5uQB1vvMAKJPfAKuAMABmjPYABMsVAPoiBgDZ5B0APbOkAFcbjwA2zQkATkLpABO+pAAzI7UA8KoaAE9lqADSwaUACz8PAFt4zQAj+XYAe4sEAIkXcgDGplMAb27iAO/rAACbSlgAxNq3AKpmugB2z88A0QIdALHxLQCMmcEAw613AIZI2gD3XaAAxoD0AKzwLwDd7JoAP1y8ANDebQCQxx8AKtu2AKMlOgAAr5oArVOTALZXBAApLbQAS4B+ANoHpwB2qg4Ae1mhABYSKgDcty0A+uX9AInb/gCJvv0A5HZsAAap/AA+gHAAhW4VAP2H/wAoPgcAYWczACoYhgBNveoAs+evAI9tbgCVZzkAMb9bAITXSAAw3xYAxy1DACVhNQDJcM4AMMu4AL9s/QCkAKIABWzkAFrdoAAhb0cAYhLSALlchABwYUkAa1bgAJlSAQBQVTcAHtW3ADPxxAATbl8AXTDkAIUuqQAdssMAoTI2AAi3pADqsdQAFvchAI9p5AAn/3cADAOAAI1ALQBPzaAAIKWZALOi0wAvXQoAtPlCABHaywB9vtAAm9vBAKsXvQDKooEACGpcAC5VFwAnAFUAfxTwAOEHhgAUC2QAlkGNAIe+3gDa/SoAayW2AHuJNAAF8/4Aub+eAGhqTwBKKqgAT8RaAC34vADXWpgA9MeVAA1NjQAgOqYApFdfABQ/sQCAOJUAzCABAHHdhgDJ3rYAv2D1AE1lEQABB2sAjLCsALLA0ABRVUgAHvsOAJVywwCjBjsAwEA1AAbcewDgRcwATin6ANbKyADo80EAfGTeAJtk2ADZvjEApJfDAHdY1ABp48UA8NoTALo6PABGGEYAVXVfANK99QBuksYArC5dAA5E7QAcPkIAYcSHACn96QDn1vMAInzKAG+RNQAI4MUA/9eNAG5q4gCw/cYAkwjBAHxddABrrbIAzW6dAD5yewDGEWoA98+pAClz3wC1yboAtwBRAOKyDQB0uiQA5X1gAHTYigANFSwAgRgMAH5mlAABKRYAn3p2AP39vgBWRe8A2X42AOzZEwCLurkAxJf8ADGoJwDxbsMAlMU2ANioVgC0qLUAz8wOABKJLQBvVzQALFaJAJnO4wDWILkAa16qAD4qnAARX8wA/QtKAOH0+wCOO20A4oYsAOnUhAD8tKkA7+7RAC41yQAvOWEAOCFEABvZyACB/AoA+0pqAC8c2ABTtIQATpmMAFQizAAqVdwAwMbWAAsZlgAacLgAaZVkACZaYAA/Uu4AfxEPAPS1EQD8y/UANLwtADS87gDoXcwA3V5gAGeOmwCSM+8AyRe4AGFYmwDhV7wAUYPGANg+EADdcUgALRzdAK8YoQAhLEYAWfPXANl6mACeVMAAT4b6AFYG/ADlea4AiSI2ADitIgBnk9wAVeiqAIImOADK55sAUQ2kAJkzsQCp1w4AaQVIAGWy8AB/iKcAiEyXAPnRNgAhkrMAe4JKAJjPIQBAn9wA3EdVAOF0OgBn60IA/p3fAF7UXwB7Z6QAuqx6AFX2ogAriCMAQbpVAFluCAAhKoYAOUeDAInj5gDlntQASftAAP9W6QAcD8oAxVmKAJT6KwDTwcUAD8XPANtargBHxYYAhUNiACGGOwAseZQAEGGHACpMewCALBoAQ78SAIgmkAB4PIkAqMTkAOXbewDEOsIAJvTqAPdnigANkr8AZaMrAD2TsQC9fAsApFHcACfdYwBp4d0AmpQZAKgplQBozigACe20AESfIABOmMoAcIJjAH58IwAPuTIAp/WOABRW5wAh8QgAtZ0qAG9+TQClGVEAtfmrAILf1gCW3WEAFjYCAMQ6nwCDoqEAcu1tADmNegCCuKkAazJcAEYnWwAANO0A0gB3APz0VQABWU0A4HGA'
              ),
              scratchBuffer(
                7043,
                'QPsh+T8AAAAALUR0PgAAAICYRvg8AAAAYFHMeDsAAACAgxvwOQAAAEAgJXo4AAAAgCKC4zYAAAAAHfNpNThj7T7aD0k/Xph7P9oPyT9pN6wxaCEiM7QPFDNoIaIz2w9JP9sPSb/kyxZA5MsWwAAAAAAAAACA2w9JQNsPScAAAIA/AADAPwAAAADcz9E1AAAAAADAFT8='
              ),
              scratchBuffer(7192, 'BQ=='),
              scratchBuffer(7204, 'DQ=='),
              scratchBuffer(7228, 'DgAAAA8AAADIHQAAAAQ='),
              scratchBuffer(7252, 'AQ=='),
              scratchBuffer(7267, 'Cv////8='),
              scratchBuffer(7524, '8CE='),
              (global = {
                Int8Array: Int8Array,
                Int16Array: Int16Array,
                Int32Array: Int32Array,
                Uint8Array: Uint8Array,
                Uint16Array: Uint16Array,
                Uint32Array: Uint32Array,
                Float32Array: Float32Array,
                Float64Array: Float64Array,
                NaN: NaN,
                Infinity: 1 / 0,
                Math: Math,
              }),
              (scratchBuffer = asmLibraryArg),
              (buffer = wasmMemory.buffer),
              (m = scratchBuffer.memory),
              (n = wasmTable),
              (o = new global.Int8Array(buffer)),
              (p = new global.Int16Array(buffer)),
              (q = new global.Int32Array(buffer)),
              (r = new global.Uint8Array(buffer)),
              (s = new global.Uint16Array(buffer)),
              (t = new global.Uint32Array(buffer)),
              (u = new global.Float32Array(buffer)),
              (v = new global.Float64Array(buffer)),
              (w = global.Math.imul),
              (x = global.Math.fround),
              (y = global.Math.abs),
              (z = global.Math.clz32),
              (A = global.Math.min),
              global.Math.max,
              (C = global.Math.floor),
              global.Math.ceil,
              global.Math.sqrt,
              scratchBuffer.abort,
              global.NaN,
              (H = global.Infinity),
              (I = scratchBuffer.a),
              (J = scratchBuffer.b),
              (K = scratchBuffer.c),
              (L = 5252112),
              (M = 0),
              (n[1] = function (a, Kn, Ln, Mn, Nn) {
                ((a |= 0), (Kn |= 0), (Ln |= 0), (Mn |= 0), (Nn |= 0));
                var Vn,
                  jo,
                  ko,
                  no,
                  po,
                  qo,
                  ro,
                  so,
                  to,
                  uo,
                  vo,
                  wo,
                  xo,
                  yo,
                  zo,
                  Ao,
                  Bo,
                  Co,
                  Do,
                  Eo,
                  Fo,
                  Go,
                  Ho,
                  oo,
                  On = 0,
                  Pn = x(0),
                  Qn = x(0),
                  Rn = 0,
                  Sn = x(0),
                  Tn = x(0),
                  Un = x(0),
                  Wn = x(0),
                  Xn = x(0),
                  Yn = x(0),
                  Zn = x(0),
                  _n = x(0),
                  $n = x(0),
                  ao = x(0),
                  bo = x(0),
                  co = x(0),
                  eo = x(0),
                  fo = x(0),
                  go = x(0),
                  ho = x(0),
                  io = x(0),
                  lo = x(0),
                  mo = x(0),
                  Io = (x(0), x(0), x(0), x(0), x(0), x(0), x(0), x(0), x(0), 0);
                if (((L = oo = (L - 32) | 0), 1 <= (0 | Nn)))
                  for (
                    Vn = q[(16 + ((q[(a + 312) >> 2] + (Kn << 5)) | 0)) >> 2],
                      On = (q[(a - -64) >> 2] + w(Vn, 24)) | 0,
                      Kn = ((jo = q[(On + 8) >> 2]) + -1) | 0,
                      wo = ((po = q[(On + 4) >> 2]) + -1) | 0,
                      xo = to = ((Vn = q[(q[(a + 156) >> 2] + (Vn << 2)) >> 2]) + (jo << 3)) | 0,
                      yo = uo = (Vn + ((so = w(po, (ko = (jo + 1) | 0))) << 3)) | 0,
                      zo = vo = (Vn + ((jo + so) << 3)) | 0,
                      Ho = q[(On + 12) >> 2],
                      qo = x(0 | po),
                      ro = x(0 | jo),
                      a = 0;
                    ;

                  )
                    if (
                      ((Un = u[((On = ((no = a << 3) + Ln) | 0) + 4) >> 2]),
                      (Qn = x(Un * qo)),
                      (Wn = u[On >> 2]),
                      (Pn = x(Wn * ro)),
                      (On = Un >= x(1)),
                      (Qn =
                        !((Un < x(0)) ^ 1) || On | (Wn >= x(1)) | (Wn < x(0))
                          ? (Io ||
                              (($n = u[(4 + zo) >> 2]),
                              (Ao = u[(Vn + 4) >> 2]),
                              (Xn = x($n - Ao)),
                              (Bo = u[(4 + xo) >> 2]),
                              (Co = u[(4 + yo) >> 2]),
                              (Yn = x(Bo - Co)),
                              (ao = x(x(Xn - Yn) * x(0.5))),
                              (Do = u[vo >> 2]),
                              (Eo = u[Vn >> 2]),
                              (Zn = x(Do - Eo)),
                              (Fo = u[to >> 2]),
                              (Go = u[uo >> 2]),
                              (_n = x(Fo - Go)),
                              (bo = x(x(Zn - _n) * x(0.5))),
                              (Yn = x(x(Yn + Xn) * x(0.5))),
                              (_n = x(x(_n + Zn) * x(0.5))),
                              (Io = 1),
                              (Xn = x(x(x(x(x(Ao + Bo) + Co) + $n) * x(0.25)) - x(Xn * x(0.5)))),
                              (Zn = x(x(x(x(x(Eo + Fo) + Go) + Do) * x(0.25)) - x(Zn * x(0.5))))),
                            ((Un < x(3)) ^ 1) |
                            ((Wn > x(-2)) ^ 1) |
                            (((Wn < x(3)) ^ 1) | ((Un > x(-2)) ^ 1))
                              ? ((u[(Mn + no) >> 2] = x(Un * bo) + x(x(Wn * _n) + Zn)),
                                (Pn = x(Un * ao)),
                                x(x(Wn * Yn) + Xn))
                              : (Wn <= x(0)
                                  ? Un <= x(0)
                                    ? ((Tn = x(x(Un + x(2)) * x(0.5))),
                                      (Sn = x(x(Wn + x(2)) * x(0.5))),
                                      (Pn = x(ao + ao)),
                                      (lo = x(Xn - Pn)),
                                      (Qn = x(bo + bo)),
                                      (mo = x(Zn - Qn)),
                                      (ho = x(Xn - x(Yn + Yn))),
                                      (co = x(ho - Pn)),
                                      (io = x(Zn - x(_n + _n))),
                                      (eo = x(io - Qn)),
                                      (fo = u[(Vn + 4) >> 2]),
                                      (go = u[Vn >> 2]))
                                    : On
                                      ? ((Pn = x(ao * x(3))),
                                        (Qn = x(Xn - x(Yn + Yn))),
                                        (ho = x(Pn + Qn)),
                                        (co = x(bo * x(3))),
                                        (eo = x(Zn - x(_n + _n))),
                                        (io = x(co + eo)),
                                        (Tn = x(x(Un + x(-1)) * x(0.5))),
                                        (Sn = x(x(Wn + x(2)) * x(0.5))),
                                        (fo = x(Pn + Xn)),
                                        (go = x(co + Zn)),
                                        (co = x(ao + Qn)),
                                        (eo = x(bo + eo)),
                                        (lo = u[(4 + yo) >> 2]),
                                        (mo = u[uo >> 2]))
                                      : ((Pn = x(Xn - x(Yn + Yn))),
                                        (On = wo),
                                        (Rn = x(y(Qn)) < x(2147483648) ? ~~Qn : -2147483648),
                                        (Tn = x(0 | (On = (0 | Rn) == (0 | po) ? On : Rn))),
                                        (Sn = x(Tn / qo)),
                                        (co = x(x(Sn * ao) + Pn)),
                                        ($n = x(Sn * bo)),
                                        (Sn = x(Zn - x(_n + _n))),
                                        (eo = x($n + Sn)),
                                        (Un = x(x(0 | (Rn = (On + 1) | 0)) / qo)),
                                        (ho = x(x(Un * ao) + Pn)),
                                        (io = x(x(Un * bo) + Sn)),
                                        (Sn = x(x(Wn + x(2)) * x(0.5))),
                                        (Tn = x(Qn - Tn)),
                                        (On = (Vn + (w(On, ko) << 3)) | 0),
                                        (lo = u[(On + 4) >> 2]),
                                        (mo = u[On >> 2]),
                                        (On = (Vn + (w(Rn, ko) << 3)) | 0),
                                        (fo = u[(On + 4) >> 2]),
                                        (go = u[On >> 2]))
                                  : Wn >= x(1)
                                    ? Un <= x(0)
                                      ? ((Tn = x(x(Un + x(2)) * x(0.5))),
                                        (Sn = x(x(Wn + x(-1)) * x(0.5))),
                                        (Pn = x(ao + ao)),
                                        (co = x(x(Yn + Xn) - Pn)),
                                        (Qn = x(bo + bo)),
                                        (eo = x(x(_n + Zn) - Qn)),
                                        (fo = x(x(Yn * x(3)) + Xn)),
                                        (lo = x(fo - Pn)),
                                        (go = x(x(_n * x(3)) + Zn)),
                                        (mo = x(go - Qn)),
                                        (ho = u[(4 + xo) >> 2]),
                                        (io = u[to >> 2]))
                                      : On
                                        ? ((Pn = x(ao * x(3))),
                                          (ho = x(Pn + x(Yn + Xn))),
                                          (Qn = x(bo * x(3))),
                                          (io = x(Qn + x(_n + Zn))),
                                          ($n = Pn),
                                          (Pn = x(x(Yn * x(3)) + Xn)),
                                          (fo = x($n + Pn)),
                                          ($n = Qn),
                                          (Qn = x(x(_n * x(3)) + Zn)),
                                          (go = x($n + Qn)),
                                          (Tn = x(x(Un + x(-1)) * x(0.5))),
                                          (Sn = x(x(Wn + x(-1)) * x(0.5))),
                                          (lo = x(ao + Pn)),
                                          (mo = x(bo + Qn)),
                                          (co = u[(4 + zo) >> 2]),
                                          (eo = u[vo >> 2]))
                                        : ((Pn = x(x(Yn * x(3)) + Xn)),
                                          (On = wo),
                                          (Rn = x(y(Qn)) < x(2147483648) ? ~~Qn : -2147483648),
                                          (Tn = x(0 | (On = (0 | Rn) == (0 | po) ? On : Rn))),
                                          (Sn = x(Tn / qo)),
                                          (lo = x(x(Sn * ao) + Pn)),
                                          ($n = x(Sn * bo)),
                                          (Sn = x(x(_n * x(3)) + Zn)),
                                          (mo = x($n + Sn)),
                                          (Un = x(x(0 | (Rn = (On + 1) | 0)) / qo)),
                                          (fo = x(x(Un * ao) + Pn)),
                                          (go = x(x(Un * bo) + Sn)),
                                          (Sn = x(x(Wn + x(-1)) * x(0.5))),
                                          (Tn = x(Qn - Tn)),
                                          (On = (Vn + ((w(On, ko) + jo) << 3)) | 0),
                                          (co = u[(On + 4) >> 2]),
                                          (eo = u[On >> 2]),
                                          (On = (Vn + ((w(Rn, ko) + jo) << 3)) | 0),
                                          (ho = u[(On + 4) >> 2]),
                                          (io = u[On >> 2]))
                                    : Un <= x(0)
                                      ? ((Tn = x(x(Un + x(2)) * x(0.5))),
                                        (On = Kn),
                                        (Rn = x(y((Qn = Pn))) < x(2147483648) ? ~~Pn : -2147483648),
                                        (Pn = x(0 | (On = (0 | Rn) == (0 | jo) ? On : Rn))),
                                        (Sn = x(Qn - Pn)),
                                        (Pn = x(Pn / ro)),
                                        (Qn = x(ao + ao)),
                                        (co = x(x(x(Pn * Yn) + Xn) - Qn)),
                                        ($n = x(x(Pn * _n) + Zn)),
                                        (Pn = x(bo + bo)),
                                        (eo = x($n - Pn)),
                                        (Un = x(x(0 | (Rn = (On + 1) | 0)) / ro)),
                                        (lo = x(x(x(Un * Yn) + Xn) - Qn)),
                                        (mo = x(x(x(Un * _n) + Zn) - Pn)),
                                        (ho = u[((On = (Vn + (On << 3)) | 0) + 4) >> 2]),
                                        (io = u[On >> 2]),
                                        (fo = u[((On = (Vn + (Rn << 3)) | 0) + 4) >> 2]),
                                        (go = u[On >> 2]))
                                      : On
                                        ? (($n = Qn = x(ao * x(3))),
                                          (On = Kn),
                                          (Rn = x(y(Pn)) < x(2147483648) ? ~~Pn : -2147483648),
                                          (Sn = x(0 | (On = (0 | Rn) == (0 | jo) ? On : Rn))),
                                          (Tn = x(Sn / ro)),
                                          (ho = x($n + x(x(Tn * Yn) + Xn))),
                                          (Wn = x(bo * x(3))),
                                          (io = x(Wn + x(x(Tn * _n) + Zn))),
                                          ($n = Qn),
                                          (Qn = x(x(0 | (Rn = (On + 1) | 0)) / ro)),
                                          (fo = x($n + x(x(Qn * Yn) + Xn))),
                                          (go = x(Wn + x(x(Qn * _n) + Zn))),
                                          (Tn = x(x(Un + x(-1)) * x(0.5))),
                                          (Sn = x(Pn - Sn)),
                                          (co = u[((On = (Vn + ((On + so) << 3)) | 0) + 4) >> 2]),
                                          (eo = u[On >> 2]),
                                          (lo = u[((On = (Vn + ((Rn + so) << 3)) | 0) + 4) >> 2]),
                                          (mo = u[On >> 2]))
                                        : ((v[(16 + oo) >> 3] = Un),
                                          (q[oo >> 2] = a),
                                          (v[(8 + oo) >> 3] = Wn),
                                          Y(4, 1107, oo)),
                                x(Sn + Tn) <= x(1)
                                  ? ((u[(Mn + no) >> 2] =
                                      x(eo + x(x(mo - eo) * Sn)) + x(x(io - eo) * Tn)),
                                    (Pn = x(co + x(x(lo - co) * Sn))),
                                    x(x(ho - co) * Tn))
                                  : ((Pn = x(x(1) - Sn)),
                                    (Qn = x(x(1) - Tn)),
                                    (u[(Mn + no) >> 2] =
                                      x(go + x(x(io - go) * Pn)) + x(x(mo - go) * Qn)),
                                    (Pn = x(fo + x(x(ho - fo) * Pn))),
                                    x(x(lo - fo) * Qn))))
                          : ((On = x(y(($n = Qn))) < x(2147483648) ? ~~Qn : -2147483648),
                            (Tn = x($n - x(0 | On))),
                            (Rn = x(y((Qn = Pn))) < x(2147483648) ? ~~Pn : -2147483648),
                            (Sn = x(Qn - x(0 | Rn))),
                            (On = (Rn + w(On, ko)) | 0),
                            Ho
                              ? ((Pn = x(x(1) - Tn)),
                                (Qn = x(x(1) - Sn)),
                                (Rn = (Vn + (On << 3)) | 0),
                                (On = (Vn + ((On + ko) << 3)) | 0),
                                (u[(Mn + no) >> 2] =
                                  x(
                                    x(
                                      x(Pn * x(Qn * u[Rn >> 2])) + x(Pn * x(Sn * u[(Rn + 8) >> 2]))
                                    ) + x(Tn * x(Qn * u[On >> 2]))
                                  ) + x(Tn * x(Sn * u[(On + 8) >> 2]))),
                                (Pn = x(
                                  x(
                                    x(Pn * x(Qn * u[(Rn + 4) >> 2])) +
                                      x(Pn * x(Sn * u[(Rn + 12) >> 2]))
                                  ) + x(Tn * x(Qn * u[(On + 4) >> 2]))
                                )),
                                x(Tn * x(Sn * u[(On + 12) >> 2])))
                              : x(Sn + Tn) <= x(1)
                                ? ((Pn = x(x(x(1) - Sn) - Tn)),
                                  (Rn = (Vn + (On << 3)) | 0),
                                  (On = (Vn + ((On + ko) << 3)) | 0),
                                  (u[(Mn + no) >> 2] =
                                    x(x(Pn * u[Rn >> 2]) + x(Sn * u[(Rn + 8) >> 2])) +
                                    x(Tn * u[On >> 2])),
                                  (Pn = x(x(Pn * u[(Rn + 4) >> 2]) + x(Sn * u[(Rn + 12) >> 2]))),
                                  x(Tn * u[(On + 4) >> 2]))
                                : ((Pn = x(x(Sn + x(-1)) + Tn)),
                                  (Rn = (Vn + ((On + ko) << 3)) | 0),
                                  (Qn = x(x(1) - Sn)),
                                  (Un = x(x(1) - Tn)),
                                  (On = (Vn + (On << 3)) | 0),
                                  (u[(Mn + no) >> 2] =
                                    x(x(Pn * u[(Rn + 8) >> 2]) + x(Qn * u[Rn >> 2])) +
                                    x(Un * u[(On + 8) >> 2])),
                                  (Pn = x(x(Pn * u[(Rn + 12) >> 2]) + x(Qn * u[(Rn + 4) >> 2]))),
                                  x(Un * u[(On + 12) >> 2])))),
                      (u[(4 + ((Mn + no) | 0)) >> 2] = Pn + Qn),
                      (0 | Nn) == (0 | (a = (a + 1) | 0)))
                    )
                      break;
                L = (32 + oo) | 0;
              }),
              (n[2] = function (a, sf) {
                ((a |= 0), (sf |= 0));
                var tf = 0,
                  uf = 0,
                  vf = 0,
                  wf = 0,
                  xf = 0,
                  yf = x(0),
                  zf = 0,
                  Af = 0,
                  Cf = (x(0), 0),
                  Df = 0,
                  wf = q[(a + 324) >> 2],
                  tf = q[(a + 320) >> 2],
                  xf = q[(a + 312) >> 2];
                (-1 == (0 | (uf = q[((vf = (xf + (sf << 5)) | 0) + 8) >> 2]))
                  ? ((q[((Df = tf) + (tf = sf << 2)) >> 2] =
                      q[(q[(a + 152) >> 2] + (q[(vf + 16) >> 2] << 2)) >> 2]),
                    (q[(tf + wf) >> 2] = 1065353216))
                  : ((zf = q[(vf + 16) >> 2]),
                    (Af = q[(q[(a + 156) >> 2] + (zf << 2)) >> 2]),
                    n[q[(24 + ((xf + (uf << 5)) | 0)) >> 2]](
                      a,
                      uf,
                      Af,
                      Af,
                      q[(16 + ((q[(a - -64) >> 2] + w(zf, 24)) | 0)) >> 2]
                    ),
                    (yf = u[(q[(a + 152) >> 2] + (q[(vf + 16) >> 2] << 2)) >> 2]),
                    (vf = q[(vf + 8) >> 2] << 2),
                    (u[((uf = sf << 2) + tf) >> 2] = yf * u[(vf + tf) >> 2]),
                    (q[(uf + wf) >> 2] = q[(vf + wf) >> 2])),
                  4 <= r[(q[q[a >> 2] >> 2] + 4) | 0] &&
                    ((wf = sf << 2),
                    (tf = (q[(a + 312) >> 2] + (sf << 5)) | 0),
                    (uf = q[(tf + 16) >> 2] << 2),
                    (vf = q[(a + 332) >> 2]),
                    (sf = q[(a + 328) >> 2]),
                    -1 == (0 | (xf = q[(tf + 8) >> 2]))
                      ? ((xf = q[(a + 160) >> 2]),
                        (q[((tf = wf << 2) + sf) >> 2] = q[(xf + (uf <<= 2)) >> 2]),
                        (q[((zf = 4 | tf) + sf) >> 2] = q[((Af = 4 | uf) + xf) >> 2]),
                        (q[((Cf = 8 | tf) + sf) >> 2] = q[(xf + (Df = 8 | uf)) >> 2]),
                        (q[(sf + ((wf |= 3) << 2)) >> 2] = 1065353216),
                        (a = q[(a + 164) >> 2]),
                        (q[(tf + vf) >> 2] = q[(a + uf) >> 2]),
                        (q[(vf + zf) >> 2] = q[(a + Af) >> 2]),
                        (q[(vf + Cf) >> 2] = q[(a + Df) >> 2]))
                      : ((uf = ((Af = uf << 2) + q[(a + 160) >> 2]) | 0),
                        (u[(tf = ((zf = wf << 2) + sf) | 0) >> 2] =
                          u[uf >> 2] * u[(xf = ((Cf = xf << 4) + sf) | 0) >> 2]),
                        (u[(tf + 4) >> 2] = u[(uf + 4) >> 2] * u[(xf + 4) >> 2]),
                        (u[(tf + 8) >> 2] = u[(uf + 8) >> 2] * u[(xf + 8) >> 2]),
                        (q[(sf + ((wf |= 3) << 2)) >> 2] = 1065353216),
                        (a = (Af + q[(a + 164) >> 2]) | 0),
                        (Df = u[a >> 2]),
                        (yf = u[(tf = (vf + Cf) | 0) >> 2]),
                        (u[(sf = (vf + zf) | 0) >> 2] = x(Df + yf) - x(Df * yf)),
                        (Df = u[(a + 4) >> 2]),
                        (yf = u[(tf + 4) >> 2]),
                        (u[(sf + 4) >> 2] = x(Df + yf) - x(Df * yf)),
                        (Df = u[(a + 8) >> 2]),
                        (yf = u[(tf + 8) >> 2]),
                        (u[(sf + 8) >> 2] = x(Df + yf) - x(Df * yf))),
                    (q[(vf + (wf << 2)) >> 2] = 1065353216)));
              }),
              (n[3] = function (a, bm, jm, km, lm) {
                ((a |= 0), (bm |= 0), (jm |= 0), (km |= 0), (lm |= 0));
                var qm,
                  rm,
                  sm,
                  um,
                  vm,
                  mm = 0,
                  mm =
                    (x(0),
                    x(0),
                    x(0),
                    x(0),
                    x(0),
                    x(0),
                    x(0),
                    x(0),
                    (bm = q[(16 + ((q[(a + 312) >> 2] + (bm << 5)) | 0)) >> 2]) << 2),
                  om = (function (a) {
                    var kk,
                      nk,
                      lk,
                      jk = x(0),
                      mk = 0;
                    ((L = lk = (L - 16) | 0), j(a));
                    a: if ((kk = 2147483647 & (mk = b[0])) >>> 0 <= 1061752794)
                      ((jk = x(1)), kk >>> 0 < 964689920 || (jk = ca(+a)));
                    else if (kk >>> 0 <= 1081824209)
                      ((nk = +a),
                        (jk =
                          1075235812 <= kk >>> 0
                            ? x(-ca(((0 | mk) < 0 ? 3.141592653589793 : -3.141592653589793) + nk))
                            : ba(
                                (0 | mk) <= -1 ? 1.5707963267948966 + nk : 1.5707963267948966 - nk
                              )));
                    else if (kk >>> 0 <= 1088565717)
                      jk =
                        1085271520 <= kk >>> 0
                          ? ca(+a + ((0 | mk) < 0 ? 6.283185307179586 : -6.283185307179586))
                          : ba((0 | mk) <= -1 ? -4.71238898038469 - +a : +a - 4.71238898038469);
                    else if (((jk = x(a - a)), !(2139095040 <= kk >>> 0)))
                      if ((kk = 3 & Ca(a, (8 + lk) | 0)) >>> 0 <= 2) {
                        b: switch ((kk - 1) | 0) {
                          default:
                            jk = ca(v[(8 + lk) >> 3]);
                            break a;
                          case 0:
                            jk = ba(-v[(8 + lk) >> 3]);
                            break a;
                          case 1:
                            break b;
                        }
                        jk = x(-ca(v[(8 + lk) >> 3]));
                      } else jk = ba(v[(8 + lk) >> 3]);
                    return ((L = (16 + lk) | 0), (a = jk));
                  })(
                    (nm = x(
                      x(
                        x(
                          u[(4 + ((q[(a + 172) >> 2] + w(bm, 12)) | 0)) >> 2] +
                            u[(mm + q[(a + 288) >> 2]) >> 2]
                        ) * x(3.1415927410125732)
                      ) / x(180)
                    ))
                  ),
                  pm = u[(mm + q[(a + 276) >> 2]) >> 2],
                  tm = q[(mm + q[(a + 296) >> 2]) >> 2],
                  nm = (function (a) {
                    var Bj,
                      gk,
                      hk = 0,
                      ik = 0;
                    ((L = gk = (L - 16) | 0), j(a));
                    a: if ((Bj = 2147483647 & (ik = b[0])) >>> 0 <= 1061752794)
                      Bj >>> 0 < 964689920 || (a = ba(+a));
                    else if (Bj >>> 0 <= 1081824209)
                      ((hk = +a),
                        (a =
                          Bj >>> 0 <= 1075235811
                            ? (0 | ik) <= -1
                              ? x(-ca(hk + 1.5707963267948966))
                              : ca(hk + -1.5707963267948966)
                            : ba(-(((0 | ik) < 0 ? 3.141592653589793 : -3.141592653589793) + hk))));
                    else if (Bj >>> 0 <= 1088565717)
                      ((hk = +a),
                        (a =
                          Bj >>> 0 <= 1085271519
                            ? (0 | ik) <= -1
                              ? ca(hk + 4.71238898038469)
                              : x(-ca(hk + -4.71238898038469))
                            : ba(((0 | ik) < 0 ? 6.283185307179586 : -6.283185307179586) + hk)));
                    else if (2139095040 <= Bj >>> 0) a = x(a - a);
                    else if ((Bj = 3 & Ca(a, (8 + gk) | 0)) >>> 0 <= 2) {
                      b: switch ((Bj - 1) | 0) {
                        default:
                          a = ba(v[(8 + gk) >> 3]);
                          break a;
                        case 0:
                          a = ca(v[(8 + gk) >> 3]);
                          break a;
                        case 1:
                          break b;
                      }
                      a = ba(-v[(8 + gk) >> 3]);
                    } else a = x(-ca(v[(8 + gk) >> 3]));
                    return ((L = (16 + gk) | 0), a);
                  })(nm);
                if ((bm = 0) < (0 | lm))
                  for (
                    om = x(pm * om),
                      rm = x(tm ? -1 : 1),
                      um = x(om * rm),
                      qm = q[(mm + q[(a + 292) >> 2]) >> 2] ? x(-1) : x(1),
                      vm = x(x(pm * nm) * qm),
                      om = x(om * qm),
                      pm = x(x(pm * x(-nm)) * rm),
                      nm = u[(mm + q[(a + 284) >> 2]) >> 2],
                      rm = u[(mm + q[(a + 280) >> 2]) >> 2];
                    ;

                  )
                    if (
                      ((mm = ((a = bm << 3) + km) | 0),
                      (qm = u[(a = (a + jm) | 0) >> 2]),
                      (sm = u[(a + 4) >> 2]),
                      (u[(mm + 4) >> 2] = nm + x(x(vm * qm) + x(um * sm))),
                      (u[mm >> 2] = rm + x(x(om * qm) + x(pm * sm))),
                      (0 | lm) == (0 | (bm = (bm + 1) | 0)))
                    )
                      break;
              }),
              (n[4] = function (a, Oe) {
                ((a |= 0), (Oe |= 0));
                var _e,
                  $e,
                  af,
                  bf,
                  cf,
                  Pe,
                  Qe = 0,
                  Re = 0,
                  Se = 0,
                  Te = x(0),
                  Ue = 0,
                  Ve = 0,
                  We = x(0),
                  Xe = 0,
                  Ye = 0,
                  Ze = 0;
                if (
                  (x(0),
                  x(0),
                  x(0),
                  x(0),
                  (L = Pe = (L + -64) | 0),
                  (Xe = q[(a + 324) >> 2]),
                  (Ye = q[(a + 320) >> 2]),
                  (Re = q[(a + 312) >> 2]),
                  -1 == (0 | (Ue = q[((Se = (Re + (Oe << 5)) | 0) + 8) >> 2])))
                )
                  ((Qe = q[(Se + 16) >> 2] << 2),
                    (q[((Re = Oe << 2) + Ye) >> 2] = q[(Qe + q[(a + 272) >> 2]) >> 2]),
                    (q[(Re + Xe) >> 2] = q[(Qe + q[(a + 276) >> 2]) >> 2]));
                else {
                  ((Qe = q[(Se + 16) >> 2] << 2),
                    (Ze = q[(Qe + q[(a + 280) >> 2]) >> 2]),
                    (q[(24 + Pe) >> 2] = Ze),
                    (Qe = q[(Qe + q[(a + 284) >> 2]) >> 2]),
                    (q[(28 + Pe) >> 2] = Qe),
                    (q[(16 + Pe) >> 2] = 0),
                    ($e =
                      1 == q[((Ve = (Re + (Ue << 5)) | 0) + 12) >> 2]
                        ? x(-10)
                        : x(-0.10000000149011612)),
                    (u[(20 + Pe) >> 2] = $e),
                    (q[(60 + Pe) >> 2] = Qe),
                    (q[(56 + Pe) >> 2] = Ze),
                    n[q[(Ve + 24) >> 2]](a, Ue, (56 + Pe) | 0, (48 + Pe) | 0, 1),
                    (Te = x(1)),
                    (Re = 9));
                  b: {
                    for (;;) {
                      if (
                        ((Qe = Re),
                        (We = x(Te * x(0))),
                        (u[(32 + Pe) >> 2] = We + u[(56 + Pe) >> 2]),
                        (_e = x($e * Te)),
                        (u[(36 + Pe) >> 2] = _e + u[(60 + Pe) >> 2]),
                        n[q[(Ve + 24) >> 2]](a, Ue, (32 + Pe) | 0, (40 + Pe) | 0, 1),
                        (af = x(u[(44 + Pe) >> 2] - u[(52 + Pe) >> 2])),
                        (u[(44 + Pe) >> 2] = af),
                        (bf = x(u[(40 + Pe) >> 2] - u[(48 + Pe) >> 2])),
                        (u[(40 + Pe) >> 2] = bf),
                        af != x(0) || bf != x(0))
                      ) {
                        ((Re = q[(44 + Pe) >> 2]),
                          (q[(8 + Pe) >> 2] = q[(40 + Pe) >> 2]),
                          (q[(12 + Pe) >> 2] = Re));
                        break b;
                      }
                      if (
                        ((u[(32 + Pe) >> 2] = u[(56 + Pe) >> 2] - We),
                        (u[(36 + Pe) >> 2] = u[(60 + Pe) >> 2] - _e),
                        n[q[(Ve + 24) >> 2]](a, Ue, (32 + Pe) | 0, (40 + Pe) | 0, 1),
                        (We = x(u[(40 + Pe) >> 2] - u[(48 + Pe) >> 2])),
                        (u[(40 + Pe) >> 2] = We),
                        (_e = x(u[(44 + Pe) >> 2] - u[(52 + Pe) >> 2])),
                        (u[(44 + Pe) >> 2] = _e) != x(0) || We != x(0))
                      ) {
                        ((u[(12 + Pe) >> 2] = -_e), (u[(8 + Pe) >> 2] = -We));
                        break b;
                      }
                      if (((Re = (Qe + -1) | 0), (Te = x(Te * x(0.10000000149011612))), !Qe)) break;
                    }
                    Y(3, 1311, 0);
                  }
                  ((Te = (function (a, Of) {
                    var Pf = x(0);
                    if (
                      (Pf = x(Aa(u[(a + 4) >> 2], u[a >> 2]) - Aa(u[(Of + 4) >> 2], u[Of >> 2]))) <
                      x(-3.1415927410125732)
                    )
                      for (;;)
                        if (!((Pf = x(Pf + x(6.2831854820251465))) < x(-3.1415927410125732))) break;
                    if (Pf > x(3.1415927410125732))
                      for (;;)
                        if (!((Pf = x(Pf + x(-6.2831854820251465))) > x(3.1415927410125732))) break;
                    return Pf;
                  })((16 + Pe) | 0, (8 + Pe) | 0)),
                    n[q[(Ve + 24) >> 2]](a, q[(Se + 8) >> 2], (24 + Pe) | 0, (24 + Pe) | 0, 1),
                    (Re = q[(Se + 16) >> 2] << 2),
                    (q[(Re + q[(a + 280) >> 2]) >> 2] = q[(24 + Pe) >> 2]),
                    (q[(Re + q[(a + 284) >> 2]) >> 2] = q[(28 + Pe) >> 2]),
                    (Qe = (Re + q[(a + 288) >> 2]) | 0),
                    (u[Qe >> 2] = u[Qe >> 2] + x(x(Te * x(-180)) / x(3.1415927410125732))),
                    (Se = q[(Se + 8) >> 2] << 2),
                    (u[((Qe = Oe << 2) + Ye) >> 2] =
                      u[(Re + q[(a + 272) >> 2]) >> 2] * u[(Se + Ye) >> 2]),
                    (Re = (Re + q[(a + 276) >> 2]) | 0),
                    (Te = x(u[Re >> 2] * u[(Se + Xe) >> 2])),
                    (u[(Qe + Xe) >> 2] = Te),
                    (u[Re >> 2] = Te));
                }
                (4 <= r[(q[q[a >> 2] >> 2] + 4) | 0] &&
                  ((Qe = Oe << 2),
                  (Se = (q[(a + 312) >> 2] + (Oe << 5)) | 0),
                  (Ue = q[(Se + 16) >> 2] << 2),
                  (Re = q[(a + 332) >> 2]),
                  (Oe = q[(a + 328) >> 2]),
                  -1 == (0 | (Ve = q[(Se + 8) >> 2]))
                    ? ((Ve = q[(a + 300) >> 2]),
                      (q[((Se = Qe << 2) + Oe) >> 2] = q[(Ve + (Ue <<= 2)) >> 2]),
                      (q[((Xe = 4 | Se) + Oe) >> 2] = q[((Ye = 4 | Ue) + Ve) >> 2]),
                      (q[((Ze = 8 | Se) + Oe) >> 2] = q[(Ve + (cf = 8 | Ue)) >> 2]),
                      (q[(Oe + ((Qe |= 3) << 2)) >> 2] = 1065353216),
                      (a = q[(a + 304) >> 2]),
                      (q[(Re + Se) >> 2] = q[(a + Ue) >> 2]),
                      (q[(Re + Xe) >> 2] = q[(a + Ye) >> 2]),
                      (q[(Re + Ze) >> 2] = q[(a + cf) >> 2]))
                    : ((Ue = ((Ye = Ue << 2) + q[(a + 300) >> 2]) | 0),
                      (u[(Se = ((Xe = Qe << 2) + Oe) | 0) >> 2] =
                        u[Ue >> 2] * u[(Ve = ((Ze = Ve << 4) + Oe) | 0) >> 2]),
                      (u[(Se + 4) >> 2] = u[(Ue + 4) >> 2] * u[(Ve + 4) >> 2]),
                      (u[(Se + 8) >> 2] = u[(Ue + 8) >> 2] * u[(Ve + 8) >> 2]),
                      (q[(Oe + ((Qe |= 3) << 2)) >> 2] = 1065353216),
                      (a = (Ye + q[(a + 304) >> 2]) | 0),
                      (Te = u[a >> 2]),
                      (We = u[(Se = (Re + Ze) | 0) >> 2]),
                      (u[(Oe = (Re + Xe) | 0) >> 2] = x(Te + We) - x(Te * We)),
                      (Te = u[(a + 4) >> 2]),
                      (We = u[(Se + 4) >> 2]),
                      (u[(Oe + 4) >> 2] = x(Te + We) - x(Te * We)),
                      (Te = u[(a + 8) >> 2]),
                      (We = u[(Se + 8) >> 2]),
                      (u[(Oe + 8) >> 2] = x(Te + We) - x(Te * We))),
                  (q[(Re + (Qe << 2)) >> 2] = 1065353216)),
                  (L = (Pe + 64) | 0));
              }),
              (n[5] = function (a, ok) {
                return (
                  (a |= 0),
                  (ok |= 0),
                  x(0),
                  x(0),
                  0 | ((a = u[a >> 2]) < (ok = u[ok >> 2]) ? -1 : ok < a)
                );
              }),
              (n[6] = function (a, Vh, Wh, Xh) {
                ((a |= 0), (Vh |= 0), (Wh |= 0), (Xh |= 0));
                var si = 0,
                  ti = 0,
                  ui = x(0),
                  vi = 0,
                  wi = 0,
                  xi = 0,
                  yi = 0,
                  zi = 0;
                if (1 <= (0 | (vi = q[(a + 8) >> 2])))
                  for (xi = q[(a + 12) >> 2], wi = q[(a + 20) >> 2]; ; )
                    if (
                      ((u[((ti = si << 2) + xi) >> 2] = u[(Vh + ti) >> 2] * u[(ti + wi) >> 2]),
                      !((0 | (si = (si + 1) | 0)) < (0 | vi)))
                    )
                      break;
                if (!((0 | (vi = q[a >> 2])) < 1))
                  if (((xi = q[(a + 4) >> 2]), Xh))
                    for (ti = Vh = 0; ; ) {
                      if (q[Xh >> 2]) {
                        if ((0 | (si = q[((wi = Vh << 2) + q[(a + 16) >> 2]) >> 2])) < 1) ui = x(0);
                        else
                          for (yi = (si + ti) | 0, zi = q[(a + 12) >> 2], ui = x(0), si = ti; ; )
                            if (
                              ((ui = x(ui + u[(zi + (si << 2)) >> 2])),
                              !((0 | (si = (si + 1) | 0)) < (0 | yi)))
                            )
                              break;
                        u[(Wh + wi) >> 2] = ui;
                      }
                      if (
                        ((Xh = (Xh + 4) | 0),
                        (ti = (q[(xi + (Vh << 2)) >> 2] + ti) | 0),
                        !((0 | (Vh = (Vh + 1) | 0)) < (0 | vi)))
                      )
                        break;
                    }
                  else
                    for (wi = q[(a + 16) >> 2], Vh = Xh = 0; ; ) {
                      if ((0 | (si = q[((ti = Xh << 2) + wi) >> 2])) <= 0) ui = x(0);
                      else
                        for (yi = (Vh + si) | 0, zi = q[(a + 12) >> 2], ui = x(0), si = Vh; ; )
                          if (
                            ((ui = x(ui + u[(zi + (si << 2)) >> 2])),
                            !((0 | (si = (si + 1) | 0)) < (0 | yi)))
                          )
                            break;
                      if (
                        ((u[(Wh + ti) >> 2] = ui),
                        (Vh = (q[(ti + xi) >> 2] + Vh) | 0),
                        !((0 | (Xh = (Xh + 1) | 0)) < (0 | vi)))
                      )
                        break;
                    }
              }),
              (n[7] = function (a, Vh, Wh, Xh) {
                ((a |= 0), (Vh |= 0), (Wh |= 0), (Xh |= 0));
                var Yh = 0,
                  Zh = x(0),
                  ni = 0,
                  oi = 0,
                  pi = 0,
                  qi = 0,
                  ri = 0;
                if (1 <= (0 | (qi = q[(a + 8) >> 2])))
                  for (oi = q[(a + 12) >> 2], pi = q[(a + 20) >> 2]; ; )
                    if (
                      ((u[((ni = Yh << 2) + oi) >> 2] = u[(Vh + ni) >> 2] * u[(ni + pi) >> 2]),
                      !((0 | (Yh = (Yh + 1) | 0)) < (0 | qi)))
                    )
                      break;
                if (!((0 | (Yh = q[a >> 2])) < 1))
                  if (((qi = q[(a + 4) >> 2]), Xh))
                    for (ni = Vh = 0; ; ) {
                      if (q[Xh >> 2]) {
                        if ((0 | (Yh = q[((oi = Vh << 2) + q[(a + 16) >> 2]) >> 2])) < 1) Zh = x(0);
                        else
                          for (pi = (Yh + ni) | 0, ri = q[(a + 12) >> 2], Zh = x(0), Yh = ni; ; )
                            if (
                              ((Zh = x(Zh + u[(ri + (Yh << 2)) >> 2])),
                              !((0 | (Yh = (Yh + 1) | 0)) < (0 | pi)))
                            )
                              break;
                        ((Yh = (Wh + oi) | 0),
                          (Zh = x(Zh + x(0.0010000000474974513))),
                          (oi = x(y(Zh)) < x(2147483648) ? ~~Zh : -2147483648),
                          (q[Yh >> 2] = oi),
                          (Yh = q[a >> 2]));
                      }
                      if (
                        ((Xh = (Xh + 4) | 0),
                        (ni = (q[(qi + (Vh << 2)) >> 2] + ni) | 0),
                        !((0 | (Vh = (Vh + 1) | 0)) < (0 | Yh)))
                      )
                        break;
                    }
                  else
                    for (oi = q[(a + 16) >> 2], Vh = Xh = 0; ; ) {
                      if ((0 | (Yh = q[((ni = Xh << 2) + oi) >> 2])) <= 0) Zh = x(0);
                      else
                        for (pi = (Vh + Yh) | 0, ri = q[(a + 12) >> 2], Zh = x(0), Yh = Vh; ; )
                          if (
                            ((Zh = x(Zh + u[(ri + (Yh << 2)) >> 2])),
                            !((0 | (Yh = (Yh + 1) | 0)) < (0 | pi)))
                          )
                            break;
                      if (
                        ((Yh = (Wh + ni) | 0),
                        (Zh = x(Zh + x(0.0010000000474974513))),
                        (pi = x(y(Zh)) < x(2147483648) ? ~~Zh : -2147483648),
                        (q[Yh >> 2] = pi),
                        (Vh = (q[(ni + qi) >> 2] + Vh) | 0),
                        !((0 | (Xh = (Xh + 1) | 0)) < q[a >> 2]))
                      )
                        break;
                    }
              }),
              (n[8] = function (a, Vh, Wh, Xh, Yh, Zh) {
                ((a |= 0), (Vh |= 0), (Wh |= 0), (Xh |= 0), (Yh |= 0), (Zh |= 0));
                var li,
                  mi,
                  _h = 0,
                  $h = 0,
                  ai = 0,
                  bi = 0,
                  ci = 0,
                  di = 0,
                  ei = 0,
                  fi = 0,
                  hi = 0,
                  ii = 0,
                  ji = x(0),
                  ki = 0,
                  gi = q[a >> 2];
                if (!((0 | gi) < 1))
                  if (((li = Yh << 2), (mi = q[(a + 4) >> 2]), Zh))
                    for (;;) {
                      if (
                        q[Zh >> 2] &&
                        ((ai = q[((_h = bi << 2) + q[(a + 16) >> 2]) >> 2]),
                        (ei = q[(Wh + _h) >> 2]),
                        ($h = q[(Xh + _h) >> 2]),
                        (_h = (0 | (fi = w($h, Yh))) < 1) || $(ei, 0, w($h, li)),
                        !(_h | ((0 | ai) < 1)))
                      )
                        for (hi = (ai + di) | 0, ii = q[(a + 20) >> 2], _h = di; ; ) {
                          for (
                            ji = u[(($h = _h << 2) + ii) >> 2], ki = q[(Vh + $h) >> 2], ci = 0;
                            ;

                          )
                            if (
                              ((u[($h = ((ai = ci << 2) + ei) | 0) >> 2] =
                                u[$h >> 2] + x(ji * u[(ai + ki) >> 2])),
                              (0 | fi) == (0 | (ci = (ci + 1) | 0)))
                            )
                              break;
                          if (!((0 | (_h = (_h + 1) | 0)) < (0 | hi))) break;
                        }
                      if (
                        ((Zh = (Zh + 4) | 0),
                        (di = (q[((bi << 2) + mi) >> 2] + di) | 0),
                        !((0 | (bi = (bi + 1) | 0)) < (0 | gi)))
                      )
                        break;
                    }
                  else
                    for (Zh = 0; ; ) {
                      if (
                        ((ai = q[((bi = Zh << 2) + q[(a + 16) >> 2]) >> 2]),
                        (ei = q[(Wh + bi) >> 2]),
                        ($h = q[(Xh + bi) >> 2]),
                        (_h = (0 | (fi = w($h, Yh))) < 1) || $(ei, 0, w($h, li)),
                        !(_h | ((0 | ai) <= 0)))
                      )
                        for (hi = (ai + di) | 0, ii = q[(a + 20) >> 2], _h = di; ; ) {
                          for (
                            ji = u[(($h = _h << 2) + ii) >> 2], ki = q[(Vh + $h) >> 2], ci = 0;
                            ;

                          )
                            if (
                              ((u[($h = ((ai = ci << 2) + ei) | 0) >> 2] =
                                u[$h >> 2] + x(ji * u[(ai + ki) >> 2])),
                              (0 | fi) == (0 | (ci = (ci + 1) | 0)))
                            )
                              break;
                          if (!((0 | (_h = (_h + 1) | 0)) < (0 | hi))) break;
                        }
                      if (
                        ((di = (q[(bi + mi) >> 2] + di) | 0),
                        !((0 | (Zh = (Zh + 1) | 0)) < (0 | gi)))
                      )
                        break;
                    }
              }),
              (n[9] = function (a) {
                a |= 0;
                var Fp,
                  Gp,
                  Hp,
                  Bp = 0,
                  Cp = 0,
                  Dp = 0,
                  Ep = 0;
                if (!(q[(a + 764) >> 2] || (0 | (Bp = q[(a + 336) >> 2])) < 1))
                  for (
                    Gp = ((Cp = q[(a + 340) >> 2]) + w(Bp, 20)) | 0,
                      Bp = q[(a + 428) >> 2],
                      Ep = q[(a + 448) >> 2];
                    ;

                  ) {
                    if (q[Bp >> 2] && !((0 | (Dp = q[(Cp + 16) >> 2])) < (a = 1)))
                      for (Dp <<= 1, Hp = q[Ep >> 2]; ; )
                        if (
                          ((u[(Fp = ((a << 2) + Hp) | 0) >> 2] = -u[Fp >> 2]),
                          !((0 | (a = (a + 2) | 0)) < (0 | Dp)))
                        )
                          break;
                    if (
                      ((Ep = (Ep + 4) | 0),
                      (Bp = (Bp + 4) | 0),
                      !((Cp = (Cp + 20) | 0) >>> 0 < Gp >>> 0))
                    )
                      break;
                  }
              }),
              (n[10] = function (a, Al, bm) {
                var dm;
                return (
                  aa(
                    (dm = q[((a |= 0) + 20) >> 2]),
                    (Al |= 0),
                    (Al = (bm |= 0) >>> 0 < (Al = (q[(a + 16) >> 2] - dm) | 0) >>> 0 ? bm : Al)
                  ),
                  (q[(a + 20) >> 2] = Al + q[(a + 20) >> 2]),
                  0 | bm
                );
              }),
              (n[11] = function (a, ok, Al, Bl, Cl, Dl) {
                ((a |= 0), (ok = +ok), (Al |= 0), (Bl |= 0), (Cl |= 0), (Dl |= 0));
                var Ql,
                  _l,
                  Il,
                  El = 0,
                  Fl = 0,
                  Gl = 0,
                  Hl = 0,
                  Jl = 0,
                  Kl = 0,
                  Ll = 0,
                  Ml = 0,
                  Nl = 0,
                  Ol = 0,
                  Pl = 0,
                  Rl = 0,
                  Sl = 0,
                  Tl = 0,
                  Ul = 0,
                  Wl = 0;
                if (
                  ((q[(44 + (L = Il = (L - 560) | 0)) >> 2] = 0),
                  h(+ok),
                  (El = 0 | b[1]),
                  (_l = 4294967295 < b[0] >>> 0 ? 0 : 1),
                  (Ul =
                    (0 | El) < -1 || ((0 | El) <= -1 ? _l : 0)
                      ? (h(+(ok = -ok)), (El = 0 | b[1]), b[0], (Tl = 1), 4208)
                      : 2048 & Cl
                        ? ((Tl = 1), 4211)
                        : (Tl = 1 & Cl)
                          ? 4214
                          : 4209),
                  2146435072 == (2146435072 & El))
                )
                  (_(a, 32, Al, (Kl = (Tl + 3) | 0), -65537 & Cl),
                    Z(a, Ul, Tl),
                    (Bl = (Dl >>> 5) & 1),
                    Z(a, ok != ok ? (Bl ? 4235 : 4239) : Bl ? 4227 : 4231, 3));
                else if (
                  ((ok = (function Ia(a, Wb) {
                    var Yb,
                      ic,
                      Xb = 0;
                    if (
                      (h(+a),
                      (Xb = 0 | b[1]),
                      (Yb = 0 | b[0]),
                      2047 != (0 | (Xb = ((ic = Xb) >>> 20) & 2047)))
                    ) {
                      if (!Xb)
                        return (
                          (Xb = Wb),
                          (Wb =
                            0 == a
                              ? 0
                              : ((a = Ia(0x10000000000000000 * a, Wb)), (q[Wb >> 2] + -64) | 0)),
                          (q[Xb >> 2] = Wb),
                          a
                        );
                      ((q[Wb >> 2] = Xb + -1022),
                        f(0, 0 | Yb),
                        f(1, (-2146435073 & ic) | 1071644672),
                        (a = +g()));
                    }
                    return a;
                  })(ok, (44 + Il) | 0)),
                  0 != (ok += ok) && (q[(44 + Il) >> 2] = q[(44 + Il) >> 2] + -1),
                  (Ql = (16 + Il) | 0),
                  97 == (0 | (_l = 32 | Dl)))
                ) {
                  if (
                    ((Pl = (Ol = 32 & Dl) ? (Ul + 9) | 0 : Ul),
                    !(11 < Bl >>> 0) && (El = (12 - Bl) | 0))
                  ) {
                    for (Rl = 8; ; ) if (((Rl *= 16), !(El = (El + -1) | 0))) break;
                    ok = 45 == r[0 | Pl] ? -(Rl + (-ok - Rl)) : ok + Rl - Rl;
                  }
                  for (
                    (0 | Ql) ==
                      (0 | (El = ga((Gl = (El = q[(44 + Il) >> 2]) >> 31) ^ (El + Gl), 0, Ql))) &&
                      ((o[(15 + Il) | 0] = 48), (El = (15 + Il) | 0)),
                      Jl = 2 | Tl,
                      Gl = q[(44 + Il) >> 2],
                      o[0 | (Nl = (El + -2) | 0)] = Dl + 15,
                      o[(El + -1) | 0] = (0 | Gl) < 0 ? 45 : 43,
                      El = 8 & Cl,
                      Fl = (16 + Il) | 0;
                    ;

                  )
                    if (
                      ((Dl = Fl),
                      (Ml = Ol),
                      (Gl = y(ok) < 2147483648 ? ~~ok : -2147483648),
                      (o[0 | Fl] = Ml | r[(Gl + 4192) | 0]),
                      (1 != (((Fl = (Dl + 1) | 0) - ((16 + Il) | 0)) | 0)) |
                        (0 == (ok = 16 * (ok - (0 | Gl))) ? !(El | (0 < (0 | Bl))) : 0) ||
                        ((o[(Dl + 1) | 0] = 46), (Fl = (Dl + 2) | 0)),
                      0 == ok)
                    )
                      break;
                  (_(
                    a,
                    32,
                    Al,
                    (Kl =
                      ((Dl =
                        !Bl | ((0 | Bl) <= ((((Fl - Il) | 0) - 18) | 0))
                          ? (((((Ql - ((16 + Il) | 0)) | 0) - Nl) | 0) + Fl) | 0
                          : (2 + ((((Bl + Ql) | 0) - Nl) | 0)) | 0) +
                        Jl) |
                      0),
                    Cl
                  ),
                    Z(a, Pl, Jl),
                    _(a, 48, Al, Kl, 65536 ^ Cl),
                    Z(a, (16 + Il) | 0, (Bl = (Fl - ((16 + Il) | 0)) | 0)),
                    _(a, 48, (Dl - (((El = Bl) + (Bl = (Ql - Nl) | 0)) | 0)) | 0, 0, 0),
                    Z(a, Nl, Bl));
                } else {
                  for (
                    El = (0 | Bl) < 0,
                      0 == ok
                        ? (Hl = q[(44 + Il) >> 2])
                        : ((Hl = (q[(44 + Il) >> 2] + -28) | 0),
                          (q[(44 + Il) >> 2] = Hl),
                          (ok *= 268435456)),
                      Ll = El ? 6 : Bl,
                      Gl = Ol = (0 | Hl) < 0 ? (48 + Il) | 0 : (336 + Il) | 0;
                    ;

                  )
                    if (
                      ((Gl = ((Bl = Gl) + 4) | 0),
                      0 ==
                        (ok =
                          1e9 *
                          (ok -
                            ((q[Bl >> 2] = El = (ok < 4294967296) & (0 <= ok) ? ~~ok >>> 0 : 0) >>>
                              0))))
                    )
                      break;
                  if ((0 | Hl) < 1) ((El = Gl), (Fl = Ol));
                  else
                    for (Fl = Ol; ; ) {
                      if (
                        ((Nl = (0 | Hl) < 29 ? Hl : 29), !((El = (Gl + -4) | 0) >>> 0 < Fl >>> 0))
                      ) {
                        for (Bl = Nl, Ml = 0; ; )
                          if (
                            ((Wl = Ml),
                            (Ml = q[(Pl = El) >> 2]),
                            (Jl = 31 & Bl),
                            (Jl =
                              32 <= (63 & Bl) >>> (Kl = 0)
                                ? ((Hl = Ml << Jl), 0)
                                : ((Hl = ((1 << Jl) - 1) & (Ml >>> (32 - Jl))), Ml << Jl)),
                            (Kl = (Hl + Kl) | 0),
                            (Kl = (Ml = (Wl + Jl) | 0) >>> 0 < Jl >>> 0 ? (Kl + 1) | 0 : Kl),
                            (Wl = Pl),
                            (Pl = sd((Ml = td((Jl = Ml), Kl, 1e9)), M, 1e9)),
                            (q[Wl >> 2] = Jl - Pl),
                            !(Fl >>> 0 <= (El = (El + -4) | 0) >>> 0))
                          )
                            break;
                        (Bl = Ml) && (q[(Fl = (Fl + -4) | 0) >> 2] = Bl);
                      }
                      for (;;)
                        if (!(Fl >>> 0 < (El = Gl) >>> 0) || q[(Gl = (El + -4) | 0) >> 2]) break;
                      if (
                        ((Hl = (q[(44 + Il) >> 2] - Nl) | 0),
                        (Gl = El),
                        !(0 < (0 | (q[(44 + Il) >> 2] = Hl))))
                      )
                        break;
                    }
                  if ((0 | Hl) <= -1)
                    for (Sl = (1 + ((((Ll + 25) | 0) / 9) | 0)) | 0, Nl = 102 == (0 | _l); ; ) {
                      if (((Ml = (0 | Hl) < -9 ? 9 : (0 - Hl) | 0), El >>> 0 <= Fl >>> 0))
                        Fl = q[Fl >> 2] ? Fl : (Fl + 4) | 0;
                      else {
                        for (Pl = 1e9 >>> Ml, Jl = (-1 << Ml) ^ -1, Hl = 0, Gl = Fl; ; )
                          if (
                            ((Bl = q[Gl >> 2]),
                            (q[Gl >> 2] = (Bl >>> Ml) + Hl),
                            (Hl = w(Pl, Bl & Jl)),
                            !((Gl = (Gl + 4) | 0) >>> 0 < El >>> 0))
                          )
                            break;
                        ((Fl = q[Fl >> 2] ? Fl : (Fl + 4) | 0),
                          Hl && ((q[El >> 2] = Hl), (El = (El + 4) | 0)));
                      }
                      if (
                        ((Hl = (Ml + q[(44 + Il) >> 2]) | 0),
                        (El =
                          (0 | Sl) < (El - (Bl = Nl ? Ol : Fl)) >> 2 ? (Bl + (Sl << 2)) | 0 : El),
                        !((0 | (q[(44 + Il) >> 2] = Hl)) < 0))
                      )
                        break;
                    }
                  if (
                    !(
                      El >>> (Gl = 0) <= Fl >>> 0 ||
                      ((Gl = w((Ol - Fl) >> 2, 9)), (Bl = q[Fl >> 2]) >>> 0 < (Hl = 10))
                    )
                  )
                    for (;;)
                      if (((Gl = (Gl + 1) | 0), !((Hl = w(Hl, 10)) >>> 0 <= Bl >>> 0))) break;
                  if (
                    (0 |
                      (Bl =
                        (((Ll - (102 == (0 | _l) ? 0 : Gl)) | 0) -
                          ((103 == (0 | _l)) & (0 != (0 | Ll)))) |
                        0)) <
                    ((w((El - Ol) >> 2, 9) + -9) | 0)
                  ) {
                    if (
                      ((Kl =
                        (((Ol + ((Bl = ((0 | (Jl = (Bl + 9216) | 0)) / 9) | 0) << 2)) | 0) - 4092) |
                        0),
                      (Hl = 10),
                      (0 | (Bl = (1 + ((Jl - w(Bl, 9)) | 0)) | 0)) <= 8)
                    )
                      for (;;) if (((Hl = w(Hl, 10)), 9 == (0 | (Bl = (Bl + 1) | 0)))) break;
                    if (
                      ((Sl = (Kl + 4) | 0),
                      ((Nl =
                        ((Pl = q[Kl >> 2]) - w(Hl, (Jl = ((Pl >>> 0) / (Hl >>> 0)) | 0))) | 0) ||
                        (0 | Sl) != (0 | El)) &&
                        ((Rl =
                          Nl >>> 0 < (Bl = Hl >>> 1) >>> 0
                            ? 0.5
                            : (0 | El) == (0 | Sl) && (0 | Bl) == (0 | Nl)
                              ? 1
                              : 1.5),
                        (ok = 1 & Jl ? 9007199254740994 : 9007199254740992),
                        !Tl | (45 != r[0 | Ul]) || ((Rl = -Rl), (ok = -ok)),
                        (q[Kl >> 2] = Bl = (Pl - Nl) | 0),
                        ok + Rl != ok))
                    ) {
                      if (1e9 <= (q[Kl >> 2] = Bl = (Bl + Hl) | 0) >>> 0)
                        for (;;)
                          if (
                            ((Kl = (Kl + -4) | (q[Kl >> 2] = 0)) >>> 0 < Fl >>> 0 &&
                              (q[(Fl = (Fl + -4) | 0) >> 2] = 0),
                            (Bl = (q[Kl >> 2] + 1) | 0),
                            !(999999999 < (q[Kl >> 2] = Bl) >>> 0))
                          )
                            break;
                      if (((Gl = w((Ol - Fl) >> 2, 9)), !((Bl = q[Fl >> 2]) >>> 0 < (Hl = 10))))
                        for (;;)
                          if (((Gl = (Gl + 1) | 0), !((Hl = w(Hl, 10)) >>> 0 <= Bl >>> 0))) break;
                    }
                    El = (Bl = (Kl + 4) | 0) >>> 0 < El >>> 0 ? Bl : El;
                  }
                  j: {
                    for (;;) {
                      if ((Nl = El) >>> (Pl = 0) <= Fl >>> 0) break j;
                      if (q[(El = (Nl + -4) | 0) >> 2]) break;
                    }
                    Pl = 1;
                  }
                  if (103 != (0 | _l)) Jl = 8 & Cl;
                  else if (
                    ((Ll =
                      (((Bl = ((0 | Gl) < (0 | (El = Ll || 1))) & (-5 < (0 | Gl))) ? -1 ^ Gl : -1) +
                        El) |
                      0),
                    (Dl = ((Bl ? -1 : -2) + Dl) | 0),
                    !(Jl = 8 & Cl))
                  ) {
                    if (
                      ((El = 9), Pl && (Jl = q[(Nl + -4) >> 2]) && !((Jl >>> (El = 0)) % (Bl = 10)))
                    )
                      for (;;)
                        if (((El = (El + 1) | 0), (Jl >>> 0) % ((Bl = w(Bl, 10)) >>> 0))) break;
                    ((Bl = (w((Nl - Ol) >> 2, 9) + -9) | 0),
                      (Ll =
                        102 == (32 | Dl)
                          ? ((Jl = 0) | Ll) < (0 | (Bl = 0 < (0 | (Bl = (Bl - El) | 0)) ? Bl : 0))
                            ? Ll
                            : Bl
                          : ((Jl = 0) | Ll) <
                              (0 | (Bl = 0 < (0 | (Bl = (((Bl + Gl) | 0) - El) | 0)) ? Bl : 0))
                            ? Ll
                            : Bl));
                  }
                  if (
                    ((Kl = 0 != (0 | (Hl = Ll | Jl))),
                    (Bl = a),
                    (Wl = Al),
                    (El = 0 < (0 | Gl) ? Gl : 0),
                    102 != (0 | (Ml = 32 | Dl)))
                  ) {
                    if (((Ql - (El = ga(((El = Gl >> 31) + Gl) ^ El, 0, Ql))) | 0) <= 1)
                      for (;;)
                        if (((o[0 | (El = (El + -1) | 0)] = 48), !(((Ql - El) | 0) < 2))) break;
                    ((o[0 | (Sl = (El + -2) | 0)] = Dl),
                      (o[(El + -1) | 0] = (0 | Gl) < 0 ? 45 : 43),
                      (El = (Ql - Sl) | 0));
                  }
                  if (
                    (_(Bl, 32, Wl, (Kl = (1 + ((El + ((Kl + ((Ll + Tl) | 0)) | 0)) | 0)) | 0), Cl),
                    Z(a, Ul, Tl),
                    _(a, 48, Al, Kl, 65536 ^ Cl),
                    102 == (0 | Ml))
                  ) {
                    for (
                      Bl = (16 + Il) | 8,
                        Gl = (16 + Il) | 9,
                        Fl = Dl = Ol >>> 0 < Fl >>> 0 ? Ol : Fl;
                      ;

                    ) {
                      if (((El = ga(q[Fl >> 2], 0, Gl)), (0 | Dl) != (0 | Fl))) {
                        if (!(El >>> 0 <= (16 + Il) >>> 0))
                          for (;;)
                            if (((o[0 | (El = (El + -1) | 0)] = 48), !((16 + Il) >>> 0 < El >>> 0)))
                              break;
                      } else (0 | El) == (0 | Gl) && ((o[(24 + Il) | 0] = 48), (El = Bl));
                      if ((Z(a, El, (Gl - El) | 0), !((Fl = (Fl + 4) | 0) >>> 0 <= Ol >>> 0)))
                        break;
                    }
                    Hl && Z(a, 4243, 1);
                    p: if (!(((0 | Ll) < 1) | (Nl >>> 0 <= Fl >>> 0)))
                      for (;;) {
                        if ((16 + Il) >>> 0 < (El = ga(q[Fl >> 2], 0, Gl)) >>> 0)
                          for (;;)
                            if (((o[0 | (El = (El + -1) | 0)] = 48), !((16 + Il) >>> 0 < El >>> 0)))
                              break;
                        if (
                          (Z(a, El, (0 | Ll) < 9 ? Ll : 9),
                          (Ll = (Ll + -9) | 0),
                          Nl >>> 0 <= (Fl = (Fl + 4) | 0) >>> 0)
                        )
                          break p;
                        if (!(0 < (0 | Ll))) break;
                      }
                    _(a, 48, (Ll + 9) | 0, 9, 0);
                  } else {
                    q: if (!((0 | Ll) < 0))
                      for (
                        Dl = Pl ? Nl : (Fl + 4) | 0,
                          Bl = (16 + Il) | 8,
                          Ol = (16 + Il) | 9,
                          Gl = Fl;
                        ;

                      ) {
                        if (
                          ((0 | Ol) == (0 | (El = ga(q[Gl >> 2], 0, Ol))) &&
                            ((o[(24 + Il) | 0] = 48), (El = Bl)),
                          (0 | Fl) != (0 | Gl))
                        ) {
                          if (!(El >>> 0 <= (16 + Il) >>> 0))
                            for (;;)
                              if (
                                ((o[0 | (El = (El + -1) | 0)] = 48), !((16 + Il) >>> 0 < El >>> 0))
                              )
                                break;
                        } else
                          (Z(a, El, 1),
                            (El = (El + 1) | 0),
                            ((0 | Ll) < 1 && !Jl) || Z(a, 4243, 1));
                        if (
                          (Z(a, (Ml = El), (0 | (El = (Ol - El) | 0)) < (0 | Ll) ? El : Ll),
                          (Ll = (Ll - El) | 0),
                          Dl >>> 0 <= (Gl = (Gl + 4) | 0) >>> 0)
                        )
                          break q;
                        if (!(-1 < (0 | Ll))) break;
                      }
                    (_(a, 48, (Ll + 18) | 0, 18, 0), Z(a, Sl, (Ql - Sl) | 0));
                  }
                }
                return (
                  _(a, 32, Al, Kl, 8192 ^ Cl),
                  (L = (560 + Il) | 0),
                  0 | ((0 | Kl) < (0 | Al) ? Al : Kl)
                );
              }),
              (n[12] = function (a, ok) {
                a |= 0;
                var Jk = 0,
                  Jk = (ok |= 0);
                ((ok = (q[ok >> 2] + 15) & -16),
                  (q[Jk >> 2] = ok + 16),
                  (Jk = a),
                  (a = Cc(q[ok >> 2], q[(ok + 4) >> 2], q[(ok + 8) >> 2], q[(ok + 12) >> 2])),
                  (v[Jk >> 3] = a));
              }),
              (n[13] = function (a) {
                return 0;
              }),
              (n[14] = function (a, ok, Jk) {
                ((ok |= 0), (Jk |= 0));
                var xl,
                  tl,
                  sl = 0,
                  ul = 0,
                  vl = 0,
                  wl = 0;
                for (
                  L = tl = (L - 32) | 0,
                    sl = q[((a |= 0) + 28) >> 2],
                    q[(16 + tl) >> 2] = sl,
                    vl = q[(a + 20) >> 2],
                    q[(28 + tl) >> 2] = Jk,
                    q[(24 + tl) >> 2] = ok,
                    vl = ((q[(20 + tl) >> 2] = ok = (vl - sl) | 0) + Jk) | 0,
                    wl = 2,
                    ok = (16 + tl) | 0;
                  ;

                ) {
                  a: {
                    if (
                      ((ul = (sl = 0) | K(q[(a + 60) >> 2], 0 | ok, 0 | wl, (12 + tl) | 0)) &&
                        ((q[2178] = ul), (sl = -1)),
                      (0 | (sl = sl ? (q[(12 + tl) >> 2] = -1) : q[(12 + tl) >> 2])) == (0 | vl))
                    )
                      ((ok = q[(a + 44) >> 2]),
                        (q[(a + 28) >> 2] = ok),
                        (q[(a + 20) >> 2] = ok),
                        (q[(a + 16) >> 2] = ok + q[(a + 48) >> 2]),
                        (a = Jk));
                    else {
                      if (-1 < (0 | sl)) break a;
                      ((q[(a + 28) >> 2] = 0),
                        (q[(a + 16) >> 2] = 0),
                        (q[(a + 20) >> 2] = 0),
                        (q[a >> 2] = 32 | q[a >> 2]),
                        2 != ((a = 0) | wl) && (a = (Jk - q[(ok + 4) >> 2]) | 0));
                    }
                    return ((L = (32 + tl) | 0), 0 | a);
                  }
                  ((ul = q[(ok + 4) >> 2]),
                    (q[(ok = (xl = ul >>> 0 < sl >>> 0) ? (ok + 8) | 0 : ok) >> 2] =
                      (ul = (sl - (xl ? ul : 0)) | 0) + q[ok >> 2]),
                    (q[(ok + 4) >> 2] = q[(ok + 4) >> 2] - ul),
                    (vl = (vl - sl) | 0),
                    (wl = (wl - xl) | 0));
                }
              }),
              (n[15] = function (a, ok, Jk, Rk) {
                return (M = 0);
              }),
              {
                d: function () {},
                e: function () {
                  return q[1897];
                },
                f: function () {
                  return 100663296;
                },
                g: function () {
                  return 6;
                },
                h: function (a, Dh) {
                  return (
                    (Dh |= 0),
                    (L = Dh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? sa(a)
                        ? (Y(4, 2236, 0), 0)
                        : r[(a + 4) | 0]
                      : ((q[(Dh + 4) >> 2] = 1444), (q[Dh >> 2] = 2335), Y(4, 1294, Dh), 0)),
                    (L = (Dh + 16) | 0),
                    0 | a
                  );
                },
                i: function (a, Dh) {
                  var Fh;
                  return (
                    (Dh |= 0),
                    (L = Fh = (L - 48) | 0),
                    (a = (a |= 0)
                      ? ((a + 63) & -64) != (0 | a)
                        ? ((q[(36 + Fh) >> 2] = 1522),
                          (q[(32 + Fh) >> 2] = 2352),
                          Y(4, 1294, (32 + Fh) | 0),
                          0)
                        : ((Dh + 63) & -64) == (0 | Dh) && Dh
                          ? (function (a, Bj) {
                              var Cj = 0,
                                Dj = 0,
                                Ej = 0,
                                Fj = 0,
                                Gj = 0,
                                Hj = 0,
                                Ij = 0,
                                Jj = 0,
                                Kj = 0,
                                Lj = 0,
                                Mj = 0,
                                Nj = 0,
                                Oj = 0,
                                Pj = 0,
                                Qj = 0,
                                Rj = 0,
                                Sj = 0,
                                Tj = 0,
                                Uj = 0,
                                Vj = 0,
                                Wj = 0,
                                Xj = 0,
                                Yj = 0,
                                Zj = 0;
                              L = Hj = ((Yj = Cj = L) - 768) & -64;
                              a: {
                                b: if (!(Bj >>> 0 <= 63)) {
                                  if (sa(a)) {
                                    Y(4, 1469, 0);
                                    break a;
                                  }
                                  if (!(Cj = r[(a + 4) | 0])) {
                                    ((q[(32 + Hj) >> 2] = Cj), Y(4, 1554, (32 + Hj) | 0));
                                    break a;
                                  }
                                  if (7 <= Cj >>> 0) {
                                    ((q[(52 + Hj) >> 2] = Cj),
                                      (q[(48 + Hj) >> 2] = 6),
                                      Y(4, 1640, (48 + Hj) | 0));
                                    break a;
                                  }
                                  if (((Fj = Ej = a), 6 != (0 | Cj))) {
                                    if (Bj >>> 0 < 1408) break b;
                                    ((Pj = 712), (Sj = 708), (Cj = (a + 704) | 0));
                                  } else {
                                    if (Bj >>> 0 < 2688) break b;
                                    ((Pj = 1992), (Sj = 1988), (Cj = (a + 1984) | 0));
                                  }
                                  ((q[(Fj + 8) >> 2] = Cj),
                                    (q[(Ej + 12) >> 2] = 0),
                                    (q[Cj >> 2] = a),
                                    (q[(a + Sj) >> 2] = a - -64),
                                    (q[(a + Pj) >> 2] = Cj),
                                    (a = q[Cj >> 2]),
                                    (Jj = 1 == (0 | !r[(a + 5) | 0])) ||
                                      (da((a + 4) | 0, 1),
                                      X(
                                        q[(Cj + 4) >> 2],
                                        4,
                                        r[(q[Cj >> 2] + 4) | 0] < 6 ? 160 : 480
                                      )),
                                    $((Hj + 64) | 12, 0, 692),
                                    (q[(72 + Hj) >> 2] = q[(Cj + 8) >> 2]),
                                    (a = q[(Cj + 4) >> 2]),
                                    (q[(64 + Hj) >> 2] = q[Cj >> 2]),
                                    (q[(68 + Hj) >> 2] = a),
                                    oa(Cj, (Hj + 64) | 0),
                                    (Gj = (Bj + Cj) | 0),
                                    (Bj = q[(76 + Hj) >> 2]));
                                  d: {
                                    e: {
                                      f: {
                                        if (5 <= (Oj = r[(q[Cj >> 2] + 4) | 0]) >>> 0) {
                                          if ((Bj >>> 0 < Cj >>> 0) | (Gj >>> 0 < Bj >>> 0))
                                            break e;
                                          if ((Mj = (Bj + 256) | 0) >>> 0 < Cj >>> 0) break e;
                                          if (Mj >>> 0 <= Gj >>> 0) break f;
                                          break e;
                                        }
                                        if ((Bj >>> 0 < Cj >>> 0) | (Gj >>> 0 < Bj >>> 0)) break e;
                                        if (
                                          ((Mj = (Bj + 128) | 0) >>> 0 < Cj >>> 0) |
                                          (Gj >>> 0 < Mj >>> 0)
                                        )
                                          break e;
                                      }
                                      if (
                                        !(
                                          ((a = q[(80 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                          (Gj >>> 0 < a >>> 0) |
                                          (a >>> 0 < Mj >>> 0)
                                        ) &&
                                        !(
                                          ((a = (a - -64) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          (0 | (Kj = q[Bj >> 2])) < 0 ||
                                          ((Ej = q[(84 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = ((Mj = Kj << 2) + Ej) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Nj = q[(88 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Nj >>> 0) |
                                            (Nj >>> 0 < a >>> 0) ||
                                          ((a = ((Kj << 6) + Nj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(92 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Mj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(96 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Mj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(100 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Mj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(104 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Mj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(108 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Mj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(112 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Mj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          (0 | (Ej = q[(Bj + 4) >> 2])) < 0 ||
                                          ((Dj = q[(120 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = ((Fj = Ej << 2) + Dj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(124 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + (Ej << 6)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(128 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(132 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(136 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(140 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(144 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(148 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(152 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((Ej = (Ej + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) ||
                                          (0 | (a = q[(Bj + 8) >> 2])) < 0 ||
                                          ((Dj = q[(156 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < Ej >>> 0) ||
                                          ((a = ((Ij = a << 2) + Dj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(160 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Ij) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(164 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Ij) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(172 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Ij) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(176 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Ij) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(180 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((Ej = (Ej + Ij) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) ||
                                          (0 | (a = q[(Bj + 12) >> 2])) < 0 ||
                                          ((Dj = q[(188 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < Ej >>> 0) ||
                                          ((a = ((Vj = a << 2) + Dj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(192 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Vj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(196 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Vj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(204 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Vj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          (0 | (Dj = q[(Bj + 16) >> 2])) < 0 ||
                                          ((Ej = q[(208 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = ((Tj = Dj << 2) + Ej) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(212 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(216 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(220 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(224 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + (Dj << 6)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(228 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(232 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(236 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(244 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(248 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(252 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(256 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(260 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(264 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Ej) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(272 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(276 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(280 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(284 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(288 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(292 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Tj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          (0 | (Ej = q[(Bj + 20) >> 2])) < 0 ||
                                          ((Dj = q[(296 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = ((Wj = Ej << 2) + Dj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(300 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + (Ej << 6)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(304 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Wj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(308 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Wj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(312 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Wj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(316 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Wj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(320 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Wj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(328 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((a = (Ej + Wj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Ej = q[(332 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) |
                                            (Ej >>> 0 < a >>> 0) ||
                                          ((Ej = (Ej + Wj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Ej >>> 0) ||
                                          (0 | (a = q[(Bj + 24) >> 2])) < 0 ||
                                          ((Dj = q[(356 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < Ej >>> 0) ||
                                          ((Dj = ((Ej = a << 2) + Dj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 28) >> 2])) < 0 ||
                                          ((Fj = q[(364 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((a = ((Lj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(368 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((Dj = (Dj + Lj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 32) >> 2])) < 0 ||
                                          ((Fj = q[(380 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((a = ((Xj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(384 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Xj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(388 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Xj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(392 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Xj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(396 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Xj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(400 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Xj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(404 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((Dj = (Dj + Xj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 36) >> 2])) < 0 ||
                                          ((Fj = q[(416 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((a = ((Qj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(420 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Qj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(424 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((Dj = (Dj + Qj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 40) >> 2])) < 0 ||
                                          ((Fj = q[(436 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = (Fj + (a << 2)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 44) >> 2])) < 0 ||
                                          ((Fj = q[(448 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = (Fj + (a << 2)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 48) >> 2])) < 0 ||
                                          ((Fj = q[(452 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = ((a <<= 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          ((Fj = q[(456 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = (a + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 52) >> 2])) < 0 ||
                                          ((Fj = q[(440 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = ((a <<= 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          ((Fj = q[(444 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = (a + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 56) >> 2])) < 0 ||
                                          ((Fj = q[(576 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = (Fj + (a << 2)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 60) >> 2])) < 0 ||
                                          ((Fj = q[(580 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = (Fj + (a << 2)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 64) >> 2])) < 0 ||
                                          ((Fj = q[(584 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = (Fj + (a << 1)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 68) >> 2])) < 0 ||
                                          ((Fj = q[(588 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Dj = (Fj + (a << 2)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 72) >> 2])) < 0 ||
                                          ((Fj = q[(592 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((a = ((Dj = Fj) + (Fj = a << 2)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(596 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(600 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(604 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(608 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((Dj = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 76) >> 2])) < 0 ||
                                          ((Fj = q[(612 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Fj = q[(616 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Fj = q[(620 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          (0 | (Dj = q[(Bj + 80) >> 2])) < 0 ||
                                          ((Fj = q[(624 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < a >>> 0) ||
                                          ((a = ((Rj = Dj << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Fj = q[(628 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < a >>> 0) ||
                                          ((a = (Fj + (Dj << 6)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(632 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Rj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(636 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Rj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(640 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Rj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(644 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Rj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(648 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Rj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(652 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Rj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Dj = q[(656 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) |
                                            (Dj >>> 0 < a >>> 0) ||
                                          ((a = (Dj + Rj) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          (0 | (Dj = q[(Bj + 84) >> 2])) < 0 ||
                                          ((Fj = q[(660 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < a >>> 0) ||
                                          ((a = (Fj + (Dj << 2)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) ||
                                          ((Fj = q[(664 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < a >>> 0) ||
                                          ((Dj = (Fj + (Dj << 1)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Dj >>> 0) ||
                                          (0 | (a = q[(Bj + 88) >> 2])) < 0 ||
                                          ((Fj = q[(668 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Fj >>> 0) |
                                            (Fj >>> 0 < Dj >>> 0) ||
                                          ((Uj = (Fj + (a << 2)) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Uj >>> 0)
                                        )
                                      ) {
                                        if (!(Oj >>> 0 < 2)) {
                                          if (
                                            ((a = q[(184 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < a >>> 0) |
                                            (a >>> 0 < Uj >>> 0)
                                          )
                                            break e;
                                          if (
                                            ((Uj = (a + Ij) | 0) >>> 0 < Cj >>> 0) |
                                            (Gj >>> 0 < Uj >>> 0)
                                          )
                                            break e;
                                          if (!(Oj >>> 0 < 4)) {
                                            if (
                                              ((a = q[(344 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) |
                                              (a >>> 0 < Uj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (a + Wj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(348 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Wj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(352 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Wj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(168 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Ij) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(200 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Vj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(240 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = (Dj + Tj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if ((0 | (a = q[(Bj + 92) >> 2])) < 0) break e;
                                            if (
                                              ((Fj = q[(672 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(676 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(680 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if ((0 | (a = q[(Bj + 96) >> 2])) < 0) break e;
                                            if (
                                              ((Fj = q[(684 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(688 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(692 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(324 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Wj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(336 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Wj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(340 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = (Dj + Wj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if ((0 | (a = q[(Bj + 100) >> 2])) < 0) break e;
                                            if (
                                              ((Fj = q[(460 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(464 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(468 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if ((0 | (a = q[(Bj + 104) >> 2])) < 0) break e;
                                            if (
                                              ((Fj = q[(472 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = ((Dj = Fj) + (Fj = a << 2)) | 0) >>> 0 <
                                                Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(476 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(480 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(484 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = q[(488 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if ((0 | (a = q[(Bj + 108) >> 2])) < 0) break e;
                                            if (
                                              ((Fj = q[(504 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(508 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(512 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if ((0 | (a = q[(Bj + 112) >> 2])) < 0) break e;
                                            if (
                                              ((Fj = q[(528 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(532 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(536 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if ((0 | (a = q[(Bj + 116) >> 2])) < 0) break e;
                                            if (
                                              ((Fj = q[(552 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = (Fj + (a << 2)) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if ((0 | (a = q[(Bj + 120) >> 2])) < 0) break e;
                                            if (
                                              ((Fj = q[(556 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(560 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(564 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if ((0 | (a = q[(Bj + 124) >> 2])) < 0) break e;
                                            if (
                                              ((Fj = q[(568 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Dj = ((a <<= 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Fj = q[(572 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0)
                                            )
                                              break e;
                                            if (
                                              ((Uj = (a + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Uj >>> 0)
                                            )
                                              break e;
                                          }
                                        }
                                        if (Oj >>> 0 < 5) break d;
                                        if (
                                          !(
                                            ((a = q[(372 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) |
                                              (a >>> 0 < Uj >>> 0) ||
                                            ((a = (a + Lj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Dj = q[(376 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0) ||
                                            ((a = (Dj + Lj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Dj = q[(408 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0) ||
                                            ((a = (Dj + Xj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Dj = q[(412 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0) ||
                                            ((a = (Dj + Xj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Dj = q[(428 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0) ||
                                            ((a = (Dj + Qj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Dj = q[(432 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) |
                                              (Dj >>> 0 < a >>> 0) ||
                                            ((Dj = (Dj + Qj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) ||
                                            (0 | (a = q[(Bj + 128) >> 2])) < 0 ||
                                            ((Fj = q[(492 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0) ||
                                            ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Fj = q[(496 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0) ||
                                            ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Fj = q[(500 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0) ||
                                            ((Dj = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) ||
                                            (0 | (a = q[(Bj + 132) >> 2])) < 0 ||
                                            ((Fj = q[(516 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0) ||
                                            ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Fj = q[(520 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0) ||
                                            ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Fj = q[(524 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0) ||
                                            ((Dj = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Dj >>> 0) ||
                                            (0 | (a = q[(Bj + 136) >> 2])) < 0 ||
                                            ((Fj = q[(540 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < Dj >>> 0) ||
                                            ((a = ((Dj = a << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Fj = q[(544 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0) ||
                                            ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0) ||
                                            ((Fj = q[(548 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < Fj >>> 0) |
                                              (Fj >>> 0 < a >>> 0) ||
                                            ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                              (Gj >>> 0 < a >>> 0)
                                          )
                                        ) {
                                          if (Oj >>> 0 < 6) break d;
                                          if (
                                            !(
                                              ((Dj = q[(116 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              ((a = (Dj + Mj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Dj = q[(268 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              ((a = (Dj + Tj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              (0 | (Dj = q[(Bj + 140) >> 2])) < 0 ||
                                              ((Fj = q[(696 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Fj >>> 0) |
                                                (Fj >>> 0 < a >>> 0) ||
                                              ((a = ((Lj = Dj << 2) + Fj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Fj = q[(700 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Fj >>> 0) |
                                                (Fj >>> 0 < a >>> 0) ||
                                              ((a = (Fj + Lj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Fj = q[(704 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Fj >>> 0) |
                                                (Fj >>> 0 < a >>> 0) ||
                                              ((a = (Dj + Fj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Dj = q[(708 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              ((a = (Dj + Lj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Dj = q[(712 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              ((a = (Dj + Lj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Dj = q[(716 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              ((a = (Dj + Lj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Dj = q[(360 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              ((Ej = (Dj + Ej) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Ej >>> 0) ||
                                              (0 | (a = q[(Bj + 144) >> 2])) < 0 ||
                                              ((Dj = q[(720 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < Ej >>> 0) ||
                                              ((a = ((Ej = a << 2) + Dj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Dj = q[(724 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              ((a = (Dj + Ej) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Dj = q[(728 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              ((Ej = (Dj + Ej) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Ej >>> 0) ||
                                              (0 | (a = q[(Bj + 148) >> 2])) < 0 ||
                                              ((Dj = q[(732 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < Ej >>> 0) ||
                                              ((a = ((Ej = a << 2) + Dj) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Dj = q[(736 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              ((a = (Dj + Ej) | 0) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < a >>> 0) ||
                                              ((Dj = q[(740 + Hj) >> 2]) >>> 0 < Cj >>> 0) |
                                                (Gj >>> 0 < Dj >>> 0) |
                                                (Dj >>> 0 < a >>> 0) ||
                                              (a = (Dj + Ej) | 0) >>> 0 < Cj >>> 0 ||
                                              !(a >>> 0 <= Gj >>> 0)
                                            )
                                          )
                                            break d;
                                        }
                                      }
                                    }
                                    (Y(4, 1760, 0),
                                      da((q[Cj >> 2] + 4) | 0, 1),
                                      X(
                                        q[(Cj + 4) >> 2],
                                        4,
                                        r[(q[Cj >> 2] + 4) | 0] < 6 ? 160 : 480
                                      ));
                                    break a;
                                  }
                                  Jj ||
                                    (xa(Oj, q[(Cj + 8) >> 2]),
                                    (a = q[Cj >> 2]),
                                    (o[(a + 5) | 0] = 0),
                                    (Nj = q[(88 + Hj) >> 2]),
                                    (Bj = q[(76 + Hj) >> 2]),
                                    (Kj = q[Bj >> 2]),
                                    (Oj = r[(a + 4) | 0]));
                                  h: {
                                    if ((a = 0) < (0 | Kj)) {
                                      for (;;) {
                                        if (63 < ia(((a << 6) + Nj) | 0) >>> 0) break h;
                                        if ((0 | Kj) == (0 | (a = (a + 1) | 0))) break;
                                      }
                                      if (
                                        ((Uj = (Bj + 48) | 0), (Ij = 0) < (0 | (Fj = q[Bj >> 2])))
                                      ) {
                                        for (Ej = q[(Bj + 48) >> 2], Cj = q[(92 + Hj) >> 2]; ; ) {
                                          if (
                                            ((0 | (a = q[(Cj + (Ij << 2)) >> 2])) < 0) |
                                            ((0 | Ej) <= (0 | a))
                                          )
                                            break h;
                                          if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (
                                          Zj = (Bj + 24) | 0,
                                            Dj = q[(Bj + 24) >> 2],
                                            Ej = q[(100 + Hj) >> 2],
                                            Cj = q[(96 + Hj) >> 2],
                                            Ij = 0;
                                          ;

                                        ) {
                                          if ((Jj = q[((a = Ij << 2) + Ej) >> 2])) {
                                            if (((0 | Jj) < 0) | ((0 | Dj) < (0 | Jj))) break h;
                                            if (
                                              ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                              ((0 | Dj) <= (0 | a))
                                            )
                                              break h;
                                            if (((a = (a + Jj) | 0) >>> 31) | ((0 | Dj) < (0 | a)))
                                              break h;
                                          }
                                          if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (Ij = 0, a = q[(104 + Hj) >> 2]; ; ) {
                                          if (1 < t[(a + (Ij << 2)) >> 2]) break h;
                                          if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (Ij = 0, a = q[(108 + Hj) >> 2]; ; ) {
                                          if (1 < t[(a + (Ij << 2)) >> 2]) break h;
                                          if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (Ij = 0, Cj = q[(112 + Hj) >> 2]; ; ) {
                                          if (
                                            ((0 | (a = q[(Cj + (Ij << 2)) >> 2])) < -1) |
                                            ((0 | Fj) <= (0 | a))
                                          )
                                            break h;
                                          if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                      } else Zj = (Bj + 24) | 0;
                                    } else ((Zj = (Bj + 24) | 0), (Uj = (Bj + 48) | 0));
                                    if ((a = 0) < (0 | (Ej = q[(Bj + 4) >> 2]))) {
                                      for (Cj = q[(124 + Hj) >> 2]; ; ) {
                                        if (63 < ia((Cj + (a << 6)) | 0) >>> 0) break h;
                                        if ((0 | Ej) == (0 | (a = (a + 1) | 0))) break;
                                      }
                                      if (
                                        ((Ej = q[(Bj + 48) >> 2]),
                                        (Pj = (Ej + -1) | 0),
                                        !(((Ij = 0) | (Lj = q[(Bj + 4) >> 2])) <= 0))
                                      ) {
                                        for (Cj = q[(128 + Hj) >> 2]; ; ) {
                                          if (
                                            ((0 | (a = q[(Cj + (Ij << 2)) >> 2])) < 0) |
                                            ((0 | Ej) <= (0 | a))
                                          )
                                            break h;
                                          if ((0 | Lj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (Ij = 0, a = q[(132 + Hj) >> 2]; ; ) {
                                          if (1 < t[(a + (Ij << 2)) >> 2]) break h;
                                          if ((0 | Lj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (Ij = 0, a = q[(136 + Hj) >> 2]; ; ) {
                                          if (1 < t[(a + (Ij << 2)) >> 2]) break h;
                                          if ((0 | Lj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (Ej = q[Bj >> 2], Ij = 0, Cj = q[(140 + Hj) >> 2]; ; ) {
                                          if (
                                            ((0 | (a = q[(Cj + (Ij << 2)) >> 2])) < -1) |
                                            ((0 | Ej) <= (0 | a))
                                          )
                                            break h;
                                          if ((0 | Lj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (Ij = 0, Cj = q[(144 + Hj) >> 2]; ; ) {
                                          if (
                                            ((0 | (a = q[(Cj + (Ij << 2)) >> 2])) < -1) |
                                            ((0 | Lj) <= (0 | a))
                                          )
                                            break h;
                                          if ((0 | Lj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (Ij = 0, Fj = q[(148 + Hj) >> 2]; ; ) {
                                          if (1 < t[(Fj + (Ij << 2)) >> 2]) break h;
                                          if ((0 | Lj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                        for (
                                          Dj = (Bj + 8) | 0,
                                            Jj = (Bj + 12) | 0,
                                            Ej = q[(152 + Hj) >> 2],
                                            Ij = 0;
                                          ;

                                        ) {
                                          if (1 < (Cj = q[((a = Ij << 2) + Fj) >> 2]) >>> 0)
                                            break h;
                                          if (
                                            ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                            ((0 | a) >= q[((Cj - 1) | 0 ? Dj : Jj) >> 2])
                                          )
                                            break h;
                                          if ((0 | Lj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                        }
                                      }
                                    } else Pj = (q[Uj >> 2] + -1) | 0;
                                    if ((a = 0) < (0 | (Qj = q[(Bj + 8) >> 2]))) {
                                      for (Ej = q[(156 + Hj) >> 2]; ; ) {
                                        if (
                                          ((0 | (Cj = q[(Ej + (a << 2)) >> 2])) < 0) |
                                          ((0 | Pj) < (0 | Cj))
                                        )
                                          break h;
                                        if ((0 | Qj) == (0 | (a = (a + 1) | 0))) break;
                                      }
                                      for (
                                        Gj = (Bj + 28) | 0,
                                          Fj = q[(Bj + 28) >> 2],
                                          Jj = q[(164 + Hj) >> 2],
                                          Ej = q[(160 + Hj) >> 2],
                                          a = 0;
                                        ;

                                      ) {
                                        if ((Dj = q[((Cj = a << 2) + Jj) >> 2])) {
                                          if (((0 | Dj) < 0) | ((0 | Fj) < (0 | Dj))) break h;
                                          if (
                                            ((0 | (Cj = q[(Cj + Ej) >> 2])) < 0) |
                                            ((0 | Fj) <= (0 | Cj))
                                          )
                                            break h;
                                          if (((Cj = (Cj + Dj) | 0) >>> 31) | ((0 | Fj) < (0 | Cj)))
                                            break h;
                                        }
                                        if ((0 | Qj) == (0 | (a = (a + 1) | 0))) break;
                                      }
                                      for (
                                        a = 0,
                                          Lj = q[(172 + Hj) >> 2],
                                          Fj = q[(180 + Hj) >> 2],
                                          Dj = q[(176 + Hj) >> 2];
                                        ;

                                      ) {
                                        if ((0 | (Jj = q[((Cj = a << 2) + Dj) >> 2])) < 1) break h;
                                        if ((0 | (Ej = q[(Cj + Fj) >> 2])) < 1) break h;
                                        if (
                                          ((0 | (Cj = q[(Cj + Lj) >> 2])) < 1) |
                                          ((0 | Cj) != (0 | w((Ej + 1) | 0, (Jj + 1) | 0)))
                                        )
                                          break h;
                                        if ((0 | Qj) == (0 | (a = (a + 1) | 0))) break;
                                      }
                                    } else Gj = (Bj + 28) | 0;
                                    if ((a = 0) < (0 | (Dj = q[(Bj + 12) >> 2]))) {
                                      for (Ej = q[(188 + Hj) >> 2]; ; ) {
                                        if (
                                          ((0 | (Cj = q[(Ej + (a << 2)) >> 2])) < 0) |
                                          ((0 | Pj) < (0 | Cj))
                                        )
                                          break h;
                                        if ((0 | Dj) == (0 | (a = (a + 1) | 0))) break;
                                      }
                                      for (
                                        Tj = (Bj + 32) | 0,
                                          Lj = q[(Bj + 32) >> 2],
                                          Jj = q[(196 + Hj) >> 2],
                                          Ej = q[(192 + Hj) >> 2],
                                          a = 0;
                                        ;

                                      ) {
                                        if ((Fj = q[((Cj = a << 2) + Jj) >> 2])) {
                                          if (((0 | Fj) < 0) | ((0 | Lj) < (0 | Fj))) break h;
                                          if (
                                            ((0 | (Cj = q[(Cj + Ej) >> 2])) < 0) |
                                            ((0 | Lj) <= (0 | Cj))
                                          )
                                            break h;
                                          if (((Cj = (Cj + Fj) | 0) >>> 31) | ((0 | Lj) < (0 | Cj)))
                                            break h;
                                        }
                                        if ((0 | Dj) == (0 | (a = (a + 1) | 0))) break;
                                      }
                                    } else Tj = (Bj + 32) | 0;
                                    ((Vj = (Bj + 16) | 0), (a = 0));
                                    o: {
                                      p: {
                                        if (!((0 | (Ej = q[(Bj + 16) >> 2])) <= 0)) {
                                          for (Cj = q[(224 + Hj) >> 2]; ; ) {
                                            if (63 < ia((Cj + (a << 6)) | 0) >>> 0) break h;
                                            if ((0 | Ej) == (0 | (a = (a + 1) | 0))) break;
                                          }
                                          if (!(((Ij = 0) | (Fj = q[Vj >> 2])) <= 0)) {
                                            for (Ej = q[Uj >> 2], Cj = q[(228 + Hj) >> 2]; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Ij << 2)) >> 2])) < 0) |
                                                ((0 | Ej) <= (0 | a))
                                              )
                                                break h;
                                              if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                            }
                                            for (
                                              Wj = (Bj + 36) | 0,
                                                Dj = q[(Bj + 36) >> 2],
                                                Ej = q[(236 + Hj) >> 2],
                                                Cj = q[(232 + Hj) >> 2],
                                                Ij = 0;
                                              ;

                                            ) {
                                              if ((Jj = q[((a = Ij << 2) + Ej) >> 2])) {
                                                if (((0 | Jj) < 0) | ((0 | Dj) < (0 | Jj))) break h;
                                                if (
                                                  ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                                  ((0 | Dj) <= (0 | a))
                                                )
                                                  break h;
                                                if (
                                                  ((a = (a + Jj) | 0) >>> 31) |
                                                  ((0 | Dj) < (0 | a))
                                                )
                                                  break h;
                                              }
                                              if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                            }
                                            for (Ij = 0, a = q[(244 + Hj) >> 2]; ; ) {
                                              if (1 < t[(a + (Ij << 2)) >> 2]) break h;
                                              if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                            }
                                            for (Ij = 0, a = q[(248 + Hj) >> 2]; ; ) {
                                              if (1 < t[(a + (Ij << 2)) >> 2]) break h;
                                              if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                            }
                                            for (
                                              Ej = q[Bj >> 2], Ij = 0, Cj = q[(252 + Hj) >> 2];
                                              ;

                                            ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Ij << 2)) >> 2])) < -1) |
                                                ((0 | Ej) <= (0 | a))
                                              )
                                                break h;
                                              if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                            }
                                            for (
                                              Ej = q[(Bj + 4) >> 2],
                                                Ij = 0,
                                                Cj = q[(256 + Hj) >> 2];
                                              ;

                                            ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Ij << 2)) >> 2])) < -1) |
                                                ((0 | Ej) <= (0 | a))
                                              )
                                                break h;
                                              if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                            }
                                            for (a = q[(260 + Hj) >> 2], Ij = 0; ; ) {
                                              if (q[(a + (Ij << 2)) >> 2] < 0) break h;
                                              if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                            }
                                            break p;
                                          }
                                        }
                                        ((Xj = (Bj + 68) | 0), (Wj = (Bj + 36) | 0));
                                        break o;
                                      }
                                      for (Jj = q[(272 + Hj) >> 2], Ij = 0; ; ) {
                                        if (q[(Jj + (Ij << 2)) >> 2] < 0) break h;
                                        if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                      for (
                                        Ej = q[(Bj + 60) >> 2], Ij = 0, Cj = q[(276 + Hj) >> 2];
                                        ;

                                      ) {
                                        if (
                                          ((a =
                                            (q[((a = Ij << 2) + Cj) >> 2] +
                                              (q[(a + Jj) >> 2] << 1)) |
                                            0) >>>
                                            31) |
                                          ((0 | Ej) < (0 | a))
                                        )
                                          break h;
                                        if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                      for (
                                        Dj = q[(Bj + 64) >> 2],
                                          Ej = q[(284 + Hj) >> 2],
                                          Cj = q[(280 + Hj) >> 2],
                                          Ij = 0;
                                        ;

                                      ) {
                                        if ((Jj = q[((a = Ij << 2) + Ej) >> 2])) {
                                          if (((0 | Jj) < 0) | ((0 | Dj) < (0 | Jj))) break h;
                                          if (
                                            ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                            ((0 | Dj) <= (0 | a))
                                          )
                                            break h;
                                          if (((a = (a + Jj) | 0) >>> 31) | ((0 | Dj) < (0 | a)))
                                            break h;
                                        }
                                        if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                      for (
                                        Xj = (Bj + 68) | 0,
                                          Dj = q[(Bj + 68) >> 2],
                                          Ej = q[(292 + Hj) >> 2],
                                          Cj = q[(288 + Hj) >> 2],
                                          Ij = 0;
                                        ;

                                      ) {
                                        if ((Jj = q[((a = Ij << 2) + Ej) >> 2])) {
                                          if (((0 | Jj) < 0) | ((0 | Dj) < (0 | Jj))) break h;
                                          if (
                                            ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                            ((0 | Dj) <= (0 | a))
                                          )
                                            break h;
                                          if (((a = (a + Jj) | 0) >>> 31) | ((0 | Dj) < (0 | a)))
                                            break h;
                                        }
                                        if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                    }
                                    a = 0;
                                    r: {
                                      s: {
                                        if (!((0 | (Ej = q[(Bj + 20) >> 2])) <= 0)) {
                                          for (Cj = q[(300 + Hj) >> 2]; ; ) {
                                            if (63 < ia((Cj + (a << 6)) | 0) >>> 0) break h;
                                            if ((0 | Ej) == (0 | (a = (a + 1) | 0))) break;
                                          }
                                          if (!(((a = 0) | (Fj = q[(Bj + 20) >> 2])) <= 0)) {
                                            for (Cj = q[(316 + Hj) >> 2]; ; ) {
                                              if (1 < t[(Cj + (a << 2)) >> 2]) break h;
                                              if ((0 | Fj) == (0 | (a = (a + 1) | 0))) break;
                                            }
                                            for (Cj = q[(320 + Hj) >> 2], a = 0; ; ) {
                                              if (q[(Cj + (a << 2)) >> 2] < 0) break h;
                                              if ((0 | Fj) == (0 | (a = (a + 1) | 0))) break;
                                            }
                                            break s;
                                          }
                                        }
                                        a = q[(Bj + 52) >> 2];
                                        break r;
                                      }
                                      for (
                                        a = q[(Bj + 52) >> 2],
                                          Jj = q[(332 + Hj) >> 2],
                                          Ej = q[(328 + Hj) >> 2],
                                          Pj = 0;
                                        ;

                                      ) {
                                        if ((Dj = q[((Cj = Pj << 2) + Jj) >> 2])) {
                                          if (((0 | Dj) < 0) | ((0 | a) < (0 | Dj))) break h;
                                          if (
                                            ((0 | (Cj = q[(Cj + Ej) >> 2])) < 0) |
                                            ((0 | a) <= (0 | Cj))
                                          )
                                            break h;
                                          if (((Cj = (Cj + Dj) | 0) >>> 31) | ((0 | a) < (0 | Cj)))
                                            break h;
                                        }
                                        if ((0 | Fj) == (0 | (Pj = (Pj + 1) | 0))) break;
                                      }
                                    }
                                    if (
                                      ((Ij = 0),
                                      (Lj = q[(Bj + 40) >> 2]),
                                      0 < (0 | (Dj = q[(Bj + 8) >> 2])))
                                    )
                                      for (Jj = q[(368 + Hj) >> 2], Ej = q[(172 + Hj) >> 2]; ; ) {
                                        if (
                                          ((Cj =
                                            (q[((Cj = Ij << 2) + Jj) >> 2] +
                                              (q[(Cj + Ej) >> 2] << 1)) |
                                            0) >>>
                                            31) |
                                          ((0 | Lj) < (0 | Cj))
                                        )
                                          break h;
                                        if ((0 | Dj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                    if ((Ij = 0) < (0 | (Ej = q[Tj >> 2]))) {
                                      for (Cj = q[(400 + Hj) >> 2]; ; ) {
                                        if (1 < t[(Cj + (Ij << 2)) >> 2]) break h;
                                        if ((0 | Ej) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                      for (Ij = 0, Cj = q[(404 + Hj) >> 2]; ; ) {
                                        if (1 < t[(Cj + (Ij << 2)) >> 2]) break h;
                                        if ((0 | Ej) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                    }
                                    if ((Ij = 0) < (0 | (Fj = q[Vj >> 2])))
                                      for (Jj = q[(424 + Hj) >> 2], Ej = q[(272 + Hj) >> 2]; ; ) {
                                        if (
                                          ((Cj =
                                            (q[((Cj = Ij << 2) + Jj) >> 2] +
                                              (q[(Cj + Ej) >> 2] << 1)) |
                                            0) >>>
                                            31) |
                                          ((0 | Lj) < (0 | Cj))
                                        )
                                          break h;
                                        if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                    if ((Ij = 0) < (0 | (Qj = q[(Bj + 44) >> 2])))
                                      for (Ej = q[(448 + Hj) >> 2]; ; ) {
                                        if (
                                          ((0 | (Cj = q[(Ej + (Ij << 2)) >> 2])) < 0) |
                                          ((0 | a) <= (0 | Cj))
                                        )
                                          break h;
                                        if ((0 | Qj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                    if (1 <= (0 | (Dj = q[Uj >> 2])))
                                      for (
                                        Ij = 0, Jj = q[(456 + Hj) >> 2], Ej = q[(452 + Hj) >> 2];
                                        ;

                                      ) {
                                        if ((Lj = q[((Cj = Ij << 2) + Jj) >> 2])) {
                                          if (((0 | Lj) < 0) | ((0 | Qj) < (0 | Lj))) break h;
                                          if (
                                            ((0 | (Cj = q[(Cj + Ej) >> 2])) < 0) |
                                            ((0 | Qj) <= (0 | Cj))
                                          )
                                            break h;
                                          if (((Cj = (Cj + Lj) | 0) >>> 31) | ((0 | Qj) < (0 | Cj)))
                                            break h;
                                        }
                                        if ((0 | Dj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                    if (1 <= (0 | a))
                                      for (
                                        Lj = q[(Bj + 56) >> 2],
                                          Ij = 0,
                                          Jj = q[(444 + Hj) >> 2],
                                          Ej = q[(440 + Hj) >> 2];
                                        ;

                                      ) {
                                        if ((Dj = q[((Cj = Ij << 2) + Jj) >> 2])) {
                                          if (((0 | Dj) < 0) | ((0 | Lj) < (0 | Dj))) break h;
                                          if (
                                            ((0 | (Cj = q[(Cj + Ej) >> 2])) < 0) |
                                            ((0 | Lj) <= (0 | Cj))
                                          )
                                            break h;
                                          if (((Cj = (Cj + Dj) | 0) >>> 31) | ((0 | Lj) < (0 | Cj)))
                                            break h;
                                        }
                                        if ((0 | (Ij = (Ij + 1) | 0)) == (0 | a)) break;
                                      }
                                    if ((a = 0) < (0 | (Jj = q[Xj >> 2])))
                                      for (Ej = q[(588 + Hj) >> 2]; ; ) {
                                        if (
                                          ((0 | (Cj = q[(Ej + (a << 2)) >> 2])) < -1) |
                                          ((0 | Fj) <= (0 | Cj))
                                        )
                                          break h;
                                        if ((0 | Jj) == (0 | (a = (a + 1) | 0))) break;
                                      }
                                    if (
                                      ((Fj = q[(Bj + 76) >> 2]),
                                      1 <= (0 | (Dj = q[(Bj + 72) >> 2])))
                                    )
                                      for (
                                        Ij = 0, Ej = q[(596 + Hj) >> 2], Cj = q[(592 + Hj) >> 2];
                                        ;

                                      ) {
                                        if ((Jj = q[((a = Ij << 2) + Ej) >> 2])) {
                                          if (((0 | Jj) < 0) | ((0 | Fj) < (0 | Jj))) break h;
                                          if (
                                            ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                            ((0 | Fj) <= (0 | a))
                                          )
                                            break h;
                                          if (((a = (a + Jj) | 0) >>> 31) | ((0 | Fj) < (0 | a)))
                                            break h;
                                        }
                                        if ((0 | Dj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                    if ((Ij = 0) < (0 | Fj)) {
                                      for (Jj = q[(612 + Hj) >> 2]; ; ) {
                                        if (1 < t[(Jj + (Ij << 2)) >> 2]) break h;
                                        if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                      for (Ej = q[(616 + Hj) >> 2], Ij = 0; ; ) {
                                        if (1 < (Cj = q[((a = Ij << 2) + Jj) >> 2]) >>> 0) break h;
                                        if (
                                          ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                          ((0 | a) >= q[((Cj - 1) | 0 ? Vj : Bj) >> 2])
                                        )
                                          break h;
                                        if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                      for (Ij = 0, Cj = q[(620 + Hj) >> 2]; ; ) {
                                        if (
                                          ((0 | (a = q[(Cj + (Ij << 2)) >> 2])) < -1) |
                                          ((0 | Dj) <= (0 | a))
                                        )
                                          break h;
                                        if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                      }
                                    }
                                    a = 0;
                                    u: {
                                      if (!((0 | (Pj = q[(Bj + 80) >> 2])) <= 0)) {
                                        for (Cj = q[(628 + Hj) >> 2]; ; ) {
                                          if (63 < ia((Cj + (a << 6)) | 0) >>> 0) break h;
                                          if ((0 | Pj) == (0 | (a = (a + 1) | 0))) break;
                                        }
                                        if (!(((a = 0) | (Pj = q[(Bj + 80) >> 2])) <= 0)) {
                                          for (
                                            Jj = q[(Bj + 48) >> 2], Ej = q[(632 + Hj) >> 2];
                                            ;

                                          ) {
                                            if (
                                              ((0 | (Cj = q[(Ej + (a << 2)) >> 2])) < 0) |
                                              ((0 | Jj) <= (0 | Cj))
                                            )
                                              break h;
                                            if ((0 | Pj) == (0 | (a = (a + 1) | 0))) break;
                                          }
                                          for (
                                            Uj = q[(Bj + 88) >> 2],
                                              Jj = q[(640 + Hj) >> 2],
                                              Ej = q[(636 + Hj) >> 2],
                                              a = 0;
                                            ;

                                          ) {
                                            if ((Dj = q[((Cj = a << 2) + Jj) >> 2])) {
                                              if (((0 | Dj) < 0) | ((0 | Uj) < (0 | Dj))) break h;
                                              if (
                                                ((0 | (Cj = q[(Cj + Ej) >> 2])) < 0) |
                                                ((0 | Uj) <= (0 | Cj))
                                              )
                                                break h;
                                              if (
                                                ((Cj = (Cj + Dj) | 0) >>> 31) |
                                                ((0 | Uj) < (0 | Cj))
                                              )
                                                break h;
                                            }
                                            if ((0 | Pj) == (0 | (a = (a + 1) | 0))) break;
                                          }
                                          for (
                                            Sj = q[Vj >> 2], Mj = q[(644 + Hj) >> 2], a = 0;
                                            ;

                                          ) {
                                            if (
                                              ((0 | (Cj = q[(Mj + (a << 2)) >> 2])) < 0) |
                                              ((0 | Sj) <= (0 | Cj))
                                            )
                                              break h;
                                            if ((0 | Pj) == (0 | (a = (a + 1) | 0))) break;
                                          }
                                          for (Ij = q[(648 + Hj) >> 2], a = 0; ; ) {
                                            if (
                                              ((0 | (Cj = q[(Ij + (a << 2)) >> 2])) < 0) |
                                              ((0 | Sj) <= (0 | Cj))
                                            )
                                              break h;
                                            if ((0 | Pj) == (0 | (a = (a + 1) | 0))) break;
                                          }
                                          for (
                                            Jj = q[(Bj + 84) >> 2],
                                              Rj = q[(656 + Hj) >> 2],
                                              Vj = q[(652 + Hj) >> 2],
                                              a = 0;
                                            ;

                                          ) {
                                            if ((Ej = q[((Cj = a << 2) + Rj) >> 2])) {
                                              if (((0 | Ej) < 0) | ((0 | Jj) < (0 | Ej))) break h;
                                              if (
                                                ((0 | (Cj = q[(Cj + Vj) >> 2])) < 0) |
                                                ((0 | Jj) <= (0 | Cj))
                                              )
                                                break h;
                                              if (
                                                ((Cj = (Cj + Ej) | 0) >>> 31) |
                                                ((0 | Jj) < (0 | Cj))
                                              )
                                                break h;
                                            }
                                            if ((0 | Pj) == (0 | (a = (a + 1) | 0))) break;
                                          }
                                          for (
                                            Fj = q[(664 + Hj) >> 2],
                                              Qj = q[(272 + Hj) >> 2],
                                              Nj = 0;
                                            ;

                                          ) {
                                            if (0 < (0 | (Dj = q[((a = Nj << 2) + Rj) >> 2])))
                                              for (
                                                Lj = (Fj + (q[(a + Vj) >> 2] << 1)) | 0,
                                                  Jj = q[(Qj + (q[(a + Ij) >> 2] << 2)) >> 2],
                                                  Ej = q[(Qj + (q[(a + Mj) >> 2] << 2)) >> 2],
                                                  a = 0;
                                                ;

                                              ) {
                                                if (
                                                  ((0 | Jj) <= s[(Lj + (2 | (Cj = a << 1))) >> 1]) |
                                                  ((0 | Ej) <= s[(Cj + Lj) >> 1])
                                                )
                                                  break h;
                                                if (!((0 | (a = (a + 2) | 0)) < (0 | Dj))) break;
                                              }
                                            if ((0 | (Nj = (Nj + 1) | 0)) == (0 | Pj)) break;
                                          }
                                          break u;
                                        }
                                      }
                                      ((Sj = q[(Bj + 16) >> 2]), (Uj = q[(Bj + 88) >> 2]));
                                    }
                                    if (!((255 & Oj) >>> 0 < 2)) {
                                      if ((a = 0) < (0 | (Fj = q[(Bj + 8) >> 2])))
                                        for (Cj = q[(184 + Hj) >> 2]; ; ) {
                                          if (1 < t[(Cj + (a << 2)) >> 2]) break h;
                                          if ((0 | Fj) == (0 | (a = (a + 1) | 0))) break;
                                        }
                                      if (!((255 & Oj) >>> 0 < 4)) {
                                        if (
                                          ((Lj = q[(Bj + 56) >> 2]),
                                          1 <= (0 | (Qj = q[(Bj + 20) >> 2])))
                                        )
                                          for (
                                            Jj = q[(352 + Hj) >> 2], Ej = q[(348 + Hj) >> 2], a = 0;
                                            ;

                                          ) {
                                            if ((Dj = q[((Cj = a << 2) + Jj) >> 2])) {
                                              if (((0 | Dj) < 0) | ((0 | Lj) < (0 | Dj))) break h;
                                              if (
                                                ((0 | (Cj = q[(Cj + Ej) >> 2])) < 0) |
                                                ((0 | Lj) <= (0 | Cj))
                                              )
                                                break h;
                                              if (
                                                ((Cj = (Cj + Dj) | 0) >>> 31) |
                                                ((0 | Lj) < (0 | Cj))
                                              )
                                                break h;
                                            }
                                            if ((0 | Qj) == (0 | (a = (a + 1) | 0))) break;
                                          }
                                        if ((0 | (Rj = q[(Bj + 92) >> 2])) != q[(Bj + 96) >> 2])
                                          break h;
                                        if (1 <= (0 | Fj))
                                          for (
                                            Ej = q[(168 + Hj) >> 2],
                                              Ij = 0,
                                              Cj = q[(164 + Hj) >> 2];
                                            ;

                                          ) {
                                            if ((Jj = q[((a = Ij << 2) + Cj) >> 2])) {
                                              if (((0 | Jj) < 0) | ((0 | Rj) < (0 | Jj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                                ((0 | Rj) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((a = (a + Jj) | 0) >>> 31) |
                                                ((0 | Rj) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Fj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                          }
                                        if (1 <= (0 | (Dj = q[(Bj + 12) >> 2])))
                                          for (
                                            Ej = q[(200 + Hj) >> 2],
                                              Ij = 0,
                                              Cj = q[(196 + Hj) >> 2];
                                            ;

                                          ) {
                                            if ((Jj = q[((a = Ij << 2) + Cj) >> 2])) {
                                              if (((0 | Jj) < 0) | ((0 | Rj) < (0 | Jj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                                ((0 | Rj) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((a = (a + Jj) | 0) >>> 31) |
                                                ((0 | Rj) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Dj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                          }
                                        if (1 <= (0 | Sj))
                                          for (
                                            Ej = q[(240 + Hj) >> 2],
                                              Ij = 0,
                                              Cj = q[(236 + Hj) >> 2];
                                            ;

                                          ) {
                                            if ((Jj = q[((a = Ij << 2) + Cj) >> 2])) {
                                              if (((0 | Jj) < 0) | ((0 | Rj) < (0 | Jj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                                ((0 | Rj) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((a = (a + Jj) | 0) >>> 31) |
                                                ((0 | Rj) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Sj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                          }
                                        if ((Ij = 0) < (0 | Qj)) {
                                          for (a = q[(324 + Hj) >> 2]; ; ) {
                                            if (1 < t[(a + (Ij << 2)) >> 2]) break h;
                                            if ((0 | Qj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                          }
                                          for (
                                            Mj = q[(Bj + 100) >> 2],
                                              Ej = q[(340 + Hj) >> 2],
                                              Cj = q[(336 + Hj) >> 2],
                                              Ij = 0;
                                            ;

                                          ) {
                                            if ((Jj = q[((a = Ij << 2) + Ej) >> 2])) {
                                              if (((0 | Jj) < 0) | ((0 | Mj) < (0 | Jj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                                ((0 | Mj) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((a = (a + Jj) | 0) >>> 31) |
                                                ((0 | Mj) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Qj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                          }
                                        } else Mj = q[(Bj + 100) >> 2];
                                        if (1 <= (0 | Mj)) {
                                          for (
                                            Jj = q[(464 + Hj) >> 2],
                                              Ij = 0,
                                              Cj = q[(460 + Hj) >> 2];
                                            ;

                                          ) {
                                            if ((Ej = q[((a = Ij << 2) + Jj) >> 2])) {
                                              if (((0 | Ej) < 0) | ((0 | Lj) < (0 | Ej))) break h;
                                              if (
                                                ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                                ((0 | Lj) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((a = (a + Ej) | 0) >>> 31) |
                                                ((0 | Lj) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Mj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                          }
                                          for (Ej = q[(468 + Hj) >> 2], Ij = 0; ; ) {
                                            if (
                                              ((0 | (a = q[((Cj = Ij << 2) + Ej) >> 2])) < 0) |
                                              ((0 | a) >= q[(Cj + Jj) >> 2])
                                            )
                                              break h;
                                            if ((0 | Mj) == (0 | (Ij = (Ij + 1) | 0))) break;
                                          }
                                        }
                                        if ((Kj = 0) < (0 | (Ij = q[(Bj + 104) >> 2]))) {
                                          for (Cj = q[(472 + Hj) >> 2]; ; ) {
                                            if (
                                              ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < 0) |
                                              ((0 | Mj) <= (0 | a))
                                            )
                                              break h;
                                            if ((0 | Ij) == (0 | (Kj = (Kj + 1) | 0))) break;
                                          }
                                          for (
                                            Nj = q[(Bj + 116) >> 2],
                                              Ej = q[(488 + Hj) >> 2],
                                              Cj = q[(484 + Hj) >> 2],
                                              Mj = 0;
                                            ;

                                          ) {
                                            if ((Jj = q[((a = Mj << 2) + Ej) >> 2])) {
                                              if (((0 | Jj) < 0) | ((0 | Nj) < (0 | Jj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                                ((0 | Nj) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((a = (a + Jj) | 0) >>> 31) |
                                                ((0 | Nj) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Ij) == (0 | (Mj = (Mj + 1) | 0))) break;
                                          }
                                        } else Nj = q[(Bj + 116) >> 2];
                                        if ((Mj = 0) < (0 | (Lj = q[(Bj + 108) >> 2]))) {
                                          for (Cj = q[(504 + Hj) >> 2]; ; ) {
                                            if (
                                              ((0 | (a = q[(Cj + (Mj << 2)) >> 2])) < 0) |
                                              ((0 | Fj) <= (0 | a))
                                            )
                                              break h;
                                            if ((0 | Lj) == (0 | (Mj = (Mj + 1) | 0))) break;
                                          }
                                          for (
                                            Cj = q[(512 + Hj) >> 2],
                                              Ej = q[(508 + Hj) >> 2],
                                              Mj = 0;
                                            ;

                                          ) {
                                            if ((Jj = q[((a = Mj << 2) + Cj) >> 2])) {
                                              if (((0 | Jj) < 0) | ((0 | Ij) < (0 | Jj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                                ((0 | Ij) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((a = (a + Jj) | 0) >>> 31) |
                                                ((0 | Ij) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Lj) == (0 | (Mj = (Mj + 1) | 0))) break;
                                          }
                                          for (
                                            Fj = q[Gj >> 2],
                                              Mj = q[(480 + Hj) >> 2],
                                              Vj = q[(476 + Hj) >> 2],
                                              Jj = 0;
                                            ;

                                          ) {
                                            if (
                                              ((a = q[(Ej + (Jj << 2)) >> 2] << 2),
                                              (Cj = q[(a + Mj) >> 2]))
                                            ) {
                                              if (((0 | Cj) < 0) | ((0 | Fj) < (0 | Cj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Vj) >> 2])) < 0) |
                                                ((0 | Fj) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((0 | (a = (a + Cj) | 0)) < 0) |
                                                ((0 | Fj) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Lj) == (0 | (Jj = (Jj + 1) | 0))) break;
                                          }
                                        } else
                                          ((Mj = q[(480 + Hj) >> 2]), (Vj = q[(476 + Hj) >> 2]));
                                        if ((Kj = 0) < (0 | (Fj = q[(Bj + 112) >> 2]))) {
                                          for (Cj = q[(528 + Hj) >> 2]; ; ) {
                                            if (
                                              ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < 0) |
                                              ((0 | Sj) <= (0 | a))
                                            )
                                              break h;
                                            if ((0 | Fj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                          }
                                          for (
                                            Cj = q[(536 + Hj) >> 2],
                                              Ej = q[(532 + Hj) >> 2],
                                              Kj = 0;
                                            ;

                                          ) {
                                            if ((Jj = q[((a = Kj << 2) + Cj) >> 2])) {
                                              if (((0 | Jj) < 0) | ((0 | Ij) < (0 | Jj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                                ((0 | Ij) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((a = (a + Jj) | 0) >>> 31) |
                                                ((0 | Ij) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Fj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                          }
                                          for (Jj = q[Wj >> 2], Kj = 0; ; ) {
                                            if (
                                              ((a = q[(Ej + (Kj << 2)) >> 2] << 2),
                                              (Cj = q[(a + Mj) >> 2]))
                                            ) {
                                              if (((0 | Cj) < 0) | ((0 | Jj) < (0 | Cj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Vj) >> 2])) < 0) |
                                                ((0 | Jj) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((0 | (a = (a + Cj) | 0)) < 0) |
                                                ((0 | Jj) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Fj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                          }
                                        }
                                        if (((Kj = 0), (Lj = q[(Bj + 120) >> 2]), 0 < (0 | Nj)))
                                          for (Cj = q[(552 + Hj) >> 2]; ; ) {
                                            if (
                                              ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < 0) |
                                              ((0 | Lj) <= (0 | a))
                                            )
                                              break h;
                                            if ((0 | (Kj = (Kj + 1) | 0)) == (0 | Nj)) break;
                                          }
                                        if ((Kj = 0) < (0 | Lj)) {
                                          for (Cj = q[(556 + Hj) >> 2]; ; ) {
                                            if (
                                              ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < -1) |
                                              ((0 | Qj) <= (0 | a))
                                            )
                                              break h;
                                            if ((0 | Lj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                          }
                                          for (
                                            Fj = q[(Bj + 124) >> 2],
                                              Ej = q[(564 + Hj) >> 2],
                                              Cj = q[(560 + Hj) >> 2],
                                              Nj = 0;
                                            ;

                                          ) {
                                            if ((Jj = q[((a = Nj << 2) + Ej) >> 2])) {
                                              if (((0 | Jj) < 0) | ((0 | Fj) < (0 | Jj))) break h;
                                              if (
                                                ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                                ((0 | Fj) <= (0 | a))
                                              )
                                                break h;
                                              if (
                                                ((a = (a + Jj) | 0) >>> 31) |
                                                ((0 | Fj) < (0 | a))
                                              )
                                                break h;
                                            }
                                            if ((0 | Lj) == (0 | (Nj = (Nj + 1) | 0))) break;
                                          }
                                        }
                                        if (!((255 & Oj) >>> 0 < 5)) {
                                          if ((Nj = 0) < (0 | (Ej = q[Gj >> 2]))) {
                                            for (Cj = q[(372 + Hj) >> 2]; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Nj << 2)) >> 2])) < 0) |
                                                ((0 | Rj) < (0 | a))
                                              )
                                                break h;
                                              if ((0 | Ej) == (0 | (Nj = (Nj + 1) | 0))) break;
                                            }
                                            for (Cj = q[(376 + Hj) >> 2], Nj = 0; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Nj << 2)) >> 2])) < 0) |
                                                ((0 | Rj) < (0 | a))
                                              )
                                                break h;
                                              if ((0 | Ej) == (0 | (Nj = (Nj + 1) | 0))) break;
                                            }
                                          }
                                          if ((Kj = 0) < (0 | (Qj = q[Tj >> 2]))) {
                                            for (Cj = q[(408 + Hj) >> 2]; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < 0) |
                                                ((0 | Rj) < (0 | a))
                                              )
                                                break h;
                                              if ((0 | Qj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                            for (Cj = q[(412 + Hj) >> 2], Kj = 0; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < 0) |
                                                ((0 | Rj) < (0 | a))
                                              )
                                                break h;
                                              if ((0 | Qj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                          }
                                          if ((Kj = 0) < (0 | (Ej = q[Wj >> 2]))) {
                                            for (Cj = q[(428 + Hj) >> 2]; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < 0) |
                                                ((0 | Rj) < (0 | a))
                                              )
                                                break h;
                                              if ((0 | Ej) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                            for (Cj = q[(432 + Hj) >> 2], Kj = 0; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < 0) |
                                                ((0 | Rj) < (0 | a))
                                              )
                                                break h;
                                              if ((0 | Ej) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                          }
                                          if (
                                            ((Kj = 0),
                                            (Lj = q[Bj >> 2]),
                                            0 < (0 | (Fj = q[(Bj + 128) >> 2])))
                                          ) {
                                            for (Cj = q[(492 + Hj) >> 2]; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < 0) |
                                                ((0 | Lj) <= (0 | a))
                                              )
                                                break h;
                                              if ((0 | Fj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                            for (
                                              Cj = q[(500 + Hj) >> 2],
                                                Ej = q[(496 + Hj) >> 2],
                                                Kj = 0;
                                              ;

                                            ) {
                                              if ((Jj = q[((a = Kj << 2) + Cj) >> 2])) {
                                                if (((0 | Jj) < 0) | ((0 | Ij) < (0 | Jj))) break h;
                                                if (
                                                  ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                                  ((0 | Ij) <= (0 | a))
                                                )
                                                  break h;
                                                if (
                                                  ((a = (a + Jj) | 0) >>> 31) |
                                                  ((0 | Ij) < (0 | a))
                                                )
                                                  break h;
                                              }
                                              if ((0 | Fj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                            for (Jj = q[Zj >> 2], Kj = 0; ; ) {
                                              if (
                                                ((a = q[(Ej + (Kj << 2)) >> 2] << 2),
                                                (Cj = q[(a + Mj) >> 2]))
                                              ) {
                                                if (((0 | Cj) < 0) | ((0 | Jj) < (0 | Cj))) break h;
                                                if (
                                                  ((0 | (a = q[(a + Vj) >> 2])) < 0) |
                                                  ((0 | Jj) <= (0 | a))
                                                )
                                                  break h;
                                                if (
                                                  ((0 | (a = (a + Cj) | 0)) < 0) |
                                                  ((0 | Jj) < (0 | a))
                                                )
                                                  break h;
                                              }
                                              if ((0 | Fj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                          }
                                          if ((Kj = 0) < (0 | (Fj = q[(Bj + 132) >> 2]))) {
                                            for (Cj = q[(516 + Hj) >> 2]; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Kj << 2)) >> 2])) < 0) |
                                                ((0 | Dj) <= (0 | a))
                                              )
                                                break h;
                                              if ((0 | Fj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                            for (
                                              Cj = q[(524 + Hj) >> 2],
                                                Ej = q[(520 + Hj) >> 2],
                                                Kj = 0;
                                              ;

                                            ) {
                                              if ((Jj = q[((a = Kj << 2) + Cj) >> 2])) {
                                                if (((0 | Jj) < 0) | ((0 | Ij) < (0 | Jj))) break h;
                                                if (
                                                  ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                                  ((0 | Ij) <= (0 | a))
                                                )
                                                  break h;
                                                if (
                                                  ((a = (a + Jj) | 0) >>> 31) |
                                                  ((0 | Ij) < (0 | a))
                                                )
                                                  break h;
                                              }
                                              if ((0 | Fj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                            for (Kj = 0; ; ) {
                                              if (
                                                ((a = q[(Ej + (Kj << 2)) >> 2] << 2),
                                                (Cj = q[(a + Mj) >> 2]))
                                              ) {
                                                if (((0 | Cj) < 0) | ((0 | Qj) < (0 | Cj))) break h;
                                                if (
                                                  ((0 | (a = q[(a + Vj) >> 2])) < 0) |
                                                  ((0 | Qj) <= (0 | a))
                                                )
                                                  break h;
                                                if (
                                                  ((0 | (a = (a + Cj) | 0)) < 0) |
                                                  ((0 | Qj) < (0 | a))
                                                )
                                                  break h;
                                              }
                                              if ((0 | Fj) == (0 | (Kj = (Kj + 1) | 0))) break;
                                            }
                                          }
                                          if ((Nj = 0) < (0 | (Dj = q[(Bj + 136) >> 2]))) {
                                            for (Cj = q[(540 + Hj) >> 2]; ; ) {
                                              if (
                                                ((0 | (a = q[(Cj + (Nj << 2)) >> 2])) < 0) |
                                                ((0 | Pj) <= (0 | a))
                                              )
                                                break h;
                                              if ((0 | Dj) == (0 | (Nj = (Nj + 1) | 0))) break;
                                            }
                                            for (
                                              Cj = q[(548 + Hj) >> 2],
                                                Ej = q[(544 + Hj) >> 2],
                                                Pj = 0;
                                              ;

                                            ) {
                                              if ((Jj = q[((a = Pj << 2) + Cj) >> 2])) {
                                                if (((0 | Jj) < 0) | ((0 | Ij) < (0 | Jj))) break h;
                                                if (
                                                  ((0 | (a = q[(a + Ej) >> 2])) < 0) |
                                                  ((0 | Ij) <= (0 | a))
                                                )
                                                  break h;
                                                if (
                                                  ((a = (a + Jj) | 0) >>> 31) |
                                                  ((0 | Ij) < (0 | a))
                                                )
                                                  break h;
                                              }
                                              if ((0 | Dj) == (0 | (Pj = (Pj + 1) | 0))) break;
                                            }
                                            for (Pj = 0; ; ) {
                                              if (
                                                ((a = q[(Ej + (Pj << 2)) >> 2] << 2),
                                                (Cj = q[(a + Mj) >> 2]))
                                              ) {
                                                if (((0 | Cj) < 0) | ((0 | Uj) < (0 | Cj))) break h;
                                                if (
                                                  ((0 | (a = q[(a + Vj) >> 2])) < 0) |
                                                  ((0 | Uj) <= (0 | a))
                                                )
                                                  break h;
                                                if (
                                                  ((0 | (a = (a + Cj) | 0)) < 0) |
                                                  ((0 | Uj) < (0 | a))
                                                )
                                                  break h;
                                              }
                                              if ((0 | Dj) == (0 | (Pj = (Pj + 1) | 0))) break;
                                            }
                                          }
                                          if (!((255 & Oj) >>> 0 < 6)) {
                                            if (
                                              ((Oj = 0),
                                              (Fj = q[(Bj + 140) >> 2]),
                                              (Ej = q[(116 + Hj) >> 2]),
                                              0 < (0 | Lj))
                                            )
                                              for (;;) {
                                                if (
                                                  ((0 | (a = q[(Ej + (Oj << 2)) >> 2])) < -1) |
                                                  ((0 | Fj) <= (0 | a))
                                                )
                                                  break h;
                                                if ((0 | Lj) == (0 | (Oj = (Oj + 1) | 0))) break;
                                              }
                                            if ((Oj = 0) < (0 | Sj))
                                              for (Cj = q[(268 + Hj) >> 2]; ; ) {
                                                if (
                                                  (17 <
                                                    (254 & (a = q[(Cj + (Oj << 2)) >> 2])) >>> 0) |
                                                  (1280 <= (65280 & a) >>> 0)
                                                )
                                                  break h;
                                                if ((0 | (Oj = (Oj + 1) | 0)) == (0 | Sj)) break;
                                              }
                                            if (1 <= (0 | Fj)) {
                                              for (a = q[(700 + Hj) >> 2], Sj = 0; ; ) {
                                                if (
                                                  ((0 | (Cj = q[(a + (Sj << 2)) >> 2])) < 0) |
                                                  ((0 | Lj) <= (0 | Cj)) |
                                                  (q[(Ej + (Cj << 2)) >> 2] != (0 | Sj))
                                                )
                                                  break h;
                                                if ((0 | Fj) == (0 | (Sj = (Sj + 1) | 0))) break;
                                              }
                                              for (Cj = q[(708 + Hj) >> 2], Sj = 0; ; ) {
                                                if (
                                                  (17 <
                                                    (254 & (a = q[(Cj + (Sj << 2)) >> 2])) >>> 0) |
                                                  (1280 <= (65280 & a) >>> 0)
                                                )
                                                  break h;
                                                if ((0 | Fj) == (0 | (Sj = (Sj + 1) | 0))) break;
                                              }
                                              for (
                                                Dj = q[Xj >> 2],
                                                  Ej = q[(716 + Hj) >> 2],
                                                  Cj = q[(712 + Hj) >> 2],
                                                  Sj = 0;
                                                ;

                                              ) {
                                                if ((Jj = q[((a = Sj << 2) + Ej) >> 2])) {
                                                  if (((0 | Jj) < 0) | ((0 | Dj) < (0 | Jj)))
                                                    break h;
                                                  if (
                                                    ((0 | (a = q[(a + Cj) >> 2])) < 0) |
                                                    ((0 | Dj) <= (0 | a))
                                                  )
                                                    break h;
                                                  if (
                                                    ((a = (a + Jj) | 0) >>> 31) |
                                                    ((0 | Dj) < (0 | a))
                                                  )
                                                    break h;
                                                }
                                                if ((0 | Fj) == (0 | (Sj = (Sj + 1) | 0))) break;
                                              }
                                            }
                                            if (
                                              ((Oj = 0),
                                              (Lj = q[(Bj + 144) >> 2]),
                                              0 < (0 | (Ej = q[(Bj + 24) >> 2])))
                                            )
                                              for (Cj = q[(360 + Hj) >> 2]; ; ) {
                                                if (
                                                  ((0 | (a = q[(Cj + (Oj << 2)) >> 2])) < -1) |
                                                  ((0 | Lj) <= (0 | a))
                                                )
                                                  break h;
                                                if ((0 | Ej) == (0 | (Oj = (Oj + 1) | 0))) break;
                                              }
                                            if ((Oj = 0) < (0 | Lj)) {
                                              for (Cj = q[(724 + Hj) >> 2]; ; ) {
                                                if (
                                                  ((0 | (a = q[(Cj + (Oj << 2)) >> 2])) < 0) |
                                                  ((0 | Rj) < (0 | a))
                                                )
                                                  break h;
                                                if ((0 | Lj) == (0 | (Oj = (Oj + 1) | 0))) break;
                                              }
                                              for (Cj = q[(728 + Hj) >> 2], Oj = 0; ; ) {
                                                if (
                                                  ((0 | (a = q[(Cj + (Oj << 2)) >> 2])) < 0) |
                                                  ((0 | Rj) < (0 | a))
                                                )
                                                  break h;
                                                if ((0 | Lj) == (0 | (Oj = (Oj + 1) | 0))) break;
                                              }
                                            }
                                            if (((a = 0) | (Dj = q[(Bj + 148) >> 2])) <= 0)
                                              return ((L = Yj), 1);
                                            for (Cj = q[(732 + Hj) >> 2]; ; ) {
                                              if (
                                                ((0 | (Bj = q[(Cj + (a << 2)) >> 2])) < 0) |
                                                ((0 | Fj) <= (0 | Bj))
                                              )
                                                break h;
                                              if ((0 | Dj) == (0 | (a = (a + 1) | 0))) break;
                                            }
                                            for (
                                              Cj = q[(740 + Hj) >> 2],
                                                Ej = q[(736 + Hj) >> 2],
                                                a = 0;
                                              ;

                                            ) {
                                              if ((Jj = q[((Bj = a << 2) + Cj) >> 2])) {
                                                if (((0 | Jj) < 0) | ((0 | Ij) < (0 | Jj))) break h;
                                                if (
                                                  ((0 | (Bj = q[(Bj + Ej) >> 2])) < 0) |
                                                  ((0 | Ij) <= (0 | Bj))
                                                )
                                                  break h;
                                                if (
                                                  ((Bj = (Bj + Jj) | 0) >>> 31) |
                                                  ((0 | Ij) < (0 | Bj))
                                                )
                                                  break h;
                                              }
                                              if ((0 | Dj) == (0 | (a = (a + 1) | 0))) break;
                                            }
                                            for (a = 0; ; ) {
                                              if (
                                                ((Bj = q[(Ej + (a << 2)) >> 2] << 2),
                                                (Cj = q[(Bj + Mj) >> 2]))
                                              ) {
                                                if (((0 | Cj) < 0) | ((0 | Lj) < (0 | Cj))) break h;
                                                if (
                                                  ((0 | (Bj = q[(Bj + Vj) >> 2])) < 0) |
                                                  ((0 | Lj) <= (0 | Bj))
                                                )
                                                  break h;
                                                if (
                                                  ((0 | (Bj = (Bj + Cj) | 0)) < 0) |
                                                  ((0 | Lj) < (0 | Bj))
                                                )
                                                  break h;
                                              }
                                              if ((0 | Dj) == (0 | (a = (a + 1) | 0))) break;
                                            }
                                          }
                                        }
                                      }
                                    }
                                    return ((L = Yj), 1);
                                  }
                                  return (Y(4, 1846, 0), (L = Yj), 0);
                                }
                                Y(4, 1235, 0);
                              }
                              return ((L = Yj), 0);
                            })(a, Dh)
                          : ((q[(20 + Fh) >> 2] = 1621),
                            (q[(16 + Fh) >> 2] = 2352),
                            Y(4, 1294, (16 + Fh) | 0),
                            0)
                      : ((q[(4 + Fh) >> 2] = 1444), (q[Fh >> 2] = 2352), Y(4, 1294, Fh), 0)),
                    (L = (48 + Fh) | 0),
                    0 | a
                  );
                },
                j: function (a) {
                  q[1897] = a |= 0;
                },
                k: function (a, Dh) {
                  var Eh;
                  return (
                    (Dh |= 0),
                    (L = Eh = (L - 48) | 0),
                    (a = (a |= 0)
                      ? ((a + 63) & -64) != (0 | a)
                        ? ((q[(36 + Eh) >> 2] = 1522),
                          (q[(32 + Eh) >> 2] = 2373),
                          Y(4, 1294, (32 + Eh) | 0),
                          0)
                        : ((Dh + 63) & -64) == (0 | Dh) && Dh
                          ? (function (a, fj) {
                              var gj = 0,
                                hj = 0,
                                ij = 0,
                                jj = 0,
                                kj = 0,
                                lj = 0,
                                mj = 0,
                                nj = 0,
                                oj = 0,
                                pj = 0,
                                qj = 0;
                              ((q[(24 + (L = mj = (L - 32) | 0)) >> 2] = 0),
                                (q[(16 + mj) >> 2] = 6),
                                (q[(20 + mj) >> 2] = 0),
                                ab((16 + mj) | 0));
                              a: {
                                if (sa(a)) Y(4, 1932, 0);
                                else {
                                  if (!(7 <= (ij = r[(a + 4) | 0]) >>> 0)) {
                                    c: {
                                      if (6 != (0 | ij)) {
                                        if (fj >>> 0 < 1408) break c;
                                        ((jj = (a + 704) | 0), (gj = 708), (fj = 712));
                                      } else {
                                        if (fj >>> 0 < 2688) break c;
                                        ((jj = (a + 1984) | 0), (gj = 1988), (fj = 1992));
                                      }
                                      if (
                                        ((q[(a + 8) >> 2] = jj),
                                        (q[(a + 12) >> 2] = 0),
                                        (q[jj >> 2] = a),
                                        (q[(a + gj) >> 2] = a - -64),
                                        (q[(a + fj) >> 2] = jj),
                                        (fj = q[jj >> 2]),
                                        1 != (0 | !r[(fj + 5) | 0])
                                          ? (da((fj + 4) | 0, 1),
                                            X(
                                              q[(jj + 4) >> 2],
                                              4,
                                              r[(q[jj >> 2] + 4) | 0] < 6 ? 160 : 480
                                            ),
                                            (o[(q[jj >> 2] + 5) | 0] = 0),
                                            oa(jj, q[(lj = (jj + 8) | 0) >> 2]),
                                            xa(r[(q[jj >> 2] + 4) | 0], q[(jj + 8) >> 2]))
                                          : (oa(jj, q[(jj + 8) >> 2]), (lj = (jj + 8) | 0)),
                                        r[7592] ||
                                          ((q[1899] = 6),
                                          (o[7592] = 1),
                                          (q[1900] = 7),
                                          (q[1901] = 8),
                                          (q[1902] = 9)),
                                        (hj = q[lj >> 2]),
                                        (fj = q[(hj + 12) >> 2]),
                                        1 <= (0 | (ij = q[(fj + 16) >> 2])))
                                      ) {
                                        for (
                                          kj = q[(hj + 228) >> 2],
                                            qj = (kj + (ij << 2)) | 0,
                                            nj = q[(hj + 224) >> 2];
                                          ;

                                        ) {
                                          ((oj = (q[(hj + 524) >> 2] + (q[nj >> 2] << 2)) | 0),
                                            (fj = 0),
                                            (ij = q[kj >> 2]),
                                            (gj = (ij + -1) | 0));
                                          f: if (!((0 | gj) < 1))
                                            g: for (;;) {
                                              for (;;) {
                                                if (q[(pj = (oj + (fj << 2)) | 0) >> 2] <= -1) {
                                                  if (
                                                    (!(function (a, Bj, _j) {
                                                      var $j = 0,
                                                        ak = 0;
                                                      a: if ((0 | a) != (0 | Bj)) {
                                                        if (
                                                          !(
                                                            a >>> 0 < (Bj + _j) >>> 0 &&
                                                            Bj >>> 0 < (ak = (a + _j) | 0) >>> 0
                                                          )
                                                        )
                                                          return aa(a, Bj, _j);
                                                        if (
                                                          (($j = 3 & (a ^ Bj)), a >>> 0 < Bj >>> 0)
                                                        ) {
                                                          if (!$j) {
                                                            if (3 & a)
                                                              for (;;) {
                                                                if (!_j) break a;
                                                                if (
                                                                  ((o[0 | a] = r[0 | Bj]),
                                                                  (Bj = (Bj + 1) | 0),
                                                                  (_j = (_j + -1) | 0),
                                                                  !(3 & (a = (a + 1) | 0)))
                                                                )
                                                                  break;
                                                              }
                                                            if (!(_j >>> 0 <= 3)) {
                                                              for ($j = _j; ; )
                                                                if (
                                                                  ((q[a >> 2] = q[Bj >> 2]),
                                                                  (Bj = (Bj + 4) | 0),
                                                                  (a = (a + 4) | 0),
                                                                  !(3 < ($j = ($j + -4) | 0) >>> 0))
                                                                )
                                                                  break;
                                                              _j &= 3;
                                                            }
                                                          }
                                                          if (_j)
                                                            for (;;)
                                                              if (
                                                                ((o[0 | a] = r[0 | Bj]),
                                                                (a = (a + 1) | 0),
                                                                (Bj = (Bj + 1) | 0),
                                                                !(_j = (_j + -1) | 0))
                                                              )
                                                                break;
                                                        } else {
                                                          if (!$j) {
                                                            if (3 & ak)
                                                              for (;;) {
                                                                if (!_j) break a;
                                                                if (
                                                                  ((o[
                                                                    0 |
                                                                      ($j =
                                                                        ((_j = (_j + -1) | 0) + a) |
                                                                        0)
                                                                  ] = r[(Bj + _j) | 0]),
                                                                  !(3 & $j))
                                                                )
                                                                  break;
                                                              }
                                                            if (!(_j >>> 0 <= 3))
                                                              for (;;)
                                                                if (
                                                                  ((q[
                                                                    ((_j = (_j + -4) | 0) + a) >> 2
                                                                  ] = q[(Bj + _j) >> 2]),
                                                                  !(3 < _j >>> 0))
                                                                )
                                                                  break;
                                                          }
                                                          if (_j)
                                                            for (;;)
                                                              if (
                                                                ((o[
                                                                  ((_j = (_j + -1) | 0) + a) | 0
                                                                ] = r[(Bj + _j) | 0]),
                                                                !_j)
                                                              )
                                                                break;
                                                        }
                                                      }
                                                    })(pj, (pj + 4) | 0, ((-1 ^ fj) + ij) << 2),
                                                    (0 | fj) < (0 | (gj = ((ij = gj) + -1) | 0)))
                                                  )
                                                    continue g;
                                                  break f;
                                                }
                                                if (!((0 | (fj = (fj + 1) | 0)) < (0 | gj))) break;
                                              }
                                              break;
                                            }
                                          if (
                                            ((fj = kj),
                                            0 < (0 | ij) &&
                                              (ij = q[(oj + (gj << 2)) >> 2] < 0 ? gj : ij),
                                            (q[fj >> 2] = ij),
                                            (nj = (nj + 4) | 0),
                                            !((kj = (kj + 4) | 0) >>> 0 < qj >>> 0))
                                          )
                                            break;
                                        }
                                        ((hj = q[lj >> 2]), (fj = q[(hj + 12) >> 2]));
                                      }
                                      if (1 <= q[fj >> 2])
                                        for (gj = 0; ; )
                                          if (
                                            ((q[(q[(hj + 20) >> 2] + (gj << 2)) >> 2] =
                                              q[(hj + 24) >> 2] + (gj << 6)),
                                            (gj = (gj + 1) | 0),
                                            (fj = q[(hj + 12) >> 2]),
                                            !((0 | gj) < q[fj >> 2]))
                                          )
                                            break;
                                      if (1 <= q[(fj + 4) >> 2])
                                        for (gj = 0; ; )
                                          if (
                                            ((q[(q[(hj + 56) >> 2] + (gj << 2)) >> 2] =
                                              q[(hj + 60) >> 2] + (gj << 6)),
                                            (gj = (gj + 1) | 0),
                                            (fj = q[(hj + 12) >> 2]),
                                            !((0 | gj) < q[(fj + 4) >> 2]))
                                          )
                                            break;
                                      if (1 <= q[(fj + 16) >> 2])
                                        for (gj = 0; ; )
                                          if (
                                            ((q[((fj = gj << 2) + q[(hj + 144) >> 2]) >> 2] =
                                              q[(hj + 160) >> 2] + (gj << 6)),
                                            (q[(fj + q[(hj + 148) >> 2]) >> 2] =
                                              q[(hj + 516) >> 2] +
                                              (q[(fj + q[(hj + 212) >> 2]) >> 2] << 2)),
                                            (q[(fj + q[(hj + 152) >> 2]) >> 2] =
                                              q[(hj + 520) >> 2] +
                                              (q[(fj + q[(hj + 216) >> 2]) >> 2] << 1)),
                                            (q[(fj + q[(hj + 156) >> 2]) >> 2] =
                                              q[(hj + 524) >> 2] +
                                              (q[(fj + q[(hj + 224) >> 2]) >> 2] << 2)),
                                            (gj = (gj + 1) | 0),
                                            (fj = q[(hj + 12) >> 2]),
                                            !((0 | gj) < q[(fj + 16) >> 2]))
                                          )
                                            break;
                                      if (1 <= q[(fj + 20) >> 2])
                                        for (gj = 0; ; )
                                          if (
                                            ((q[(q[(hj + 232) >> 2] + (gj << 2)) >> 2] =
                                              q[(hj + 236) >> 2] + (gj << 6)),
                                            (gj = (gj + 1) | 0),
                                            (fj = q[(hj + 12) >> 2]),
                                            !((0 | gj) < q[(fj + 20) >> 2]))
                                          )
                                            break;
                                      if (1 <= q[(fj + 80) >> 2])
                                        for (gj = 0; ; )
                                          if (
                                            ((q[(q[(hj + 560) >> 2] + (gj << 2)) >> 2] =
                                              q[(hj + 564) >> 2] + (gj << 6)),
                                            (gj = (gj + 1) | 0),
                                            (fj = q[(hj + 12) >> 2]),
                                            !((0 | gj) < q[(fj + 80) >> 2]))
                                          )
                                            break;
                                      if (
                                        !((q[(fj + 140) >> 2] < 1) | (r[(q[jj >> 2] + 4) | 0] < 6))
                                      )
                                        for (fj = 0; ; )
                                          if (
                                            ((q[((ij = fj << 2) + q[(hj + 632) >> 2]) >> 2] =
                                              q[(hj + 524) >> 2] +
                                              (q[(ij + q[(hj + 648) >> 2]) >> 2] << 2)),
                                            !(
                                              (0 | (fj = (fj + 1) | 0)) <
                                              q[(q[(hj + 12) >> 2] + 140) >> 2]
                                            ))
                                          )
                                            break;
                                      if (1 & o[(q[(hj + 16) >> 2] + 20) | 0]) break a;
                                      if (
                                        ((ij = q[lj >> 2]),
                                        (0 | (hj = q[(q[(ij + 12) >> 2] + 16) >> 2])) < 1)
                                      )
                                        break a;
                                      for (
                                        jj = q[(ij + 220) >> 2],
                                          lj = q[(ij + 216) >> 2],
                                          nj = q[(ij + 520) >> 2],
                                          kj = 0;
                                        ;

                                      ) {
                                        if (
                                          0 <
                                          (0 | (oj = (q[((fj = kj << 2) + jj) >> 2] + -1) | 0))
                                        )
                                          for (pj = (nj + (q[(fj + lj) >> 2] << 1)) | 0, fj = 0; ; )
                                            if (
                                              ((qj = s[(gj = (pj + (fj << 1)) | 0) >> 1]),
                                              (p[gj >> 1] = s[(gj + 4) >> 1]),
                                              (p[(gj + 4) >> 1] = qj),
                                              !((0 | (fj = (fj + 3) | 0)) < (0 | oj)))
                                            )
                                              break;
                                        if ((0 | hj) == (0 | (kj = (kj + 1) | 0))) break;
                                      }
                                      for (
                                        kj = q[(ij + 208) >> 2],
                                          jj = q[(ij + 212) >> 2],
                                          ij = q[(ij + 516) >> 2],
                                          gj = 0;
                                        ;

                                      ) {
                                        if (1 <= (0 | (lj = q[((fj = gj << 2) + kj) >> 2])))
                                          for (
                                            fj = (ij + (q[(fj + jj) >> 2] << 2)) | 0,
                                              lj = (fj + (lj << 3)) | 0,
                                              fj = (fj + 4) | 0;
                                            ;

                                          )
                                            if (
                                              ((u[fj >> 2] = x(1) - u[fj >> 2]),
                                              !((fj = (fj + 8) | 0) >>> 0 < lj >>> 0))
                                            )
                                              break;
                                        if ((0 | hj) == (0 | (gj = (gj + 1) | 0))) break;
                                      }
                                      break a;
                                    }
                                    Y(4, 2150, (a = 0));
                                    break a;
                                  }
                                  ((q[(4 + mj) >> 2] = ij), (q[mj >> 2] = 6), Y(4, 2023, mj));
                                }
                                a = 0;
                              }
                              return ((L = (32 + mj) | 0), a);
                            })(a, Dh)
                          : ((q[(20 + Eh) >> 2] = 1621),
                            (q[(16 + Eh) >> 2] = 2373),
                            Y(4, 1294, (16 + Eh) | 0),
                            0)
                      : ((q[(4 + Eh) >> 2] = 1444), (q[Eh >> 2] = 2373), Y(4, 1294, Eh), 0)),
                    (L = (48 + Eh) | 0),
                    0 | a
                  );
                },
                l: function (a, Dh, Eh, Fh) {
                  var Gh;
                  ((Dh |= 0),
                    (Eh |= 0),
                    (Fh |= 0),
                    (L = Gh = (L + -64) | 0),
                    (a |= 0)
                      ? Dh
                        ? Eh
                          ? Fh
                            ? ((a = q[(q[(q[a >> 2] + 8) >> 2] + 16) >> 2]),
                              (q[Dh >> 2] = q[(a + 12) >> 2]),
                              (q[(Dh + 4) >> 2] = q[(a + 16) >> 2]),
                              (q[Eh >> 2] = q[(a + 4) >> 2]),
                              (q[(Eh + 4) >> 2] = q[(a + 8) >> 2]),
                              (q[Fh >> 2] = q[a >> 2]))
                            : ((q[(52 + Gh) >> 2] = 1995),
                              (q[(48 + Gh) >> 2] = 2393),
                              Y(4, 1294, (48 + Gh) | 0))
                          : ((q[(36 + Gh) >> 2] = 1903),
                            (q[(32 + Gh) >> 2] = 2393),
                            Y(4, 1294, (32 + Gh) | 0))
                        : ((q[(20 + Gh) >> 2] = 1819),
                          (q[(16 + Gh) >> 2] = 2393),
                          Y(4, 1294, (16 + Gh) | 0))
                      : ((q[(4 + Gh) >> 2] = 1740), (q[Gh >> 2] = 2393), Y(4, 1294, Gh)),
                    (L = (Gh + 64) | 0));
                },
                m: wa,
                n: va,
                o: function (a) {
                  var Ch;
                  ((L = Ch = (L - 16) | 0),
                    (a |= 0)
                      ? Oa(a)
                      : ((q[(4 + Ch) >> 2] = 1740), (q[Ch >> 2] = 2455), Y(4, 1294, Ch)),
                    (L = (16 + Ch) | 0));
                },
                p: function (a) {
                  var Bh;
                  return (
                    (L = Bh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 756) >> 2]
                      : ((q[(4 + Bh) >> 2] = 1740), (q[Bh >> 2] = 2470), Y(4, 1294, Bh), 0)),
                    (L = (16 + Bh) | 0),
                    0 | a
                  );
                },
                q: function (a) {
                  var Ah;
                  return (
                    (L = Ah = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 644) >> 2]
                      : ((q[(4 + Ah) >> 2] = 1740), (q[Ah >> 2] = 2489), Y(4, 1294, Ah), -1)),
                    (L = (16 + Ah) | 0),
                    0 | a
                  );
                },
                r: function (a) {
                  var zh;
                  return (
                    (L = zh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 232) >> 2]
                      : ((q[(4 + zh) >> 2] = 1740), (q[zh >> 2] = 2510), Y(4, 1294, zh), 0)),
                    (L = (16 + zh) | 0),
                    0 | a
                  );
                },
                s: function (a) {
                  var yh;
                  return (
                    (L = yh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 652) >> 2]
                      : ((q[(4 + yh) >> 2] = 1740), (q[yh >> 2] = 2529), Y(4, 1294, yh), 0)),
                    (L = (16 + yh) | 0),
                    0 | a
                  );
                },
                t: function (a) {
                  var xh;
                  return (
                    (L = xh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 244) >> 2]
                      : ((q[(4 + xh) >> 2] = 1740), (q[xh >> 2] = 2550), Y(4, 1294, xh), 0)),
                    (L = (16 + xh) | 0),
                    0 | a
                  );
                },
                u: function (a) {
                  var wh;
                  return (
                    (L = wh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 240) >> 2]
                      : ((q[(4 + wh) >> 2] = 1740), (q[wh >> 2] = 2579), Y(4, 1294, wh), 0)),
                    (L = (16 + wh) | 0),
                    0 | a
                  );
                },
                v: function (a) {
                  var vh;
                  return (
                    (L = vh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 248) >> 2]
                      : ((q[(4 + vh) >> 2] = 1740), (q[vh >> 2] = 2608), Y(4, 1294, vh), 0)),
                    (L = (16 + vh) | 0),
                    0 | a
                  );
                },
                w: function (a) {
                  var uh;
                  return (
                    (L = uh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 656) >> 2]
                      : ((q[(4 + uh) >> 2] = 1740), (q[uh >> 2] = 2637), Y(4, 1294, uh), 0)),
                    (L = (16 + uh) | 0),
                    0 | a
                  );
                },
                x: function (a) {
                  var th;
                  return (
                    (L = th = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 252) >> 2]
                      : ((q[(4 + th) >> 2] = 1740), (q[th >> 2] = 2659), Y(4, 1294, th), 0)),
                    (L = (16 + th) | 0),
                    0 | a
                  );
                },
                y: function (a) {
                  var sh;
                  return (
                    (L = sh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 4) >> 2]
                      : ((q[(4 + sh) >> 2] = 1740), (q[sh >> 2] = 2682), Y(4, 1294, sh), -1)),
                    (L = (16 + sh) | 0),
                    0 | a
                  );
                },
                z: function (a) {
                  var rh;
                  return (
                    (L = rh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 20) >> 2]
                      : ((q[(4 + rh) >> 2] = 1740), (q[rh >> 2] = 2698), Y(4, 1294, rh), 0)),
                    (L = (16 + rh) | 0),
                    0 | a
                  );
                },
                A: function (a) {
                  var qh;
                  return (
                    (L = qh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 52) >> 2]
                      : ((q[(4 + qh) >> 2] = 1740), (q[qh >> 2] = 2712), Y(4, 1294, qh), 0)),
                    (L = (16 + qh) | 0),
                    0 | a
                  );
                },
                B: function (a) {
                  var ph;
                  return (
                    (L = ph = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 48) >> 2]
                      : ((q[(4 + ph) >> 2] = 1740), (q[ph >> 2] = 2732), Y(4, 1294, ph), 0)),
                    (L = (16 + ph) | 0),
                    0 | a
                  );
                },
                C: function (a) {
                  var oh;
                  return (
                    (L = oh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 56) >> 2]
                      : ((q[(4 + oh) >> 2] = 1740), (q[oh >> 2] = 2760), Y(4, 1294, oh), 0)),
                    (L = (16 + oh) | 0),
                    0 | a
                  );
                },
                D: function (a) {
                  var nh;
                  return (
                    (L = nh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 336) >> 2]
                      : ((q[(4 + nh) >> 2] = 1740), (q[nh >> 2] = 2787), Y(4, 1294, nh), -1)),
                    (L = (16 + nh) | 0),
                    0 | a
                  );
                },
                E: function (a) {
                  var mh;
                  return (
                    (L = mh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 144) >> 2]
                      : ((q[(4 + mh) >> 2] = 1740), (q[mh >> 2] = 2807), Y(4, 1294, mh), 0)),
                    (L = (16 + mh) | 0),
                    0 | a
                  );
                },
                F: function (a) {
                  var lh;
                  return (
                    (L = lh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 200) >> 2]
                      : ((q[(4 + lh) >> 2] = 1740), (q[lh >> 2] = 2825), Y(4, 1294, lh), 0)),
                    (L = (16 + lh) | 0),
                    0 | a
                  );
                },
                G: function (a) {
                  var kh;
                  return (
                    (L = kh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 436) >> 2]
                      : ((q[(4 + kh) >> 2] = 1740), (q[kh >> 2] = 2853), Y(4, 1294, kh), 0)),
                    (L = (16 + kh) | 0),
                    0 | a
                  );
                },
                H: function (a) {
                  var jh;
                  return (
                    (L = jh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 440) >> 2]
                      : ((q[(4 + jh) >> 2] = 1740), (q[jh >> 2] = 2880), Y(4, 1294, jh), 0)),
                    (L = (16 + jh) | 0),
                    0 | a
                  );
                },
                I: function (a) {
                  var ih;
                  return (
                    (L = ih = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 196) >> 2]
                      : ((q[(4 + ih) >> 2] = 1740), (q[ih >> 2] = 2905), Y(4, 1294, ih), 0)),
                    (L = (16 + ih) | 0),
                    0 | a
                  );
                },
                J: function (a) {
                  var hh;
                  return (
                    (L = hh = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 444) >> 2]
                      : ((q[(4 + hh) >> 2] = 1740), (q[hh >> 2] = 2934), Y(4, 1294, hh), 0)),
                    (L = (16 + hh) | 0),
                    0 | a
                  );
                },
                K: function (a) {
                  var Tg;
                  return (
                    (L = Tg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 452) >> 2]
                      : ((q[(4 + Tg) >> 2] = 1740), (q[Tg >> 2] = 2959), Y(4, 1294, Tg), 0)),
                    (L = (16 + Tg) | 0),
                    0 | a
                  );
                },
                L: function (a) {
                  var Sg;
                  return (
                    (L = Sg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 228) >> 2]
                      : ((q[(4 + Sg) >> 2] = 1740), (q[Sg >> 2] = 2983), Y(4, 1294, Sg), 0)),
                    (L = (16 + Sg) | 0),
                    0 | a
                  );
                },
                M: function (a) {
                  var Rg;
                  return (
                    (L = Rg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 156) >> 2]
                      : ((q[(4 + Rg) >> 2] = 1740), (q[Rg >> 2] = 3008), Y(4, 1294, Rg), 0)),
                    (L = (16 + Rg) | 0),
                    0 | a
                  );
                },
                N: function (a) {
                  var Qg;
                  return (
                    (L = Qg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 208) >> 2]
                      : ((q[(4 + Qg) >> 2] = 1740), (q[Qg >> 2] = 3028), Y(4, 1294, Qg), 0)),
                    (L = (16 + Qg) | 0),
                    0 | a
                  );
                },
                O: function (a) {
                  var Pg;
                  return (
                    (L = Pg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 448) >> 2]
                      : ((q[(4 + Pg) >> 2] = 1740), (q[Pg >> 2] = 3055), Y(4, 1294, Pg), 0)),
                    (L = (16 + Pg) | 0),
                    0 | a
                  );
                },
                P: function (a) {
                  var Og;
                  return (
                    (L = Og = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 148) >> 2]
                      : ((q[(4 + Og) >> 2] = 1740), (q[Og >> 2] = 3085), Y(4, 1294, Og), 0)),
                    (L = (16 + Og) | 0),
                    0 | a
                  );
                },
                Q: function (a) {
                  var Ng;
                  return (
                    (L = Ng = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 220) >> 2]
                      : ((q[(4 + Ng) >> 2] = 1740), (q[Ng >> 2] = 3109), Y(4, 1294, Ng), 0)),
                    (L = (16 + Ng) | 0),
                    0 | a
                  );
                },
                R: function (a) {
                  var Mg;
                  return (
                    (L = Mg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 152) >> 2]
                      : ((q[(4 + Mg) >> 2] = 1740), (q[Mg >> 2] = 3135), Y(4, 1294, Mg), 0)),
                    (L = (16 + Mg) | 0),
                    0 | a
                  );
                },
                S: function (a) {
                  var Lg;
                  return (
                    (L = Lg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 456) >> 2]
                      : ((q[(4 + Lg) >> 2] = 1740), (q[Lg >> 2] = 3157), Y(4, 1294, Lg), 0)),
                    (L = (16 + Lg) | 0),
                    0 | a
                  );
                },
                T: function (a) {
                  var Kg;
                  return (
                    (L = Kg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 460) >> 2]
                      : ((q[(4 + Kg) >> 2] = 1740), (q[Kg >> 2] = 3186), Y(4, 1294, Kg), 0)),
                    (L = (16 + Kg) | 0),
                    0 | a
                  );
                },
                U: function (a) {
                  var tg;
                  return (
                    (L = tg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(q[(q[a >> 2] + 8) >> 2] + 188) >> 2]
                      : ((q[(4 + tg) >> 2] = 1740), (q[tg >> 2] = 3213), Y(4, 1294, tg), 0)),
                    (L = (16 + tg) | 0),
                    0 | a
                  );
                },
                V: function (a) {
                  var sg;
                  ((L = sg = (L - 16) | 0),
                    (a |= 0)
                      ? (q[(a + 432) >> 2] = 1)
                      : ((q[(4 + sg) >> 2] = 1740), (q[sg >> 2] = 3245), Y(4, 1294, sg)),
                    (L = (16 + sg) | 0));
                },
                W: function (a) {
                  var rg;
                  return (
                    (L = rg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 752) >> 2]
                      : ((q[(4 + rg) >> 2] = 1740), (q[rg >> 2] = 3274), Y(4, 1294, rg), 0)),
                    (L = (16 + rg) | 0),
                    0 | a
                  );
                },
                X: function (a) {
                  var qg;
                  return (
                    (L = qg = (L - 16) | 0),
                    (a = (a |= 0)
                      ? q[(a + 748) >> 2]
                      : ((q[(4 + qg) >> 2] = 1740), (q[qg >> 2] = 3299), Y(4, 1294, qg), 0)),
                    (L = (16 + qg) | 0),
                    0 | a
                  );
                },
                Y: function (a) {
                  var og,
                    pg = 0;
                  return (
                    (L = og = (L - 16) | 0),
                    (a |= 0)
                      ? r[(q[q[a >> 2] >> 2] + 4) | (pg = 0)] < 6 || (pg = q[(a + 544) >> 2])
                      : ((q[(4 + og) >> 2] = 1740), (q[og >> 2] = 3324), Y(4, 1294, og), (pg = -1)),
                    (L = (16 + og) | 0),
                    0 | (a = pg)
                  );
                },
                Z: function (a) {
                  var mg,
                    ng = 0;
                  return (
                    (L = mg = (L - 16) | 0),
                    (a |= 0)
                      ? ((a = q[a >> 2]),
                        r[(q[a >> 2] + 4) | (ng = 0)] < 6 || (ng = q[(q[(a + 8) >> 2] + 644) >> 2]))
                      : ((q[(4 + mg) >> 2] = 1740), (q[mg >> 2] = 3345), Y(4, 1294, mg), (ng = 0)),
                    (L = (16 + mg) | 0),
                    0 | (a = ng)
                  );
                },
                _: function (a) {
                  var kg,
                    lg = 0;
                  return (
                    (L = kg = (L - 16) | 0),
                    (a |= 0)
                      ? r[(q[q[a >> 2] >> 2] + 4) | (lg = 0)] < 6 || (lg = q[(a + 632) >> 2])
                      : ((q[(4 + kg) >> 2] = 1740), (q[kg >> 2] = 3371), Y(4, 1294, kg), (lg = 0)),
                    (L = (16 + kg) | 0),
                    0 | (a = lg)
                  );
                },
                $: function (a) {
                  var ig,
                    jg = 0;
                  return (
                    (L = ig = (L - 16) | 0),
                    (a |= 0)
                      ? ((a = q[a >> 2]),
                        r[(q[a >> 2] + 4) | (jg = 0)] < 6 || (jg = q[(q[(a + 8) >> 2] + 636) >> 2]))
                      : ((q[(4 + ig) >> 2] = 1740), (q[ig >> 2] = 3396), Y(4, 1294, ig), (jg = 0)),
                    (L = (16 + ig) | 0),
                    0 | (a = jg)
                  );
                },
                aa: function (a) {
                  var gg,
                    hg = 0;
                  return (
                    (L = gg = (L - 16) | 0),
                    (a |= 0)
                      ? r[(q[q[a >> 2] >> 2] + 4) | (hg = 0)] < 6 || (hg = q[(a + 636) >> 2])
                      : ((q[(4 + gg) >> 2] = 1740), (q[gg >> 2] = 3424), Y(4, 1294, gg), (hg = 0)),
                    (L = (16 + gg) | 0),
                    0 | (a = hg)
                  );
                },
                ba: function (a) {
                  var eg,
                    fg = 0;
                  return (
                    (L = eg = (L - 16) | 0),
                    (a |= 0)
                      ? r[(q[q[a >> 2] >> 2] + 4) | (fg = 0)] < 6 || (fg = q[(a + 640) >> 2])
                      : ((q[(4 + eg) >> 2] = 1740), (q[eg >> 2] = 3454), Y(4, 1294, eg), (fg = 0)),
                    (L = (16 + eg) | 0),
                    0 | (a = fg)
                  );
                },
                ca: function (a) {
                  var Tf,
                    Uf = 0;
                  return (
                    (L = Tf = (L - 16) | 0),
                    (a |= 0)
                      ? ((a = q[a >> 2]),
                        r[(q[a >> 2] + 4) | (Uf = 0)] < 6 || (Uf = q[(q[(a + 8) >> 2] + 652) >> 2]))
                      : ((q[(4 + Tf) >> 2] = 1740), (q[Tf >> 2] = 3482), Y(4, 1294, Tf), (Uf = 0)),
                    (L = (16 + Tf) | 0),
                    0 | (a = Uf)
                  );
                },
                da: function (a) {
                  var Rf,
                    Sf = 0;
                  return (
                    (L = Rf = (L - 16) | 0),
                    (a |= 0)
                      ? ((a = q[a >> 2]),
                        r[(q[a >> 2] + 4) | (Sf = 0)] < 6 || (Sf = q[(q[(a + 8) >> 2] + 632) >> 2]))
                      : ((q[(4 + Rf) >> 2] = 1740), (q[Rf >> 2] = 3508), Y(4, 1294, Rf), (Sf = 0)),
                    (L = (16 + Rf) | 0),
                    0 | (a = Sf)
                  );
                },
                ea: function (a) {
                  var Of,
                    Qf = 0;
                  return (
                    (L = Of = (L - 16) | 0),
                    (a |= 0)
                      ? ((a = q[a >> 2]),
                        r[(q[a >> 2] + 4) | (Qf = 0)] < 6 || (Qf = q[(q[(a + 8) >> 2] + 640) >> 2]))
                      : ((q[(4 + Of) >> 2] = 1740), (q[Of >> 2] = 3529), Y(4, 1294, Of), (Qf = 0)),
                    (L = (16 + Of) | 0),
                    0 | (a = Qf)
                  );
                },
                fa: function (a) {
                  var wm;
                  return (
                    na((12 + (L = wm = (L - 16) | 0)) | 0, 64, (a |= 0)),
                    (L = (16 + wm) | 0),
                    q[(12 + wm) >> 2]
                  );
                },
                ga: function (a) {
                  var lm,
                    jm,
                    km = 0;
                  return (
                    (L = jm = (L - 16) | 0),
                    !(a |= 0) ||
                      na((12 + jm) | 0, 16, (lm = wa(a))) ||
                      (km = va(a, q[(12 + jm) >> 2], lm)) ||
                      (pa(q[(12 + jm) >> 2]), (km = 0)),
                    (L = (16 + jm) | 0),
                    0 | km
                  );
                },
                ha: function (a) {
                  return 0 | qa((a |= 0));
                },
                ia: function (a) {
                  pa((a |= 0));
                },
                ja: function (a) {
                  var bm;
                  (na((12 + (L = bm = (L - 16) | 0)) | 0, 64, (a |= 0)),
                    pa(q[(12 + bm) >> 2]),
                    (L = (16 + bm) | 0));
                },
                ka: function () {
                  return 0 | L;
                },
                la: function (a) {
                  return 0 | (L = a = (L - (a |= 0)) & -16);
                },
                ma: function (a) {
                  L = a |= 0;
                },
                na: function (a) {
                  return (
                    0 |
                    (function (pagesToAdd) {
                      pagesToAdd |= 0;
                      var P = 0 | N(),
                        pagesToAdd = (P + pagesToAdd) | 0;
                      {
                        var S;
                        P < pagesToAdd &&
                          pagesToAdd < 65536 &&
                          ((pagesToAdd = new ArrayBuffer(w(pagesToAdd, 65536))),
                          (S = new global.Int8Array(pagesToAdd)).set(o),
                          (o = S),
                          (o = new global.Int8Array(pagesToAdd)),
                          (p = new global.Int16Array(pagesToAdd)),
                          (q = new global.Int32Array(pagesToAdd)),
                          (r = new global.Uint8Array(pagesToAdd)),
                          (s = new global.Uint16Array(pagesToAdd)),
                          (t = new global.Uint32Array(pagesToAdd)),
                          (u = new global.Float32Array(pagesToAdd)),
                          (v = new global.Float64Array(pagesToAdd)),
                          (buffer = pagesToAdd),
                          (m.buffer = pagesToAdd));
                      }
                      return P;
                    })(0 | (a |= 0))
                  );
                },
                oa: function (a, Bj) {
                  n[(a |= 0)]((Bj |= 0));
                },
              }
            );
            function X(a, b, c) {
              var e,
                f,
                d = 0;
              if (c)
                for (;;) {
                  if (((c = (c + -1) | 0), a >>> 0 < (d = ((e = (a + b) | 0) - 1) | 0) >>> 0))
                    for (;;)
                      if (
                        ((f = r[0 | a]),
                        (o[0 | a] = r[0 | d]),
                        (o[0 | d] = f),
                        !((a = (a + 1) | 0) >>> 0 < (d = (d + -1) | 0) >>> 0))
                      )
                        break;
                  if (((a = e), !c)) break;
                }
            }
            function Y(a, b, c) {
              var g;
              ((L = g = (L - 272) | 0),
                t[1896] > a >>> 0 ||
                  ((a = q[1897]) &&
                    (Ja((16 + g) | 0, b, (q[(12 + g) >> 2] = c)), n[a]((16 + g) | 0))),
                (L = (272 + g) | 0));
            }
            function Z(a, b, c) {
              32 & r[0 | a] ||
                !(function (a, ok, Al) {
                  var Bl = 0,
                    Cl = 0,
                    Dl = 0;
                  a: {
                    if (!(Bl = q[(Al + 16) >> 2])) {
                      if (
                        (function (a) {
                          var ok = 0;
                          if (
                            ((ok = r[(a + 74) | 0]),
                            (o[(a + 74) | 0] = (ok + -1) | ok),
                            8 & (ok = q[a >> 2]))
                          )
                            return ((q[a >> 2] = 32 | ok), 1);
                          return (
                            (q[(a + 4) >> 2] = 0),
                            (q[(a + 8) >> 2] = 0),
                            (ok = q[(a + 44) >> 2]),
                            (q[(a + 28) >> 2] = ok),
                            (q[(a + 20) >> 2] = ok),
                            (q[(a + 16) >> 2] = ok + q[(a + 48) >> 2]),
                            0
                          );
                        })(Al)
                      )
                        break a;
                      Bl = q[(Al + 16) >> 2];
                    }
                    if (((Dl = q[(Al + 20) >> 2]), (Bl - Dl) >>> 0 < ok >>> 0))
                      return n[q[(Al + 36) >> 2]](Al, a, ok);
                    b: if (!(o[(Al + 75) | 0] < 0)) {
                      for (Bl = ok; ; ) {
                        if (!(Cl = Bl)) break b;
                        if (10 == r[((Bl = (Cl + -1) | 0) + a) | 0]) break;
                      }
                      if (n[q[(Al + 36) >> 2]](Al, a, Cl) >>> 0 < Cl >>> 0) break a;
                      ((ok = (ok - Cl) | 0), (a = (a + Cl) | 0), (Dl = q[(Al + 20) >> 2]));
                    }
                    (aa(Dl, a, ok), (q[(Al + 20) >> 2] = q[(Al + 20) >> 2] + ok));
                  }
                })(b, c, a);
            }
            function _(a, b, c, h, i) {
              var k, l, j;
              if (((L = j = (L - 256) | 0), !((73728 & i) | ((0 | c) <= (0 | h))))) {
                if (
                  ($(j, b, (k = (i = (c - h) | 0) >>> 0 < 256) ? i : 256), (b = a), (l = j), !k)
                ) {
                  for (c = (c - h) | 0; ; )
                    if ((Z(a, j, 256), !(255 < (i = (i + -256) | 0) >>> 0))) break;
                  i = 255 & c;
                }
                Z(b, l, i);
              }
              L = (256 + j) | 0;
            }
            function $(a, b, c) {
              var h, i, m, n;
              if (
                c &&
                ((o[((h = (a + c) | 0) - 1) | 0] = b),
                (o[0 | a] = b),
                !(
                  c >>> 0 < 3 ||
                  ((o[(h - 2) | 0] = b),
                  (o[(a + 1) | 0] = b),
                  (o[(h - 3) | 0] = b),
                  (o[(a + 2) | 0] = b),
                  c >>> 0 < 7) ||
                  ((o[(h - 4) | 0] = b), (o[(a + 3) | 0] = b), c >>> 0 < 9) ||
                  ((i = ((h = (0 - a) & 3) + a) | 0),
                  (b = w(255 & b, 16843009)),
                  (q[i >> 2] = b),
                  (q[((h = ((c = (c - h) & -4) + i) | 0) - 4) >> 2] = b),
                  c >>> 0 < 9) ||
                  ((q[(8 + i) >> 2] = b),
                  (q[(4 + i) >> 2] = b),
                  (q[(h - 8) >> 2] = b),
                  (q[(h - 12) >> 2] = b),
                  c >>> 0 < 25) ||
                  ((q[(24 + i) >> 2] = b),
                  (q[(20 + i) >> 2] = b),
                  (q[(16 + i) >> 2] = b),
                  (q[(12 + i) >> 2] = b),
                  (q[(h - 16) >> 2] = b),
                  (q[(h - 20) >> 2] = b),
                  (q[(h - 24) >> 2] = b),
                  (q[(h - 28) >> 2] = b),
                  (c = (c - (n = (4 & i) | 24)) | 0) >>> 0 < 32)
                ))
              )
                for (m = h = b, b = (i + n) | 0; ; )
                  if (
                    ((q[(b + 24) >> 2] = m),
                    (q[(b + 28) >> 2] = h),
                    (q[(b + 16) >> 2] = m),
                    (q[(b + 20) >> 2] = h),
                    (q[(b + 8) >> 2] = m),
                    (q[(b + 12) >> 2] = h),
                    (q[b >> 2] = m),
                    (q[(b + 4) >> 2] = h),
                    (b = (b + 32) | 0),
                    !(31 < (c = (c + -32) | 0) >>> 0))
                  )
                    break;
              return a;
            }
            function aa(a, b, c) {
              var p,
                s = 0;
              if (8192 <= c >>> 0) I(0 | a, 0 | b, 0 | c);
              else {
                if (((p = (a + c) | 0), 3 & (a ^ b))) {
                  if (p >>> 0 < 4) c = a;
                  else if ((s = (p - 4) | 0) >>> 0 < a >>> 0) c = a;
                  else
                    for (c = a; ; )
                      if (
                        ((o[0 | c] = r[0 | b]),
                        (o[(c + 1) | 0] = r[(b + 1) | 0]),
                        (o[(c + 2) | 0] = r[(b + 2) | 0]),
                        (o[(c + 3) | 0] = r[(b + 3) | 0]),
                        (b = (b + 4) | 0),
                        !((c = (c + 4) | 0) >>> 0 <= s >>> 0))
                      )
                        break;
                } else {
                  b: if ((0 | c) < 1) c = a;
                  else if (3 & a)
                    for (c = a; ; ) {
                      if (
                        ((o[0 | c] = r[0 | b]),
                        (b = (b + 1) | 0),
                        p >>> 0 <= (c = (c + 1) | 0) >>> 0)
                      )
                        break b;
                      if (!(3 & c)) break;
                    }
                  else c = a;
                  if (!((a = -4 & p) >>> 0 < 64 || (s = (a + -64) | 0) >>> 0 < c >>> 0))
                    for (;;)
                      if (
                        ((q[c >> 2] = q[b >> 2]),
                        (q[(c + 4) >> 2] = q[(b + 4) >> 2]),
                        (q[(c + 8) >> 2] = q[(b + 8) >> 2]),
                        (q[(c + 12) >> 2] = q[(b + 12) >> 2]),
                        (q[(c + 16) >> 2] = q[(b + 16) >> 2]),
                        (q[(c + 20) >> 2] = q[(b + 20) >> 2]),
                        (q[(c + 24) >> 2] = q[(b + 24) >> 2]),
                        (q[(c + 28) >> 2] = q[(b + 28) >> 2]),
                        (q[(c + 32) >> 2] = q[(b + 32) >> 2]),
                        (q[(c + 36) >> 2] = q[(b + 36) >> 2]),
                        (q[(c + 40) >> 2] = q[(b + 40) >> 2]),
                        (q[(c + 44) >> 2] = q[(b + 44) >> 2]),
                        (q[(c + 48) >> 2] = q[(b + 48) >> 2]),
                        (q[(c + 52) >> 2] = q[(b + 52) >> 2]),
                        (q[(c + 56) >> 2] = q[(b + 56) >> 2]),
                        (q[(c + 60) >> 2] = q[(b + 60) >> 2]),
                        (b = (b - -64) | 0),
                        !((c = (c - -64) | 0) >>> 0 <= s >>> 0))
                      )
                        break;
                  if (!(a >>> 0 <= c >>> 0))
                    for (;;)
                      if (
                        ((q[c >> 2] = q[b >> 2]),
                        (b = (b + 4) | 0),
                        !((c = (c + 4) | 0) >>> 0 < a >>> 0))
                      )
                        break;
                }
                if (c >>> 0 < p >>> 0)
                  for (;;)
                    if (
                      ((o[0 | c] = r[0 | b]), (b = (b + 1) | 0), (0 | p) == (0 | (c = (c + 1) | 0)))
                    )
                      break;
              }
            }
            function ba(a) {
              var b, c;
              return x(
                (b = a * a) *
                  b *
                  (c = b * a) *
                  (2718311493989822e-21 * b - 0.00019839334836096632) +
                  (c * (0.008333329385889463 * b - 0.16666666641626524) + a)
              );
            }
            function ca(a) {
              var o;
              return x(
                -0.499999997251031 * (a *= a) +
                  1 +
                  0.04166662332373906 * (o = a * a) +
                  a * o * (2439044879627741e-20 * a - 0.001388676377460993)
              );
            }
            function da(a, q) {
              var t;
              if (a >>> 0 < (q = (((a + q) | 0) - 1) | 0) >>> 0)
                for (;;)
                  if (
                    ((t = r[0 | a]),
                    (o[0 | a] = r[0 | q]),
                    (o[0 | q] = t),
                    !((a = (a + 1) | 0) >>> 0 < (q = (q + -1) | 0) >>> 0))
                  )
                    break;
            }
            function ea(a, r, v, y, z, B, C) {
              var G,
                H,
                J,
                M,
                P,
                Q,
                R,
                N,
                O,
                I,
                D = 0,
                E = x(0),
                F = x(0),
                K = x(0);
              (x(0), x(0), x(0), x(0));
              if (((L = I = (L - 16) | 0), 1 <= (0 | a)))
                for (Q = (w(a, 12) + r) | 0; ; ) {
                  if (1 <= (0 | (H = q[(r + 4) >> 2])))
                    for (
                      R = ((a = q[(r + 8) >> 2]) + w(H, 48)) | 0,
                        H = ((G = q[r >> 2] << 4) + C) | 0,
                        J = ((8 | G) + C) | 0,
                        G = ((4 | G) + C) | 0;
                      ;

                    )
                      if (
                        ((D = q[(a + 8) >> 2]) &&
                          ((N = (D + -1) | 0) >>> 0 <= 1
                            ? ((O = ((q[(a + 4) >> 2] << 2) + v) | 0),
                              (D = q[(O + (q[(a + 12) >> 2] << 2)) >> 2] << 2),
                              (E = u[(D + B) >> 2]),
                              (P = u[(z + D) >> 2]),
                              (F = u[(y + D) >> 2]),
                              N - 1
                                ? ((K = F),
                                  (F = u[(a + 20) >> 2]),
                                  (u[H >> 2] = u[H >> 2] + x(u[(a + 44) >> 2] * x(K * F))),
                                  (u[G >> 2] = u[G >> 2] + x(x(P * F) * u[(a + 44) >> 2])),
                                  (u[J >> 2] = u[J >> 2] + x(x(E * F) * u[(a + 44) >> 2])))
                                : ((D = q[((q[(a + 16) >> 2] << 2) + O) >> 2] << 2),
                                  (N = u[(D + B) >> 2]),
                                  (O = u[(z + D) >> 2]),
                                  (K = F),
                                  (F = u[(a + 20) >> 2]),
                                  (M = u[(a + 24) >> 2]),
                                  (u[H >> 2] =
                                    u[H >> 2] +
                                    x(u[(a + 44) >> 2] * x(x(K * F) + x(u[(y + D) >> 2] * M)))),
                                  (u[G >> 2] =
                                    u[G >> 2] + x(x(x(P * F) + x(O * M)) * u[(a + 44) >> 2])),
                                  (u[J >> 2] =
                                    u[J >> 2] + x(x(x(E * F) + x(N * M)) * u[(a + 44) >> 2]))))
                            : ((q[I >> 2] = D), Y(4, 1024, I))),
                        !((a = (a + 48) | 0) >>> 0 < R >>> 0))
                      )
                        break;
                  if (
                    ((a = ((q[r >> 2] << 4) + C) | 0),
                    (E = u[a >> 2]),
                    (u[a >> 2] = E < x(0) ? x(0) : x(A(E, x(1)))),
                    (E = u[(a + 4) >> 2]),
                    (u[(a + 4) >> 2] = E < x(0) ? x(0) : x(A(E, x(1)))),
                    (E = u[(a + 8) >> 2]),
                    (u[(a + 8) >> 2] = E < x(0) ? x(0) : x(A(E, x(1)))),
                    !((r = (r + 12) | 0) >>> 0 < Q >>> 0))
                  )
                    break;
                }
              L = (16 + I) | 0;
            }
            function fa(a) {
              var r = 0,
                u = N();
              return (a = ((r = q[2308]) + a) | 0) >>> 0 <= (u << 16) >>> 0 || J(0 | a)
                ? ((q[2308] = a), r)
                : ((q[2178] = 48), -1);
            }
            function ga(a, q, v) {
              var y,
                x = 0,
                z = 0;
              if (((1 == (0 | q)) & (a >>> 0 < 0)) | (q >>> 0 < 1)) x = a;
              else
                for (;;)
                  if (
                    ((y = sd((x = td(a, q, 10)), (z = M), 10)),
                    (o[0 | (v = (v + -1) | 0)] = (a - y) | 48),
                    (y = ((9 == (0 | q)) & (4294967295 < a >>> 0)) | (9 < q >>> 0)),
                    (a = x),
                    (q = z),
                    !y)
                  )
                    break;
              if (x)
                for (;;)
                  if (
                    ((o[0 | (v = (v + -1) | 0)] = (x - w((a = ((x >>> 0) / 10) | 0), 10)) | 48),
                    (q = 9 < x >>> 0),
                    (x = a),
                    !q)
                  )
                    break;
              return v;
            }
            function ha(a) {
              return (a + -48) >>> 0 < 10;
            }
            function ia(a) {
              var q;
              return (q = Ka(a, 64)) ? (q - a) | 0 : 64;
            }
            function ja(a, v) {
              var w = 0;
              return (
                1024 <= (0 | v)
                  ? ((a *= 898846567431158e293),
                    (v =
                      (0 | (w = (v + -1023) | 0)) < 1024
                        ? w
                        : ((a *= 898846567431158e293), (((0 | v) < 3069 ? v : 3069) + -2046) | 0)))
                  : -1023 < (0 | v) ||
                    ((a *= 22250738585072014e-324),
                    (v =
                      -1023 < (0 | (w = (v + 1022) | 0))
                        ? w
                        : ((a *= 22250738585072014e-324),
                          ((-3066 < (0 | v) ? v : -3066) + 2044) | 0))),
                f(0, 0),
                f(1, (v + 1023) << 20),
                a * +g()
              );
            }
            function ka(a, v) {
              var A = 0,
                B = 0,
                C = a,
                B =
                  v >>> 0 <= 31
                    ? ((A = q[(a + 4) >> 2]), q[a >> 2])
                    : ((A = q[a >> 2]),
                      (q[(a + 4) >> 2] = A),
                      (v = (v + -32) | (q[a >> 2] = 0)),
                      0);
              ((q[C >> 2] = B << v), (q[(a + 4) >> 2] = (A << v) | (B >>> (32 - v))));
            }
            function la(a, v, U, V, W) {
              var X,
                Y = 0,
                Z = 0,
                _ = 0;
              ((L = X = (L - 240) | 0),
                (Y = q[v >> 2]),
                (q[(232 + X) >> 2] = Y),
                (v = q[(v + 4) >> 2]),
                (q[X >> 2] = a),
                (q[(236 + X) >> 2] = v),
                (Z = 1));
              a: {
                b: {
                  c: {
                    if (
                      (v || 1 != (0 | Y)) &&
                      ((Y = (a - q[((U << 2) + W) >> 2]) | 0), !((0 | n[5](Y, a)) < 1))
                    ) {
                      for (_ = !V; ; ) {
                        e: {
                          if (((v = Y), !(!_ | ((0 | U) < 2)))) {
                            if (
                              ((V = q[((((U << 2) + W) | 0) - 8) >> 2]),
                              -1 < (0 | n[5]((Y = (a + -4) | 0), v)))
                            )
                              break e;
                            if (-1 < (0 | n[5]((Y - V) | 0, v))) break e;
                          }
                          if (
                            ((q[((Z << 2) + X) >> 2] = v),
                            (Z = (Z + 1) | 0),
                            ma((232 + X) | 0, (a = Na((232 + X) | 0))),
                            (U = (a + U) | 0),
                            !q[(236 + X) >> 2] && 1 == q[(232 + X) >> 2])
                          )
                            break b;
                          if (
                            ((_ = 1),
                            (Y = ((a = v) - q[((U << 2) + W) >> 2]) | (V = 0)),
                            0 < (0 | n[5](Y, q[X >> 2])))
                          )
                            continue;
                          break c;
                        }
                        break;
                      }
                      v = a;
                      break b;
                    }
                    v = a;
                  }
                  if (V) break a;
                }
                (Ma(X, Z), ta(v, U, W));
              }
              L = (240 + X) | 0;
            }
            function ma(a, v) {
              var L = 0,
                U = 0,
                V = a,
                U =
                  v >>> 0 <= 31
                    ? ((L = q[a >> 2]), q[(a + 4) >> 2])
                    : ((L = q[(a + 4) >> 2]),
                      (q[(a + 4) >> 2] = 0),
                      (q[a >> 2] = L),
                      (v = (v + -32) | 0),
                      0);
              ((q[(V + 4) >> 2] = U >>> v), (q[a >> 2] = (U << (32 - v)) | (L >>> v)));
            }
            function na(a, v, W) {
              var $ = 0;
              a: {
                if (8 == (0 | v)) v = qa(W);
                else {
                  if (
                    (($ = 28),
                    (3 & v) |
                      (1 !=
                        (0 |
                          (function (a) {
                            var Kq = 0,
                              Lq = 0;
                            for (;;) {
                              if (((Lq = Kq), !a)) break;
                              ((a &= a - 1), (Kq = (Kq + 1) | 0));
                            }
                            return Lq;
                          })(v >>> 2))))
                  )
                    break a;
                  if ((($ = 48), (-64 - v) >>> 0 < W >>> 0)) break a;
                  v = (function (a, Bj) {
                    var _j = 0,
                      bk = 0,
                      ck = 0,
                      dk = 0,
                      ek = 0;
                    if (((bk = a >>> 0 > (_j = 16) ? a : 16) + -1) & bk) {
                      for (;;) if (((_j = (a = _j) << 1), !(a >>> 0 < bk >>> 0))) break;
                    } else a = bk;
                    if ((-64 - a) >>> 0 <= Bj >>> 0) return ((q[2178] = 48), 0);
                    if (
                      !(_j = qa((12 + (((bk = Bj >>> 0 < 11 ? 16 : (Bj + 11) & -8) + a) | 0)) | 0))
                    )
                      return 0;
                    Bj = (_j + -8) | 0;
                    _j & (a + -1)
                      ? ((ek = q[(dk = (_j + -4) | 0) >> 2]),
                        (ck =
                          ((-8 & ek) -
                            (_j =
                              ((a =
                                15 < ((_j = (((((a + _j) | 0) - 1) & (0 - a)) - 8) | 0) - Bj) >>> 0
                                  ? _j
                                  : (a + _j) | 0) -
                                Bj) |
                              0)) |
                          0),
                        3 & ek
                          ? ((q[(a + 4) >> 2] = ck | (1 & q[(a + 4) >> 2]) | 2),
                            (q[(4 + (ck = (a + ck) | 0)) >> 2] = 1 | q[(4 + ck) >> 2]),
                            (q[dk >> 2] = _j | (1 & q[dk >> 2]) | 2),
                            (q[(a + 4) >> 2] = 1 | q[(a + 4) >> 2]),
                            ya(Bj, _j))
                          : ((Bj = q[Bj >> 2]), (q[(a + 4) >> 2] = ck), (q[a >> 2] = Bj + _j)))
                      : (a = Bj);
                    3 & (Bj = q[(a + 4) >> 2]) &&
                      ((_j = -8 & Bj) >>> 0 <= (bk + 16) >>> 0 ||
                        ((q[(a + 4) >> 2] = bk | (1 & Bj) | 2),
                        (Bj = (a + bk) | 0),
                        (bk = (_j - bk) | 0),
                        (q[(Bj + 4) >> 2] = 3 | bk),
                        (q[((_j = (a + _j) | 0) + 4) >> 2] = 1 | q[(_j + 4) >> 2]),
                        ya(Bj, bk)));
                    return (a + 8) | 0;
                  })(16 < v >>> 0 ? v : 16, W);
                }
                if (!v) return 1;
                ((q[a >> 2] = v), ($ = 0));
              }
              return $;
            }
            function oa(a, v) {
              var W = q[a >> 2],
                aa = r[(W + 4) | 0];
              ((a = q[(a + 4) >> 2]),
                (q[(v + 12) >> 2] = q[a >> 2] + W),
                (q[(v + 16) >> 2] = q[(a + 4) >> 2] + W),
                (q[(v + 20) >> 2] = q[(a + 8) >> 2] + W),
                (q[(v + 24) >> 2] = q[(a + 12) >> 2] + W),
                (q[(v + 28) >> 2] = q[(a + 16) >> 2] + W),
                (q[(v + 32) >> 2] = q[(a + 20) >> 2] + W),
                (q[(v + 36) >> 2] = q[(a + 24) >> 2] + W),
                (q[(v + 40) >> 2] = q[(a + 28) >> 2] + W),
                (q[(v + 44) >> 2] = q[(a + 32) >> 2] + W),
                (q[(v + 48) >> 2] = q[(a + 36) >> 2] + W),
                (q[(v + 56) >> 2] = q[(a + 40) >> 2] + W),
                (q[(v + 60) >> 2] = q[(a + 44) >> 2] + W),
                (q[(v - -64) >> 2] = q[(a + 48) >> 2] + W),
                (q[(v + 68) >> 2] = q[(a + 52) >> 2] + W),
                (q[(v + 72) >> 2] = q[(a + 56) >> 2] + W),
                (q[(v + 76) >> 2] = q[(a + 60) >> 2] + W),
                (q[(v + 80) >> 2] = q[(a + 64) >> 2] + W),
                (q[(v + 84) >> 2] = q[(a + 68) >> 2] + W),
                (q[(v + 88) >> 2] = q[(a + 72) >> 2] + W),
                (q[(v + 92) >> 2] = q[(a + 76) >> 2] + W),
                (q[(v + 96) >> 2] = q[(a + 80) >> 2] + W),
                (q[(v + 100) >> 2] = q[(a + 84) >> 2] + W),
                (q[(v + 108) >> 2] = q[(a + 88) >> 2] + W),
                (q[(v + 112) >> 2] = q[(a + 92) >> 2] + W),
                (q[(v + 116) >> 2] = q[(a + 96) >> 2] + W),
                (q[(v + 124) >> 2] = q[(a + 100) >> 2] + W),
                (q[(v + 128) >> 2] = q[(a + 104) >> 2] + W),
                (q[(v + 132) >> 2] = q[(a + 108) >> 2] + W),
                (q[(v + 140) >> 2] = q[(a + 112) >> 2] + W),
                (q[(v + 144) >> 2] = q[(a + 116) >> 2] + W),
                (q[(v + 148) >> 2] = q[(a + 120) >> 2] + W),
                (q[(v + 152) >> 2] = q[(a + 124) >> 2] + W),
                (q[(v + 156) >> 2] = q[(a + 128) >> 2] + W),
                (q[(v + 160) >> 2] = q[(a + 132) >> 2] + W),
                (q[(v + 164) >> 2] = q[(a + 136) >> 2] + W),
                (q[(v + 168) >> 2] = q[(a + 140) >> 2] + W),
                (q[(v + 172) >> 2] = q[(a + 144) >> 2] + W),
                (q[(v + 180) >> 2] = q[(a + 148) >> 2] + W),
                (q[(v + 184) >> 2] = q[(a + 152) >> 2] + W),
                (q[(v + 188) >> 2] = q[(a + 156) >> 2] + W),
                (q[(v + 192) >> 2] = q[(a + 160) >> 2] + W),
                (q[(v + 196) >> 2] = q[(a + 164) >> 2] + W),
                (q[(v + 200) >> 2] = q[(a + 168) >> 2] + W),
                (q[(v + 208) >> 2] = q[(a + 172) >> 2] + W),
                (q[(v + 212) >> 2] = q[(a + 176) >> 2] + W),
                (q[(v + 216) >> 2] = q[(a + 180) >> 2] + W),
                (q[(v + 220) >> 2] = q[(a + 184) >> 2] + W),
                (q[(v + 224) >> 2] = q[(a + 188) >> 2] + W),
                (q[(v + 228) >> 2] = q[(a + 192) >> 2] + W),
                (q[(v + 232) >> 2] = q[(a + 196) >> 2] + W),
                (q[(v + 236) >> 2] = q[(a + 200) >> 2] + W),
                (q[(v + 240) >> 2] = q[(a + 204) >> 2] + W),
                (q[(v + 244) >> 2] = q[(a + 208) >> 2] + W),
                (q[(v + 248) >> 2] = q[(a + 212) >> 2] + W),
                (q[(v + 252) >> 2] = q[(a + 216) >> 2] + W),
                (q[(v + 256) >> 2] = q[(a + 220) >> 2] + W),
                (q[(v + 264) >> 2] = q[(a + 224) >> 2] + W),
                (q[(v + 268) >> 2] = q[(a + 228) >> 2] + W),
                (q[(v + 292) >> 2] = q[(a + 232) >> 2] + W),
                (q[(v + 300) >> 2] = q[(a + 236) >> 2] + W),
                (q[(v + 304) >> 2] = q[(a + 240) >> 2] + W),
                (q[(v + 316) >> 2] = q[(a + 244) >> 2] + W),
                (q[(v + 320) >> 2] = q[(a + 248) >> 2] + W),
                (q[(v + 324) >> 2] = q[(a + 252) >> 2] + W),
                (q[(v + 328) >> 2] = q[(a + 256) >> 2] + W),
                (q[(v + 332) >> 2] = q[(a + 260) >> 2] + W),
                (q[(v + 336) >> 2] = q[(a + 264) >> 2] + W),
                (q[(v + 340) >> 2] = q[(a + 268) >> 2] + W),
                (q[(v + 352) >> 2] = q[(a + 272) >> 2] + W),
                (q[(v + 356) >> 2] = q[(a + 276) >> 2] + W),
                (q[(v + 360) >> 2] = q[(a + 280) >> 2] + W),
                (q[(v + 372) >> 2] = q[(a + 284) >> 2] + W),
                (q[(v + 384) >> 2] = q[(a + 288) >> 2] + W),
                (q[(v + 388) >> 2] = q[(a + 292) >> 2] + W),
                (q[(v + 392) >> 2] = q[(a + 296) >> 2] + W),
                (q[(v + 376) >> 2] = q[(a + 300) >> 2] + W),
                (q[(v + 380) >> 2] = q[(a + 304) >> 2] + W),
                (q[(v + 512) >> 2] = q[(a + 308) >> 2] + W),
                (q[(v + 516) >> 2] = q[(a + 312) >> 2] + W),
                (q[(v + 520) >> 2] = q[(a + 316) >> 2] + W),
                (q[(v + 524) >> 2] = q[(a + 320) >> 2] + W),
                (q[(v + 528) >> 2] = q[(a + 324) >> 2] + W),
                (q[(v + 532) >> 2] = q[(a + 328) >> 2] + W),
                (q[(v + 536) >> 2] = q[(a + 332) >> 2] + W),
                (q[(v + 540) >> 2] = q[(a + 336) >> 2] + W),
                (q[(v + 544) >> 2] = q[(a + 340) >> 2] + W),
                (q[(v + 548) >> 2] = q[(a + 344) >> 2] + W),
                (q[(v + 552) >> 2] = q[(a + 348) >> 2] + W),
                (q[(v + 556) >> 2] = q[(a + 352) >> 2] + W),
                (q[(v + 560) >> 2] = q[(a + 356) >> 2] + W),
                (q[(v + 564) >> 2] = q[(a + 360) >> 2] + W),
                (q[(v + 568) >> 2] = q[(a + 364) >> 2] + W),
                (q[(v + 572) >> 2] = q[(a + 368) >> 2] + W),
                (q[(v + 576) >> 2] = q[(a + 372) >> 2] + W),
                (q[(v + 580) >> 2] = q[(a + 376) >> 2] + W),
                (q[(v + 584) >> 2] = q[(a + 380) >> 2] + W),
                (q[(v + 588) >> 2] = q[(a + 384) >> 2] + W),
                (q[(v + 592) >> 2] = q[(a + 388) >> 2] + W),
                (q[(v + 596) >> 2] = q[(a + 392) >> 2] + W),
                (q[(v + 600) >> 2] = q[(a + 396) >> 2] + W),
                (q[(v + 604) >> 2] = q[(a + 400) >> 2] + W),
                aa >>> 0 < 2 ||
                  ((q[(v + 120) >> 2] = q[(a + 404) >> 2] + W), aa >>> 0 < 4) ||
                  ((q[(v + 280) >> 2] = q[(a + 408) >> 2] + W),
                  (q[(v + 284) >> 2] = q[(a + 412) >> 2] + W),
                  (q[(v + 288) >> 2] = q[(a + 416) >> 2] + W),
                  (q[(v + 104) >> 2] = q[(a + 420) >> 2] + W),
                  (q[(v + 136) >> 2] = q[(a + 424) >> 2] + W),
                  (q[(v + 176) >> 2] = q[(a + 428) >> 2] + W),
                  (q[(v + 608) >> 2] = q[(a + 432) >> 2] + W),
                  (q[(v + 612) >> 2] = q[(a + 436) >> 2] + W),
                  (q[(v + 616) >> 2] = q[(a + 440) >> 2] + W),
                  (q[(v + 620) >> 2] = q[(a + 444) >> 2] + W),
                  (q[(v + 624) >> 2] = q[(a + 448) >> 2] + W),
                  (q[(v + 628) >> 2] = q[(a + 452) >> 2] + W),
                  (q[(v + 260) >> 2] = q[(a + 456) >> 2] + W),
                  (q[(v + 272) >> 2] = q[(a + 460) >> 2] + W),
                  (q[(v + 276) >> 2] = q[(a + 464) >> 2] + W),
                  (q[(v + 396) >> 2] = q[(a + 468) >> 2] + W),
                  (q[(v + 400) >> 2] = q[(a + 472) >> 2] + W),
                  (q[(v + 404) >> 2] = q[(a + 476) >> 2] + W),
                  (q[(v + 408) >> 2] = q[(a + 480) >> 2] + W),
                  (q[(v + 412) >> 2] = q[(a + 484) >> 2] + W),
                  (q[(v + 416) >> 2] = q[(a + 488) >> 2] + W),
                  (q[(v + 420) >> 2] = q[(a + 492) >> 2] + W),
                  (q[(v + 424) >> 2] = q[(a + 496) >> 2] + W),
                  (q[(v + 440) >> 2] = q[(a + 500) >> 2] + W),
                  (q[(v + 444) >> 2] = q[(a + 504) >> 2] + W),
                  (q[(v + 448) >> 2] = q[(a + 508) >> 2] + W),
                  (q[(v + 464) >> 2] = q[(a + 512) >> 2] + W),
                  (q[(v + 468) >> 2] = q[(a + 516) >> 2] + W),
                  (q[(v + 472) >> 2] = q[(a + 520) >> 2] + W),
                  (q[(v + 488) >> 2] = q[(a + 524) >> 2] + W),
                  (q[(v + 492) >> 2] = q[(a + 528) >> 2] + W),
                  (q[(v + 496) >> 2] = q[(a + 532) >> 2] + W),
                  (q[(v + 500) >> 2] = q[(a + 536) >> 2] + W),
                  (q[(v + 504) >> 2] = q[(a + 540) >> 2] + W),
                  (q[(v + 508) >> 2] = q[(a + 544) >> 2] + W),
                  4 == (0 | aa)) ||
                  ((q[(v + 308) >> 2] = q[(a + 548) >> 2] + W),
                  (q[(v + 312) >> 2] = q[(a + 552) >> 2] + W),
                  (q[(v + 344) >> 2] = q[(a + 556) >> 2] + W),
                  (q[(v + 348) >> 2] = q[(a + 560) >> 2] + W),
                  (q[(v + 364) >> 2] = q[(a + 564) >> 2] + W),
                  (q[(v + 368) >> 2] = q[(a + 568) >> 2] + W),
                  (q[(v + 428) >> 2] = q[(a + 572) >> 2] + W),
                  (q[(v + 432) >> 2] = q[(a + 576) >> 2] + W),
                  (q[(v + 436) >> 2] = q[(a + 580) >> 2] + W),
                  (q[(v + 452) >> 2] = q[(a + 584) >> 2] + W),
                  (q[(v + 456) >> 2] = q[(a + 588) >> 2] + W),
                  (q[(v + 460) >> 2] = q[(a + 592) >> 2] + W),
                  (q[(v + 476) >> 2] = q[(a + 596) >> 2] + W),
                  (q[(v + 480) >> 2] = q[(a + 600) >> 2] + W),
                  (q[(v + 484) >> 2] = q[(a + 604) >> 2] + W),
                  aa >>> 0 < 6) ||
                  ((q[(v + 52) >> 2] = q[(a + 608) >> 2] + W),
                  (q[(v + 204) >> 2] = q[(a + 612) >> 2] + W),
                  (q[(v + 632) >> 2] = q[(a + 616) >> 2] + W),
                  (q[(v + 636) >> 2] = q[(a + 620) >> 2] + W),
                  (q[(v + 640) >> 2] = q[(a + 624) >> 2] + W),
                  (q[(v + 644) >> 2] = q[(a + 628) >> 2] + W),
                  (q[(v + 648) >> 2] = q[(a + 632) >> 2] + W),
                  (q[(v + 652) >> 2] = q[(a + 636) >> 2] + W),
                  (q[(v + 296) >> 2] = q[(a + 640) >> 2] + W),
                  (q[(v + 656) >> 2] = q[(a + 644) >> 2] + W),
                  (q[(v + 660) >> 2] = q[(a + 648) >> 2] + W),
                  (q[(v + 664) >> 2] = q[(a + 652) >> 2] + W),
                  (q[(v + 668) >> 2] = q[(a + 656) >> 2] + W),
                  (q[(v + 672) >> 2] = q[(a + 660) >> 2] + W),
                  (q[(v + 676) >> 2] = q[(a + 664) >> 2] + W)));
            }
            function pa(a) {
              var ea,
                v = 0,
                ba = 0,
                ca = 0,
                da = 0,
                fa = 0,
                ga = 0,
                ia = 0;
              a: if (a) {
                ea = ((ca = (a + -8) | 0) + (a = -8 & (ba = q[(a + -4) >> 2]))) | 0;
                b: if (!(1 & ba)) {
                  if (!(3 & ba)) break a;
                  if ((ca = (ca - (ba = q[ca >> 2])) | 0) >>> 0 < t[2183]) break a;
                  if (((a = (a + ba) | 0), q[2184] != (0 | ca)))
                    if (ba >>> 0 <= 255)
                      ((da = q[(ca + 8) >> 2]),
                        (ba >>>= 3),
                        (0 | (v = q[(ca + 12) >> 2])) == (0 | da)
                          ? ((ia = q[2179] & vd(ba)), (q[8716 >> 2] = ia))
                          : ((q[(da + 12) >> 2] = v), (q[(v + 8) >> 2] = da)));
                    else {
                      if (((ga = q[(ca + 24) >> 2]), (0 | ca) != (0 | (ba = q[(ca + 12) >> 2]))))
                        ((v = q[(ca + 8) >> 2]), (q[(v + 12) >> 2] = ba), (q[(ba + 8) >> 2] = v));
                      else if (
                        (v = q[(da = (ca + 20) | 0) >> 2]) ||
                        (v = q[(da = (ca + 16) | 0) >> 2])
                      ) {
                        for (;;)
                          if (
                            ((fa = da),
                            !(
                              (v = q[(da = ((ba = v) + 20) | 0) >> 2]) ||
                              ((da = (ba + 16) | 0), (v = q[(ba + 16) >> 2]))
                            ))
                          )
                            break;
                        q[fa >> 2] = 0;
                      } else ba = 0;
                      if (ga) {
                        da = q[(ca + 28) >> 2];
                        e: {
                          if (q[(v = (9020 + (da << 2)) | 0) >> 2] == (0 | ca)) {
                            if ((q[v >> 2] = ba)) break e;
                            ((ia = q[2180] & vd(da)), (q[8720 >> 2] = ia));
                            break b;
                          }
                          if (!(q[(ga + (q[(ga + 16) >> 2] == (0 | ca) ? 16 : 20)) >> 2] = ba))
                            break b;
                        }
                        ((q[(ba + 24) >> 2] = ga),
                          (v = q[(ca + 16) >> 2]) &&
                            ((q[(ba + 16) >> 2] = v), (q[(v + 24) >> 2] = ba)),
                          (v = q[(ca + 20) >> 2]) &&
                            ((q[(ba + 20) >> 2] = v), (q[(v + 24) >> 2] = ba)));
                      }
                    }
                  else if (3 == (3 & (ba = q[(4 + ea) >> 2])))
                    return (
                      (q[2181] = a),
                      (q[(4 + ea) >> 2] = -2 & ba),
                      (q[(ca + 4) >> 2] = 1 | a),
                      void (q[(a + ca) >> 2] = a)
                    );
                }
                if (!(ea >>> 0 <= ca >>> 0) && 1 & (ba = q[(4 + ea) >> 2])) {
                  f: {
                    if (!(2 & ba)) {
                      if (q[2185] == (0 | ea)) {
                        if (
                          ((q[2185] = ca),
                          (a = (q[2182] + a) | 0),
                          (q[2182] = a),
                          (q[(ca + 4) >> 2] = 1 | a),
                          q[2184] != (0 | ca))
                        )
                          break a;
                        return ((q[2181] = 0), void (q[2184] = 0));
                      }
                      if (q[2184] == (0 | ea))
                        return (
                          (q[2184] = ca),
                          (a = (q[2181] + a) | 0),
                          (q[2181] = a),
                          (q[(ca + 4) >> 2] = 1 | a),
                          void (q[(a + ca) >> 2] = a)
                        );
                      a = ((-8 & ba) + a) | 0;
                      g: if (ba >>> 0 <= 255)
                        ((ba >>>= 3),
                          (0 | (v = q[(8 + ea) >> 2])) == (0 | (da = q[(12 + ea) >> 2]))
                            ? ((ia = q[2179] & vd(ba)), (q[8716 >> 2] = ia))
                            : ((q[(v + 12) >> 2] = da), (q[(da + 8) >> 2] = v)));
                      else {
                        if (((ga = q[(24 + ea) >> 2]), (0 | ea) != (0 | (ba = q[(12 + ea) >> 2]))))
                          ((v = q[(8 + ea) >> 2]), (q[(v + 12) >> 2] = ba), (q[(ba + 8) >> 2] = v));
                        else if (
                          (v = q[(da = (20 + ea) | 0) >> 2]) ||
                          (v = q[(da = (16 + ea) | 0) >> 2])
                        ) {
                          for (;;)
                            if (
                              ((fa = da),
                              !(
                                (v = q[(da = ((ba = v) + 20) | 0) >> 2]) ||
                                ((da = (ba + 16) | 0), (v = q[(ba + 16) >> 2]))
                              ))
                            )
                              break;
                          q[fa >> 2] = 0;
                        } else ba = 0;
                        if (ga) {
                          da = q[(28 + ea) >> 2];
                          j: {
                            if (q[(v = (9020 + (da << 2)) | 0) >> 2] == (0 | ea)) {
                              if ((q[v >> 2] = ba)) break j;
                              ((ia = q[2180] & vd(da)), (q[8720 >> 2] = ia));
                              break g;
                            }
                            if (!(q[(ga + (q[(ga + 16) >> 2] == (0 | ea) ? 16 : 20)) >> 2] = ba))
                              break g;
                          }
                          ((q[(ba + 24) >> 2] = ga),
                            (v = q[(16 + ea) >> 2]) &&
                              ((q[(ba + 16) >> 2] = v), (q[(v + 24) >> 2] = ba)),
                            (v = q[(20 + ea) >> 2]) &&
                              ((q[(ba + 20) >> 2] = v), (q[(v + 24) >> 2] = ba)));
                        }
                      }
                      if (((q[(ca + 4) >> 2] = 1 | a), (q[(a + ca) >> 2] = a), q[2184] != (0 | ca)))
                        break f;
                      return void (q[2181] = a);
                    }
                    ((q[(4 + ea) >> 2] = -2 & ba),
                      (q[(ca + 4) >> 2] = 1 | a),
                      (q[(a + ca) >> 2] = a));
                  }
                  if (a >>> 0 <= 255)
                    return (
                      (ba = (8756 + ((a >>>= 3) << 3)) | 0),
                      (a =
                        (v = q[2179]) & (a = 1 << a) ? q[(ba + 8) >> 2] : ((q[2179] = a | v), ba)),
                      (q[(ba + 8) >> 2] = ca),
                      (q[(a + 12) >> 2] = ca),
                      (q[(ca + 12) >> 2] = ba),
                      void (q[(ca + 8) >> 2] = a)
                    );
                  ((q[(ca + 16) >> 2] = 0),
                    (v = q[(ca + 20) >> 2] = 0),
                    (da = a >>> 8) &&
                      ((v = 31),
                      16777215 < a >>> 0 ||
                        ((v = da),
                        (v =
                          (28 +
                            (((v =
                              ((((v =
                                (v <<= da = ((da + 1048320) >>> 16) & 8) <<
                                (ga = ((v + 520192) >>> 16) & 4)) <<
                                (fa = ((v + 245760) >>> 16) & 2)) >>>
                                15) -
                                (fa | da | ga)) |
                              0) <<
                              1) |
                              ((a >>> (v + 21)) & 1))) |
                          0))),
                    (fa = (9020 + ((q[((ba = ca) + 28) >> 2] = v) << 2)) | 0));
                  m: if ((da = q[2180]) & (ba = 1 << v)) {
                    ((da = a << (31 == (0 | v) ? 0 : (25 - (v >>> 1)) | 0)), (ba = q[fa >> 2]));
                    n: {
                      for (;;) {
                        if ((-8 & q[((v = ba) + 4) >> 2]) == (0 | a)) break n;
                        if (
                          ((ba = da >>> 29),
                          (da <<= 1),
                          !(ba = q[((fa = (v + (4 & ba)) | 0) + 16) >> 2]))
                        )
                          break;
                      }
                      ((q[(fa + 16) >> 2] = ca),
                        (q[(ca + 12) >> 2] = ca),
                        (q[(ca + 24) >> 2] = v),
                        (q[(ca + 8) >> 2] = ca));
                      break m;
                    }
                    ((a = q[(v + 8) >> 2]),
                      (q[(a + 12) >> 2] = ca),
                      (q[(v + 8) >> 2] = ca),
                      (q[(ca + 24) >> 2] = 0),
                      (q[(ca + 12) >> 2] = v),
                      (q[(ca + 8) >> 2] = a));
                  } else
                    ((q[2180] = ba | da),
                      (q[fa >> 2] = ca),
                      (q[(ca + 12) >> 2] = ca),
                      (q[(ca + 24) >> 2] = fa),
                      (q[(ca + 8) >> 2] = ca));
                  if (((a = (q[2187] + -1) | 0), !(q[2187] = a))) {
                    for (ca = 9172; ; ) if (((ca = ((a = q[ca >> 2]) + 8) | 0), !a)) break;
                    q[2187] = -1;
                  }
                }
              }
            }
            function qa(a) {
              var ta,
                ja = 0,
                ka = 0,
                la = 0,
                ma = 0,
                na = 0,
                oa = 0,
                pa = 0,
                qa = 0,
                ra = 0,
                sa = 0,
                va = 0;
              L = ta = (L - 16) | 0;
              a: {
                b: {
                  c: {
                    d: {
                      e: {
                        f: {
                          g: {
                            h: {
                              i: {
                                j: {
                                  k: {
                                    if (a >>> 0 <= 244) {
                                      if (
                                        3 &
                                        (ja =
                                          (na = q[2179]) >>>
                                          (a = (oa = a >>> 0 < 11 ? 16 : (a + 11) & -8) >>> 3))
                                      ) {
                                        ((a =
                                          ((ja =
                                            q[
                                              ((ma = (ka = (a + (1 & (-1 ^ ja))) | 0) << 3) +
                                                8764) >>
                                                2
                                            ]) +
                                            8) |
                                          0),
                                          (0 | (la = q[(ja + 8) >> 2])) ==
                                          (0 | (ma = (ma + 8756) | 0))
                                            ? ((va = vd(ka) & na), (q[8716 >> 2] = va))
                                            : ((q[(la + 12) >> 2] = ma), (q[(ma + 8) >> 2] = la)),
                                          (q[(ja + 4) >> 2] = 3 | (ka <<= 3)),
                                          (q[((ja = (ja + ka) | 0) + 4) >> 2] =
                                            1 | q[(ja + 4) >> 2]));
                                        break a;
                                      }
                                      if (oa >>> 0 <= (qa = q[2181]) >>> 0) break k;
                                      if (ja) {
                                        ((ka = ja =
                                          ((a =
                                            (((0 - (a = ((0 - (ka = 2 << a)) | ka) & (ja << a))) &
                                              a) -
                                              1) |
                                            0) >>>
                                            12) &
                                          16),
                                          (ja =
                                            q[
                                              ((la =
                                                (ka =
                                                  (((ka =
                                                    (ka |= ja = ((a >>>= ja) >>> 5) & 8) |
                                                    (ja = ((a >>>= ja) >>> 2) & 4) |
                                                    (ja = ((a >>>= ja) >>> 1) & 2)) |
                                                    (ja = ((a >>>= ja) >>> 1) & 1)) +
                                                    (a >>> ja)) |
                                                  0) << 3) +
                                                8764) >>
                                                2
                                            ]),
                                          (0 | (a = q[(ja + 8) >> 2])) ==
                                          (0 | (la = (la + 8756) | 0))
                                            ? ((na = vd(ka) & na), (q[2179] = na))
                                            : ((q[(a + 12) >> 2] = la), (q[(la + 8) >> 2] = a)),
                                          (a = (ja + 8) | 0),
                                          (q[(ja + 4) >> 2] = 3 | oa),
                                          (q[((pa = (ja + oa) | 0) + 4) >> 2] =
                                            1 | (ma = ((ka <<= 3) - oa) | 0)),
                                          (q[(ja + ka) >> 2] = ma),
                                          qa &&
                                            ((ja = (8756 + ((ka = qa >>> 3) << 3)) | 0),
                                            (la = q[2184]),
                                            (ka =
                                              (ka = 1 << ka) & na
                                                ? q[(ja + 8) >> 2]
                                                : ((q[2179] = ka | na), ja)),
                                            (q[(ja + 8) >> 2] = la),
                                            (q[(ka + 12) >> 2] = la),
                                            (q[(la + 12) >> 2] = ja),
                                            (q[(la + 8) >> 2] = ka)),
                                          (q[2184] = pa),
                                          (q[2181] = ma));
                                        break a;
                                      }
                                      if (!(sa = q[2180])) break k;
                                      for (
                                        ka = ja = ((a = ((sa & (0 - sa)) - 1) | 0) >>> 12) & 16,
                                          ja =
                                            q[
                                              (9020 +
                                                ((((ka =
                                                  (ka |= ja = ((a >>>= ja) >>> 5) & 8) |
                                                  (ja = ((a >>>= ja) >>> 2) & 4) |
                                                  (ja = ((a >>>= ja) >>> 1) & 2)) |
                                                  (ja = ((a >>>= ja) >>> 1) & 1)) +
                                                  (a >>> ja)) <<
                                                  2)) >>
                                                2
                                            ],
                                          la = ((-8 & q[(ja + 4) >> 2]) - oa) | 0,
                                          ka = ja;
                                        ;

                                      ) {
                                        if (!(a = (a = q[(ka + 16) >> 2]) || q[(ka + 20) >> 2]))
                                          break;
                                        ((la = (ka =
                                          (ma = ((-8 & q[(a + 4) >> 2]) - oa) | 0) >>> 0 < la >>> 0)
                                          ? ma
                                          : la),
                                          (ja = ka ? a : ja),
                                          (ka = a));
                                      }
                                      if (
                                        ((ra = q[(ja + 24) >> 2]),
                                        (0 | (ma = q[(ja + 12) >> 2])) != (0 | ja))
                                      ) {
                                        ((a = q[(ja + 8) >> 2]),
                                          (q[(a + 12) >> 2] = ma),
                                          (q[(ma + 8) >> 2] = a));
                                        break b;
                                      }
                                      if (!(a = q[(ka = (ja + 20) | 0) >> 2])) {
                                        if (!(a = q[(ja + 16) >> 2])) break j;
                                        ka = (ja + 16) | 0;
                                      }
                                      for (;;)
                                        if (
                                          ((pa = ka),
                                          !(
                                            (a = q[(ka = ((ma = a) + 20) | 0) >> 2]) ||
                                            ((ka = (ma + 16) | 0), (a = q[(ma + 16) >> 2]))
                                          ))
                                        )
                                          break;
                                      q[pa >> 2] = 0;
                                      break b;
                                    }
                                    if (
                                      ((oa = -1),
                                      !(4294967231 < a >>> 0) &&
                                        ((oa = -8 & (ja = (a + 11) | 0)), (qa = q[2180])))
                                    ) {
                                      ((ka = (0 - oa) | 0),
                                        (na = 0),
                                        (ja >>>= 8) &&
                                          ((na = 31),
                                          16777215 < oa >>> 0 ||
                                            (na =
                                              (28 +
                                                (((a =
                                                  ((((na =
                                                    (ja <<= la = ((ja + 1048320) >>> 16) & 8) <<
                                                    (a = ((ja + 520192) >>> 16) & 4)) <<
                                                    (ja = ((na + 245760) >>> 16) & 2)) >>>
                                                    15) -
                                                    (ja | a | la)) |
                                                  0) <<
                                                  1) |
                                                  ((oa >>> (a + 21)) & 1))) |
                                              0)));
                                      q: {
                                        r: {
                                          if ((la = q[(9020 + (na << 2)) >> 2]))
                                            for (
                                              ja =
                                                oa << (31 == (0 | na) ? 0 : (25 - (na >>> 1)) | 0),
                                                a = 0;
                                              ;

                                            ) {
                                              if (
                                                !(
                                                  ka >>> 0 <=
                                                    (pa = ((-8 & q[(la + 4) >> 2]) - oa) | 0) >>>
                                                      0 || ((ma = la), (ka = pa))
                                                )
                                              ) {
                                                ((ka = 0), (a = la));
                                                break r;
                                              }
                                              if (
                                                ((pa = q[(la + 20) >> 2]),
                                                (la =
                                                  q[(16 + ((((ja >>> 29) & 4) + la) | 0)) >> 2]),
                                                (a = !pa || (0 | pa) == (0 | la) ? a : pa),
                                                (ja <<= 0 != (0 | la)),
                                                !la)
                                              )
                                                break;
                                            }
                                          else a = 0;
                                          if (!(a | ma)) {
                                            if (!(a = ((0 - (a = 2 << na)) | a) & qa)) break k;
                                            ((la = ja =
                                              ((a = ((a & (0 - a)) - 1) | 0) >>> 12) & 16),
                                              (a =
                                                q[
                                                  (9020 +
                                                    ((((la =
                                                      (la |= ja = ((a >>>= ja) >>> 5) & 8) |
                                                      (ja = ((a >>>= ja) >>> 2) & 4) |
                                                      (ja = ((a >>>= ja) >>> 1) & 2)) |
                                                      (ja = ((a >>>= ja) >>> 1) & 1)) +
                                                      (a >>> ja)) <<
                                                      2)) >>
                                                    2
                                                ]));
                                          }
                                          if (!a) break q;
                                        }
                                        for (;;)
                                          if (
                                            ((ka = (ja =
                                              (la = ((-8 & q[(a + 4) >> 2]) - oa) | 0) >>> 0 <
                                              ka >>> 0)
                                              ? la
                                              : ka),
                                            (ma = ja ? a : ma),
                                            !(a = (ja = q[(a + 16) >> 2]) || q[(a + 20) >> 2]))
                                          )
                                            break;
                                      }
                                      if (!(!ma | (ka >>> 0 >= (q[2181] - oa) >>> 0))) {
                                        if (
                                          ((pa = q[(ma + 24) >> 2]),
                                          (0 | ma) != (0 | (ja = q[(ma + 12) >> 2])))
                                        ) {
                                          ((a = q[(ma + 8) >> 2]),
                                            (q[(a + 12) >> 2] = ja),
                                            (q[(ja + 8) >> 2] = a));
                                          break c;
                                        }
                                        if (!(a = q[(la = (ma + 20) | 0) >> 2])) {
                                          if (!(a = q[(ma + 16) >> 2])) break i;
                                          la = (ma + 16) | 0;
                                        }
                                        for (;;)
                                          if (
                                            ((na = la),
                                            !(
                                              (a = q[(la = ((ja = a) + 20) | 0) >> 2]) ||
                                              ((la = (ja + 16) | 0), (a = q[(ja + 16) >> 2]))
                                            ))
                                          )
                                            break;
                                        q[na >> 2] = 0;
                                        break c;
                                      }
                                    }
                                  }
                                  if (oa >>> 0 <= (ja = q[2181]) >>> 0) {
                                    ((a = q[2184]),
                                      16 <= (ka = (ja - oa) | 0) >>> 0
                                        ? ((q[2181] = ka),
                                          (q[2184] = la = (a + oa) | 0),
                                          (q[(la + 4) >> 2] = 1 | ka),
                                          (q[(a + ja) >> 2] = ka),
                                          (q[(a + 4) >> 2] = 3 | oa))
                                        : ((q[2184] = 0),
                                          (q[2181] = 0),
                                          (q[(a + 4) >> 2] = 3 | ja),
                                          (q[((ja = (a + ja) | 0) + 4) >> 2] =
                                            1 | q[(ja + 4) >> 2])),
                                      (a = (a + 8) | 0));
                                    break a;
                                  }
                                  if (oa >>> 0 < (la = q[2182]) >>> 0) {
                                    ((q[2182] = ja = (la - oa) | 0),
                                      (a = q[2185]),
                                      (q[2185] = ka = (a + oa) | 0),
                                      (q[(ka + 4) >> 2] = 1 | ja),
                                      (q[(a + 4) >> 2] = 3 | oa),
                                      (a = (a + 8) | 0));
                                    break a;
                                  }
                                  if (
                                    (ka =
                                      (na =
                                        ((ka = ma = (oa + 47) | (a = 0)) +
                                          (ja = q[2297]
                                            ? q[2299]
                                            : ((q[2300] = -1),
                                              (q[2301] = -1),
                                              (q[2298] = 4096),
                                              (q[2299] = 4096),
                                              (q[2297] = ((12 + ta) & -16) ^ 1431655768),
                                              (q[2302] = 0),
                                              (q[2290] = 0),
                                              4096))) |
                                        0) & (pa = (0 - ja) | 0)) >>>
                                      0 <=
                                    oa >>> 0
                                  )
                                    break a;
                                  if (
                                    (ja = q[2289]) &&
                                    ((ra = ((qa = q[2287]) + ka) | 0) >>> 0 <= qa >>> 0) |
                                      (ja >>> 0 < ra >>> 0)
                                  )
                                    break a;
                                  if (4 & r[9160]) break f;
                                  v: {
                                    w: {
                                      if ((ja = q[2185]))
                                        for (a = 9164; ; ) {
                                          if (
                                            ((qa = q[a >> 2]) + q[(a + 4) >> 2]) >>> 0 > ja >>> 0 &&
                                            qa >>> 0 <= ja >>> 0
                                          )
                                            break w;
                                          if (!(a = q[(a + 8) >> 2])) break;
                                        }
                                      if (-1 == (0 | (ja = fa(0)))) break g;
                                      if (
                                        ((na = ka),
                                        ((na =
                                          (la = ((a = q[2298]) + -1) | 0) & ja
                                            ? (((ka - ja) | 0) + ((ja + la) & (0 - a))) | 0
                                            : na) >>>
                                          0 <=
                                          oa >>> 0) |
                                          (2147483646 < na >>> 0))
                                      )
                                        break g;
                                      if (
                                        (a = q[2289]) &&
                                        ((pa = ((la = q[2287]) + na) | 0) >>> 0 <= la >>> 0) |
                                          (a >>> 0 < pa >>> 0)
                                      )
                                        break g;
                                      if ((0 | ja) != (0 | (a = fa(na)))) break v;
                                      break e;
                                    }
                                    if (2147483646 < (na = pa & (na - la)) >>> 0) break g;
                                    if ((0 | (ja = fa(na))) == ((q[a >> 2] + q[(a + 4) >> 2]) | 0))
                                      break h;
                                    a = ja;
                                  }
                                  if (
                                    !(
                                      ((oa + 48) >>> 0 <= na >>> 0) |
                                      (2147483646 < na >>> 0) |
                                      (-1 == (0 | (ja = a)))
                                    )
                                  ) {
                                    if (
                                      2147483646 <
                                      (a = ((a = q[2299]) + ((ma - na) | 0)) & (0 - a)) >>> 0
                                    )
                                      break e;
                                    if (-1 != (0 | fa(a))) {
                                      na = (a + na) | 0;
                                      break e;
                                    }
                                    fa((0 - na) | 0);
                                    break g;
                                  }
                                  if (-1 != (0 | ja)) break e;
                                  break g;
                                }
                                ma = 0;
                                break b;
                              }
                              ja = 0;
                              break c;
                            }
                            if (-1 != (0 | ja)) break e;
                          }
                          q[2290] = 4 | q[2290];
                        }
                        if (2147483646 < ka >>> 0) break d;
                        if (
                          ((ja = fa(ka)),
                          ((a = fa(0)) >>> 0 <= ja >>> 0) | (-1 == (0 | ja)) | (-1 == (0 | a)))
                        )
                          break d;
                        if ((na = (a - ja) | 0) >>> 0 <= (oa + 40) >>> 0) break d;
                      }
                      ((a = (q[2287] + na) | 0), (q[2287] = a) >>> 0 > t[2288] && (q[2288] = a));
                      x: {
                        y: {
                          z: {
                            if ((ka = q[2185])) {
                              for (a = 9164; ; ) {
                                if ((((la = q[a >> 2]) + (ma = q[(a + 4) >> 2])) | 0) == (0 | ja))
                                  break z;
                                if (!(a = q[(a + 8) >> 2])) break;
                              }
                              break y;
                            }
                            for (
                              ((a = q[2183]) >>> 0 <= ja >>> 0 && a) || (q[2183] = ja),
                                a = 0,
                                q[2292] = na,
                                q[2291] = ja,
                                q[2187] = -1,
                                q[2188] = q[2297],
                                q[2294] = 0;
                              ;

                            )
                              if (
                                ((q[((ka = a << 3) + 8764) >> 2] = la = (ka + 8756) | 0),
                                (q[(ka + 8768) >> 2] = la),
                                32 == (0 | (a = (a + 1) | 0)))
                              )
                                break;
                            ((q[2182] = la =
                              ((a = (na + -40) | 0) - (ka = (ja + 8) & 7 ? (-8 - ja) & 7 : 0)) | 0),
                              (q[2185] = ka = (ja + ka) | 0),
                              (q[(ka + 4) >> 2] = 1 | la),
                              (q[(4 + ((a + ja) | 0)) >> 2] = 40),
                              (q[2186] = q[2301]));
                            break x;
                          }
                          if (
                            !(
                              (8 & r[(a + 12) | 0]) |
                              (ja >>> 0 <= ka >>> 0) |
                              (ka >>> 0 < la >>> 0)
                            )
                          ) {
                            ((q[(a + 4) >> 2] = ma + na),
                              (q[2185] = ja = ((a = (ka + 8) & 7 ? (-8 - ka) & 7 : 0) + ka) | 0),
                              (la = (q[2182] + na) | 0),
                              (q[2182] = a = (la - a) | 0),
                              (q[(ja + 4) >> 2] = 1 | a),
                              (q[(4 + ((ka + la) | 0)) >> 2] = 40),
                              (q[2186] = q[2301]));
                            break x;
                          }
                        }
                        (ja >>> 0 < (ma = q[2183]) >>> 0 && ((q[2183] = ja), (ma = 0)),
                          (la = (ja + na) | 0),
                          (a = 9164));
                        A: {
                          B: {
                            C: {
                              D: {
                                E: {
                                  F: {
                                    for (;;) {
                                      if ((0 | la) == q[a >> 2]) break;
                                      if (!(a = q[(a + 8) >> 2])) break F;
                                    }
                                    if (!(8 & r[(a + 12) | 0])) break E;
                                  }
                                  for (a = 9164; ; ) {
                                    if (
                                      (la = q[a >> 2]) >>> 0 <= ka >>> 0 &&
                                      ka >>> 0 < (ma = (la + q[(a + 4) >> 2]) | 0) >>> 0
                                    )
                                      break D;
                                    a = q[(a + 8) >> 2];
                                  }
                                }
                                if (
                                  ((q[a >> 2] = ja),
                                  (q[(a + 4) >> 2] = q[(a + 4) >> 2] + na),
                                  (q[
                                    ((ra = (((ja + 8) & 7 ? (-8 - ja) & 7 : 0) + ja) | 0) + 4) >> 2
                                  ] = 3 | oa),
                                  (a =
                                    ((((ja = (la + ((la + 8) & 7 ? (-8 - la) & 7 : 0)) | 0) - ra) |
                                      0) -
                                      oa) |
                                    0),
                                  (pa = (oa + ra) | 0),
                                  (0 | ja) == (0 | ka))
                                ) {
                                  ((q[2185] = pa),
                                    (a = (q[2182] + a) | 0),
                                    (q[2182] = a),
                                    (q[(pa + 4) >> 2] = 1 | a));
                                  break B;
                                }
                                if (q[2184] == (0 | ja)) {
                                  ((q[2184] = pa),
                                    (a = (q[2181] + a) | 0),
                                    (q[2181] = a),
                                    (q[(pa + 4) >> 2] = 1 | a),
                                    (q[(a + pa) >> 2] = a));
                                  break B;
                                }
                                if (1 == (3 & (ka = q[(ja + 4) >> 2]))) {
                                  sa = -8 & ka;
                                  G: if (ka >>> 0 <= 255)
                                    ((ma = ka >>> 3),
                                      (ka = q[(ja + 8) >> 2]),
                                      (0 | (la = q[(ja + 12) >> 2])) == (0 | ka)
                                        ? ((va = q[2179] & vd(ma)), (q[8716 >> 2] = va))
                                        : ((q[(ka + 12) >> 2] = la), (q[(la + 8) >> 2] = ka)));
                                  else {
                                    if (
                                      ((qa = q[(ja + 24) >> 2]),
                                      (0 | (na = q[(ja + 12) >> 2])) != (0 | ja))
                                    )
                                      ((ka = q[(ja + 8) >> 2]),
                                        (q[(ka + 12) >> 2] = na),
                                        (q[(na + 8) >> 2] = ka));
                                    else if (
                                      (oa = q[(la = (ja + 20) | 0) >> 2]) ||
                                      (oa = q[(la = (ja + 16) | 0) >> 2])
                                    ) {
                                      for (;;)
                                        if (
                                          ((ka = la),
                                          !(
                                            (oa = q[(la = ((na = oa) + 20) | 0) >> 2]) ||
                                            ((la = (na + 16) | 0), (oa = q[(na + 16) >> 2]))
                                          ))
                                        )
                                          break;
                                      q[ka >> 2] = 0;
                                    } else na = 0;
                                    if (qa) {
                                      ka = q[(ja + 28) >> 2];
                                      J: {
                                        if (q[(la = (9020 + (ka << 2)) | 0) >> 2] == (0 | ja)) {
                                          if ((q[la >> 2] = na)) break J;
                                          ((va = q[2180] & vd(ka)), (q[8720 >> 2] = va));
                                          break G;
                                        }
                                        if (
                                          !(q[
                                            (qa + (q[(qa + 16) >> 2] == (0 | ja) ? 16 : 20)) >> 2
                                          ] = na)
                                        )
                                          break G;
                                      }
                                      ((q[(na + 24) >> 2] = qa),
                                        (ka = q[(ja + 16) >> 2]) &&
                                          ((q[(na + 16) >> 2] = ka), (q[(ka + 24) >> 2] = na)),
                                        (ka = q[(ja + 20) >> 2]) &&
                                          ((q[(na + 20) >> 2] = ka), (q[(ka + 24) >> 2] = na)));
                                    }
                                  }
                                  ((ja = (ja + sa) | 0), (a = (a + sa) | 0));
                                }
                                if (
                                  ((q[(ja + 4) >> 2] = -2 & q[(ja + 4) >> 2]),
                                  (q[(pa + 4) >> 2] = 1 | a),
                                  (q[(a + pa) >> 2] = a) >>> 0 <= 255)
                                ) {
                                  ((a = (8756 + ((ja = a >>> 3) << 3)) | 0),
                                    (ja =
                                      (ka = q[2179]) & (ja = 1 << ja)
                                        ? q[(a + 8) >> 2]
                                        : ((q[2179] = ja | ka), a)),
                                    (q[(a + 8) >> 2] = pa),
                                    (q[(ja + 12) >> 2] = pa),
                                    (q[(pa + 12) >> 2] = a),
                                    (q[(pa + 8) >> 2] = ja));
                                  break B;
                                }
                                if (
                                  ((ja = 0),
                                  (la = a >>> 8) &&
                                    ((ja = 31),
                                    16777215 < a >>> 0 ||
                                      (ja =
                                        (28 +
                                          (((ja =
                                            ((((oa =
                                              (la <<= ma = ((la + 1048320) >>> 16) & 8) <<
                                              (ja = ((la + 520192) >>> 16) & 4)) <<
                                              (la = ((oa + 245760) >>> 16) & 2)) >>>
                                              15) -
                                              (la | ja | ma)) |
                                            0) <<
                                            1) |
                                            ((a >>> (ja + 21)) & 1))) |
                                        0)),
                                  (q[((ka = pa) + 28) >> 2] = ja),
                                  (q[(pa + 16) >> 2] = 0),
                                  (ka = (9020 + (ja << 2)) | (q[(pa + 20) >> 2] = 0)),
                                  (la = q[2180]) & (ma = 1 << ja))
                                ) {
                                  for (
                                    la = a << (31 == (0 | ja) ? 0 : (25 - (ja >>> 1)) | 0),
                                      ja = q[ka >> 2];
                                    ;

                                  ) {
                                    if ((-8 & q[((ka = ja) + 4) >> 2]) == (0 | a)) break C;
                                    if (
                                      ((ja = la >>> 29),
                                      (la <<= 1),
                                      !(ja = q[((ma = ((4 & ja) + ka) | 0) + 16) >> 2]))
                                    )
                                      break;
                                  }
                                  q[(ma + 16) >> 2] = pa;
                                } else ((q[2180] = la | ma), (q[ka >> 2] = pa));
                                ((q[(pa + 24) >> 2] = ka),
                                  (q[(pa + 12) >> 2] = pa),
                                  (q[(pa + 8) >> 2] = pa));
                                break B;
                              }
                              for (
                                q[2182] = pa =
                                  ((a = (na + -40) | 0) - (la = (ja + 8) & 7 ? (-8 - ja) & 7 : 0)) |
                                  0,
                                  q[2185] = la = (ja + la) | 0,
                                  q[(la + 4) >> 2] = 1 | pa,
                                  q[(4 + ((a + ja) | 0)) >> 2] = 40,
                                  q[2186] = q[2301],
                                  q[
                                    ((la =
                                      (a =
                                        (((ma + ((ma + -39) & 7 ? (39 - ma) & 7 : 0)) | 0) - 47) |
                                        0) >>>
                                        0 <
                                      (ka + 16) >>> 0
                                        ? ka
                                        : a) +
                                      4) >>
                                      2
                                  ] = 27,
                                  a = q[2294],
                                  q[(la + 16) >> 2] = q[2293],
                                  q[(la + 20) >> 2] = a,
                                  a = q[2292],
                                  q[(la + 8) >> 2] = q[2291],
                                  q[(la + 12) >> 2] = a,
                                  q[2293] = la + 8,
                                  q[2292] = na,
                                  q[2291] = ja,
                                  a = (la + 24) | (q[2294] = 0);
                                ;

                              )
                                if (
                                  ((q[(a + 4) >> 2] = 7),
                                  (ja = (a + 8) | 0),
                                  (a = (a + 4) | 0),
                                  !(ja >>> 0 < ma >>> 0))
                                )
                                  break;
                              if ((0 | ka) == (0 | la)) break x;
                              if (
                                ((q[(la + 4) >> 2] = -2 & q[(la + 4) >> 2]),
                                (q[(ka + 4) >> 2] = 1 | (ma = (la - ka) | 0)),
                                (q[la >> 2] = ma) >>> 0 <= 255)
                              ) {
                                ((a = (8756 + ((ja = ma >>> 3) << 3)) | 0),
                                  (ja =
                                    (la = q[2179]) & (ja = 1 << ja)
                                      ? q[(a + 8) >> 2]
                                      : ((q[2179] = ja | la), a)),
                                  (q[(a + 8) >> 2] = ka),
                                  (q[(ja + 12) >> 2] = ka),
                                  (q[(ka + 12) >> 2] = a),
                                  (q[(ka + 8) >> 2] = ja));
                                break x;
                              }
                              if (
                                ((q[(ka + 16) >> 2] = 0),
                                (a = q[(ka + 20) >> 2] = 0),
                                (la = ma >>> 8) &&
                                  ((a = 31),
                                  16777215 < ma >>> 0 ||
                                    (a =
                                      (28 +
                                        (((a =
                                          ((((pa =
                                            (la <<= na = ((la + 1048320) >>> 16) & 8) <<
                                            (a = ((la + 520192) >>> 16) & 4)) <<
                                            (la = ((pa + 245760) >>> 16) & 2)) >>>
                                            15) -
                                            (la | a | na)) |
                                          0) <<
                                          1) |
                                          ((ma >>> (a + 21)) & 1))) |
                                      0)),
                                (ja = (9020 + ((q[((ja = ka) + 28) >> 2] = a) << 2)) | 0),
                                (la = q[2180]) & (na = 1 << a))
                              ) {
                                for (
                                  a = ma << (31 == (0 | a) ? 0 : (25 - (a >>> 1)) | 0),
                                    ja = q[ja >> 2];
                                  ;

                                ) {
                                  if ((0 | ma) == (-8 & q[((la = ja) + 4) >> 2])) break A;
                                  if (
                                    ((ja = a >>> 29),
                                    (a <<= 1),
                                    !(ja = q[((na = (la + (4 & ja)) | 0) + 16) >> 2]))
                                  )
                                    break;
                                }
                                ((q[(na + 16) >> 2] = ka), (q[(ka + 24) >> 2] = la));
                              } else
                                ((q[2180] = la | na), (q[ja >> 2] = ka), (q[(ka + 24) >> 2] = ja));
                              ((q[(ka + 12) >> 2] = ka), (q[(ka + 8) >> 2] = ka));
                              break x;
                            }
                            ((a = q[(ka + 8) >> 2]),
                              (q[(a + 12) >> 2] = pa),
                              (q[(ka + 8) >> 2] = pa),
                              (q[(pa + 24) >> 2] = 0),
                              (q[(pa + 12) >> 2] = ka),
                              (q[(pa + 8) >> 2] = a));
                          }
                          a = (ra + 8) | 0;
                          break a;
                        }
                        ((a = q[(la + 8) >> 2]),
                          (q[(a + 12) >> 2] = ka),
                          (q[(la + 8) >> 2] = ka),
                          (q[(ka + 24) >> 2] = 0),
                          (q[(ka + 12) >> 2] = la),
                          (q[(ka + 8) >> 2] = a));
                      }
                      if (!((a = q[2182]) >>> 0 <= oa >>> 0)) {
                        ((q[2182] = ja = (a - oa) | 0),
                          (a = q[2185]),
                          (q[2185] = ka = (a + oa) | 0),
                          (q[(ka + 4) >> 2] = 1 | ja),
                          (q[(a + 4) >> 2] = 3 | oa),
                          (a = (a + 8) | 0));
                        break a;
                      }
                    }
                    ((q[2178] = 48), (a = 0));
                    break a;
                  }
                  Q: if (pa) {
                    a = q[(ma + 28) >> 2];
                    R: {
                      if (q[(la = (9020 + (a << 2)) | 0) >> 2] == (0 | ma)) {
                        if ((q[la >> 2] = ja)) break R;
                        ((qa = vd(a) & qa), (q[2180] = qa));
                        break Q;
                      }
                      if (!(q[(pa + (q[(pa + 16) >> 2] == (0 | ma) ? 16 : 20)) >> 2] = ja)) break Q;
                    }
                    ((q[(ja + 24) >> 2] = pa),
                      (a = q[(ma + 16) >> 2]) && ((q[(ja + 16) >> 2] = a), (q[(a + 24) >> 2] = ja)),
                      (a = q[(ma + 20) >> 2]) &&
                        ((q[(ja + 20) >> 2] = a), (q[(a + 24) >> 2] = ja)));
                  }
                  S: if (ka >>> 0 <= 15)
                    ((q[(ma + 4) >> 2] = 3 | (a = (ka + oa) | 0)),
                      (q[((a = (a + ma) | 0) + 4) >> 2] = 1 | q[(a + 4) >> 2]));
                  else if (
                    ((q[(ma + 4) >> 2] = 3 | oa),
                    (q[((la = (ma + oa) | 0) + 4) >> 2] = 1 | ka),
                    (q[(ka + la) >> 2] = ka) >>> 0 <= 255)
                  )
                    ((a = (8756 + ((ja = ka >>> 3) << 3)) | 0),
                      (ja =
                        (ka = q[2179]) & (ja = 1 << ja)
                          ? q[(a + 8) >> 2]
                          : ((q[2179] = ja | ka), a)),
                      (q[(a + 8) >> 2] = la),
                      (q[(ja + 12) >> 2] = la),
                      (q[(la + 12) >> 2] = a),
                      (q[(la + 8) >> 2] = ja));
                  else {
                    ((a = 0),
                      (oa = ka >>> 8) &&
                        ((a = 31),
                        16777215 < ka >>> 0 ||
                          (a =
                            (28 +
                              (((a =
                                ((((pa =
                                  (oa <<= na = ((oa + 1048320) >>> 16) & 8) <<
                                  (a = ((oa + 520192) >>> 16) & 4)) <<
                                  (oa = ((pa + 245760) >>> 16) & 2)) >>>
                                  15) -
                                  (oa | a | na)) |
                                0) <<
                                1) |
                                ((ka >>> (a + 21)) & 1))) |
                            0)),
                      (q[((ja = la) + 28) >> 2] = a),
                      (q[(la + 16) >> 2] = 0),
                      (ja = (9020 + (a << 2)) | (q[(la + 20) >> 2] = 0)));
                    V: {
                      if ((oa = 1 << a) & qa) {
                        for (
                          a = ka << (31 == (0 | a) ? 0 : (25 - (a >>> 1)) | 0), oa = q[ja >> 2];
                          ;

                        ) {
                          if ((-8 & q[((ja = oa) + 4) >> 2]) == (0 | ka)) break V;
                          if (
                            ((oa = a >>> 29),
                            (a <<= 1),
                            !(oa = q[((na = ((4 & oa) + ja) | 0) + 16) >> 2]))
                          )
                            break;
                        }
                        q[(na + 16) >> 2] = la;
                      } else ((q[2180] = oa | qa), (q[ja >> 2] = la));
                      ((q[(la + 24) >> 2] = ja), (q[(la + 12) >> 2] = la), (q[(la + 8) >> 2] = la));
                      break S;
                    }
                    ((a = q[(ja + 8) >> 2]),
                      (q[(a + 12) >> 2] = la),
                      (q[(ja + 8) >> 2] = la),
                      (q[(la + 24) >> 2] = 0),
                      (q[(la + 12) >> 2] = ja),
                      (q[(la + 8) >> 2] = a));
                  }
                  a = (ma + 8) | 0;
                  break a;
                }
                X: if (ra) {
                  a = q[(ja + 28) >> 2];
                  Y: {
                    if (q[(ka = (9020 + (a << 2)) | 0) >> 2] == (0 | ja)) {
                      if ((q[ka >> 2] = ma)) break Y;
                      ((va = vd(a) & sa), (q[8720 >> 2] = va));
                      break X;
                    }
                    if (!(q[(ra + (q[(ra + 16) >> 2] == (0 | ja) ? 16 : 20)) >> 2] = ma)) break X;
                  }
                  ((q[(ma + 24) >> 2] = ra),
                    (a = q[(ja + 16) >> 2]) && ((q[(ma + 16) >> 2] = a), (q[(a + 24) >> 2] = ma)),
                    (a = q[(ja + 20) >> 2]) && ((q[(ma + 20) >> 2] = a), (q[(a + 24) >> 2] = ma)));
                }
                (la >>> 0 <= 15
                  ? ((q[(ja + 4) >> 2] = 3 | (a = (la + oa) | 0)),
                    (q[((a = (a + ja) | 0) + 4) >> 2] = 1 | q[(a + 4) >> 2]))
                  : ((q[(ja + 4) >> 2] = 3 | oa),
                    (q[((oa = (ja + oa) | 0) + 4) >> 2] = 1 | la),
                    (q[(la + oa) >> 2] = la),
                    qa &&
                      ((a = (8756 + ((ka = qa >>> 3) << 3)) | 0),
                      (ma = q[2184]),
                      (ka = (ka = 1 << ka) & na ? q[(a + 8) >> 2] : ((q[2179] = ka | na), a)),
                      (q[(a + 8) >> 2] = ma),
                      (q[(ka + 12) >> 2] = ma),
                      (q[(ma + 12) >> 2] = a),
                      (q[(ma + 8) >> 2] = ka)),
                    (q[2184] = oa),
                    (q[2181] = la)),
                  (a = (ja + 8) | 0));
              }
              return ((L = (16 + ta) | 0), a);
            }
            function ra(a, wa, xa, ya, za, Aa, Ba) {
              var Ra,
                Ua,
                Ca,
                Ga = 0,
                Ha = 0,
                Ia = 0,
                Ja = 0,
                La = 0,
                Ma = 0,
                Na = 0,
                Oa = 0,
                Pa = 0,
                Qa = 0,
                Sa = 0,
                Ta = 0;
              ((q[(76 + (L = Ca = (L - 80) | 0)) >> 2] = wa),
                (Ua = (55 + Ca) | 0),
                (Ra = (56 + Ca) | 0),
                (wa = 0));
              a: {
                b: {
                  c: for (;;) {
                    (0 | Pa) < 0 ||
                      (Pa =
                        ((2147483647 - Pa) | 0) < (0 | wa) ? ((q[2178] = 61), -1) : (wa + Pa) | 0);
                    e: {
                      f: {
                        g: {
                          h: {
                            i: {
                              j: {
                                k: {
                                  l: {
                                    m: {
                                      n: {
                                        o: {
                                          p: {
                                            q: {
                                              if (
                                                ((Ja = q[(76 + Ca) >> 2]), (Ia = r[0 | (wa = Ja)]))
                                              ) {
                                                for (;;) {
                                                  r: {
                                                    s: {
                                                      t: if ((Ga = 255 & Ia)) {
                                                        if (37 != (0 | Ga)) break s;
                                                        for (Ia = wa; ; ) {
                                                          if (37 != r[(wa + 1) | 0]) break t;
                                                          if (
                                                            ((q[(76 + Ca) >> 2] = Ga =
                                                              (wa + 2) | 0),
                                                            (Ia = (Ia + 1) | 0),
                                                            (Ha = r[(wa + 2) | 0]),
                                                            (wa = Ga),
                                                            37 != (0 | Ha))
                                                          )
                                                            break;
                                                        }
                                                      } else Ia = wa;
                                                      if (
                                                        ((wa = (Ia - Ja) | 0),
                                                        a && Z(a, Ja, wa),
                                                        wa)
                                                      )
                                                        continue c;
                                                      ((Qa = -1),
                                                        (La = !ha(
                                                          o[
                                                            (q[(76 + (Ga = Ca)) >> 2] + (Ia = 1)) |
                                                              0
                                                          ]
                                                        )),
                                                        (wa = q[(76 + Ca) >> 2]),
                                                        La | (36 != r[(wa + 2) | 0]) ||
                                                          ((Qa = (o[(wa + 1) | 0] + -48) | 0),
                                                          (Sa = 1),
                                                          (Ia = 3)),
                                                        (q[(Ga + 76) >> 2] = wa = (Ia + wa) | 0));
                                                      u: if (
                                                        31 <
                                                        (Ha =
                                                          ((Na = o[(Ia = 0) | wa]) + -32) | 0) >>>
                                                          0
                                                      )
                                                        Ga = wa;
                                                      else if (((Ga = wa), 75913 & (Ha = 1 << Ha)))
                                                        for (;;) {
                                                          if (
                                                            ((q[(76 + Ca) >> 2] = Ga =
                                                              (wa + 1) | 0),
                                                            (Ia |= Ha),
                                                            31 <
                                                              (Ha =
                                                                ((Na = o[(wa + 1) | 0]) + -32) |
                                                                0) >>>
                                                                0)
                                                          )
                                                            break u;
                                                          if (
                                                            ((wa = Ga), !(75913 & (Ha = 1 << Ha)))
                                                          )
                                                            break;
                                                        }
                                                      if (42 == (0 | Na)) {
                                                        if (
                                                          ((La = Ca),
                                                          ha(o[(Ga + 1) | 0]) &&
                                                            ((wa = q[(76 + Ca) >> 2]),
                                                            36 == r[(wa + 2) | 0]))
                                                        )
                                                          ((q[
                                                            ((((o[(wa + 1) | 0] << 2) + za) | 0) -
                                                              192) >>
                                                              2
                                                          ] = 10),
                                                            (Oa =
                                                              q[
                                                                ((((o[(wa + 1) | 0] << 3) + ya) |
                                                                  0) -
                                                                  384) >>
                                                                  2
                                                              ]),
                                                            (Sa = 1),
                                                            (wa = (wa + 3) | 0));
                                                        else {
                                                          if (Sa) break b;
                                                          ((Oa = Sa = 0),
                                                            a &&
                                                              ((wa = q[xa >> 2]),
                                                              (q[xa >> 2] = wa + 4),
                                                              (Oa = q[wa >> 2])),
                                                            (wa = (q[(76 + Ca) >> 2] + 1) | 0));
                                                        }
                                                        ((q[(La + 76) >> 2] = wa),
                                                          -1 < (0 | Oa) ||
                                                            ((Oa = (0 - Oa) | 0), (Ia |= 8192)));
                                                      } else {
                                                        if ((0 | (Oa = Fa((76 + Ca) | 0))) < 0)
                                                          break b;
                                                        wa = q[(76 + Ca) >> 2];
                                                      }
                                                      if (((Ha = -1), 46 == r[0 | wa]))
                                                        if (42 == r[(wa + 1) | 0])
                                                          if (
                                                            ha(o[(wa + 2) | 0]) &&
                                                            ((wa = q[(76 + Ca) >> 2]),
                                                            36 == r[(wa + 3) | 0])
                                                          )
                                                            ((q[
                                                              ((((o[(wa + 2) | 0] << 2) + za) | 0) -
                                                                192) >>
                                                                2
                                                            ] = 10),
                                                              (Ha =
                                                                q[
                                                                  ((((o[(wa + 2) | 0] << 3) + ya) |
                                                                    0) -
                                                                    384) >>
                                                                    2
                                                                ]),
                                                              (q[(76 + Ca) >> 2] = wa =
                                                                (wa + 4) | 0));
                                                          else {
                                                            if (Sa) break b;
                                                            ((Ha = a
                                                              ? ((wa = q[xa >> 2]),
                                                                (q[xa >> 2] = wa + 4),
                                                                q[wa >> 2])
                                                              : 0),
                                                              (wa = (q[(76 + Ca) >> 2] + 2) | 0),
                                                              (q[(76 + Ca) >> 2] = wa));
                                                          }
                                                        else
                                                          ((q[(76 + Ca) >> 2] = wa + 1),
                                                            (Ha = Fa((76 + Ca) | 0)),
                                                            (wa = q[(76 + Ca) >> 2]));
                                                      for (Ga = 0; ; ) {
                                                        if (
                                                          ((Ta = Ga),
                                                          (Ma = -1),
                                                          57 < (o[0 | wa] + -65) >>> 0)
                                                        )
                                                          break a;
                                                        if (
                                                          ((q[(76 + Ca) >> 2] = Na = (wa + 1) | 0),
                                                          (Ga = o[0 | wa]),
                                                          (wa = Na),
                                                          !(
                                                            ((Ga =
                                                              r[
                                                                (3663 + ((Ga + w(Ta, 58)) | 0)) | 0
                                                              ]) +
                                                              -1) >>>
                                                              0 <
                                                            8
                                                          ))
                                                        )
                                                          break;
                                                      }
                                                      if (!Ga) break a;
                                                      A: {
                                                        B: {
                                                          C: {
                                                            if (19 == (0 | Ga)) {
                                                              if ((0 | Qa) <= -1) break C;
                                                              break a;
                                                            }
                                                            if ((0 | Qa) < 0) break B;
                                                            ((q[((Qa << 2) + za) >> 2] = Ga),
                                                              (Ga =
                                                                q[
                                                                  ((wa = ((Qa << 3) + ya) | 0) +
                                                                    4) >>
                                                                    2
                                                                ]),
                                                              (q[(64 + Ca) >> 2] = q[wa >> 2]),
                                                              (q[(68 + Ca) >> 2] = Ga));
                                                          }
                                                          if (((wa = 0), a)) break A;
                                                          continue c;
                                                        }
                                                        if (!a) break e;
                                                        (Ea((Ca + 64) | 0, Ga, xa, Ba),
                                                          (Na = q[(76 + Ca) >> 2]));
                                                      }
                                                      if (
                                                        ((La = -65537 & Ia),
                                                        (Ia = 8192 & Ia ? La : Ia),
                                                        (Qa = 3704),
                                                        (Ga = Ra),
                                                        (wa = o[(Na + -1) | (Ma = 0)]),
                                                        (Na =
                                                          ((wa =
                                                            Ta && 3 == (15 & wa) ? -33 & wa : wa) +
                                                            -88) |
                                                          0) >>>
                                                          0 <=
                                                          32)
                                                      )
                                                        break r;
                                                      D: {
                                                        E: {
                                                          F: {
                                                            G: {
                                                              if (6 < (La = (wa + -65) | 0) >>> 0) {
                                                                if (83 != (0 | wa)) break f;
                                                                if (!Ha) break G;
                                                                Ga = q[(64 + Ca) >> 2];
                                                                break E;
                                                              }
                                                              switch ((La - 1) | 0) {
                                                                case 1:
                                                                  break F;
                                                                case 0:
                                                                case 2:
                                                                  break f;
                                                                default:
                                                                  break q;
                                                              }
                                                            }
                                                            _(a, 32, Oa, (wa = 0), Ia);
                                                            break D;
                                                          }
                                                          ((q[(12 + Ca) >> 2] = 0),
                                                            (q[(8 + Ca) >> 2] = q[(64 + Ca) >> 2]),
                                                            (q[(64 + Ca) >> 2] = 8 + Ca),
                                                            (Ha = -1),
                                                            (Ga = (8 + Ca) | 0));
                                                        }
                                                        wa = 0;
                                                        H: {
                                                          for (;;) {
                                                            if (!(Ja = q[Ga >> 2])) break H;
                                                            if (
                                                              (La =
                                                                (0 | (Ja = Da((4 + Ca) | 0, Ja))) <
                                                                0) |
                                                              ((Ha - wa) >>> 0 < Ja >>> 0)
                                                            )
                                                              break;
                                                            if (
                                                              ((Ga = (Ga + 4) | 0),
                                                              !(
                                                                (wa = (wa + Ja) | 0) >>> 0 <
                                                                Ha >>> 0
                                                              ))
                                                            )
                                                              break H;
                                                          }
                                                          if (((Ma = -1), La)) break a;
                                                        }
                                                        if ((_(a, 32, Oa, wa, Ia), wa))
                                                          for (Ha = 0, Ga = q[(64 + Ca) >> 2]; ; ) {
                                                            if (!(Ja = q[Ga >> 2])) break D;
                                                            if (
                                                              (0 | wa) <
                                                              (0 |
                                                                (Ha =
                                                                  ((Ja = Da((4 + Ca) | 0, Ja)) +
                                                                    Ha) |
                                                                  0))
                                                            )
                                                              break D;
                                                            if (
                                                              (Z(a, (4 + Ca) | 0, Ja),
                                                              (Ga = (Ga + 4) | 0),
                                                              !(Ha >>> 0 < wa >>> 0))
                                                            )
                                                              break;
                                                          }
                                                        else wa = 0;
                                                      }
                                                      (_(a, 32, Oa, wa, 8192 ^ Ia),
                                                        (wa = (0 | wa) < (0 | Oa) ? Oa : wa));
                                                      continue c;
                                                    }
                                                    ((q[(76 + Ca) >> 2] = Ga = (wa + 1) | 0),
                                                      (Ia = r[(wa + 1) | 0]),
                                                      (wa = Ga));
                                                    continue;
                                                  }
                                                  break;
                                                }
                                                switch ((Na - 1) | 0) {
                                                  case 28:
                                                    break i;
                                                  case 21:
                                                    break j;
                                                  case 23:
                                                    break l;
                                                  case 22:
                                                    break m;
                                                  case 11:
                                                  case 16:
                                                    break n;
                                                  case 10:
                                                    break o;
                                                  case 26:
                                                    break p;
                                                  case 8:
                                                  case 12:
                                                  case 13:
                                                  case 14:
                                                    break q;
                                                  case 0:
                                                  case 1:
                                                  case 2:
                                                  case 3:
                                                  case 4:
                                                  case 5:
                                                  case 6:
                                                  case 7:
                                                  case 9:
                                                  case 15:
                                                  case 17:
                                                  case 18:
                                                  case 19:
                                                  case 20:
                                                  case 24:
                                                  case 25:
                                                  case 27:
                                                  case 29:
                                                  case 30:
                                                    break f;
                                                  default:
                                                    break k;
                                                }
                                              }
                                              if (((Ma = Pa), a)) break a;
                                              if (!Sa) break e;
                                              for (wa = 1; ; ) {
                                                if ((a = q[((wa << 2) + za) >> 2])) {
                                                  if (
                                                    (Ea(((wa << 3) + ya) | 0, a, xa, Ba),
                                                    10 != (0 | (wa = (wa + (Ma = 1)) | 0)))
                                                  )
                                                    continue;
                                                  break a;
                                                }
                                                break;
                                              }
                                              if (((Ma = 1), 9 < wa >>> 0)) break a;
                                              if (((Ma = -1), q[((wa << 2) + za) >> 2])) break a;
                                              for (;;)
                                                if (
                                                  q[(((wa = (wa + 1) | 0) << 2) + za) >> 2] ||
                                                  10 == (0 | wa)
                                                )
                                                  break;
                                              Ma = wa >>> 0 < 10 ? -1 : 1;
                                              break a;
                                            }
                                            wa = 0 | n[Aa](a, v[(64 + Ca) >> 3], Oa, Ha, Ia, wa);
                                            continue;
                                          }
                                          ((Ga =
                                            (wa = Ka(
                                              (Ja = (wa = q[(64 + Ca) >> 2]) || 3714),
                                              Ha
                                            )) || (Ha + Ja) | 0),
                                            (Ia = La),
                                            (Ha = wa ? (wa - Ja) | 0 : Ha));
                                          break f;
                                        }
                                        ((o[(55 + Ca) | 0] = q[(64 + Ca) >> 2]),
                                          (Ha = 1),
                                          (Ja = Ua),
                                          (Ia = La));
                                        break f;
                                      }
                                      if (
                                        ((wa = La = q[(68 + Ca) >> 2]),
                                        (Ja = q[(64 + Ca) >> 2]),
                                        (0 | wa) < -1 ||
                                          ((0 | wa) <= -1 && !(4294967295 < Ja >>> 0)))
                                      ) {
                                        ((wa = (0 - ((wa + (0 < Ja >>> 0)) | 0)) | 0),
                                          (q[(64 + Ca) >> 2] = Ja = (0 - Ja) | 0),
                                          (q[(68 + Ca) >> 2] = wa),
                                          (Ma = 1),
                                          (Qa = 3704));
                                        break h;
                                      }
                                      if (2048 & Ia) {
                                        ((Ma = 1), (Qa = 3705));
                                        break h;
                                      }
                                      Qa = (Ma = 1 & Ia) ? 3706 : 3704;
                                      break h;
                                    }
                                    if (
                                      ((Ja = (function (a, ok, Al) {
                                        if (a | ok)
                                          for (;;)
                                            if (
                                              ((o[0 | (Al = (Al + -1) | 0)] = (7 & a) | 48),
                                              !((a = ((7 & ok) << 29) | (a >>> 3)) | (ok >>>= 3)))
                                            )
                                              break;
                                        return Al;
                                      })(q[(64 + Ca) >> 2], q[(68 + Ca) >> 2], Ra)),
                                      !(8 & Ia))
                                    )
                                      break g;
                                    Ha = (0 | (wa = (Ra - Ja) | 0)) < (0 | Ha) ? Ha : (wa + 1) | 0;
                                    break g;
                                  }
                                  ((Ha = 8 < Ha >>> 0 ? Ha : 8), (Ia |= 8), (wa = 120));
                                }
                                if (
                                  ((Ja = (function (a, ok, Al, Bl) {
                                    if (a | ok)
                                      for (;;)
                                        if (
                                          ((o[0 | (Al = (Al + -1) | 0)] =
                                            r[(4192 + (15 & a)) | 0] | Bl),
                                          !((a = ((15 & ok) << 28) | (a >>> 4)) | (ok >>>= 4)))
                                        )
                                          break;
                                    return Al;
                                  })(q[(64 + Ca) >> 2], q[(68 + Ca) >> 2], Ra, 32 & wa)),
                                  !(8 & Ia) | !(q[(64 + Ca) >> 2] | q[(68 + Ca) >> 2]))
                                )
                                  break g;
                                ((Qa = (3704 + (wa >>> 4)) | 0), (Ma = 2));
                                break g;
                              }
                              if (7 < (Ga = 255 & Ta) >>> (wa = 0)) continue;
                              I: switch ((Ga - 1) | 0) {
                                default:
                                case 0:
                                  q[q[(64 + Ca) >> 2] >> 2] = Pa;
                                  continue;
                                case 1:
                                  ((Ga = q[(64 + Ca) >> 2]),
                                    (q[Ga >> 2] = Pa),
                                    (q[(Ga + 4) >> 2] = Pa >> 31));
                                  continue;
                                case 2:
                                  p[q[(64 + Ca) >> 2] >> 1] = Pa;
                                  continue;
                                case 3:
                                  o[q[(64 + Ca) >> 2]] = Pa;
                                  continue;
                                case 5:
                                  q[q[(64 + Ca) >> 2] >> 2] = Pa;
                                  continue;
                                case 4:
                                  continue;
                                case 6:
                                  break I;
                              }
                              ((Ga = q[(64 + Ca) >> 2]),
                                (q[Ga >> 2] = Pa),
                                (q[(Ga + 4) >> 2] = Pa >> 31));
                              continue;
                            }
                            ((Ja = q[(64 + Ca) >> 2]), (wa = q[(68 + Ca) >> 2]), (Qa = 3704));
                          }
                          Ja = ga(Ja, wa, Ra);
                        }
                        ((Ia = -1 < (0 | Ha) ? -65537 & Ia : Ia),
                          (Ha =
                            !!((La = wa = q[(68 + Ca) >> 2]) | (Na = q[(64 + Ca) >> 2])) | Ha
                              ? (0 | (wa = (!(La | Na) + ((Ra - Ja) | 0)) | 0)) < (0 | Ha)
                                ? Ha
                                : wa
                              : ((Ja = Ra), 0)));
                      }
                      (_(
                        a,
                        32,
                        (wa =
                          (0 | Oa) <
                          (0 |
                            (Ga =
                              ((Ha = (0 | Ha) < (0 | (La = (Ga - Ja) | 0)) ? La : Ha) + Ma) | 0))
                            ? Ga
                            : Oa),
                        Ga,
                        Ia
                      ),
                        Z(a, Qa, Ma),
                        _(a, 48, wa, Ga, 65536 ^ Ia),
                        _(a, 48, Ha, La, 0),
                        Z(a, Ja, La),
                        _(a, 32, wa, Ga, 8192 ^ Ia));
                      continue;
                    }
                    break;
                  }
                  Ma = 0;
                  break a;
                }
                Ma = -1;
              }
              return ((L = (80 + Ca) | 0), Ma);
            }
            function sa(a) {
              var za,
                wa = 0,
                xa = 0,
                ya = 0,
                Aa = 0,
                ya = 4,
                xa = 1439;
              a: if ((wa = r[0 | a])) {
                for (;;) {
                  if ((0 | (za = r[0 | xa])) != (0 | wa) || !(ya = (ya + -1) | 0) | !za) break;
                  if (((xa = (xa + 1) | 0), (wa = r[(a + 1) | 0]), (a = (a + 1) | 0), !wa)) break a;
                }
                Aa = wa;
              }
              return ((255 & Aa) - r[0 | xa]) | 0;
            }
            function ta(a, Ba, Da) {
              var Ka,
                Ea,
                Fa = 0,
                Va = 0,
                Wa = 0;
              ((q[(L = Ea = (L - 240) | 0) >> 2] = a), (Va = 1));
              a: if (!((0 | Ba) < 2))
                for (Fa = a; ; ) {
                  if (
                    ((Fa = ((Ka = (Fa + -4) | 0) - q[(((Wa = (Ba + -2) | 0) << 2) + Da) >> 2]) | 0),
                    0 <= (0 | n[5](a, Fa)) && -1 < (0 | n[5](a, Ka)))
                  )
                    break a;
                  if (
                    ((a = ((Va << 2) + Ea) | 0),
                    0 <= (0 | n[5](Fa, Ka))
                      ? ((q[a >> 2] = Fa), (Wa = (Ba + -1) | 0))
                      : (Fa = q[a >> 2] = Ka),
                    (Va = (Va + 1) | 0),
                    (0 | Wa) < 2)
                  )
                    break a;
                  ((a = q[Ea >> 2]), (Ba = Wa));
                }
              (Ma(Ea, Va), (L = (240 + Ea) | 0));
            }
            function ua(a, Ba, Da, Xa, Ya, Za) {
              var db,
                eb,
                fb,
                hb,
                ib,
                ab,
                _a = 0,
                $a = 0,
                bb = 0,
                cb = 0,
                gb = 0;
              if (((L = ab = (L - 32) | 0), 1 <= (0 | Ba)))
                for (ib = (w(Ba, 12) + Da) | 0; ; ) {
                  if (!((0 | (_a = q[(Da + 4) >> 2])) < 1))
                    if (
                      ((db = ((Ba = q[(Da + 8) >> 2]) + w(_a, 48)) | 0),
                      (_a = q[Da >> 2] << 2),
                      1 <= (0 | (bb = q[(_a + Za) >> 2])))
                    )
                      for (
                        bb <<= 1,
                          eb = q[(Ya + _a) >> 2],
                          fb = q[(q[(q[a >> 2] + 8) >> 2] + 372) >> 2];
                        ;

                      ) {
                        b: if ((_a = q[(Ba + 8) >> 2])) {
                          c: {
                            if (($a = (_a + -1) | 0) >>> 0 <= 1) {
                              if (
                                ((_a = ((q[(Ba + 4) >> 2] << 2) + Xa) | 0),
                                (gb = ((q[(_a + (q[(Ba + 12) >> 2] << 2)) >> 2] << 2) + fb) | 0),
                                $a - 1)
                              )
                                break c;
                              for (
                                cb = ((q[(_a + (q[(Ba + 16) >> 2] << 2)) >> 2] << 2) + fb) | 0,
                                  _a = 0;
                                ;

                              )
                                if (
                                  ((u[(hb = (($a = _a << 2) + eb) | 0) >> 2] =
                                    u[hb >> 2] +
                                    x(
                                      u[(Ba + 44) >> 2] *
                                        x(
                                          x(u[($a + gb) >> 2] * u[(Ba + 20) >> 2]) +
                                            x(u[($a + cb) >> 2] * u[(Ba + 24) >> 2])
                                        )
                                    )),
                                  (0 | bb) == (0 | (_a = (_a + 1) | 0)))
                                )
                                  break;
                              break b;
                            }
                            ((q[ab >> 2] = _a), Y(4, 1024, ab));
                            break b;
                          }
                          for (_a = 0; ; )
                            if (
                              ((u[(cb = (($a = _a << 2) + eb) | 0) >> 2] =
                                u[cb >> 2] +
                                x(u[(Ba + 44) >> 2] * x(u[($a + gb) >> 2] * u[(Ba + 20) >> 2]))),
                              (0 | bb) == (0 | (_a = (_a + 1) | 0)))
                            )
                              break;
                        }
                        if (!((Ba = (Ba + 48) | 0) >>> 0 < db >>> 0)) break;
                      }
                    else
                      for (;;)
                        if (
                          (3 <= (_a = q[(Ba + 8) >> 2]) >>> 0 &&
                            ((q[(16 + ab) >> 2] = _a), Y(4, 1024, (16 + ab) | 0)),
                          !((Ba = (Ba + 48) | 0) >>> 0 < db >>> 0))
                        )
                          break;
                  if (!((Da = (Da + 12) | 0) >>> 0 < ib >>> 0)) break;
                }
              L = (32 + ab) | 0;
            }
            function va(a, Ba, Da) {
              ((Ba |= 0), (Da |= 0));
              var Xa;
              L = Xa = (L + -64) | 0;
              a: {
                if ((a |= 0))
                  if (Ba)
                    if (((Ba + 15) & -16) != (0 | Ba))
                      ((q[(52 + Xa) >> 2] = 1522),
                        (q[(48 + Xa) >> 2] = 2429),
                        Y(4, 1294, (48 + Xa) | 0));
                    else {
                      if (
                        (Ba = (function (a, ok, Jk) {
                          var Rk = 0,
                            Sk = 0,
                            $k = 0,
                            al = 0,
                            bl = 0,
                            cl = 0,
                            dl = 0,
                            el = 0,
                            fl = 0,
                            gl = 0,
                            hl = 0,
                            il = 0,
                            jl = 0,
                            kl = 0,
                            ll = 0,
                            ml = x(0),
                            nl = 0,
                            ol = 0,
                            pl = 0,
                            ql = 0,
                            rl = 0;
                          if (
                            ($((16 + (L = al = (L - 688) | 0)) | 0, 0, 660),
                            Ga(
                              r[(q[a >> 2] + 4) | 0],
                              q[(a + 8) >> 2],
                              (16 + al) | 0,
                              (12 + al) | 0
                            ),
                            (bl = q[(12 + al) >> 2]) >>> 0 <= Jk >>> 0)
                          ) {
                            if (
                              ((Sk = $(ok, 0, bl)),
                              (dl = q[(a + 8) >> 2]),
                              (Rk = (Sk + q[(16 + al) >> 2]) | 0),
                              (q[(Rk + 8) >> 2] = Sk + q[(20 + al) >> 2]),
                              (q[(Rk + 40) >> 2] = Sk + q[(24 + al) >> 2]),
                              (q[(Rk + 44) >> 2] = Sk + q[(28 + al) >> 2]),
                              (q[(Rk + 48) >> 2] = Sk + q[(32 + al) >> 2]),
                              (q[(Rk + 52) >> 2] = Sk + q[(36 + al) >> 2]),
                              (q[(Rk + 56) >> 2] = Sk + q[(40 + al) >> 2]),
                              (q[(Rk + 16) >> 2] = Sk + q[(44 + al) >> 2]),
                              (q[(Rk + 24) >> 2] = Sk + q[(48 + al) >> 2]),
                              (q[(Rk + 28) >> 2] = Sk + q[(52 + al) >> 2]),
                              (q[(Rk + 32) >> 2] = Sk + q[(56 + al) >> 2]),
                              (q[(Rk + 36) >> 2] = Sk + q[(60 + al) >> 2]),
                              (ok = q[(dl + 12) >> 2]),
                              (q[(Rk + 312) >> 2] = Sk + q[(64 + al) >> 2]),
                              (q[(Rk + 316) >> 2] = Sk + q[(68 + al) >> 2]),
                              (q[(Rk + 320) >> 2] = Sk + q[(72 + al) >> 2]),
                              (q[(Rk + 324) >> 2] = Sk + q[(76 + al) >> 2]),
                              (q[(Rk + 328) >> 2] = Sk + q[(80 + al) >> 2]),
                              (q[(Rk + 332) >> 2] = Sk + q[(84 + al) >> 2]),
                              (q[(Rk + 64) >> 2] = Sk + q[(88 + al) >> 2]),
                              (q[(Rk + 148) >> 2] = Sk + q[(92 + al) >> 2]),
                              (q[(Rk + 152) >> 2] = Sk + q[(96 + al) >> 2]),
                              (Jk = (Sk + q[(100 + al) >> 2]) | 0),
                              (q[(Rk + 156) >> 2] = Jk),
                              !((0 | (bl = q[(ok + 8) >> 2])) < 1) &&
                                ((ok = (Sk + q[(104 + al) >> 2]) | 0),
                                (q[Jk >> 2] = ok),
                                1 != (0 | bl)))
                            )
                              for (Jk = 1; ; )
                                if (
                                  ((ok =
                                    (((15 + (q[(q[(dl + 108) >> 2] + ($k << 2)) >> 2] << 3)) &
                                      -16) +
                                      ok) |
                                    0),
                                  (q[(q[(Rk + 156) >> 2] + (Jk << 2)) >> 2] = ok),
                                  (0 | bl) == (0 | (Jk = (($k = Jk) + 1) | 0)))
                                )
                                  break;
                            if (
                              ((q[(Rk + 160) >> 2] = Sk + q[(108 + al) >> 2]),
                              (q[(Rk + 164) >> 2] = Sk + q[(112 + al) >> 2]),
                              (q[(Rk + 72) >> 2] = Sk + q[(116 + al) >> 2]),
                              (q[(Rk + 80) >> 2] = Sk + q[(120 + al) >> 2]),
                              (q[(Rk + 84) >> 2] = Sk + q[(124 + al) >> 2]),
                              (q[(Rk + 88) >> 2] = Sk + q[(128 + al) >> 2]),
                              (q[(Rk + 92) >> 2] = Sk + q[(132 + al) >> 2]),
                              (q[(Rk + 96) >> 2] = Sk + q[(136 + al) >> 2]),
                              (q[(Rk + 100) >> 2] = Sk + q[(140 + al) >> 2]),
                              (q[(Rk + 104) >> 2] = Sk + q[(144 + al) >> 2]),
                              (q[(Rk + 108) >> 2] = Sk + q[(148 + al) >> 2]),
                              (q[(Rk + 112) >> 2] = Sk + q[(152 + al) >> 2]),
                              (q[(Rk + 116) >> 2] = Sk + q[(156 + al) >> 2]),
                              (q[(Rk + 120) >> 2] = Sk + q[(160 + al) >> 2]),
                              (q[(Rk + 124) >> 2] = Sk + q[(164 + al) >> 2]),
                              (q[(Rk + 128) >> 2] = Sk + q[(168 + al) >> 2]),
                              (q[(Rk + 132) >> 2] = Sk + q[(172 + al) >> 2]),
                              (q[(Rk + 136) >> 2] = Sk + q[(176 + al) >> 2]),
                              (q[(Rk + 140) >> 2] = Sk + q[(180 + al) >> 2]),
                              (q[(Rk + 144) >> 2] = Sk + q[(184 + al) >> 2]),
                              (q[(Rk + 172) >> 2] = Sk + q[(188 + al) >> 2]),
                              (q[(Rk + 268) >> 2] = Sk + q[(192 + al) >> 2]),
                              (q[(Rk + 272) >> 2] = Sk + q[(196 + al) >> 2]),
                              (q[(Rk + 276) >> 2] = Sk + q[(200 + al) >> 2]),
                              (q[(Rk + 280) >> 2] = Sk + q[(204 + al) >> 2]),
                              (q[(Rk + 284) >> 2] = Sk + q[(208 + al) >> 2]),
                              (q[(Rk + 288) >> 2] = Sk + q[(212 + al) >> 2]),
                              (q[(Rk + 292) >> 2] = Sk + q[(216 + al) >> 2]),
                              (q[(Rk + 296) >> 2] = Sk + q[(220 + al) >> 2]),
                              (q[(Rk + 300) >> 2] = Sk + q[(224 + al) >> 2]),
                              (q[(Rk + 304) >> 2] = Sk + q[(228 + al) >> 2]),
                              (q[(Rk + 180) >> 2] = Sk + q[(232 + al) >> 2]),
                              (q[(Rk + 188) >> 2] = Sk + q[(236 + al) >> 2]),
                              (q[(Rk + 192) >> 2] = Sk + q[(240 + al) >> 2]),
                              (q[(Rk + 196) >> 2] = Sk + q[(244 + al) >> 2]),
                              (q[(Rk + 200) >> 2] = Sk + q[(248 + al) >> 2]),
                              (q[(Rk + 204) >> 2] = Sk + q[(252 + al) >> 2]),
                              (q[(Rk + 208) >> 2] = Sk + q[(256 + al) >> 2]),
                              (q[(Rk + 212) >> 2] = Sk + q[(260 + al) >> 2]),
                              (q[(Rk + 216) >> 2] = Sk + q[(264 + al) >> 2]),
                              (q[(Rk + 220) >> 2] = Sk + q[(268 + al) >> 2]),
                              (q[(Rk + 224) >> 2] = Sk + q[(272 + al) >> 2]),
                              (q[(Rk + 228) >> 2] = Sk + q[(276 + al) >> 2]),
                              (q[(Rk + 232) >> 2] = Sk + q[(280 + al) >> 2]),
                              (q[(Rk + 236) >> 2] = Sk + q[(284 + al) >> 2]),
                              (q[(Rk + 240) >> 2] = Sk + q[(288 + al) >> 2]),
                              (q[(Rk + 244) >> 2] = Sk + q[(292 + al) >> 2]),
                              (q[(Rk + 248) >> 2] = Sk + q[(296 + al) >> 2]),
                              (q[(Rk + 252) >> 2] = Sk + q[(300 + al) >> 2]),
                              (q[(Rk + 256) >> 2] = Sk + q[(304 + al) >> 2]),
                              (q[(Rk + 260) >> 2] = Sk + q[(308 + al) >> 2]),
                              (q[(Rk + 264) >> 2] = Sk + q[(312 + al) >> 2]),
                              (ok = q[(dl + 12) >> 2]),
                              (q[(Rk + 340) >> 2] = Sk + q[(316 + al) >> 2]),
                              (q[(Rk + 428) >> 2] = Sk + q[(320 + al) >> 2]),
                              (q[(Rk + 436) >> 2] = Sk + q[(324 + al) >> 2]),
                              (q[(Rk + 440) >> 2] = Sk + q[(328 + al) >> 2]),
                              (q[(Rk + 444) >> 2] = Sk + q[(332 + al) >> 2]),
                              (Jk = (Sk + q[(336 + al) >> 2]) | 0),
                              (q[(Rk + 448) >> 2] = Jk),
                              !((0 | (bl = q[(ok + 16) >> 2])) < 1) &&
                                (($k = (Sk + q[(340 + al) >> 2]) | 0),
                                (q[Jk >> 2] = $k),
                                (Jk = 1) != (0 | bl)))
                            )
                              for (ok = 0; ; )
                                if (
                                  (($k =
                                    (((15 + (q[(q[(dl + 208) >> 2] + (ok << 2)) >> 2] << 3)) &
                                      -16) +
                                      $k) |
                                    0),
                                  (q[(q[(Rk + 448) >> 2] + (Jk << 2)) >> 2] = $k),
                                  (0 | bl) == (0 | (Jk = ((ok = Jk) + 1) | 0)))
                                )
                                  break;
                            if (
                              ((q[(Rk + 452) >> 2] = Sk + q[(344 + al) >> 2]),
                              (q[(Rk + 456) >> 2] = Sk + q[(348 + al) >> 2]),
                              (q[(Rk + 460) >> 2] = Sk + q[(352 + al) >> 2]),
                              (q[(Rk + 464) >> 2] = Sk + q[(356 + al) >> 2]),
                              (q[(Rk + 468) >> 2] = Sk + q[(360 + al) >> 2]),
                              (q[(Rk + 472) >> 2] = Sk + q[(364 + al) >> 2]),
                              (q[(Rk + 476) >> 2] = Sk + q[(368 + al) >> 2]),
                              (q[(Rk + 480) >> 2] = Sk + q[(372 + al) >> 2]),
                              (q[(Rk + 348) >> 2] = Sk + q[(376 + al) >> 2]),
                              (q[(Rk + 356) >> 2] = Sk + q[(380 + al) >> 2]),
                              (q[(Rk + 360) >> 2] = Sk + q[(384 + al) >> 2]),
                              (q[(Rk + 364) >> 2] = Sk + q[(388 + al) >> 2]),
                              (q[(Rk + 368) >> 2] = Sk + q[(392 + al) >> 2]),
                              (q[(Rk + 372) >> 2] = Sk + q[(396 + al) >> 2]),
                              (q[(Rk + 376) >> 2] = Sk + q[(400 + al) >> 2]),
                              (q[(Rk + 380) >> 2] = Sk + q[(404 + al) >> 2]),
                              (q[(Rk + 384) >> 2] = Sk + q[(408 + al) >> 2]),
                              (q[(Rk + 388) >> 2] = Sk + q[(412 + al) >> 2]),
                              (q[(Rk + 392) >> 2] = Sk + q[(416 + al) >> 2]),
                              (q[(Rk + 396) >> 2] = Sk + q[(420 + al) >> 2]),
                              (q[(Rk + 400) >> 2] = Sk + q[(424 + al) >> 2]),
                              (q[(Rk + 404) >> 2] = Sk + q[(428 + al) >> 2]),
                              (q[(Rk + 408) >> 2] = Sk + q[(432 + al) >> 2]),
                              (q[(Rk + 412) >> 2] = Sk + q[(436 + al) >> 2]),
                              (q[(Rk + 416) >> 2] = Sk + q[(440 + al) >> 2]),
                              (q[(Rk + 420) >> 2] = Sk + q[(444 + al) >> 2]),
                              (q[(Rk + 424) >> 2] = Sk + q[(448 + al) >> 2]),
                              (ok = q[(452 + al) >> 2]),
                              (Jk = q[(456 + al) >> 2]),
                              (q[(Rk + 656) >> 2] = Sk + q[(460 + al) >> 2]),
                              (q[(Rk + 652) >> 2] = Jk + Sk),
                              (q[(Rk + 648) >> 2] = ok + Sk),
                              (q[(Rk + 664) >> 2] = Sk + q[(464 + al) >> 2]),
                              (ok = q[(dl + 12) >> 2]),
                              (el = (Sk + q[(468 + al) >> 2]) | 0),
                              (q[(Rk + 672) >> 2] = el),
                              1 <= (0 | (fl = q[(ok + 48) >> 2])))
                            )
                              for (
                                $k = (Sk + q[(472 + al) >> 2]) | 0,
                                  ok = (Sk + q[(476 + al) >> 2]) | 0,
                                  bl = (Sk + q[(480 + al) >> 2]) | 0,
                                  gl = q[(dl + 392) >> 2],
                                  Jk = 0;
                                ;

                              )
                                if (
                                  ((cl = (el + w(Jk, 36)) | 0),
                                  (q[(cl + 20) >> 2] = bl),
                                  (q[(cl + 16) >> 2] = ok),
                                  (q[cl >> 2] = $k),
                                  (cl = q[(gl + (Jk << 2)) >> 2]),
                                  ($k = ((cl << 2) + $k) | 0),
                                  (bl = ((cl = (1 << cl) << 2) + bl) | 0),
                                  (ok = (ok + cl) | 0),
                                  (0 | fl) == (0 | (Jk = (Jk + 1) | 0)))
                                )
                                  break;
                            if (
                              ((ok = q[(dl + 12) >> 2]),
                              (bl = (Sk + q[(524 + al) >> 2]) | 0),
                              (q[(Rk + 488) >> 2] = bl),
                              1 <= (0 | (ok = q[(ok + 72) >> 2])))
                            )
                              for (
                                $k = (Sk + q[(528 + al) >> 2]) | 0, cl = q[(dl + 532) >> 2], Jk = 0;
                                ;

                              )
                                if (
                                  ((q[(12 + ((bl + w(Jk, 28)) | 0)) >> 2] = $k),
                                  ($k = ((q[(cl + (Jk << 2)) >> 2] << 4) + $k) | 0),
                                  (0 | ok) == (0 | (Jk = (Jk + 1) | 0)))
                                )
                                  break;
                            if (
                              ((q[(Rk + 492) >> 2] = Sk + q[(532 + al) >> 2]),
                              (q[(Rk + 496) >> 2] = Sk + q[(536 + al) >> 2]),
                              (q[(Rk + 500) >> 2] = Sk + q[(540 + al) >> 2]),
                              (q[(Rk + 508) >> 2] = Sk + q[(544 + al) >> 2]),
                              (q[(Rk + 540) >> 2] = Sk + q[(548 + al) >> 2]),
                              (q[(Rk + 516) >> 2] = Sk + q[(552 + al) >> 2]),
                              (q[(Rk + 524) >> 2] = Sk + q[(556 + al) >> 2]),
                              (q[(Rk + 528) >> 2] = Sk + q[(560 + al) >> 2]),
                              (q[(Rk + 532) >> 2] = Sk + q[(564 + al) >> 2]),
                              (q[(Rk + 536) >> 2] = Sk + q[(568 + al) >> 2]),
                              (q[(Rk + 756) >> 2] = Sk + q[(672 + al) >> 2]),
                              4 <= r[(q[a >> 2] + 4) | 0])
                            ) {
                              if (
                                ((q[(Rk + 680) >> 2] = Sk + q[(484 + al) >> 2]),
                                (q[(Rk + 688) >> 2] = Sk + q[(488 + al) >> 2]),
                                (ok = q[(dl + 12) >> 2]),
                                (Jk = q[(496 + al) >> 2]),
                                (bl = (Sk + q[(492 + al) >> 2]) | 0),
                                (q[(Rk + 696) >> 2] = bl),
                                1 <= (0 | (ok = q[(ok + 104) >> 2])))
                              )
                                for ($k = (Jk + Sk) | 0, cl = q[(dl + 424) >> 2], Jk = 0; ; )
                                  if (
                                    ((q[(40 + ((bl + w(Jk, 48)) | 0)) >> 2] = $k),
                                    ($k = ((q[(cl + (Jk << 2)) >> 2] << 2) + $k) | 0),
                                    (0 | ok) == (0 | (Jk = (Jk + 1) | 0)))
                                  )
                                    break;
                              ((q[(Rk + 712) >> 2] = Sk + q[(504 + al) >> 2]),
                                (q[(Rk + 728) >> 2] = Sk + q[(512 + al) >> 2]));
                            } else if (
                              ((ok = q[(668 + al) >> 2]),
                              (Jk = q[(664 + al) >> 2]),
                              (q[(Rk + 748) >> 2] = Sk + q[(660 + al) >> 2]),
                              (q[(Rk + 752) >> 2] = Jk + Sk),
                              !(q[(q[(dl + 12) >> 2] + 20) >> 2] < 1))
                            )
                              for (cl = (ok + Sk) | 0, bl = 0; ; ) {
                                d: {
                                  if (
                                    (0 | ($k = q[((ok = bl << 2) + q[(dl + 268) >> 2]) >> 2])) <=
                                    0
                                  )
                                    ok = (ok + q[(Rk + 748) >> 2]) | 0;
                                  else {
                                    for (
                                      Jk = q[(ok + q[(dl + 264) >> 2]) >> 2],
                                        el = ($k + Jk) | 0,
                                        fl = q[(dl + 380) >> 2],
                                        $k = 0;
                                      ;

                                    )
                                      if (
                                        (($k = (q[(fl + (Jk << 2)) >> 2] + $k) | 0),
                                        !((0 | (Jk = (Jk + 1) | 0)) < (0 | el)))
                                      )
                                        break;
                                    if (((ok = (ok + q[(Rk + 748) >> 2]) | 0), (Jk = cl), $k))
                                      break d;
                                  }
                                  Jk = $k = 0;
                                }
                                if (
                                  ((q[ok >> 2] = Jk),
                                  (cl = (($k << 2) + cl) | 0),
                                  !((0 | (bl = (bl + 1) | 0)) < q[(q[(dl + 12) >> 2] + 20) >> 2]))
                                )
                                  break;
                              }
                            ((cl = r[(q[a >> 2] + 4) | 0]) >>> 0 < 5 ||
                              ((q[(Rk + 704) >> 2] = Sk + q[(500 + al) >> 2]),
                              (q[(Rk + 720) >> 2] = Sk + q[(508 + al) >> 2]),
                              (q[(Rk + 736) >> 2] = Sk + q[(516 + al) >> 2]),
                              (cl = r[(q[a >> 2] + 4) | 0]) >>> 0 < 6) ||
                              ((q[(Rk + 548) >> 2] = Sk + q[(572 + al) >> 2]),
                              (q[(Rk + 628) >> 2] = Sk + q[(576 + al) >> 2]),
                              (q[(Rk + 632) >> 2] = Sk + q[(580 + al) >> 2]),
                              (q[(Rk + 636) >> 2] = Sk + q[(584 + al) >> 2]),
                              (q[(Rk + 640) >> 2] = Sk + q[(588 + al) >> 2]),
                              (q[(Rk + 556) >> 2] = Sk + q[(592 + al) >> 2]),
                              (q[(Rk + 564) >> 2] = Sk + q[(596 + al) >> 2]),
                              (q[(Rk + 568) >> 2] = Sk + q[(600 + al) >> 2]),
                              (q[(Rk + 572) >> 2] = Sk + q[(604 + al) >> 2]),
                              (q[(Rk + 576) >> 2] = Sk + q[(608 + al) >> 2]),
                              (q[(Rk + 580) >> 2] = Sk + q[(612 + al) >> 2]),
                              (q[(Rk + 584) >> 2] = Sk + q[(616 + al) >> 2]),
                              (q[(Rk + 588) >> 2] = Sk + q[(620 + al) >> 2]),
                              (q[(Rk + 592) >> 2] = Sk + q[(624 + al) >> 2]),
                              (q[(Rk + 596) >> 2] = Sk + q[(628 + al) >> 2]),
                              (q[(Rk + 600) >> 2] = Sk + q[(632 + al) >> 2]),
                              (q[(Rk + 604) >> 2] = Sk + q[(636 + al) >> 2]),
                              (q[(Rk + 608) >> 2] = Sk + q[(640 + al) >> 2]),
                              (q[(Rk + 612) >> 2] = Sk + q[(644 + al) >> 2]),
                              (q[(Rk + 616) >> 2] = Sk + q[(648 + al) >> 2]),
                              (q[(Rk + 620) >> 2] = Sk + q[(652 + al) >> 2]),
                              (q[(Rk + 624) >> 2] = Sk + q[(656 + al) >> 2]),
                              (q[(Rk + 744) >> 2] = Sk + q[(520 + al) >> 2]),
                              (cl = r[(q[a >> 2] + 4) | 0])),
                              ($k = q[(a + 8) >> 2]),
                              (q[(Rk + 760) >> 2] = 1),
                              (q[Rk >> 2] = a),
                              (q[(Rk + 764) >> 2] = 1 & o[(q[($k + 16) >> 2] + 20) | 0]),
                              (Sk = q[($k + 12) >> 2]),
                              (el = q[(Sk + 20) >> 2]),
                              (q[(Rk + 644) >> 2] = el));
                            g: if (!((0 | el) < 1)) {
                              if (
                                ((bl = (el + -1) | 0),
                                (fl = q[($k + 268) >> 2]),
                                (gl = q[($k + 256) >> 2]),
                                (hl = q[($k + 248) >> 2]),
                                (il = q[($k + 252) >> 2]),
                                (jl = q[($k + 240) >> 2]),
                                (kl = q[($k + 244) >> 2]),
                                (ol = q[(Rk + 656) >> 2]),
                                (nl = q[(Rk + 648) >> 2]),
                                (255 & cl) >>> 0 < 4)
                              )
                                for (;;)
                                  if (
                                    ((ok = (nl + w(bl, 52)) | 0),
                                    (q[ok >> 2] = 0),
                                    (dl = ((Jk = bl << 2) + kl) | 0),
                                    (q[(ok + 4) >> 2] = q[dl >> 2]),
                                    (ll = (Jk + jl) | 0),
                                    (q[(ok + 8) >> 2] = q[ll >> 2]),
                                    (u[(ok + 12) >> 2] = u[ll >> 2] - u[dl >> 2]),
                                    (q[(ok + 16) >> 2] = q[(Jk + il) >> 2]),
                                    (ll = (Jk + hl) | 0),
                                    (q[(ok + 44) >> 2] = q[ll >> 2]),
                                    (ml = za(x(q[(Jk + gl) >> 2]))),
                                    (u[(ok + 20) >> 2] = ml),
                                    (u[(ok + 24) >> 2] = ml * x(1.5)),
                                    (pl = q[(Jk + fl) >> 2]),
                                    (q[(ok + 32) >> 2] = pl),
                                    (dl = 0),
                                    (dl = pl
                                      ? (q[(Rk + 664) >> 2] +
                                          w(q[(Jk + q[($k + 264) >> 2]) >> 2], 28)) |
                                        0
                                      : dl),
                                    (q[(ok + 48) >> 2] = 1),
                                    (q[(ok + 28) >> 2] = dl),
                                    (q[(Jk + ol) >> 2] = q[ll >> 2]),
                                    (ok = 0 < (0 | bl)),
                                    (bl = (bl + -1) | 0),
                                    !ok)
                                  )
                                    break g;
                              for (pl = q[($k + 276) >> 2], rl = q[($k + 260) >> 2]; ; )
                                if (
                                  ((ok = (nl + w(bl, 52)) | 0),
                                  (dl = bl << 2),
                                  (q[ok >> 2] = q[(dl + rl) >> 2]),
                                  (Jk = (dl + kl) | 0),
                                  (q[(ok + 4) >> 2] = q[Jk >> 2]),
                                  (ll = (dl + jl) | 0),
                                  (q[(ok + 8) >> 2] = q[ll >> 2]),
                                  (u[(ok + 12) >> 2] = u[ll >> 2] - u[Jk >> 2]),
                                  (q[(ok + 16) >> 2] = q[(dl + il) >> 2]),
                                  (ql = (dl + hl) | 0),
                                  (q[(ok + 44) >> 2] = q[ql >> 2]),
                                  (ml = za(x(q[(dl + gl) >> 2]))),
                                  (u[(ok + 20) >> 2] = ml),
                                  (u[(ok + 24) >> 2] = ml * x(1.5)),
                                  (ll = q[(dl + fl) >> 2]),
                                  (q[(ok + 32) >> 2] = ll),
                                  (q[(ok + 28) >> 2] = ll
                                    ? (q[(Rk + 664) >> 2] +
                                        w(q[(dl + q[($k + 264) >> 2]) >> 2], 28)) |
                                      0
                                    : 0),
                                  (Jk = q[(dl + pl) >> 2]),
                                  (Jk = (q[(ok + 40) >> 2] = Jk)
                                    ? (q[(Rk + 688) >> 2] +
                                        w(q[(dl + q[($k + 272) >> 2]) >> 2], 28)) |
                                      0
                                    : 0),
                                  (q[(ok + 48) >> 2] = 1),
                                  (q[(ok + 36) >> 2] = Jk),
                                  (q[(dl + ol) >> 2] = q[ql >> 2]),
                                  (ok = 0 < (0 | bl)),
                                  (bl = (bl + -1) | 0),
                                  !ok)
                                )
                                  break;
                            }
                            if (
                              (4 <= (255 & cl) >>> 0
                                ? (q[(Rk + 652) >> 2] = q[($k + 260) >> 2])
                                : ($(q[(Rk + 652) >> 2], 0, el << 2),
                                  ($k = q[(q[Rk >> 2] + 8) >> 2]),
                                  (Sk = q[($k + 12) >> 2])),
                              (ok = q[(Sk + 52) >> 2]),
                              1 <= (0 | (q[(Rk + 660) >> 2] = ok)))
                            )
                              for (
                                bl = q[($k + 380) >> 2],
                                  cl = q[($k + 376) >> 2],
                                  dl = q[($k + 512) >> 2],
                                  el = q[(Rk + 664) >> 2];
                                ;

                              )
                                if (
                                  ((Jk = (el + w((ok = (ok + -1) | 0), 28)) | 0),
                                  (fl = ok << 2),
                                  (q[Jk >> 2] = q[(fl + bl) >> 2]),
                                  (fl = q[(cl + fl) >> 2]),
                                  (q[(Jk + 24) >> 2] = 1),
                                  (q[(Jk + 16) >> 2] = 0),
                                  (q[(Jk + 20) >> 2] = 1),
                                  (q[(Jk + 8) >> 2] = 0),
                                  (q[(Jk + 12) >> 2] = 0),
                                  (q[(Jk + 4) >> 2] = dl + (fl << 2)),
                                  !(0 < (0 | ok)))
                                )
                                  break;
                            if (((cl = q[(Sk + 48) >> 2]), 1 <= (0 | (q[(Rk + 668) >> 2] = cl)))) {
                              for (;;) {
                                if (
                                  ((cl = (cl + -1) | 0),
                                  (ok = (q[(Rk + 672) >> 2] + w(cl, 36)) | 0),
                                  (bl = q[((Sk = cl << 2) + q[($k + 392) >> 2]) >> 2]),
                                  1 <= (0 | (q[(ok + 4) >> 2] = bl)))
                                )
                                  for (Jk = 0; ; )
                                    if (
                                      ((q[(q[ok >> 2] + (Jk << 2)) >> 2] =
                                        q[(Rk + 664) >> 2] +
                                        w(
                                          q[
                                            (q[($k + 384) >> 2] +
                                              ((q[(Sk + q[($k + 388) >> 2]) >> 2] + Jk) << 2)) >>
                                              2
                                          ],
                                          28
                                        )),
                                      (0 | bl) == (0 | (Jk = (Jk + 1) | 0)))
                                    )
                                      break;
                                if (
                                  ((q[(ok + 24) >> 2] = 1),
                                  (q[(ok + 28) >> 2] = 1),
                                  (q[(ok + 8) >> 2] = 1 << bl),
                                  !(0 < (0 | cl)))
                                )
                                  break;
                              }
                              (($k = q[(q[Rk >> 2] + 8) >> 2]), (Sk = q[($k + 12) >> 2]));
                            }
                            if (
                              ((Jk = r[(q[$k >> 2] + 4) | 0]),
                              (ok = q[Sk >> 2]),
                              (q[(Rk + 4) >> 2] = ok),
                              Jk >>> 0 <= 5
                                ? ($(q[(Rk + 56) >> 2], 255, ok << 2), (ok = q[(Rk + 4) >> 2]))
                                : (q[(Rk + 56) >> 2] = q[($k + 52) >> 2]),
                              (0 | ok) < 1)
                            )
                              Jk = 0;
                            else {
                              for (
                                dl = q[($k + 40) >> 2],
                                  el = q[($k + 44) >> 2],
                                  fl = q[($k + 48) >> 2],
                                  bl = q[($k + 28) >> 2],
                                  gl = q[(Rk + 52) >> 2],
                                  cl = q[(Rk + 672) >> 2],
                                  hl = q[(Rk + 8) >> 2],
                                  $k = ok;
                                ;

                              )
                                if (
                                  ((Sk = (hl + w(($k = ($k + -1) | 0), 12)) | 0),
                                  (Jk = $k << 2),
                                  (q[Sk >> 2] = cl + w(q[(Jk + bl) >> 2], 36)),
                                  (q[(Sk + 4) >> 2] = q[(Jk + fl) >> 2]),
                                  (q[(Sk + 8) >> 2] = q[(Jk + el) >> 2]),
                                  (u[(Jk + gl) >> 2] = q[(Jk + dl) >> 2] ? x(1) : x(0)),
                                  !(0 < (0 | $k)))
                                )
                                  break;
                              for (Sk = q[(Rk + 16) >> 2], Jk = 0; ; )
                                if (
                                  (($k =
                                    q[
                                      (8 +
                                        ((cl +
                                          w(q[((dl = (ok = (ok + -1) | 0) << 2) + bl) >> 2], 36)) |
                                          0)) >>
                                        2
                                    ]),
                                  (q[(Sk + dl) >> 2] = $k),
                                  (Jk = (Jk + $k) | 0),
                                  !(0 < (0 | ok)))
                                )
                                  break;
                              ok = q[(Rk + 4) >> 2];
                            }
                            if (
                              ((q[(Rk + 12) >> 2] = ok),
                              (q[(Rk + 20) >> 2] = Jk),
                              (dl = q[Rk >> 2]),
                              (Sk = q[(dl + 8) >> 2]),
                              (cl = q[(Sk + 12) >> 2]),
                              (ok = q[(cl + 4) >> 2]),
                              1 <= (0 | (q[(Rk + 308) >> 2] = ok)))
                            ) {
                              for (;;)
                                if (
                                  ((ok = (ok + -1) | 0),
                                  (Jk = (q[(Rk + 312) >> 2] + (ok << 5)) | 0),
                                  ($k = ok << 2),
                                  (q[Jk >> 2] =
                                    q[(Rk + 672) >> 2] + w(q[($k + q[(Sk + 64) >> 2]) >> 2], 36)),
                                  (q[(Jk + 4) >> 2] = q[($k + q[(Sk + 76) >> 2]) >> 2]),
                                  (q[(Jk + 8) >> 2] = q[($k + q[(Sk + 80) >> 2]) >> 2]),
                                  (bl = q[($k + q[(Sk + 84) >> 2]) >> 2]),
                                  (q[(Jk + 12) >> 2] = bl),
                                  (cl = q[($k + q[(Sk + 88) >> 2]) >> 2]),
                                  (q[(Jk + 16) >> 2] = cl),
                                  (q[(Jk + 28) >> 2] = q[($k + q[(Sk + 72) >> 2]) >> 2]),
                                  bl >>> 0 <= 1
                                    ? bl - 1
                                      ? ((q[(20 + ((q[(Rk + 64) >> 2] + w(cl, 24)) | 0)) >> 2] =
                                          ok),
                                        (q[(Jk + 24) >> 2] = 1),
                                        (q[(Jk + 20) >> 2] = 2))
                                      : ((q[(8 + ((q[(Rk + 172) >> 2] + w(cl, 12)) | 0)) >> 2] =
                                          ok),
                                        (q[(Jk + 24) >> 2] = 3),
                                        (q[(Jk + 20) >> 2] = 4))
                                    : Y(4, 1179, 0),
                                  !(0 < (0 | ok)))
                                )
                                  break;
                              ((dl = q[Rk >> 2]),
                                (Sk = q[(dl + 8) >> 2]),
                                (cl = q[(Sk + 12) >> 2]));
                            }
                            (($k = q[(cl + 8) >> 2]), (q[(Rk + 60) >> 2] = $k));
                            l: if (!((0 | $k) < 1)) {
                              if (
                                ((Jk = ($k + -1) | 0),
                                (el = q[(Sk + 108) >> 2]),
                                (fl = q[(Sk + 116) >> 2]),
                                (gl = q[(Sk + 112) >> 2]),
                                (hl = q[(Sk + 92) >> 2]),
                                (il = q[(Rk + 672) >> 2]),
                                (jl = q[(Rk + 64) >> 2]),
                                r[(q[dl >> 2] + 4) | 0] < 2)
                              )
                                for (;;)
                                  if (
                                    ((ok = (jl + w(Jk, 24)) | 0),
                                    (bl = Jk << 2),
                                    (q[ok >> 2] = il + w(q[(bl + hl) >> 2], 36)),
                                    (q[(ok + 4) >> 2] = q[(bl + gl) >> 2]),
                                    (q[(ok + 8) >> 2] = q[(bl + fl) >> 2]),
                                    (bl = q[(bl + el) >> 2]),
                                    (q[(ok + 12) >> 2] = 0),
                                    (q[(ok + 16) >> 2] = bl),
                                    (ok = 0 < (0 | Jk)),
                                    (Jk = (Jk + -1) | 0),
                                    !ok)
                                  )
                                    break l;
                              for (kl = q[(Sk + 120) >> 2]; ; )
                                if (
                                  ((ok = (jl + w(Jk, 24)) | 0),
                                  (bl = Jk << 2),
                                  (q[ok >> 2] = il + w(q[(bl + hl) >> 2], 36)),
                                  (q[(ok + 4) >> 2] = q[(bl + gl) >> 2]),
                                  (q[(ok + 8) >> 2] = q[(bl + fl) >> 2]),
                                  (q[(ok + 16) >> 2] = q[(bl + el) >> 2]),
                                  (q[(ok + 12) >> 2] = q[(bl + kl) >> 2]),
                                  (ok = 0 < (0 | Jk)),
                                  (Jk = (Jk + -1) | 0),
                                  !ok)
                                )
                                  break;
                            }
                            if (((Jk = q[(cl + 12) >> 2]), 1 <= (0 | (q[(Rk + 168) >> 2] = Jk))))
                              for (
                                bl = q[(Sk + 140) >> 2],
                                  el = q[(Sk + 124) >> 2],
                                  fl = q[(Rk + 672) >> 2],
                                  gl = q[(Rk + 172) >> 2],
                                  ok = Jk;
                                ;

                              )
                                if (
                                  ((hl = (gl + w((ok = (ok + -1) | 0), 12)) | 0),
                                  (il = ok << 2),
                                  (q[hl >> 2] = fl + w(q[(il + el) >> 2], 36)),
                                  (q[(hl + 4) >> 2] = q[(bl + il) >> 2]),
                                  !(0 < (0 | ok)))
                                )
                                  break;
                            if (((ok = 0) | $k) < 1) bl = 0;
                            else {
                              for (el = q[(Rk + 72) >> 2], fl = q[(Rk + 64) >> 2], bl = 0; ; )
                                if (
                                  ((Jk = q[(q[(fl + w(($k = ($k + -1) | 0), 24)) >> 2] + 8) >> 2]),
                                  (q[(el + ($k << 2)) >> 2] = Jk),
                                  (bl = (Jk + bl) | 0),
                                  !(0 < (0 | $k)))
                                )
                                  break;
                              ((Jk = q[(Rk + 168) >> 2]), ($k = q[(Rk + 60) >> 2]));
                            }
                            if (
                              ((q[(Rk + 68) >> 2] = $k),
                              (q[(Rk + 76) >> 2] = bl),
                              ($k = Rk),
                              1 <= (0 | Jk))
                            ) {
                              for (el = q[(Rk + 180) >> 2], fl = q[(Rk + 172) >> 2]; ; )
                                if (
                                  ((bl = q[(q[(fl + w((Jk = (Jk + -1) | 0), 12)) >> 2] + 8) >> 2]),
                                  (q[(el + (Jk << 2)) >> 2] = bl),
                                  (ok = (ok + bl) | 0),
                                  !(0 < (0 | Jk)))
                                )
                                  break;
                              Jk = q[(Rk + 168) >> 2];
                            }
                            ((q[($k + 176) >> 2] = Jk),
                              (q[(Rk + 184) >> 2] = ok),
                              (ok = r[(q[Sk >> 2] + 4) | 0]),
                              (Jk = q[(cl + 16) >> 2]),
                              (q[(Rk + 336) >> 2] = Jk));
                            n: {
                              o: {
                                if (ok >>> 0 <= 5) {
                                  if ((0 | Jk) < 1) break o;
                                  for ($k = q[(Sk + 200) >> 2], bl = q[(Rk + 440) >> 2]; ; )
                                    if (
                                      ((ok = r[($k + (Jk = (Jk + -1) | 0)) | 0]),
                                      (q[(bl + (Jk << 2)) >> 2] = 1 & ok ? 1 : 2 & ok),
                                      !(0 < (0 | Jk)))
                                    )
                                      break;
                                  Jk = q[(Rk + 336) >> 2];
                                } else q[(Rk + 440) >> 2] = q[(Sk + 204) >> 2];
                                if (!((0 | Jk) < 1)) {
                                  for (
                                    gl = q[(Sk + 184) >> 2],
                                      hl = q[(Sk + 208) >> 2],
                                      il = q[(Sk + 192) >> 2],
                                      jl = q[(Sk + 188) >> 2],
                                      el = q[(Sk + 164) >> 2],
                                      fl = q[(Rk + 672) >> 2],
                                      kl = q[(Rk + 340) >> 2],
                                      bl = Jk;
                                    ;

                                  )
                                    if (
                                      ((ok = (kl + w((bl = (bl + -1) | 0), 20)) | 0),
                                      ($k = bl << 2),
                                      (q[ok >> 2] = fl + w(q[($k + el) >> 2], 36)),
                                      (q[(ok + 4) >> 2] = q[($k + jl) >> 2]),
                                      (q[(ok + 8) >> 2] = q[($k + il) >> 2]),
                                      (q[(ok + 16) >> 2] = q[($k + hl) >> 2]),
                                      (q[(ok + 12) >> 2] = q[($k + gl) >> 2]),
                                      !(0 < (0 | bl)))
                                    )
                                      break;
                                  for (bl = q[(Rk + 348) >> 2], $k = 0; ; )
                                    if (
                                      ((ok =
                                        q[
                                          (8 +
                                            ((fl +
                                              w(
                                                q[((gl = (Jk = (Jk + -1) | 0) << 2) + el) >> 2],
                                                36
                                              )) |
                                              0)) >>
                                            2
                                        ]),
                                      (q[(bl + gl) >> 2] = ok),
                                      ($k = (ok + $k) | 0),
                                      !(0 < (0 | Jk)))
                                    )
                                      break;
                                  if (
                                    ((q[(Rk + 352) >> 2] = $k),
                                    (bl = q[(Rk + 336) >> 2]),
                                    (0 | (q[(Rk + 344) >> 2] = bl)) < 1)
                                  )
                                    break n;
                                  for (
                                    Jk = bl << 2, $k = q[(Rk + 460) >> 2], el = q[(Rk + 456) >> 2];
                                    ;

                                  )
                                    if (
                                      ((q[((fl = (ok = (Jk + -4) | 0) << 2) + el) >> 2] =
                                        1065353216),
                                      (q[((gl = ((Jk <<= 2) + -4) | 0) + el) >> 2] = 1065353216),
                                      (q[(hl = ((Jk = (Jk + -12) | 0) + el) | 0) >> 2] =
                                        1065353216),
                                      (q[(hl + 4) >> 2] = 1065353216),
                                      (q[($k + fl) >> 2] = 0),
                                      (q[($k + gl) >> 2] = 1065353216),
                                      (q[(Jk = (Jk + $k) | 0) >> 2] = 0),
                                      (q[(Jk + 4) >> 2] = 0),
                                      (Jk = ok),
                                      !(0 < (0 | (bl = (bl + -1) | 0))))
                                    )
                                      break;
                                  break n;
                                }
                              }
                              ((q[(Rk + 344) >> 2] = Jk), (q[(Rk + 352) >> 2] = 0));
                            }
                            if ((($k = q[(cl + 72) >> 2]), 1 <= (0 | (q[(Rk + 484) >> 2] = $k))))
                              for (
                                gl = q[(Sk + 544) >> 2],
                                  hl = q[(Sk + 540) >> 2],
                                  il = q[(Sk + 536) >> 2],
                                  jl = q[(Sk + 532) >> 2],
                                  kl = q[(Sk + 528) >> 2],
                                  ol = q[(Rk + 488) >> 2],
                                  bl = 0;
                                ;

                              ) {
                                if (
                                  ((ok = (ol + w(bl, 28)) | 0),
                                  (el = q[((Jk = bl << 2) + jl) >> 2]),
                                  (q[(ok + 4) >> 2] = el),
                                  (q[ok >> 2] = q[(Jk + il) >> 2]),
                                  (fl = q[(Jk + hl) >> 2]),
                                  (q[(ok + 16) >> 2] = fl),
                                  (nl = q[(Jk + gl) >> 2]),
                                  (q[(ok + 20) >> 2] = nl),
                                  (q[(ok + 8) >> 2] = 0),
                                  (q[(ok + 24) >> 2] = 1 + ((fl - nl) | 0)),
                                  1 <= (0 | el))
                                )
                                  for (
                                    nl = q[(Jk + kl) >> 2],
                                      ll = q[(ok + 12) >> 2],
                                      pl = q[(Sk + 556) >> 2],
                                      rl = q[(Sk + 548) >> 2],
                                      ql = q[(Sk + 552) >> 2],
                                      Jk = 0;
                                    ;

                                  )
                                    if (
                                      ((fl = (Jk + nl) << 2),
                                      (q[((ok = (ll + (Jk << 4)) | 0) + 4) >> 2] =
                                        q[(fl + ql) >> 2]),
                                      (q[ok >> 2] = q[(fl + rl) >> 2]),
                                      (fl = q[(fl + pl) >> 2]),
                                      (q[(ok + 12) >> 2] = 0),
                                      (q[(ok + 8) >> 2] = fl),
                                      (0 | el) == (0 | (Jk = (Jk + 1) | 0)))
                                    )
                                      break;
                                if ((0 | $k) == (0 | (bl = (bl + 1) | 0))) break;
                              }
                            if (((Jk = q[(cl + 80) >> 2]), (0 | (q[(Rk + 504) >> 2] = Jk)) < 1))
                              $k = 0;
                            else {
                              for (
                                fl = q[(Sk + 600) >> 2],
                                  gl = q[(Sk + 588) >> 2],
                                  hl = q[(Sk + 592) >> 2],
                                  il = q[(Sk + 584) >> 2],
                                  jl = q[(Sk + 580) >> 2],
                                  bl = q[(Sk + 568) >> 2],
                                  kl = q[(Sk + 596) >> 2],
                                  el = q[(Rk + 672) >> 2],
                                  ol = q[(Rk + 508) >> 2];
                                ;

                              )
                                if (
                                  ((ok = (ol + w((Jk = (Jk + -1) | 0), 24)) | 0),
                                  ($k = Jk << 2),
                                  (q[ok >> 2] = el + w(q[($k + bl) >> 2], 36)),
                                  (q[(ok + 4) >> 2] = q[($k + jl) >> 2]),
                                  (q[(ok + 8) >> 2] = q[($k + il) >> 2]),
                                  (q[(ok + 12) >> 2] = q[($k + hl) >> 2]),
                                  ($k = q[($k + gl) >> 2]),
                                  (q[(ok + 20) >> 2] = fl + ($k << 1)),
                                  (q[(ok + 16) >> 2] = kl + ($k << 2)),
                                  !(0 < (0 | Jk)))
                                )
                                  break;
                              if ((0 | (Jk = q[(Rk + 504) >> 2])) < 1) $k = 0;
                              else {
                                for (fl = q[(Rk + 516) >> 2], $k = 0; ; )
                                  if (
                                    ((ok =
                                      q[
                                        (8 +
                                          ((el +
                                            w(
                                              q[((gl = (Jk = (Jk + -1) | 0) << 2) + bl) >> 2],
                                              36
                                            )) |
                                            0)) >>
                                          2
                                      ]),
                                    (q[(fl + gl) >> 2] = ok),
                                    ($k = (ok + $k) | 0),
                                    !(0 < (0 | Jk)))
                                  )
                                    break;
                                Jk = q[(Rk + 504) >> 2];
                              }
                            }
                            ((q[(Rk + 512) >> 2] = Jk), (q[(Rk + 520) >> 2] = $k));
                            r: if (4 <= r[(q[a >> 2] + 4) | 0]) {
                              if (!((bl = r[(q[dl >> 2] + 4) | 0]) >>> 0 < 4)) {
                                if (
                                  ((Jk = q[(cl + 120) >> 2]), 1 <= (0 | (q[(Rk + 676) >> 2] = Jk)))
                                ) {
                                  for (el = q[(Sk + 492) >> 2], fl = q[(Rk + 680) >> 2]; ; )
                                    if (
                                      (($k =
                                        (0 |
                                          ($k = q[((ok = (Jk = (Jk + -1) | 0) << 2) + el) >> 2])) <
                                        0
                                          ? (cl = dl = bl = 0)
                                          : ((bl = q[(ok + q[(Sk + 496) >> 2]) >> 2] << 2),
                                            (dl = (bl + q[(Sk + 508) >> 2]) | 0),
                                            (bl = (bl + q[(Sk + 504) >> 2]) | 0),
                                            (cl = q[(ok + q[(Sk + 500) >> 2]) >> 2]),
                                            (q[(Rk + 648) >> 2] + w($k, 52)) | 0)),
                                      (ok = (fl + w(Jk, 20)) | 0),
                                      (q[(ok + 12) >> 2] = cl),
                                      (q[(ok + 8) >> 2] = dl),
                                      (q[(ok + 4) >> 2] = bl),
                                      (q[ok >> 2] = $k),
                                      !(0 < (0 | Jk)))
                                    )
                                      break;
                                  if (((dl = q[Rk >> 2]), (bl = r[(q[dl >> 2] + 4) | 0]) >>> 0 < 4))
                                    break r;
                                }
                                if (
                                  (($k = q[(dl + 8) >> 2]),
                                  (Sk = q[($k + 12) >> 2]),
                                  (ok = q[(Sk + 100) >> 2]),
                                  1 <= (0 | (q[(Rk + 684) >> 2] = ok)))
                                )
                                  for (
                                    el = q[($k + 404) >> 2],
                                      fl = q[($k + 400) >> 2],
                                      gl = q[($k + 396) >> 2],
                                      hl = q[($k + 512) >> 2],
                                      il = q[(Rk + 688) >> 2];
                                    ;

                                  )
                                    if (
                                      ((Jk = (il + w((ok = (ok + -1) | 0), 28)) | 0),
                                      (cl = ok << 2),
                                      (q[Jk >> 2] = q[(cl + fl) >> 2]),
                                      (q[(Jk + 4) >> 2] = hl + (q[(cl + gl) >> 2] << 2)),
                                      (cl = q[(cl + el) >> 2]),
                                      (q[(Jk + 20) >> 2] = 1),
                                      (q[(Jk + 24) >> 2] = 1),
                                      (q[(Jk + 12) >> 2] = 0),
                                      (q[(Jk + 16) >> 2] = 0),
                                      (q[(Jk + 8) >> 2] = cl),
                                      !(0 < (0 | ok)))
                                    )
                                      break;
                                if (
                                  ((cl = q[(Sk + 104) >> 2]), 1 <= (0 | (q[(Rk + 692) >> 2] = cl)))
                                ) {
                                  for (;;) {
                                    if (
                                      ((cl = (cl + -1) | 0),
                                      (ok = (q[(Rk + 696) >> 2] + w(cl, 48)) | 0),
                                      (bl = cl << 2),
                                      (q[ok >> 2] =
                                        q[(Rk + 688) >> 2] +
                                        w(q[(bl + q[($k + 408) >> 2]) >> 2], 28)),
                                      (Jk = q[(bl + q[($k + 412) >> 2]) >> 2]),
                                      (q[(ok + 28) >> 2] = 1),
                                      (q[(ok + 32) >> 2] = 1),
                                      (q[(ok + 8) >> 2] = 0),
                                      (q[(ok + 4) >> 2] = Jk),
                                      (Sk = q[(bl + q[($k + 424) >> 2]) >> 2]),
                                      1 <= (0 | (q[(ok + 36) >> 2] = Sk)))
                                    )
                                      for (Jk = 0; ; )
                                        if (
                                          ((q[(q[(ok + 40) >> 2] + (Jk << 2)) >> 2] =
                                            q[(Rk + 680) >> 2] +
                                            w(
                                              q[
                                                (q[($k + 488) >> 2] +
                                                  ((q[(bl + q[($k + 420) >> 2]) >> 2] + Jk) <<
                                                    2)) >>
                                                  2
                                              ],
                                              20
                                            )),
                                          (0 | Sk) == (0 | (Jk = (Jk + 1) | 0)))
                                        )
                                          break;
                                    if (!(1 <= (0 | cl))) break;
                                  }
                                  ((dl = q[Rk >> 2]), (bl = r[(q[dl >> 2] + 4) | 0]));
                                }
                                if (!((255 & bl) >>> 0 < 4)) {
                                  if (
                                    ((ok = q[(a + 8) >> 2]),
                                    (cl = q[(ok + 12) >> 2]),
                                    (Jk = q[(cl + 108) >> 2]),
                                    1 <= (0 | (q[(Rk + 708) >> 2] = Jk)))
                                  )
                                    for (
                                      Sk = q[(ok + 444) >> 2],
                                        el = q[(ok + 448) >> 2],
                                        fl = q[(Rk + 696) >> 2],
                                        gl = q[(ok + 440) >> 2],
                                        hl = q[(Rk + 712) >> 2];
                                      ;

                                    )
                                      if (
                                        (($k = (hl + w((Jk = (Jk + -1) | 0), 12)) | 0),
                                        (bl = Jk << 2),
                                        (q[$k >> 2] = q[(bl + gl) >> 2]),
                                        (q[($k + 4) >> 2] = q[(bl + el) >> 2]),
                                        (q[($k + 8) >> 2] = fl + w(q[(Sk + bl) >> 2], 48)),
                                        !(0 < (0 | Jk)))
                                      )
                                        break;
                                  if (
                                    ((Jk = q[(cl + 112) >> 2]),
                                    1 <= (0 | (q[(Rk + 724) >> 2] = Jk)))
                                  )
                                    for (
                                      bl = q[(ok + 468) >> 2],
                                        cl = q[(ok + 472) >> 2],
                                        Sk = q[(Rk + 696) >> 2],
                                        el = q[(ok + 464) >> 2],
                                        fl = q[(Rk + 728) >> 2];
                                      ;

                                    )
                                      if (
                                        ((ok = (fl + w((Jk = (Jk + -1) | 0), 12)) | 0),
                                        ($k = Jk << 2),
                                        (q[ok >> 2] = q[($k + el) >> 2]),
                                        (q[(ok + 4) >> 2] = q[($k + cl) >> 2]),
                                        (q[(ok + 8) >> 2] = Sk + w(q[($k + bl) >> 2], 48)),
                                        !(0 < (0 | Jk)))
                                      )
                                        break;
                                  if (
                                    ((ok = q[(dl + 8) >> 2]),
                                    (bl = q[(ok + 512) >> 2]),
                                    ($k = q[(q[(ok + 12) >> 2] + 20) >> 2]),
                                    (q[(Rk + 752) >> 2] = q[(ok + 288) >> 2]),
                                    (cl = q[(ok + 280) >> 2]),
                                    (q[(Rk + 748) >> 2] = cl),
                                    !((0 | $k) < (Jk = 1)) &&
                                      ((q[cl >> 2] = bl + (q[q[(ok + 284) >> 2] >> 2] << 2)),
                                      1 != (0 | $k)))
                                  )
                                    for (;;)
                                      if (
                                        ((q[((cl = Jk << 2) + q[(Rk + 748) >> 2]) >> 2] =
                                          bl + (q[(cl + q[(ok + 284) >> 2]) >> 2] << 2)),
                                        (0 | $k) == (0 | (Jk = (Jk + 1) | 0)))
                                      )
                                        break;
                                }
                              }
                            } else if (!(q[(cl + 20) >> 2] < 1))
                              for (dl = 0; ; ) {
                                if (
                                  (($k = q[((el = dl << 2) + q[(Rk + 748) >> 2]) >> 2]),
                                  1 <= ((ok = 0) | (Jk = q[(el + q[(Sk + 268) >> 2]) >> 2])))
                                )
                                  for (
                                    cl = q[(el + q[(Sk + 264) >> 2]) >> 2],
                                      gl = (Jk + cl) | 0,
                                      hl = q[(Sk + 380) >> 2],
                                      il = q[(Sk + 376) >> 2];
                                    ;

                                  ) {
                                    if (1 <= (0 | (fl = q[((Jk = cl << 2) + hl) >> 2])))
                                      for (
                                        bl = q[(Jk + il) >> 2],
                                          jl = (fl + bl) | 0,
                                          kl = q[(Sk + 512) >> 2];
                                        ;

                                      ) {
                                        ((fl = ($k + (ok << 2)) | 0),
                                          (ml = u[(kl + (bl << 2)) >> 2]),
                                          (Jk = $k));
                                        t: {
                                          if (0 < (0 | ok))
                                            for (;;) {
                                              if (u[Jk >> 2] == ml) break t;
                                              if (!((Jk = (Jk + 4) | 0) >>> 0 < fl >>> 0)) break;
                                            }
                                          ((u[fl >> 2] = ml), (ok = (ok + 1) | 0));
                                        }
                                        if (!((0 | (bl = (bl + 1) | 0)) < (0 | jl))) break;
                                      }
                                    if (!((0 | (cl = (cl + 1) | 0)) < (0 | gl))) break;
                                  }
                                if (
                                  (!(function (a, bm) {
                                    var em = 0,
                                      fm = 0,
                                      gm = 0,
                                      hm = 0,
                                      im = 0;
                                    ((q[(8 + (L = em = (L - 208) | 0)) >> 2] = 1),
                                      (q[(12 + em) >> 2] = 0));
                                    a: if ((im = bm << 2)) {
                                      for (
                                        q[(16 + em) >> 2] = 4,
                                          q[(20 + em) >> 2] = 4,
                                          hm = bm = 4,
                                          fm = 2;
                                        ;

                                      )
                                        if (
                                          ((bm = (((hm + 4) | 0) + (gm = bm)) | 0),
                                          (q[(((16 + em) | 0) + (fm << 2)) >> 2] = bm),
                                          (fm = (fm + 1) | 0),
                                          (hm = gm),
                                          !(bm >>> 0 < im >>> 0))
                                        )
                                          break;
                                      if ((gm = (((a + im) | 0) - 4) | 0) >>> 0 <= a >>> 0)
                                        bm = fm = 1;
                                      else
                                        for (bm = fm = 1; ; )
                                          if (
                                            ((bm =
                                              3 == (3 & fm)
                                                ? (ta(a, bm, (16 + em) | 0),
                                                  ma((8 + em) | 0, 2),
                                                  (bm + 2) | 0)
                                                : (t[
                                                    (((16 + em) | 0) +
                                                      ((hm = (bm + -1) | 0) << 2)) >>
                                                      2
                                                  ] >=
                                                  (gm - a) >>> 0
                                                    ? la(a, (8 + em) | 0, bm, 0, (16 + em) | 0)
                                                    : ta(a, bm, (16 + em) | 0),
                                                  1 == (0 | bm)
                                                    ? (ka((8 + em) | 0, 1), 0)
                                                    : (ka((8 + em) | 0, hm), 1))),
                                            (fm = 1 | q[(8 + em) >> 2]),
                                            (q[(8 + em) >> 2] = fm),
                                            !((a = (a + 4) | 0) >>> 0 < gm >>> 0))
                                          )
                                            break;
                                      for (la(a, (8 + em) | 0, bm, 0, (16 + em) | 0); ; ) {
                                        e: {
                                          f: {
                                            g: {
                                              if (!((1 != (0 | bm)) | (1 != (0 | fm)))) {
                                                if (q[(12 + em) >> 2]) break g;
                                                break a;
                                              }
                                              if (1 < (0 | bm)) break f;
                                            }
                                            ((gm = Na((8 + em) | 0)),
                                              ma((8 + em) | 0, gm),
                                              (fm = q[(8 + em) >> 2]),
                                              (bm = (bm + gm) | 0));
                                            break e;
                                          }
                                          (ka((8 + em) | 0, 2),
                                            (q[(8 + em) >> 2] = 7 ^ q[(8 + em) >> 2]),
                                            ma((8 + em) | 0, 1),
                                            la(
                                              ((hm = (a + -4) | 0) -
                                                q[
                                                  (((16 + em) | 0) + ((gm = (bm + -2) | 0) << 2)) >>
                                                    2
                                                ]) |
                                                0,
                                              (8 + em) | 0,
                                              (bm + -1) | 0,
                                              1,
                                              (16 + em) | 0
                                            ),
                                            ka((8 + em) | 0, 1),
                                            (fm = 1 | q[(8 + em) >> 2]),
                                            (q[(8 + em) >> 2] = fm),
                                            la(hm, (8 + em) | 0, gm, 1, (16 + em) | 0),
                                            (bm = gm));
                                        }
                                        a = (a + -4) | 0;
                                      }
                                    }
                                    L = (208 + em) | 0;
                                  })($k, ok),
                                  (q[(el + q[(Rk + 752) >> 2]) >> 2] = ok),
                                  !((0 | (dl = (dl + 1) | 0)) < q[(q[(Sk + 12) >> 2] + 20) >> 2]))
                                )
                                  break;
                              }
                            if (!((bl = r[(q[a >> 2] + 4) | 0]) >>> 0 < 5)) {
                              if (
                                ((ok = q[(a + 8) >> 2]),
                                (cl = q[(ok + 12) >> 2]),
                                (Sk = q[Rk >> 2]),
                                !((fl = r[(q[Sk >> 2] + 4) | 0]) >>> 0 < 4))
                              ) {
                                if (
                                  ((Jk = q[(cl + 128) >> 2]), 1 <= (0 | (q[(Rk + 700) >> 2] = Jk)))
                                )
                                  for (
                                    dl = q[(ok + 432) >> 2],
                                      el = q[(ok + 436) >> 2],
                                      gl = q[(Rk + 696) >> 2],
                                      hl = q[(ok + 428) >> 2],
                                      il = q[(Rk + 704) >> 2];
                                    ;

                                  )
                                    if (
                                      ((a = (il + w((Jk = (Jk + -1) | 0), 12)) | 0),
                                      ($k = Jk << 2),
                                      (q[a >> 2] = q[($k + hl) >> 2]),
                                      (q[(a + 4) >> 2] = q[($k + el) >> 2]),
                                      (q[(a + 8) >> 2] = gl + w(q[($k + dl) >> 2], 48)),
                                      !(0 < (0 | Jk)))
                                    )
                                      break;
                                if (
                                  ((Jk = q[(cl + 132) >> 2]), 1 <= (0 | (q[(Rk + 716) >> 2] = Jk)))
                                )
                                  for (
                                    dl = q[(ok + 456) >> 2],
                                      el = q[(ok + 460) >> 2],
                                      gl = q[(Rk + 696) >> 2],
                                      hl = q[(ok + 452) >> 2],
                                      il = q[(Rk + 720) >> 2];
                                    ;

                                  )
                                    if (
                                      ((a = (il + w((Jk = (Jk + -1) | 0), 12)) | 0),
                                      ($k = Jk << 2),
                                      (q[a >> 2] = q[($k + hl) >> 2]),
                                      (q[(a + 4) >> 2] = q[($k + el) >> 2]),
                                      (q[(a + 8) >> 2] = gl + w(q[($k + dl) >> 2], 48)),
                                      !(0 < (0 | Jk)))
                                    )
                                      break;
                                if (
                                  ((Jk = q[(cl + 136) >> 2]),
                                  !((0 | (q[(Rk + 732) >> 2] = Jk)) < 1))
                                )
                                  for (
                                    dl = q[(ok + 480) >> 2],
                                      el = q[(ok + 484) >> 2],
                                      gl = q[(Rk + 696) >> 2],
                                      hl = q[(ok + 476) >> 2],
                                      il = q[(Rk + 736) >> 2];
                                    ;

                                  )
                                    if (
                                      ((a = (il + w((Jk = (Jk + -1) | 0), 12)) | 0),
                                      ($k = Jk << 2),
                                      (q[a >> 2] = q[($k + hl) >> 2]),
                                      (q[(a + 4) >> 2] = q[($k + el) >> 2]),
                                      (q[(a + 8) >> 2] = gl + w(q[($k + dl) >> 2], 48)),
                                      !(0 < (0 | Jk)))
                                    )
                                      break;
                              }
                              if (!(bl >>> 0 < 6)) {
                                if (
                                  ((a = q[(Sk + 8) >> 2]),
                                  (gl = q[(a + 296) >> 2]),
                                  (hl = q[(a + 32) >> 2]),
                                  ($k = q[(q[(a + 12) >> 2] + 140) >> 2]),
                                  1 <= (0 | (q[(Rk + 544) >> 2] = $k)))
                                ) {
                                  for (
                                    bl = q[(a + 28) >> 2],
                                      a = q[(a + 636) >> 2],
                                      il = q[(Rk + 40) >> 2],
                                      Sk = q[(Rk + 672) >> 2],
                                      jl = q[(Rk + 548) >> 2],
                                      Jk = $k;
                                    ;

                                  )
                                    if (
                                      ((dl = q[(a + ((Jk = (Jk + -1) | 0) << 2)) >> 2] << 2),
                                      (kl = q[(dl + bl) >> 2]),
                                      (el = (jl + w(Jk, 12)) | 0),
                                      (q[(el + 4) >> 2] = dl + il),
                                      (q[el >> 2] = Sk + w(kl, 36)),
                                      (q[(el + 8) >> 2] = gl + (q[(dl + hl) >> 2] << 2)),
                                      !(0 < (0 | Jk)))
                                    )
                                      break;
                                  for (el = q[(Rk + 556) >> 2], Jk = 0; ; )
                                    if (
                                      ((dl =
                                        q[
                                          (8 +
                                            ((Sk +
                                              w(
                                                q[
                                                  (bl +
                                                    (q[
                                                      ((gl = ($k = ($k + -1) | 0) << 2) + a) >> 2
                                                    ] <<
                                                      2)) >>
                                                    2
                                                ],
                                                36
                                              )) |
                                              0)) >>
                                            2
                                        ]),
                                      (q[(el + gl) >> 2] = dl),
                                      (Jk = (Jk + dl) | 0),
                                      !(0 < (0 | $k)))
                                    )
                                      break;
                                  if (
                                    ((q[(Rk + 560) >> 2] = Jk),
                                    (bl = q[(Rk + 544) >> 2]),
                                    !((0 | (q[(Rk + 552) >> 2] = bl)) < 1))
                                  )
                                    for (
                                      Jk = bl << 2,
                                        $k = q[(Rk + 640) >> 2],
                                        Sk = q[(Rk + 636) >> 2];
                                      ;

                                    )
                                      if (
                                        ((q[((dl = (a = (Jk + -4) | 0) << 2) + Sk) >> 2] =
                                          1065353216),
                                        (q[((el = ((Jk <<= 2) + -4) | 0) + Sk) >> 2] = 1065353216),
                                        (q[(gl = ((Jk = (Jk + -12) | 0) + Sk) | 0) >> 2] =
                                          1065353216),
                                        (q[(gl + 4) >> 2] = 1065353216),
                                        (q[($k + dl) >> 2] = 0),
                                        (q[($k + el) >> 2] = 1065353216),
                                        (q[(Jk = (Jk + $k) | 0) >> 2] = 0),
                                        (q[(Jk + 4) >> 2] = 0),
                                        (Jk = a),
                                        !(0 < (0 | (bl = (bl + -1) | 0))))
                                      )
                                        break;
                                } else ((q[(Rk + 552) >> 2] = $k), (q[(Rk + 560) >> 2] = 0));
                                if (
                                  !(
                                    fl >>> 0 < 4 ||
                                    ((Jk = q[(cl + 148) >> 2]), (0 | (q[(Rk + 740) >> 2] = Jk)) < 1)
                                  )
                                )
                                  for (
                                    $k = q[(ok + 672) >> 2],
                                      bl = q[(ok + 676) >> 2],
                                      cl = q[(Rk + 696) >> 2],
                                      Sk = q[(ok + 668) >> 2],
                                      dl = q[(Rk + 744) >> 2];
                                    ;

                                  )
                                    if (
                                      ((a = (dl + w((Jk = (Jk + -1) | 0), 12)) | 0),
                                      (ok = Jk << 2),
                                      (q[a >> 2] = q[(ok + Sk) >> 2]),
                                      (q[(a + 4) >> 2] = q[(ok + bl) >> 2]),
                                      (q[(a + 8) >> 2] = cl + w(q[(ok + $k) >> 2], 48)),
                                      !(0 < (0 | Jk)))
                                    )
                                      break;
                              }
                            }
                            Oa(Rk);
                          }
                          return ((L = (688 + al) | 0), Rk);
                        })(q[(a + 8) >> 2], Ba, Da))
                      )
                        break a;
                      ((q[(36 + Xa) >> 2] = 2218),
                        (q[(32 + Xa) >> 2] = 2429),
                        Y(4, 1294, (32 + Xa) | 0));
                    }
                  else
                    ((q[(20 + Xa) >> 2] = 1444),
                      (q[(16 + Xa) >> 2] = 2429),
                      Y(4, 1294, (16 + Xa) | 0));
                else ((q[(4 + Xa) >> 2] = 2132), (q[Xa >> 2] = 2429), Y(4, 1294, Xa));
                Ba = 0;
              }
              return ((L = (Xa + 64) | 0), 0 | Ba);
            }
            function wa(a) {
              var Ba;
              return (
                (L = Ba = (L - 16) | 0),
                (a = (a |= 0)
                  ? (function (a) {
                      var Al = 0;
                      return (
                        $((16 + (L = Al = (L - 688) | 0)) | 0, 0, 660),
                        Ga(r[(q[a >> 2] + 4) | 0], q[(a + 8) >> 2], (16 + Al) | 0, (12 + Al) | 0),
                        (L = (688 + Al) | 0),
                        q[(12 + Al) >> 2]
                      );
                    })(q[(a + 8) >> 2])
                  : ((q[(4 + Ba) >> 2] = 2132), (q[Ba >> 2] = 2411), Y(4, 1294, Ba), 0)),
                (L = (16 + Ba) | 0),
                0 | a
              );
            }
            function xa(a, Da) {
              var Ya;
              (X(q[(Da + 12) >> 2], 4, 64),
                da(q[(Da + 16) >> 2], 4),
                da((q[(Da + 16) >> 2] + 4) | 0, 4),
                da((q[(Da + 16) >> 2] + 8) | 0, 4),
                da((q[(Da + 16) >> 2] + 12) | 0, 4),
                da((q[(Da + 16) >> 2] + 16) | 0, 4),
                da((q[(Da + 16) >> 2] + 20) | 0, 1),
                X(q[(Da + 28) >> 2], 4, q[q[(Da + 12) >> 2] >> 2]),
                X(q[(Da + 32) >> 2], 4, q[q[(Da + 12) >> 2] >> 2]),
                X(q[(Da + 36) >> 2], 4, q[q[(Da + 12) >> 2] >> 2]),
                X(q[(Da + 40) >> 2], 4, q[q[(Da + 12) >> 2] >> 2]),
                X(q[(Da + 44) >> 2], 4, q[q[(Da + 12) >> 2] >> 2]),
                X(q[(Da + 48) >> 2], 4, q[q[(Da + 12) >> 2] >> 2]),
                X(q[(Da - -64) >> 2], 4, q[(q[(Da + 12) >> 2] + 4) >> 2]),
                X(q[(Da + 68) >> 2], 4, q[(q[(Da + 12) >> 2] + 4) >> 2]),
                X(q[(Da + 72) >> 2], 4, q[(q[(Da + 12) >> 2] + 4) >> 2]),
                X(q[(Da + 76) >> 2], 4, q[(q[(Da + 12) >> 2] + 4) >> 2]),
                X(q[(Da + 80) >> 2], 4, q[(q[(Da + 12) >> 2] + 4) >> 2]),
                X(q[(Da + 84) >> 2], 4, q[(q[(Da + 12) >> 2] + 4) >> 2]),
                X(q[(Da + 88) >> 2], 4, q[(q[(Da + 12) >> 2] + 4) >> 2]),
                X(q[(Da + 92) >> 2], 4, q[(q[(Da + 12) >> 2] + 8) >> 2]),
                X(q[(Da + 96) >> 2], 4, q[(q[(Da + 12) >> 2] + 8) >> 2]),
                X(q[(Da + 100) >> 2], 4, q[(q[(Da + 12) >> 2] + 8) >> 2]),
                X(q[(Da + 108) >> 2], 4, q[(q[(Da + 12) >> 2] + 8) >> 2]),
                X(q[(Da + 112) >> 2], 4, q[(q[(Da + 12) >> 2] + 8) >> 2]),
                X(q[(Da + 116) >> 2], 4, q[(q[(Da + 12) >> 2] + 8) >> 2]),
                X(q[(Da + 124) >> 2], 4, q[(q[(Da + 12) >> 2] + 12) >> 2]),
                X(q[(Da + 128) >> 2], 4, q[(q[(Da + 12) >> 2] + 12) >> 2]),
                X(q[(Da + 132) >> 2], 4, q[(q[(Da + 12) >> 2] + 12) >> 2]),
                X(q[(Da + 140) >> 2], 4, q[(q[(Da + 12) >> 2] + 12) >> 2]),
                X(q[(Da + 164) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 168) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 172) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 180) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 184) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 188) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 192) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 196) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 200) >> 2], 1, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 208) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 212) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 216) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 220) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 224) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 228) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                X(q[(Da + 240) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                X(q[(Da + 244) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                X(q[(Da + 248) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                X(q[(Da + 252) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                X(q[(Da + 256) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                X(q[(Da + 264) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                X(q[(Da + 268) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                X(q[(Da + 292) >> 2], 4, q[(q[(Da + 12) >> 2] + 24) >> 2]),
                X(q[(Da + 300) >> 2], 4, q[(q[(Da + 12) >> 2] + 28) >> 2]),
                X(q[(Da + 304) >> 2], 4, q[(q[(Da + 12) >> 2] + 28) >> 2]),
                X(q[(Da + 316) >> 2], 4, q[(q[(Da + 12) >> 2] + 32) >> 2]),
                X(q[(Da + 320) >> 2], 4, q[(q[(Da + 12) >> 2] + 32) >> 2]),
                X(q[(Da + 324) >> 2], 4, q[(q[(Da + 12) >> 2] + 32) >> 2]),
                X(q[(Da + 328) >> 2], 4, q[(q[(Da + 12) >> 2] + 32) >> 2]),
                X(q[(Da + 332) >> 2], 4, q[(q[(Da + 12) >> 2] + 32) >> 2]),
                X(q[(Da + 336) >> 2], 4, q[(q[(Da + 12) >> 2] + 32) >> 2]),
                X(q[(Da + 340) >> 2], 4, q[(q[(Da + 12) >> 2] + 32) >> 2]),
                X(q[(Da + 352) >> 2], 4, q[(q[(Da + 12) >> 2] + 36) >> 2]),
                X(q[(Da + 356) >> 2], 4, q[(q[(Da + 12) >> 2] + 36) >> 2]),
                X(q[(Da + 360) >> 2], 4, q[(q[(Da + 12) >> 2] + 36) >> 2]),
                X(q[(Da + 372) >> 2], 4, q[(q[(Da + 12) >> 2] + 40) >> 2]),
                X(q[(Da + 384) >> 2], 4, q[(q[(Da + 12) >> 2] + 44) >> 2]),
                X(q[(Da + 388) >> 2], 4, q[(q[(Da + 12) >> 2] + 48) >> 2]),
                X(q[(Da + 392) >> 2], 4, q[(q[(Da + 12) >> 2] + 48) >> 2]),
                X(q[(Da + 376) >> 2], 4, q[(q[(Da + 12) >> 2] + 52) >> 2]),
                X(q[(Da + 380) >> 2], 4, q[(q[(Da + 12) >> 2] + 52) >> 2]),
                X(q[(Da + 512) >> 2], 4, q[(q[(Da + 12) >> 2] + 56) >> 2]),
                X(q[(Da + 516) >> 2], 4, q[(q[(Da + 12) >> 2] + 60) >> 2]),
                X(q[(Da + 520) >> 2], 2, q[(q[(Da + 12) >> 2] + 64) >> 2]),
                X(q[(Da + 524) >> 2], 4, q[(q[(Da + 12) >> 2] + 68) >> 2]),
                X(q[(Da + 528) >> 2], 4, q[(q[(Da + 12) >> 2] + 72) >> 2]),
                X(q[(Da + 532) >> 2], 4, q[(q[(Da + 12) >> 2] + 72) >> 2]),
                X(q[(Da + 536) >> 2], 4, q[(q[(Da + 12) >> 2] + 72) >> 2]),
                X(q[(Da + 540) >> 2], 4, q[(q[(Da + 12) >> 2] + 72) >> 2]),
                X(q[(Da + 544) >> 2], 4, q[(q[(Da + 12) >> 2] + 72) >> 2]),
                X(q[(Da + 548) >> 2], 4, q[(q[(Da + 12) >> 2] + 76) >> 2]),
                X(q[(Da + 552) >> 2], 4, q[(q[(Da + 12) >> 2] + 76) >> 2]),
                X(q[(Da + 556) >> 2], 4, q[(q[(Da + 12) >> 2] + 76) >> 2]),
                X(q[(Da + 568) >> 2], 4, q[(q[(Da + 12) >> 2] + 80) >> 2]),
                X(q[(Da + 572) >> 2], 4, q[(q[(Da + 12) >> 2] + 80) >> 2]),
                X(q[(Da + 576) >> 2], 4, q[(q[(Da + 12) >> 2] + 80) >> 2]),
                X(q[(Da + 580) >> 2], 4, q[(q[(Da + 12) >> 2] + 80) >> 2]),
                X(q[(Da + 584) >> 2], 4, q[(q[(Da + 12) >> 2] + 80) >> 2]),
                X(q[(Da + 588) >> 2], 4, q[(q[(Da + 12) >> 2] + 80) >> 2]),
                X(q[(Da + 592) >> 2], 4, q[(q[(Da + 12) >> 2] + 80) >> 2]),
                X(q[(Da + 596) >> 2], 4, q[(q[(Da + 12) >> 2] + 84) >> 2]),
                X(q[(Da + 600) >> 2], 2, q[(q[(Da + 12) >> 2] + 84) >> 2]),
                X(q[(Da + 604) >> 2], 4, q[(q[(Da + 12) >> 2] + 88) >> 2]),
                (Ya = 255 & a) >>> 0 < 2 ||
                  (X(q[(Da + 120) >> 2], 4, q[(q[(Da + 12) >> 2] + 8) >> 2]), Ya >>> 0 < 4) ||
                  (X(q[(Da + 284) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                  X(q[(Da + 288) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                  X(q[(Da + 104) >> 2], 4, q[(q[(Da + 12) >> 2] + 8) >> 2]),
                  X(q[(Da + 136) >> 2], 4, q[(q[(Da + 12) >> 2] + 12) >> 2]),
                  X(q[(Da + 176) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                  X(q[(Da + 608) >> 2], 4, q[(q[(Da + 12) >> 2] + 92) >> 2]),
                  X(q[(Da + 612) >> 2], 4, q[(q[(Da + 12) >> 2] + 92) >> 2]),
                  X(q[(Da + 616) >> 2], 4, q[(q[(Da + 12) >> 2] + 92) >> 2]),
                  X(q[(Da + 620) >> 2], 4, q[(q[(Da + 12) >> 2] + 96) >> 2]),
                  X(q[(Da + 624) >> 2], 4, q[(q[(Da + 12) >> 2] + 96) >> 2]),
                  X(q[(Da + 628) >> 2], 4, q[(q[(Da + 12) >> 2] + 96) >> 2]),
                  X(q[(Da + 260) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                  X(q[(Da + 272) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                  X(q[(Da + 276) >> 2], 4, q[(q[(Da + 12) >> 2] + 20) >> 2]),
                  X(q[(Da + 396) >> 2], 4, q[(q[(Da + 12) >> 2] + 100) >> 2]),
                  X(q[(Da + 400) >> 2], 4, q[(q[(Da + 12) >> 2] + 100) >> 2]),
                  X(q[(Da + 404) >> 2], 4, q[(q[(Da + 12) >> 2] + 100) >> 2]),
                  X(q[(Da + 408) >> 2], 4, q[(q[(Da + 12) >> 2] + 104) >> 2]),
                  X(q[(Da + 412) >> 2], 4, q[(q[(Da + 12) >> 2] + 104) >> 2]),
                  X(q[(Da + 416) >> 2], 4, q[(q[(Da + 12) >> 2] + 104) >> 2]),
                  X(q[(Da + 420) >> 2], 4, q[(q[(Da + 12) >> 2] + 104) >> 2]),
                  X(q[(Da + 424) >> 2], 4, q[(q[(Da + 12) >> 2] + 104) >> 2]),
                  X(q[(Da + 440) >> 2], 4, q[(q[(Da + 12) >> 2] + 108) >> 2]),
                  X(q[(Da + 444) >> 2], 4, q[(q[(Da + 12) >> 2] + 108) >> 2]),
                  X(q[(Da + 448) >> 2], 4, q[(q[(Da + 12) >> 2] + 108) >> 2]),
                  X(q[(Da + 464) >> 2], 4, q[(q[(Da + 12) >> 2] + 112) >> 2]),
                  X(q[(Da + 468) >> 2], 4, q[(q[(Da + 12) >> 2] + 112) >> 2]),
                  X(q[(Da + 472) >> 2], 4, q[(q[(Da + 12) >> 2] + 112) >> 2]),
                  X(q[(Da + 488) >> 2], 4, q[(q[(Da + 12) >> 2] + 116) >> 2]),
                  X(q[(Da + 492) >> 2], 4, q[(q[(Da + 12) >> 2] + 120) >> 2]),
                  X(q[(Da + 496) >> 2], 4, q[(q[(Da + 12) >> 2] + 120) >> 2]),
                  X(q[(Da + 500) >> 2], 4, q[(q[(Da + 12) >> 2] + 120) >> 2]),
                  X(q[(Da + 504) >> 2], 4, q[(q[(Da + 12) >> 2] + 124) >> 2]),
                  X(q[(Da + 508) >> 2], 4, q[(q[(Da + 12) >> 2] + 124) >> 2]),
                  4 == (0 | (a &= 255))) ||
                  (X(q[(Da + 308) >> 2], 4, q[(q[(Da + 12) >> 2] + 28) >> 2]),
                  X(q[(Da + 312) >> 2], 4, q[(q[(Da + 12) >> 2] + 28) >> 2]),
                  X(q[(Da + 344) >> 2], 4, q[(q[(Da + 12) >> 2] + 32) >> 2]),
                  X(q[(Da + 348) >> 2], 4, q[(q[(Da + 12) >> 2] + 32) >> 2]),
                  X(q[(Da + 364) >> 2], 4, q[(q[(Da + 12) >> 2] + 36) >> 2]),
                  X(q[(Da + 368) >> 2], 4, q[(q[(Da + 12) >> 2] + 36) >> 2]),
                  X(q[(Da + 428) >> 2], 4, q[(q[(Da + 12) >> 2] + 128) >> 2]),
                  X(q[(Da + 432) >> 2], 4, q[(q[(Da + 12) >> 2] + 128) >> 2]),
                  X(q[(Da + 436) >> 2], 4, q[(q[(Da + 12) >> 2] + 128) >> 2]),
                  X(q[(Da + 452) >> 2], 4, q[(q[(Da + 12) >> 2] + 132) >> 2]),
                  X(q[(Da + 456) >> 2], 4, q[(q[(Da + 12) >> 2] + 132) >> 2]),
                  X(q[(Da + 460) >> 2], 4, q[(q[(Da + 12) >> 2] + 132) >> 2]),
                  X(q[(Da + 476) >> 2], 4, q[(q[(Da + 12) >> 2] + 136) >> 2]),
                  X(q[(Da + 480) >> 2], 4, q[(q[(Da + 12) >> 2] + 136) >> 2]),
                  X(q[(Da + 484) >> 2], 4, q[(q[(Da + 12) >> 2] + 136) >> 2]),
                  a >>> 0 < 6) ||
                  (X(q[(Da + 52) >> 2], 4, q[q[(Da + 12) >> 2] >> 2]),
                  X(q[(Da + 204) >> 2], 4, q[(q[(Da + 12) >> 2] + 16) >> 2]),
                  X(q[(Da + 636) >> 2], 4, q[(q[(Da + 12) >> 2] + 140) >> 2]),
                  X(q[(Da + 640) >> 2], 1, q[(q[(Da + 12) >> 2] + 140) >> 2]),
                  X(q[(Da + 644) >> 2], 4, q[(q[(Da + 12) >> 2] + 140) >> 2]),
                  X(q[(Da + 648) >> 2], 4, q[(q[(Da + 12) >> 2] + 140) >> 2]),
                  X(q[(Da + 652) >> 2], 4, q[(q[(Da + 12) >> 2] + 140) >> 2]),
                  X(q[(Da + 296) >> 2], 4, q[(q[(Da + 12) >> 2] + 24) >> 2]),
                  X(q[(Da + 656) >> 2], 4, q[(q[(Da + 12) >> 2] + 144) >> 2]),
                  X(q[(Da + 660) >> 2], 4, q[(q[(Da + 12) >> 2] + 144) >> 2]),
                  X(q[(Da + 664) >> 2], 4, q[(q[(Da + 12) >> 2] + 144) >> 2]),
                  X(q[(Da + 668) >> 2], 4, q[(q[(Da + 12) >> 2] + 148) >> 2]),
                  X(q[(Da + 672) >> 2], 4, q[(q[(Da + 12) >> 2] + 148) >> 2]),
                  X(q[(Da + 676) >> 2], 4, q[(q[(Da + 12) >> 2] + 148) >> 2])));
            }
            function ya(a, Da) {
              var Za = 0,
                jb = 0,
                kb = 0,
                mb = 0,
                nb = 0,
                pb = 0,
                lb = (a + Da) | 0;
              a: {
                b: if (!(1 & (Za = q[(a + 4) >> 2]))) {
                  if (!(3 & Za)) break a;
                  if (((Da = ((Za = q[a >> 2]) + Da) | 0), (0 | (a = (a - Za) | 0)) != q[2184]))
                    if (Za >>> 0 <= 255)
                      ((kb = Za >>> 3),
                        (Za = q[(a + 8) >> 2]),
                        (0 | (jb = q[(a + 12) >> 2])) == (0 | Za)
                          ? ((pb = q[2179] & vd(kb)), (q[8716 >> 2] = pb))
                          : ((q[(Za + 12) >> 2] = jb), (q[(jb + 8) >> 2] = Za)));
                    else {
                      if (((nb = q[(a + 24) >> 2]), (0 | (Za = q[(a + 12) >> 2])) != (0 | a)))
                        ((jb = q[(a + 8) >> 2]), (q[(jb + 12) >> 2] = Za), (q[(Za + 8) >> 2] = jb));
                      else if (
                        (kb = q[(jb = (a + 20) | 0) >> 2]) ||
                        (kb = q[(jb = (a + 16) | 0) >> 2])
                      ) {
                        for (;;)
                          if (
                            ((mb = jb),
                            !(
                              (kb = q[(jb = ((Za = kb) + 20) | 0) >> 2]) ||
                              ((jb = (Za + 16) | 0), (kb = q[(Za + 16) >> 2]))
                            ))
                          )
                            break;
                        q[mb >> 2] = 0;
                      } else Za = 0;
                      if (nb) {
                        jb = q[(a + 28) >> 2];
                        e: {
                          if (q[(kb = (9020 + (jb << 2)) | 0) >> 2] == (0 | a)) {
                            if ((q[kb >> 2] = Za)) break e;
                            ((pb = q[2180] & vd(jb)), (q[8720 >> 2] = pb));
                            break b;
                          }
                          if (!(q[(nb + (q[(nb + 16) >> 2] == (0 | a) ? 16 : 20)) >> 2] = Za))
                            break b;
                        }
                        ((q[(Za + 24) >> 2] = nb),
                          (jb = q[(a + 16) >> 2]) &&
                            ((q[(Za + 16) >> 2] = jb), (q[(jb + 24) >> 2] = Za)),
                          (jb = q[(a + 20) >> 2]) &&
                            ((q[(Za + 20) >> 2] = jb), (q[(jb + 24) >> 2] = Za)));
                      }
                    }
                  else if (3 == (3 & (Za = q[(4 + lb) >> 2])))
                    return (
                      (q[2181] = Da),
                      (q[(4 + lb) >> 2] = -2 & Za),
                      (q[(a + 4) >> 2] = 1 | Da),
                      void (q[lb >> 2] = Da)
                    );
                }
                f: {
                  if (!(2 & (Za = q[(4 + lb) >> 2]))) {
                    if (q[2185] == (0 | lb)) {
                      if (
                        ((q[2185] = a),
                        (Da = (q[2182] + Da) | 0),
                        (q[2182] = Da),
                        (q[(a + 4) >> 2] = 1 | Da),
                        q[2184] != (0 | a))
                      )
                        break a;
                      return ((q[2181] = 0), void (q[2184] = 0));
                    }
                    if (q[2184] == (0 | lb))
                      return (
                        (q[2184] = a),
                        (Da = (q[2181] + Da) | 0),
                        (q[2181] = Da),
                        (q[(a + 4) >> 2] = 1 | Da),
                        void (q[(a + Da) >> 2] = Da)
                      );
                    Da = ((-8 & Za) + Da) | 0;
                    g: if (Za >>> 0 <= 255)
                      ((kb = Za >>> 3),
                        (Za = q[(8 + lb) >> 2]),
                        (0 | (jb = q[(12 + lb) >> 2])) == (0 | Za)
                          ? ((pb = q[2179] & vd(kb)), (q[8716 >> 2] = pb))
                          : ((q[(Za + 12) >> 2] = jb), (q[(jb + 8) >> 2] = Za)));
                    else {
                      if (((nb = q[(24 + lb) >> 2]), (0 | lb) != (0 | (Za = q[(12 + lb) >> 2]))))
                        ((jb = q[(8 + lb) >> 2]),
                          (q[(jb + 12) >> 2] = Za),
                          (q[(Za + 8) >> 2] = jb));
                      else if (
                        (kb = q[(jb = (20 + lb) | 0) >> 2]) ||
                        (kb = q[(jb = (16 + lb) | 0) >> 2])
                      ) {
                        for (;;)
                          if (
                            ((mb = jb),
                            !(
                              (kb = q[(jb = ((Za = kb) + 20) | 0) >> 2]) ||
                              ((jb = (Za + 16) | 0), (kb = q[(Za + 16) >> 2]))
                            ))
                          )
                            break;
                        q[mb >> 2] = 0;
                      } else Za = 0;
                      if (nb) {
                        jb = q[(28 + lb) >> 2];
                        j: {
                          if (q[(kb = (9020 + (jb << 2)) | 0) >> 2] == (0 | lb)) {
                            if ((q[kb >> 2] = Za)) break j;
                            ((pb = q[2180] & vd(jb)), (q[8720 >> 2] = pb));
                            break g;
                          }
                          if (!(q[(nb + (q[(nb + 16) >> 2] == (0 | lb) ? 16 : 20)) >> 2] = Za))
                            break g;
                        }
                        ((q[(Za + 24) >> 2] = nb),
                          (jb = q[(16 + lb) >> 2]) &&
                            ((q[(Za + 16) >> 2] = jb), (q[(jb + 24) >> 2] = Za)),
                          (jb = q[(20 + lb) >> 2]) &&
                            ((q[(Za + 20) >> 2] = jb), (q[(jb + 24) >> 2] = Za)));
                      }
                    }
                    if (((q[(a + 4) >> 2] = 1 | Da), (q[(a + Da) >> 2] = Da), q[2184] != (0 | a)))
                      break f;
                    return void (q[2181] = Da);
                  }
                  ((q[(4 + lb) >> 2] = -2 & Za),
                    (q[(a + 4) >> 2] = 1 | Da),
                    (q[(a + Da) >> 2] = Da));
                }
                if (Da >>> 0 <= 255)
                  return (
                    (Da = (8756 + ((Za = Da >>> 3) << 3)) | 0),
                    (Za =
                      (jb = q[2179]) & (Za = 1 << Za)
                        ? q[(Da + 8) >> 2]
                        : ((q[2179] = Za | jb), Da)),
                    (q[(Da + 8) >> 2] = a),
                    (q[(Za + 12) >> 2] = a),
                    (q[(a + 12) >> 2] = Da),
                    void (q[(a + 8) >> 2] = Za)
                  );
                ((q[(a + 16) >> 2] = 0),
                  (Za = q[(a + 20) >> 2] = 0),
                  (kb = Da >>> 8) &&
                    ((Za = 31),
                    16777215 < Da >>> 0 ||
                      (Za =
                        (28 +
                          (((Za =
                            ((((lb =
                              (kb <<= mb = ((kb + 1048320) >>> 16) & 8) <<
                              (Za = ((kb + 520192) >>> 16) & 4)) <<
                              (kb = ((245760 + lb) >>> 16) & 2)) >>>
                              15) -
                              (kb | Za | mb)) |
                            0) <<
                            1) |
                            ((Da >>> (Za + 21)) & 1))) |
                        0)),
                  (kb = (9020 + ((q[((jb = a) + 28) >> 2] = Za) << 2)) | 0));
                m: {
                  if ((jb = q[2180]) & (mb = 1 << Za)) {
                    for (
                      jb = Da << (31 == (0 | Za) ? 0 : (25 - (Za >>> 1)) | 0), Za = q[kb >> 2];
                      ;

                    ) {
                      if ((-8 & q[((kb = Za) + 4) >> 2]) == (0 | Da)) break m;
                      if (
                        ((Za = jb >>> 29),
                        (jb <<= 1),
                        !(Za = q[((mb = (kb + (4 & Za)) | 0) + 16) >> 2]))
                      )
                        break;
                    }
                    q[(mb + 16) >> 2] = a;
                  } else ((q[2180] = jb | mb), (q[kb >> 2] = a));
                  return (
                    (q[(a + 24) >> 2] = kb),
                    (q[(a + 12) >> 2] = a),
                    void (q[(a + 8) >> 2] = a)
                  );
                }
                ((Da = q[(kb + 8) >> 2]),
                  (q[(Da + 12) >> 2] = a),
                  (q[(kb + 8) >> 2] = a),
                  (q[(a + 24) >> 2] = 0),
                  (q[(a + 12) >> 2] = kb),
                  (q[(a + 8) >> 2] = Da));
              }
            }
            function za(a) {
              var tb,
                vb,
                wb,
                yb,
                zb,
                Ab,
                Da = x(0),
                qb = x(0),
                rb = 0,
                sb = 0,
                ub = (x(0), x(0)),
                xb = (x(0), x(0), 0);
              (x(0), x(0));
              a: {
                b: {
                  if ((j(a), (sb = 2147483647 & (rb = b[0])))) {
                    if (!(sb >>> 0 < 2139095041)) return x(x(0.10000000149011612) + a);
                    if (1065353216 == (0 | sb)) return x(-1 < (0 | rb) ? 0.10000000149011612 : 10);
                    if (2139095040 == (0 | sb)) return x(-1 < (0 | rb) ? 0 : -a);
                    if (1073741824 == (0 | rb)) return x(0.010000000707805157);
                    if (1056964608 == (0 | rb)) return x(0.3162277638912201);
                    if (1291845633 <= sb >>> 0) return x((0 | rb) < 0 ? H : 0);
                    if (
                      ((tb = u[1793]),
                      (ub = x(x(1.600000023841858) - tb)),
                      (vb = x(x(1) / x(tb + x(1.600000023841858)))),
                      f(0, -4096 & (j((qb = x(ub * vb))), b[0])),
                      (Da = k()),
                      (wb = x(Da * Da)),
                      (zb = u[1797]),
                      (tb = x(
                        vb *
                          x(
                            x(ub - x((yb = Da) * x(3.099609375))) -
                              x(Da * x(x(1.600000023841858) - x(x(3.099609375) - tb)))
                          )
                      )),
                      (vb = x(x(qb + Da) * tb)),
                      (Da = x(qb * qb)),
                      (ub = x(
                        vb +
                          x(
                            x(Da * Da) *
                              x(
                                x(
                                  Da *
                                    x(
                                      x(
                                        Da *
                                          x(
                                            x(
                                              Da *
                                                x(
                                                  x(
                                                    Da *
                                                      x(
                                                        x(Da * x(0.20697501301765442)) +
                                                          x(0.23066075146198273)
                                                      )
                                                  ) + x(0.2727281153202057)
                                                )
                                            ) + x(0.3333333432674408)
                                          )
                                      ) + x(0.4285714328289032)
                                    )
                                ) + x(0.6000000238418579)
                              )
                          )
                      )),
                      f(0, -4096 & (j(x(x(wb + x(3)) + ub)), b[0])),
                      (Da = k()),
                      (vb = x(yb * Da)),
                      (qb = x(x(tb * Da) + x(qb * x(ub - x(x(Da + x(-3)) - wb))))),
                      f(0, -4096 & (j(x(vb + qb)), b[0])),
                      (Da = k()),
                      (tb = x(Da * x(0.9619140625))),
                      (wb = x(
                        u[1795] +
                          x(
                            x(x(qb - x(Da - vb)) * x(0.9617967009544373)) +
                              x(Da * x(-0.00011736857413779944))
                          )
                      )),
                      f(0, -4096 & (j(x(x(zb + x(tb + wb)) + x(-4))), b[0])),
                      (qb = k()),
                      f(0, -4096 & rb),
                      (ub = k()),
                      (Da = x(qb * ub)),
                      (a = x(x(x(wb - x(x(x(qb - x(-4)) - zb) - tb)) * a) + x(x(a - ub) * qb))),
                      j((qb = x(Da + a))),
                      1124073473 <= (0 | (rb = b[0])))
                    )
                      break b;
                    d: {
                      if ((sb = 1124073472) == (0 | rb)) {
                        if (x(a + x(4.299566569443414e-8)) > x(qb - Da)) break b;
                      } else {
                        if (
                          ((sb = 2147483647 & rb),
                          !(((a <= x(qb - Da)) ^ 1) | (-1021968384 != (0 | rb))) |
                            (1125515265 <= sb >>> 0))
                        )
                          break a;
                        if (sb >>> 0 < 1056964609) break d;
                      }
                      ((xb =
                        ((8388607 & (sb = ((8388608 >>> ((sb >>> 23) - 126)) + rb) | 0)) |
                          8388608) >>>
                        (150 - (Ab = (sb >>> 23) & 255))),
                        (xb = (0 | rb) < 0 ? (0 - xb) | 0 : xb),
                        (Da = x(Da - (f(0, sb & (-8388608 >> (Ab - 127))), k()))),
                        j(x(a + Da)),
                        (rb = b[0]));
                    }
                    (f(0, -32768 & rb),
                      (qb = k()),
                      (tb = x(qb * x(0.693145751953125))),
                      (qb = x(
                        x(qb * x(14286065379565116e-22)) +
                          x(x(a - x(qb - Da)) * x(0.6931471824645996))
                      )),
                      (a = x(tb + qb)),
                      (Da = x(a * a)),
                      (Da = x(
                        a -
                          x(
                            Da *
                              x(
                                x(
                                  Da *
                                    x(
                                      x(
                                        Da *
                                          x(
                                            x(
                                              Da *
                                                x(
                                                  x(Da * x(4.138136944220605e-8)) +
                                                    x(-16533901998627698e-22)
                                                )
                                            ) + x(661375597701408e-19)
                                          )
                                      ) + x(-0.0027777778450399637)
                                    )
                                ) + x(0.1666666716337204)
                              )
                          )
                      )),
                      (yb = x(x(a * Da) / x(Da + x(-2)))),
                      (Da = x(qb - x(a - tb))),
                      (a =
                        (0 |
                          (rb =
                            0 |
                            (j((a = x(x(a - x(yb - x(Da + x(a * Da)))) + x(1)))),
                            b[0] + (xb << 23)))) <=
                        8388607
                          ? (function (a, Bj) {
                              var fk = 0;
                              128 <= (0 | Bj)
                                ? ((a = x(a * x(17014118346046923e22))),
                                  (Bj =
                                    (0 | (fk = (Bj + -127) | 0)) < 128
                                      ? fk
                                      : ((a = x(a * x(17014118346046923e22))),
                                        (((0 | Bj) < 381 ? Bj : 381) + -254) | 0)))
                                : -127 < (0 | Bj) ||
                                  ((a = x(a * x(11754943508222875e-54))),
                                  (Bj =
                                    -127 < (0 | (fk = (Bj + 126) | 0))
                                      ? fk
                                      : ((a = x(a * x(11754943508222875e-54))),
                                        ((-378 < (0 | Bj) ? Bj : -378) + 252) | 0)));
                              return x(a * (f(0, (1065353216 + (Bj << 23)) | 0), k()));
                            })(a, xb)
                          : (f(0, rb), k())),
                      (a = x(x(1) * a)));
                  } else a = x(1);
                  return a;
                }
                return x(H);
              }
              return x(0);
            }
            function Aa(a, Bb) {
              var Hb,
                Cb = 0,
                Db = 0,
                Eb = 0,
                Fb = 0,
                Gb = x(0);
              if (
                (j(Bb),
                !(
                  (Eb = 2147483647 & (Cb = b[0])) >>> 0 <= 2139095040 &&
                  (j(a), (Db = 2147483647 & (Fb = b[0])) >>> 0 < 2139095041)
                ))
              )
                return x(a + Bb);
              if (1065353216 == (0 | Cb)) return Ba(a);
              Cb = (Hb = (Cb >>> 30) & 2) | (Fb >>> 31);
              b: {
                c: {
                  d: {
                    e: {
                      if (!Db) {
                        f: switch ((Cb - 2) | 0) {
                          case 0:
                            break e;
                          case 1:
                            break f;
                          default:
                            break d;
                        }
                        return x(-3.1415927410125732);
                      }
                      if (2139095040 != (0 | Eb)) {
                        if (!Eb | !(Db >>> 0 <= (Eb + 218103808) >>> 0 && 2139095040 != (0 | Db)))
                          break b;
                        if (
                          ((a = Gb =
                            (Db + 218103808) >>> 0 < Eb >>> 0 && ((Gb = x(0)), Hb)
                              ? Gb
                              : Ba(x(y(x(a / Bb))))),
                          Cb >>> 0 <= 2)
                        ) {
                          h: switch ((Cb - 1) | 0) {
                            case 0:
                              return x(-a);
                            case 1:
                              break h;
                            default:
                              break d;
                          }
                          return x(x(3.1415927410125732) - x(a + x(8.742277657347586e-8)));
                        }
                        return x(x(a + x(8.742277657347586e-8)) + x(-3.1415927410125732));
                      }
                      if (2139095040 == (0 | Db)) break c;
                      return u[(7152 + (Cb << 2)) >> 2];
                    }
                    a = x(3.1415927410125732);
                  }
                  return a;
                }
                return u[(7136 + (Cb << 2)) >> 2];
              }
              return x((0 | Fb) < 0 ? -1.5707963705062866 : 1.5707963705062866);
            }
            function Ba(a) {
              var Ib,
                Lb,
                Mb,
                Bb = 0,
                Jb = (x(0), 0),
                Kb = 0;
              (x(0), x(0));
              j(a);
              a: {
                if (1283457024 <= (Bb = 2147483647 & (Kb = b[0])) >>> 0) {
                  if (2139095040 < Bb >>> 0) break a;
                  return x((0 | Kb) < 0 ? -1.570796251296997 : 1.570796251296997);
                }
                b: {
                  if (Bb >>> 0 <= 1054867455) {
                    if (((Jb = -1), 964689920 <= Bb >>> 0)) break b;
                    break a;
                  }
                  ((a = x(y(a))),
                    Bb >>> 0 <= 1066926079
                      ? (Jb =
                          Bb >>> 0 <= 1060110335
                            ? ((a = x(x(x(a + a) + x(-1)) / x(a + x(2)))), 0)
                            : ((a = x(x(a + x(-1)) / x(a + x(1)))), 1))
                      : (Jb =
                          Bb >>> 0 <= 1075576831
                            ? ((a = x(x(a + x(-1.5)) / x(x(a * x(1.5)) + x(1)))), 2)
                            : ((a = x(x(-1) / a)), 3)));
                }
                if (
                  ((Bb = Jb),
                  (Lb = x(a * a)),
                  (Ib = x(Lb * Lb)),
                  (Mb = x(Ib * x(x(Ib * x(-0.106480173766613)) + x(-0.19999158382415771)))),
                  (Ib = x(
                    Lb *
                      x(
                        x(Ib * x(x(Ib * x(0.06168760731816292)) + x(0.14253635704517365))) +
                          x(0.333333283662796)
                      )
                  )),
                  (0 | Bb) <= -1)
                )
                  return x(a - x(a * x(Mb + Ib)));
                ((a = x(
                  u[(7104 + (Bb <<= 2)) >> 2] - x(x(x(a * x(Mb + Ib)) - u[(7120 + Bb) >> 2]) - a)
                )),
                  (a = (0 | Kb) < 0 ? x(-a) : a));
              }
              return a;
            }
            function Ca(a, Nb) {
              var Sb,
                Qb,
                Ob = 0,
                Pb = 0,
                Rb = 0;
              return (
                (L = Qb = (L - 16) | 0),
                j(a),
                (Ob = 2147483647 & (Rb = b[0])) >>> 0 <= 1305022426
                  ? ((v[Nb >> 3] =
                      (Sb = +a) +
                      -1.5707963109016418 *
                        (Pb = 0.6366197723675814 * Sb + 6755399441055744 - 6755399441055744) +
                      -1.5893254773528196e-8 * Pb),
                    (Ob = y(Pb) < 2147483648 ? ~~Pb : -2147483648))
                  : 2139095040 <= Ob >>> 0
                    ? ((v[Nb >> 3] = x(a - a)), (Ob = 0))
                    : ((Sb = Ob),
                      (v[(8 + Qb) >> 3] =
                        (f(0, (Sb - ((Ob = ((Ob >>> 23) - 150) | 0) << 23)) | 0), k())),
                      (Ob = (function (a, ok, pk) {
                        var qk = 0,
                          rk = 0,
                          sk = 0,
                          tk = 0,
                          uk = 0,
                          vk = 0,
                          wk = 0,
                          xk = 0,
                          yk = 0,
                          zk = 0,
                          Ak = 0,
                          Bk = 0,
                          Ck = 0,
                          Dk = 0,
                          Ek = 0,
                          Fk = 0,
                          Gk = 0;
                        if (
                          ((L = tk = (L - 560) | 0),
                          (xk =
                            ((rk = pk) +
                              w((Ck = 0 < (0 | (pk = (((pk + -3) | 0) / 24) | 0)) ? pk : 0), -24)) |
                            0),
                          0 <= (0 | (yk = q[1064])))
                        )
                          for (rk = (yk + 1) | 0, pk = Ck; ; )
                            if (
                              ((v[(((320 + tk) | 0) + (sk << 3)) >> 3] =
                                (0 | pk) < 0 ? 0 : +q[(4272 + (pk << 2)) >> 2]),
                              (pk = (pk + 1) | 0),
                              (0 | rk) == (0 | (sk = (sk + 1) | 0)))
                            )
                              break;
                        ((vk = (xk + -24) | 0), (rk = 0));
                        for (;;) {
                          for (qk = pk = 0; ; )
                            if (
                              ((qk +=
                                v[((pk << 3) + a) >> 3] *
                                v[(((320 + tk) | 0) + ((rk - pk) << 3)) >> 3]),
                              1 == (0 | (pk = (pk + 1) | 0)))
                            )
                              break;
                          if (
                            ((v[((rk << 3) + tk) >> 3] = qk),
                            (pk = (0 | rk) < (0 | yk)),
                            (rk = (rk + 1) | 0),
                            !pk)
                          )
                            break;
                        }
                        ((Gk = (23 - vk) | 0), (Dk = (24 - vk) | 0), (rk = yk));
                        a: {
                          for (;;) {
                            if (
                              ((qk = v[((rk << 3) + tk) >> 3]), !(Ak = ((pk = 0) | (sk = rk)) < 1))
                            )
                              for (;;)
                                if (
                                  ((wk = (((480 + tk) | 0) + (pk << 2)) | 0),
                                  (zk = qk),
                                  (uk =
                                    y((qk *= 5.960464477539063e-8)) < 2147483648
                                      ? ~~qk
                                      : -2147483648),
                                  (uk =
                                    y((zk += -16777216 * (qk = 0 | uk))) < 2147483648
                                      ? ~~zk
                                      : -2147483648),
                                  (q[wk >> 2] = uk),
                                  (qk = v[(((sk = (sk + -1) | 0) << 3) + tk) >> 3] + qk),
                                  (0 | rk) == (0 | (pk = (pk + 1) | 0)))
                                )
                                  break;
                            ((qk = ja(qk, vk)),
                              (qk += -8 * C(0.125 * qk)),
                              (wk = y(qk) < 2147483648 ? ~~qk : -2147483648),
                              (qk -= 0 | wk));
                            e: {
                              f: {
                                g: {
                                  if ((Ek = (0 | vk) < 1)) {
                                    if (vk) break g;
                                    uk = q[(476 + (((rk << 2) + tk) | 0)) >> 2] >> 23;
                                  } else
                                    ((uk = q[((sk = ((rk << 2) + tk) | 0) + 476) >> 2]),
                                      (Bk = sk),
                                      (sk = (uk - ((pk = uk >> Dk) << Dk)) | 0),
                                      (q[(Bk + 476) >> 2] = sk),
                                      (wk = (pk + wk) | 0),
                                      (uk = sk >> Gk));
                                  if ((0 | uk) < 1) break e;
                                  break f;
                                }
                                if (((uk = 2), !(0.5 <= qk))) {
                                  uk = 0;
                                  break e;
                                }
                              }
                              if (((sk = pk = 0), !Ak))
                                for (;;) {
                                  ((Ak = q[(Fk = (((480 + tk) | 0) + (pk << 2)) | 0) >> 2]),
                                    (Bk = 16777215));
                                  i: {
                                    j: {
                                      if (!sk) {
                                        if (!Ak) break j;
                                        ((Bk = 16777216), (sk = 1));
                                      }
                                      q[Fk >> 2] = Bk - Ak;
                                      break i;
                                    }
                                    sk = 0;
                                  }
                                  if ((0 | rk) == (0 | (pk = (pk + 1) | 0))) break;
                                }
                              (Ek ||
                                1 < (pk = (vk + -1) | 0) >>> 0 ||
                                (q[((pk = ((rk << 2) + tk) | 0) + 476) >> 2] =
                                  pk - 1
                                    ? 8388607 & q[(pk + 476) >> 2]
                                    : 4194303 & q[(pk + 476) >> 2]),
                                (wk = (wk + 1) | 0),
                                2 == (0 | uk) &&
                                  ((qk = 1 - qk), (uk = 2), sk) &&
                                  (qk -= ja(1, vk)));
                            }
                            if (0 != qk) break;
                            if (!(((sk = 0) | (pk = rk)) <= (0 | yk))) {
                              for (;;)
                                if (
                                  ((sk =
                                    q[(((480 + tk) | 0) + ((pk = (pk + -1) | 0) << 2)) >> 2] | sk),
                                  !((0 | yk) < (0 | pk)))
                                )
                                  break;
                              if (sk) {
                                for (xk = vk; ; )
                                  if (
                                    ((xk = (xk + -24) | 0),
                                    q[(((480 + tk) | 0) + ((rk = (rk + -1) | 0) << 2)) >> 2])
                                  )
                                    break;
                                break a;
                              }
                            }
                            for (pk = 1; ; )
                              if (
                                ((pk = ((sk = pk) + 1) | 0),
                                q[(((480 + tk) | 0) + ((yk - sk) << 2)) >> 2])
                              )
                                break;
                            for (sk = (rk + sk) | 0; ; ) {
                              for (
                                rk = wk = (rk + 1) | 0,
                                  v[(((320 + tk) | 0) + (wk << 3)) >> 3] =
                                    q[(4272 + ((Ck + rk) << 2)) >> 2],
                                  qk = pk = 0;
                                ;

                              )
                                if (
                                  ((qk +=
                                    v[((pk << 3) + a) >> 3] *
                                    v[(((320 + tk) | 0) + ((wk - pk) << 3)) >> 3]),
                                  1 == (0 | (pk = (pk + 1) | 0)))
                                )
                                  break;
                              if (((v[((rk << 3) + tk) >> 3] = qk), !((0 | rk) < (0 | sk)))) break;
                            }
                            rk = sk;
                          }
                          (16777216 <= (qk = ja(qk, (0 - vk) | 0))
                            ? ((a = (((480 + tk) | 0) + (rk << 2)) | 0),
                              (zk = qk),
                              (pk =
                                y((qk *= 5.960464477539063e-8)) < 2147483648 ? ~~qk : -2147483648),
                              (sk =
                                y((qk = zk + -16777216 * (0 | pk))) < 2147483648
                                  ? ~~qk
                                  : -2147483648),
                              (q[a >> 2] = sk),
                              (rk = (rk + 1) | 0))
                            : ((pk = y(qk) < 2147483648 ? ~~qk : -2147483648), (xk = vk)),
                            (q[(((480 + tk) | 0) + (rk << 2)) >> 2] = pk));
                        }
                        qk = ja(1, xk);
                        if (!((0 | rk) <= -1)) {
                          for (pk = rk; ; )
                            if (
                              ((v[((pk << 3) + tk) >> 3] =
                                qk * +q[(((480 + tk) | 0) + (pk << 2)) >> 2]),
                              (qk *= 5.960464477539063e-8),
                              (a = 0 < (0 | pk)),
                              (pk = (pk + -1) | 0),
                              !a)
                            )
                              break;
                          if (!((0 | rk) <= -1))
                            for (pk = rk; ; ) {
                              for (vk = (rk - (a = pk)) | 0, pk = qk = 0; ; )
                                if (
                                  ((qk +=
                                    v[(7040 + (pk << 3)) >> 3] * v[(((a + pk) << 3) + tk) >> 3]),
                                  (0 | yk) <= (0 | pk) ||
                                    ((xk = pk >>> 0 < vk >>> 0), (pk = (pk + 1) | 0), !xk))
                                )
                                  break;
                              if (
                                ((v[(((160 + tk) | 0) + (vk << 3)) >> 3] = qk),
                                (pk = (a + -1) | 0),
                                !(0 < (0 | a)))
                              )
                                break;
                            }
                        }
                        if (0 <= (rk | (qk = 0)))
                          for (;;)
                            if (
                              ((qk += v[(((160 + tk) | 0) + (rk << 3)) >> 3]),
                              (a = 0 < (0 | rk)),
                              (rk = (rk + -1) | 0),
                              !a)
                            )
                              break;
                        return ((v[ok >> 3] = uk ? -qk : qk), (L = (560 + tk) | 0), 7 & wk);
                      })((8 + Qb) | 0, Qb, Ob)),
                      (Pb = v[Qb >> 3]),
                      (0 | Rb) <= -1
                        ? ((v[Nb >> 3] = -Pb), (Ob = (0 - Ob) | 0))
                        : (v[Nb >> 3] = Pb)),
                (L = (16 + Qb) | 0),
                Ob
              );
            }
            function Da(a, Nb) {
              return a
                ? (function (a, ok) {
                    a: {
                      if (a) {
                        if (ok >>> 0 <= 127) break a;
                        if (q[q[1881] >> 2]) {
                          if (ok >>> 0 <= 2047)
                            return (
                              (o[(a + 1) | 0] = (63 & ok) | 128),
                              (o[0 | a] = (ok >>> 6) | 192),
                              2
                            );
                          if (!(57344 != (-8192 & ok) && 55296 <= ok >>> 0))
                            return (
                              (o[(a + 2) | 0] = (63 & ok) | 128),
                              (o[0 | a] = (ok >>> 12) | 224),
                              (o[(a + 1) | 0] = ((ok >>> 6) & 63) | 128),
                              3
                            );
                          if ((ok + -65536) >>> 0 <= 1048575)
                            return (
                              (o[(a + 3) | 0] = (63 & ok) | 128),
                              (o[0 | a] = (ok >>> 18) | 240),
                              (o[(a + 2) | 0] = ((ok >>> 6) & 63) | 128),
                              (o[(a + 1) | 0] = ((ok >>> 12) & 63) | 128),
                              4
                            );
                        } else if (57216 == (-128 & ok)) break a;
                        ((q[2178] = 25), (a = -1));
                      } else a = 1;
                      return a;
                    }
                    return ((o[0 | a] = ok), 1);
                  })(a, Nb)
                : 0;
            }
            function Ea(a, Nb, Ub, Vb) {
              a: {
                if (!(20 < Nb >>> 0 || 9 < (Nb = (Nb + -9) | 0) >>> 0)) {
                  c: switch ((Nb - 1) | 0) {
                    default:
                      return (
                        (Nb = q[Ub >> 2]),
                        (q[Ub >> 2] = Nb + 4),
                        void (q[a >> 2] = q[Nb >> 2])
                      );
                    case 0:
                      return (
                        (Nb = q[Ub >> 2]),
                        (q[Ub >> 2] = Nb + 4),
                        (Nb = q[Nb >> 2]),
                        (q[a >> 2] = Nb),
                        void (q[(a + 4) >> 2] = Nb >> 31)
                      );
                    case 1:
                      return (
                        (Nb = q[Ub >> 2]),
                        (q[Ub >> 2] = Nb + 4),
                        (q[a >> 2] = q[Nb >> 2]),
                        void (q[(a + 4) >> 2] = 0)
                      );
                    case 3:
                      return (
                        (Nb = q[Ub >> 2]),
                        (q[Ub >> 2] = Nb + 4),
                        (Nb = p[Nb >> 1]),
                        (q[a >> 2] = Nb),
                        void (q[(a + 4) >> 2] = Nb >> 31)
                      );
                    case 4:
                      return (
                        (Nb = q[Ub >> 2]),
                        (q[Ub >> 2] = Nb + 4),
                        (q[a >> 2] = s[Nb >> 1]),
                        void (q[(a + 4) >> 2] = 0)
                      );
                    case 5:
                      return (
                        (Nb = q[Ub >> 2]),
                        (q[Ub >> 2] = Nb + 4),
                        (Nb = o[0 | Nb]),
                        (q[a >> 2] = Nb),
                        void (q[(a + 4) >> 2] = Nb >> 31)
                      );
                    case 6:
                      return (
                        (Nb = q[Ub >> 2]),
                        (q[Ub >> 2] = Nb + 4),
                        (q[a >> 2] = r[0 | Nb]),
                        void (q[(a + 4) >> 2] = 0)
                      );
                    case 2:
                    case 7:
                      break a;
                    case 8:
                      break c;
                  }
                  n[Vb](a, Ub);
                }
                return;
              }
              ((Nb = (q[Ub >> 2] + 7) & -8),
                (q[Ub >> 2] = Nb + 8),
                (Ub = q[(Nb + 4) >> 2]),
                (q[a >> 2] = q[Nb >> 2]),
                (q[(a + 4) >> 2] = Ub));
            }
            function Fa(a) {
              var Nb,
                Vb,
                Ub = 0;
              if (ha(o[q[a >> 2]]))
                for (;;)
                  if (
                    ((Nb = q[a >> 2]),
                    (Vb = o[0 | Nb]),
                    (q[a >> 2] = Nb + 1),
                    (Ub = (((w(Ub, 10) + Vb) | 0) - 48) | 0),
                    !ha(o[(Nb + 1) | 0]))
                  )
                    break;
              return Ub;
            }
            function Ga(a, Wb, Xb, Yb) {
              var hc,
                Zb = 0,
                _b = 0,
                $b = 0,
                ac = 0,
                bc = 0,
                cc = 0,
                dc = 0,
                ec = 0,
                fc = 0,
                gc = 0;
              if (
                ((q[Xb >> 2] = 768),
                (dc = r[(q[Wb >> 2] + 4) | 0]),
                (_b = q[(Wb + 12) >> 2]),
                1 <= (0 | (ac = q[_b >> 2])))
              ) {
                for (bc = q[(Wb + 28) >> 2], ec = q[(Wb + 392) >> 2]; ; )
                  if (
                    (($b = ((1 << q[(ec + (q[(bc + (Zb << 2)) >> 2] << 2)) >> 2]) + $b) | 0),
                    (0 | ac) == (0 | (Zb = (Zb + 1) | 0)))
                  )
                    break;
                Zb = $b << 2;
              }
              if (
                ((q[(Xb + 4) >> 2] = w(ac, 12)),
                (q[(Xb + 8) >> 2] = q[_b >> 2] << 2),
                (q[(Xb + 12) >> 2] = q[_b >> 2] << 2),
                (q[(Xb + 16) >> 2] = q[_b >> 2] << 2),
                ($b = q[_b >> 2]),
                (q[(Xb + 24) >> 2] = dc >>> 0 < 6 ? ac << 2 : 0),
                (q[(Xb + 20) >> 2] = $b << 2),
                ($b = q[_b >> 2]),
                (q[(Xb + 32) >> 2] = Zb),
                (q[(Xb + 28) >> 2] = $b << 2),
                ($b = q[_b >> 2]),
                (q[(Xb + 44) >> 2] = Zb),
                (q[(Xb + 40) >> 2] = Zb),
                (q[(Xb + 36) >> 2] = $b << 2),
                (q[(Xb + 48) >> 2] = q[(_b + 4) >> 2] << 5),
                (q[(Xb + 52) >> 2] = q[(_b + 4) >> 2] << 2),
                (q[(Xb + 56) >> 2] = q[(_b + 4) >> 2] << 2),
                (q[(Xb + 60) >> 2] = q[(_b + 4) >> 2] << 2),
                (q[(Xb + 64) >> 2] = q[(_b + 4) >> 2] << 4),
                (q[(Xb + 68) >> 2] = q[(_b + 4) >> 2] << 4),
                1 <= ((Zb = 0) | (ac = q[(_b + 8) >> 2])))
              ) {
                for (
                  bc = q[(Wb + 392) >> 2], ec = q[(Wb + 108) >> 2], gc = q[(Wb + 92) >> 2], $b = 0;
                  ;

                )
                  if (
                    ((cc = (((15 + (q[((fc = Zb << 2) + ec) >> 2] << 3)) & -16) + cc) | 0),
                    ($b = ((1 << q[(bc + (q[(fc + gc) >> 2] << 2)) >> 2]) + $b) | 0),
                    (0 | ac) == (0 | (Zb = (Zb + 1) | 0)))
                  )
                    break;
                Zb = $b << 2;
              }
              if (
                ((q[(Xb + 72) >> 2] = w(ac, 24)),
                (q[(Xb + 76) >> 2] = q[(_b + 8) >> 2] << 2),
                (q[(Xb + 80) >> 2] = q[(_b + 8) >> 2] << 2),
                ($b = q[(_b + 8) >> 2]),
                (q[(Xb + 88) >> 2] = cc),
                (q[(Xb + 84) >> 2] = $b << 2),
                (q[(Xb + 92) >> 2] = q[(_b + 8) >> 2] << 4),
                (q[(Xb + 96) >> 2] = q[(_b + 8) >> 2] << 4),
                ($b = q[(_b + 8) >> 2]),
                (q[(Xb + 104) >> 2] = Zb),
                (q[(Xb + 100) >> 2] = $b << 2),
                ($b = q[(_b + 8) >> 2]),
                (q[(Xb + 144) >> 2] = Zb),
                (q[(Xb + 140) >> 2] = Zb),
                (q[(Xb + 136) >> 2] = Zb),
                (q[(Xb + 132) >> 2] = Zb),
                (q[(Xb + 128) >> 2] = Zb),
                (q[(Xb + 124) >> 2] = Zb),
                (q[(Xb + 120) >> 2] = Zb),
                (q[(Xb + 116) >> 2] = Zb),
                (q[(Xb + 112) >> 2] = Zb),
                (q[(Xb + 108) >> 2] = $b << 2),
                (q[(Xb + 148) >> 2] = q[(_b + 8) >> 2] << 2),
                (q[(Xb + 152) >> 2] = q[(_b + 8) >> 2] << 2),
                (q[(Xb + 156) >> 2] = q[(_b + 8) >> 2] << 2),
                (q[(Xb + 160) >> 2] = q[(_b + 8) >> 2] << 2),
                (q[(Xb + 164) >> 2] = q[(_b + 8) >> 2] << 2),
                (q[(Xb + 168) >> 2] = q[(_b + 8) >> 2] << 2),
                1 <= ((Zb = cc = 0) | (ac = q[(_b + 12) >> 2])))
              ) {
                for (bc = q[(Wb + 392) >> 2], ec = q[(Wb + 124) >> 2], $b = 0; ; )
                  if (
                    (($b = ((1 << q[(bc + (q[(ec + (Zb << 2)) >> 2] << 2)) >> 2]) + $b) | 0),
                    (0 | ac) == (0 | (Zb = (Zb + 1) | 0)))
                  )
                    break;
                Zb = $b << 2;
              }
              if (
                ((q[(Xb + 172) >> 2] = w(ac, 12)),
                (q[(Xb + 176) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 180) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 184) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 188) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 192) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 196) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 200) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 204) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 208) >> 2] = q[(_b + 12) >> 2] << 4),
                (q[(Xb + 212) >> 2] = q[(_b + 12) >> 2] << 4),
                ($b = q[(_b + 12) >> 2]),
                (q[(Xb + 220) >> 2] = Zb),
                (q[(Xb + 216) >> 2] = $b << 2),
                ($b = q[(_b + 12) >> 2]),
                (q[(Xb + 272) >> 2] = Zb),
                (q[(Xb + 268) >> 2] = Zb),
                (q[(Xb + 264) >> 2] = Zb),
                (q[(Xb + 260) >> 2] = Zb),
                (q[(Xb + 256) >> 2] = Zb),
                (q[(Xb + 252) >> 2] = Zb),
                (q[(Xb + 248) >> 2] = Zb),
                (q[(Xb + 244) >> 2] = Zb),
                (q[(Xb + 240) >> 2] = Zb),
                (q[(Xb + 236) >> 2] = Zb),
                (q[(Xb + 232) >> 2] = Zb),
                (q[(Xb + 228) >> 2] = Zb),
                (q[(Xb + 224) >> 2] = $b << 2),
                (q[(Xb + 276) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 280) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 284) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 288) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 292) >> 2] = q[(_b + 12) >> 2] << 2),
                (q[(Xb + 296) >> 2] = q[(_b + 12) >> 2] << 2),
                1 <= ((Zb = 0) | ($b = q[(_b + 16) >> 2])))
              ) {
                for (
                  ac = q[(Wb + 164) >> 2], ec = q[(Wb + 392) >> 2], gc = q[(Wb + 208) >> 2], bc = 0;
                  ;

                )
                  if (
                    ((cc = (((15 + (q[((fc = Zb << 2) + gc) >> 2] << 3)) & -16) + cc) | 0),
                    (bc = ((1 << q[(ec + (q[(ac + fc) >> 2] << 2)) >> 2]) + bc) | 0),
                    (0 | $b) == (0 | (Zb = (Zb + 1) | 0)))
                  )
                    break;
                Zb = bc << 2;
              }
              if (
                ((q[(Xb + 300) >> 2] = w($b, 20)),
                (q[(Xb + 304) >> 2] = q[(_b + 16) >> 2] << 2),
                (ac = q[(_b + 16) >> 2]),
                (q[(Xb + 312) >> 2] = dc >>> (bc = 0) < 6 ? $b << 2 : 0),
                (q[(Xb + 308) >> 2] = ac),
                (q[(Xb + 316) >> 2] = q[(_b + 16) >> 2] << 2),
                ($b = q[(_b + 16) >> 2]),
                (q[(Xb + 324) >> 2] = cc),
                (q[(Xb + 320) >> 2] = $b << 2),
                (q[(Xb + 328) >> 2] = q[(_b + 16) >> 2] << 2),
                (q[(Xb + 332) >> 2] = q[(_b + 16) >> 2] << 4),
                (q[(Xb + 336) >> 2] = q[(_b + 16) >> 2] << 4),
                (q[(Xb + 340) >> 2] = q[(_b + 16) >> 2] << 2),
                (q[(Xb + 344) >> 2] = q[(_b + 16) >> 2] << 2),
                (q[(Xb + 348) >> 2] = q[(_b + 16) >> 2] << 2),
                (q[(Xb + 352) >> 2] = q[(_b + 16) >> 2] << 4),
                (q[(Xb + 356) >> 2] = q[(_b + 16) >> 2] << 4),
                ($b = q[(_b + 16) >> 2]),
                (q[(Xb + 364) >> 2] = Zb),
                (q[(Xb + 360) >> 2] = $b << 2),
                ($b = q[(_b + 16) >> 2]),
                (q[(Xb + 408) >> 2] = Zb),
                (q[(Xb + 404) >> 2] = Zb),
                (q[(Xb + 400) >> 2] = Zb),
                (q[(Xb + 396) >> 2] = Zb),
                (q[(Xb + 392) >> 2] = Zb),
                (q[(Xb + 388) >> 2] = Zb),
                (q[(Xb + 384) >> 2] = Zb),
                (q[(Xb + 380) >> 2] = Zb),
                (q[(Xb + 376) >> 2] = Zb),
                (q[(Xb + 372) >> 2] = Zb),
                (q[(Xb + 368) >> 2] = $b << 2),
                (q[(Xb + 412) >> 2] = q[(_b + 16) >> 2] << 2),
                (q[(Xb + 416) >> 2] = q[(_b + 16) >> 2] << 2),
                (q[(Xb + 420) >> 2] = q[(_b + 16) >> 2] << 2),
                (q[(Xb + 424) >> 2] = q[(_b + 16) >> 2] << 2),
                (q[(Xb + 428) >> 2] = q[(_b + 16) >> 2] << 2),
                (q[(Xb + 432) >> 2] = q[(_b + 16) >> 2] << 2),
                (ac = q[(Wb + 12) >> 2]),
                (q[(Xb + 436) >> 2] = w(q[(ac + 20) >> 2], 52)),
                (q[(Xb + 440) >> 2] = (255 & a) >>> (Zb = 0) <= 3 ? q[(ac + 20) >> 2] << 2 : 0),
                (q[(Xb + 444) >> 2] = q[(ac + 20) >> 2] << 2),
                (q[(Xb + 448) >> 2] = w(q[(ac + 52) >> 2], 28)),
                1 <= (0 | (_b = q[(ac + 48) >> 2])))
              ) {
                for ($b = q[(Wb + 392) >> 2], cc = 0; ; )
                  if (
                    ((cc = ((dc = q[($b + (Zb << 2)) >> 2]) + cc) | 0),
                    (bc = ((1 << dc) + bc) | 0),
                    (0 | _b) == (0 | (Zb = (Zb + 1) | 0)))
                  )
                    break;
                ((Zb = bc << 2), (bc = cc << 2));
              }
              if (
                ((q[(Xb + 464) >> 2] = Zb),
                (q[(Xb + 460) >> 2] = Zb),
                (q[(Xb + 456) >> 2] = bc),
                (q[(Xb + 452) >> 2] = w(_b, 36)),
                (q[(Xb + 508) >> 2] = w(q[(ac + 72) >> 2], 28)),
                1 <= ((cc = Zb = $b = 0) | (dc = q[(ac + 72) >> 2])))
              ) {
                for (
                  ec = q[(Wb + 544) >> 2], gc = q[(Wb + 540) >> 2], fc = q[(Wb + 532) >> 2], bc = 0;
                  ;

                )
                  if (
                    ((bc =
                      (0 | (hc = (q[((_b = cc << 2) + gc) >> 2] - q[(_b + ec) >> 2]) | 0)) <
                      (0 | bc)
                        ? bc
                        : (1 + hc) | 0),
                    (Zb = (0 | Zb) < (0 | (_b = q[(_b + fc) >> 2])) ? _b : Zb),
                    (0 | dc) == (0 | (cc = (cc + 1) | 0)))
                  )
                    break;
                ((cc = Zb << 2), (Zb = bc << 2));
              }
              if (
                ((_b = q[(ac + 76) >> 2]),
                (q[(Xb + 524) >> 2] = Zb),
                (q[(Xb + 520) >> 2] = cc),
                (q[(Xb + 516) >> 2] = Zb),
                (q[(Xb + 512) >> 2] = _b << 4),
                1 <= (0 | (_b = q[(ac + 80) >> 2])))
              ) {
                for ($b = q[(Wb + 568) >> 2], cc = q[(Wb + 392) >> 2], bc = Zb = 0; ; )
                  if (
                    ((bc = ((1 << q[(cc + (q[($b + (Zb << 2)) >> 2] << 2)) >> 2]) + bc) | 0),
                    (0 | _b) == (0 | (Zb = (Zb + 1) | 0)))
                  )
                    break;
                $b = bc << 2;
              }
              if (
                ((q[(Xb + 528) >> 2] = w(_b, 24)),
                (q[(Xb + 532) >> 2] = q[(ac + 80) >> 2] << 2),
                (_b = q[(ac + 80) >> 2]),
                (q[(Xb + 540) >> 2] = $b),
                (q[(Xb + 536) >> 2] = _b << 2),
                (_b = q[(ac + 80) >> 2]),
                (q[(Xb + 552) >> 2] = $b),
                (q[(Xb + 548) >> 2] = $b),
                (q[(Xb + 544) >> 2] = _b << 2),
                (_b = q[(ac + 16) >> 2]),
                6 <= r[(q[Wb >> 2] + 4) | 0] && (_b = (_b + q[(ac + 140) >> 2]) | 0),
                (q[(($b = Xb) + 656) >> 2] = _b << 2),
                (_b = Xb),
                4 <= (255 & a) >>> 0)
              ) {
                if (
                  ((q[(Xb + 468) >> 2] = w(q[(ac + 120) >> 2], 20)),
                  (q[(Xb + 472) >> 2] = w(q[(ac + 100) >> 2], 28)),
                  ($b = Xb),
                  1 <= ((Zb = cc = 0) | (dc = q[(ac + 104) >> 2])))
                ) {
                  for (ec = q[(Wb + 424) >> 2], bc = 0; ; )
                    if (
                      ((bc = (q[(ec + (Zb << 2)) >> 2] + bc) | 0),
                      (0 | dc) == (0 | (Zb = (Zb + 1) | 0)))
                    )
                      break;
                  Zb = bc << 2;
                } else Zb = 0;
                ((q[($b + 480) >> 2] = Zb),
                  (q[(Xb + 476) >> 2] = w(dc, 48)),
                  (q[(Xb + 488) >> 2] = w(q[(ac + 108) >> 2], 12)),
                  ($b = q[(ac + 112) >> 2]),
                  (q[(Xb + 648) >> 2] = 0),
                  (q[(Xb + 496) >> 2] = w($b, 12)),
                  ($b = 0));
              } else {
                if ((0 | (cc = q[(ac + 20) >> 2])) < 1) bc = 0;
                else
                  for (
                    dc = q[(Wb + 380) >> 2],
                      ec = q[(Wb + 268) >> 2],
                      gc = q[(Wb + 264) >> 2],
                      $b = bc = 0;
                    ;

                  ) {
                    if (1 <= (0 | (fc = q[((Zb = $b << 2) + ec) >> 2])))
                      for (fc = ((Zb = (dc + (q[(Zb + gc) >> 2] << 2)) | 0) + (fc << 2)) | 0; ; )
                        if (((bc = (q[Zb >> 2] + bc) | 0), !((Zb = (Zb + 4) | 0) >>> 0 < fc >>> 0)))
                          break;
                    if ((0 | cc) == (0 | ($b = ($b + 1) | 0))) break;
                  }
                ((q[(Xb + 648) >> 2] = cc << 2), (cc = q[(ac + 20) >> 2] << 2), ($b = bc << 2));
              }
              if (
                ((q[(_b + 652) >> 2] = $b),
                (q[(Xb + 644) >> 2] = cc),
                !((a &= 255) >>> 0 < 5) &&
                  ((q[(Xb + 484) >> 2] = w(q[(ac + 128) >> 2], 12)),
                  (q[(Xb + 492) >> 2] = w(q[(ac + 132) >> 2], 12)),
                  (q[(Xb + 500) >> 2] = w(q[(ac + 136) >> 2], 12)),
                  5 != (0 | a)))
              ) {
                if (!(((a = 0) | (_b = q[(ac + 140) >> 2])) < 1)) {
                  for (
                    a = q[(Wb + 392) >> 2],
                      $b = q[(Wb + 28) >> 2],
                      Wb = q[(Wb + 636) >> 2],
                      Zb = bc = 0;
                    ;

                  )
                    if (
                      ((bc =
                        ((1 <<
                          q[(a + (q[($b + (q[(Wb + (Zb << 2)) >> 2] << 2)) >> 2] << 2)) >> 2]) +
                          bc) |
                        0),
                      (0 | _b) == (0 | (Zb = (Zb + 1) | 0)))
                    )
                      break;
                  a = bc << 2;
                }
                ((q[(Xb + 556) >> 2] = w(_b, 12)),
                  (q[(Xb + 560) >> 2] = q[(ac + 140) >> 2] << 2),
                  (q[(Xb + 564) >> 2] = q[(ac + 140) >> 2] << 2),
                  (q[(Xb + 568) >> 2] = q[(ac + 140) >> 2] << 4),
                  (q[(Xb + 572) >> 2] = q[(ac + 140) >> 2] << 4),
                  (Wb = q[(ac + 140) >> 2]),
                  (q[(Xb + 580) >> 2] = a),
                  (q[(Xb + 576) >> 2] = Wb << 2),
                  (Wb = q[(ac + 140) >> 2]),
                  (q[(Xb + 616) >> 2] = a),
                  (q[(Xb + 612) >> 2] = a),
                  (q[(Xb + 608) >> 2] = a),
                  (q[(Xb + 604) >> 2] = a),
                  (q[(Xb + 600) >> 2] = a),
                  (q[(Xb + 596) >> 2] = a),
                  (q[(Xb + 592) >> 2] = a),
                  (q[(Xb + 588) >> 2] = a),
                  (q[(Xb + 584) >> 2] = Wb << 2),
                  (q[(Xb + 620) >> 2] = q[(ac + 140) >> 2] << 2),
                  (q[(Xb + 624) >> 2] = q[(ac + 140) >> 2] << 2),
                  (q[(Xb + 628) >> 2] = q[(ac + 140) >> 2] << 2),
                  (q[(Xb + 632) >> 2] = q[(ac + 140) >> 2] << 2),
                  (q[(Xb + 636) >> 2] = q[(ac + 140) >> 2] << 2),
                  (q[(Xb + 640) >> 2] = q[(ac + 140) >> 2] << 2),
                  (q[(Xb + 504) >> 2] = w(q[(ac + 148) >> 2], 12)));
              }
              for (Zb = bc = 0; ; )
                if (
                  ((Zb =
                    ((((Wb = q[(a = ((bc << 2) + Xb) | 0) >> 2]) + 15) & -16) + (q[a >> 2] = Zb)) |
                    0),
                  165 == (0 | (bc = (bc + 1) | 0)))
                )
                  break;
              q[Yb >> 2] = Zb;
            }
            function Ha(a, Wb, Xb, Yb, ic) {
              var lc, jc;
              ((q[(204 + (L = jc = (L - 208) | 0)) >> 2] = Xb),
                $((160 + jc) | (Xb = 0), 0, 40),
                (q[(200 + jc) >> 2] = q[(204 + jc) >> 2]),
                (0 | ra(0, Wb, (200 + jc) | 0, (80 + jc) | 0, (160 + jc) | 0, Yb, ic)) < 0 ||
                  ((Xb = 0 <= q[(a + 76) >> 2] ? 1 : Xb),
                  (Xb = q[a >> 2]),
                  o[(a + 74) | 0] <= 0 && (q[a >> 2] = -33 & Xb),
                  (lc = 32 & Xb),
                  q[(a + 48) >> 2]
                    ? ra(a, Wb, (200 + jc) | 0, (80 + jc) | 0, (160 + jc) | 0, Yb, ic)
                    : ((q[(a + 48) >> 2] = 80),
                      (q[(a + 16) >> 2] = 80 + jc),
                      (q[(a + 28) >> 2] = jc),
                      (q[(a + 20) >> 2] = jc),
                      (Xb = q[(a + 44) >> 2]),
                      ra(
                        a,
                        Wb,
                        (200 + (q[(a + 44) >> 2] = jc)) | 0,
                        (80 + jc) | 0,
                        (160 + jc) | 0,
                        Yb,
                        ic
                      ),
                      Xb &&
                        (n[q[(a + 36) >> 2]](a, 0, 0),
                        (q[(a + 48) >> 2] = 0),
                        (q[(a + 44) >> 2] = Xb),
                        (q[(a + 28) >> 2] = 0),
                        (q[(a + 16) >> 2] = 0),
                        (q[(a + 20) >> 2] = 0))),
                  (q[a >> 2] = q[a >> 2] | lc)),
                (L = (208 + jc) | 0));
            }
            function Ja(a, Wb, mc) {
              var oc, nc;
              (aa((8 + (L = nc = (L - 160) | 0)) | 0, 3560, 144),
                (q[(52 + nc) >> 2] = a),
                (q[(28 + nc) >> 2] = a),
                (q[(56 + nc) >> 2] = oc = (oc = (-2 - a) | 0) >>> 0 < 256 ? oc : 256),
                (q[(36 + nc) >> 2] = a = (a + oc) | 0),
                (q[(24 + nc) >> 2] = a),
                Ha((8 + nc) | 0, Wb, mc, 11, 12),
                oc && ((a = q[(28 + nc) >> 2]), (o[(a - ((0 | a) == q[(24 + nc) >> 2])) | 0] = 0)),
                (L = (160 + nc) | 0));
            }
            function Ka(a, Wb) {
              var pc,
                qc,
                mc = 0,
                mc = 0 != (0 | Wb);
              a: {
                b: {
                  c: {
                    d: if (!(!Wb | !(3 & a)))
                      for (;;) {
                        if (!r[0 | a]) break c;
                        if (((a = (a + 1) | 0), (mc = 0 != (0 | (Wb = (Wb + -1) | 0))), !Wb))
                          break d;
                        if (!(3 & a)) break;
                      }
                    if (!mc) break b;
                  }
                  if (!r[0 | a]) break a;
                  e: {
                    if (4 <= Wb >>> 0) {
                      for (
                        mc = ((mc = (Wb + -4) | 0) - (pc = -4 & mc)) | 0,
                          pc = (4 + ((a + pc) | 0)) | 0;
                        ;

                      ) {
                        if ((-1 ^ (qc = q[a >> 2])) & (qc + -16843009) & -2139062144) break e;
                        if (((a = (a + 4) | 0), !(3 < (Wb = (Wb + -4) | 0) >>> 0))) break;
                      }
                      ((Wb = mc), (a = pc));
                    }
                    if (!Wb) break b;
                  }
                  for (;;) {
                    if (!r[0 | a]) break a;
                    if (((a = (a + 1) | 0), !(Wb = (Wb + -1) | 0))) break;
                  }
                }
                return 0;
              }
              return a;
            }
            function La(a) {
              var rc,
                Wb = 0;
              if (!a) return 32;
              if (!(1 & a)) for (;;) if (((Wb = (Wb + 1) | 0), (rc = 2 & a), (a >>>= 1), rc)) break;
              return Wb;
            }
            function Ma(a, sc) {
              var wc,
                xc,
                yc,
                vc,
                tc = 0,
                uc = 0,
                uc = 4;
              L = vc = (L - 256) | 0;
              a: if (!((0 | sc) < 2))
                for (tc = q[(yc = ((sc << 2) + a) | 0) >> 2] = vc; ; ) {
                  for (aa(tc, q[a >> 2], (wc = uc >>> 0 < 256 ? uc : 256)), tc = 0; ; )
                    if (
                      (aa(
                        q[(xc = ((tc << 2) + a) | 0) >> 2],
                        q[(((tc = (tc + 1) | 0) << 2) + a) >> 2],
                        wc
                      ),
                      (q[xc >> 2] = q[xc >> 2] + wc),
                      (0 | sc) == (0 | tc))
                    )
                      break;
                  if (!(uc = (uc - wc) | 0)) break a;
                  tc = q[yc >> 2];
                }
              L = (256 + vc) | 0;
            }
            function Na(a) {
              var sc;
              return (
                (sc = La((q[a >> 2] + -1) | 0)) || ((a = La(q[(a + 4) >> 2])) ? (a + 32) | 0 : 0)
              );
            }
            function Oa(a) {
              var Ac,
                Bc,
                zc = 0;
              x(0);
              if (
                (!(function (a) {
                  var me = 0,
                    ne = 0;
                  q[(a + 432) >> 2] &&
                    ((ne = q[(a + 336) >> 2]),
                    (me = ne << 2),
                    aa(q[(a + 464) >> 2], q[(a + 756) >> 2], me),
                    aa(q[(a + 468) >> 2], q[(a + 444) >> 2], me),
                    aa(q[(a + 472) >> 2], q[(a + 452) >> 2], me),
                    r[(q[q[a >> 2] >> 2] + 4) | 0] < 4 ||
                      ((me = ne << 4),
                      aa(q[(a + 476) >> 2], q[(a + 456) >> 2], me),
                      aa(q[(a + 480) >> 2], q[(a + 460) >> 2], me)));
                })(a),
                !(function (a) {
                  var Vo = 0,
                    Wo = x(0),
                    Xo = x(0),
                    Yo = 0,
                    Zo = x(0),
                    _o = 0,
                    $o = x(0),
                    ap = 0,
                    bp = x(0);
                  if (1 <= (0 | (Yo = q[a >> 2])))
                    for (Vo = q[(a + 4) >> 2], ap = (Vo + w(Yo, 52)) | 0, a = q[(a + 12) >> 2]; ; )
                      if (
                        ((Wo = u[a >> 2]),
                        (bp = u[(Vo + 44) >> 2]),
                        (_o = q[(Vo + 16) >> 2]),
                        (Wo = _o
                          ? ((Xo = Wo),
                            (Wo = u[(Vo + 4) >> 2]),
                            (Zo = u[(Vo + 12) >> 2]),
                            (Xo = x(x(Xo - Wo) / Zo)),
                            ($o = x(C(Xo))),
                            (Yo = x(y($o)) < x(2147483648) ? ~~$o : -2147483648),
                            x(Wo + x(Zo * x(Xo - x(0 | Yo)))))
                          : ((Zo = u[(Vo + 4) >> 2]),
                            (Xo = u[(Vo + 8) >> 2]),
                            Wo < Zo ? Zo : Xo < Wo ? Xo : Wo)),
                        bp != Wo
                          ? ((u[(Vo + 44) >> 2] = Wo), (q[(Vo + 48) >> 2] = 1))
                          : (q[(Vo + 48) >> 2] = 0),
                        _o || (u[a >> 2] = Wo),
                        (a = (a + 4) | 0),
                        !((Vo = (Vo + 52) | 0) >>> 0 < ap >>> 0))
                      )
                        break;
                })((a + 644) | 0),
                !(function (a) {
                  var Kn = 0,
                    Ln = 0,
                    Mn = x(0),
                    Nn = 0,
                    Jo = x(0),
                    Ko = x(0),
                    Lo = x(0),
                    Mo = 0,
                    No = x(0),
                    Oo = 0,
                    Po = 0,
                    Qo = 0,
                    Ro = 0,
                    So = x(0),
                    To = 0,
                    Uo = 0;
                  if (1 <= (0 | (Nn = q[(a + 644) >> 2])))
                    for (
                      Mo = q[(a + 648) >> 2], To = (Mo + w(Nn, 52)) | 0, Uo = q[(a + 760) >> 2];
                      ;

                    ) {
                      a: if (!(q[Mo >> 2] || (0 | (Nn = q[(Mo + 32) >> 2])) < 1))
                        if (
                          ((a = q[(Mo + 28) >> 2]),
                          (Qo = (a + w(Nn, 28)) | 0),
                          (So = u[(Mo + 24) >> 2]),
                          (Lo = u[(Mo + 20) >> 2]),
                          (Ko = u[(Mo + 44) >> 2]),
                          Uo)
                        )
                          for (;;) {
                            No = x((Po = 0));
                            h: {
                              i: {
                                j: {
                                  if ((0 | (Ln = q[a >> 2])) < 1) Kn = Nn = 0;
                                  else if (
                                    ((Oo = q[(a + 4) >> 2]),
                                    (Jo = u[Oo >> 2]),
                                    (Mn = x(Jo - Lo)),
                                    1 == (0 | Ln))
                                  )
                                    ((Nn = ((Ko < x(Lo + Jo)) ^ 1) | ((Mn < Ko) ^ 1)), (Kn = 0));
                                  else {
                                    if (Ko < Mn) {
                                      ((Nn = 1), (Kn = 0));
                                      break i;
                                    }
                                    if (((Nn = 0), Ko < x(Lo + Jo))) Kn = 0;
                                    else {
                                      if (((Kn = 1), (Mn = u[(Oo + 4) >> 2]), !(Ko < x(Lo + Mn))))
                                        for (;;) {
                                          if ((0 | Ln) == (0 | (Kn = (Kn + 1) | 0))) break j;
                                          if (
                                            ((Jo = Mn),
                                            (Mn = u[(Oo + (Kn << 2)) >> 2]),
                                            Ko < x(Lo + Mn))
                                          )
                                            break;
                                        }
                                      x(Mn - Lo) < Ko ||
                                        ((Kn = (Kn + -1) | 0), (Mn = x(Mn - Jo)) < So) ||
                                        (No = x(x(Ko - Jo) / Mn));
                                    }
                                  }
                                  if (Nn) break i;
                                  if (((Oo = Ln = 1), q[(a + 16) >> 2])) break h;
                                  break i;
                                }
                                ((Kn = (Ln + -1) | 0), (Nn = 1));
                              }
                              ((Jo = u[(a + 12) >> 2]),
                                (Oo =
                                  ((Ln = Jo != No) & ((No == x(0)) | (Jo == x(0)))) |
                                  (q[(a + 8) >> 2] != (0 | Kn))),
                                (Po = Nn));
                            }
                            if (
                              ((q[(a + 20) >> 2] = Oo),
                              (q[(a + 24) >> 2] = Ln),
                              (u[(a + 12) >> 2] = No),
                              (q[(a + 16) >> 2] = Po),
                              (q[(a + 8) >> 2] = Kn),
                              !((a = (a + 28) | 0) >>> 0 < Qo >>> 0))
                            )
                              break;
                          }
                        else {
                          if (!q[(Mo + 48) >> 2])
                            for (;;)
                              if (
                                ((q[(a + 20) >> 2] = 0),
                                (q[(a + 24) >> 2] = 0),
                                !((a = (a + 28) | 0) >>> 0 < Qo >>> 0))
                              )
                                break a;
                          for (;;) {
                            ((No = x((Po = 0))), (Kn = q[(Oo = a) >> 2]), (Ln = 0));
                            b: {
                              c: {
                                d: {
                                  e: if (!((0 | Kn) < 1)) {
                                    if (
                                      ((Nn = q[(a + 4) >> 2]),
                                      (Jo = u[Nn >> 2]),
                                      (Mn = x(Jo - Lo)),
                                      1 != (0 | Kn))
                                    ) {
                                      if (!(Ko < Mn)) {
                                        if (((Ln = 0), Ko < x(Lo + Jo))) break e;
                                        Ln = 1;
                                        f: if (((Mn = u[(Nn + 4) >> 2]), !(Ko < x(Lo + Mn)))) {
                                          for (Kn = (Kn + -1) | 0; ; ) {
                                            if (((Jo = Mn), (0 | Kn) == (0 | Ln))) break;
                                            if (
                                              ((Mn = u[(Nn + ((Ln = (Ln + 1) | 0) << 2)) >> 2]),
                                              Ko < x(Lo + Mn))
                                            )
                                              break f;
                                          }
                                          Nn = 1;
                                          break c;
                                        }
                                        if (((Nn = 0), x(Mn - Lo) < Ko)) {
                                          Kn = Ln;
                                          break d;
                                        }
                                        if (((Kn = (Ln + -1) | 0), (Mn = x(Mn - Jo)) < So)) break d;
                                        No = x(x(Ko - Jo) / Mn);
                                        break d;
                                      }
                                      ((Nn = 1), (Kn = 0));
                                      break c;
                                    }
                                    Ln = ((Ko < x(Lo + Jo)) ^ 1) | ((Mn < Ko) ^ 1);
                                  }
                                  ((Nn = Ln), (Kn = 0));
                                }
                                if (!Nn && ((Ro = Ln = 1), q[(a + 16) >> 2])) break b;
                              }
                              ((Po = Nn),
                                (Jo = u[(a + 12) >> 2]),
                                (Ro =
                                  ((Ln = Jo != No) & ((No == x(0)) | (Jo == x(0)))) |
                                  (q[(a + 8) >> 2] != (0 | Kn))));
                            }
                            if (
                              ((q[(Oo + 20) >> 2] = Ro),
                              (q[(a + 24) >> 2] = Ln),
                              (u[(a + 12) >> 2] = No),
                              (q[(a + 16) >> 2] = Po),
                              (q[(a + 8) >> 2] = Kn),
                              !((a = (a + 28) | 0) >>> 0 < Qo >>> 0))
                            )
                              break;
                          }
                        }
                      if (!((Mo = (Mo + 52) | 0) >>> 0 < To >>> 0)) break;
                    }
                })(a),
                !(function (a) {
                  var cn = 0,
                    dn = x(0),
                    en = 0,
                    fn = 0,
                    gn = x(0),
                    hn = 0,
                    jn = x(0),
                    kn = x(0),
                    ln = 0,
                    mn = 0,
                    nn = 0,
                    on = 0;
                  if (!(r[(q[q[a >> 2] >> 2] + 4) | 0] < 4 || (0 | (cn = q[(a + 644) >> 2])) < 1))
                    for (
                      hn = q[(a + 648) >> 2], nn = (hn + w(cn, 52)) | 0, on = q[(a + 760) >> 2];
                      ;

                    ) {
                      b: if (1 == q[hn >> 2] && !((0 | (cn = q[(hn + 40) >> 2])) < 1))
                        if (
                          ((a = q[(hn + 36) >> 2]),
                          (ln = (a + w(cn, 28)) | 0),
                          (kn = u[(hn + 44) >> 2]),
                          on)
                        )
                          for (;;) {
                            ((jn = x((cn = 0))), (fn = q[a >> 2]));
                            d: if (
                              !(
                                (0 | fn) < 2 ||
                                ((en = q[(a + 4) >> 2]), (dn = u[en >> 2]), kn <= dn)
                              )
                            ) {
                              cn = 1;
                              e: if (((gn = u[(en + 4) >> 2]), !(kn < gn))) {
                                for (;;) {
                                  if (((dn = gn), (0 | fn) == (0 | (cn = (cn + 1) | 0)))) break;
                                  if (((gn = u[(en + (cn << 2)) >> 2]), kn < gn)) break e;
                                }
                                cn = (fn + -1) | 0;
                                break d;
                              }
                              ((jn = x(x(kn - dn) / x(gn - dn))), (cn = (cn + -1) | 0));
                            }
                            if (
                              ((dn = u[(a + 16) >> 2]),
                              (u[(a + 16) >> 2] = jn),
                              (fn = q[(a + 12) >> 2]),
                              (q[(a + 12) >> 2] = cn),
                              (en = dn != jn),
                              (q[(a + 24) >> 2] = en),
                              (q[(a + 20) >> 2] =
                                (en & ((jn == x(0)) | (dn == x(0)))) | ((0 | cn) != (0 | fn))),
                              !((a = (a + 28) | 0) >>> 0 < ln >>> 0))
                            )
                              break;
                          }
                        else {
                          if (!q[(hn + 48) >> 2])
                            for (;;)
                              if (
                                ((q[(a + 20) >> 2] = 0),
                                (q[(a + 24) >> 2] = 0),
                                !((a = (a + 28) | 0) >>> 0 < ln >>> 0))
                              )
                                break b;
                          for (;;) {
                            ((jn = x((fn = 0))), (mn = q[a >> 2]));
                            c: if (
                              !(
                                (0 | mn) < 2 ||
                                ((en = q[(a + 4) >> 2]), (dn = u[en >> 2]), kn <= dn)
                              )
                            ) {
                              if (((cn = 1), (gn = u[(en + 4) >> 2]), !(kn < gn)))
                                for (fn = (mn + -1) | 0; ; ) {
                                  if (((dn = gn), (0 | cn) == (0 | fn))) break c;
                                  if (((gn = u[(en + ((cn = (cn + 1) | 0) << 2)) >> 2]), kn < gn))
                                    break;
                                }
                              ((jn = x(x(kn - dn) / x(gn - dn))), (fn = (cn + -1) | 0));
                            }
                            if (
                              ((dn = u[(a + 16) >> 2]),
                              (u[(a + 16) >> 2] = jn),
                              (cn = q[(a + 12) >> 2]),
                              (q[(a + 12) >> 2] = fn),
                              (en = dn != jn),
                              (q[(a + 24) >> 2] = en),
                              (q[(a + 20) >> 2] =
                                (en & ((jn == x(0)) | (dn == x(0)))) | ((0 | cn) != (0 | fn))),
                              !((a = (a + 28) | 0) >>> 0 < ln >>> 0))
                            )
                              break;
                          }
                        }
                      if (!((hn = (hn + 52) | 0) >>> 0 < nn >>> 0)) break;
                    }
                })(a),
                !(function (a) {
                  var pn = 0,
                    qn = 0,
                    rn = 0,
                    sn = 0,
                    tn = 0,
                    un = 0,
                    vn = 0,
                    wn = x(0),
                    xn = 0,
                    yn = 0,
                    zn = 0,
                    An = 0,
                    Bn = 0,
                    Cn = 0,
                    Dn = 0,
                    En = 0,
                    Fn = 0,
                    Gn = 0,
                    Hn = 0,
                    In = 0,
                    Jn = 0;
                  if (1 <= (0 | (qn = q[(a + 668) >> 2])))
                    for (
                      tn = q[(a + 672) >> 2], In = (tn + w(qn, 36)) | 0, Gn = q[(a + 760) >> 2];
                      ;

                    ) {
                      ((rn = sn = qn = 0), (Cn = q[(tn + 4) >> 2]));
                      a: {
                        if (!(un = (0 | Cn) < 1))
                          for (xn = q[tn >> 2], a = Dn = 0; ; ) {
                            if (((pn = q[(xn + (a << 2)) >> 2]), q[(pn + 16) >> 2])) {
                              ((pn = 1), (En = 0));
                              break a;
                            }
                            if (
                              ((rn = rn || q[(pn + 24) >> 2]),
                              (qn = qn || q[(pn + 20) >> 2]),
                              (sn = ((u[(pn + 12) >> 2] != x(0)) + sn) | 0),
                              (0 | Cn) == (0 | (a = (a + 1) | 0)))
                            )
                              break;
                          }
                        if (
                          ((pn = 0),
                          (Dn = Gn ? 1 : rn) | (En = Gn ? 1 : qn) &&
                            ((xn = 1 << sn), (q[(tn + 12) >> 2] = xn), 31 != (0 | sn)))
                        ) {
                          for (
                            qn = q[(tn + 20) >> 2],
                              Hn = q[tn >> 2],
                              a = q[(tn + 16) >> 2],
                              rn = (a + (vn = xn << 2)) | 0,
                              rn = $(
                                (yn = a),
                                0,
                                (4 +
                                  (((Fn = -1 ^ a) + ((a = (a + 4) | 0) >>> 0 < rn >>> 0 ? rn : a)) |
                                    0)) &
                                  -4
                              ),
                              vn = (qn + vn) | 0,
                              a = qn;
                            ;

                          )
                            if (((q[a >> 2] = 1065353216), !((a = (a + 4) | 0) >>> 0 < vn >>> 0)))
                              break;
                          if (!un) {
                            if (((un = 0), (vn = pn = 1), sn))
                              for (;;) {
                                if (
                                  ((sn = q[((un << 2) + Hn) >> 2]),
                                  (zn = q[(sn + 8) >> 2]),
                                  (An = w(zn, pn)),
                                  (a = 0),
                                  (wn = u[(sn + 12) >> 2]) != x(0))
                                ) {
                                  for (
                                    q[rn >> 2] = An + q[rn >> 2],
                                      u[qn >> 2] = x(x(1) - wn) * u[qn >> 2],
                                      zn = w((zn + (a = 1)) | 0, pn);
                                    ;

                                  )
                                    if (
                                      ((wn = u[(sn + 12) >> 2]),
                                      (Jn = q[(Fn = yn = ((Bn = a << 2) + rn) | 0) >> 2]),
                                      (yn = a & vn),
                                      (q[Fn >> 2] = Jn + (yn ? zn : An)),
                                      (u[(Bn = (qn + Bn) | 0) >> 2] =
                                        (yn ? wn : x(x(1) - wn)) * u[Bn >> 2]),
                                      (0 | xn) == (0 | (a = (a + 1) | 0)))
                                    )
                                      break;
                                  vn <<= 1;
                                } else
                                  for (;;)
                                    if (
                                      ((q[(zn = (rn + (a << 2)) | 0) >> 2] = An + q[zn >> 2]),
                                      (0 | xn) == (0 | (a = (a + 1) | 0)))
                                    )
                                      break;
                                if (
                                  ((pn = w(q[sn >> 2], pn)), (0 | Cn) == (0 | (un = (un + 1) | 0)))
                                )
                                  break;
                              }
                            else
                              for (;;) {
                                if (
                                  ((sn = q[((un << 2) + Hn) >> 2]),
                                  (vn = w(q[(sn + 8) >> 2], pn)),
                                  (a = 0),
                                  (wn = u[(sn + 12) >> 2]) != x(0))
                                )
                                  ((q[rn >> 2] = vn + q[rn >> 2]),
                                    (u[qn >> 2] = x(x(1) - wn) * u[qn >> 2]));
                                else
                                  for (;;)
                                    if (
                                      ((q[(An = (rn + (a << 2)) | 0) >> 2] = vn + q[An >> 2]),
                                      (0 | xn) == (0 | (a = (a + 1) | 0)))
                                    )
                                      break;
                                if (
                                  ((pn = w(q[sn >> 2], pn)), (0 | Cn) == (0 | (un = (un + 1) | 0)))
                                )
                                  break;
                              }
                            pn = 0;
                          }
                        }
                      }
                      if (
                        ((q[(tn + 32) >> 2] = pn),
                        (q[(tn + 24) >> 2] = En),
                        (q[(tn + 28) >> 2] = Dn),
                        !((tn = (tn + 36) | 0) >>> 0 < In >>> 0))
                      )
                        break;
                    }
                })(a),
                !(function (a) {
                  var Om = x(0),
                    Pm = 0,
                    Qm = 0,
                    Rm = 0,
                    Sm = 0,
                    Tm = 0,
                    Um = x(0),
                    Vm = x(0),
                    Wm = x(0),
                    Xm = 0,
                    Ym = 0,
                    Zm = 0,
                    _m = 0,
                    $m = 0,
                    an = 0,
                    bn = 0;
                  if (!(r[(q[q[a >> 2] >> 2] + 4) | 0] < 4 || (0 | (Pm = q[(a + 692) >> 2])) < 1))
                    for (
                      Rm = q[(a + 696) >> 2], bn = (Rm + w(Pm, 48)) | 0, _m = q[(a + 760) >> 2];
                      ;

                    ) {
                      if (
                        ((a = q[Rm >> 2]),
                        (Ym = _m ? 1 : q[(a + 20) >> 2]),
                        (Zm = _m ? 1 : q[(a + 24) >> 2]),
                        Ym | Zm)
                      ) {
                        c: {
                          d: {
                            ((Tm = Rm),
                              (Sm = q[(a + 8) >> 2]),
                              (Pm = q[(a + 12) >> 2]),
                              (Om = u[(a + 16) >> 2]),
                              (a = (0 | Sm) != (0 | Pm)));
                            e: {
                              if (Om != x(0)) {
                                if (((a = (Pm + 1) | 0), (0 | Pm) == (0 | Sm))) {
                                  ((Ym = 1), (q[(Rm + 8) >> 2] = 1), (Om = x(x(1) - Om)), (Zm = 1));
                                  break e;
                                }
                                a = (0 | a) == (0 | Sm) ? 1 : 2;
                              }
                              if (((q[(Tm + 8) >> 2] = a), !Zm)) break d;
                              a = Pm;
                            }
                            ((u[(Rm + 24) >> 2] = Om), (u[(Rm + 20) >> 2] = x(1) - Om));
                            break c;
                          }
                          ((Zm = 0), (a = Pm));
                        }
                        Ym ? ((q[(Rm + 12) >> 2] = a), (q[(Rm + 16) >> 2] = a + 1)) : (Ym = 0);
                      } else Ym = Zm = 0;
                      g: if ((0 | ($m = q[(Rm + 36) >> 2])) < 1) Wm = x(1);
                      else {
                        if (((an = q[(Rm + 40) >> 2]), (a = 0), (Wm = x(1)), !_m))
                          for (;;) {
                            h: {
                              i: {
                                if (((Pm = q[((a << 2) + an) >> 2]), (Qm = q[Pm >> 2]))) {
                                  if (!q[(Qm + 48) >> 2]) {
                                    Om = u[(Pm + 16) >> 2];
                                    break h;
                                  }
                                  if ((0 | (Sm = q[(Pm + 12) >> 2])) < 1) {
                                    ((Om = x(1)), (u[(Pm + 16) >> 2] = 1));
                                    break h;
                                  }
                                  if (
                                    ((Xm = q[(Pm + 8) >> 2]),
                                    1 != (0 | Sm) &&
                                      ((Um = u[(Qm + 44) >> 2]),
                                      (Tm = q[(Pm + 4) >> 2]),
                                      (Vm = u[Tm >> 2]),
                                      !(Um <= Vm)))
                                  )
                                    break i;
                                  ((Om = u[Xm >> 2]), (u[(Pm + 16) >> 2] = Om));
                                  break h;
                                }
                                ((q[(Pm + 16) >> 2] = 1065353216), (Om = x(1)));
                                break h;
                              }
                              Qm = 1;
                              j: if (((Om = u[(Tm + 4) >> 2]), !(Um < Om))) {
                                for (;;) {
                                  if (((Vm = Om), (0 | Sm) == (0 | (Qm = (Qm + 1) | 0)))) break;
                                  if (((Om = u[(Tm + (Qm << 2)) >> 2]), Um < Om)) break j;
                                }
                                ((Om = u[(((Xm + (Sm << 2)) | 0) - 4) >> 2]),
                                  (u[(Pm + 16) >> 2] = Om));
                                break h;
                              }
                              ((Tm = Pm),
                                (Om = x(x(Um - Vm) / x(Om - Vm))),
                                (Om = x(
                                  x(Om * u[(Pm = (Xm + (Qm << 2)) | 0) >> 2]) +
                                    x(u[(Pm + -4) >> 2] * x(x(1) - Om))
                                )),
                                (u[(Tm + 16) >> 2] = Om));
                            }
                            if (((Wm = Wm < Om ? Wm : Om), (0 | $m) == (0 | (a = (a + 1) | 0))))
                              break g;
                          }
                        for (;;) {
                          ((Pm = q[((a << 2) + an) >> 2]), (Qm = q[Pm >> 2]), (Om = x(1)));
                          l: if (
                            Qm &&
                            ((Xm = q[(Pm + 12) >> 2]), (Om = x(1)), !((0 | Xm) < 1)) &&
                            ((Sm = q[(Pm + 8) >> 2]), (Om = u[Sm >> 2]), 1 != (0 | Xm))
                          ) {
                            m: {
                              if (
                                ((Um = u[(Qm + 44) >> 2]),
                                (Tm = q[(Pm + 4) >> 2]),
                                (Vm = u[Tm >> 2]),
                                Um <= Vm)
                              ) {
                                Om = u[Sm >> 2];
                                break l;
                              }
                              if (((Qm = 1), (Om = u[(Tm + 4) >> 2]), !(Um < Om))) {
                                for (;;) {
                                  if (((Vm = Om), (0 | Xm) == (0 | (Qm = (Qm + 1) | 0)))) break;
                                  if (((Om = u[(Tm + (Qm << 2)) >> 2]), Um < Om)) break m;
                                }
                                Om = u[(((Sm + (Xm << 2)) | 0) - 4) >> 2];
                                break l;
                              }
                            }
                            ((Om = x(x(Um - Vm) / x(Om - Vm))),
                              (Om = x(
                                x(Om * u[(Qm = (Sm + (Qm << 2)) | 0) >> 2]) +
                                  x(u[(Qm + -4) >> 2] * x(x(1) - Om))
                              )));
                          }
                          if (
                            ((u[(Pm + 16) >> 2] = Om),
                            (Wm = Wm < Om ? Wm : Om),
                            (0 | $m) == (0 | (a = (a + 1) | 0)))
                          )
                            break;
                        }
                      }
                      if (
                        ((q[(Rm + 32) >> 2] = Zm),
                        (q[(Rm + 28) >> 2] = Ym),
                        (u[(Rm + 44) >> 2] = Wm),
                        !((Rm = (Rm + 48) | 0) >>> 0 < bn >>> 0))
                      )
                        break;
                    }
                })(a),
                1 <= (0 | (Ac = q[(a + 4) >> 2])))
              )
                for (Ac = ((zc = q[(a + 52) >> 2]) + (Ac << 2)) | 0; ; )
                  if (
                    ((Bc = u[zc >> 2]),
                    (u[zc >> 2] = Bc < x(0) ? x(0) : x(A(Bc, x(1)))),
                    !((zc = (zc + 4) | 0) >>> 0 < Ac >>> 0))
                  )
                    break;
              (!(function (a) {
                var wp = 0,
                  xp = 0,
                  yp = 0,
                  zp = 0,
                  Ap = 0;
                if (1 <= (0 | (xp = q[(a + 4) >> 2])))
                  for (
                    wp = q[(a + 8) >> 2], Ap = (wp + w(xp, 12)) | 0, yp = q[(a + 40) >> 2], a = yp;
                    ;

                  )
                    if (
                      ((xp = 0),
                      q[(wp + 8) >> 2] &&
                        ((zp = q[(wp + 4) >> 2]),
                        (!q[((zp << 2) + yp) >> 2] && -1 != (0 | zp)) ||
                          (xp = !q[(q[wp >> 2] + 32) >> 2])),
                      (q[a >> 2] = xp),
                      (a = (a + 4) | 0),
                      !((wp = (wp + 12) | 0) >>> 0 < Ap >>> 0))
                    )
                      break;
              })(a),
                (function (a) {
                  var Sd = 0,
                    Td = 0,
                    Ud = 0,
                    Vd = 0,
                    Wd = 0,
                    Xd = 0,
                    Yd = 0,
                    Zd = 0,
                    _d = 0,
                    $d = 0,
                    ae = 0,
                    be = 0;
                  if (1 <= (0 | (Yd = q[(a + 4) >> 2])))
                    for (
                      _d = q[(a + 8) >> 2], Zd = q[(q[a >> 2] + 8) >> 2], $d = q[(Zd + 32) >> 2];
                      ;

                    ) {
                      if (
                        ((Ud = q[(w(Wd, 12) + _d) >> 2]),
                        (q[(Ud + 28) >> 2] || q[(Ud + 24) >> 2]) &&
                          ((q[((Sd = Wd << 2) + q[(a + 28) >> 2]) >> 2] = q[(Ud + 12) >> 2]),
                          q[(Ud + 24) >> 2]) &&
                          !((0 | (Vd = q[(Ud + 12) >> 2])) < 1))
                      )
                        for (
                          Td = q[(Ud + 16) >> 2],
                            Vd = (Td + (Vd << 2)) | 0,
                            ae = q[(Sd + $d) >> 2],
                            Sd = (q[(a + 36) >> 2] + (Xd << 2)) | 0,
                            be = q[(Zd + 292) >> 2];
                          ;

                        )
                          if (
                            ((q[Sd >> 2] = q[(((q[Td >> 2] + ae) << 2) + be) >> 2]),
                            (Sd = (Sd + 4) | 0),
                            !((Td = (Td + 4) | 0) >>> 0 < Vd >>> 0))
                          )
                            break;
                      if (q[(Ud + 28) >> 2] && !((0 | (Sd = q[(Ud + 12) >> 2])) < 1))
                        for (
                          Td = q[(Ud + 20) >> 2],
                            Vd = (Td + (Sd << 2)) | 0,
                            Sd = (q[(a + 32) >> 2] + (Xd << 2)) | 0;
                          ;

                        )
                          if (
                            ((q[Sd >> 2] = q[Td >> 2]),
                            (Sd = (Sd + 4) | 0),
                            !((Td = (Td + 4) | 0) >>> 0 < Vd >>> 0))
                          )
                            break;
                      if (
                        ((Xd = (q[(Ud + 8) >> 2] + Xd) | 0), (0 | Yd) == (0 | (Wd = (Wd + 1) | 0)))
                      )
                        break;
                    }
                })(a),
                n[q[1900]]((a + 12) | 0, q[(a + 36) >> 2], q[(a + 44) >> 2], q[(a + 40) >> 2]),
                (function (a) {
                  var np = 0,
                    op = 0,
                    pp = 0,
                    qp = 0,
                    rp = 0,
                    sp = 0,
                    tp = 0,
                    up = 0,
                    vp = 0;
                  if (1 <= (0 | (pp = q[(a + 308) >> 2])))
                    for (
                      np = q[(a + 312) >> 2],
                        sp = (np + (pp << 5)) | 0,
                        tp = q[(a + 268) >> 2],
                        up = q[(a + 148) >> 2],
                        vp = q[(a + 40) >> 2],
                        rp = q[(a + 316) >> 2],
                        pp = rp;
                      ;

                    )
                      if (
                        ((qp = pp),
                        (op = 0),
                        (a = op =
                          !q[(np + 28) >> 2] ||
                          (-1 != (0 | (a = q[(np + 4) >> 2])) &&
                            ((op = 0), !q[((a << 2) + vp) >> 2])) ||
                          (-1 != (0 | (a = q[(np + 8) >> 2])) &&
                            ((op = 0), !q[((a << 2) + rp) >> 2]))
                            ? op
                            : !q[(q[np >> 2] + 32) >> 2]),
                        (q[qp >> 2] = a),
                        (qp = q[(np + 12) >> 2]) >>> 0 <= 1
                          ? qp - 1
                            ? (q[((q[(np + 16) >> 2] << 2) + up) >> 2] = a)
                            : (q[((q[(np + 16) >> 2] << 2) + tp) >> 2] = a)
                          : Y(4, 1372, 0),
                        (pp = (pp + 4) | 0),
                        !((np = (np + 32) | 0) >>> 0 < sp >>> 0))
                      )
                        break;
                })(a),
                (function (a) {
                  var vd = 0,
                    wd = 0,
                    xd = 0,
                    yd = 0,
                    zd = 0,
                    Ad = 0,
                    Bd = 0,
                    Cd = 0,
                    Dd = 0,
                    Ed = 0,
                    Fd = 0,
                    Gd = 0,
                    Hd = 0,
                    Id = 0,
                    Jd = 0,
                    Kd = 0,
                    Ld = 0,
                    Md = 0,
                    Nd = 0,
                    Od = 0,
                    Pd = 0,
                    Qd = 0,
                    Rd = 0;
                  if (((wd = q[a >> 2]), 1 <= (0 | (Cd = q[(a + 60) >> 2])))) {
                    for (
                      Dd = q[(a - -64) >> 2],
                        zd = q[(wd + 8) >> 2],
                        Ed = q[(zd + 96) >> 2],
                        Fd = q[(zd + 372) >> 2];
                      ;

                    ) {
                      if (
                        ((vd = q[(Dd + w(Bd, 24)) >> 2]),
                        (q[(vd + 28) >> 2] || q[(vd + 24) >> 2]) &&
                          ((q[((xd = Bd << 2) + q[(a + 84) >> 2]) >> 2] = q[(vd + 12) >> 2]),
                          q[(vd + 24) >> 2]) &&
                          !((0 | (yd = q[(vd + 12) >> 2])) < 1))
                      )
                        for (
                          wd = q[(vd + 16) >> 2],
                            Gd = (wd + (yd << 2)) | 0,
                            Hd = q[(xd + Ed) >> 2],
                            xd = ((yd = Ad << 2) + q[(a + 96) >> 2]) | 0,
                            yd = (yd + q[(a + 92) >> 2]) | 0;
                          ;

                        )
                          if (
                            ((Id = (Hd + q[wd >> 2]) << 2),
                            (q[xd >> 2] = Fd + (q[(Id + q[(zd + 304) >> 2]) >> 2] << 2)),
                            (q[yd >> 2] = q[(Id + q[(zd + 300) >> 2]) >> 2]),
                            (yd = (yd + 4) | 0),
                            (xd = (xd + 4) | 0),
                            !((wd = (wd + 4) | 0) >>> 0 < Gd >>> 0))
                          )
                            break;
                      if (q[(vd + 28) >> 2] && !((0 | (xd = q[(vd + 12) >> 2])) < 1))
                        for (
                          wd = q[(vd + 20) >> 2],
                            yd = (wd + (xd << 2)) | 0,
                            xd = (q[(a + 88) >> 2] + (Ad << 2)) | 0;
                          ;

                        )
                          if (
                            ((q[xd >> 2] = q[wd >> 2]),
                            (xd = (xd + 4) | 0),
                            !((wd = (wd + 4) | 0) >>> 0 < yd >>> 0))
                          )
                            break;
                      if (
                        ((Ad = (q[(vd + 8) >> 2] + Ad) | 0), (0 | Cd) == (0 | (Bd = (Bd + 1) | 0)))
                      )
                        break;
                    }
                    wd = q[a >> 2];
                  }
                  if (!(r[(q[wd >> 2] + 4) | 0] < 4 || (0 | (Hd = q[(a + 60) >> 2])) < 1))
                    for (
                      wd = q[(wd + 8) >> 2],
                        Id = q[(wd + 104) >> 2],
                        Jd = q[(a + 64) >> 2],
                        Ad = Bd = 0;
                      ;

                    ) {
                      if (
                        ((zd = q[(w(Ad, 24) + Jd) >> 2]),
                        q[(zd + 24) >> 2] && !((0 | (vd = q[(zd + 12) >> 2])) < 1))
                      )
                        for (
                          xd = q[(zd + 16) >> 2],
                            Kd = (xd + (vd << 2)) | 0,
                            Ld = q[(Id + (Ad << 2)) >> 2],
                            yd = ((vd = Bd << 2) + q[(a + 100) >> 2]) | 0,
                            Cd = (vd + q[(a + 104) >> 2]) | 0,
                            Dd = (vd + q[(a + 108) >> 2]) | 0,
                            Ed = (vd + q[(a + 112) >> 2]) | 0,
                            Fd = (vd + q[(a + 116) >> 2]) | 0,
                            Gd = (vd + q[(a + 120) >> 2]) | 0,
                            Md = q[(wd + 628) >> 2],
                            Nd = q[(wd + 624) >> 2],
                            Od = q[(wd + 620) >> 2],
                            Pd = q[(wd + 616) >> 2],
                            Qd = q[(wd + 612) >> 2],
                            Rd = q[(wd + 608) >> 2];
                          ;

                        )
                          if (
                            ((vd = (q[xd >> 2] + Ld) << 2),
                            (q[yd >> 2] = q[(vd + Rd) >> 2]),
                            (q[Cd >> 2] = q[(vd + Qd) >> 2]),
                            (q[Dd >> 2] = q[(vd + Pd) >> 2]),
                            (q[Ed >> 2] = q[(vd + Od) >> 2]),
                            (q[Fd >> 2] = q[(vd + Nd) >> 2]),
                            (q[Gd >> 2] = q[(vd + Md) >> 2]),
                            (Gd = (Gd + 4) | 0),
                            (Fd = (Fd + 4) | 0),
                            (Ed = (Ed + 4) | 0),
                            (Dd = (Dd + 4) | 0),
                            (Cd = (Cd + 4) | 0),
                            (yd = (yd + 4) | 0),
                            !((xd = (xd + 4) | 0) >>> 0 < Kd >>> 0))
                          )
                            break;
                      if (
                        ((Bd = (q[(zd + 8) >> 2] + Bd) | 0), (0 | Hd) == (0 | (Ad = (Ad + 1) | 0)))
                      )
                        break;
                    }
                })(a),
                (function (a) {
                  var Zc = 0,
                    _c = 0,
                    $c = 0,
                    ad = 0,
                    bd = 0,
                    cd = 0,
                    dd = 0,
                    ed = 0,
                    fd = 0,
                    gd = 0,
                    hd = 0,
                    id = 0,
                    jd = 0,
                    kd = 0,
                    ld = 0,
                    md = 0,
                    nd = 0,
                    od = 0,
                    pd = 0,
                    qd = 0,
                    rd = 0,
                    sd = 0,
                    td = 0,
                    ud = 0;
                  if (
                    ((td = q[(a + 172) >> 2]),
                    (kd = q[a >> 2]),
                    ($c = q[(kd + 8) >> 2]),
                    1 <= (0 | (ld = q[(a + 168) >> 2])))
                  )
                    for (nd = q[($c + 128) >> 2]; ; ) {
                      if (
                        ((ad = q[(w(ed, 12) + td) >> 2]),
                        (q[(ad + 28) >> 2] || q[(ad + 24) >> 2]) &&
                          ((q[((fd = ed << 2) + q[(a + 192) >> 2]) >> 2] = q[(ad + 12) >> 2]),
                          q[(ad + 24) >> 2]))
                      ) {
                        if (
                          ((_c = q[(ad + 16) >> 2]),
                          (md = q[(fd + nd) >> 2]),
                          1 <= (0 | (Zc = q[(ad + 12) >> 2])))
                        )
                          for (
                            od = (_c + (Zc << 2)) | 0,
                              bd = ((Zc = dd << 2) + q[(a + 204) >> 2]) | 0,
                              gd = (Zc + q[(a + 208) >> 2]) | 0,
                              hd = (Zc + q[(a + 212) >> 2]) | 0,
                              id = (Zc + q[(a + 216) >> 2]) | 0,
                              jd = (Zc + q[(a + 200) >> 2]) | 0,
                              pd = q[($c + 316) >> 2],
                              qd = q[($c + 332) >> 2],
                              rd = q[($c + 328) >> 2],
                              sd = q[($c + 324) >> 2],
                              ud = q[($c + 320) >> 2],
                              Zc = _c;
                            ;

                          )
                            if (
                              ((cd = (md + q[Zc >> 2]) << 2),
                              (q[bd >> 2] = q[(cd + ud) >> 2]),
                              (q[gd >> 2] = q[(cd + sd) >> 2]),
                              (q[hd >> 2] = q[(cd + rd) >> 2]),
                              (q[id >> 2] = q[(cd + qd) >> 2]),
                              (q[jd >> 2] = q[(cd + pd) >> 2]),
                              (jd = (jd + 4) | 0),
                              (id = (id + 4) | 0),
                              (hd = (hd + 4) | 0),
                              (gd = (gd + 4) | 0),
                              (bd = (bd + 4) | 0),
                              !((Zc = (Zc + 4) | 0) >>> 0 < od >>> 0))
                            )
                              break;
                        ((Zc = (md + q[_c >> 2]) << 2),
                          (q[(fd + q[(a + 292) >> 2]) >> 2] = q[(Zc + q[($c + 336) >> 2]) >> 2]),
                          (q[(fd + q[(a + 296) >> 2]) >> 2] = q[(Zc + q[($c + 340) >> 2]) >> 2]));
                      }
                      if (q[(ad + 28) >> 2] && !((0 | (_c = q[(ad + 12) >> 2])) < 1))
                        for (
                          Zc = q[(ad + 20) >> 2],
                            _c = (Zc + (_c << 2)) | 0,
                            bd = (q[(a + 196) >> 2] + (dd << 2)) | 0;
                          ;

                        )
                          if (
                            ((q[bd >> 2] = q[Zc >> 2]),
                            (bd = (bd + 4) | 0),
                            !((Zc = (Zc + 4) | 0) >>> 0 < _c >>> 0))
                          )
                            break;
                      if (
                        ((dd = (q[(ad + 8) >> 2] + dd) | 0), (0 | ld) == (0 | (ed = (ed + 1) | 0)))
                      )
                        break;
                    }
                  if (!(r[(q[kd >> 2] + 4) | 0] < 4 || (0 | (fd = q[(a + 168) >> 2])) < 1))
                    for (md = q[($c + 136) >> 2], dd = ad = 0; ; ) {
                      if (
                        ((cd = q[(w(dd, 12) + td) >> 2]),
                        q[(cd + 24) >> 2] && !((0 | (Zc = q[(cd + 12) >> 2])) < 1))
                      )
                        for (
                          bd = q[(cd + 16) >> 2],
                            kd = (bd + (Zc << 2)) | 0,
                            ld = q[(md + (dd << 2)) >> 2],
                            gd = ((_c = ad << 2) + q[(a + 220) >> 2]) | 0,
                            hd = (_c + q[(a + 224) >> 2]) | 0,
                            id = (_c + q[(a + 228) >> 2]) | 0,
                            jd = (_c + q[(a + 232) >> 2]) | 0,
                            Zc = (_c + q[(a + 236) >> 2]) | 0,
                            ed = (_c + q[(a + 240) >> 2]) | 0,
                            nd = q[($c + 628) >> 2],
                            od = q[($c + 624) >> 2],
                            pd = q[($c + 620) >> 2],
                            qd = q[($c + 616) >> 2],
                            rd = q[($c + 612) >> 2],
                            sd = q[($c + 608) >> 2];
                          ;

                        )
                          if (
                            ((_c = (ld + q[bd >> 2]) << 2),
                            (q[gd >> 2] = q[(_c + sd) >> 2]),
                            (q[hd >> 2] = q[(_c + rd) >> 2]),
                            (q[id >> 2] = q[(_c + qd) >> 2]),
                            (q[jd >> 2] = q[(_c + pd) >> 2]),
                            (q[Zc >> 2] = q[(_c + od) >> 2]),
                            (q[ed >> 2] = q[(_c + nd) >> 2]),
                            (ed = (ed + 4) | 0),
                            (Zc = (Zc + 4) | 0),
                            (jd = (jd + 4) | 0),
                            (id = (id + 4) | 0),
                            (hd = (hd + 4) | 0),
                            (gd = (gd + 4) | 0),
                            !((bd = (bd + 4) | 0) >>> 0 < kd >>> 0))
                          )
                            break;
                      if (
                        ((ad = (q[(cd + 8) >> 2] + ad) | 0), (0 | fd) == (0 | (dd = (dd + 1) | 0)))
                      )
                        break;
                    }
                })(a),
                (function (a) {
                  var Yi = 0,
                    Zi = 0,
                    _i = 0,
                    $i = 0,
                    aj = 0,
                    bj = 0,
                    cj = 0,
                    dj = 0,
                    ej = 0;
                  ((Yi = (a + 68) | 0),
                    n[q[1899]](Yi, q[(a + 92) >> 2], q[(a + 152) >> 2], q[(a + 148) >> 2]),
                    n[q[1901]](
                      Yi,
                      q[(a + 96) >> 2],
                      q[(a + 156) >> 2],
                      q[(q[(q[a >> 2] + 8) >> 2] + 108) >> 2],
                      2,
                      q[(a + 148) >> 2]
                    ));
                  if (
                    !(
                      r[(q[q[a >> 2] >> 2] + 4) | 0] < 4 ||
                      (n[q[1899]](Yi, q[(a + 100) >> 2], q[(a + 124) >> 2], q[(a + 148) >> 2]),
                      n[q[1899]](Yi, q[(a + 104) >> 2], q[(a + 128) >> 2], q[(a + 148) >> 2]),
                      n[q[1899]](Yi, q[(a + 108) >> 2], q[(a + 132) >> 2], q[(a + 148) >> 2]),
                      n[q[1899]](Yi, q[(a + 112) >> 2], q[(a + 136) >> 2], q[(a + 148) >> 2]),
                      n[q[1899]](Yi, q[(a + 116) >> 2], q[(a + 140) >> 2], q[(a + 148) >> 2]),
                      n[q[1899]](Yi, q[(a + 120) >> 2], q[(a + 144) >> 2], q[(a + 148) >> 2]),
                      (0 | (bj = q[(a + 60) >> 2])) < 1)
                    )
                  ) {
                    for (
                      cj = q[(a + 132) >> 2],
                        dj = q[(a + 128) >> 2],
                        ej = q[(a + 124) >> 2],
                        Zi = q[(a + 160) >> 2],
                        Yi = 0;
                      ;

                    )
                      if (
                        ((aj = Yi << 2),
                        (q[((_i = $i << 2) + Zi) >> 2] = q[(aj + ej) >> 2]),
                        (q[(Zi + (4 | _i)) >> 2] = q[(aj + dj) >> 2]),
                        (q[(Zi + (8 | _i)) >> 2] = q[(aj + cj) >> 2]),
                        ($i = ($i + 4) | 0),
                        (0 | bj) == (0 | (Yi = (Yi + 1) | 0)))
                      )
                        break;
                    for (
                      Zi = q[(a + 164) >> 2],
                        aj = q[(a + 144) >> 2],
                        cj = q[(a + 140) >> 2],
                        dj = q[(a + 136) >> 2],
                        Yi = a = 0;
                      ;

                    )
                      if (
                        ((_i = Yi << 2),
                        (q[(($i = a << 2) + Zi) >> 2] = q[(_i + dj) >> 2]),
                        (q[(Zi + (4 | $i)) >> 2] = q[(_i + cj) >> 2]),
                        (q[(Zi + (8 | $i)) >> 2] = q[(_i + aj) >> 2]),
                        (a = (a + 4) | 0),
                        (0 | bj) == (0 | (Yi = (Yi + 1) | 0)))
                      )
                        break;
                  }
                })(a),
                (function (a) {
                  var Pi = 0,
                    Qi = 0,
                    Ri = 0,
                    Si = 0,
                    Ti = 0,
                    Ui = 0,
                    Vi = 0,
                    Wi = 0,
                    Xi = 0;
                  ((Pi = (a + 176) | 0),
                    n[q[1899]](Pi, q[(a + 200) >> 2], q[(a + 272) >> 2], q[(a + 268) >> 2]),
                    n[q[1899]](Pi, q[(a + 204) >> 2], q[(a + 288) >> 2], q[(a + 268) >> 2]),
                    n[q[1899]](Pi, q[(a + 208) >> 2], q[(a + 280) >> 2], q[(a + 268) >> 2]),
                    n[q[1899]](Pi, q[(a + 212) >> 2], q[(a + 284) >> 2], q[(a + 268) >> 2]),
                    n[q[1899]](Pi, q[(a + 216) >> 2], q[(a + 276) >> 2], q[(a + 268) >> 2]));
                  if (
                    !(
                      r[(q[q[a >> 2] >> 2] + 4) | 0] < 4 ||
                      (n[q[1899]](Pi, q[(a + 220) >> 2], q[(a + 244) >> 2], q[(a + 268) >> 2]),
                      n[q[1899]](Pi, q[(a + 224) >> 2], q[(a + 248) >> 2], q[(a + 268) >> 2]),
                      n[q[1899]](Pi, q[(a + 228) >> 2], q[(a + 252) >> 2], q[(a + 268) >> 2]),
                      n[q[1899]](Pi, q[(a + 232) >> 2], q[(a + 256) >> 2], q[(a + 268) >> 2]),
                      n[q[1899]](Pi, q[(a + 236) >> 2], q[(a + 260) >> 2], q[(a + 268) >> 2]),
                      n[q[1899]](Pi, q[(a + 240) >> 2], q[(a + 264) >> 2], q[(a + 268) >> 2]),
                      (0 | (Ui = q[(a + 168) >> 2])) < 1)
                    )
                  ) {
                    for (
                      Vi = q[(a + 252) >> 2],
                        Wi = q[(a + 248) >> 2],
                        Xi = q[(a + 244) >> 2],
                        Qi = q[(a + 300) >> 2],
                        Pi = 0;
                      ;

                    )
                      if (
                        ((Ti = Pi << 2),
                        (q[((Ri = Si << 2) + Qi) >> 2] = q[(Ti + Xi) >> 2]),
                        (q[(Qi + (4 | Ri)) >> 2] = q[(Ti + Wi) >> 2]),
                        (q[(Qi + (8 | Ri)) >> 2] = q[(Ti + Vi) >> 2]),
                        (Si = (Si + 4) | 0),
                        (0 | Ui) == (0 | (Pi = (Pi + 1) | 0)))
                      )
                        break;
                    for (
                      Qi = q[(a + 304) >> 2],
                        Ti = q[(a + 264) >> 2],
                        Vi = q[(a + 260) >> 2],
                        Wi = q[(a + 256) >> 2],
                        Pi = a = 0;
                      ;

                    )
                      if (
                        ((Ri = Pi << 2),
                        (q[((Si = a << 2) + Qi) >> 2] = q[(Ri + Wi) >> 2]),
                        (q[(Qi + (4 | Si)) >> 2] = q[(Ri + Vi) >> 2]),
                        (q[(Qi + (8 | Si)) >> 2] = q[(Ri + Ti) >> 2]),
                        (a = (a + 4) | 0),
                        (0 | Ui) == (0 | (Pi = (Pi + 1) | 0)))
                      )
                        break;
                  }
                })(a),
                (function (a) {
                  var hp = 0,
                    ip = 0,
                    jp = 0,
                    kp = 0,
                    lp = 0,
                    mp = 0;
                  if (1 <= (0 | (ip = q[(a + 336) >> 2])))
                    for (
                      hp = q[(a + 340) >> 2],
                        kp = (hp + w(ip, 20)) | 0,
                        lp = q[(a + 316) >> 2],
                        mp = q[(a + 40) >> 2],
                        a = q[(a + 428) >> 2];
                      ;

                    )
                      if (
                        ((ip = 0),
                        q[(hp + 12) >> 2] &&
                          ((jp = q[(hp + 4) >> 2]), q[((jp << 2) + mp) >> 2] || -1 == (0 | jp)) &&
                          ((jp = q[(hp + 8) >> 2]), q[((jp << 2) + lp) >> 2] || -1 == (0 | jp)) &&
                          (ip = !q[(q[hp >> 2] + 32) >> 2]),
                        (q[a >> 2] = ip),
                        (a = (a + 4) | 0),
                        !((hp = (hp + 20) | 0) >>> 0 < kp >>> 0))
                      )
                        break;
                })(a),
                (function (a) {
                  var Cc = 0,
                    Dc = 0,
                    Ec = 0,
                    Fc = 0,
                    Gc = 0,
                    Hc = 0,
                    Ic = 0,
                    Jc = 0,
                    Kc = 0,
                    Lc = 0,
                    Mc = 0,
                    Nc = 0,
                    Oc = 0,
                    Pc = 0,
                    Qc = 0,
                    Rc = 0,
                    Sc = 0,
                    Tc = 0,
                    Uc = 0,
                    Vc = 0,
                    Wc = 0,
                    Xc = 0,
                    Yc = 0;
                  if (((Dc = q[a >> 2]), 1 <= (0 | (Lc = q[(a + 336) >> 2])))) {
                    for (
                      Mc = q[(a + 340) >> 2],
                        Gc = q[(Dc + 8) >> 2],
                        Nc = q[(Gc + 168) >> 2],
                        Oc = q[(Gc + 372) >> 2];
                      ;

                    ) {
                      if (
                        ((Cc = q[(Mc + w(Ic, 20)) >> 2]),
                        (q[(Cc + 28) >> 2] || q[(Cc + 24) >> 2]) &&
                          ((q[((Ec = Ic << 2) + q[(a + 360) >> 2]) >> 2] = q[(Cc + 12) >> 2]),
                          q[(Cc + 24) >> 2]) &&
                          !((0 | (Fc = q[(Cc + 12) >> 2])) < 1))
                      )
                        for (
                          Dc = q[(Cc + 16) >> 2],
                            Pc = (Dc + (Fc << 2)) | 0,
                            Qc = q[(Ec + Nc) >> 2],
                            Ec = ((Hc = Jc << 2) + q[(a + 376) >> 2]) | 0,
                            Fc = (Hc + q[(a + 368) >> 2]) | 0,
                            Hc = (Hc + q[(a + 372) >> 2]) | 0;
                          ;

                        )
                          if (
                            ((Kc = (Qc + q[Dc >> 2]) << 2),
                            (q[Ec >> 2] = Oc + (q[(Kc + q[(Gc + 360) >> 2]) >> 2] << 2)),
                            (q[Fc >> 2] = q[(Kc + q[(Gc + 352) >> 2]) >> 2]),
                            (q[Hc >> 2] = q[(Kc + q[(Gc + 356) >> 2]) >> 2]),
                            (Hc = (Hc + 4) | 0),
                            (Fc = (Fc + 4) | 0),
                            (Ec = (Ec + 4) | 0),
                            !((Dc = (Dc + 4) | 0) >>> 0 < Pc >>> 0))
                          )
                            break;
                      if (q[(Cc + 28) >> 2] && !((0 | (Ec = q[(Cc + 12) >> 2])) < 1))
                        for (
                          Dc = q[(Cc + 20) >> 2],
                            Fc = (Dc + (Ec << 2)) | 0,
                            Ec = (q[(a + 364) >> 2] + (Jc << 2)) | 0;
                          ;

                        )
                          if (
                            ((q[Ec >> 2] = q[Dc >> 2]),
                            (Ec = (Ec + 4) | 0),
                            !((Dc = (Dc + 4) | 0) >>> 0 < Fc >>> 0))
                          )
                            break;
                      if (
                        ((Jc = (q[(Cc + 8) >> 2] + Jc) | 0), (0 | Lc) == (0 | (Ic = (Ic + 1) | 0)))
                      )
                        break;
                    }
                    Dc = q[a >> 2];
                  }
                  if (!(r[(q[Dc >> 2] + 4) | 0] < 4 || (0 | (Oc = q[(a + 336) >> 2])) < 1))
                    for (
                      Dc = q[(Dc + 8) >> 2],
                        Pc = q[(Dc + 176) >> 2],
                        Qc = q[(a + 340) >> 2],
                        Gc = Jc = 0;
                      ;

                    ) {
                      if (
                        ((Ic = q[(Qc + w(Gc, 20)) >> 2]),
                        q[(Ic + 24) >> 2] && !((0 | (Cc = q[(Ic + 12) >> 2])) < 1))
                      )
                        for (
                          Ec = q[(Ic + 16) >> 2],
                            Rc = (Ec + (Cc << 2)) | 0,
                            Sc = q[(Pc + (Gc << 2)) >> 2],
                            Fc = ((Cc = Jc << 2) + q[(a + 380) >> 2]) | 0,
                            Hc = (Cc + q[(a + 384) >> 2]) | 0,
                            Kc = (Cc + q[(a + 388) >> 2]) | 0,
                            Lc = (Cc + q[(a + 392) >> 2]) | 0,
                            Mc = (Cc + q[(a + 396) >> 2]) | 0,
                            Nc = (Cc + q[(a + 400) >> 2]) | 0,
                            Tc = q[(Dc + 628) >> 2],
                            Uc = q[(Dc + 624) >> 2],
                            Vc = q[(Dc + 620) >> 2],
                            Wc = q[(Dc + 616) >> 2],
                            Xc = q[(Dc + 612) >> 2],
                            Yc = q[(Dc + 608) >> 2];
                          ;

                        )
                          if (
                            ((Cc = (q[Ec >> 2] + Sc) << 2),
                            (q[Fc >> 2] = q[(Cc + Yc) >> 2]),
                            (q[Hc >> 2] = q[(Cc + Xc) >> 2]),
                            (q[Kc >> 2] = q[(Cc + Wc) >> 2]),
                            (q[Lc >> 2] = q[(Cc + Vc) >> 2]),
                            (q[Mc >> 2] = q[(Cc + Uc) >> 2]),
                            (q[Nc >> 2] = q[(Cc + Tc) >> 2]),
                            (Nc = (Nc + 4) | 0),
                            (Mc = (Mc + 4) | 0),
                            (Lc = (Lc + 4) | 0),
                            (Kc = (Kc + 4) | 0),
                            (Hc = (Hc + 4) | 0),
                            (Fc = (Fc + 4) | 0),
                            !((Ec = (Ec + 4) | 0) >>> 0 < Rc >>> 0))
                          )
                            break;
                      if (
                        ((Jc = (q[(Ic + 8) >> 2] + Jc) | 0), (0 | Oc) == (0 | (Gc = (Gc + 1) | 0)))
                      )
                        break;
                    }
                })(a),
                (function (a) {
                  var Gi = 0,
                    Hi = 0,
                    Ii = 0,
                    Ji = 0,
                    Ki = 0,
                    Li = 0,
                    Mi = 0,
                    Ni = 0,
                    Oi = 0;
                  ((Gi = (a + 344) | 0),
                    n[q[1899]](Gi, q[(a + 368) >> 2], q[(a + 452) >> 2], q[(a + 428) >> 2]),
                    n[q[1900]](Gi, q[(a + 372) >> 2], q[(a + 444) >> 2], q[(a + 428) >> 2]),
                    n[q[1901]](
                      Gi,
                      q[(a + 376) >> 2],
                      q[(a + 448) >> 2],
                      q[(q[(q[a >> 2] + 8) >> 2] + 208) >> 2],
                      2,
                      q[(a + 428) >> 2]
                    ));
                  if (
                    !(
                      r[(q[q[a >> 2] >> 2] + 4) | 0] < 4 ||
                      (n[q[1899]](Gi, q[(a + 380) >> 2], q[(a + 404) >> 2], q[(a + 428) >> 2]),
                      n[q[1899]](Gi, q[(a + 384) >> 2], q[(a + 408) >> 2], q[(a + 428) >> 2]),
                      n[q[1899]](Gi, q[(a + 388) >> 2], q[(a + 412) >> 2], q[(a + 428) >> 2]),
                      n[q[1899]](Gi, q[(a + 392) >> 2], q[(a + 416) >> 2], q[(a + 428) >> 2]),
                      n[q[1899]](Gi, q[(a + 396) >> 2], q[(a + 420) >> 2], q[(a + 428) >> 2]),
                      n[q[1899]](Gi, q[(a + 400) >> 2], q[(a + 424) >> 2], q[(a + 428) >> 2]),
                      (0 | (Li = q[(a + 336) >> 2])) < 1)
                    )
                  ) {
                    for (
                      Mi = q[(a + 412) >> 2],
                        Ni = q[(a + 408) >> 2],
                        Oi = q[(a + 404) >> 2],
                        Hi = q[(a + 456) >> 2],
                        Gi = 0;
                      ;

                    )
                      if (
                        ((Ki = Gi << 2),
                        (q[((Ii = Ji << 2) + Hi) >> 2] = q[(Ki + Oi) >> 2]),
                        (q[(Hi + (4 | Ii)) >> 2] = q[(Ki + Ni) >> 2]),
                        (q[(Hi + (8 | Ii)) >> 2] = q[(Ki + Mi) >> 2]),
                        (Ji = (Ji + 4) | 0),
                        (0 | Li) == (0 | (Gi = (Gi + 1) | 0)))
                      )
                        break;
                    for (
                      Hi = q[(a + 460) >> 2],
                        Ki = q[(a + 424) >> 2],
                        Mi = q[(a + 420) >> 2],
                        Ni = q[(a + 416) >> 2],
                        Gi = a = 0;
                      ;

                    )
                      if (
                        ((Ii = Gi << 2),
                        (q[((Ji = a << 2) + Hi) >> 2] = q[(Ii + Ni) >> 2]),
                        (q[(Hi + (4 | Ji)) >> 2] = q[(Ii + Mi) >> 2]),
                        (q[(Hi + (8 | Ji)) >> 2] = q[(Ii + Ki) >> 2]),
                        (a = (a + 4) | 0),
                        (0 | Li) == (0 | (Gi = (Gi + 1) | 0)))
                      )
                        break;
                  }
                })(a),
                (function (a) {
                  var dq = 0,
                    eq = 0,
                    fq = 0,
                    gq = 0,
                    hq = 0,
                    iq = 0,
                    jq = 0,
                    kq = 0,
                    lq = 0,
                    mq = 0,
                    nq = 0,
                    oq = 0;
                  if (1 <= (0 | (jq = q[(a + 504) >> 2])))
                    for (
                      lq = q[(a + 508) >> 2], kq = q[(q[a >> 2] + 8) >> 2], mq = q[(kq + 572) >> 2];
                      ;

                    ) {
                      if (
                        ((fq = q[(w(hq, 24) + lq) >> 2]),
                        (q[(fq + 28) >> 2] || q[(fq + 24) >> 2]) &&
                          ((q[((dq = hq << 2) + q[(a + 528) >> 2]) >> 2] = q[(fq + 12) >> 2]),
                          q[(fq + 24) >> 2]) &&
                          !((0 | (gq = q[(fq + 12) >> 2])) < 1))
                      )
                        for (
                          eq = q[(fq + 16) >> 2],
                            gq = (eq + (gq << 2)) | 0,
                            nq = q[(dq + mq) >> 2],
                            dq = (q[(a + 536) >> 2] + (iq << 2)) | 0,
                            oq = q[(kq + 604) >> 2];
                          ;

                        )
                          if (
                            ((q[dq >> 2] = q[(((q[eq >> 2] + nq) << 2) + oq) >> 2]),
                            (dq = (dq + 4) | 0),
                            !((eq = (eq + 4) | 0) >>> 0 < gq >>> 0))
                          )
                            break;
                      if (q[(fq + 28) >> 2] && !((0 | (dq = q[(fq + 12) >> 2])) < 1))
                        for (
                          eq = q[(fq + 20) >> 2],
                            gq = (eq + (dq << 2)) | 0,
                            dq = (q[(a + 532) >> 2] + (iq << 2)) | 0;
                          ;

                        )
                          if (
                            ((q[dq >> 2] = q[eq >> 2]),
                            (dq = (dq + 4) | 0),
                            !((eq = (eq + 4) | 0) >>> 0 < gq >>> 0))
                          )
                            break;
                      if (
                        ((iq = (q[(fq + 8) >> 2] + iq) | 0), (0 | jq) == (0 | (hq = (hq + 1) | 0)))
                      )
                        break;
                    }
                })(a),
                n[q[1899]]((a + 512) | 0, q[(a + 536) >> 2], q[(a + 540) >> 2], 0),
                (function (a) {
                  var cp = 0,
                    dp = 0,
                    ep = 0,
                    fp = 0,
                    gp = 0;
                  if (!(r[(q[q[a >> 2] >> 2] + 4) | 0] < 6 || (0 | (dp = q[(a + 544) >> 2])) < 1))
                    for (
                      cp = q[(a + 548) >> 2], dp = (cp + w(dp, 12)) | 0, a = q[(a + 628) >> 2];
                      ;

                    )
                      if (
                        ((gp = a),
                        (fp = q[(cp + 4) >> 2]),
                        (ep = 0),
                        fp && (ep = q[fp >> 2]),
                        (q[gp >> 2] = ep),
                        (a = (a + 4) | 0),
                        !((cp = (cp + 12) | 0) >>> 0 < dp >>> 0))
                      )
                        break;
                })(a),
                (function (a) {
                  var Ip = 0,
                    Jp = 0,
                    Kp = 0,
                    Lp = 0,
                    Mp = 0,
                    Np = 0,
                    Op = 0,
                    Pp = 0,
                    Qp = 0,
                    Rp = 0,
                    Sp = 0,
                    Tp = 0,
                    Up = 0,
                    Vp = 0,
                    Wp = 0,
                    Xp = 0,
                    Yp = 0,
                    Zp = 0,
                    _p = 0,
                    $p = 0,
                    aq = 0,
                    bq = 0,
                    cq = 0;
                  Ip = q[a >> 2];
                  if (!(r[(q[Ip >> 2] + 4) | 0] < 6 || (0 | (Pp = q[(a + 544) >> 2])) < 1)) {
                    for (Vp = q[(a + 548) >> 2], Mp = q[(Ip + 8) >> 2]; ; ) {
                      if (((Ip = (w(Np, 12) + Vp) | 0), (Jp = q[Ip >> 2]))) {
                        if (
                          (q[(Jp + 28) >> 2] || q[(Jp + 24) >> 2]) &&
                          ((q[(q[(a + 568) >> 2] + (Np << 2)) >> 2] = q[(Jp + 12) >> 2]),
                          q[(Jp + 24) >> 2]) &&
                          (Ip = q[(Ip + 8) >> 2]) &&
                          -1 != (0 | (Lp = q[Ip >> 2])) &&
                          !((0 | (Ip = q[(Jp + 12) >> 2])) < 1)
                        )
                          for (
                            Kp = q[(Jp + 16) >> 2],
                              Qp = (Kp + (Ip << 2)) | 0,
                              Ip = (q[(a + 576) >> 2] + (Op << 2)) | 0,
                              Rp = q[(Mp + 656) >> 2];
                            ;

                          )
                            if (
                              ((q[Ip >> 2] = q[(Rp + ((Lp + q[Kp >> 2]) << 2)) >> 2]),
                              (Ip = (Ip + 4) | 0),
                              !((Kp = (Kp + 4) | 0) >>> 0 < Qp >>> 0))
                            )
                              break;
                        if (q[(Jp + 28) >> 2] && !((0 | (Ip = q[(Jp + 12) >> 2])) < 1))
                          for (
                            Kp = q[(Jp + 20) >> 2],
                              Lp = (Kp + (Ip << 2)) | 0,
                              Ip = (q[(a + 572) >> 2] + (Op << 2)) | 0;
                            ;

                          )
                            if (
                              ((q[Ip >> 2] = q[Kp >> 2]),
                              (Ip = (Ip + 4) | 0),
                              !((Kp = (Kp + 4) | 0) >>> 0 < Lp >>> 0))
                            )
                              break;
                        Op = (q[(Jp + 8) >> 2] + Op) | 0;
                      }
                      if ((0 | Pp) == (0 | (Np = (Np + 1) | 0))) break;
                    }
                    if (!((0 | (Wp = q[(a + 544) >> 2])) < 1))
                      for (Xp = q[(Mp + 660) >> 2], Lp = Pp = 0; ; ) {
                        if (((Ip = (w(Lp, 12) + Vp) | 0), (Kp = q[Ip >> 2]))) {
                          if (
                            q[(Kp + 24) >> 2] &&
                            (Ip = q[(Ip + 8) >> 2]) &&
                            -1 != (0 | (Sp = q[Ip >> 2])) &&
                            !((0 | (Jp = q[(Kp + 12) >> 2])) < 1)
                          )
                            for (
                              Ip = q[(Kp + 16) >> 2],
                                Yp = (Ip + (Jp << 2)) | 0,
                                Qp = ((Jp = Pp << 2) + q[(a + 580) >> 2]) | 0,
                                Rp = (Jp + q[(a + 584) >> 2]) | 0,
                                Np = (Jp + q[(a + 588) >> 2]) | 0,
                                Tp = (Jp + q[(a + 592) >> 2]) | 0,
                                Up = (Jp + q[(a + 596) >> 2]) | 0,
                                Op = (Jp + q[(a + 600) >> 2]) | 0,
                                Sp = q[((Sp << 2) + Xp) >> 2],
                                Zp = q[(Mp + 628) >> 2],
                                _p = q[(Mp + 624) >> 2],
                                $p = q[(Mp + 620) >> 2],
                                aq = q[(Mp + 616) >> 2],
                                bq = q[(Mp + 612) >> 2],
                                cq = q[(Mp + 608) >> 2];
                              ;

                            )
                              if (
                                ((Jp = (Sp + q[Ip >> 2]) << 2),
                                (q[Qp >> 2] = q[(Jp + cq) >> 2]),
                                (q[Rp >> 2] = q[(Jp + bq) >> 2]),
                                (q[Np >> 2] = q[(Jp + aq) >> 2]),
                                (q[Tp >> 2] = q[(Jp + $p) >> 2]),
                                (q[Up >> 2] = q[(Jp + _p) >> 2]),
                                (q[Op >> 2] = q[(Jp + Zp) >> 2]),
                                (Op = (Op + 4) | 0),
                                (Up = (Up + 4) | 0),
                                (Tp = (Tp + 4) | 0),
                                (Np = (Np + 4) | 0),
                                (Rp = (Rp + 4) | 0),
                                (Qp = (Qp + 4) | 0),
                                !((Ip = (Ip + 4) | 0) >>> 0 < Yp >>> 0))
                              )
                                break;
                          Pp = (q[(Kp + 8) >> 2] + Pp) | 0;
                        }
                        if ((0 | Wp) == (0 | (Lp = (Lp + 1) | 0))) break;
                      }
                  }
                })(a),
                (function (a) {
                  var Vh = 0,
                    Wh = 0,
                    Xh = 0,
                    Ai = 0,
                    Bi = 0,
                    Ci = 0,
                    Di = 0,
                    Ei = 0,
                    Fi = 0;
                  if (
                    !(
                      r[(q[q[a >> 2] >> 2] + 4) | 0] < 6 ||
                      ((Vh = (a + 552) | 0),
                      n[q[1899]](Vh, q[(a + 576) >> 2], q[(a + 632) >> 2], q[(a + 628) >> 2]),
                      n[q[1899]](Vh, q[(a + 580) >> 2], q[(a + 604) >> 2], q[(a + 628) >> 2]),
                      n[q[1899]](Vh, q[(a + 584) >> 2], q[(a + 608) >> 2], q[(a + 628) >> 2]),
                      n[q[1899]](Vh, q[(a + 588) >> 2], q[(a + 612) >> 2], q[(a + 628) >> 2]),
                      n[q[1899]](Vh, q[(a + 592) >> 2], q[(a + 616) >> 2], q[(a + 628) >> 2]),
                      n[q[1899]](Vh, q[(a + 596) >> 2], q[(a + 620) >> 2], q[(a + 628) >> 2]),
                      n[q[1899]](Vh, q[(a + 600) >> 2], q[(a + 624) >> 2], q[(a + 628) >> 2]),
                      (0 | (Ci = q[(a + 544) >> 2])) < 1)
                    )
                  ) {
                    for (
                      Di = q[(a + 612) >> 2],
                        Ei = q[(a + 608) >> 2],
                        Fi = q[(a + 604) >> 2],
                        Wh = q[(a + 636) >> 2],
                        Vh = 0;
                      ;

                    )
                      if (
                        ((Bi = Vh << 2),
                        (q[((Xh = Ai << 2) + Wh) >> 2] = q[(Bi + Fi) >> 2]),
                        (q[(Wh + (4 | Xh)) >> 2] = q[(Bi + Ei) >> 2]),
                        (q[(Wh + (8 | Xh)) >> 2] = q[(Bi + Di) >> 2]),
                        (Ai = (Ai + 4) | 0),
                        (0 | Ci) == (0 | (Vh = (Vh + 1) | 0)))
                      )
                        break;
                    for (
                      Wh = q[(a + 640) >> 2],
                        Bi = q[(a + 624) >> 2],
                        Di = q[(a + 620) >> 2],
                        Ei = q[(a + 616) >> 2],
                        Vh = a = 0;
                      ;

                    )
                      if (
                        ((Xh = Vh << 2),
                        (q[((Ai = a << 2) + Wh) >> 2] = q[(Xh + Ei) >> 2]),
                        (q[(Wh + (4 | Ai)) >> 2] = q[(Xh + Di) >> 2]),
                        (q[(Wh + (8 | Ai)) >> 2] = q[(Xh + Bi) >> 2]),
                        (a = (a + 4) | 0),
                        (0 | Ci) == (0 | (Vh = (Vh + 1) | 0)))
                      )
                        break;
                  }
                })(a),
                (function (a) {
                  var fj = x(0),
                    rj = 0,
                    sj = 0,
                    tj = 0,
                    uj = 0,
                    vj = 0,
                    wj = 0,
                    xj = x(0),
                    yj = 0,
                    zj = 0,
                    Aj = 0;
                  ((L = vj = (L - 16) | 0), (tj = q[a >> 2]));
                  if (!(r[(q[tj >> 2] + 4) | 0] < 5 || (0 | (uj = q[(a + 700) >> 2])) < 1))
                    for (
                      sj = q[(a + 704) >> 2],
                        yj = (sj + w(uj, 12)) | 0,
                        zj = q[(a + 44) >> 2],
                        uj = q[(q[(tj + 8) >> 2] + 292) >> 2];
                      ;

                    ) {
                      if (
                        ((tj = ((q[sj >> 2] << 2) + zj) | 0),
                        (fj = x(q[tj >> 2])),
                        1 <= (0 | (rj = q[(sj + 4) >> 2])))
                      )
                        for (a = q[(sj + 8) >> 2], Aj = (a + w(rj, 48)) | 0; ; )
                          if (
                            ((rj = q[(a + 8) >> 2]) &&
                              ((wj = (rj + -1) | 0) >>> 0 <= 1
                                ? ((rj = q[(a + 4) >> 2]),
                                  (xj = u[(uj + ((rj + q[(a + 12) >> 2]) << 2)) >> 2]),
                                  (fj = x(
                                    wj - 1
                                      ? fj + x(u[(a + 44) >> 2] * x(xj * u[(a + 20) >> 2]))
                                      : fj +
                                          x(
                                            u[(a + 44) >> 2] *
                                              x(
                                                x(xj * u[(a + 20) >> 2]) +
                                                  x(
                                                    u[(uj + ((rj + q[(a + 16) >> 2]) << 2)) >> 2] *
                                                      u[(a + 24) >> 2]
                                                  )
                                              )
                                          )
                                  )))
                                : ((q[vj >> 2] = rj), Y(4, 1024, vj))),
                            !((a = (a + 48) | 0) >>> 0 < Aj >>> 0))
                          )
                            break;
                      if (
                        ((fj =
                          (fj = x(fj + x(0.0010000000474974513))) < x(0) ? x(0) : x(A(fj, x(1e3)))),
                        (a = x(y(fj)) < x(2147483648) ? ~~fj : -2147483648),
                        (q[tj >> 2] = a),
                        !((sj = (sj + 12) | 0) >>> 0 < yj >>> 0))
                      )
                        break;
                    }
                  L = (16 + vj) | 0;
                })(a),
                (function (a) {
                  var Dh = 0,
                    Hh = 0,
                    Ih = 0,
                    Jh = 0,
                    Kh = 0,
                    Lh = x(0),
                    Mh = 0,
                    Nh = 0,
                    Oh = 0,
                    Ph = 0,
                    Qh = 0,
                    Rh = 0,
                    Sh = 0,
                    Th = 0,
                    Uh = 0;
                  ((L = Mh = (L - 16) | 0), (Dh = q[a >> 2]));
                  if (
                    !(
                      r[(q[Dh >> 2] + 4) | 0] < 4 ||
                      ((Dh = q[(Dh + 8) >> 2]),
                      ua(
                        a,
                        q[(a + 708) >> 2],
                        q[(a + 712) >> 2],
                        q[(Dh + 304) >> 2],
                        q[(a + 156) >> 2],
                        q[(Dh + 108) >> 2]
                      ),
                      (Dh = q[a >> 2]),
                      r[(q[Dh >> 2] + 4) | 0] < 5)
                    )
                  ) {
                    if (
                      ((Hh = q[(a + 712) >> 2]),
                      (Ih = q[(Dh + 8) >> 2]),
                      (Qh = q[(Ih + 312) >> 2]),
                      (Rh = q[(Ih + 308) >> 2]),
                      1 <= (0 | (Dh = q[(a + 708) >> 2])))
                    ) {
                      for (
                        Sh = (w(Dh, 12) + Hh) | 0, Th = q[(a + 152) >> 2], Nh = q[(Ih + 300) >> 2];
                        ;

                      ) {
                        if (
                          ((Oh = ((q[Hh >> 2] << 2) + Th) | 0),
                          (Kh = q[Oh >> 2]),
                          1 <= (0 | (Jh = q[(Hh + 4) >> 2])))
                        )
                          for (Dh = q[(Hh + 8) >> 2], Uh = (Dh + w(Jh, 48)) | 0; ; )
                            if (
                              ((Jh = q[(Dh + 8) >> 2]) &&
                                ((Ph = (Jh + -1) | 0) >>> 0 <= 1
                                  ? ((Jh = q[(Dh + 4) >> 2]),
                                    (Lh = u[(((Jh + q[(Dh + 12) >> 2]) << 2) + Nh) >> 2]),
                                    (Kh =
                                      (j(
                                        x(
                                          Ph - 1
                                            ? x(u[(Dh + 44) >> 2] * x(Lh * u[(Dh + 20) >> 2])) +
                                                (f(0, Kh), k())
                                            : x(
                                                u[(Dh + 44) >> 2] *
                                                  x(
                                                    x(Lh * u[(Dh + 20) >> 2]) +
                                                      x(
                                                        u[
                                                          (((Jh + q[(Dh + 16) >> 2]) << 2) + Nh) >>
                                                            2
                                                        ] * u[(Dh + 24) >> 2]
                                                      )
                                                  )
                                              ) + (f(0, Kh), k())
                                        )
                                      ),
                                      b[0])))
                                  : ((q[Mh >> 2] = Jh), Y(4, 1024, Mh))),
                              !((Dh = (Dh + 48) | 0) >>> 0 < Uh >>> 0))
                            )
                              break;
                        if (
                          (f(0, Kh),
                          (Lh = k()),
                          (u[Oh >> 2] = Lh < x(0) ? x(0) : x(A(Lh, x(1)))),
                          !((Hh = (Hh + 12) | 0) >>> 0 < Sh >>> 0))
                        )
                          break;
                      }
                      ((Hh = q[(a + 712) >> 2]), (Dh = q[(a + 708) >> 2]));
                    }
                    (ea(
                      Dh,
                      Hh,
                      Rh,
                      q[(Ih + 608) >> 2],
                      q[(Ih + 612) >> 2],
                      q[(Ih + 616) >> 2],
                      q[(a + 160) >> 2]
                    ),
                      ea(
                        q[(a + 708) >> 2],
                        q[(a + 712) >> 2],
                        Qh,
                        q[(Ih + 620) >> 2],
                        q[(Ih + 624) >> 2],
                        q[(Ih + 628) >> 2],
                        q[(a + 164) >> 2]
                      ));
                  }
                  L = (16 + Mh) | 0;
                })(a),
                (function (a) {
                  var Ug = 0,
                    Vg = 0,
                    Wg = 0,
                    Xg = 0,
                    Yg = x(0),
                    Zg = 0,
                    _g = 0,
                    $g = 0,
                    ah = 0,
                    bh = 0,
                    ch = 0,
                    dh = 0,
                    eh = 0,
                    fh = 0,
                    gh = 0;
                  ((L = $g = (L - 80) | 0), (Ug = q[a >> 2]));
                  if (!(r[(q[Ug >> 2] + 4) | 0] < 5)) {
                    if (
                      ((Zg = q[(Ug + 8) >> 2]),
                      (eh = q[(Zg + 348) >> 2]),
                      (fh = q[(Zg + 344) >> 2]),
                      (Vg = q[(a + 720) >> 2]),
                      (Ug = q[(a + 716) >> 2]),
                      (Wg = Vg),
                      !((0 | Ug) < 1))
                    ) {
                      for (
                        ah = (w(Ug, 12) + Vg) | 0, bh = q[(a + 280) >> 2], _g = q[(Zg + 324) >> 2];
                        ;

                      ) {
                        if (
                          ((ch = (bh + (q[Vg >> 2] << 2)) | 0),
                          (Wg = q[ch >> 2]),
                          1 <= (0 | (Xg = q[(Vg + 4) >> 2])))
                        )
                          for (Ug = q[(Vg + 8) >> 2], gh = (Ug + w(Xg, 48)) | 0; ; )
                            if (
                              ((Xg = q[(Ug + 8) >> 2]) &&
                                ((dh = (Xg + -1) | 0) >>> 0 <= 1
                                  ? ((Xg = q[(Ug + 4) >> 2]),
                                    (Yg = u[(_g + ((Xg + q[(Ug + 12) >> 2]) << 2)) >> 2]),
                                    (Wg =
                                      (j(
                                        x(
                                          dh - 1
                                            ? x(u[(Ug + 44) >> 2] * x(Yg * u[(Ug + 20) >> 2])) +
                                                (f(0, Wg), k())
                                            : x(
                                                u[(Ug + 44) >> 2] *
                                                  x(
                                                    x(Yg * u[(Ug + 20) >> 2]) +
                                                      x(
                                                        u[
                                                          (_g + ((Xg + q[(Ug + 16) >> 2]) << 2)) >>
                                                            2
                                                        ] * u[(Ug + 24) >> 2]
                                                      )
                                                  )
                                              ) + (f(0, Wg), k())
                                        )
                                      ),
                                      b[0])))
                                  : ((q[(64 + $g) >> 2] = Xg), Y(4, 1024, ($g + 64) | 0))),
                              !((Ug = (Ug + 48) | 0) >>> 0 < gh >>> 0))
                            )
                              break;
                        if (((q[ch >> 2] = Wg), !((Vg = (Vg + 12) | 0) >>> 0 < ah >>> 0))) break;
                      }
                      if (
                        ((Vg = q[(a + 720) >> 2]),
                        (Ug = q[(a + 716) >> 2]),
                        (Wg = Vg),
                        !((0 | Ug) < 1))
                      ) {
                        for (
                          ah = (w(Ug, 12) + Vg) | 0,
                            bh = q[(a + 284) >> 2],
                            _g = q[(q[(q[a >> 2] + 8) >> 2] + 328) >> 2];
                          ;

                        ) {
                          if (
                            ((ch = (bh + (q[Vg >> 2] << 2)) | 0),
                            (Wg = q[ch >> 2]),
                            1 <= (0 | (Xg = q[(Vg + 4) >> 2])))
                          )
                            for (Ug = q[(Vg + 8) >> 2], gh = (Ug + w(Xg, 48)) | 0; ; )
                              if (
                                ((Xg = q[(Ug + 8) >> 2]) &&
                                  ((dh = (Xg + -1) | 0) >>> 0 <= 1
                                    ? ((Xg = q[(Ug + 4) >> 2]),
                                      (Yg = u[(_g + ((Xg + q[(Ug + 12) >> 2]) << 2)) >> 2]),
                                      (Wg =
                                        (j(
                                          x(
                                            dh - 1
                                              ? x(u[(Ug + 44) >> 2] * x(Yg * u[(Ug + 20) >> 2])) +
                                                  (f(0, Wg), k())
                                              : x(
                                                  u[(Ug + 44) >> 2] *
                                                    x(
                                                      x(Yg * u[(Ug + 20) >> 2]) +
                                                        x(
                                                          u[
                                                            (_g +
                                                              ((Xg + q[(Ug + 16) >> 2]) << 2)) >>
                                                              2
                                                          ] * u[(Ug + 24) >> 2]
                                                        )
                                                    )
                                                ) + (f(0, Wg), k())
                                          )
                                        ),
                                        b[0])))
                                    : ((q[(48 + $g) >> 2] = Xg), Y(4, 1024, (48 + $g) | 0))),
                                !((Ug = (Ug + 48) | 0) >>> 0 < gh >>> 0))
                              )
                                break;
                          if (((q[ch >> 2] = Wg), !((Vg = (Vg + 12) | 0) >>> 0 < ah >>> 0))) break;
                        }
                        if (
                          ((Vg = q[(a + 720) >> 2]),
                          (Ug = q[(a + 716) >> 2]),
                          (Wg = Vg),
                          !((0 | Ug) < 1))
                        ) {
                          for (
                            ah = (w(Ug, 12) + Vg) | 0,
                              bh = q[(a + 272) >> 2],
                              _g = q[(q[(q[a >> 2] + 8) >> 2] + 316) >> 2];
                            ;

                          ) {
                            if (
                              ((ch = (bh + (q[Vg >> 2] << 2)) | 0),
                              (Wg = q[ch >> 2]),
                              1 <= (0 | (Xg = q[(Vg + 4) >> 2])))
                            )
                              for (Ug = q[(Vg + 8) >> 2], gh = (Ug + w(Xg, 48)) | 0; ; )
                                if (
                                  ((Xg = q[(Ug + 8) >> 2]) &&
                                    ((dh = (Xg + -1) | 0) >>> 0 <= 1
                                      ? ((Xg = q[(Ug + 4) >> 2]),
                                        (Yg = u[(_g + ((Xg + q[(Ug + 12) >> 2]) << 2)) >> 2]),
                                        (Wg =
                                          (j(
                                            x(
                                              dh - 1
                                                ? x(u[(Ug + 44) >> 2] * x(Yg * u[(Ug + 20) >> 2])) +
                                                    (f(0, Wg), k())
                                                : x(
                                                    u[(Ug + 44) >> 2] *
                                                      x(
                                                        x(Yg * u[(Ug + 20) >> 2]) +
                                                          x(
                                                            u[
                                                              (_g +
                                                                ((Xg + q[(Ug + 16) >> 2]) << 2)) >>
                                                                2
                                                            ] * u[(Ug + 24) >> 2]
                                                          )
                                                      )
                                                  ) + (f(0, Wg), k())
                                            )
                                          ),
                                          b[0])))
                                      : ((q[(32 + $g) >> 2] = Xg), Y(4, 1024, (32 + $g) | 0))),
                                  !((Ug = (Ug + 48) | 0) >>> 0 < gh >>> 0))
                                )
                                  break;
                            if (
                              (f(0, Wg),
                              (Yg = k()),
                              (u[ch >> 2] = Yg < x(0) ? x(0) : x(A(Yg, x(1)))),
                              !((Vg = (Vg + 12) | 0) >>> 0 < ah >>> 0))
                            )
                              break;
                          }
                          ((Ug = q[(a + 716) >> 2]), (Wg = q[(a + 720) >> 2]));
                        }
                      }
                    }
                    if (
                      (ea(
                        Ug,
                        Wg,
                        fh,
                        q[(Zg + 608) >> 2],
                        q[(Zg + 612) >> 2],
                        q[(Zg + 616) >> 2],
                        q[(a + 300) >> 2]
                      ),
                      ea(
                        q[(a + 716) >> 2],
                        q[(a + 720) >> 2],
                        eh,
                        q[(Zg + 620) >> 2],
                        q[(Zg + 624) >> 2],
                        q[(Zg + 628) >> 2],
                        q[(a + 304) >> 2]
                      ),
                      !((0 | (Ug = q[(a + 716) >> 2])) < 1))
                    ) {
                      for (
                        Vg = q[(a + 720) >> 2],
                          Xg = (Vg + w(Ug, 12)) | 0,
                          eh = q[(a + 288) >> 2],
                          Zg = q[(q[(q[a >> 2] + 8) >> 2] + 320) >> 2];
                        ;

                      ) {
                        if (
                          ((fh = (eh + (q[Vg >> 2] << 2)) | 0),
                          (Wg = q[fh >> 2]),
                          1 <= (0 | (_g = q[(Vg + 4) >> 2])))
                        )
                          for (Ug = q[(Vg + 8) >> 2], ah = (Ug + w(_g, 48)) | 0; ; )
                            if (
                              ((_g = q[(Ug + 8) >> 2]) &&
                                ((bh = (_g + -1) | 0) >>> 0 <= 1
                                  ? ((_g = q[(Ug + 4) >> 2]),
                                    (Yg = u[(Zg + ((_g + q[(Ug + 12) >> 2]) << 2)) >> 2]),
                                    (Wg =
                                      (j(
                                        x(
                                          bh - 1
                                            ? x(u[(Ug + 44) >> 2] * x(Yg * u[(Ug + 20) >> 2])) +
                                                (f(0, Wg), k())
                                            : x(
                                                u[(Ug + 44) >> 2] *
                                                  x(
                                                    x(Yg * u[(Ug + 20) >> 2]) +
                                                      x(
                                                        u[
                                                          (Zg + ((_g + q[(Ug + 16) >> 2]) << 2)) >>
                                                            2
                                                        ] * u[(Ug + 24) >> 2]
                                                      )
                                                  )
                                              ) + (f(0, Wg), k())
                                        )
                                      ),
                                      b[0])))
                                  : ((q[(16 + $g) >> 2] = _g), Y(4, 1024, (16 + $g) | 0))),
                              !((Ug = (Ug + 48) | 0) >>> 0 < ah >>> 0))
                            )
                              break;
                        if (
                          (f(0, Wg),
                          (Yg = k()),
                          (u[fh >> 2] = Yg < x(-3600) ? x(-3600) : x(A(Yg, x(3600)))),
                          !((Vg = (Vg + 12) | 0) >>> 0 < Xg >>> 0))
                        )
                          break;
                      }
                      if (!((0 | (Ug = q[(a + 716) >> 2])) < 1))
                        for (
                          Vg = q[(a + 720) >> 2],
                            _g = (Vg + w(Ug, 12)) | 0,
                            Xg = q[(a + 276) >> 2],
                            a = q[(q[(q[a >> 2] + 8) >> 2] + 332) >> 2];
                          ;

                        ) {
                          if (
                            ((eh = (Xg + (q[Vg >> 2] << 2)) | 0),
                            (Wg = q[eh >> 2]),
                            1 <= (0 | (Zg = q[(Vg + 4) >> 2])))
                          )
                            for (Ug = q[(Vg + 8) >> 2], fh = (Ug + w(Zg, 48)) | 0; ; )
                              if (
                                ((Zg = q[(Ug + 8) >> 2]) &&
                                  ((ah = (Zg + -1) | 0) >>> 0 <= 1
                                    ? ((Zg = q[(Ug + 4) >> 2]),
                                      (Yg = u[(a + ((Zg + q[(Ug + 12) >> 2]) << 2)) >> 2]),
                                      (Wg =
                                        (j(
                                          x(
                                            ah - 1
                                              ? x(u[(Ug + 44) >> 2] * x(Yg * u[(Ug + 20) >> 2])) +
                                                  (f(0, Wg), k())
                                              : x(
                                                  u[(Ug + 44) >> 2] *
                                                    x(
                                                      x(Yg * u[(Ug + 20) >> 2]) +
                                                        x(
                                                          u[
                                                            (a + ((Zg + q[(Ug + 16) >> 2]) << 2)) >>
                                                              2
                                                          ] * u[(Ug + 24) >> 2]
                                                        )
                                                    )
                                                ) + (f(0, Wg), k())
                                          )
                                        ),
                                        b[0])))
                                    : ((q[$g >> 2] = Zg), Y(4, 1024, $g))),
                                !((Ug = (Ug + 48) | 0) >>> 0 < fh >>> 0))
                              )
                                break;
                          if (
                            (f(0, Wg),
                            (Yg = k()),
                            (u[eh >> 2] =
                              Yg < x(9999999747378752e-20)
                                ? x(9999999747378752e-20)
                                : x(A(Yg, x(100)))),
                            !((Vg = (Vg + 12) | 0) >>> 0 < _g >>> 0))
                          )
                            break;
                        }
                    }
                  }
                  L = (80 + $g) | 0;
                })(a),
                (function (a) {
                  var ug = 0,
                    vg = 0,
                    wg = 0,
                    xg = 0,
                    yg = x(0),
                    zg = 0,
                    Ag = 0,
                    Bg = 0,
                    Cg = 0,
                    Dg = 0,
                    Eg = 0,
                    Fg = 0,
                    Gg = x(0),
                    Hg = 0,
                    Ig = 0,
                    Jg = 0;
                  ((L = Ag = (L - 32) | 0), (vg = q[a >> 2]));
                  if (
                    !(
                      r[(q[vg >> 2] + 4) | 0] < 4 ||
                      ((vg = q[(vg + 8) >> 2]),
                      ua(
                        a,
                        q[(a + 724) >> 2],
                        q[(a + 728) >> 2],
                        q[(vg + 360) >> 2],
                        q[(a + 448) >> 2],
                        q[(vg + 208) >> 2]
                      ),
                      (vg = q[a >> 2]),
                      r[(q[vg >> 2] + 4) | 0] < 5)
                    )
                  ) {
                    if (
                      ((zg = q[(vg + 8) >> 2]),
                      (Ig = q[(zg + 368) >> 2]),
                      (Jg = q[(zg + 364) >> 2]),
                      (xg = q[(a + 728) >> 2]),
                      (ug = q[(a + 724) >> 2]),
                      (vg = xg),
                      !((0 | ug) < 1))
                    ) {
                      for (
                        Eg = (w(ug, 12) + xg) | 0, Fg = q[(a + 444) >> 2], Bg = q[(zg + 356) >> 2];
                        ;

                      ) {
                        if (
                          ((vg = (Fg + (q[xg >> 2] << 2)) | 0),
                          (yg = x(q[vg >> 2])),
                          1 <= (0 | (wg = q[(xg + 4) >> 2])))
                        )
                          for (ug = q[(xg + 8) >> 2], Cg = (ug + w(wg, 48)) | 0; ; )
                            if (
                              ((wg = q[(ug + 8) >> 2]) &&
                                ((Dg = (wg + -1) | 0) >>> 0 <= 1
                                  ? ((wg = q[(ug + 4) >> 2]),
                                    (Gg = u[(Bg + ((wg + q[(ug + 12) >> 2]) << 2)) >> 2]),
                                    (yg = x(
                                      Dg - 1
                                        ? yg + x(u[(ug + 44) >> 2] * x(Gg * u[(ug + 20) >> 2]))
                                        : yg +
                                            x(
                                              u[(ug + 44) >> 2] *
                                                x(
                                                  x(Gg * u[(ug + 20) >> 2]) +
                                                    x(
                                                      u[
                                                        (Bg + ((wg + q[(ug + 16) >> 2]) << 2)) >> 2
                                                      ] * u[(ug + 24) >> 2]
                                                    )
                                                )
                                            )
                                    )))
                                  : ((q[(16 + Ag) >> 2] = wg), Y(4, 1024, (16 + Ag) | 0))),
                              !((ug = (ug + 48) | 0) >>> 0 < Cg >>> 0))
                            )
                              break;
                        if (
                          ((yg =
                            (yg = x(yg + x(0.0010000000474974513))) < x(0)
                              ? x(0)
                              : x(A(yg, x(1e3)))),
                          (ug = x(y(yg)) < x(2147483648) ? ~~yg : -2147483648),
                          (q[vg >> 2] = ug),
                          !((xg = (xg + 12) | 0) >>> 0 < Eg >>> 0))
                        )
                          break;
                      }
                      if (
                        ((xg = q[(a + 728) >> 2]),
                        (ug = q[(a + 724) >> 2]),
                        (vg = xg),
                        !((0 | ug) < 1))
                      ) {
                        for (
                          Eg = (w(ug, 12) + xg) | 0,
                            Fg = q[(a + 452) >> 2],
                            Bg = q[(q[(q[a >> 2] + 8) >> 2] + 352) >> 2];
                          ;

                        ) {
                          if (
                            ((Cg = (Fg + (q[xg >> 2] << 2)) | 0),
                            (vg = q[Cg >> 2]),
                            1 <= (0 | (wg = q[(xg + 4) >> 2])))
                          )
                            for (ug = q[(xg + 8) >> 2], Dg = (ug + w(wg, 48)) | 0; ; )
                              if (
                                ((wg = q[(ug + 8) >> 2]) &&
                                  ((Hg = (wg + -1) | 0) >>> 0 <= 1
                                    ? ((wg = q[(ug + 4) >> 2]),
                                      (yg = u[(Bg + ((wg + q[(ug + 12) >> 2]) << 2)) >> 2]),
                                      (vg =
                                        (j(
                                          x(
                                            Hg - 1
                                              ? x(u[(ug + 44) >> 2] * x(yg * u[(ug + 20) >> 2])) +
                                                  (f(0, vg), k())
                                              : x(
                                                  u[(ug + 44) >> 2] *
                                                    x(
                                                      x(yg * u[(ug + 20) >> 2]) +
                                                        x(
                                                          u[
                                                            (Bg +
                                                              ((wg + q[(ug + 16) >> 2]) << 2)) >>
                                                              2
                                                          ] * u[(ug + 24) >> 2]
                                                        )
                                                    )
                                                ) + (f(0, vg), k())
                                          )
                                        ),
                                        b[0])))
                                    : ((q[Ag >> 2] = wg), Y(4, 1024, Ag))),
                                !((ug = (ug + 48) | 0) >>> 0 < Dg >>> 0))
                              )
                                break;
                          if (
                            (f(0, vg),
                            (yg = k()),
                            (u[Cg >> 2] = yg < x(0) ? x(0) : x(A(yg, x(1)))),
                            !((xg = (xg + 12) | 0) >>> 0 < Eg >>> 0))
                          )
                            break;
                        }
                        ((ug = q[(a + 724) >> 2]), (vg = q[(a + 728) >> 2]));
                      }
                    }
                    (ea(
                      ug,
                      vg,
                      Jg,
                      q[(zg + 608) >> 2],
                      q[(zg + 612) >> 2],
                      q[(zg + 616) >> 2],
                      q[(a + 456) >> 2]
                    ),
                      ea(
                        q[(a + 724) >> 2],
                        q[(a + 728) >> 2],
                        Ig,
                        q[(zg + 620) >> 2],
                        q[(zg + 624) >> 2],
                        q[(zg + 628) >> 2],
                        q[(a + 460) >> 2]
                      ));
                  }
                  L = (32 + Ag) | 0;
                })(a),
                (function (a) {
                  var Vf = 0,
                    Wf = 0,
                    Xf = 0,
                    Yf = 0,
                    Zf = x(0),
                    _f = 0,
                    $f = 0,
                    ag = 0,
                    bg = 0,
                    cg = 0,
                    dg = 0;
                  ((L = _f = (L - 16) | 0), (Wf = q[a >> 2]));
                  if (!(r[(q[Wf >> 2] + 4) | 0] < 5 || (0 | (Yf = q[(a + 732) >> 2])) < 1))
                    for (
                      Xf = q[(a + 736) >> 2],
                        bg = (Xf + w(Yf, 12)) | 0,
                        cg = q[(a + 540) >> 2],
                        Yf = q[(q[(Wf + 8) >> 2] + 604) >> 2];
                      ;

                    ) {
                      if (
                        (($f = ((q[Xf >> 2] << 2) + cg) | 0),
                        (Wf = q[$f >> 2]),
                        1 <= (0 | (Vf = q[(Xf + 4) >> 2])))
                      )
                        for (a = q[(Xf + 8) >> 2], dg = (a + w(Vf, 48)) | 0; ; )
                          if (
                            ((Vf = q[(a + 8) >> 2]) &&
                              ((ag = (Vf + -1) | 0) >>> 0 <= 1
                                ? ((Vf = q[(a + 4) >> 2]),
                                  (Zf = u[(Yf + ((Vf + q[(a + 12) >> 2]) << 2)) >> 2]),
                                  (Wf =
                                    (j(
                                      x(
                                        ag - 1
                                          ? x(u[(a + 44) >> 2] * x(Zf * u[(a + 20) >> 2])) +
                                              (f(0, Wf), k())
                                          : x(
                                              u[(a + 44) >> 2] *
                                                x(
                                                  x(Zf * u[(a + 20) >> 2]) +
                                                    x(
                                                      u[
                                                        (Yf + ((Vf + q[(a + 16) >> 2]) << 2)) >> 2
                                                      ] * u[(a + 24) >> 2]
                                                    )
                                                )
                                            ) + (f(0, Wf), k())
                                      )
                                    ),
                                    b[0])))
                                : ((q[_f >> 2] = Vf), Y(4, 1024, _f))),
                            !((a = (a + 48) | 0) >>> 0 < dg >>> 0))
                          )
                            break;
                      if (
                        (f(0, Wf),
                        (Zf = k()),
                        (u[$f >> 2] = Zf < x(0) ? x(0) : x(A(Zf, x(1)))),
                        !((Xf = (Xf + 12) | 0) >>> 0 < bg >>> 0))
                      )
                        break;
                    }
                  L = (16 + _f) | 0;
                })(a),
                (function (a) {
                  var Oe = 0,
                    df = 0,
                    ef = 0,
                    ff = 0,
                    gf = 0,
                    hf = x(0),
                    jf = 0,
                    kf = 0,
                    lf = 0,
                    mf = 0,
                    nf = 0,
                    of = 0,
                    pf = 0,
                    qf = 0,
                    rf = 0;
                  if (((L = jf = (L - 16) | 0), (Oe = q[a >> 2]), 6 <= r[(q[Oe >> 2] + 4) | 0])) {
                    if (
                      ((df = q[(a + 744) >> 2]),
                      (ef = q[(Oe + 8) >> 2]),
                      (nf = q[(ef + 664) >> 2]),
                      (of = q[(ef + 660) >> 2]),
                      1 <= (0 | (Oe = q[(a + 740) >> 2])))
                    ) {
                      for (
                        pf = (w(Oe, 12) + df) | 0, qf = q[(a + 632) >> 2], kf = q[(ef + 656) >> 2];
                        ;

                      ) {
                        if (
                          ((lf = ((q[df >> 2] << 2) + qf) | 0),
                          (gf = q[lf >> 2]),
                          1 <= (0 | (ff = q[(df + 4) >> 2])))
                        )
                          for (Oe = q[(df + 8) >> 2], rf = (Oe + w(ff, 48)) | 0; ; )
                            if (
                              ((ff = q[(Oe + 8) >> 2]) &&
                                ((mf = (ff + -1) | 0) >>> 0 <= 1
                                  ? ((ff = q[(Oe + 4) >> 2]),
                                    (hf = u[(((ff + q[(Oe + 12) >> 2]) << 2) + kf) >> 2]),
                                    (gf =
                                      (j(
                                        x(
                                          mf - 1
                                            ? x(u[(Oe + 44) >> 2] * x(hf * u[(Oe + 20) >> 2])) +
                                                (f(0, gf), k())
                                            : x(
                                                u[(Oe + 44) >> 2] *
                                                  x(
                                                    x(hf * u[(Oe + 20) >> 2]) +
                                                      x(
                                                        u[
                                                          (((ff + q[(Oe + 16) >> 2]) << 2) + kf) >>
                                                            2
                                                        ] * u[(Oe + 24) >> 2]
                                                      )
                                                  )
                                              ) + (f(0, gf), k())
                                        )
                                      ),
                                      b[0])))
                                  : ((q[jf >> 2] = ff), Y(4, 1024, jf))),
                              !((Oe = (Oe + 48) | 0) >>> 0 < rf >>> 0))
                            )
                              break;
                        if (
                          (f(0, gf),
                          (hf = k()),
                          (u[lf >> 2] = hf < x(0) ? x(0) : x(A(hf, x(1)))),
                          !((df = (df + 12) | 0) >>> 0 < pf >>> 0))
                        )
                          break;
                      }
                      ((df = q[(a + 744) >> 2]), (Oe = q[(a + 740) >> 2]));
                    }
                    (ea(
                      Oe,
                      df,
                      of,
                      q[(ef + 608) >> 2],
                      q[(ef + 612) >> 2],
                      q[(ef + 616) >> 2],
                      q[(a + 636) >> 2]
                    ),
                      ea(
                        q[(a + 740) >> 2],
                        q[(a + 744) >> 2],
                        nf,
                        q[(ef + 620) >> 2],
                        q[(ef + 624) >> 2],
                        q[(ef + 628) >> 2],
                        q[(a + 640) >> 2]
                      ));
                  }
                  L = (16 + jf) | 0;
                })(a),
                (function (a) {
                  var Ke = 0,
                    Le = 0,
                    Me = 0,
                    Ne = 0;
                  if (1 <= (0 | (Ne = q[(a + 308) >> 2])))
                    for (Ke = q[(a + 312) >> 2], Le = q[(a + 316) >> 2]; ; )
                      if (
                        (q[Le >> 2] && n[q[(Ke + 20) >> 2]](a, Me),
                        (Le = (Le + 4) | 0),
                        (Ke = (Ke + 32) | 0),
                        (0 | Ne) == (0 | (Me = (Me + 1) | 0)))
                      )
                        break;
                })(a),
                (function (a) {
                  var oe = 0,
                    pe = 0,
                    qe = 0,
                    re = 0,
                    se = 0,
                    te = 0,
                    ue = 0,
                    ve = 0,
                    we = 0;
                  if (1 <= (0 | (oe = q[(a + 336) >> 2])))
                    for (
                      pe = q[(a + 340) >> 2],
                        ue = (pe + w(oe, 20)) | 0,
                        ve = q[(a + 312) >> 2],
                        we = q[(a + 320) >> 2],
                        re = q[(a + 428) >> 2],
                        oe = q[(a + 452) >> 2],
                        se = q[(a + 448) >> 2];
                      ;

                    )
                      if (
                        (q[re >> 2] &&
                          -1 != (0 | (qe = q[(pe + 8) >> 2])) &&
                          ((u[oe >> 2] = u[((qe << 2) + we) >> 2] * u[oe >> 2]),
                          (te = q[se >> 2]),
                          n[q[(24 + (((qe << 5) + ve) | 0)) >> 2]](
                            a,
                            qe,
                            te,
                            te,
                            q[(pe + 16) >> 2]
                          )),
                        (se = (se + 4) | 0),
                        (oe = (oe + 4) | 0),
                        (re = (re + 4) | 0),
                        !((pe = (pe + 20) | 0) >>> 0 < ue >>> 0))
                      )
                        break;
                })(a),
                (function (a) {
                  var sf = 0,
                    Ef = 0,
                    Ff = 0,
                    Gf = x(0),
                    Hf = 0,
                    If = 0,
                    Jf = 0,
                    Kf = 0,
                    Lf = 0,
                    Mf = 0;
                  if (1 <= (0 | (Ef = q[(a + 4) >> 2])))
                    for (
                      Ff = q[(a + 8) >> 2],
                        Mf = (Ff + w(Ef, 12)) | 0,
                        Hf = q[(a + 40) >> 2],
                        If = q[(a + 52) >> 2],
                        Kf = q[(a + 48) >> 2],
                        Ef = Kf,
                        Lf = q[(a + 56) >> 2],
                        Jf = Lf;
                      ;

                    )
                      if (
                        (q[Hf >> 2] &&
                          ((Gf = u[If >> 2]),
                          (u[Ef >> 2] = Gf),
                          -1 != (0 | (sf = q[(Ff + 4) >> 2])) &&
                            -1 == q[((sf <<= 2) + Lf) >> 2] &&
                            ((Gf = x(Gf * u[(sf + Kf) >> 2])), (u[Ef >> 2] = Gf)),
                          -1 != (0 | (sf = q[Jf >> 2]))) &&
                          ((sf = (q[(a + 632) >> 2] + (sf << 2)) | 0),
                          (u[sf >> 2] = Gf * u[sf >> 2])),
                        (Ef = (Ef + 4) | 0),
                        (Jf = (Jf + 4) | 0),
                        (If = (If + 4) | 0),
                        (Hf = (Hf + 4) | 0),
                        !((Ff = (Ff + 12) | 0) >>> 0 < Mf >>> 0))
                      )
                        break;
                })(a),
                (function (a) {
                  var xe = x(0),
                    ye = 0,
                    ze = 0,
                    Ae = x(0),
                    Be = x(0),
                    Ce = 0,
                    De = 0,
                    Ee = 0,
                    Fe = 0,
                    Ge = 0,
                    He = 0,
                    Ie = 0,
                    Je = 0;
                  if (
                    ((Ce = q[(a + 340) >> 2]),
                    (Ee = q[(a + 336) >> 2]),
                    (Ie = (Ce + w(Ee, 20)) | 0),
                    (Ge = q[(a + 428) >> 2]),
                    1 <= (0 | Ee))
                  )
                    for (
                      He = q[(a + 56) >> 2],
                        Je = q[(a + 48) >> 2],
                        De = q[(a + 452) >> 2],
                        ye = Ce,
                        ze = Ge;
                      ;

                    )
                      if (
                        (q[ze >> 2] &&
                          -1 != (0 | (Fe = q[(ye + 4) >> 2])) &&
                          -1 == q[((Fe <<= 2) + He) >> 2] &&
                          (u[De >> 2] = u[(Fe + Je) >> 2] * u[De >> 2]),
                        (De = (De + 4) | 0),
                        (ze = (ze + 4) | 0),
                        !((ye = (ye + 20) | 0) >>> 0 < Ie >>> 0))
                      )
                        break;
                  if (!(((0 | Ee) < 1) | (r[(q[q[a >> 2] >> 2] + 4) | 0] < 4)))
                    for (
                      De = q[(a + 332) >> 2],
                        Ee = q[(a + 328) >> 2],
                        ze = q[(a + 456) >> 2],
                        ye = q[(a + 460) >> 2];
                      ;

                    )
                      if (
                        (q[Ge >> 2] &&
                          -1 != (0 | (a = q[(Ce + 8) >> 2])) &&
                          ((a = ((He = a << 4) + Ee) | 0),
                          (xe = x(u[ze >> 2] * u[a >> 2])),
                          (u[ze >> 2] = xe),
                          (Ae = x(u[(ze + 4) >> 2] * u[(a + 4) >> 2])),
                          (u[(ze + 4) >> 2] = Ae),
                          (Be = u[(a + 8) >> 2]),
                          (q[(ze + 12) >> 2] = 1065353216),
                          (u[(ze + 4) >> 2] = Ae < x(0) ? x(0) : x(A(Ae, x(1)))),
                          (u[ze >> 2] = xe < x(0) ? x(0) : x(A(xe, x(1)))),
                          (xe = x(Be * u[(ze + 8) >> 2])),
                          (u[(ze + 8) >> 2] = xe < x(0) ? x(0) : x(A(xe, x(1)))),
                          (xe = u[ye >> 2]),
                          (Ae = u[(a = (De + He) | 0) >> 2]),
                          (xe = x(x(xe + Ae) - x(xe * Ae))),
                          (u[ye >> 2] = xe),
                          (Ae = u[(ye + 4) >> 2]),
                          (Be = u[(a + 4) >> 2]),
                          (Ae = x(x(Ae + Be) - x(Ae * Be))),
                          (u[(ye + 4) >> 2] = Ae),
                          (Be = u[(a + 8) >> 2]),
                          (q[(ye + 12) >> 2] = 1065353216),
                          (u[(ye + 4) >> 2] = Ae < x(0) ? x(0) : x(A(Ae, x(1)))),
                          (u[ye >> 2] = xe < x(0) ? x(0) : x(A(xe, x(1)))),
                          (xe = u[(ye + 8) >> 2]),
                          (xe = x(x(Be + xe) - x(xe * Be))),
                          (u[(ye + 8) >> 2] = xe < x(0) ? x(0) : x(A(xe, x(1))))),
                        (ye = (ye + 16) | 0),
                        (ze = (ze + 16) | 0),
                        (Ge = (Ge + 4) | 0),
                        !((Ce = (Ce + 20) | 0) >>> 0 < Ie >>> 0))
                      )
                        break;
                })(a),
                (function (a) {
                  var pq = 0,
                    qq = 0,
                    rq = 0,
                    sq = x(0),
                    tq = x(0),
                    uq = x(0),
                    vq = x(0),
                    wq = x(0),
                    xq = 0,
                    yq = 0,
                    zq = 0,
                    Aq = 0,
                    Bq = 0,
                    Cq = 0,
                    Dq = 0,
                    Eq = x(0),
                    Fq = 0,
                    Gq = 0,
                    Hq = x(0),
                    Iq = 0,
                    Jq = 0;
                  if (1 <= (0 | (xq = q[(a + 504) >> 2])))
                    for (
                      Iq = q[(a + 540) >> 2], yq = q[(a + 448) >> 2], Jq = q[(a + 508) >> 2];
                      ;

                    ) {
                      if (((a = (w(rq, 24) + Jq) | 0), 0 < (0 | (zq = q[(a + 12) >> 2]))))
                        for (
                          sq = u[((rq << 2) + Iq) >> 2],
                            Aq = q[(a + 20) >> 2],
                            Bq = q[(a + 16) >> 2],
                            Cq = q[((q[(a + 4) >> 2] << 2) + yq) >> 2],
                            Dq = q[((q[(a + 8) >> 2] << 2) + yq) >> 2],
                            a = 0;
                          ;

                        )
                          if (
                            ((Eq = u[(((pq = 1 | a) << 2) + Bq) >> 2]),
                            (qq = (s[((a << 1) + Aq) >> 1] << 3) & 262136),
                            (tq = u[(Fq = ((4 | qq) + Cq) | 0) >> 2]),
                            (pq = (s[((pq << 1) + Aq) >> 1] << 3) & 262136),
                            (uq = u[(Gq = ((4 | pq) + Dq) | 0) >> 2]),
                            (vq = u[(qq = (qq + Cq) | 0) >> 2]),
                            (Hq = u[((a << 2) + Bq) >> 2]),
                            (wq = u[(pq = (pq + Dq) | 0) >> 2]),
                            (u[qq >> 2] = vq + x(sq * x(Hq * x(wq - vq)))),
                            (u[Fq >> 2] = tq + x(sq * x(Hq * x(uq - tq)))),
                            (u[pq >> 2] = wq + x(sq * x(Eq * x(vq - wq)))),
                            (u[Gq >> 2] = uq + x(sq * x(Eq * x(tq - uq)))),
                            !((0 | (a = (a + 2) | 0)) < (0 | zq)))
                          )
                            break;
                      if (!((0 | (rq = (rq + 1) | 0)) < (0 | xq))) break;
                    }
                })(a),
                n[q[1902]](a),
                (function (a) {
                  var ym = 0,
                    zm = 0,
                    Am = 0,
                    Bm = 0,
                    Cm = 0,
                    Dm = 0,
                    Em = 0,
                    Fm = 0,
                    Gm = 0,
                    Hm = 0,
                    Im = 0,
                    Jm = 0,
                    Km = 0,
                    Lm = 0,
                    Mm = 0,
                    Nm = 0;
                  if (!((0 | (Km = q[(a + 484) >> 2])) < 1)) {
                    for (
                      Im = q[(a + 488) >> 2],
                        Dm = (Im + w(Km, 28)) | 0,
                        Fm = q[(a + 428) >> 2],
                        Jm = q[(a + 40) >> 2],
                        Gm = q[(a + 44) >> 2],
                        Hm = q[(a + 444) >> 2],
                        Am = Im;
                      ;

                    ) {
                      if (1 <= (0 | (Bm = q[(Am + 4) >> 2])))
                        for (Lm = (Am + 20) | 0, Mm = q[(Am + 12) >> 2], zm = 0; ; )
                          if (
                            ((Cm = q[((ym = (Mm + (zm << 4)) | 0) + 4) >> 2] << 2),
                            (ym = 1 == q[(Em = ym) >> 2]),
                            (q[(Em + 12) >> 2] =
                              q[
                                (q[(Cm + (ym ? Jm : Fm)) >> 2] ? (Cm + (ym ? Gm : Hm)) | 0 : Lm) >>
                                  2
                              ]),
                            !((0 | (zm = (zm + 1) | 0)) < (0 | Bm)))
                          )
                            break;
                      if (!((Am = (Am + 28) | 0) >>> 0 < Dm >>> 0)) break;
                    }
                    if (!((0 | Km) < 1))
                      for (
                        Jm = q[(a + 756) >> 2],
                          Gm = 0,
                          Lm = q[a >> 2],
                          Mm = r[(q[Lm >> 2] + 4) | 0] < 6;
                        ;

                      ) {
                        if (((Cm = (w(Gm, 28) + Im) | 0), !(q[((Fm = Cm) + 24) >> 2] < 1))) {
                          for (Am = q[(a + 492) >> 2], zm = 0; ; )
                            if (
                              ((q[(Am + (zm << 2)) >> 2] = -1),
                              (zm = (zm + 1) | 0),
                              (ym = q[(Fm + 24) >> 2]),
                              !((0 | zm) < (0 | ym)))
                            )
                              break;
                          if (!((0 | ym) < 1))
                            for (Am = q[(a + 500) >> 2], zm = 0; ; )
                              if (
                                ((q[(Am + (zm << 2)) >> 2] = -1),
                                !((0 | (zm = (zm + 1) | 0)) < q[(Fm + 24) >> 2]))
                              )
                                break;
                        }
                        if (!(q[(Cm + 4) >> 2] < 1)) {
                          for (Am = q[(a + 496) >> 2], zm = 0; ; )
                            if (
                              ((q[(Am + (zm << 2)) >> 2] = -1),
                              (zm = (zm + 1) | 0),
                              (ym = q[(Cm + 4) >> 2]),
                              !((0 | zm) < (0 | ym)))
                            )
                              break;
                          if (!((0 | ym) < 1))
                            for (Dm = q[(Cm + 12) >> 2], Hm = q[(a + 500) >> 2], zm = 0; ; )
                              if (
                                ((ym =
                                  (q[(12 + ((Dm + (zm << 4)) | 0)) >> 2] - q[(Cm + 20) >> 2]) << 2),
                                (Em = q[(Bm = (ym + Hm) | 0) >> 2]),
                                (ym =
                                  -1 == (0 | Em)
                                    ? (ym + q[(a + 492) >> 2]) | 0
                                    : (Am + (Em << 2)) | 0),
                                (q[ym >> 2] = zm),
                                !((0 | (zm = ((q[Bm >> 2] = zm) + 1) | 0)) < q[(Cm + 4) >> 2]))
                              )
                                break;
                        }
                        ym = q[(Fm + 24) >> 2];
                        e: if (!((0 | ym) < 1)) {
                          if (((zm = q[(Cm + 8) >> 2]), (Hm = q[(a + 492) >> 2]), (Dm = 0), !Mm))
                            for (;;) {
                              if (-1 != (0 | (Am = q[(Hm + (Dm << 2)) >> 2]))) {
                                for (Em = q[(a + 496) >> 2], Nm = q[(Cm + 12) >> 2]; ; )
                                  if (
                                    ((Bm = q[((ym = ((Am << 4) + Nm) | 0) + 4) >> 2]),
                                    (zm =
                                      1 != q[ym >> 2]
                                        ? ((q[(Jm + (Bm << 2)) >> 2] = zm) + 1) | 0
                                        : (-1 !=
                                            (0 |
                                              (Bm =
                                                q[
                                                  (q[(q[(Lm + 8) >> 2] + 52) >> 2] + (Bm << 2)) >> 2
                                                ])) &&
                                            (zm =
                                              ((q[
                                                (((Jm + (q[(a + 336) >> 2] << 2)) | 0) +
                                                  (Bm << 2)) >>
                                                  2
                                              ] = zm) +
                                                1) |
                                              0),
                                          (ym = (w(q[(ym + 8) >> 2], 28) + Im) | 0),
                                          (q[(ym + 8) >> 2] = zm),
                                          (q[ym >> 2] + zm) | 0)),
                                    (ym = q[(Em + (Am << 2)) >> 2]),
                                    !((0 | Am) < (0 | ym) && -1 != (0 | (Am = ym))))
                                  )
                                    break;
                                ym = q[(Fm + 24) >> 2];
                              }
                              if (!((0 | (Dm = (Dm + 1) | 0)) < (0 | ym))) break e;
                            }
                          for (;;) {
                            Am = q[(Hm + (Dm << 2)) >> 2];
                            g: if (-1 != (0 | Am))
                              for (Bm = q[(a + 496) >> 2], Em = q[(Cm + 12) >> 2]; ; ) {
                                if (
                                  ((zm =
                                    1 != q[(ym = (Em + (Am << 4)) | 0) >> 2]
                                      ? ((q[(Jm + (q[(ym + 4) >> 2] << 2)) >> 2] = zm) + 1) | 0
                                      : ((ym = (w(q[(ym + 8) >> 2], 28) + Im) | 0),
                                        (q[(ym + 8) >> 2] = zm),
                                        (q[ym >> 2] + zm) | 0)),
                                  (0 | (ym = q[(Bm + (Am << 2)) >> 2])) <= (0 | Am))
                                )
                                  break g;
                                if (-1 == (0 | (Am = ym))) break;
                              }
                            if (!((0 | (Dm = (Dm + 1) | 0)) < q[(Fm + 24) >> 2])) break;
                          }
                        }
                        if ((0 | Km) == (0 | (Gm = (Gm + 1) | 0))) break;
                      }
                  }
                })(a),
                (function (a) {
                  var ce = 0,
                    de = 0,
                    ee = 0,
                    fe = 0,
                    ge = 0,
                    he = 0,
                    ie = x(0),
                    je = 0,
                    ke = 0,
                    le = 0;
                  ge = q[(a + 336) >> 2];
                  if (q[(a + 760) >> 2]) {
                    if (!(((q[(a + 432) >> 2] = 0) | ge) < 1))
                      for (;;)
                        if (
                          ((ce = 126),
                          (je = (q[(a + 436) >> 2] + ee) | 0),
                          !q[((de = ee << 2) + q[(a + 428) >> 2]) >> 2] |
                            (u[(de + q[(a + 452) >> 2]) >> 2] == x(0)) || (ce = 127),
                          (o[0 | je] = ce),
                          (0 | ge) == (0 | (ee = (ee + 1) | 0)))
                        )
                          break;
                  } else if (q[(a + 432) >> 2]) {
                    if (
                      ((ke = q[(a + 756) >> 2]),
                      (ce = r[(q[q[a >> 2] >> 2] + 4) | 0]),
                      !(((q[(a + 432) >> 2] = 0) | ge) < 1))
                    )
                      if (4 <= ce >>> 0) {
                        for (;;)
                          if (
                            ((ie = u[((ce = ee << 2) + q[(a + 452) >> 2]) >> 2]),
                            (fe = q[(ce + q[(a + 428) >> 2]) >> 2]),
                            (de = (ie != x(0)) & (0 != (0 | fe))),
                            (je = (q[(a + 436) >> 2] + ee) | 0),
                            (de = (0 | de) == (1 & o[0 | je]) ? de : 2 | de),
                            (de = ie != u[(ce + q[(a + 472) >> 2]) >> 2] ? 4 | de : de),
                            (de =
                              q[(ce + q[(a + 444) >> 2]) >> 2] == q[(ce + q[(a + 468) >> 2]) >> 2]
                                ? de
                                : 8 | de),
                            (ce =
                              q[(ce + ke) >> 2] == q[(ce + q[(a + 464) >> 2]) >> 2] ? de : 16 | de),
                            (ce = fe ? 32 | ce : ce),
                            (fe = ((de = le << 2) + q[(a + 456) >> 2]) | 0),
                            (he = (de + q[(a + 476) >> 2]) | 0),
                            ((u[fe >> 2] != u[he >> 2]) |
                              (u[(fe + 4) >> 2] != u[(he + 4) >> 2]) |
                              ((u[(fe + 8) >> 2] != u[(he + 8) >> 2]) |
                                (u[(fe + 12) >> 2] != u[(he + 12) >> 2])) ||
                              ((fe = (de + q[(a + 460) >> 2]) | 0),
                              (de = (de + q[(a + 480) >> 2]) | 0),
                              (u[fe >> 2] != u[de >> 2]) |
                                (u[(fe + 4) >> 2] != u[(de + 4) >> 2]) |
                                (u[(fe + 8) >> 2] != u[(de + 8) >> 2])) ||
                              u[(fe + 12) >> 2] != u[(de + 12) >> 2]) &&
                              (ce |= 64),
                            (o[0 | je] = ce),
                            (le = (le + 4) | 0),
                            (0 | ge) == (0 | (ee = (ee + 1) | 0)))
                          )
                            break;
                      } else
                        for (;;)
                          if (
                            ((ie = u[((ce = ee << 2) + q[(a + 452) >> 2]) >> 2]),
                            (fe = q[(ce + q[(a + 428) >> 2]) >> 2]),
                            (de = (ie != x(0)) & (0 != (0 | fe))),
                            (he = (q[(a + 436) >> 2] + ee) | 0),
                            (de = (0 | de) == (1 & o[0 | he]) ? de : 2 | de),
                            (de = ie != u[(ce + q[(a + 472) >> 2]) >> 2] ? 4 | de : de),
                            (de =
                              q[(ce + q[(a + 444) >> 2]) >> 2] == q[(ce + q[(a + 468) >> 2]) >> 2]
                                ? de
                                : 8 | de),
                            (ce =
                              q[(ce + ke) >> 2] == q[(ce + q[(a + 464) >> 2]) >> 2] ? de : 16 | de),
                            (o[0 | he] = fe ? 32 | ce : ce),
                            (0 | ge) == (0 | (ee = (ee + 1) | 0)))
                          )
                            break;
                  } else if (!((0 | ge) < 1))
                    for (;;)
                      if (
                        (!q[((ce = ee << 2) + q[(a + 428) >> 2]) >> 2] |
                        (u[(ce + q[(a + 452) >> 2]) >> 2] == x(0))
                          ? ((ce = (q[(a + 436) >> 2] + ee) | 0), (o[0 | ce] = 254 & r[0 | ce]))
                          : ((ce = (q[(a + 436) >> 2] + ee) | 0), (o[0 | ce] = 1 | r[0 | ce])),
                        (0 | ge) == (0 | (ee = (ee + 1) | 0)))
                      )
                        break;
                })(a),
                (q[(a + 760) >> 2] = 0));
            }
            function ab(a) {
              var Nf;
              (Ja((16 + (L = Nf = (L - 272) | 0)) | 0, 2295, (q[(12 + Nf) >> 2] = a)),
                (function (a) {
                  var xm = 0;
                  ((q[(L = xm = (L - 16) | 0) >> 2] = a),
                    (function (a, ok) {
                      var Ik = 0;
                      ((q[(12 + (L = Ik = (L - 16) | 0)) >> 2] = ok),
                        Ha(a, 1432, ok, 0, 0),
                        (L = (16 + Ik) | 0));
                    })(q[1062], xm),
                    (L = (16 + xm) | 0));
                })((16 + Nf) | 0),
                (L = (272 + Nf) | 0));
            }
            function Cc(a, ok, Ik, Jk) {
              var Pk,
                Mk,
                Kk = 0,
                Lk = 0,
                Nk = 0,
                Ok = 0;
              return (
                (L = Mk = (L - 32) | 0),
                (Kk = ((Ok = Kk = 2147483647 & Jk) + -1006698496) | 0),
                (Lk = Kk = (Pk = Lk = Nk = Ik) >>> 0 < 0 ? (Kk + 1) | 0 : Kk),
                (Kk = (Ok + -1140785152) | 0),
                (((0 | (Kk = Nk >>> 0 < 0 ? (Kk + 1) | 0 : Kk)) == (0 | Lk)) &
                  (Pk >>> 0 < Nk >>> 0)) |
                (Lk >>> 0 < Kk >>> 0)
                  ? ((Kk = (Jk << 4) | (Ik >>> 28)),
                    (Ik = (Ik << 4) | (ok >>> 28)),
                    ((134217728 == (0 | (Nk = ok &= 268435455))) & (1 <= a >>> 0)) |
                    (134217728 < ok >>> 0)
                      ? ((Kk = (Kk + 1073741824) | 0),
                        (a = (Ik + 1) | 0) >>> 0 < 1 && (Kk = (Kk + 1) | 0),
                        (Lk = a))
                      : ((Kk = (Kk - ((((Lk = Ik) >>> 0 < 0) + -1073741824) | 0)) | 0),
                        a | (134217728 ^ Nk) ||
                          ((a = (Lk + (1 & Lk)) | 0) >>> 0 < Lk >>> 0 && (Kk = (Kk + 1) | 0),
                          (Lk = a))))
                  : (
                        !Nk & (2147418112 == (0 | Ok))
                          ? !(a | ok)
                          : ((2147418112 == (0 | Ok)) & (Nk >>> 0 < 0)) | (Ok >>> 0 < 2147418112)
                      )
                    ? ((Kk = 2146435072),
                      ((1140785151 == ((Lk = 0) | Ok)) & (4294967295 < Nk >>> 0)) |
                        (1140785151 < Ok >>> 0) ||
                        (Nk = Ok >>> 16) >>> (Kk = 0) < 15249 ||
                        ((function (a, ok, Ik, Jk, Rk, Sk) {
                          var Xk = 0,
                            Yk = 0,
                            Zk = 0,
                            _k = 0;
                          a: if (64 & Sk)
                            ((ok = 31 & (Ik = (Sk + -64) | 0)),
                              (ok =
                                32 <= (63 & Ik) >>> 0
                                  ? ((Ik = 0), Rk >>> ok)
                                  : ((Ik = Rk >>> ok),
                                    ((((1 << ok) - 1) & Rk) << (32 - ok)) | (Jk >>> ok))),
                              (Rk = Jk = 0));
                          else {
                            if (!Sk) break a;
                            ((Yk = Rk),
                              (Zk = Jk),
                              (Xk = 31 & (_k = (64 - Sk) | 0)),
                              (_k =
                                32 <= (63 & _k) >>> 0
                                  ? ((Yk = Zk << Xk), 0)
                                  : ((Yk = (((1 << Xk) - 1) & (Zk >>> (32 - Xk))) | (Yk << Xk)),
                                    Zk << Xk)),
                              (Zk = ok),
                              (ok = 31 & (Xk = Sk)),
                              (ok =
                                32 <= (63 & Xk) >>> 0
                                  ? ((Xk = 0), Ik >>> ok)
                                  : ((Xk = Ik >>> ok),
                                    ((((1 << ok) - 1) & Ik) << (32 - ok)) | (Zk >>> ok))),
                              (ok |= _k),
                              (Ik = Xk | Yk),
                              (Xk = Jk),
                              (Jk = 31 & Sk),
                              (Jk =
                                32 <= (63 & Sk) >>> 0
                                  ? ((Yk = 0), Rk >>> Jk)
                                  : ((Yk = Rk >>> Jk),
                                    ((((1 << Jk) - 1) & Rk) << (32 - Jk)) | (Xk >>> Jk))),
                              (Rk = Yk));
                          }
                          ((q[a >> 2] = ok),
                            (q[(a + 4) >> 2] = Ik),
                            (q[(a + 8) >> 2] = Jk),
                            (q[(a + 12) >> 2] = Rk));
                        })(Mk, a, ok, Ik, (Kk = (65535 & Jk) | 65536), (15361 - Nk) | 0),
                        (function (a, ok, Ik, Jk, Rk, Sk) {
                          var Tk = 0,
                            Uk = 0,
                            Vk = 0,
                            Wk = 0;
                          64 & Sk
                            ? ((Jk = ok),
                              (ok = 31 & (Rk = (Sk + -64) | 0)),
                              32 <= (63 & Rk) >>> 0
                                ? ((Rk = Jk << ok), (Jk = 0))
                                : ((Rk = (((1 << ok) - 1) & (Jk >>> (32 - ok))) | (Ik << ok)),
                                  (Jk <<= ok)),
                              (Ik = ok = 0))
                            : Sk &&
                              ((Tk = Jk),
                              (Jk = 31 & (Vk = Sk)),
                              (Wk =
                                32 <= (63 & Sk) >>> 0
                                  ? ((Uk = Tk << Jk), 0)
                                  : ((Uk = (((1 << Jk) - 1) & (Tk >>> (32 - Jk))) | (Rk << Jk)),
                                    Tk << Jk)),
                              (Jk = Ik),
                              (Tk = ok),
                              (Rk = 31 & (Sk = (64 - Sk) | 0)),
                              32 <= (63 & Sk) >>> 0
                                ? ((Sk = 0), (Jk >>>= Rk))
                                : ((Sk = Jk >>> Rk),
                                  (Jk = ((((1 << Rk) - 1) & Jk) << (32 - Rk)) | (Tk >>> Rk))),
                              (Jk |= Wk),
                              (Rk = Sk | Uk),
                              (Sk = ok),
                              (ok = 31 & Vk),
                              (ok =
                                32 <= (63 & Vk) >>> 0
                                  ? ((Uk = Sk << ok), 0)
                                  : ((Uk = (((1 << ok) - 1) & (Sk >>> (32 - ok))) | (Ik << ok)),
                                    Sk << ok)),
                              (Ik = Uk));
                          ((q[a >> 2] = ok),
                            (q[(a + 4) >> 2] = Ik),
                            (q[(a + 8) >> 2] = Jk),
                            (q[(a + 12) >> 2] = Rk));
                        })((16 + Mk) | 0, a, ok, Ik, Kk, (Nk + -15233) | 0),
                        (Ik = q[(4 + Mk) >> 2]),
                        (a = q[(8 + Mk) >> 2]),
                        (Kk = (q[(12 + Mk) >> 2] << 4) | (a >>> 28)),
                        (Lk = (a << 4) | (Ik >>> 28)),
                        ((134217728 == (0 | (Ik = a = 268435455 & Ik))) &
                          (1 <=
                            (ok =
                              q[Mk >> 2] |
                              ((0 != (q[(16 + Mk) >> 2] | q[(24 + Mk) >> 2])) |
                                (0 != (q[(20 + Mk) >> 2] | q[(28 + Mk) >> 2])))) >>>
                              0)) |
                        (134217728 < a >>> 0)
                          ? ((a = (Lk + 1) | 0) >>> 0 < 1 && (Kk = (Kk + 1) | 0), (Lk = a))
                          : ok | (134217728 ^ Ik) ||
                            ((a = (Lk + (1 & Lk)) | 0) >>> 0 < Lk >>> 0 && (Kk = (Kk + 1) | 0),
                            (Lk = a))))
                    : ((Lk = (Ik << 4) | (ok >>> 28)),
                      (Kk = (524287 & (Kk = (Jk << 4) | (Ik >>> 28))) | 2146959360)),
                (L = (32 + Mk) | 0),
                f(0, 0 | Lk),
                f(1, (-2147483648 & Jk) | Kk),
                +g()
              );
            }
            function pd(a, Kq) {
              ((a = 0 | a), (Kq = 0 | Kq), (b[0] = a), (b[1] = Kq));
            }
            function sd(a, Kq, Lq) {
              return (function (a, Kq, Lq) {
                var Pq,
                  Nq,
                  Mq,
                  Oq,
                  Qq = w((Nq = Lq >>> 16), (Mq = a >>> 16));
                return (
                  (a =
                    ((65535 &
                      (Mq = (((Pq = w((Oq = 65535 & Lq), (a &= 65535))) >>> 16) + w(Mq, Oq)) | 0)) +
                      w(a, Nq)) |
                    0),
                  (M = (((((Qq + w(Kq, Lq)) | 0) + (Mq >>> 16)) | 0) + (a >>> 16)) | 0),
                  (65535 & Pq) | (a << 16)
                );
              })(a, Kq, Lq);
            }
            function td(a, Kq, Lq) {
              return (function (a, Kq, Lq) {
                var Yq,
                  Rq = 0,
                  Sq = 0,
                  Tq = 0,
                  Uq = 0,
                  Vq = 0,
                  Wq = 0,
                  Xq = 0,
                  Zq = 0;
                a: {
                  b: {
                    c: {
                      d: {
                        e: {
                          if (!(Sq = Kq))
                            return (
                              pd(((Kq = a) - w((a = ((a >>> 0) / (Lq >>> 0)) | 0), Lq)) | 0, 0),
                              (M = 0),
                              a
                            );
                          if ((Rq = Lq)) {
                            if (!((Uq = (Rq + -1) | 0) & Rq)) break e;
                            Vq = (0 - (Uq = (((z(Rq) + 33) | 0) - z(Sq)) | 0)) | 0;
                            break c;
                          }
                          if (!a)
                            return (pd(0, (Sq - w((a = ((Sq >>> 0) / 0) | 0), 0)) | 0), (M = 0), a);
                          if ((Rq = (32 - z(Sq)) | 0) >>> 0 < 31) break d;
                          break b;
                        }
                        if ((pd(a & Uq, 0), 1 == (0 | Rq))) break a;
                        return (
                          (Lq = 31 & (Rq = Rq ? (31 - z((Rq + -1) ^ Rq)) | 0 : 32)),
                          (a =
                            32 <= (63 & Rq) >>> 0
                              ? ((Sq = 0), Kq >>> Lq)
                              : ((Sq = Kq >>> Lq),
                                ((((1 << Lq) - 1) & Kq) << (32 - Lq)) | (a >>> Lq))),
                          (M = Sq),
                          a
                        );
                      }
                      ((Uq = (Rq + 1) | 0), (Vq = (63 - Rq) | 0));
                    }
                    if (
                      ((Rq = Kq),
                      (Tq = 31 & (Sq = 63 & Uq)),
                      (Tq =
                        32 <= Sq >>> 0
                          ? ((Sq = 0), Rq >>> Tq)
                          : ((Sq = Rq >>> Tq), ((((1 << Tq) - 1) & Rq) << (32 - Tq)) | (a >>> Tq))),
                      (Rq = 31 & (Vq &= 63)),
                      32 <= Vq >>> 0
                        ? ((Kq = a << Rq), (a = 0))
                        : ((Kq = (((1 << Rq) - 1) & (a >>> (32 - Rq))) | (Kq << Rq)), (a <<= Rq)),
                      Uq)
                    )
                      for ((Vq = (Lq + (Rq = -1)) | 0) >>> 0 < 4294967295 && (Rq = 0); ; )
                        if (
                          ((Tq =
                            ((Xq = Wq = (Tq << 1) | (Kq >>> 31)) -
                              (Yq =
                                Lq &
                                (Wq =
                                  (Rq -
                                    (((Sq = (Sq << 1) | (Tq >>> 31)) + (Vq >>> 0 < Wq >>> 0)) |
                                      0)) >>
                                  31))) |
                            0),
                          (Sq = (Sq - (Xq >>> 0 < Yq >>> 0)) | 0),
                          (Kq = (Kq << 1) | (a >>> 31)),
                          (a = Zq | (a << 1)),
                          (Zq = Wq &= 1),
                          !(Uq = (Uq + -1) | 0))
                        )
                          break;
                    return (pd(Tq, Sq), (M = (Kq << 1) | (a >>> 31)), Wq | (a << 1));
                  }
                  (pd(a, Kq), (Kq = a = 0));
                }
                return ((M = Kq), a);
              })(a, Kq, Lq);
            }
            function vd(a) {
              var b;
              return (
                (((-1 >>> (b = 31 & a)) & -2) << b) | (((-1 << (a = (0 - a) & 31)) & -2) >>> a)
              );
            }
            function N() {
              return (buffer.byteLength / 65536) | 0;
            }
          })(H, I, J),
        };
      }
      ((l = null), a.wasmBinary && (F = a.wasmBinary));
      var WebAssembly = {},
        F = [];
      'object' != typeof WebAssembly && E('no native wasm support detected');
      var I,
        J = new (function (b) {
          var c = Array(16);
          return (
            (c.grow = function () {
              (17 <= c.length &&
                B(
                  'Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH.'
                ),
                c.push(null));
            }),
            (c.set = function (b, e) {
              c[b] = e;
            }),
            (c.get = function (b) {
              return c[b];
            }),
            c
          );
        })(),
        K = !1;
      function assert(b, c) {
        b || B('Assertion failed: ' + c);
      }
      var buffer,
        M,
        L,
        N,
        ha = 'undefined' != typeof TextDecoder ? new TextDecoder('utf8') : void 0;
      function ia(b, c, d) {
        var e = c + d;
        for (d = c; b[d] && !(e <= d); ) ++d;
        if (16 < d - c && b.subarray && ha) return ha.decode(b.subarray(c, d));
        for (e = ''; c < d; ) {
          var g,
            m,
            f = b[c++];
          128 & f
            ? ((g = 63 & b[c++]),
              192 == (224 & f)
                ? (e += String.fromCharCode(((31 & f) << 6) | g))
                : ((m = 63 & b[c++]),
                  (f =
                    224 == (240 & f)
                      ? ((15 & f) << 12) | (g << 6) | m
                      : ((7 & f) << 18) | (g << 12) | (m << 6) | (63 & b[c++])) < 65536
                    ? (e += String.fromCharCode(f))
                    : ((f -= 65536),
                      (e += String.fromCharCode(55296 | (f >> 10), 56320 | (1023 & f))))))
            : (e += String.fromCharCode(f));
        }
        return e;
      }
      function ja(b, c) {
        return b ? ia(L, b, c) : '';
      }
      function ka(b) {
        return (0 < b % 65536 && (b += 65536 - (b % 65536)), b);
      }
      function la(b) {
        ((buffer = b),
          (a.HEAP8 = M = new Int8Array(b)),
          (a.HEAP16 = new Int16Array(b)),
          (a.HEAP32 = N = new Int32Array(b)),
          (a.HEAPU8 = L = new Uint8Array(b)),
          (a.HEAPU16 = new Uint16Array(b)),
          (a.HEAPU32 = new Uint32Array(b)),
          (a.HEAPF32 = new Float32Array(b)),
          (a.HEAPF64 = new Float64Array(b)));
      }
      'undefined' != typeof TextDecoder && new TextDecoder('utf-16le');
      var G = a.TOTAL_MEMORY || 16777216;
      function O(b) {
        for (; 0 < b.length; ) {
          var d,
            c = b.shift();
          'function' == typeof c
            ? c()
            : 'number' == typeof (d = c.qa)
              ? void 0 === c.pa
                ? a.dynCall_v(d)
                : a.dynCall_vi(d, c.pa)
              : d(void 0 === c.pa ? null : c.pa);
        }
      }
      ((I =
        a.wasmMemory ||
        new (function () {
          return {
            buffer: new ArrayBuffer((G / 65536) * 65536),
            grow: function (b) {
              return ca(b);
            },
          };
        })()) && (buffer = I.buffer),
        (G = buffer.byteLength),
        la(buffer),
        (N[2308] = 5252304));
      var ra,
        ma = [],
        na = [],
        oa = [],
        pa = [];
      ((Math.imul && -5 === Math.imul(4294967295, 5)) ||
        (Math.imul = function (b, c) {
          var d = 65535 & b,
            e = 65535 & c;
          return (d * e + (((b >>> 16) * e + d * (c >>> 16)) << 16)) | 0;
        }),
        Math.fround ||
          ((ra = new Float32Array(1)),
          (Math.fround = function (b) {
            return ((ra[0] = b), ra[0]);
          })),
        Math.clz32 ||
          (Math.clz32 = function (b) {
            var c = 32,
              d = b >> 16;
            return (
              d && ((c -= 16), (b = d)),
              (d = b >> 8) && ((c -= 8), (b = d)),
              (d = b >> 4) && ((c -= 4), (b = d)),
              (d = b >> 2) && ((c -= 2), (b = d)),
              b >> 1 ? c - 2 : c - b
            );
          }),
        Math.trunc ||
          (Math.trunc = function (b) {
            return b < 0 ? Math.ceil(b) : Math.floor(b);
          }));
      var P = 0,
        Q = null,
        U = null;
      function B(b) {
        throw (
          a.onAbort && a.onAbort(b),
          D(b),
          E(b),
          (K = !0),
          'abort(' + b + '). Build with -s ASSERTIONS=1 for more info.'
        );
      }
      ((a.preloadedImages = {}), (a.preloadedAudios = {}));
      var V = 'data:application/octet-stream;base64,';
      function W(b) {
        return String.prototype.startsWith ? b.startsWith(V) : 0 === b.indexOf(V);
      }
      var X = '_em_module.wasm';
      function ta() {
        try {
          if (F) return new Uint8Array(F);
          var b = z(X);
          if (b) return b;
          if (w) return w(X);
          throw 'both async and sync fetching of the wasm failed';
        } catch (c) {
          B(c);
        }
      }
      (W(X) || ((t = X), (X = a.locateFile ? a.locateFile(t, u) : u + t)),
        na.push({
          qa: function () {
            va();
          },
        }));
      var wa = [null, [], []],
        xa = !1;
      function C(b) {
        for (var c = [], d = 0; d < b.length; d++) {
          var e = b[d];
          (255 < e &&
            (xa &&
              assert(
                !1,
                'Character code ' +
                  e +
                  ' (' +
                  String.fromCharCode(e) +
                  ')  at offset ' +
                  d +
                  ' not in 0x00-0xFF.'
              ),
            (e &= 255)),
            c.push(String.fromCharCode(e)));
        }
        return c.join('');
      }
      var ya =
        'function' == typeof atob
          ? atob
          : function (b) {
              var c = '',
                d = 0;
              b = b.replace(/[^A-Za-z0-9\+\/=]/g, '');
              do {
                var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(
                    b.charAt(d++)
                  ),
                  f = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(
                    b.charAt(d++)
                  ),
                  g = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(
                    b.charAt(d++)
                  ),
                  m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(
                    b.charAt(d++)
                  ),
                  e = (e << 2) | (f >> 4),
                  f = ((15 & f) << 4) | (g >> 2),
                  h = ((3 & g) << 6) | m;
              } while (
                ((c += String.fromCharCode(e)),
                64 !== g && (c += String.fromCharCode(f)),
                64 !== m && (c += String.fromCharCode(h)),
                d < b.length)
              );
              return c;
            };
      function z(b) {
        if (W(b)) {
          if (((b = b.slice(V.length)), 'boolean' == typeof r && r)) {
            try {
              var c = Buffer.from(b, 'base64');
            } catch (g) {
              c = new Buffer(b, 'base64');
            }
            var d = new Uint8Array(c.buffer, c.byteOffset, c.byteLength);
          } else
            try {
              for (var e = ya(b), f = new Uint8Array(e.length), c = 0; c < e.length; ++c)
                f[c] = e.charCodeAt(c);
              d = f;
            } catch (g) {
              throw Error('Converting base64 string to bytes failed.');
            }
          return d;
        }
      }
      var Y,
        H = {
          a: function (b, c, d) {
            L.set(L.subarray(c, c + d), b);
          },
          b: function (b) {
            if (2147418112 < b) return !1;
            for (var c = Math.max(M.length, 16777216); c < b; )
              c = c <= 536870912 ? ka(2 * c) : Math.min(ka((3 * c + 2147483648) / 4), 2147418112);
            a: {
              try {
                (I.grow((c - buffer.byteLength + 65535) >> 16), la(I.buffer));
                var d = 1;
                break a;
              } catch (e) {}
              d = void 0;
            }
            return !!d;
          },
          c: function (b, c, d, e) {
            try {
              for (var f = 0, g = 0; g < d; g++) {
                for (
                  var m = N[(c + 8 * g) >> 2], h = N[(c + (8 * g + 4)) >> 2], A = 0;
                  A < h;
                  A++
                ) {
                  var R = L[m + A],
                    S = wa[b];
                  0 === R || 10 === R ? ((1 === b ? D : E)(ia(S, 0)), (S.length = 0)) : S.push(R);
                }
                f += h;
              }
              return ((N[e >> 2] = f), 0);
            } catch (T) {
              return (('undefined' != typeof FS && T instanceof FS.ra) || B(T), T.sa);
            }
          },
          memory: I,
          table: J,
        },
        u = (function () {
          function b(b) {
            ((a.asm = b.exports),
              P--,
              a.monitorRunDependencies && a.monitorRunDependencies(P),
              0 == P &&
                (null !== Q && (clearInterval(Q), (Q = null)), U) &&
                ((b = U), (U = null), b()));
          }
          function c(c) {
            b(c.instance);
          }
          function d(b) {
            return (
              F || (!p && !q) || 'function' != typeof fetch
                ? new Promise(function (b) {
                    b(ta());
                  })
                : fetch(X, { credentials: 'same-origin' })
                    .then(function (b) {
                      if (b.ok) return b.arrayBuffer();
                      throw "failed to load wasm binary file at '" + X + "'";
                    })
                    .catch(ta)
            )
              .then(function () {
                return {
                  then: function (b) {
                    b({ instance: new da() });
                  },
                };
              })
              .then(b, function (b) {
                (E('failed to asynchronously prepare wasm: ' + b), B(b));
              });
          }
          var e = { env: H, wasi_unstable: H };
          if ((P++, a.monitorRunDependencies && a.monitorRunDependencies(P), a.instantiateWasm))
            try {
              return a.instantiateWasm(e, b);
            } catch (f) {
              return (E('Module.instantiateWasm callback failed with error: ' + f), !1);
            }
          return (
            F ||
            'function' != typeof WebAssembly.instantiateStreaming ||
            W(X) ||
            'function' != typeof fetch
              ? d(c)
              : fetch(X, { credentials: 'same-origin' }).then(function (b) {
                  return WebAssembly.instantiateStreaming(b, e).then(c, function (b) {
                    (E('wasm streaming compile failed: ' + b),
                      E('falling back to ArrayBuffer instantiation'),
                      d(c));
                  });
                }),
            {}
          );
        })(),
        va =
          ((a.asm = u),
          (a.___wasm_call_ctors = function () {
            return a.asm.d.apply(null, arguments);
          })),
        Aa =
          ((a._csmGetLogFunction = function () {
            return a.asm.e.apply(null, arguments);
          }),
          (a._csmGetVersion = function () {
            return a.asm.f.apply(null, arguments);
          }),
          (a._csmGetLatestMocVersion = function () {
            return a.asm.g.apply(null, arguments);
          }),
          (a._csmGetMocVersion = function () {
            return a.asm.h.apply(null, arguments);
          }),
          (a._csmHasMocConsistency = function () {
            return a.asm.i.apply(null, arguments);
          }),
          (a._csmSetLogFunction = function () {
            return a.asm.j.apply(null, arguments);
          }),
          (a._csmReviveMocInPlace = function () {
            return a.asm.k.apply(null, arguments);
          }),
          (a._csmReadCanvasInfo = function () {
            return a.asm.l.apply(null, arguments);
          }),
          (a._csmGetSizeofModel = function () {
            return a.asm.m.apply(null, arguments);
          }),
          (a._csmInitializeModelInPlace = function () {
            return a.asm.n.apply(null, arguments);
          }),
          (a._csmUpdateModel = function () {
            return a.asm.o.apply(null, arguments);
          }),
          (a._csmGetRenderOrders = function () {
            return a.asm.p.apply(null, arguments);
          }),
          (a._csmGetParameterCount = function () {
            return a.asm.q.apply(null, arguments);
          }),
          (a._csmGetParameterIds = function () {
            return a.asm.r.apply(null, arguments);
          }),
          (a._csmGetParameterTypes = function () {
            return a.asm.s.apply(null, arguments);
          }),
          (a._csmGetParameterMinimumValues = function () {
            return a.asm.t.apply(null, arguments);
          }),
          (a._csmGetParameterMaximumValues = function () {
            return a.asm.u.apply(null, arguments);
          }),
          (a._csmGetParameterDefaultValues = function () {
            return a.asm.v.apply(null, arguments);
          }),
          (a._csmGetParameterValues = function () {
            return a.asm.w.apply(null, arguments);
          }),
          (a._csmGetParameterRepeats = function () {
            return a.asm.x.apply(null, arguments);
          }),
          (a._csmGetPartCount = function () {
            return a.asm.y.apply(null, arguments);
          }),
          (a._csmGetPartIds = function () {
            return a.asm.z.apply(null, arguments);
          }),
          (a._csmGetPartOpacities = function () {
            return a.asm.A.apply(null, arguments);
          }),
          (a._csmGetPartParentPartIndices = function () {
            return a.asm.B.apply(null, arguments);
          }),
          (a._csmGetPartOffscreenIndices = function () {
            return a.asm.C.apply(null, arguments);
          }),
          (a._csmGetDrawableCount = function () {
            return a.asm.D.apply(null, arguments);
          }),
          (a._csmGetDrawableIds = function () {
            return a.asm.E.apply(null, arguments);
          }),
          (a._csmGetDrawableConstantFlags = function () {
            return a.asm.F.apply(null, arguments);
          }),
          (a._csmGetDrawableDynamicFlags = function () {
            return a.asm.G.apply(null, arguments);
          }),
          (a._csmGetDrawableBlendModes = function () {
            return a.asm.H.apply(null, arguments);
          }),
          (a._csmGetDrawableTextureIndices = function () {
            return a.asm.I.apply(null, arguments);
          }),
          (a._csmGetDrawableDrawOrders = function () {
            return a.asm.J.apply(null, arguments);
          }),
          (a._csmGetDrawableOpacities = function () {
            return a.asm.K.apply(null, arguments);
          }),
          (a._csmGetDrawableMaskCounts = function () {
            return a.asm.L.apply(null, arguments);
          }),
          (a._csmGetDrawableMasks = function () {
            return a.asm.M.apply(null, arguments);
          }),
          (a._csmGetDrawableVertexCounts = function () {
            return a.asm.N.apply(null, arguments);
          }),
          (a._csmGetDrawableVertexPositions = function () {
            return a.asm.O.apply(null, arguments);
          }),
          (a._csmGetDrawableVertexUvs = function () {
            return a.asm.P.apply(null, arguments);
          }),
          (a._csmGetDrawableIndexCounts = function () {
            return a.asm.Q.apply(null, arguments);
          }),
          (a._csmGetDrawableIndices = function () {
            return a.asm.R.apply(null, arguments);
          }),
          (a._csmGetDrawableMultiplyColors = function () {
            return a.asm.S.apply(null, arguments);
          }),
          (a._csmGetDrawableScreenColors = function () {
            return a.asm.T.apply(null, arguments);
          }),
          (a._csmGetDrawableParentPartIndices = function () {
            return a.asm.U.apply(null, arguments);
          }),
          (a._csmResetDrawableDynamicFlags = function () {
            return a.asm.V.apply(null, arguments);
          }),
          (a._csmGetParameterKeyCounts = function () {
            return a.asm.W.apply(null, arguments);
          }),
          (a._csmGetParameterKeyValues = function () {
            return a.asm.X.apply(null, arguments);
          }),
          (a._csmGetOffscreenCount = function () {
            return a.asm.Y.apply(null, arguments);
          }),
          (a._csmGetOffscreenBlendModes = function () {
            return a.asm.Z.apply(null, arguments);
          }),
          (a._csmGetOffscreenOpacities = function () {
            return a.asm._.apply(null, arguments);
          }),
          (a._csmGetOffscreenOwnerIndices = function () {
            return a.asm.$.apply(null, arguments);
          }),
          (a._csmGetOffscreenMultiplyColors = function () {
            return a.asm.aa.apply(null, arguments);
          }),
          (a._csmGetOffscreenScreenColors = function () {
            return a.asm.ba.apply(null, arguments);
          }),
          (a._csmGetOffscreenMaskCounts = function () {
            return a.asm.ca.apply(null, arguments);
          }),
          (a._csmGetOffscreenMasks = function () {
            return a.asm.da.apply(null, arguments);
          }),
          (a._csmGetOffscreenConstantFlags = function () {
            return a.asm.ea.apply(null, arguments);
          }),
          (a._csmMallocMoc = function () {
            return a.asm.fa.apply(null, arguments);
          }),
          (a._csmMallocModelAndInitialize = function () {
            return a.asm.ga.apply(null, arguments);
          }),
          (a._csmMalloc = function () {
            return a.asm.ha.apply(null, arguments);
          }),
          (a._csmFree = function () {
            return a.asm.ia.apply(null, arguments);
          }),
          (a._csmInitializeAmountOfMemory = function () {
            return a.asm.ja.apply(null, arguments);
          }),
          (a.stackSave = function () {
            return a.asm.ka.apply(null, arguments);
          })),
        Ba = (a.stackAlloc = function () {
          return a.asm.la.apply(null, arguments);
        }),
        Ca = (a.stackRestore = function () {
          return a.asm.ma.apply(null, arguments);
        }),
        ca = (a.__growWasmMemory = function () {
          return a.asm.na.apply(null, arguments);
        });
      function Z() {
        function b() {
          if (!Y && ((Y = !0), !K)) {
            if ((O(na), O(oa), a.onRuntimeInitialized && a.onRuntimeInitialized(), a.postRun))
              for (
                'function' == typeof a.postRun && (a.postRun = [a.postRun]);
                a.postRun.length;

              ) {
                var b = a.postRun.shift();
                pa.unshift(b);
              }
            O(pa);
          }
        }
        if (!(0 < P)) {
          if (a.preRun)
            for ('function' == typeof a.preRun && (a.preRun = [a.preRun]); a.preRun.length; )
              !(function () {
                var b = a.preRun.shift();
                ma.unshift(b);
              })();
          (O(ma),
            0 < P ||
              (a.setStatus
                ? (a.setStatus('Running...'),
                  setTimeout(function () {
                    (setTimeout(function () {
                      a.setStatus('');
                    }, 1),
                      b());
                  }, 1))
                : b()));
        }
      }
      if (
        ((a.dynCall_vi = function () {
          return a.asm.oa.apply(null, arguments);
        }),
        (a.asm = u),
        (a.ccall = function (b, c, d, e) {
          var f = {
              string: function (b) {
                var c = 0;
                if (null != b && 0 !== b) {
                  var d = 1 + (b.length << 2),
                    e = (c = Ba(d)),
                    f = L;
                  if (0 < d) {
                    for (var d = e + d - 1, g = 0; g < b.length; ++g) {
                      var k = b.charCodeAt(g);
                      if (
                        (k =
                          55296 <= k && k <= 57343
                            ? (65536 + ((1023 & k) << 10)) | (1023 & b.charCodeAt(++g))
                            : k) <= 127
                      ) {
                        if (d <= e) break;
                        f[e++] = k;
                      } else {
                        if (k <= 2047) {
                          if (d <= e + 1) break;
                          f[e++] = 192 | (k >> 6);
                        } else {
                          if (k <= 65535) {
                            if (d <= e + 2) break;
                            f[e++] = 224 | (k >> 12);
                          } else {
                            if (d <= e + 3) break;
                            ((f[e++] = 240 | (k >> 18)), (f[e++] = 128 | ((k >> 12) & 63)));
                          }
                          f[e++] = 128 | ((k >> 6) & 63);
                        }
                        f[e++] = 128 | (63 & k);
                      }
                    }
                    f[e] = 0;
                  }
                }
                return c;
              },
              array: function (b) {
                var c = Ba(b.length);
                return (M.set(b, c), c);
              },
            },
            g = (function (b) {
              var c = a['_' + b];
              return (
                assert(c, 'Cannot call unknown function ' + b + ', make sure it is exported'),
                c
              );
            })(b),
            m = [];
          if (((b = 0), e))
            for (var h = 0; h < e.length; h++) {
              var A = f[d[h]];
              A ? (0 === b && (b = Aa()), (m[h] = A(e[h]))) : (m[h] = e[h]);
            }
          return (
            (d = (function (b) {
              return 'string' === c ? ja(b) : 'boolean' === c ? !!b : b;
            })((d = g.apply(null, m)))),
            0 !== b && Ca(b),
            d
          );
        }),
        (a.UTF8ToString = ja),
        (a.addFunction = function (b, c) {
          var d = J.length;
          try {
            J.grow(1);
          } catch (e) {
            if ((!e) instanceof RangeError) throw e;
            throw 'Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH.';
          }
          try {
            J.set(d, b);
          } catch (e) {
            if ((!e) instanceof TypeError) throw e;
            (assert(void 0 !== c, 'Missing signature argument to addFunction'), J.set(d, b));
          }
          return d;
        }),
        (a.then = function (b) {
          var c;
          return (
            Y
              ? b(a)
              : ((c = a.onRuntimeInitialized),
                (a.onRuntimeInitialized = function () {
                  (c && c(), b(a));
                })),
            a
          );
        }),
        (U = function Da() {
          (Y || Z(), Y || (U = Da));
        }),
        (a.run = Z),
        a.preInit)
      )
        for ('function' == typeof a.preInit && (a.preInit = [a.preInit]); 0 < a.preInit.length; )
          a.preInit.pop()();
      return (Z(), _em_module);
    };
  })();
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = _em_module)
    : 'function' == typeof define && define.amd
      ? define([], function () {
          return _em_module;
        })
      : 'object' == typeof exports && (exports._em_module = _em_module);
  var _em = _em_module();
})(Live2DCubismCore || (Live2DCubismCore = {}));
//# sourceMappingURL=live2dcubismcore.js.map
