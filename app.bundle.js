/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "28dd457c83e083227428";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/frames/frames.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/frames/frames.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".frame-wrap {\n  position: relative;\n  flex-shrink: 0;\n  width: 180px;\n  height: 180px;\n  margin: 5px 0;\n  border: 2px solid grey;\n  border-radius: 5px;\n  background-size: 100%;\n  box-shadow: 0 2px 5px 0 #808080;\n  /* image-rendering: pixelated; */\n}\n\n.frame-wrap.over {\n  border: 2px dashed #000;\n}\n\n.frames-wrapper {\n  display: flex;\n  flex-direction: column;\n}\n\n.add-button {\n  flex-shrink: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 180px;\n  height: 50px;\n  margin: 5px 0;\n  color: gray;\n  border: 2px solid gray;\n  border-radius: 5px;\n  box-shadow: 0 2px 5px 0 #808080;\n}\n\n.frame-btn {\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 30px;\n  height: 30px;\n  font-family: inherit;\n  color: gray;\n  border: 1px solid rgb(189, 189, 189);\n  border-radius: 5%;\n}\n\n.active-frame {\n  border: 2px solid yellow;\n}\n\n.frame-num {\n  left: 0;\n  top: 0;\n  background-color: yellow;\n}\n\n.del-button {\n  right: 0;\n  top: 0;\n}\n\n.dubl-button {\n  right: 0;\n  bottom: 0;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ./assets/fonts/sourcesanspro-regular-webfont.woff2 */ "./src/assets/fonts/sourcesanspro-regular-webfont.woff2"));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! ./assets/fonts/sourcesanspro-regular-webfont.woff */ "./src/assets/fonts/sourcesanspro-regular-webfont.woff"));
var ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(/*! ./assets/fonts/SourceSansPro-Regular.ttf */ "./src/assets/fonts/SourceSansPro-Regular.ttf"));

// Module
exports.push([module.i, "@font-face {\n  font-family: \"Source Sans Pro\";\n  font-weight: 400;\n  font-style: normal;\n  src: url(" + ___CSS_LOADER_URL___0___ + ") format(\"woff2\"),\n       url(" + ___CSS_LOADER_URL___1___ + ") format(\"woff\"),\n       url(" + ___CSS_LOADER_URL___2___ + ") format(\"ttf\");\n}\n\n/*-Global-*/\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 35px 92vh;\n  grid-row-gap: 20px;\n  font-family: \"Source Sans Pro\", \"Roboto\", sans-serif;\n}\n\nh1 {\n  font-size: 20px;\n  font-weight: 500;\n  line-height: 40px;\n  opacity: 0.9;\n}\n\n/*============HEADER============*/\n\n.header {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 35px;\n  padding: 0 20px;\n  box-shadow: 0 2px 5px 0 #808080;\n}\n\n/*============MAIN============*/\n\n.main {\n  display: grid;\n  grid-template-columns: 100px 200px 1fr 210px 50px;\n  grid-column-gap: 20px;\n  padding: 0 10px;\n}\n\n.first-column-wrap {\n  display: grid;\n  grid-template-rows: 20fr 2fr;\n}\n\n.frames-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow-y: auto;\n}\n\n.canvas-wrap {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.canvas-container {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n}\n\n.canvas-item {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 0;\n  image-rendering: pixelated;\n  box-shadow: 0 2px 5px 0 #808080;\n}\n\n.canvas-draw-item {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  image-rendering: pixelated;\n  box-shadow: 0 2px 5px 0 #808080;\n}\n\n.animation-wrap {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.animation-container {\n  width: 210px;\n  height: 210px;\n  box-shadow: 0 2px 5px 0 #808080;\n  background-size: 100%;\n}\n\n.animation-container:fullscreen {\n  background-color: white;\n  image-rendering: pixelated;\n}\n\n.controller-panel {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  width: 100%;\n  height: 30px;\n  box-shadow: 0 2px 5px 0 #808080;\n  border-radius: 5px;\n}\n\n.current-controller-value span {\n  color: red;\n  margin-right: 5px;\n}\n\n.data-container {\n  width: 100%;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/tools/tools.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/tools/tools.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ./assets/pen-tool.png */ "./src/tools/assets/pen-tool.png"));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! ./assets/mirror-pen-tool.png */ "./src/tools/assets/mirror-pen-tool.png"));
var ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(/*! ./assets/eraser-tool.png */ "./src/tools/assets/eraser-tool.png"));
var ___CSS_LOADER_URL___3___ = urlEscape(__webpack_require__(/*! ./assets/line-tool.png */ "./src/tools/assets/line-tool.png"));
var ___CSS_LOADER_URL___4___ = urlEscape(__webpack_require__(/*! ./assets/rect-tool.png */ "./src/tools/assets/rect-tool.png"));
var ___CSS_LOADER_URL___5___ = urlEscape(__webpack_require__(/*! ./assets/fill-rect-tool.png */ "./src/tools/assets/fill-rect-tool.png"));
var ___CSS_LOADER_URL___6___ = urlEscape(__webpack_require__(/*! ./assets/arc-tool.png */ "./src/tools/assets/arc-tool.png"));
var ___CSS_LOADER_URL___7___ = urlEscape(__webpack_require__(/*! ./assets/lighten-tool.png */ "./src/tools/assets/lighten-tool.png"));
var ___CSS_LOADER_URL___8___ = urlEscape(__webpack_require__(/*! ./assets/color-picker-tool.png */ "./src/tools/assets/color-picker-tool.png"));

// Module
exports.push([module.i, ".tools-container {\n  display: grid;\n  grid-template: repeat(5, 45px) / 1fr 1fr;\n  grid-gap: 5px;\n}\n\n.tool-item {\n  border: 2px solid gray;\n  border-radius: 5px;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 70%;\n  outline: none;\n}\n\n.tool-item:hover {\n  background-color: rgb(235, 235, 235);\n}\n\n.tool-item:active {\n  box-shadow: inset 1px 1px 3px 0 gray;\n}\n\n.active-tool {\n  box-shadow: inset 1px 1px 3px 0 gray;\n}\n\n\n\n.pen-tool {\n  background-image: url(" + ___CSS_LOADER_URL___0___ + ");\n}\n\n.mirror-pen-tool {\n  background-image: url(" + ___CSS_LOADER_URL___1___ + ");\n}\n\n.eraser-tool {\n  background-image: url(" + ___CSS_LOADER_URL___2___ + ");\n}\n\n.line-tool {\n  background-image: url(" + ___CSS_LOADER_URL___3___ + ");\n}\n\n.rect-tool {\n  background-image: url(" + ___CSS_LOADER_URL___4___ + ");\n}\n\n.fill-rect-tool {\n  background-image: url(" + ___CSS_LOADER_URL___5___ + ");\n}\n\n.arc-tool {\n  background-image: url(" + ___CSS_LOADER_URL___6___ + ");\n}\n\n.lighten-tool {\n  background-image: url(" + ___CSS_LOADER_URL___7___ + ");\n}\n\n.color-picker-tool {\n  background-image: url(" + ___CSS_LOADER_URL___8___ + ");\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/url-escape.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/url-escape.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/Animation.js":
/*!**************************!*\
  !*** ./src/Animation.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animation; });
class Animation {
  static startAnimation(framesStorage) {
    const animationContainer = document.querySelector('.animation-container');
    const fpsHandle = document.querySelector('.fps-handle');

    let itemsCount = 0;

    const fpsCount = fpsHandle.valueAsNumber;

    return setInterval(() => {
      if (itemsCount < framesStorage.length) {
        animationContainer.style.backgroundImage = `url(${framesStorage[itemsCount].canvasImg})`;
        itemsCount += 1;

        if (itemsCount === framesStorage.length) {
          itemsCount = 0;
        }
      }
    }, 1000 / fpsCount);
  }
}


/***/ }),

/***/ "./src/AppHandles.js":
/*!***************************!*\
  !*** ./src/AppHandles.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FpsHandle; });
class FpsHandle {
  static addFpsHandle() {
    const currentFps = document.querySelector('#fps');
    const fpsHandle = document.querySelector('.fps-handle');

    fpsHandle.addEventListener('input', () => {
      currentFps.innerHTML = fpsHandle.value;
    });
  }

  static addFatHandle() {
    const currentFat = document.querySelector('#fat');
    const fatHandle = document.querySelector('.fat-handle');

    fatHandle.addEventListener('input', () => {
      currentFat.innerHTML = fatHandle.value;
    });
  }

  static swapColor() {
    const color = document.querySelector('#color-1');
    const color2 = document.querySelector('#color-2');

    const colorStorage = color.value;
    const colorStorage2 = color2.value;

    color.value = colorStorage2;
    color2.value = colorStorage;
  }
}


/***/ }),

/***/ "./src/CanvasCreate.js":
/*!*****************************!*\
  !*** ./src/CanvasCreate.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddCanvas; });
class AddCanvas {
  constructor(size, scaleCoef, shiftCoef) {
    this.size = size;
    this.scaleCoef = scaleCoef;
    this.shiftCoef = shiftCoef;
    this.currentTool = null;
    this.activeButton = null;
  }

  createCanvas(className) {
    const canvas = document.createElement('canvas');

    canvas.setAttribute('class', className);
    canvas.setAttribute('width', this.size);
    canvas.setAttribute('height', this.size);

    canvas.style.transform = `scale(${this.scaleCoef})`;
    canvas.style.top = `${this.shiftCoef}px`;
    canvas.style.left = `${this.shiftCoef}px`;

    return canvas;
  }

  static addCanvasListeners(drawCanvas) {
    const cursorCords = document.getElementById('cords-cursor');

    drawCanvas.addEventListener('mousemove', (e) => {
      cursorCords.innerHTML = `y: ${e.offsetY}, x: ${e.offsetX}`;
    });
  }
}


/***/ }),

/***/ "./src/assets/fonts/SourceSansPro-Regular.ttf":
/*!****************************************************!*\
  !*** ./src/assets/fonts/SourceSansPro-Regular.ttf ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3f482321becfaa40fcb19825fa717859.ttf";

/***/ }),

/***/ "./src/assets/fonts/sourcesanspro-regular-webfont.woff":
/*!*************************************************************!*\
  !*** ./src/assets/fonts/sourcesanspro-regular-webfont.woff ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a73ea12731b0afd89bf87b803bcac5e7.woff";

/***/ }),

/***/ "./src/assets/fonts/sourcesanspro-regular-webfont.woff2":
/*!**************************************************************!*\
  !*** ./src/assets/fonts/sourcesanspro-regular-webfont.woff2 ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d13de09f4256f6593d47e1d6df49f808.woff2";

/***/ }),

/***/ "./src/frames/FrameCreate.js":
/*!***********************************!*\
  !*** ./src/frames/FrameCreate.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CreateFrame; });
class CreateFrame {
  static createFrame(frameNumber, delCallback, copyCallback) {
    const frame = document.createElement('div');

    const frameNum = document.createElement('div');
    const delBtn = document.createElement('button');
    const copyBtn = document.createElement('button');

    frame.setAttribute('class', 'frame-wrap');
    frame.style.order = frameNumber;
    frame.setAttribute('draggable', 'true');

    frameNum.setAttribute('class', 'frame-btn frame-num');
    frameNum.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    delBtn.setAttribute('class', 'frame-btn del-button');
    copyBtn.setAttribute('class', 'frame-btn dubl-button');

    frameNum.innerHTML = frameNumber;
    delBtn.innerHTML = 'Del';
    copyBtn.innerHTML = 'Copy';

    CreateFrame.addFrameListeners(delBtn, copyBtn, delCallback, copyCallback);

    frame.appendChild(frameNum);
    frame.appendChild(delBtn);
    frame.appendChild(copyBtn);

    return frame;
  }

  static addFrameListeners(del, copy, delCallback, copyCallback) {
    del.addEventListener('click', delCallback, false);
    copy.addEventListener('click', copyCallback, false);
  }
}


/***/ }),

/***/ "./src/frames/frames.css":
/*!*******************************!*\
  !*** ./src/frames/frames.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./frames.css */ "./node_modules/css-loader/dist/cjs.js!./src/frames/frames.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!./frames.css */ "./node_modules/css-loader/dist/cjs.js!./src/frames/frames.css", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./frames.css */ "./node_modules/css-loader/dist/cjs.js!./src/frames/frames.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/frames/index.js":
/*!*****************************!*\
  !*** ./src/frames/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FrameCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrameCreate */ "./src/frames/FrameCreate.js");
/* harmony import */ var _frames_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frames.css */ "./src/frames/frames.css");
/* harmony import */ var _frames_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_frames_css__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = (_FrameCreate__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _frames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./frames */ "./src/frames/index.js");
/* harmony import */ var _CanvasCreate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasCreate */ "./src/CanvasCreate.js");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools */ "./src/tools/index.js");
/* harmony import */ var _AppHandles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AppHandles */ "./src/AppHandles.js");
/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Animation */ "./src/Animation.js");







const framesContainer = document.querySelector('.frames-container');
const canvasContainer = document.querySelector('.canvas-container');
const animationContainer = document.querySelector('.animation-container');

const framesWrap = document.createElement('div');
framesWrap.classList.add('frames-wrapper');

const addBtn = document.createElement('button');
const fpsHandle = document.querySelector('.fps-handle');
const currentFps = document.querySelector('#fps');
const canvasSizeHandle = document.querySelector('.canvas-size-handle');
const canvasSize = document.getElementById('canvas-size');

const color = document.querySelector('#color-1');
const fatHandle = document.querySelector('.fat-handle');
const currentFat = document.querySelector('#fat');


const swapColorButton = document.querySelector('#swap-color');

const penToolButton = document.querySelector('.pen-tool');
const mirrorPenToolButton = document.querySelector('.mirror-pen-tool');
const eraserToolButton = document.querySelector('.eraser-tool');
const lineToolButton = document.querySelector('.line-tool');
const rectToolButton = document.querySelector('.rect-tool');
const fillRectToolButton = document.querySelector('.fill-rect-tool');
const arcToolButton = document.querySelector('.arc-tool');
const lightenToolButton = document.querySelector('.lighten-tool');
const colorPickerToolButton = document.querySelector('.color-picker-tool');

let animationTimer;

const framesStorage = [];

let activeFrame;

let dragSrcEl = null;
let frameArrElem = null;

let activeButton;
let currentToolName;

let scaleCoef;
let shiftCoef;

function addFrame() {
  const frame = _frames__WEBPACK_IMPORTED_MODULE_1__["default"].createFrame(framesStorage.length + 1, delFrame, copyFrame);
  const canvasObj = new _CanvasCreate__WEBPACK_IMPORTED_MODULE_2__["default"](canvasSizeHandle.value, scaleCoef, shiftCoef);
  const carrierCanvas = canvasObj.createCanvas('canvas-item');
  const drawCanvas = canvasObj.createCanvas('canvas-draw-item');

  const carrierCtx = carrierCanvas.getContext('2d');
  const drawCtx = drawCanvas.getContext('2d');

  _CanvasCreate__WEBPACK_IMPORTED_MODULE_2__["default"].addCanvasListeners(drawCanvas);

  dragAndDrop(frame);

  refreshCanvas([carrierCanvas, drawCanvas]);

  framesStorage.push({
    frame: frame,
    canvas: [
      carrierCanvas,
      drawCanvas,
    ],
    canvasListeners: addToolsListeners(carrierCtx, drawCtx, carrierCanvas),
  });

  if (currentToolName && activeButton) {
    addTool();
  } else {
    activeButton = penToolButton;
    currentToolName = 'penTool';

    addTool();
  }

  const frameStorageLength = framesStorage.length;

  framesStorage[frameStorageLength - 1].frame.setAttribute('id', `${frameStorageLength}-frame`);
  framesStorage[frameStorageLength - 1].canvas[0].setAttribute('id', `${frameStorageLength}-canvas`);
  framesStorage[frameStorageLength - 1].canvas[1].setAttribute('id', `${frameStorageLength}-draw-canvas`);

  framesStorage.forEach((e, i) => {
    if (framesStorage.length - 1 === i) {
      activeFrame = e.frame;
      e.frame.classList.toggle('active-frame', true);
    } else {
      e.frame.classList.toggle('active-frame', false);
    }

    framesWrap.appendChild(e.frame);
  });
}

function refreshAnimation() {
  if (animationTimer) {
    clearInterval(animationTimer);
  }
  animationTimer = _Animation__WEBPACK_IMPORTED_MODULE_5__["default"].startAnimation(framesStorage);
}

function resizeCanvas() {
  const canvasField = document.querySelector('.canvas-item');
  const canvasDrawField = document.querySelector('.canvas-draw-item');
  const sizeCanvas = document.getElementById('size-canvas');

  scaleCoef = +((800 / canvasSizeHandle.valueAsNumber).toFixed(2));
  shiftCoef = (800 - canvasSizeHandle.valueAsNumber) / 2;

  canvasField.style.transform = `scale(${scaleCoef})`;
  canvasDrawField.style.transform = `scale(${scaleCoef})`;

  canvasSize.innerHTML = canvasSizeHandle.value;
  sizeCanvas.innerHTML = `${canvasSizeHandle.value} x ${canvasSizeHandle.value}`;

  framesStorage.forEach((elem) => {
    const canvasItem = elem.canvas[0];
    const canvasItem1 = elem.canvas[1];

    canvasItem.setAttribute('width', canvasSizeHandle.value);
    canvasItem.setAttribute('height', canvasSizeHandle.value);

    canvasItem1.setAttribute('width', canvasSizeHandle.value);
    canvasItem1.setAttribute('height', canvasSizeHandle.value);

    canvasItem.style.transform = `scale(${scaleCoef})`;
    canvasItem.style.left = `${shiftCoef}px`;
    canvasItem.style.top = `${shiftCoef}px`;
    canvasItem1.style.transform = `scale(${scaleCoef})`;
    canvasItem1.style.left = `${shiftCoef}px`;
    canvasItem1.style.top = `${shiftCoef}px`;

    const ctx = canvasItem.getContext('2d');

    const img = new Image();
    img.src = elem.canvasImg;

    ctx.drawImage(img, 0, 0);
  });
}

function addListeners() {
  addBtn.addEventListener('click', addFrame);

  addBtn.addEventListener('click', refreshAnimation);
  fpsHandle.addEventListener('input', refreshAnimation);

  canvasSizeHandle.addEventListener('input', resizeCanvas);

  _AppHandles__WEBPACK_IMPORTED_MODULE_4__["default"].addFpsHandle();
  _AppHandles__WEBPACK_IMPORTED_MODULE_4__["default"].addFatHandle();
  swapColorButton.addEventListener('click', _AppHandles__WEBPACK_IMPORTED_MODULE_4__["default"].swapColor());

  document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && canvasSizeHandle.valueAsNumber >= 32) {
      canvasSizeHandle.valueAsNumber -= 10;
      canvasSize.innerHTML = canvasSizeHandle.value;
      resizeCanvas();
    }

    if (e.deltaY < 0 && canvasSizeHandle.valueAsNumber <= 800) {
      canvasSizeHandle.valueAsNumber += 10;
      canvasSize.innerHTML = canvasSizeHandle.value;
      resizeCanvas();
    }
  });
}

function startApp() {
  addBtn.innerHTML = 'Add new frame';

  framesContainer.appendChild(framesWrap);
  framesContainer.appendChild(addBtn);

  addBtn.setAttribute('class', 'add-button');

  addListeners();
}

startApp();

function addToolsListeners(carrierCtx, drawCtx, carrierCanvas) {
  return {
    penTool: _tools__WEBPACK_IMPORTED_MODULE_3__["default"].addPenTool(carrierCtx, color, fatHandle, framesStorage,
      carrierCanvas),
    mirrorPenTool: _tools__WEBPACK_IMPORTED_MODULE_3__["default"].addMirrorPenTool(carrierCtx, color, fatHandle, framesStorage,
      carrierCanvas),
    eraserTool: _tools__WEBPACK_IMPORTED_MODULE_3__["default"].addEraserTool(carrierCtx, fatHandle, framesStorage,
      carrierCanvas),
    lineTool: _tools__WEBPACK_IMPORTED_MODULE_3__["default"].addLineTool(carrierCtx, drawCtx, color, fatHandle, framesStorage,
      carrierCanvas),
    rectTool: _tools__WEBPACK_IMPORTED_MODULE_3__["default"].addRectTool(carrierCtx, drawCtx, color, fatHandle, framesStorage,
      carrierCanvas),
    fillRectTool: _tools__WEBPACK_IMPORTED_MODULE_3__["default"].addFillRectTool(
      carrierCtx,
      drawCtx,
      color,
      fatHandle,
      framesStorage,
      carrierCanvas,
    ),
    arcTool: _tools__WEBPACK_IMPORTED_MODULE_3__["default"].addArcTool(
      carrierCtx,
      drawCtx,
      color,
      fatHandle,
      framesStorage,
      carrierCanvas,
    ),
    lightenTool: _tools__WEBPACK_IMPORTED_MODULE_3__["default"].addLightenTool(carrierCtx, fatHandle, framesStorage,
      carrierCanvas),
    colorPickerTool: _tools__WEBPACK_IMPORTED_MODULE_3__["default"].addColorPickerTool(carrierCtx, color),
  };
}

function chooseActiveFrame(newFrame) {
  if (activeFrame) {
    activeFrame.classList.toggle('active-frame', false);
    activeFrame = newFrame;
    activeFrame.classList.toggle('active-frame', true);
  } else {
    activeFrame = newFrame;
    activeFrame.classList.toggle('active-frame', true);
  }
}

function refreshCanvas(canvasArr) {
  canvasContainer.innerHTML = '';

  canvasArr.forEach(e => canvasContainer.appendChild(e));
}

function refreshFrames() {
  framesStorage.forEach((e, i) => {
    e.frame.querySelector('.frame-num').innerHTML = i + 1;
    e.frame.setAttribute('id', `${i + 1}-frame`);
    e.frame.style.order = i + 1;
    e.canvas[0].setAttribute('id', `${i + 1}-canvas`);
    e.canvas[1].setAttribute('id', `${i + 1}-draw-canvas`);
    framesWrap.appendChild(e.frame);
  });
}

function addTool() {
  activeButton.classList.toggle('active-tool', true);

  framesStorage.forEach((elem) => {
    Object.keys(elem.canvasListeners[currentToolName]).forEach((key) => {
      elem.canvas[1].addEventListener(`${key}`, elem.canvasListeners[currentToolName][key]);
    });
  });
}

function delTool() {
  if (currentToolName && activeButton) {
    framesStorage.forEach((elem) => {
      Object.keys(elem.canvasListeners[currentToolName]).forEach((key) => {
        elem.canvas[1].removeEventListener(`${key}`, elem.canvasListeners[currentToolName][key]);
      });
    });

    activeButton.classList.toggle('active-tool', false);
  }
}

function delFrame(e) {
  e.stopPropagation();

  const frameNum = parseInt(e.target.parentNode.getAttribute('id'), 10);

  framesStorage.splice(frameNum - 1, 1);

  framesWrap.innerHTML = '';

  canvasContainer.innerHTML = '';

  if (framesStorage.length > 0) {
    refreshCanvas(framesStorage[framesStorage.length - 1].canvas);
  }

  if (framesStorage.length === 1) {
    delTool();
  }

  refreshFrames();
}

function dragAndDrop(frame) {
  function handleDragStart(e) {
    const frameNum = parseInt(e.target.getAttribute('id'), 10);

    frameArrElem = framesStorage.splice(frameNum - 1, 1);

    e.target.style.opacity = '0.4';

    dragSrcEl = e.target;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.style.order);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    e.target.classList.add('over');
  }

  function handleDragLeave(e) {
    e.target.classList.remove('over');
  }


  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    const frameNum = parseInt(e.target.getAttribute('id'), 10);

    framesStorage.splice(frameNum - 1, 0, ...frameArrElem);

    dragSrcEl.style.opacity = '1';

    if (dragSrcEl !== e.target) {
      dragSrcEl.style.order = e.target.style.order;
      e.target.style.order = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd() {
    framesStorage.forEach(e => e.frame.classList.remove('over'));
    refreshFrames();
  }

  frame.addEventListener('dragstart', handleDragStart, false);
  frame.addEventListener('dragenter', handleDragEnter, false);
  frame.addEventListener('dragover', handleDragOver, false);
  frame.addEventListener('dragleave', handleDragLeave, false);
  frame.addEventListener('drop', handleDrop, false);
  frame.addEventListener('dragend', handleDragEnd, false);
}

function copyFrame(e) {
  let frameNum;

  if (e.type === 'click') {
    frameNum = parseInt(e.target.parentNode.getAttribute('id'), 10);
  } else {
    frameNum = parseInt(e.getAttribute('id'), 10);
  }

  const copyElem = framesStorage.slice(frameNum - 1, frameNum);

  const cloneFrame = copyElem[0].frame.cloneNode(true);
  const cloneCarrierCanvas = copyElem[0].canvas[0].cloneNode(true);
  const cloneDrawCanvas = copyElem[0].canvas[1].cloneNode(true);

  const delBtn = cloneFrame.querySelector('.del-button');
  const copyBtn = cloneFrame.querySelector('.dubl-button');

  _frames__WEBPACK_IMPORTED_MODULE_1__["default"].addFrameListeners(delBtn, copyBtn, delFrame, copyFrame);

  dragAndDrop(cloneFrame);

  const carrierCtx = cloneCarrierCanvas.getContext('2d');
  const drawCtx = cloneDrawCanvas.getContext('2d');

  carrierCtx.drawImage(copyElem[0].canvas[0], 0, 0);

  _CanvasCreate__WEBPACK_IMPORTED_MODULE_2__["default"].addCanvasListeners(cloneDrawCanvas);

  chooseActiveFrame(cloneFrame);

  framesStorage.splice(frameNum, 0, {
    frame: cloneFrame,
    canvas: [
      cloneCarrierCanvas,
      cloneDrawCanvas,
    ],
    canvasListeners: addToolsListeners(carrierCtx, drawCtx, cloneCarrierCanvas),
  });

  if (currentToolName && activeButton) {
    addTool();
  }

  refreshFrames();

  refreshCanvas([cloneCarrierCanvas, cloneDrawCanvas]);
}

function chooseTool(button, tool) {
  delTool();

  activeButton = button;
  currentToolName = tool;

  addTool();
}

const chooseToolsStorage = {
  penTool() {
    chooseTool(penToolButton, 'penTool');
  },
  mirrorPenTool() {
    chooseTool(mirrorPenToolButton, 'mirrorPenTool');
  },
  eraserTool() {
    chooseTool(eraserToolButton, 'eraserTool');
  },
  lineTool() {
    chooseTool(lineToolButton, 'lineTool');
  },
  rectTool() {
    chooseTool(rectToolButton, 'rectTool');
  },
  fillRectTool() {
    chooseTool(fillRectToolButton, 'fillRectTool');
  },
  circleTool() {
    chooseTool(arcToolButton, 'arcTool');
  },
  lightenTool() {
    chooseTool(lightenToolButton, 'lightenTool');
  },
  colorPickerTool() {
    chooseTool(colorPickerToolButton, 'colorPickerTool');
  },
};

const toolsStorage = {
  penTool: { button: penToolButton, callback: chooseToolsStorage.penTool },
  mirrorPenTool: { button: mirrorPenToolButton, callback: chooseToolsStorage.mirrorPenTool },
  eraserTool: { button: eraserToolButton, callback: chooseToolsStorage.eraserTool },
  lineTool: { button: lineToolButton, callback: chooseToolsStorage.lineTool },
  rectTool: { button: rectToolButton, callback: chooseToolsStorage.rectTool },
  fillRectTool: { button: fillRectToolButton, callback: chooseToolsStorage.fillRectTool },
  arcTool: { button: arcToolButton, callback: chooseToolsStorage.circleTool },
  lightenTool: { button: lightenToolButton, callback: chooseToolsStorage.lightenTool },
  colorPickerTool: { button: colorPickerToolButton, callback: chooseToolsStorage.colorPickerTool },
};

Object.keys(toolsStorage).forEach((key) => {
  toolsStorage[key].button.addEventListener('click', toolsStorage[key].callback);
});

const keyCodes = {
  keyP: 80,
  keyV: 86,
  keyE: 69,
  keyL: 76,
  keyR: 82,
  keyC: 67,
  keyU: 85,
  keyO: 79,
  keyShift: 16,
  keyN: 78,
  keyX: 88,
  keyF: 70,
  keyPlus: 107,
  keyMinus: 109,
  keyTopArrow: 38,
  keyBottomArrow: 40,
  keyMinusFat: 219,
  keyPlusFat: 221,
  keyCtrl: 17,
};

function addToolsHotKeys() {
  const rectCombo = { keyR: false, keyCtrl: false };

  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case keyCodes.keyP:
        chooseToolsStorage.penTool();
        break;
      case keyCodes.keyV:
        chooseToolsStorage.mirrorPenTool();
        break;
      case keyCodes.keyE:
        chooseToolsStorage.eraserTool();
        break;
      case keyCodes.keyL:
        chooseToolsStorage.lineTool();
        break;
      case keyCodes.keyR:
        rectCombo.keyR = true;
        break;
      case keyCodes.keyC:
        chooseToolsStorage.circleTool();
        break;
      case keyCodes.keyU:
        chooseToolsStorage.lightenTool();
        break;
      case keyCodes.keyO:
        chooseToolsStorage.colorPickerTool();
        break;
      case keyCodes.keyCtrl:
        rectCombo.keyCtrl = true;
        break;
      default:
        break;
    }

    switch (true) {
      case (rectCombo.keyR && rectCombo.keyCtrl):
        chooseToolsStorage.fillRectTool();
        break;
      case (rectCombo.keyR && rectCombo.keyCtrl === false):
        chooseToolsStorage.rectTool();
        break;
      default:
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case keyCodes.keyR:
        rectCombo.keyR = false;
        break;
      case keyCodes.keyCtrl:
        rectCombo.keyCtrl = false;
        break;
      default:
        break;
    }
  });
}

function choosePrevFrame() {
  const frameNum = parseInt(activeFrame.getAttribute('id'), 10);

  if (frameNum > 1) {
    if (activeFrame) {
      activeFrame.classList.toggle('active-frame', false);
      activeFrame = framesStorage[frameNum - 2].frame;
      activeFrame.classList.toggle('active-frame', true);
    } else {
      activeFrame = framesStorage[frameNum - 2].frame;
      activeFrame.classList.toggle('active-frame', true);
    }

    refreshCanvas(framesStorage[frameNum - 2].canvas);
  }
}

function chooseNextFrame() {
  const frameNum = parseInt(activeFrame.getAttribute('id'), 10);

  if (frameNum < framesStorage.length) {
    if (activeFrame) {
      activeFrame.classList.toggle('active-frame', false);
      activeFrame = framesStorage[frameNum].frame;
      activeFrame.classList.toggle('active-frame', true);
    } else {
      activeFrame = framesStorage[frameNum].frame;
      activeFrame.classList.toggle('active-frame', true);
    }

    refreshCanvas(framesStorage[frameNum].canvas);
  }
}

addToolsHotKeys();

function addInterfaseHotKeys() {
  const copyFrameCombo = { keyShift: null, keyN: null };
  const fpsCombo = { keyF: null, keyPlus: null, keyMinus: null };

  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case keyCodes.keyShift:
        copyFrameCombo.keyShift = keyCodes.keyShift;
        break;
      case keyCodes.keyN:
        copyFrameCombo.keyN = keyCodes.keyN;
        break;
      case keyCodes.keyX:
        _AppHandles__WEBPACK_IMPORTED_MODULE_4__["default"].swapColor();
        break;
      case keyCodes.keyF:
        fpsCombo.keyF = keyCodes.keyF;
        break;
      case keyCodes.keyPlus:
        fpsCombo.keyPlus = keyCodes.keyPlus;
        break;
      case keyCodes.keyMinus:
        fpsCombo.keyMinus = keyCodes.keyMinus;
        break;
      case keyCodes.keyTopArrow:
        choosePrevFrame();
        break;
      case keyCodes.keyBottomArrow:
        chooseNextFrame();
        break;
      case keyCodes.keyMinusFat:
        fatHandle.value -= 1;
        currentFat.innerHTML = fatHandle.value;
        break;
      case keyCodes.keyPlusFat:
        fatHandle.value += 1;
        currentFat.innerHTML = fatHandle.value;
        break;
      default:
        break;
    }

    switch (true) {
      case (copyFrameCombo.keyShift === keyCodes.keyShift && copyFrameCombo.keyN === keyCodes.keyN):
        copyFrame(activeFrame);
        refreshAnimation();
        break;
      case (copyFrameCombo.keyShift === null && copyFrameCombo.keyN === keyCodes.keyN):
        addFrame();
        refreshAnimation();
        break;
      case (fpsCombo.keyF === keyCodes.keyF && fpsCombo.keyPlus === keyCodes.keyPlus):
        fpsHandle.value += 1;
        currentFps.innerHTML = fpsHandle.value;
        refreshAnimation();
        break;
      case (fpsCombo.keyF === keyCodes.keyF && fpsCombo.keyMinus === keyCodes.keyMinus):
        fpsHandle.value -= 1;
        currentFps.innerHTML = fpsHandle.value;
        refreshAnimation();
        break;
      default:
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case keyCodes.keyShift:
        copyFrameCombo.keyShift = null;
        break;
      case keyCodes.keyN:
        copyFrameCombo.keyN = null;
        break;
      case keyCodes.keyF:
        fpsCombo.keyF = null;
        break;
      case keyCodes.keyPlus:
        fpsCombo.keyPlus = null;
        break;
      case keyCodes.keyMinus:
        fpsCombo.keyMinus = null;
        break;
      default:
        break;
    }
  });
}

addInterfaseHotKeys();

framesWrap.addEventListener('mousedown', (e) => {
  const frameNum = parseInt(e.target.getAttribute('id'), 10);

  chooseActiveFrame(e.target);

  refreshCanvas(framesStorage[frameNum - 1].canvas);
}, true);

function toggleFullScreen() {
  if (!animationContainer.fullscreenElement) {
    animationContainer.requestFullscreen();
  } else if (animationContainer.exitFullscreen) {
    animationContainer.exitFullscreen();
  }
}

document.addEventListener('keydown', (e) => {
  const keyF11 = 122;

  if (e.keyCode === keyF11) {
    e.preventDefault();

    toggleFullScreen();
  }
}, false);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/tools/AddTools.js":
/*!*******************************!*\
  !*** ./src/tools/AddTools.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddTools; });
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
class AddTools {
  constructor() {
    this.mouseDown = false;
    this.activeTool = null;
  }

  static addPenTool(carrierCtx, color, fatHandle, framesStorage, carrierCanvas) {
    let mouseDown;

    const penToolDown = (e) => {
      mouseDown = true;

      carrierCtx.beginPath();
      carrierCtx.strokeStyle = color.value;
      carrierCtx.lineWidth = fatHandle.value;
      carrierCtx.moveTo(e.offsetX, e.offsetY);
    };

    const penToolMove = (e) => {
      if (!mouseDown) return;

      carrierCtx.lineTo(e.offsetX, e.offsetY);
      carrierCtx.stroke();
    };

    const penToolUp = (e) => {
      mouseDown = false;
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const penToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: penToolDown,
      mousemove: penToolMove,
      mouseup: penToolUp,
      mouseleave: penToolLeave,
    };
  }

  static addMirrorPenTool(carrierCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSize = document.querySelector('.canvas-size-handle');
    let mouseDown;

    const mirrorPenToolDown = () => {
      mouseDown = true;
      carrierCtx.fillStyle = color.value;
    };

    const mirrorPenToolMove = (e) => {
      if (!mouseDown) return;

      const fatSize = fatHandle.valueAsNumber;

      carrierCtx.fillRect(e.offsetX, e.offsetY, fatSize, fatSize);
      carrierCtx.fillRect(canvasSize.valueAsNumber - e.offsetX, e.offsetY, fatSize, fatSize);
    };

    const mirrorPenToolUp = (e) => {
      mouseDown = false;
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const mirrorPenToolLeave = () => {
      mouseDown = false;
    };

    const mirrorPenTool = {
      mousedown: mirrorPenToolDown,
      mousemove: mirrorPenToolMove,
      mouseup: mirrorPenToolUp,
      mouseleave: mirrorPenToolLeave,
    };

    return mirrorPenTool;
  }

  static addEraserTool(carrierCtx, fatHandle, framesStorage, carrierCanvas) {
    let mouseDown;

    const eraserToolDown = () => {
      mouseDown = true;

      carrierCtx.beginPath();
      carrierCtx.strokeStyle = '#fff';
      carrierCtx.fillStyle = '#fff';
      carrierCtx.lineWidth = fatHandle.value;
    };

    const eraserToolMove = (e) => {
      if (!mouseDown) return;

      const xCord = e.offsetX;
      const yCord = e.offsetY;

      carrierCtx.lineTo(xCord, yCord);
      carrierCtx.stroke();

      carrierCtx.beginPath();
      carrierCtx.arc(xCord, yCord, fatHandle.valueAsNumber / 2, 0, Math.PI * 2);
      carrierCtx.fill();

      carrierCtx.beginPath();
      carrierCtx.moveTo(xCord, yCord);
    };

    const eraserToolUp = (e) => {
      mouseDown = false;

      carrierCtx.beginPath();
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const eraserToolMouseLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: eraserToolDown,
      mousemove: eraserToolMove,
      mouseup: eraserToolUp,
      mouseleave: eraserToolMouseLeave,
    };
  }

  static addLineTool(carrierCtx, drawCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSizeHandle = document.querySelector('.canvas-size-handle');

    let mouseDown;
    let canvasSize;

    let startX;
    let startY;

    const lineToolDown = (e) => {
      mouseDown = true;

      startX = e.offsetX;
      startY = e.offsetY;

      carrierCtx.beginPath();
      carrierCtx.strokeStyle = color.value;
      carrierCtx.lineWidth = fatHandle.value;

      carrierCtx.moveTo(startX, startY);
    };

    const lineToolMove = (e) => {
      if (!mouseDown) return;

      canvasSize = canvasSizeHandle.valueAsNumber;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      drawCtx.beginPath();
      drawCtx.strokeStyle = color.value;
      drawCtx.lineWidth = fatHandle.value;
      drawCtx.moveTo(startX, startY);
      drawCtx.lineTo(e.offsetX, e.offsetY);
      drawCtx.stroke();
      drawCtx.closePath();
    };

    const lineToolUp = (e) => {
      mouseDown = false;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      carrierCtx.lineTo(e.offsetX, e.offsetY);
      carrierCtx.stroke();
      carrierCtx.closePath();
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const lineToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: lineToolDown,
      mousemove: lineToolMove,
      mouseup: lineToolUp,
      mouseleave: lineToolLeave,
    };
  }

  static addRectTool(carrierCtx, drawCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSizeHandle = document.querySelector('.canvas-size-handle');

    let canvasSize;
    let mouseDown;

    let startX;
    let startY;

    let fatSize;

    const rectToolDown = (e) => {
      mouseDown = true;

      startX = e.offsetX;
      startY = e.offsetY;

      carrierCtx.strokeStyle = color.value;
      drawCtx.strokeStyle = color.value;

      fatSize = fatHandle.value;

      carrierCtx.lineWidth = fatSize;
      drawCtx.lineWidth = fatSize;
    };

    const rectToolMove = (e) => {
      if (!mouseDown) return;

      const width = e.offsetX - startX;
      const height = e.offsetY - startY;

      canvasSize = canvasSizeHandle.valueAsNumber;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      drawCtx.strokeRect(startX, startY, width, height);
    };

    const rectToolUp = (e) => {
      mouseDown = false;

      const width = e.offsetX - startX;
      const height = e.offsetY - startY;

      carrierCtx.strokeRect(startX, startY, width, height);
      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const rectToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: rectToolDown,
      mousemove: rectToolMove,
      mouseup: rectToolUp,
      mouseleave: rectToolLeave,
    };
  }

  static addFillRectTool(carrierCtx, drawCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSizeHandle = document.querySelector('.canvas-size-handle');

    let canvasSize;
    let mouseDown;

    let startX;
    let startY;

    let fatSize;

    const fillRectToolDown = (e) => {
      mouseDown = true;

      startX = e.offsetX;
      startY = e.offsetY;

      carrierCtx.fillStyle = color.value;
      drawCtx.fillStyle = color.value;

      fatSize = fatHandle.value;

      carrierCtx.lineWidth = fatSize;
      drawCtx.lineWidth = fatSize;
    };

    const fillRectToolMove = (e) => {
      if (!mouseDown) return;

      const width = e.offsetX - startX;
      const height = e.offsetY - startY;

      canvasSize = canvasSizeHandle.valueAsNumber;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      drawCtx.fillRect(startX, startY, width, height);
    };

    const fillRectToolUp = (e) => {
      mouseDown = false;

      const width = e.offsetX - startX;
      const height = e.offsetY - startY;

      carrierCtx.fillRect(startX, startY, width, height);
      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const fillRectToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: fillRectToolDown,
      mousemove: fillRectToolMove,
      mouseup: fillRectToolUp,
      mouseleave: fillRectToolLeave,
    };
  }

  static addArcTool(carrierCtx, drawCtx, color, fatHandle, framesStorage, carrierCanvas) {
    const canvasSizeHandle = document.querySelector('.canvas-size-handle');

    let canvasSize;
    let mouseDown;

    let startX;
    let startY;

    let fatSize;

    function drawEllipse(x1, y1, x2, y2, ctx) {
      const radiusX = (x2 - x1) * 0.5;
      const radiusY = (y2 - y1) * 0.5;
      const centerX = x1 + radiusX;
      const centerY = y1 + radiusY;
      const step = 0.01;
      let a = step;
      const pi2 = Math.PI * 2 - step;

      ctx.beginPath();

      ctx.moveTo(centerX + radiusX * Math.cos(0),
        centerY + radiusY * Math.sin(0));

      for (; a < pi2; a += step) {
        ctx.lineTo(centerX + radiusX * Math.cos(a),
          centerY + radiusY * Math.sin(a));
      }

      ctx.closePath();
      ctx.stroke();
    }

    const arcToolDown = (e) => {
      mouseDown = true;

      startX = e.offsetX;
      startY = e.offsetY;

      carrierCtx.strokeStyle = color.value;
      drawCtx.strokeStyle = color.value;

      fatSize = fatHandle.value;

      carrierCtx.lineWidth = fatSize;
      drawCtx.lineWidth = fatSize;
    };

    const arcToolMove = (e) => {
      if (!mouseDown) return;

      canvasSize = canvasSizeHandle.valueAsNumber;

      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      drawEllipse(startX, startY, e.offsetX, e.offsetY, drawCtx);
    };

    const arcToolUp = (e) => {
      mouseDown = false;

      drawEllipse(startX, startY, e.offsetX, e.offsetY, carrierCtx);
      drawCtx.clearRect(0, 0, canvasSize, canvasSize);
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const arcToolLeave = () => {
      mouseDown = false;
    };

    return {
      mousedown: arcToolDown,
      mousemove: arcToolMove,
      mouseup: arcToolUp,
      mouseleave: arcToolLeave,
    };
  }

  static addLightenTool(carrierCtx, fatHandle, framesStorage, carrierCanvas) {
    const ctrlCode = 17;
    let fatSize;
    let mouseDown;

    const lightenToolDown = () => {
      mouseDown = true;

      carrierCtx.beginPath();
      carrierCtx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
      carrierCtx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      carrierCtx.lineWidth = fatHandle.value;
    };

    const lightenToolMove = (e) => {
      if (!mouseDown) return;

      fatSize = fatHandle.valueAsNumber;

      const xCord = e.offsetX;
      const yCord = e.offsetY;

      carrierCtx.lineTo(xCord, yCord);
      carrierCtx.stroke();

      carrierCtx.beginPath();
      carrierCtx.arc(xCord, yCord, fatSize / 2, 0, Math.PI * 2);
      carrierCtx.fill();

      carrierCtx.beginPath();
      carrierCtx.moveTo(xCord, yCord);
    };

    const lightenToolUp = (e) => {
      mouseDown = false;
      AddTools.addCanvasToFrameListener(e.target, framesStorage, carrierCanvas);
    };

    const lightenToolLeave = () => {
      mouseDown = false;
    };

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      if (e.keyCode === ctrlCode) {
        carrierCtx.fillStyle = 'rgba(0, 0, 0, 0.01)';
        carrierCtx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
      }
    });

    document.addEventListener('keyup', (e) => {
      e.preventDefault();

      if (e.keyCode === ctrlCode) {
        carrierCtx.fillStyle = 'rgba(255, 255, 255, 0.01)';
        carrierCtx.strokeStyle = 'rgba(255, 255, 255, 0.01)';
      }
    });

    return {
      mousedown: lightenToolDown,
      mousemove: lightenToolMove,
      mouseup: lightenToolUp,
      mouseleave: lightenToolLeave,
    };
  }

  static addColorPickerTool(carrierCtx, color) {
    const colorPickerToolClick = (e) => {
      const pixelData = carrierCtx.getImageData(e.offsetX, e.offsetY, 1, 1);

      const rChanel = pixelData.data[0];
      const gChanel = pixelData.data[1];
      const bChanel = pixelData.data[2];

      function componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      }

      function rgbToHex(r, g, b) {
        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
      }

      color.value = rgbToHex(rChanel, gChanel, bChanel);
    };

    return {
      click: colorPickerToolClick,
    };
  }

  static addCanvasToFrameListener(eventTarget, framesStorage, carrierCanvas) {
    const currentCanvasId = parseInt(eventTarget.getAttribute('id'), 10);
    const currentFrame = document.getElementById(`${currentCanvasId}-frame`);
    const framesWrap = document.querySelector('.frames-wrapper');

    const canvasImg = carrierCanvas.toDataURL();

    currentFrame.style.backgroundImage = `url(${canvasImg})`;
    framesStorage[currentCanvasId - 1].frame = currentFrame;
    framesStorage[currentCanvasId - 1].canvasImg = canvasImg;

    framesWrap.innerHTML = '';

    framesStorage.forEach((elem) => {
      framesWrap.appendChild(elem.frame);
    });
  }
}


/***/ }),

/***/ "./src/tools/assets/arc-tool.png":
/*!***************************************!*\
  !*** ./src/tools/assets/arc-tool.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f5a8fb08eb6f91efd82a996d582a1ddd.png";

/***/ }),

/***/ "./src/tools/assets/color-picker-tool.png":
/*!************************************************!*\
  !*** ./src/tools/assets/color-picker-tool.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e55018a639c6183d8487cd1fcdd38268.png";

/***/ }),

/***/ "./src/tools/assets/eraser-tool.png":
/*!******************************************!*\
  !*** ./src/tools/assets/eraser-tool.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6e1e8ac93c625aaba62afb07f83b0f7b.png";

/***/ }),

/***/ "./src/tools/assets/fill-rect-tool.png":
/*!*********************************************!*\
  !*** ./src/tools/assets/fill-rect-tool.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "54dbab22164687d37f13fdd996cf5e01.png";

/***/ }),

/***/ "./src/tools/assets/lighten-tool.png":
/*!*******************************************!*\
  !*** ./src/tools/assets/lighten-tool.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a24d6b41a6f4c4bf8d861911179bc197.png";

/***/ }),

/***/ "./src/tools/assets/line-tool.png":
/*!****************************************!*\
  !*** ./src/tools/assets/line-tool.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "dbfe906dc7b6771b82b47b4b562a1ccb.png";

/***/ }),

/***/ "./src/tools/assets/mirror-pen-tool.png":
/*!**********************************************!*\
  !*** ./src/tools/assets/mirror-pen-tool.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "280fa5eef3851dcabf787fee0f0d99ec.png";

/***/ }),

/***/ "./src/tools/assets/pen-tool.png":
/*!***************************************!*\
  !*** ./src/tools/assets/pen-tool.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "12120103fef7e1a5d147dfe235422744.png";

/***/ }),

/***/ "./src/tools/assets/rect-tool.png":
/*!****************************************!*\
  !*** ./src/tools/assets/rect-tool.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8653a80137cecab23a924c19742097ac.png";

/***/ }),

/***/ "./src/tools/index.js":
/*!****************************!*\
  !*** ./src/tools/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddTools */ "./src/tools/AddTools.js");
/* harmony import */ var _tools_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools.css */ "./src/tools/tools.css");
/* harmony import */ var _tools_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tools_css__WEBPACK_IMPORTED_MODULE_1__);



/* harmony default export */ __webpack_exports__["default"] = (_AddTools__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/tools/tools.css":
/*!*****************************!*\
  !*** ./src/tools/tools.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./tools.css */ "./node_modules/css-loader/dist/cjs.js!./src/tools/tools.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!./tools.css */ "./node_modules/css-loader/dist/cjs.js!./src/tools/tools.css", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./tools.css */ "./node_modules/css-loader/dist/cjs.js!./src/tools/tools.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1lcy9mcmFtZXMuY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xzL3Rvb2xzLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS91cmwtZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9BbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEhhbmRsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhbnZhc0NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL1NvdXJjZVNhbnNQcm8tUmVndWxhci50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9zb3VyY2VzYW5zcHJvLXJlZ3VsYXItd2ViZm9udC53b2ZmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvc291cmNlc2Fuc3Byby1yZWd1bGFyLXdlYmZvbnQud29mZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1lcy9GcmFtZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWVzL2ZyYW1lcy5jc3M/YzI5NSIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzPzhmMzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xzL0FkZFRvb2xzLmpzIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvYXJjLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvY29sb3ItcGlja2VyLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvZXJhc2VyLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvZmlsbC1yZWN0LXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvbGlnaHRlbi10b29sLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHMvYXNzZXRzL2xpbmUtdG9vbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xzL2Fzc2V0cy9taXJyb3ItcGVuLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvcGVuLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvcmVjdC10b29sLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xzL3Rvb2xzLmNzcz8xYWFiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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TUFBTTtBQUM1QztBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUMsSUFBSTtBQUM3QyxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLElBQUk7QUFDbEQsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEVBQUUsK0NBQVc7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxFQUFFLHFEQUFZOztBQUVkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtB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QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLElBQUk7QUFDMUM7O0FBRUE7QUFDQSxtQkFBbUIsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCO0FBQzdFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRCxnQkFBZ0I7QUFDcEU7O0FBRUE7O0FBRUEsZ0RBQWdELFVBQVU7QUFDMUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xmQSxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7OztBQ0F4QyxpQkFBaUIscUJBQXVCLDBDOzs7Ozs7Ozs7Ozs7QUNBeEM7QUFBQTtBQUFBO0FBQUE7QUFBa0M7QUFDYjs7QUFFTixnSEFBUSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDRnhCLGNBQWMsbUJBQU8sQ0FBQywySEFBeUQ7O0FBRS9FLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxzR0FBbUQ7O0FBRXhFOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQiwySEFBeUQ7QUFDNUUsbUJBQW1CLG1CQUFPLENBQUMsMkhBQXlEOztBQUVwRixvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiMjhkZDQ1N2M4M2UwODMyMjc0MjhcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwiYXBwXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2luZGV4LmpzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5mcmFtZS13cmFwIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbiAgd2lkdGg6IDE4MHB4O1xcbiAgaGVpZ2h0OiAxODBweDtcXG4gIG1hcmdpbjogNXB4IDA7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmV5O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbiAgYm94LXNoYWRvdzogMCAycHggNXB4IDAgIzgwODA4MDtcXG4gIC8qIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkOyAqL1xcbn1cXG5cXG4uZnJhbWUtd3JhcC5vdmVyIHtcXG4gIGJvcmRlcjogMnB4IGRhc2hlZCAjMDAwO1xcbn1cXG5cXG4uZnJhbWVzLXdyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5hZGQtYnV0dG9uIHtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxODBweDtcXG4gIGhlaWdodDogNTBweDtcXG4gIG1hcmdpbjogNXB4IDA7XFxuICBjb2xvcjogZ3JheTtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyYXk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwIDJweCA1cHggMCAjODA4MDgwO1xcbn1cXG5cXG4uZnJhbWUtYnRuIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcbiAgY29sb3I6IGdyYXk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTg5LCAxODksIDE4OSk7XFxuICBib3JkZXItcmFkaXVzOiA1JTtcXG59XFxuXFxuLmFjdGl2ZS1mcmFtZSB7XFxuICBib3JkZXI6IDJweCBzb2xpZCB5ZWxsb3c7XFxufVxcblxcbi5mcmFtZS1udW0ge1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcXG59XFxuXFxuLmRlbC1idXR0b24ge1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxufVxcblxcbi5kdWJsLWJ1dHRvbiB7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG59XFxuXCIsIFwiXCJdKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gSW1wb3J0c1xudmFyIHVybEVzY2FwZSA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvdXJsLWVzY2FwZS5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzBfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL2ZvbnRzL3NvdXJjZXNhbnNwcm8tcmVndWxhci13ZWJmb250LndvZmYyXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzFfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL2ZvbnRzL3NvdXJjZXNhbnNwcm8tcmVndWxhci13ZWJmb250LndvZmZcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMl9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9hc3NldHMvZm9udHMvU291cmNlU2Fuc1Byby1SZWd1bGFyLnR0ZlwiKSk7XG5cbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIlNvdXJjZSBTYW5zIFByb1xcXCI7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzBfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmMlxcXCIpLFxcbiAgICAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzFfX18gKyBcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksXFxuICAgICAgIHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMl9fXyArIFwiKSBmb3JtYXQoXFxcInR0ZlxcXCIpO1xcbn1cXG5cXG4vKi1HbG9iYWwtKi9cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDM1cHggOTJ2aDtcXG4gIGdyaWQtcm93LWdhcDogMjBweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiU291cmNlIFNhbnMgUHJvXFxcIiwgXFxcIlJvYm90b1xcXCIsIHNhbnMtc2VyaWY7XFxufVxcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogNDBweDtcXG4gIG9wYWNpdHk6IDAuOTtcXG59XFxuXFxuLyo9PT09PT09PT09PT1IRUFERVI9PT09PT09PT09PT0qL1xcblxcbi5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMzVweDtcXG4gIHBhZGRpbmc6IDAgMjBweDtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAwICM4MDgwODA7XFxufVxcblxcbi8qPT09PT09PT09PT09TUFJTj09PT09PT09PT09PSovXFxuXFxuLm1haW4ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMTAwcHggMjAwcHggMWZyIDIxMHB4IDUwcHg7XFxuICBncmlkLWNvbHVtbi1nYXA6IDIwcHg7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxufVxcblxcbi5maXJzdC1jb2x1bW4td3JhcCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyMGZyIDJmcjtcXG59XFxuXFxuLmZyYW1lcy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG59XFxuXFxuLmNhbnZhcy13cmFwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5jYW52YXMtY29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmNhbnZhcy1pdGVtIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB6LWluZGV4OiAwO1xcbiAgaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWQ7XFxuICBib3gtc2hhZG93OiAwIDJweCA1cHggMCAjODA4MDgwO1xcbn1cXG5cXG4uY2FudmFzLWRyYXctaXRlbSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMTtcXG4gIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbiAgYm94LXNoYWRvdzogMCAycHggNXB4IDAgIzgwODA4MDtcXG59XFxuXFxuLmFuaW1hdGlvbi13cmFwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmFuaW1hdGlvbi1jb250YWluZXIge1xcbiAgd2lkdGg6IDIxMHB4O1xcbiAgaGVpZ2h0OiAyMTBweDtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAwICM4MDgwODA7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5hbmltYXRpb24tY29udGFpbmVyOmZ1bGxzY3JlZW4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZDtcXG59XFxuXFxuLmNvbnRyb2xsZXItcGFuZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNXB4IDAgIzgwODA4MDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuLmN1cnJlbnQtY29udHJvbGxlci12YWx1ZSBzcGFuIHtcXG4gIGNvbG9yOiByZWQ7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXG59XFxuXFxuLmRhdGEtY29udGFpbmVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBJbXBvcnRzXG52YXIgdXJsRXNjYXBlID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS91cmwtZXNjYXBlLmpzXCIpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMF9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9hc3NldHMvcGVuLXRvb2wucG5nXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzFfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL21pcnJvci1wZW4tdG9vbC5wbmdcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fMl9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9hc3NldHMvZXJhc2VyLXRvb2wucG5nXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzNfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL2xpbmUtdG9vbC5wbmdcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fNF9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9hc3NldHMvcmVjdC10b29sLnBuZ1wiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX181X19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuL2Fzc2V0cy9maWxsLXJlY3QtdG9vbC5wbmdcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fNl9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9hc3NldHMvYXJjLXRvb2wucG5nXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzdfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL2xpZ2h0ZW4tdG9vbC5wbmdcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fOF9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9hc3NldHMvY29sb3ItcGlja2VyLXRvb2wucG5nXCIpKTtcblxuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudG9vbHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoNSwgNDVweCkgLyAxZnIgMWZyO1xcbiAgZ3JpZC1nYXA6IDVweDtcXG59XFxuXFxuLnRvb2wtaXRlbSB7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtc2l6ZTogNzAlO1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLnRvb2wtaXRlbTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjM1LCAyMzUsIDIzNSk7XFxufVxcblxcbi50b29sLWl0ZW06YWN0aXZlIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggM3B4IDAgZ3JheTtcXG59XFxuXFxuLmFjdGl2ZS10b29sIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggM3B4IDAgZ3JheTtcXG59XFxuXFxuXFxuXFxuLnBlbi10b29sIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fMF9fXyArIFwiKTtcXG59XFxuXFxuLm1pcnJvci1wZW4tdG9vbCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzFfX18gKyBcIik7XFxufVxcblxcbi5lcmFzZXItdG9vbCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzJfX18gKyBcIik7XFxufVxcblxcbi5saW5lLXRvb2wge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18zX19fICsgXCIpO1xcbn1cXG5cXG4ucmVjdC10b29sIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fNF9fXyArIFwiKTtcXG59XFxuXFxuLmZpbGwtcmVjdC10b29sIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fNV9fXyArIFwiKTtcXG59XFxuXFxuLmFyYy10b29sIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fNl9fXyArIFwiKTtcXG59XFxuXFxuLmxpZ2h0ZW4tdG9vbCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzdfX18gKyBcIik7XFxufVxcblxcbi5jb2xvci1waWNrZXItdG9vbCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzhfX18gKyBcIik7XFxufVxcblwiLCBcIlwiXSk7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZVNvdXJjZU1hcCkge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiAnQG1lZGlhICcgKyBpdGVtWzJdICsgJ3snICsgY29udGVudCArICd9JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG4gICAgICAvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuICAgICAgLy8gd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXG4gICAgICBpZiAoaXRlbVswXSA9PSBudWxsIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSAnKCcgKyBpdGVtWzJdICsgJykgYW5kICgnICsgbWVkaWFRdWVyeSArICcpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJztcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59IC8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcblxuXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcbiAgdmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcbiAgcmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlc2NhcGUodXJsLCBuZWVkUXVvdGVzKSB7XG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB1cmw7XG4gIH0gLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSB8fCBuZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuICdcIicgKyB1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSArICdcIic7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb24ge1xuICBzdGF0aWMgc3RhcnRBbmltYXRpb24oZnJhbWVzU3RvcmFnZSkge1xuICAgIGNvbnN0IGFuaW1hdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRpb24tY29udGFpbmVyJyk7XG4gICAgY29uc3QgZnBzSGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZwcy1oYW5kbGUnKTtcblxuICAgIGxldCBpdGVtc0NvdW50ID0gMDtcblxuICAgIGNvbnN0IGZwc0NvdW50ID0gZnBzSGFuZGxlLnZhbHVlQXNOdW1iZXI7XG5cbiAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKGl0ZW1zQ291bnQgPCBmcmFtZXNTdG9yYWdlLmxlbmd0aCkge1xuICAgICAgICBhbmltYXRpb25Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ZyYW1lc1N0b3JhZ2VbaXRlbXNDb3VudF0uY2FudmFzSW1nfSlgO1xuICAgICAgICBpdGVtc0NvdW50ICs9IDE7XG5cbiAgICAgICAgaWYgKGl0ZW1zQ291bnQgPT09IGZyYW1lc1N0b3JhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgaXRlbXNDb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAxMDAwIC8gZnBzQ291bnQpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGcHNIYW5kbGUge1xuICBzdGF0aWMgYWRkRnBzSGFuZGxlKCkge1xuICAgIGNvbnN0IGN1cnJlbnRGcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZnBzJyk7XG4gICAgY29uc3QgZnBzSGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZwcy1oYW5kbGUnKTtcblxuICAgIGZwc0hhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIGN1cnJlbnRGcHMuaW5uZXJIVE1MID0gZnBzSGFuZGxlLnZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZEZhdEhhbmRsZSgpIHtcbiAgICBjb25zdCBjdXJyZW50RmF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZhdCcpO1xuICAgIGNvbnN0IGZhdEhhbmRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXQtaGFuZGxlJyk7XG5cbiAgICBmYXRIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICBjdXJyZW50RmF0LmlubmVySFRNTCA9IGZhdEhhbmRsZS52YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBzd2FwQ29sb3IoKSB7XG4gICAgY29uc3QgY29sb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29sb3ItMScpO1xuICAgIGNvbnN0IGNvbG9yMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb2xvci0yJyk7XG5cbiAgICBjb25zdCBjb2xvclN0b3JhZ2UgPSBjb2xvci52YWx1ZTtcbiAgICBjb25zdCBjb2xvclN0b3JhZ2UyID0gY29sb3IyLnZhbHVlO1xuXG4gICAgY29sb3IudmFsdWUgPSBjb2xvclN0b3JhZ2UyO1xuICAgIGNvbG9yMi52YWx1ZSA9IGNvbG9yU3RvcmFnZTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkQ2FudmFzIHtcbiAgY29uc3RydWN0b3Ioc2l6ZSwgc2NhbGVDb2VmLCBzaGlmdENvZWYpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuc2NhbGVDb2VmID0gc2NhbGVDb2VmO1xuICAgIHRoaXMuc2hpZnRDb2VmID0gc2hpZnRDb2VmO1xuICAgIHRoaXMuY3VycmVudFRvb2wgPSBudWxsO1xuICAgIHRoaXMuYWN0aXZlQnV0dG9uID0gbnVsbDtcbiAgfVxuXG4gIGNyZWF0ZUNhbnZhcyhjbGFzc05hbWUpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NOYW1lKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMuc2l6ZSk7XG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5zaXplKTtcblxuICAgIGNhbnZhcy5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHt0aGlzLnNjYWxlQ29lZn0pYDtcbiAgICBjYW52YXMuc3R5bGUudG9wID0gYCR7dGhpcy5zaGlmdENvZWZ9cHhgO1xuICAgIGNhbnZhcy5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5zaGlmdENvZWZ9cHhgO1xuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxuXG4gIHN0YXRpYyBhZGRDYW52YXNMaXN0ZW5lcnMoZHJhd0NhbnZhcykge1xuICAgIGNvbnN0IGN1cnNvckNvcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvcmRzLWN1cnNvcicpO1xuXG4gICAgZHJhd0NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgICAgY3Vyc29yQ29yZHMuaW5uZXJIVE1MID0gYHk6ICR7ZS5vZmZzZXRZfSwgeDogJHtlLm9mZnNldFh9YDtcbiAgICB9KTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiM2Y0ODIzMjFiZWNmYWE0MGZjYjE5ODI1ZmE3MTc4NTkudHRmXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYTczZWExMjczMWIwYWZkODliZjg3YjgwM2JjYWM1ZTcud29mZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImQxM2RlMDlmNDI1NmY2NTkzZDQ3ZTFkNmRmNDlmODA4LndvZmYyXCI7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlYXRlRnJhbWUge1xuICBzdGF0aWMgY3JlYXRlRnJhbWUoZnJhbWVOdW1iZXIsIGRlbENhbGxiYWNrLCBjb3B5Q2FsbGJhY2spIHtcbiAgICBjb25zdCBmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29uc3QgZnJhbWVOdW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBkZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb25zdCBjb3B5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgICBmcmFtZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZyYW1lLXdyYXAnKTtcbiAgICBmcmFtZS5zdHlsZS5vcmRlciA9IGZyYW1lTnVtYmVyO1xuICAgIGZyYW1lLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcblxuICAgIGZyYW1lTnVtLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZnJhbWUtYnRuIGZyYW1lLW51bScpO1xuICAgIGZyYW1lTnVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gICAgZGVsQnRuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZnJhbWUtYnRuIGRlbC1idXR0b24nKTtcbiAgICBjb3B5QnRuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZnJhbWUtYnRuIGR1YmwtYnV0dG9uJyk7XG5cbiAgICBmcmFtZU51bS5pbm5lckhUTUwgPSBmcmFtZU51bWJlcjtcbiAgICBkZWxCdG4uaW5uZXJIVE1MID0gJ0RlbCc7XG4gICAgY29weUJ0bi5pbm5lckhUTUwgPSAnQ29weSc7XG5cbiAgICBDcmVhdGVGcmFtZS5hZGRGcmFtZUxpc3RlbmVycyhkZWxCdG4sIGNvcHlCdG4sIGRlbENhbGxiYWNrLCBjb3B5Q2FsbGJhY2spO1xuXG4gICAgZnJhbWUuYXBwZW5kQ2hpbGQoZnJhbWVOdW0pO1xuICAgIGZyYW1lLmFwcGVuZENoaWxkKGRlbEJ0bik7XG4gICAgZnJhbWUuYXBwZW5kQ2hpbGQoY29weUJ0bik7XG5cbiAgICByZXR1cm4gZnJhbWU7XG4gIH1cblxuICBzdGF0aWMgYWRkRnJhbWVMaXN0ZW5lcnMoZGVsLCBjb3B5LCBkZWxDYWxsYmFjaywgY29weUNhbGxiYWNrKSB7XG4gICAgZGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsQ2FsbGJhY2ssIGZhbHNlKTtcbiAgICBjb3B5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29weUNhbGxiYWNrLCBmYWxzZSk7XG4gIH1cbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2ZyYW1lcy5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZnJhbWVzLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZnJhbWVzLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImltcG9ydCBDcmVhdGVGcmFtZSBmcm9tICcuL0ZyYW1lQ3JlYXRlJztcbmltcG9ydCAnLi9mcmFtZXMuY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlRnJhbWU7XG4iLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBDcmVhdGVGcmFtZSBmcm9tICcuL2ZyYW1lcyc7XG5pbXBvcnQgQ2FudmFzQ3JlYXRlIGZyb20gJy4vQ2FudmFzQ3JlYXRlJztcbmltcG9ydCBBZGRUb29scyBmcm9tICcuL3Rvb2xzJztcbmltcG9ydCBIYW5kbGVzIGZyb20gJy4vQXBwSGFuZGxlcyc7XG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4vQW5pbWF0aW9uJztcblxuY29uc3QgZnJhbWVzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyYW1lcy1jb250YWluZXInKTtcbmNvbnN0IGNhbnZhc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW52YXMtY29udGFpbmVyJyk7XG5jb25zdCBhbmltYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uLWNvbnRhaW5lcicpO1xuXG5jb25zdCBmcmFtZXNXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5mcmFtZXNXcmFwLmNsYXNzTGlzdC5hZGQoJ2ZyYW1lcy13cmFwcGVyJyk7XG5cbmNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuY29uc3QgZnBzSGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZwcy1oYW5kbGUnKTtcbmNvbnN0IGN1cnJlbnRGcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZnBzJyk7XG5jb25zdCBjYW52YXNTaXplSGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZhcy1zaXplLWhhbmRsZScpO1xuY29uc3QgY2FudmFzU2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMtc2l6ZScpO1xuXG5jb25zdCBjb2xvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb2xvci0xJyk7XG5jb25zdCBmYXRIYW5kbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF0LWhhbmRsZScpO1xuY29uc3QgY3VycmVudEZhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYXQnKTtcblxuXG5jb25zdCBzd2FwQ29sb3JCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3dhcC1jb2xvcicpO1xuXG5jb25zdCBwZW5Ub29sQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBlbi10b29sJyk7XG5jb25zdCBtaXJyb3JQZW5Ub29sQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pcnJvci1wZW4tdG9vbCcpO1xuY29uc3QgZXJhc2VyVG9vbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcmFzZXItdG9vbCcpO1xuY29uc3QgbGluZVRvb2xCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGluZS10b29sJyk7XG5jb25zdCByZWN0VG9vbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWN0LXRvb2wnKTtcbmNvbnN0IGZpbGxSZWN0VG9vbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWxsLXJlY3QtdG9vbCcpO1xuY29uc3QgYXJjVG9vbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcmMtdG9vbCcpO1xuY29uc3QgbGlnaHRlblRvb2xCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlnaHRlbi10b29sJyk7XG5jb25zdCBjb2xvclBpY2tlclRvb2xCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3ItcGlja2VyLXRvb2wnKTtcblxubGV0IGFuaW1hdGlvblRpbWVyO1xuXG5jb25zdCBmcmFtZXNTdG9yYWdlID0gW107XG5cbmxldCBhY3RpdmVGcmFtZTtcblxubGV0IGRyYWdTcmNFbCA9IG51bGw7XG5sZXQgZnJhbWVBcnJFbGVtID0gbnVsbDtcblxubGV0IGFjdGl2ZUJ1dHRvbjtcbmxldCBjdXJyZW50VG9vbE5hbWU7XG5cbmxldCBzY2FsZUNvZWY7XG5sZXQgc2hpZnRDb2VmO1xuXG5mdW5jdGlvbiBhZGRGcmFtZSgpIHtcbiAgY29uc3QgZnJhbWUgPSBDcmVhdGVGcmFtZS5jcmVhdGVGcmFtZShmcmFtZXNTdG9yYWdlLmxlbmd0aCArIDEsIGRlbEZyYW1lLCBjb3B5RnJhbWUpO1xuICBjb25zdCBjYW52YXNPYmogPSBuZXcgQ2FudmFzQ3JlYXRlKGNhbnZhc1NpemVIYW5kbGUudmFsdWUsIHNjYWxlQ29lZiwgc2hpZnRDb2VmKTtcbiAgY29uc3QgY2FycmllckNhbnZhcyA9IGNhbnZhc09iai5jcmVhdGVDYW52YXMoJ2NhbnZhcy1pdGVtJyk7XG4gIGNvbnN0IGRyYXdDYW52YXMgPSBjYW52YXNPYmouY3JlYXRlQ2FudmFzKCdjYW52YXMtZHJhdy1pdGVtJyk7XG5cbiAgY29uc3QgY2FycmllckN0eCA9IGNhcnJpZXJDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgY29uc3QgZHJhd0N0eCA9IGRyYXdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICBDYW52YXNDcmVhdGUuYWRkQ2FudmFzTGlzdGVuZXJzKGRyYXdDYW52YXMpO1xuXG4gIGRyYWdBbmREcm9wKGZyYW1lKTtcblxuICByZWZyZXNoQ2FudmFzKFtjYXJyaWVyQ2FudmFzLCBkcmF3Q2FudmFzXSk7XG5cbiAgZnJhbWVzU3RvcmFnZS5wdXNoKHtcbiAgICBmcmFtZTogZnJhbWUsXG4gICAgY2FudmFzOiBbXG4gICAgICBjYXJyaWVyQ2FudmFzLFxuICAgICAgZHJhd0NhbnZhcyxcbiAgICBdLFxuICAgIGNhbnZhc0xpc3RlbmVyczogYWRkVG9vbHNMaXN0ZW5lcnMoY2FycmllckN0eCwgZHJhd0N0eCwgY2FycmllckNhbnZhcyksXG4gIH0pO1xuXG4gIGlmIChjdXJyZW50VG9vbE5hbWUgJiYgYWN0aXZlQnV0dG9uKSB7XG4gICAgYWRkVG9vbCgpO1xuICB9IGVsc2Uge1xuICAgIGFjdGl2ZUJ1dHRvbiA9IHBlblRvb2xCdXR0b247XG4gICAgY3VycmVudFRvb2xOYW1lID0gJ3BlblRvb2wnO1xuXG4gICAgYWRkVG9vbCgpO1xuICB9XG5cbiAgY29uc3QgZnJhbWVTdG9yYWdlTGVuZ3RoID0gZnJhbWVzU3RvcmFnZS5sZW5ndGg7XG5cbiAgZnJhbWVzU3RvcmFnZVtmcmFtZVN0b3JhZ2VMZW5ndGggLSAxXS5mcmFtZS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7ZnJhbWVTdG9yYWdlTGVuZ3RofS1mcmFtZWApO1xuICBmcmFtZXNTdG9yYWdlW2ZyYW1lU3RvcmFnZUxlbmd0aCAtIDFdLmNhbnZhc1swXS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7ZnJhbWVTdG9yYWdlTGVuZ3RofS1jYW52YXNgKTtcbiAgZnJhbWVzU3RvcmFnZVtmcmFtZVN0b3JhZ2VMZW5ndGggLSAxXS5jYW52YXNbMV0uc2V0QXR0cmlidXRlKCdpZCcsIGAke2ZyYW1lU3RvcmFnZUxlbmd0aH0tZHJhdy1jYW52YXNgKTtcblxuICBmcmFtZXNTdG9yYWdlLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICBpZiAoZnJhbWVzU3RvcmFnZS5sZW5ndGggLSAxID09PSBpKSB7XG4gICAgICBhY3RpdmVGcmFtZSA9IGUuZnJhbWU7XG4gICAgICBlLmZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLmZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmcmFtZXNXcmFwLmFwcGVuZENoaWxkKGUuZnJhbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVmcmVzaEFuaW1hdGlvbigpIHtcbiAgaWYgKGFuaW1hdGlvblRpbWVyKSB7XG4gICAgY2xlYXJJbnRlcnZhbChhbmltYXRpb25UaW1lcik7XG4gIH1cbiAgYW5pbWF0aW9uVGltZXIgPSBBbmltYXRpb24uc3RhcnRBbmltYXRpb24oZnJhbWVzU3RvcmFnZSk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZUNhbnZhcygpIHtcbiAgY29uc3QgY2FudmFzRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FudmFzLWl0ZW0nKTtcbiAgY29uc3QgY2FudmFzRHJhd0ZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZhcy1kcmF3LWl0ZW0nKTtcbiAgY29uc3Qgc2l6ZUNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXplLWNhbnZhcycpO1xuXG4gIHNjYWxlQ29lZiA9ICsoKDgwMCAvIGNhbnZhc1NpemVIYW5kbGUudmFsdWVBc051bWJlcikudG9GaXhlZCgyKSk7XG4gIHNoaWZ0Q29lZiA9ICg4MDAgLSBjYW52YXNTaXplSGFuZGxlLnZhbHVlQXNOdW1iZXIpIC8gMjtcblxuICBjYW52YXNGaWVsZC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzY2FsZUNvZWZ9KWA7XG4gIGNhbnZhc0RyYXdGaWVsZC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzY2FsZUNvZWZ9KWA7XG5cbiAgY2FudmFzU2l6ZS5pbm5lckhUTUwgPSBjYW52YXNTaXplSGFuZGxlLnZhbHVlO1xuICBzaXplQ2FudmFzLmlubmVySFRNTCA9IGAke2NhbnZhc1NpemVIYW5kbGUudmFsdWV9IHggJHtjYW52YXNTaXplSGFuZGxlLnZhbHVlfWA7XG5cbiAgZnJhbWVzU3RvcmFnZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgY29uc3QgY2FudmFzSXRlbSA9IGVsZW0uY2FudmFzWzBdO1xuICAgIGNvbnN0IGNhbnZhc0l0ZW0xID0gZWxlbS5jYW52YXNbMV07XG5cbiAgICBjYW52YXNJdGVtLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBjYW52YXNTaXplSGFuZGxlLnZhbHVlKTtcbiAgICBjYW52YXNJdGVtLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgY2FudmFzU2l6ZUhhbmRsZS52YWx1ZSk7XG5cbiAgICBjYW52YXNJdGVtMS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgY2FudmFzU2l6ZUhhbmRsZS52YWx1ZSk7XG4gICAgY2FudmFzSXRlbTEuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBjYW52YXNTaXplSGFuZGxlLnZhbHVlKTtcblxuICAgIGNhbnZhc0l0ZW0uc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c2NhbGVDb2VmfSlgO1xuICAgIGNhbnZhc0l0ZW0uc3R5bGUubGVmdCA9IGAke3NoaWZ0Q29lZn1weGA7XG4gICAgY2FudmFzSXRlbS5zdHlsZS50b3AgPSBgJHtzaGlmdENvZWZ9cHhgO1xuICAgIGNhbnZhc0l0ZW0xLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke3NjYWxlQ29lZn0pYDtcbiAgICBjYW52YXNJdGVtMS5zdHlsZS5sZWZ0ID0gYCR7c2hpZnRDb2VmfXB4YDtcbiAgICBjYW52YXNJdGVtMS5zdHlsZS50b3AgPSBgJHtzaGlmdENvZWZ9cHhgO1xuXG4gICAgY29uc3QgY3R4ID0gY2FudmFzSXRlbS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IGVsZW0uY2FudmFzSW1nO1xuXG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRGcmFtZSk7XG5cbiAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVmcmVzaEFuaW1hdGlvbik7XG4gIGZwc0hhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHJlZnJlc2hBbmltYXRpb24pO1xuXG4gIGNhbnZhc1NpemVIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCByZXNpemVDYW52YXMpO1xuXG4gIEhhbmRsZXMuYWRkRnBzSGFuZGxlKCk7XG4gIEhhbmRsZXMuYWRkRmF0SGFuZGxlKCk7XG4gIHN3YXBDb2xvckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEhhbmRsZXMuc3dhcENvbG9yKCkpO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGUpID0+IHtcbiAgICBpZiAoZS5kZWx0YVkgPiAwICYmIGNhbnZhc1NpemVIYW5kbGUudmFsdWVBc051bWJlciA+PSAzMikge1xuICAgICAgY2FudmFzU2l6ZUhhbmRsZS52YWx1ZUFzTnVtYmVyIC09IDEwO1xuICAgICAgY2FudmFzU2l6ZS5pbm5lckhUTUwgPSBjYW52YXNTaXplSGFuZGxlLnZhbHVlO1xuICAgICAgcmVzaXplQ2FudmFzKCk7XG4gICAgfVxuXG4gICAgaWYgKGUuZGVsdGFZIDwgMCAmJiBjYW52YXNTaXplSGFuZGxlLnZhbHVlQXNOdW1iZXIgPD0gODAwKSB7XG4gICAgICBjYW52YXNTaXplSGFuZGxlLnZhbHVlQXNOdW1iZXIgKz0gMTA7XG4gICAgICBjYW52YXNTaXplLmlubmVySFRNTCA9IGNhbnZhc1NpemVIYW5kbGUudmFsdWU7XG4gICAgICByZXNpemVDYW52YXMoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydEFwcCgpIHtcbiAgYWRkQnRuLmlubmVySFRNTCA9ICdBZGQgbmV3IGZyYW1lJztcblxuICBmcmFtZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZnJhbWVzV3JhcCk7XG4gIGZyYW1lc0NvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRCdG4pO1xuXG4gIGFkZEJ0bi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FkZC1idXR0b24nKTtcblxuICBhZGRMaXN0ZW5lcnMoKTtcbn1cblxuc3RhcnRBcHAoKTtcblxuZnVuY3Rpb24gYWRkVG9vbHNMaXN0ZW5lcnMoY2FycmllckN0eCwgZHJhd0N0eCwgY2FycmllckNhbnZhcykge1xuICByZXR1cm4ge1xuICAgIHBlblRvb2w6IEFkZFRvb2xzLmFkZFBlblRvb2woY2FycmllckN0eCwgY29sb3IsIGZhdEhhbmRsZSwgZnJhbWVzU3RvcmFnZSxcbiAgICAgIGNhcnJpZXJDYW52YXMpLFxuICAgIG1pcnJvclBlblRvb2w6IEFkZFRvb2xzLmFkZE1pcnJvclBlblRvb2woY2FycmllckN0eCwgY29sb3IsIGZhdEhhbmRsZSwgZnJhbWVzU3RvcmFnZSxcbiAgICAgIGNhcnJpZXJDYW52YXMpLFxuICAgIGVyYXNlclRvb2w6IEFkZFRvb2xzLmFkZEVyYXNlclRvb2woY2FycmllckN0eCwgZmF0SGFuZGxlLCBmcmFtZXNTdG9yYWdlLFxuICAgICAgY2FycmllckNhbnZhcyksXG4gICAgbGluZVRvb2w6IEFkZFRvb2xzLmFkZExpbmVUb29sKGNhcnJpZXJDdHgsIGRyYXdDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsXG4gICAgICBjYXJyaWVyQ2FudmFzKSxcbiAgICByZWN0VG9vbDogQWRkVG9vbHMuYWRkUmVjdFRvb2woY2FycmllckN0eCwgZHJhd0N0eCwgY29sb3IsIGZhdEhhbmRsZSwgZnJhbWVzU3RvcmFnZSxcbiAgICAgIGNhcnJpZXJDYW52YXMpLFxuICAgIGZpbGxSZWN0VG9vbDogQWRkVG9vbHMuYWRkRmlsbFJlY3RUb29sKFxuICAgICAgY2FycmllckN0eCxcbiAgICAgIGRyYXdDdHgsXG4gICAgICBjb2xvcixcbiAgICAgIGZhdEhhbmRsZSxcbiAgICAgIGZyYW1lc1N0b3JhZ2UsXG4gICAgICBjYXJyaWVyQ2FudmFzLFxuICAgICksXG4gICAgYXJjVG9vbDogQWRkVG9vbHMuYWRkQXJjVG9vbChcbiAgICAgIGNhcnJpZXJDdHgsXG4gICAgICBkcmF3Q3R4LFxuICAgICAgY29sb3IsXG4gICAgICBmYXRIYW5kbGUsXG4gICAgICBmcmFtZXNTdG9yYWdlLFxuICAgICAgY2FycmllckNhbnZhcyxcbiAgICApLFxuICAgIGxpZ2h0ZW5Ub29sOiBBZGRUb29scy5hZGRMaWdodGVuVG9vbChjYXJyaWVyQ3R4LCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsXG4gICAgICBjYXJyaWVyQ2FudmFzKSxcbiAgICBjb2xvclBpY2tlclRvb2w6IEFkZFRvb2xzLmFkZENvbG9yUGlja2VyVG9vbChjYXJyaWVyQ3R4LCBjb2xvciksXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNob29zZUFjdGl2ZUZyYW1lKG5ld0ZyYW1lKSB7XG4gIGlmIChhY3RpdmVGcmFtZSkge1xuICAgIGFjdGl2ZUZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIGZhbHNlKTtcbiAgICBhY3RpdmVGcmFtZSA9IG5ld0ZyYW1lO1xuICAgIGFjdGl2ZUZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGFjdGl2ZUZyYW1lID0gbmV3RnJhbWU7XG4gICAgYWN0aXZlRnJhbWUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlLWZyYW1lJywgdHJ1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVmcmVzaENhbnZhcyhjYW52YXNBcnIpIHtcbiAgY2FudmFzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gIGNhbnZhc0Fyci5mb3JFYWNoKGUgPT4gY2FudmFzQ29udGFpbmVyLmFwcGVuZENoaWxkKGUpKTtcbn1cblxuZnVuY3Rpb24gcmVmcmVzaEZyYW1lcygpIHtcbiAgZnJhbWVzU3RvcmFnZS5mb3JFYWNoKChlLCBpKSA9PiB7XG4gICAgZS5mcmFtZS5xdWVyeVNlbGVjdG9yKCcuZnJhbWUtbnVtJykuaW5uZXJIVE1MID0gaSArIDE7XG4gICAgZS5mcmFtZS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aSArIDF9LWZyYW1lYCk7XG4gICAgZS5mcmFtZS5zdHlsZS5vcmRlciA9IGkgKyAxO1xuICAgIGUuY2FudmFzWzBdLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpICsgMX0tY2FudmFzYCk7XG4gICAgZS5jYW52YXNbMV0uc2V0QXR0cmlidXRlKCdpZCcsIGAke2kgKyAxfS1kcmF3LWNhbnZhc2ApO1xuICAgIGZyYW1lc1dyYXAuYXBwZW5kQ2hpbGQoZS5mcmFtZSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRUb29sKCkge1xuICBhY3RpdmVCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlLXRvb2wnLCB0cnVlKTtcblxuICBmcmFtZXNTdG9yYWdlLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBPYmplY3Qua2V5cyhlbGVtLmNhbnZhc0xpc3RlbmVyc1tjdXJyZW50VG9vbE5hbWVdKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGVsZW0uY2FudmFzWzFdLmFkZEV2ZW50TGlzdGVuZXIoYCR7a2V5fWAsIGVsZW0uY2FudmFzTGlzdGVuZXJzW2N1cnJlbnRUb29sTmFtZV1ba2V5XSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWxUb29sKCkge1xuICBpZiAoY3VycmVudFRvb2xOYW1lICYmIGFjdGl2ZUJ1dHRvbikge1xuICAgIGZyYW1lc1N0b3JhZ2UuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoZWxlbS5jYW52YXNMaXN0ZW5lcnNbY3VycmVudFRvb2xOYW1lXSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGVsZW0uY2FudmFzWzFdLnJlbW92ZUV2ZW50TGlzdGVuZXIoYCR7a2V5fWAsIGVsZW0uY2FudmFzTGlzdGVuZXJzW2N1cnJlbnRUb29sTmFtZV1ba2V5XSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFjdGl2ZUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUtdG9vbCcsIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWxGcmFtZShlKSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgY29uc3QgZnJhbWVOdW0gPSBwYXJzZUludChlLnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnaWQnKSwgMTApO1xuXG4gIGZyYW1lc1N0b3JhZ2Uuc3BsaWNlKGZyYW1lTnVtIC0gMSwgMSk7XG5cbiAgZnJhbWVzV3JhcC5pbm5lckhUTUwgPSAnJztcblxuICBjYW52YXNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgaWYgKGZyYW1lc1N0b3JhZ2UubGVuZ3RoID4gMCkge1xuICAgIHJlZnJlc2hDYW52YXMoZnJhbWVzU3RvcmFnZVtmcmFtZXNTdG9yYWdlLmxlbmd0aCAtIDFdLmNhbnZhcyk7XG4gIH1cblxuICBpZiAoZnJhbWVzU3RvcmFnZS5sZW5ndGggPT09IDEpIHtcbiAgICBkZWxUb29sKCk7XG4gIH1cblxuICByZWZyZXNoRnJhbWVzKCk7XG59XG5cbmZ1bmN0aW9uIGRyYWdBbmREcm9wKGZyYW1lKSB7XG4gIGZ1bmN0aW9uIGhhbmRsZURyYWdTdGFydChlKSB7XG4gICAgY29uc3QgZnJhbWVOdW0gPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyksIDEwKTtcblxuICAgIGZyYW1lQXJyRWxlbSA9IGZyYW1lc1N0b3JhZ2Uuc3BsaWNlKGZyYW1lTnVtIC0gMSwgMSk7XG5cbiAgICBlLnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gJzAuNCc7XG5cbiAgICBkcmFnU3JjRWwgPSBlLnRhcmdldDtcblxuICAgIGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XG4gICAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9odG1sJywgZS50YXJnZXQuc3R5bGUub3JkZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIoZSkge1xuICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZURyYWdFbnRlcihlKSB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnb3ZlcicpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRHJhZ0xlYXZlKGUpIHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyJyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGhhbmRsZURyb3AoZSkge1xuICAgIGlmIChlLnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBmcmFtZU51bSA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSwgMTApO1xuXG4gICAgZnJhbWVzU3RvcmFnZS5zcGxpY2UoZnJhbWVOdW0gLSAxLCAwLCAuLi5mcmFtZUFyckVsZW0pO1xuXG4gICAgZHJhZ1NyY0VsLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG5cbiAgICBpZiAoZHJhZ1NyY0VsICE9PSBlLnRhcmdldCkge1xuICAgICAgZHJhZ1NyY0VsLnN0eWxlLm9yZGVyID0gZS50YXJnZXQuc3R5bGUub3JkZXI7XG4gICAgICBlLnRhcmdldC5zdHlsZS5vcmRlciA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvaHRtbCcpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZURyYWdFbmQoKSB7XG4gICAgZnJhbWVzU3RvcmFnZS5mb3JFYWNoKGUgPT4gZS5mcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyJykpO1xuICAgIHJlZnJlc2hGcmFtZXMoKTtcbiAgfVxuXG4gIGZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGhhbmRsZURyYWdTdGFydCwgZmFsc2UpO1xuICBmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBoYW5kbGVEcmFnRW50ZXIsIGZhbHNlKTtcbiAgZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBoYW5kbGVEcmFnT3ZlciwgZmFsc2UpO1xuICBmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBoYW5kbGVEcmFnTGVhdmUsIGZhbHNlKTtcbiAgZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGhhbmRsZURyb3AsIGZhbHNlKTtcbiAgZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGhhbmRsZURyYWdFbmQsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gY29weUZyYW1lKGUpIHtcbiAgbGV0IGZyYW1lTnVtO1xuXG4gIGlmIChlLnR5cGUgPT09ICdjbGljaycpIHtcbiAgICBmcmFtZU51bSA9IHBhcnNlSW50KGUudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpLCAxMCk7XG4gIH0gZWxzZSB7XG4gICAgZnJhbWVOdW0gPSBwYXJzZUludChlLmdldEF0dHJpYnV0ZSgnaWQnKSwgMTApO1xuICB9XG5cbiAgY29uc3QgY29weUVsZW0gPSBmcmFtZXNTdG9yYWdlLnNsaWNlKGZyYW1lTnVtIC0gMSwgZnJhbWVOdW0pO1xuXG4gIGNvbnN0IGNsb25lRnJhbWUgPSBjb3B5RWxlbVswXS5mcmFtZS5jbG9uZU5vZGUodHJ1ZSk7XG4gIGNvbnN0IGNsb25lQ2FycmllckNhbnZhcyA9IGNvcHlFbGVtWzBdLmNhbnZhc1swXS5jbG9uZU5vZGUodHJ1ZSk7XG4gIGNvbnN0IGNsb25lRHJhd0NhbnZhcyA9IGNvcHlFbGVtWzBdLmNhbnZhc1sxXS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgY29uc3QgZGVsQnRuID0gY2xvbmVGcmFtZS5xdWVyeVNlbGVjdG9yKCcuZGVsLWJ1dHRvbicpO1xuICBjb25zdCBjb3B5QnRuID0gY2xvbmVGcmFtZS5xdWVyeVNlbGVjdG9yKCcuZHVibC1idXR0b24nKTtcblxuICBDcmVhdGVGcmFtZS5hZGRGcmFtZUxpc3RlbmVycyhkZWxCdG4sIGNvcHlCdG4sIGRlbEZyYW1lLCBjb3B5RnJhbWUpO1xuXG4gIGRyYWdBbmREcm9wKGNsb25lRnJhbWUpO1xuXG4gIGNvbnN0IGNhcnJpZXJDdHggPSBjbG9uZUNhcnJpZXJDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgY29uc3QgZHJhd0N0eCA9IGNsb25lRHJhd0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGNhcnJpZXJDdHguZHJhd0ltYWdlKGNvcHlFbGVtWzBdLmNhbnZhc1swXSwgMCwgMCk7XG5cbiAgQ2FudmFzQ3JlYXRlLmFkZENhbnZhc0xpc3RlbmVycyhjbG9uZURyYXdDYW52YXMpO1xuXG4gIGNob29zZUFjdGl2ZUZyYW1lKGNsb25lRnJhbWUpO1xuXG4gIGZyYW1lc1N0b3JhZ2Uuc3BsaWNlKGZyYW1lTnVtLCAwLCB7XG4gICAgZnJhbWU6IGNsb25lRnJhbWUsXG4gICAgY2FudmFzOiBbXG4gICAgICBjbG9uZUNhcnJpZXJDYW52YXMsXG4gICAgICBjbG9uZURyYXdDYW52YXMsXG4gICAgXSxcbiAgICBjYW52YXNMaXN0ZW5lcnM6IGFkZFRvb2xzTGlzdGVuZXJzKGNhcnJpZXJDdHgsIGRyYXdDdHgsIGNsb25lQ2FycmllckNhbnZhcyksXG4gIH0pO1xuXG4gIGlmIChjdXJyZW50VG9vbE5hbWUgJiYgYWN0aXZlQnV0dG9uKSB7XG4gICAgYWRkVG9vbCgpO1xuICB9XG5cbiAgcmVmcmVzaEZyYW1lcygpO1xuXG4gIHJlZnJlc2hDYW52YXMoW2Nsb25lQ2FycmllckNhbnZhcywgY2xvbmVEcmF3Q2FudmFzXSk7XG59XG5cbmZ1bmN0aW9uIGNob29zZVRvb2woYnV0dG9uLCB0b29sKSB7XG4gIGRlbFRvb2woKTtcblxuICBhY3RpdmVCdXR0b24gPSBidXR0b247XG4gIGN1cnJlbnRUb29sTmFtZSA9IHRvb2w7XG5cbiAgYWRkVG9vbCgpO1xufVxuXG5jb25zdCBjaG9vc2VUb29sc1N0b3JhZ2UgPSB7XG4gIHBlblRvb2woKSB7XG4gICAgY2hvb3NlVG9vbChwZW5Ub29sQnV0dG9uLCAncGVuVG9vbCcpO1xuICB9LFxuICBtaXJyb3JQZW5Ub29sKCkge1xuICAgIGNob29zZVRvb2wobWlycm9yUGVuVG9vbEJ1dHRvbiwgJ21pcnJvclBlblRvb2wnKTtcbiAgfSxcbiAgZXJhc2VyVG9vbCgpIHtcbiAgICBjaG9vc2VUb29sKGVyYXNlclRvb2xCdXR0b24sICdlcmFzZXJUb29sJyk7XG4gIH0sXG4gIGxpbmVUb29sKCkge1xuICAgIGNob29zZVRvb2wobGluZVRvb2xCdXR0b24sICdsaW5lVG9vbCcpO1xuICB9LFxuICByZWN0VG9vbCgpIHtcbiAgICBjaG9vc2VUb29sKHJlY3RUb29sQnV0dG9uLCAncmVjdFRvb2wnKTtcbiAgfSxcbiAgZmlsbFJlY3RUb29sKCkge1xuICAgIGNob29zZVRvb2woZmlsbFJlY3RUb29sQnV0dG9uLCAnZmlsbFJlY3RUb29sJyk7XG4gIH0sXG4gIGNpcmNsZVRvb2woKSB7XG4gICAgY2hvb3NlVG9vbChhcmNUb29sQnV0dG9uLCAnYXJjVG9vbCcpO1xuICB9LFxuICBsaWdodGVuVG9vbCgpIHtcbiAgICBjaG9vc2VUb29sKGxpZ2h0ZW5Ub29sQnV0dG9uLCAnbGlnaHRlblRvb2wnKTtcbiAgfSxcbiAgY29sb3JQaWNrZXJUb29sKCkge1xuICAgIGNob29zZVRvb2woY29sb3JQaWNrZXJUb29sQnV0dG9uLCAnY29sb3JQaWNrZXJUb29sJyk7XG4gIH0sXG59O1xuXG5jb25zdCB0b29sc1N0b3JhZ2UgPSB7XG4gIHBlblRvb2w6IHsgYnV0dG9uOiBwZW5Ub29sQnV0dG9uLCBjYWxsYmFjazogY2hvb3NlVG9vbHNTdG9yYWdlLnBlblRvb2wgfSxcbiAgbWlycm9yUGVuVG9vbDogeyBidXR0b246IG1pcnJvclBlblRvb2xCdXR0b24sIGNhbGxiYWNrOiBjaG9vc2VUb29sc1N0b3JhZ2UubWlycm9yUGVuVG9vbCB9LFxuICBlcmFzZXJUb29sOiB7IGJ1dHRvbjogZXJhc2VyVG9vbEJ1dHRvbiwgY2FsbGJhY2s6IGNob29zZVRvb2xzU3RvcmFnZS5lcmFzZXJUb29sIH0sXG4gIGxpbmVUb29sOiB7IGJ1dHRvbjogbGluZVRvb2xCdXR0b24sIGNhbGxiYWNrOiBjaG9vc2VUb29sc1N0b3JhZ2UubGluZVRvb2wgfSxcbiAgcmVjdFRvb2w6IHsgYnV0dG9uOiByZWN0VG9vbEJ1dHRvbiwgY2FsbGJhY2s6IGNob29zZVRvb2xzU3RvcmFnZS5yZWN0VG9vbCB9LFxuICBmaWxsUmVjdFRvb2w6IHsgYnV0dG9uOiBmaWxsUmVjdFRvb2xCdXR0b24sIGNhbGxiYWNrOiBjaG9vc2VUb29sc1N0b3JhZ2UuZmlsbFJlY3RUb29sIH0sXG4gIGFyY1Rvb2w6IHsgYnV0dG9uOiBhcmNUb29sQnV0dG9uLCBjYWxsYmFjazogY2hvb3NlVG9vbHNTdG9yYWdlLmNpcmNsZVRvb2wgfSxcbiAgbGlnaHRlblRvb2w6IHsgYnV0dG9uOiBsaWdodGVuVG9vbEJ1dHRvbiwgY2FsbGJhY2s6IGNob29zZVRvb2xzU3RvcmFnZS5saWdodGVuVG9vbCB9LFxuICBjb2xvclBpY2tlclRvb2w6IHsgYnV0dG9uOiBjb2xvclBpY2tlclRvb2xCdXR0b24sIGNhbGxiYWNrOiBjaG9vc2VUb29sc1N0b3JhZ2UuY29sb3JQaWNrZXJUb29sIH0sXG59O1xuXG5PYmplY3Qua2V5cyh0b29sc1N0b3JhZ2UpLmZvckVhY2goKGtleSkgPT4ge1xuICB0b29sc1N0b3JhZ2Vba2V5XS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b29sc1N0b3JhZ2Vba2V5XS5jYWxsYmFjayk7XG59KTtcblxuY29uc3Qga2V5Q29kZXMgPSB7XG4gIGtleVA6IDgwLFxuICBrZXlWOiA4NixcbiAga2V5RTogNjksXG4gIGtleUw6IDc2LFxuICBrZXlSOiA4MixcbiAga2V5QzogNjcsXG4gIGtleVU6IDg1LFxuICBrZXlPOiA3OSxcbiAga2V5U2hpZnQ6IDE2LFxuICBrZXlOOiA3OCxcbiAga2V5WDogODgsXG4gIGtleUY6IDcwLFxuICBrZXlQbHVzOiAxMDcsXG4gIGtleU1pbnVzOiAxMDksXG4gIGtleVRvcEFycm93OiAzOCxcbiAga2V5Qm90dG9tQXJyb3c6IDQwLFxuICBrZXlNaW51c0ZhdDogMjE5LFxuICBrZXlQbHVzRmF0OiAyMjEsXG4gIGtleUN0cmw6IDE3LFxufTtcblxuZnVuY3Rpb24gYWRkVG9vbHNIb3RLZXlzKCkge1xuICBjb25zdCByZWN0Q29tYm8gPSB7IGtleVI6IGZhbHNlLCBrZXlDdHJsOiBmYWxzZSB9O1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleVA6XG4gICAgICAgIGNob29zZVRvb2xzU3RvcmFnZS5wZW5Ub29sKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlWOlxuICAgICAgICBjaG9vc2VUb29sc1N0b3JhZ2UubWlycm9yUGVuVG9vbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5RTpcbiAgICAgICAgY2hvb3NlVG9vbHNTdG9yYWdlLmVyYXNlclRvb2woKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleUw6XG4gICAgICAgIGNob29zZVRvb2xzU3RvcmFnZS5saW5lVG9vbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5UjpcbiAgICAgICAgcmVjdENvbWJvLmtleVIgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5QzpcbiAgICAgICAgY2hvb3NlVG9vbHNTdG9yYWdlLmNpcmNsZVRvb2woKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleVU6XG4gICAgICAgIGNob29zZVRvb2xzU3RvcmFnZS5saWdodGVuVG9vbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5TzpcbiAgICAgICAgY2hvb3NlVG9vbHNTdG9yYWdlLmNvbG9yUGlja2VyVG9vbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5Q3RybDpcbiAgICAgICAgcmVjdENvbWJvLmtleUN0cmwgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSAocmVjdENvbWJvLmtleVIgJiYgcmVjdENvbWJvLmtleUN0cmwpOlxuICAgICAgICBjaG9vc2VUb29sc1N0b3JhZ2UuZmlsbFJlY3RUb29sKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAocmVjdENvbWJvLmtleVIgJiYgcmVjdENvbWJvLmtleUN0cmwgPT09IGZhbHNlKTpcbiAgICAgICAgY2hvb3NlVG9vbHNTdG9yYWdlLnJlY3RUb29sKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5UjpcbiAgICAgICAgcmVjdENvbWJvLmtleVIgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleUN0cmw6XG4gICAgICAgIHJlY3RDb21iby5rZXlDdHJsID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hvb3NlUHJldkZyYW1lKCkge1xuICBjb25zdCBmcmFtZU51bSA9IHBhcnNlSW50KGFjdGl2ZUZyYW1lLmdldEF0dHJpYnV0ZSgnaWQnKSwgMTApO1xuXG4gIGlmIChmcmFtZU51bSA+IDEpIHtcbiAgICBpZiAoYWN0aXZlRnJhbWUpIHtcbiAgICAgIGFjdGl2ZUZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIGZhbHNlKTtcbiAgICAgIGFjdGl2ZUZyYW1lID0gZnJhbWVzU3RvcmFnZVtmcmFtZU51bSAtIDJdLmZyYW1lO1xuICAgICAgYWN0aXZlRnJhbWUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlLWZyYW1lJywgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZUZyYW1lID0gZnJhbWVzU3RvcmFnZVtmcmFtZU51bSAtIDJdLmZyYW1lO1xuICAgICAgYWN0aXZlRnJhbWUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlLWZyYW1lJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaENhbnZhcyhmcmFtZXNTdG9yYWdlW2ZyYW1lTnVtIC0gMl0uY2FudmFzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaG9vc2VOZXh0RnJhbWUoKSB7XG4gIGNvbnN0IGZyYW1lTnVtID0gcGFyc2VJbnQoYWN0aXZlRnJhbWUuZ2V0QXR0cmlidXRlKCdpZCcpLCAxMCk7XG5cbiAgaWYgKGZyYW1lTnVtIDwgZnJhbWVzU3RvcmFnZS5sZW5ndGgpIHtcbiAgICBpZiAoYWN0aXZlRnJhbWUpIHtcbiAgICAgIGFjdGl2ZUZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIGZhbHNlKTtcbiAgICAgIGFjdGl2ZUZyYW1lID0gZnJhbWVzU3RvcmFnZVtmcmFtZU51bV0uZnJhbWU7XG4gICAgICBhY3RpdmVGcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUtZnJhbWUnLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlRnJhbWUgPSBmcmFtZXNTdG9yYWdlW2ZyYW1lTnVtXS5mcmFtZTtcbiAgICAgIGFjdGl2ZUZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIHRydWUpO1xuICAgIH1cblxuICAgIHJlZnJlc2hDYW52YXMoZnJhbWVzU3RvcmFnZVtmcmFtZU51bV0uY2FudmFzKTtcbiAgfVxufVxuXG5hZGRUb29sc0hvdEtleXMoKTtcblxuZnVuY3Rpb24gYWRkSW50ZXJmYXNlSG90S2V5cygpIHtcbiAgY29uc3QgY29weUZyYW1lQ29tYm8gPSB7IGtleVNoaWZ0OiBudWxsLCBrZXlOOiBudWxsIH07XG4gIGNvbnN0IGZwc0NvbWJvID0geyBrZXlGOiBudWxsLCBrZXlQbHVzOiBudWxsLCBrZXlNaW51czogbnVsbCB9O1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleVNoaWZ0OlxuICAgICAgICBjb3B5RnJhbWVDb21iby5rZXlTaGlmdCA9IGtleUNvZGVzLmtleVNoaWZ0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5TjpcbiAgICAgICAgY29weUZyYW1lQ29tYm8ua2V5TiA9IGtleUNvZGVzLmtleU47XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlYOlxuICAgICAgICBIYW5kbGVzLnN3YXBDb2xvcigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5RjpcbiAgICAgICAgZnBzQ29tYm8ua2V5RiA9IGtleUNvZGVzLmtleUY7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlQbHVzOlxuICAgICAgICBmcHNDb21iby5rZXlQbHVzID0ga2V5Q29kZXMua2V5UGx1cztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleU1pbnVzOlxuICAgICAgICBmcHNDb21iby5rZXlNaW51cyA9IGtleUNvZGVzLmtleU1pbnVzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5VG9wQXJyb3c6XG4gICAgICAgIGNob29zZVByZXZGcmFtZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5Qm90dG9tQXJyb3c6XG4gICAgICAgIGNob29zZU5leHRGcmFtZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5TWludXNGYXQ6XG4gICAgICAgIGZhdEhhbmRsZS52YWx1ZSAtPSAxO1xuICAgICAgICBjdXJyZW50RmF0LmlubmVySFRNTCA9IGZhdEhhbmRsZS52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleVBsdXNGYXQ6XG4gICAgICAgIGZhdEhhbmRsZS52YWx1ZSArPSAxO1xuICAgICAgICBjdXJyZW50RmF0LmlubmVySFRNTCA9IGZhdEhhbmRsZS52YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgKGNvcHlGcmFtZUNvbWJvLmtleVNoaWZ0ID09PSBrZXlDb2Rlcy5rZXlTaGlmdCAmJiBjb3B5RnJhbWVDb21iby5rZXlOID09PSBrZXlDb2Rlcy5rZXlOKTpcbiAgICAgICAgY29weUZyYW1lKGFjdGl2ZUZyYW1lKTtcbiAgICAgICAgcmVmcmVzaEFuaW1hdGlvbigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKGNvcHlGcmFtZUNvbWJvLmtleVNoaWZ0ID09PSBudWxsICYmIGNvcHlGcmFtZUNvbWJvLmtleU4gPT09IGtleUNvZGVzLmtleU4pOlxuICAgICAgICBhZGRGcmFtZSgpO1xuICAgICAgICByZWZyZXNoQW5pbWF0aW9uKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAoZnBzQ29tYm8ua2V5RiA9PT0ga2V5Q29kZXMua2V5RiAmJiBmcHNDb21iby5rZXlQbHVzID09PSBrZXlDb2Rlcy5rZXlQbHVzKTpcbiAgICAgICAgZnBzSGFuZGxlLnZhbHVlICs9IDE7XG4gICAgICAgIGN1cnJlbnRGcHMuaW5uZXJIVE1MID0gZnBzSGFuZGxlLnZhbHVlO1xuICAgICAgICByZWZyZXNoQW5pbWF0aW9uKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAoZnBzQ29tYm8ua2V5RiA9PT0ga2V5Q29kZXMua2V5RiAmJiBmcHNDb21iby5rZXlNaW51cyA9PT0ga2V5Q29kZXMua2V5TWludXMpOlxuICAgICAgICBmcHNIYW5kbGUudmFsdWUgLT0gMTtcbiAgICAgICAgY3VycmVudEZwcy5pbm5lckhUTUwgPSBmcHNIYW5kbGUudmFsdWU7XG4gICAgICAgIHJlZnJlc2hBbmltYXRpb24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlTaGlmdDpcbiAgICAgICAgY29weUZyYW1lQ29tYm8ua2V5U2hpZnQgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5TjpcbiAgICAgICAgY29weUZyYW1lQ29tYm8ua2V5TiA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlGOlxuICAgICAgICBmcHNDb21iby5rZXlGID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleVBsdXM6XG4gICAgICAgIGZwc0NvbWJvLmtleVBsdXMgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5TWludXM6XG4gICAgICAgIGZwc0NvbWJvLmtleU1pbnVzID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xufVxuXG5hZGRJbnRlcmZhc2VIb3RLZXlzKCk7XG5cbmZyYW1lc1dyYXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgY29uc3QgZnJhbWVOdW0gPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyksIDEwKTtcblxuICBjaG9vc2VBY3RpdmVGcmFtZShlLnRhcmdldCk7XG5cbiAgcmVmcmVzaENhbnZhcyhmcmFtZXNTdG9yYWdlW2ZyYW1lTnVtIC0gMV0uY2FudmFzKTtcbn0sIHRydWUpO1xuXG5mdW5jdGlvbiB0b2dnbGVGdWxsU2NyZWVuKCkge1xuICBpZiAoIWFuaW1hdGlvbkNvbnRhaW5lci5mdWxsc2NyZWVuRWxlbWVudCkge1xuICAgIGFuaW1hdGlvbkNvbnRhaW5lci5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICB9IGVsc2UgaWYgKGFuaW1hdGlvbkNvbnRhaW5lci5leGl0RnVsbHNjcmVlbikge1xuICAgIGFuaW1hdGlvbkNvbnRhaW5lci5leGl0RnVsbHNjcmVlbigpO1xuICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICBjb25zdCBrZXlGMTEgPSAxMjI7XG5cbiAgaWYgKGUua2V5Q29kZSA9PT0ga2V5RjExKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdG9nZ2xlRnVsbFNjcmVlbigpO1xuICB9XG59LCBmYWxzZSk7XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZFRvb2xzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmFjdGl2ZVRvb2wgPSBudWxsO1xuICB9XG5cbiAgc3RhdGljIGFkZFBlblRvb2woY2FycmllckN0eCwgY29sb3IsIGZhdEhhbmRsZSwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcykge1xuICAgIGxldCBtb3VzZURvd247XG5cbiAgICBjb25zdCBwZW5Ub29sRG93biA9IChlKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSB0cnVlO1xuXG4gICAgICBjYXJyaWVyQ3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY2FycmllckN0eC5zdHJva2VTdHlsZSA9IGNvbG9yLnZhbHVlO1xuICAgICAgY2FycmllckN0eC5saW5lV2lkdGggPSBmYXRIYW5kbGUudmFsdWU7XG4gICAgICBjYXJyaWVyQ3R4Lm1vdmVUbyhlLm9mZnNldFgsIGUub2Zmc2V0WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHBlblRvb2xNb3ZlID0gKGUpID0+IHtcbiAgICAgIGlmICghbW91c2VEb3duKSByZXR1cm47XG5cbiAgICAgIGNhcnJpZXJDdHgubGluZVRvKGUub2Zmc2V0WCwgZS5vZmZzZXRZKTtcbiAgICAgIGNhcnJpZXJDdHguc3Ryb2tlKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHBlblRvb2xVcCA9IChlKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIEFkZFRvb2xzLmFkZENhbnZhc1RvRnJhbWVMaXN0ZW5lcihlLnRhcmdldCwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IHBlblRvb2xMZWF2ZSA9ICgpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgbW91c2Vkb3duOiBwZW5Ub29sRG93bixcbiAgICAgIG1vdXNlbW92ZTogcGVuVG9vbE1vdmUsXG4gICAgICBtb3VzZXVwOiBwZW5Ub29sVXAsXG4gICAgICBtb3VzZWxlYXZlOiBwZW5Ub29sTGVhdmUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRNaXJyb3JQZW5Ub29sKGNhcnJpZXJDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpIHtcbiAgICBjb25zdCBjYW52YXNTaXplID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZhcy1zaXplLWhhbmRsZScpO1xuICAgIGxldCBtb3VzZURvd247XG5cbiAgICBjb25zdCBtaXJyb3JQZW5Ub29sRG93biA9ICgpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IHRydWU7XG4gICAgICBjYXJyaWVyQ3R4LmZpbGxTdHlsZSA9IGNvbG9yLnZhbHVlO1xuICAgIH07XG5cbiAgICBjb25zdCBtaXJyb3JQZW5Ub29sTW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAoIW1vdXNlRG93bikgcmV0dXJuO1xuXG4gICAgICBjb25zdCBmYXRTaXplID0gZmF0SGFuZGxlLnZhbHVlQXNOdW1iZXI7XG5cbiAgICAgIGNhcnJpZXJDdHguZmlsbFJlY3QoZS5vZmZzZXRYLCBlLm9mZnNldFksIGZhdFNpemUsIGZhdFNpemUpO1xuICAgICAgY2FycmllckN0eC5maWxsUmVjdChjYW52YXNTaXplLnZhbHVlQXNOdW1iZXIgLSBlLm9mZnNldFgsIGUub2Zmc2V0WSwgZmF0U2l6ZSwgZmF0U2l6ZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG1pcnJvclBlblRvb2xVcCA9IChlKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIEFkZFRvb2xzLmFkZENhbnZhc1RvRnJhbWVMaXN0ZW5lcihlLnRhcmdldCwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IG1pcnJvclBlblRvb2xMZWF2ZSA9ICgpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBjb25zdCBtaXJyb3JQZW5Ub29sID0ge1xuICAgICAgbW91c2Vkb3duOiBtaXJyb3JQZW5Ub29sRG93bixcbiAgICAgIG1vdXNlbW92ZTogbWlycm9yUGVuVG9vbE1vdmUsXG4gICAgICBtb3VzZXVwOiBtaXJyb3JQZW5Ub29sVXAsXG4gICAgICBtb3VzZWxlYXZlOiBtaXJyb3JQZW5Ub29sTGVhdmUsXG4gICAgfTtcblxuICAgIHJldHVybiBtaXJyb3JQZW5Ub29sO1xuICB9XG5cbiAgc3RhdGljIGFkZEVyYXNlclRvb2woY2FycmllckN0eCwgZmF0SGFuZGxlLCBmcmFtZXNTdG9yYWdlLCBjYXJyaWVyQ2FudmFzKSB7XG4gICAgbGV0IG1vdXNlRG93bjtcblxuICAgIGNvbnN0IGVyYXNlclRvb2xEb3duID0gKCkgPT4ge1xuICAgICAgbW91c2VEb3duID0gdHJ1ZTtcblxuICAgICAgY2FycmllckN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGNhcnJpZXJDdHguc3Ryb2tlU3R5bGUgPSAnI2ZmZic7XG4gICAgICBjYXJyaWVyQ3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcbiAgICAgIGNhcnJpZXJDdHgubGluZVdpZHRoID0gZmF0SGFuZGxlLnZhbHVlO1xuICAgIH07XG5cbiAgICBjb25zdCBlcmFzZXJUb29sTW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAoIW1vdXNlRG93bikgcmV0dXJuO1xuXG4gICAgICBjb25zdCB4Q29yZCA9IGUub2Zmc2V0WDtcbiAgICAgIGNvbnN0IHlDb3JkID0gZS5vZmZzZXRZO1xuXG4gICAgICBjYXJyaWVyQ3R4LmxpbmVUbyh4Q29yZCwgeUNvcmQpO1xuICAgICAgY2FycmllckN0eC5zdHJva2UoKTtcblxuICAgICAgY2FycmllckN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGNhcnJpZXJDdHguYXJjKHhDb3JkLCB5Q29yZCwgZmF0SGFuZGxlLnZhbHVlQXNOdW1iZXIgLyAyLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjYXJyaWVyQ3R4LmZpbGwoKTtcblxuICAgICAgY2FycmllckN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGNhcnJpZXJDdHgubW92ZVRvKHhDb3JkLCB5Q29yZCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGVyYXNlclRvb2xVcCA9IChlKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcblxuICAgICAgY2FycmllckN0eC5iZWdpblBhdGgoKTtcbiAgICAgIEFkZFRvb2xzLmFkZENhbnZhc1RvRnJhbWVMaXN0ZW5lcihlLnRhcmdldCwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGVyYXNlclRvb2xNb3VzZUxlYXZlID0gKCkgPT4ge1xuICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBtb3VzZWRvd246IGVyYXNlclRvb2xEb3duLFxuICAgICAgbW91c2Vtb3ZlOiBlcmFzZXJUb29sTW92ZSxcbiAgICAgIG1vdXNldXA6IGVyYXNlclRvb2xVcCxcbiAgICAgIG1vdXNlbGVhdmU6IGVyYXNlclRvb2xNb3VzZUxlYXZlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgYWRkTGluZVRvb2woY2FycmllckN0eCwgZHJhd0N0eCwgY29sb3IsIGZhdEhhbmRsZSwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcykge1xuICAgIGNvbnN0IGNhbnZhc1NpemVIYW5kbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FudmFzLXNpemUtaGFuZGxlJyk7XG5cbiAgICBsZXQgbW91c2VEb3duO1xuICAgIGxldCBjYW52YXNTaXplO1xuXG4gICAgbGV0IHN0YXJ0WDtcbiAgICBsZXQgc3RhcnRZO1xuXG4gICAgY29uc3QgbGluZVRvb2xEb3duID0gKGUpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IHRydWU7XG5cbiAgICAgIHN0YXJ0WCA9IGUub2Zmc2V0WDtcbiAgICAgIHN0YXJ0WSA9IGUub2Zmc2V0WTtcblxuICAgICAgY2FycmllckN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGNhcnJpZXJDdHguc3Ryb2tlU3R5bGUgPSBjb2xvci52YWx1ZTtcbiAgICAgIGNhcnJpZXJDdHgubGluZVdpZHRoID0gZmF0SGFuZGxlLnZhbHVlO1xuXG4gICAgICBjYXJyaWVyQ3R4Lm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGxpbmVUb29sTW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAoIW1vdXNlRG93bikgcmV0dXJuO1xuXG4gICAgICBjYW52YXNTaXplID0gY2FudmFzU2l6ZUhhbmRsZS52YWx1ZUFzTnVtYmVyO1xuXG4gICAgICBkcmF3Q3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNTaXplLCBjYW52YXNTaXplKTtcbiAgICAgIGRyYXdDdHguYmVnaW5QYXRoKCk7XG4gICAgICBkcmF3Q3R4LnN0cm9rZVN0eWxlID0gY29sb3IudmFsdWU7XG4gICAgICBkcmF3Q3R4LmxpbmVXaWR0aCA9IGZhdEhhbmRsZS52YWx1ZTtcbiAgICAgIGRyYXdDdHgubW92ZVRvKHN0YXJ0WCwgc3RhcnRZKTtcbiAgICAgIGRyYXdDdHgubGluZVRvKGUub2Zmc2V0WCwgZS5vZmZzZXRZKTtcbiAgICAgIGRyYXdDdHguc3Ryb2tlKCk7XG4gICAgICBkcmF3Q3R4LmNsb3NlUGF0aCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBsaW5lVG9vbFVwID0gKGUpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuXG4gICAgICBkcmF3Q3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNTaXplLCBjYW52YXNTaXplKTtcbiAgICAgIGNhcnJpZXJDdHgubGluZVRvKGUub2Zmc2V0WCwgZS5vZmZzZXRZKTtcbiAgICAgIGNhcnJpZXJDdHguc3Ryb2tlKCk7XG4gICAgICBjYXJyaWVyQ3R4LmNsb3NlUGF0aCgpO1xuICAgICAgQWRkVG9vbHMuYWRkQ2FudmFzVG9GcmFtZUxpc3RlbmVyKGUudGFyZ2V0LCBmcmFtZXNTdG9yYWdlLCBjYXJyaWVyQ2FudmFzKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbGluZVRvb2xMZWF2ZSA9ICgpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgbW91c2Vkb3duOiBsaW5lVG9vbERvd24sXG4gICAgICBtb3VzZW1vdmU6IGxpbmVUb29sTW92ZSxcbiAgICAgIG1vdXNldXA6IGxpbmVUb29sVXAsXG4gICAgICBtb3VzZWxlYXZlOiBsaW5lVG9vbExlYXZlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgYWRkUmVjdFRvb2woY2FycmllckN0eCwgZHJhd0N0eCwgY29sb3IsIGZhdEhhbmRsZSwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcykge1xuICAgIGNvbnN0IGNhbnZhc1NpemVIYW5kbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FudmFzLXNpemUtaGFuZGxlJyk7XG5cbiAgICBsZXQgY2FudmFzU2l6ZTtcbiAgICBsZXQgbW91c2VEb3duO1xuXG4gICAgbGV0IHN0YXJ0WDtcbiAgICBsZXQgc3RhcnRZO1xuXG4gICAgbGV0IGZhdFNpemU7XG5cbiAgICBjb25zdCByZWN0VG9vbERvd24gPSAoZSkgPT4ge1xuICAgICAgbW91c2VEb3duID0gdHJ1ZTtcblxuICAgICAgc3RhcnRYID0gZS5vZmZzZXRYO1xuICAgICAgc3RhcnRZID0gZS5vZmZzZXRZO1xuXG4gICAgICBjYXJyaWVyQ3R4LnN0cm9rZVN0eWxlID0gY29sb3IudmFsdWU7XG4gICAgICBkcmF3Q3R4LnN0cm9rZVN0eWxlID0gY29sb3IudmFsdWU7XG5cbiAgICAgIGZhdFNpemUgPSBmYXRIYW5kbGUudmFsdWU7XG5cbiAgICAgIGNhcnJpZXJDdHgubGluZVdpZHRoID0gZmF0U2l6ZTtcbiAgICAgIGRyYXdDdHgubGluZVdpZHRoID0gZmF0U2l6ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVjdFRvb2xNb3ZlID0gKGUpID0+IHtcbiAgICAgIGlmICghbW91c2VEb3duKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHdpZHRoID0gZS5vZmZzZXRYIC0gc3RhcnRYO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZS5vZmZzZXRZIC0gc3RhcnRZO1xuXG4gICAgICBjYW52YXNTaXplID0gY2FudmFzU2l6ZUhhbmRsZS52YWx1ZUFzTnVtYmVyO1xuXG4gICAgICBkcmF3Q3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNTaXplLCBjYW52YXNTaXplKTtcbiAgICAgIGRyYXdDdHguc3Ryb2tlUmVjdChzdGFydFgsIHN0YXJ0WSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlY3RUb29sVXAgPSAoZSkgPT4ge1xuICAgICAgbW91c2VEb3duID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IHdpZHRoID0gZS5vZmZzZXRYIC0gc3RhcnRYO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZS5vZmZzZXRZIC0gc3RhcnRZO1xuXG4gICAgICBjYXJyaWVyQ3R4LnN0cm9rZVJlY3Qoc3RhcnRYLCBzdGFydFksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgZHJhd0N0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XG4gICAgICBBZGRUb29scy5hZGRDYW52YXNUb0ZyYW1lTGlzdGVuZXIoZS50YXJnZXQsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpO1xuICAgIH07XG5cbiAgICBjb25zdCByZWN0VG9vbExlYXZlID0gKCkgPT4ge1xuICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBtb3VzZWRvd246IHJlY3RUb29sRG93bixcbiAgICAgIG1vdXNlbW92ZTogcmVjdFRvb2xNb3ZlLFxuICAgICAgbW91c2V1cDogcmVjdFRvb2xVcCxcbiAgICAgIG1vdXNlbGVhdmU6IHJlY3RUb29sTGVhdmUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRGaWxsUmVjdFRvb2woY2FycmllckN0eCwgZHJhd0N0eCwgY29sb3IsIGZhdEhhbmRsZSwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcykge1xuICAgIGNvbnN0IGNhbnZhc1NpemVIYW5kbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FudmFzLXNpemUtaGFuZGxlJyk7XG5cbiAgICBsZXQgY2FudmFzU2l6ZTtcbiAgICBsZXQgbW91c2VEb3duO1xuXG4gICAgbGV0IHN0YXJ0WDtcbiAgICBsZXQgc3RhcnRZO1xuXG4gICAgbGV0IGZhdFNpemU7XG5cbiAgICBjb25zdCBmaWxsUmVjdFRvb2xEb3duID0gKGUpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IHRydWU7XG5cbiAgICAgIHN0YXJ0WCA9IGUub2Zmc2V0WDtcbiAgICAgIHN0YXJ0WSA9IGUub2Zmc2V0WTtcblxuICAgICAgY2FycmllckN0eC5maWxsU3R5bGUgPSBjb2xvci52YWx1ZTtcbiAgICAgIGRyYXdDdHguZmlsbFN0eWxlID0gY29sb3IudmFsdWU7XG5cbiAgICAgIGZhdFNpemUgPSBmYXRIYW5kbGUudmFsdWU7XG5cbiAgICAgIGNhcnJpZXJDdHgubGluZVdpZHRoID0gZmF0U2l6ZTtcbiAgICAgIGRyYXdDdHgubGluZVdpZHRoID0gZmF0U2l6ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgZmlsbFJlY3RUb29sTW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAoIW1vdXNlRG93bikgcmV0dXJuO1xuXG4gICAgICBjb25zdCB3aWR0aCA9IGUub2Zmc2V0WCAtIHN0YXJ0WDtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGUub2Zmc2V0WSAtIHN0YXJ0WTtcblxuICAgICAgY2FudmFzU2l6ZSA9IGNhbnZhc1NpemVIYW5kbGUudmFsdWVBc051bWJlcjtcblxuICAgICAgZHJhd0N0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XG4gICAgICBkcmF3Q3R4LmZpbGxSZWN0KHN0YXJ0WCwgc3RhcnRZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9O1xuXG4gICAgY29uc3QgZmlsbFJlY3RUb29sVXAgPSAoZSkgPT4ge1xuICAgICAgbW91c2VEb3duID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IHdpZHRoID0gZS5vZmZzZXRYIC0gc3RhcnRYO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZS5vZmZzZXRZIC0gc3RhcnRZO1xuXG4gICAgICBjYXJyaWVyQ3R4LmZpbGxSZWN0KHN0YXJ0WCwgc3RhcnRZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgIGRyYXdDdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1NpemUsIGNhbnZhc1NpemUpO1xuICAgICAgQWRkVG9vbHMuYWRkQ2FudmFzVG9GcmFtZUxpc3RlbmVyKGUudGFyZ2V0LCBmcmFtZXNTdG9yYWdlLCBjYXJyaWVyQ2FudmFzKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZmlsbFJlY3RUb29sTGVhdmUgPSAoKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdXNlZG93bjogZmlsbFJlY3RUb29sRG93bixcbiAgICAgIG1vdXNlbW92ZTogZmlsbFJlY3RUb29sTW92ZSxcbiAgICAgIG1vdXNldXA6IGZpbGxSZWN0VG9vbFVwLFxuICAgICAgbW91c2VsZWF2ZTogZmlsbFJlY3RUb29sTGVhdmUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRBcmNUb29sKGNhcnJpZXJDdHgsIGRyYXdDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpIHtcbiAgICBjb25zdCBjYW52YXNTaXplSGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZhcy1zaXplLWhhbmRsZScpO1xuXG4gICAgbGV0IGNhbnZhc1NpemU7XG4gICAgbGV0IG1vdXNlRG93bjtcblxuICAgIGxldCBzdGFydFg7XG4gICAgbGV0IHN0YXJ0WTtcblxuICAgIGxldCBmYXRTaXplO1xuXG4gICAgZnVuY3Rpb24gZHJhd0VsbGlwc2UoeDEsIHkxLCB4MiwgeTIsIGN0eCkge1xuICAgICAgY29uc3QgcmFkaXVzWCA9ICh4MiAtIHgxKSAqIDAuNTtcbiAgICAgIGNvbnN0IHJhZGl1c1kgPSAoeTIgLSB5MSkgKiAwLjU7XG4gICAgICBjb25zdCBjZW50ZXJYID0geDEgKyByYWRpdXNYO1xuICAgICAgY29uc3QgY2VudGVyWSA9IHkxICsgcmFkaXVzWTtcbiAgICAgIGNvbnN0IHN0ZXAgPSAwLjAxO1xuICAgICAgbGV0IGEgPSBzdGVwO1xuICAgICAgY29uc3QgcGkyID0gTWF0aC5QSSAqIDIgLSBzdGVwO1xuXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgIGN0eC5tb3ZlVG8oY2VudGVyWCArIHJhZGl1c1ggKiBNYXRoLmNvcygwKSxcbiAgICAgICAgY2VudGVyWSArIHJhZGl1c1kgKiBNYXRoLnNpbigwKSk7XG5cbiAgICAgIGZvciAoOyBhIDwgcGkyOyBhICs9IHN0ZXApIHtcbiAgICAgICAgY3R4LmxpbmVUbyhjZW50ZXJYICsgcmFkaXVzWCAqIE1hdGguY29zKGEpLFxuICAgICAgICAgIGNlbnRlclkgKyByYWRpdXNZICogTWF0aC5zaW4oYSkpO1xuICAgICAgfVxuXG4gICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgYXJjVG9vbERvd24gPSAoZSkgPT4ge1xuICAgICAgbW91c2VEb3duID0gdHJ1ZTtcblxuICAgICAgc3RhcnRYID0gZS5vZmZzZXRYO1xuICAgICAgc3RhcnRZID0gZS5vZmZzZXRZO1xuXG4gICAgICBjYXJyaWVyQ3R4LnN0cm9rZVN0eWxlID0gY29sb3IudmFsdWU7XG4gICAgICBkcmF3Q3R4LnN0cm9rZVN0eWxlID0gY29sb3IudmFsdWU7XG5cbiAgICAgIGZhdFNpemUgPSBmYXRIYW5kbGUudmFsdWU7XG5cbiAgICAgIGNhcnJpZXJDdHgubGluZVdpZHRoID0gZmF0U2l6ZTtcbiAgICAgIGRyYXdDdHgubGluZVdpZHRoID0gZmF0U2l6ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgYXJjVG9vbE1vdmUgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFtb3VzZURvd24pIHJldHVybjtcblxuICAgICAgY2FudmFzU2l6ZSA9IGNhbnZhc1NpemVIYW5kbGUudmFsdWVBc051bWJlcjtcblxuICAgICAgZHJhd0N0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XG4gICAgICBkcmF3RWxsaXBzZShzdGFydFgsIHN0YXJ0WSwgZS5vZmZzZXRYLCBlLm9mZnNldFksIGRyYXdDdHgpO1xuICAgIH07XG5cbiAgICBjb25zdCBhcmNUb29sVXAgPSAoZSkgPT4ge1xuICAgICAgbW91c2VEb3duID0gZmFsc2U7XG5cbiAgICAgIGRyYXdFbGxpcHNlKHN0YXJ0WCwgc3RhcnRZLCBlLm9mZnNldFgsIGUub2Zmc2V0WSwgY2FycmllckN0eCk7XG4gICAgICBkcmF3Q3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNTaXplLCBjYW52YXNTaXplKTtcbiAgICAgIEFkZFRvb2xzLmFkZENhbnZhc1RvRnJhbWVMaXN0ZW5lcihlLnRhcmdldCwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFyY1Rvb2xMZWF2ZSA9ICgpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgbW91c2Vkb3duOiBhcmNUb29sRG93bixcbiAgICAgIG1vdXNlbW92ZTogYXJjVG9vbE1vdmUsXG4gICAgICBtb3VzZXVwOiBhcmNUb29sVXAsXG4gICAgICBtb3VzZWxlYXZlOiBhcmNUb29sTGVhdmUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRMaWdodGVuVG9vbChjYXJyaWVyQ3R4LCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpIHtcbiAgICBjb25zdCBjdHJsQ29kZSA9IDE3O1xuICAgIGxldCBmYXRTaXplO1xuICAgIGxldCBtb3VzZURvd247XG5cbiAgICBjb25zdCBsaWdodGVuVG9vbERvd24gPSAoKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSB0cnVlO1xuXG4gICAgICBjYXJyaWVyQ3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY2FycmllckN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpJztcbiAgICAgIGNhcnJpZXJDdHguZmlsbFN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSknO1xuICAgICAgY2FycmllckN0eC5saW5lV2lkdGggPSBmYXRIYW5kbGUudmFsdWU7XG4gICAgfTtcblxuICAgIGNvbnN0IGxpZ2h0ZW5Ub29sTW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAoIW1vdXNlRG93bikgcmV0dXJuO1xuXG4gICAgICBmYXRTaXplID0gZmF0SGFuZGxlLnZhbHVlQXNOdW1iZXI7XG5cbiAgICAgIGNvbnN0IHhDb3JkID0gZS5vZmZzZXRYO1xuICAgICAgY29uc3QgeUNvcmQgPSBlLm9mZnNldFk7XG5cbiAgICAgIGNhcnJpZXJDdHgubGluZVRvKHhDb3JkLCB5Q29yZCk7XG4gICAgICBjYXJyaWVyQ3R4LnN0cm9rZSgpO1xuXG4gICAgICBjYXJyaWVyQ3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY2FycmllckN0eC5hcmMoeENvcmQsIHlDb3JkLCBmYXRTaXplIC8gMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY2FycmllckN0eC5maWxsKCk7XG5cbiAgICAgIGNhcnJpZXJDdHguYmVnaW5QYXRoKCk7XG4gICAgICBjYXJyaWVyQ3R4Lm1vdmVUbyh4Q29yZCwgeUNvcmQpO1xuICAgIH07XG5cbiAgICBjb25zdCBsaWdodGVuVG9vbFVwID0gKGUpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgICAgQWRkVG9vbHMuYWRkQ2FudmFzVG9GcmFtZUxpc3RlbmVyKGUudGFyZ2V0LCBmcmFtZXNTdG9yYWdlLCBjYXJyaWVyQ2FudmFzKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbGlnaHRlblRvb2xMZWF2ZSA9ICgpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gY3RybENvZGUpIHtcbiAgICAgICAgY2FycmllckN0eC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwLjAxKSc7XG4gICAgICAgIGNhcnJpZXJDdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAxKSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChlLmtleUNvZGUgPT09IGN0cmxDb2RlKSB7XG4gICAgICAgIGNhcnJpZXJDdHguZmlsbFN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSknO1xuICAgICAgICBjYXJyaWVyQ3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSknO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdXNlZG93bjogbGlnaHRlblRvb2xEb3duLFxuICAgICAgbW91c2Vtb3ZlOiBsaWdodGVuVG9vbE1vdmUsXG4gICAgICBtb3VzZXVwOiBsaWdodGVuVG9vbFVwLFxuICAgICAgbW91c2VsZWF2ZTogbGlnaHRlblRvb2xMZWF2ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGFkZENvbG9yUGlja2VyVG9vbChjYXJyaWVyQ3R4LCBjb2xvcikge1xuICAgIGNvbnN0IGNvbG9yUGlja2VyVG9vbENsaWNrID0gKGUpID0+IHtcbiAgICAgIGNvbnN0IHBpeGVsRGF0YSA9IGNhcnJpZXJDdHguZ2V0SW1hZ2VEYXRhKGUub2Zmc2V0WCwgZS5vZmZzZXRZLCAxLCAxKTtcblxuICAgICAgY29uc3QgckNoYW5lbCA9IHBpeGVsRGF0YS5kYXRhWzBdO1xuICAgICAgY29uc3QgZ0NoYW5lbCA9IHBpeGVsRGF0YS5kYXRhWzFdO1xuICAgICAgY29uc3QgYkNoYW5lbCA9IHBpeGVsRGF0YS5kYXRhWzJdO1xuXG4gICAgICBmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XG4gICAgICAgIGNvbnN0IGhleCA9IGMudG9TdHJpbmcoMTYpO1xuICAgICAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gMSA/IGAwJHtoZXh9YCA6IGhleDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmdiVG9IZXgociwgZywgYikge1xuICAgICAgICByZXR1cm4gYCMke2NvbXBvbmVudFRvSGV4KHIpfSR7Y29tcG9uZW50VG9IZXgoZyl9JHtjb21wb25lbnRUb0hleChiKX1gO1xuICAgICAgfVxuXG4gICAgICBjb2xvci52YWx1ZSA9IHJnYlRvSGV4KHJDaGFuZWwsIGdDaGFuZWwsIGJDaGFuZWwpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2xpY2s6IGNvbG9yUGlja2VyVG9vbENsaWNrLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgYWRkQ2FudmFzVG9GcmFtZUxpc3RlbmVyKGV2ZW50VGFyZ2V0LCBmcmFtZXNTdG9yYWdlLCBjYXJyaWVyQ2FudmFzKSB7XG4gICAgY29uc3QgY3VycmVudENhbnZhc0lkID0gcGFyc2VJbnQoZXZlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpLCAxMCk7XG4gICAgY29uc3QgY3VycmVudEZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y3VycmVudENhbnZhc0lkfS1mcmFtZWApO1xuICAgIGNvbnN0IGZyYW1lc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJhbWVzLXdyYXBwZXInKTtcblxuICAgIGNvbnN0IGNhbnZhc0ltZyA9IGNhcnJpZXJDYW52YXMudG9EYXRhVVJMKCk7XG5cbiAgICBjdXJyZW50RnJhbWUuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2NhbnZhc0ltZ30pYDtcbiAgICBmcmFtZXNTdG9yYWdlW2N1cnJlbnRDYW52YXNJZCAtIDFdLmZyYW1lID0gY3VycmVudEZyYW1lO1xuICAgIGZyYW1lc1N0b3JhZ2VbY3VycmVudENhbnZhc0lkIC0gMV0uY2FudmFzSW1nID0gY2FudmFzSW1nO1xuXG4gICAgZnJhbWVzV3JhcC5pbm5lckhUTUwgPSAnJztcblxuICAgIGZyYW1lc1N0b3JhZ2UuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgZnJhbWVzV3JhcC5hcHBlbmRDaGlsZChlbGVtLmZyYW1lKTtcbiAgICB9KTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZjVhOGZiMDhlYjZmOTFlZmQ4MmE5OTZkNTgyYTFkZGQucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZTU1MDE4YTYzOWM2MTgzZDg0ODdjZDFmY2RkMzgyNjgucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNmUxZThhYzkzYzYyNWFhYmE2MmFmYjA3ZjgzYjBmN2IucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiNTRkYmFiMjIxNjQ2ODdkMzdmMTNmZGQ5OTZjZjVlMDEucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYTI0ZDZiNDFhNmY0YzRiZjhkODYxOTExMTc5YmMxOTcucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiZGJmZTkwNmRjN2I2NzcxYjgyYjQ3YjRiNTYyYTFjY2IucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMjgwZmE1ZWVmMzg1MWRjYWJmNzg3ZmVlMGYwZDk5ZWMucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMTIxMjAxMDNmZWY3ZTFhNWQxNDdkZmUyMzU0MjI3NDQucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiODY1M2E4MDEzN2NlY2FiMjNhOTI0YzE5NzQyMDk3YWMucG5nXCI7IiwiaW1wb3J0IEFkZFRvb2xzIGZyb20gJy4vQWRkVG9vbHMnO1xuaW1wb3J0ICcuL3Rvb2xzLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IEFkZFRvb2xzO1xuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdG9vbHMuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rvb2xzLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vdG9vbHMuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==