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
/******/ 	var hotCurrentHash = "96556d81820d18f1397e";
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


const swapColorButton = document.getElementById('swap-color');

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
  swapColorButton.addEventListener('click', _AppHandles__WEBPACK_IMPORTED_MODULE_4__["default"].swapColor);

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
    frame,
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

  if (framesStorage.length > 0) {
    refreshCanvas(framesStorage[frameNum - 1].canvas);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1lcy9mcmFtZXMuY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xzL3Rvb2xzLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS91cmwtZXNjYXBlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9BbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEhhbmRsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NhbnZhc0NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzZXRzL2ZvbnRzL1NvdXJjZVNhbnNQcm8tUmVndWxhci50dGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9mb250cy9zb3VyY2VzYW5zcHJvLXJlZ3VsYXItd2ViZm9udC53b2ZmIiwid2VicGFjazovLy8uL3NyYy9hc3NldHMvZm9udHMvc291cmNlc2Fuc3Byby1yZWd1bGFyLXdlYmZvbnQud29mZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1lcy9GcmFtZUNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWVzL2ZyYW1lcy5jc3M/YzI5NSIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzPzhmMzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xzL0FkZFRvb2xzLmpzIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvYXJjLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvY29sb3ItcGlja2VyLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvZXJhc2VyLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvZmlsbC1yZWN0LXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvbGlnaHRlbi10b29sLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHMvYXNzZXRzL2xpbmUtdG9vbC5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xzL2Fzc2V0cy9taXJyb3ItcGVuLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvcGVuLXRvb2wucG5nIiwid2VicGFjazovLy8uL3NyYy90b29scy9hc3NldHMvcmVjdC10b29sLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xzL3Rvb2xzLmNzcz8xYWFiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxJQUFJO0FBQzFDOztBQUVBO0FBQ0EsbUJBQW1CLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGtCQUFrQjtBQUM3RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvREFBb0QsZ0JBQWdCO0FBQ3BFOztBQUVBOztBQUVBLGdEQUFnRCxVQUFVO0FBQzFEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7QUNsZkEsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7QUNBeEMsaUJBQWlCLHFCQUF1QiwwQzs7Ozs7Ozs7Ozs7O0FDQXhDO0FBQUE7QUFBQTtBQUFBO0FBQWtDO0FBQ2I7O0FBRU4sZ0hBQVEsRUFBQzs7Ozs7Ozs7Ozs7OztBQ0Z4QixjQUFjLG1CQUFPLENBQUMsMkhBQXlEOztBQUUvRSw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsc0dBQW1EOztBQUV4RTs7QUFFQSxHQUFHLElBQVU7QUFDYixtQkFBbUIsMkhBQXlEO0FBQzVFLG1CQUFtQixtQkFBTyxDQUFDLDJIQUF5RDs7QUFFcEYsb0RBQW9ELFFBQVM7O0FBRTdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEMiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjk2NTU2ZDgxODIwZDE4ZjEzOTdlXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImFwcFwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9pbmRleC5qc1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuZnJhbWUtd3JhcCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBmbGV4LXNocmluazogMDtcXG4gIHdpZHRoOiAxODBweDtcXG4gIGhlaWdodDogMTgwcHg7XFxuICBtYXJnaW46IDVweCAwO1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JleTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAwICM4MDgwODA7XFxuICAvKiBpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZDsgKi9cXG59XFxuXFxuLmZyYW1lLXdyYXAub3ZlciB7XFxuICBib3JkZXI6IDJweCBkYXNoZWQgIzAwMDtcXG59XFxuXFxuLmZyYW1lcy13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uYWRkLWJ1dHRvbiB7XFxuICBmbGV4LXNocmluazogMDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTgwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBtYXJnaW46IDVweCAwO1xcbiAgY29sb3I6IGdyYXk7XFxuICBib3JkZXI6IDJweCBzb2xpZCBncmF5O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNXB4IDAgIzgwODA4MDtcXG59XFxuXFxuLmZyYW1lLWJ0biB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXG4gIGNvbG9yOiBncmF5O1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDE4OSwgMTg5LCAxODkpO1xcbiAgYm9yZGVyLXJhZGl1czogNSU7XFxufVxcblxcbi5hY3RpdmUtZnJhbWUge1xcbiAgYm9yZGVyOiAycHggc29saWQgeWVsbG93O1xcbn1cXG5cXG4uZnJhbWUtbnVtIHtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XFxufVxcblxcbi5kZWwtYnV0dG9uIHtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAwO1xcbn1cXG5cXG4uZHVibC1idXR0b24ge1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxufVxcblwiLCBcIlwiXSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIEltcG9ydHNcbnZhciB1cmxFc2NhcGUgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3VybC1lc2NhcGUuanNcIik7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18wX19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuL2Fzc2V0cy9mb250cy9zb3VyY2VzYW5zcHJvLXJlZ3VsYXItd2ViZm9udC53b2ZmMlwiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18xX19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuL2Fzc2V0cy9mb250cy9zb3VyY2VzYW5zcHJvLXJlZ3VsYXItd2ViZm9udC53b2ZmXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzJfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL2ZvbnRzL1NvdXJjZVNhbnNQcm8tUmVndWxhci50dGZcIikpO1xuXG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJTb3VyY2UgU2FucyBQcm9cXFwiO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18wX19fICsgXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSxcXG4gICAgICAgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18xX19fICsgXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLFxcbiAgICAgICB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzJfX18gKyBcIikgZm9ybWF0KFxcXCJ0dGZcXFwiKTtcXG59XFxuXFxuLyotR2xvYmFsLSovXFxuXFxuKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzNXB4IDkydmg7XFxuICBncmlkLXJvdy1nYXA6IDIwcHg7XFxuICBmb250LWZhbWlseTogXFxcIlNvdXJjZSBTYW5zIFByb1xcXCIsIFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbiAgbGluZS1oZWlnaHQ6IDQwcHg7XFxuICBvcGFjaXR5OiAwLjk7XFxufVxcblxcbi8qPT09PT09PT09PT09SEVBREVSPT09PT09PT09PT09Ki9cXG5cXG4uaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICBwYWRkaW5nOiAwIDIwcHg7XFxuICBib3gtc2hhZG93OiAwIDJweCA1cHggMCAjODA4MDgwO1xcbn1cXG5cXG4vKj09PT09PT09PT09PU1BSU49PT09PT09PT09PT0qL1xcblxcbi5tYWluIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEwMHB4IDIwMHB4IDFmciAyMTBweCA1MHB4O1xcbiAgZ3JpZC1jb2x1bW4tZ2FwOiAyMHB4O1xcbiAgcGFkZGluZzogMCAxMHB4O1xcbn1cXG5cXG4uZmlyc3QtY29sdW1uLXdyYXAge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMjBmciAyZnI7XFxufVxcblxcbi5mcmFtZXMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxufVxcblxcbi5jYW52YXMtd3JhcCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uY2FudmFzLWNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5jYW52YXMtaXRlbSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMDtcXG4gIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbiAgYm94LXNoYWRvdzogMCAycHggNXB4IDAgIzgwODA4MDtcXG59XFxuXFxuLmNhbnZhcy1kcmF3LWl0ZW0ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDE7XFxuICBpbWFnZS1yZW5kZXJpbmc6IHBpeGVsYXRlZDtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAwICM4MDgwODA7XFxufVxcblxcbi5hbmltYXRpb24td3JhcCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5hbmltYXRpb24tY29udGFpbmVyIHtcXG4gIHdpZHRoOiAyMTBweDtcXG4gIGhlaWdodDogMjEwcHg7XFxuICBib3gtc2hhZG93OiAwIDJweCA1cHggMCAjODA4MDgwO1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uYW5pbWF0aW9uLWNvbnRhaW5lcjpmdWxsc2NyZWVuIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWQ7XFxufVxcblxcbi5jb250cm9sbGVyLXBhbmVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDVweCAwICM4MDgwODA7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5jdXJyZW50LWNvbnRyb2xsZXItdmFsdWUgc3BhbiB7XFxuICBjb2xvcjogcmVkO1xcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxufVxcblxcbi5kYXRhLWNvbnRhaW5lciB7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXCIsIFwiXCJdKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gSW1wb3J0c1xudmFyIHVybEVzY2FwZSA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvdXJsLWVzY2FwZS5qc1wiKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzBfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL3Blbi10b29sLnBuZ1wiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18xX19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuL2Fzc2V0cy9taXJyb3ItcGVuLXRvb2wucG5nXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzJfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL2VyYXNlci10b29sLnBuZ1wiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX18zX19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuL2Fzc2V0cy9saW5lLXRvb2wucG5nXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzRfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL3JlY3QtdG9vbC5wbmdcIikpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX19fNV9fXyA9IHVybEVzY2FwZShyZXF1aXJlKFwiLi9hc3NldHMvZmlsbC1yZWN0LXRvb2wucG5nXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzZfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL2FyYy10b29sLnBuZ1wiKSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfX183X19fID0gdXJsRXNjYXBlKHJlcXVpcmUoXCIuL2Fzc2V0cy9saWdodGVuLXRvb2wucG5nXCIpKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9fXzhfX18gPSB1cmxFc2NhcGUocmVxdWlyZShcIi4vYXNzZXRzL2NvbG9yLXBpY2tlci10b29sLnBuZ1wiKSk7XG5cbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnRvb2xzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDUsIDQ1cHgpIC8gMWZyIDFmcjtcXG4gIGdyaWQtZ2FwOiA1cHg7XFxufVxcblxcbi50b29sLWl0ZW0ge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JheTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDcwJTtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbi50b29sLWl0ZW06aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzNSwgMjM1LCAyMzUpO1xcbn1cXG5cXG4udG9vbC1pdGVtOmFjdGl2ZSB7XFxuICBib3gtc2hhZG93OiBpbnNldCAxcHggMXB4IDNweCAwIGdyYXk7XFxufVxcblxcbi5hY3RpdmUtdG9vbCB7XFxuICBib3gtc2hhZG93OiBpbnNldCAxcHggMXB4IDNweCAwIGdyYXk7XFxufVxcblxcblxcblxcbi5wZW4tdG9vbCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzBfX18gKyBcIik7XFxufVxcblxcbi5taXJyb3ItcGVuLXRvb2wge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18xX19fICsgXCIpO1xcbn1cXG5cXG4uZXJhc2VyLXRvb2wge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX18yX19fICsgXCIpO1xcbn1cXG5cXG4ubGluZS10b29sIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX19fM19fXyArIFwiKTtcXG59XFxuXFxuLnJlY3QtdG9vbCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzRfX18gKyBcIik7XFxufVxcblxcbi5maWxsLXJlY3QtdG9vbCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzVfX18gKyBcIik7XFxufVxcblxcbi5hcmMtdG9vbCB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9fXzZfX18gKyBcIik7XFxufVxcblxcbi5saWdodGVuLXRvb2wge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX183X19fICsgXCIpO1xcbn1cXG5cXG4uY29sb3ItcGlja2VyLXRvb2wge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfX184X19fICsgXCIpO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gJ0BtZWRpYSAnICsgaXRlbVsyXSArICd7JyArIGNvbnRlbnQgKyAnfSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICAgIH1cbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gbW9kdWxlc1tpXTsgLy8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuICAgICAgLy8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcbiAgICAgIC8vIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cbiAgICAgIC8vIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblxuICAgICAgaWYgKGl0ZW1bMF0gPT0gbnVsbCB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBpZiAobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgICBpdGVtWzJdID0gJygnICsgaXRlbVsyXSArICcpIGFuZCAoJyArIG1lZGlhUXVlcnkgKyAnKSc7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLyc7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG4gIHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXNjYXBlKHVybCwgbmVlZFF1b3Rlcykge1xuICBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dLy50ZXN0KHVybCkgfHwgbmVlZFF1b3Rlcykge1xuICAgIHJldHVybiAnXCInICsgdXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykgKyAnXCInO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gdHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nXG5cdFx0ID8gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcykgXG5cdFx0IDogb3B0aW9ucy50cmFuc2Zvcm0uZGVmYXVsdChvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0aW9uIHtcbiAgc3RhdGljIHN0YXJ0QW5pbWF0aW9uKGZyYW1lc1N0b3JhZ2UpIHtcbiAgICBjb25zdCBhbmltYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGZwc0hhbmRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcHMtaGFuZGxlJyk7XG5cbiAgICBsZXQgaXRlbXNDb3VudCA9IDA7XG5cbiAgICBjb25zdCBmcHNDb3VudCA9IGZwc0hhbmRsZS52YWx1ZUFzTnVtYmVyO1xuXG4gICAgcmV0dXJuIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChpdGVtc0NvdW50IDwgZnJhbWVzU3RvcmFnZS5sZW5ndGgpIHtcbiAgICAgICAgYW5pbWF0aW9uQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtmcmFtZXNTdG9yYWdlW2l0ZW1zQ291bnRdLmNhbnZhc0ltZ30pYDtcbiAgICAgICAgaXRlbXNDb3VudCArPSAxO1xuXG4gICAgICAgIGlmIChpdGVtc0NvdW50ID09PSBmcmFtZXNTdG9yYWdlLmxlbmd0aCkge1xuICAgICAgICAgIGl0ZW1zQ291bnQgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgMTAwMCAvIGZwc0NvdW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnBzSGFuZGxlIHtcbiAgc3RhdGljIGFkZEZwc0hhbmRsZSgpIHtcbiAgICBjb25zdCBjdXJyZW50RnBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZwcycpO1xuICAgIGNvbnN0IGZwc0hhbmRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcHMtaGFuZGxlJyk7XG5cbiAgICBmcHNIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICBjdXJyZW50RnBzLmlubmVySFRNTCA9IGZwc0hhbmRsZS52YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRGYXRIYW5kbGUoKSB7XG4gICAgY29uc3QgY3VycmVudEZhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYXQnKTtcbiAgICBjb25zdCBmYXRIYW5kbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF0LWhhbmRsZScpO1xuXG4gICAgZmF0SGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgY3VycmVudEZhdC5pbm5lckhUTUwgPSBmYXRIYW5kbGUudmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgc3dhcENvbG9yKCkge1xuICAgIGNvbnN0IGNvbG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbG9yLTEnKTtcbiAgICBjb25zdCBjb2xvcjIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29sb3ItMicpO1xuXG4gICAgY29uc3QgY29sb3JTdG9yYWdlID0gY29sb3IudmFsdWU7XG4gICAgY29uc3QgY29sb3JTdG9yYWdlMiA9IGNvbG9yMi52YWx1ZTtcblxuICAgIGNvbG9yLnZhbHVlID0gY29sb3JTdG9yYWdlMjtcbiAgICBjb2xvcjIudmFsdWUgPSBjb2xvclN0b3JhZ2U7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZENhbnZhcyB7XG4gIGNvbnN0cnVjdG9yKHNpemUsIHNjYWxlQ29lZiwgc2hpZnRDb2VmKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLnNjYWxlQ29lZiA9IHNjYWxlQ29lZjtcbiAgICB0aGlzLnNoaWZ0Q29lZiA9IHNoaWZ0Q29lZjtcbiAgICB0aGlzLmN1cnJlbnRUb29sID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZUJ1dHRvbiA9IG51bGw7XG4gIH1cblxuICBjcmVhdGVDYW52YXMoY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLnNpemUpO1xuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuc2l6ZSk7XG5cbiAgICBjYW52YXMuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7dGhpcy5zY2FsZUNvZWZ9KWA7XG4gICAgY2FudmFzLnN0eWxlLnRvcCA9IGAke3RoaXMuc2hpZnRDb2VmfXB4YDtcbiAgICBjYW52YXMuc3R5bGUubGVmdCA9IGAke3RoaXMuc2hpZnRDb2VmfXB4YDtcblxuICAgIHJldHVybiBjYW52YXM7XG4gIH1cblxuICBzdGF0aWMgYWRkQ2FudmFzTGlzdGVuZXJzKGRyYXdDYW52YXMpIHtcbiAgICBjb25zdCBjdXJzb3JDb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3Jkcy1jdXJzb3InKTtcblxuICAgIGRyYXdDYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICAgIGN1cnNvckNvcmRzLmlubmVySFRNTCA9IGB5OiAke2Uub2Zmc2V0WX0sIHg6ICR7ZS5vZmZzZXRYfWA7XG4gICAgfSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjNmNDgyMzIxYmVjZmFhNDBmY2IxOTgyNWZhNzE3ODU5LnR0ZlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImE3M2VhMTI3MzFiMGFmZDg5YmY4N2I4MDNiY2FjNWU3LndvZmZcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJkMTNkZTA5ZjQyNTZmNjU5M2Q0N2UxZDZkZjQ5ZjgwOC53b2ZmMlwiOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZUZyYW1lIHtcbiAgc3RhdGljIGNyZWF0ZUZyYW1lKGZyYW1lTnVtYmVyLCBkZWxDYWxsYmFjaywgY29weUNhbGxiYWNrKSB7XG4gICAgY29uc3QgZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNvbnN0IGZyYW1lTnVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgZGVsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29uc3QgY29weUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gICAgZnJhbWUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdmcmFtZS13cmFwJyk7XG4gICAgZnJhbWUuc3R5bGUub3JkZXIgPSBmcmFtZU51bWJlcjtcbiAgICBmcmFtZS5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG5cbiAgICBmcmFtZU51bS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZyYW1lLWJ0biBmcmFtZS1udW0nKTtcbiAgICBmcmFtZU51bS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICAgIGRlbEJ0bi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZyYW1lLWJ0biBkZWwtYnV0dG9uJyk7XG4gICAgY29weUJ0bi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZyYW1lLWJ0biBkdWJsLWJ1dHRvbicpO1xuXG4gICAgZnJhbWVOdW0uaW5uZXJIVE1MID0gZnJhbWVOdW1iZXI7XG4gICAgZGVsQnRuLmlubmVySFRNTCA9ICdEZWwnO1xuICAgIGNvcHlCdG4uaW5uZXJIVE1MID0gJ0NvcHknO1xuXG4gICAgQ3JlYXRlRnJhbWUuYWRkRnJhbWVMaXN0ZW5lcnMoZGVsQnRuLCBjb3B5QnRuLCBkZWxDYWxsYmFjaywgY29weUNhbGxiYWNrKTtcblxuICAgIGZyYW1lLmFwcGVuZENoaWxkKGZyYW1lTnVtKTtcbiAgICBmcmFtZS5hcHBlbmRDaGlsZChkZWxCdG4pO1xuICAgIGZyYW1lLmFwcGVuZENoaWxkKGNvcHlCdG4pO1xuXG4gICAgcmV0dXJuIGZyYW1lO1xuICB9XG5cbiAgc3RhdGljIGFkZEZyYW1lTGlzdGVuZXJzKGRlbCwgY29weSwgZGVsQ2FsbGJhY2ssIGNvcHlDYWxsYmFjaykge1xuICAgIGRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbENhbGxiYWNrLCBmYWxzZSk7XG4gICAgY29weS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvcHlDYWxsYmFjaywgZmFsc2UpO1xuICB9XG59XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9mcmFtZXMuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2ZyYW1lcy5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2ZyYW1lcy5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJpbXBvcnQgQ3JlYXRlRnJhbWUgZnJvbSAnLi9GcmFtZUNyZWF0ZSc7XG5pbXBvcnQgJy4vZnJhbWVzLmNzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IENyZWF0ZUZyYW1lO1xuIiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgQ3JlYXRlRnJhbWUgZnJvbSAnLi9mcmFtZXMnO1xuaW1wb3J0IENhbnZhc0NyZWF0ZSBmcm9tICcuL0NhbnZhc0NyZWF0ZSc7XG5pbXBvcnQgQWRkVG9vbHMgZnJvbSAnLi90b29scyc7XG5pbXBvcnQgSGFuZGxlcyBmcm9tICcuL0FwcEhhbmRsZXMnO1xuaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuL0FuaW1hdGlvbic7XG5cbmNvbnN0IGZyYW1lc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmFtZXMtY29udGFpbmVyJyk7XG5jb25zdCBjYW52YXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FudmFzLWNvbnRhaW5lcicpO1xuY29uc3QgYW5pbWF0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hdGlvbi1jb250YWluZXInKTtcblxuY29uc3QgZnJhbWVzV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuZnJhbWVzV3JhcC5jbGFzc0xpc3QuYWRkKCdmcmFtZXMtd3JhcHBlcicpO1xuXG5jb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IGZwc0hhbmRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcHMtaGFuZGxlJyk7XG5jb25zdCBjdXJyZW50RnBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZwcycpO1xuY29uc3QgY2FudmFzU2l6ZUhhbmRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW52YXMtc2l6ZS1oYW5kbGUnKTtcbmNvbnN0IGNhbnZhc1NpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzLXNpemUnKTtcblxuY29uc3QgY29sb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29sb3ItMScpO1xuY29uc3QgZmF0SGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdC1oYW5kbGUnKTtcbmNvbnN0IGN1cnJlbnRGYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmF0Jyk7XG5cblxuY29uc3Qgc3dhcENvbG9yQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N3YXAtY29sb3InKTtcblxuY29uc3QgcGVuVG9vbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wZW4tdG9vbCcpO1xuY29uc3QgbWlycm9yUGVuVG9vbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taXJyb3ItcGVuLXRvb2wnKTtcbmNvbnN0IGVyYXNlclRvb2xCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJhc2VyLXRvb2wnKTtcbmNvbnN0IGxpbmVUb29sQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpbmUtdG9vbCcpO1xuY29uc3QgcmVjdFRvb2xCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVjdC10b29sJyk7XG5jb25zdCBmaWxsUmVjdFRvb2xCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsbC1yZWN0LXRvb2wnKTtcbmNvbnN0IGFyY1Rvb2xCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJjLXRvb2wnKTtcbmNvbnN0IGxpZ2h0ZW5Ub29sQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpZ2h0ZW4tdG9vbCcpO1xuY29uc3QgY29sb3JQaWNrZXJUb29sQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG9yLXBpY2tlci10b29sJyk7XG5cbmxldCBhbmltYXRpb25UaW1lcjtcblxuY29uc3QgZnJhbWVzU3RvcmFnZSA9IFtdO1xuXG5sZXQgYWN0aXZlRnJhbWU7XG5cbmxldCBkcmFnU3JjRWwgPSBudWxsO1xubGV0IGZyYW1lQXJyRWxlbSA9IG51bGw7XG5cbmxldCBhY3RpdmVCdXR0b247XG5sZXQgY3VycmVudFRvb2xOYW1lO1xuXG5sZXQgc2NhbGVDb2VmO1xubGV0IHNoaWZ0Q29lZjtcblxuZnVuY3Rpb24gcmVmcmVzaEFuaW1hdGlvbigpIHtcbiAgaWYgKGFuaW1hdGlvblRpbWVyKSB7XG4gICAgY2xlYXJJbnRlcnZhbChhbmltYXRpb25UaW1lcik7XG4gIH1cbiAgYW5pbWF0aW9uVGltZXIgPSBBbmltYXRpb24uc3RhcnRBbmltYXRpb24oZnJhbWVzU3RvcmFnZSk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZUNhbnZhcygpIHtcbiAgY29uc3QgY2FudmFzRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FudmFzLWl0ZW0nKTtcbiAgY29uc3QgY2FudmFzRHJhd0ZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZhcy1kcmF3LWl0ZW0nKTtcbiAgY29uc3Qgc2l6ZUNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXplLWNhbnZhcycpO1xuXG4gIHNjYWxlQ29lZiA9ICsoKDgwMCAvIGNhbnZhc1NpemVIYW5kbGUudmFsdWVBc051bWJlcikudG9GaXhlZCgyKSk7XG4gIHNoaWZ0Q29lZiA9ICg4MDAgLSBjYW52YXNTaXplSGFuZGxlLnZhbHVlQXNOdW1iZXIpIC8gMjtcblxuICBjYW52YXNGaWVsZC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzY2FsZUNvZWZ9KWA7XG4gIGNhbnZhc0RyYXdGaWVsZC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzY2FsZUNvZWZ9KWA7XG5cbiAgY2FudmFzU2l6ZS5pbm5lckhUTUwgPSBjYW52YXNTaXplSGFuZGxlLnZhbHVlO1xuICBzaXplQ2FudmFzLmlubmVySFRNTCA9IGAke2NhbnZhc1NpemVIYW5kbGUudmFsdWV9IHggJHtjYW52YXNTaXplSGFuZGxlLnZhbHVlfWA7XG5cbiAgZnJhbWVzU3RvcmFnZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgY29uc3QgY2FudmFzSXRlbSA9IGVsZW0uY2FudmFzWzBdO1xuICAgIGNvbnN0IGNhbnZhc0l0ZW0xID0gZWxlbS5jYW52YXNbMV07XG5cbiAgICBjYW52YXNJdGVtLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBjYW52YXNTaXplSGFuZGxlLnZhbHVlKTtcbiAgICBjYW52YXNJdGVtLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgY2FudmFzU2l6ZUhhbmRsZS52YWx1ZSk7XG5cbiAgICBjYW52YXNJdGVtMS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgY2FudmFzU2l6ZUhhbmRsZS52YWx1ZSk7XG4gICAgY2FudmFzSXRlbTEuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBjYW52YXNTaXplSGFuZGxlLnZhbHVlKTtcblxuICAgIGNhbnZhc0l0ZW0uc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c2NhbGVDb2VmfSlgO1xuICAgIGNhbnZhc0l0ZW0uc3R5bGUubGVmdCA9IGAke3NoaWZ0Q29lZn1weGA7XG4gICAgY2FudmFzSXRlbS5zdHlsZS50b3AgPSBgJHtzaGlmdENvZWZ9cHhgO1xuICAgIGNhbnZhc0l0ZW0xLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke3NjYWxlQ29lZn0pYDtcbiAgICBjYW52YXNJdGVtMS5zdHlsZS5sZWZ0ID0gYCR7c2hpZnRDb2VmfXB4YDtcbiAgICBjYW52YXNJdGVtMS5zdHlsZS50b3AgPSBgJHtzaGlmdENvZWZ9cHhgO1xuXG4gICAgY29uc3QgY3R4ID0gY2FudmFzSXRlbS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IGVsZW0uY2FudmFzSW1nO1xuXG4gICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRGcmFtZSk7XG5cbiAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVmcmVzaEFuaW1hdGlvbik7XG4gIGZwc0hhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHJlZnJlc2hBbmltYXRpb24pO1xuXG4gIGNhbnZhc1NpemVIYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCByZXNpemVDYW52YXMpO1xuXG4gIEhhbmRsZXMuYWRkRnBzSGFuZGxlKCk7XG4gIEhhbmRsZXMuYWRkRmF0SGFuZGxlKCk7XG4gIHN3YXBDb2xvckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEhhbmRsZXMuc3dhcENvbG9yKTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChlKSA9PiB7XG4gICAgaWYgKGUuZGVsdGFZID4gMCAmJiBjYW52YXNTaXplSGFuZGxlLnZhbHVlQXNOdW1iZXIgPj0gMzIpIHtcbiAgICAgIGNhbnZhc1NpemVIYW5kbGUudmFsdWVBc051bWJlciAtPSAxMDtcbiAgICAgIGNhbnZhc1NpemUuaW5uZXJIVE1MID0gY2FudmFzU2l6ZUhhbmRsZS52YWx1ZTtcbiAgICAgIHJlc2l6ZUNhbnZhcygpO1xuICAgIH1cblxuICAgIGlmIChlLmRlbHRhWSA8IDAgJiYgY2FudmFzU2l6ZUhhbmRsZS52YWx1ZUFzTnVtYmVyIDw9IDgwMCkge1xuICAgICAgY2FudmFzU2l6ZUhhbmRsZS52YWx1ZUFzTnVtYmVyICs9IDEwO1xuICAgICAgY2FudmFzU2l6ZS5pbm5lckhUTUwgPSBjYW52YXNTaXplSGFuZGxlLnZhbHVlO1xuICAgICAgcmVzaXplQ2FudmFzKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnRBcHAoKSB7XG4gIGFkZEJ0bi5pbm5lckhUTUwgPSAnQWRkIG5ldyBmcmFtZSc7XG5cbiAgZnJhbWVzQ29udGFpbmVyLmFwcGVuZENoaWxkKGZyYW1lc1dyYXApO1xuICBmcmFtZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoYWRkQnRuKTtcblxuICBhZGRCdG4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdhZGQtYnV0dG9uJyk7XG5cbiAgYWRkTGlzdGVuZXJzKCk7XG59XG5cbnN0YXJ0QXBwKCk7XG5cbmZ1bmN0aW9uIGFkZFRvb2xzTGlzdGVuZXJzKGNhcnJpZXJDdHgsIGRyYXdDdHgsIGNhcnJpZXJDYW52YXMpIHtcbiAgcmV0dXJuIHtcbiAgICBwZW5Ub29sOiBBZGRUb29scy5hZGRQZW5Ub29sKGNhcnJpZXJDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsXG4gICAgICBjYXJyaWVyQ2FudmFzKSxcbiAgICBtaXJyb3JQZW5Ub29sOiBBZGRUb29scy5hZGRNaXJyb3JQZW5Ub29sKGNhcnJpZXJDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsXG4gICAgICBjYXJyaWVyQ2FudmFzKSxcbiAgICBlcmFzZXJUb29sOiBBZGRUb29scy5hZGRFcmFzZXJUb29sKGNhcnJpZXJDdHgsIGZhdEhhbmRsZSwgZnJhbWVzU3RvcmFnZSxcbiAgICAgIGNhcnJpZXJDYW52YXMpLFxuICAgIGxpbmVUb29sOiBBZGRUb29scy5hZGRMaW5lVG9vbChjYXJyaWVyQ3R4LCBkcmF3Q3R4LCBjb2xvciwgZmF0SGFuZGxlLCBmcmFtZXNTdG9yYWdlLFxuICAgICAgY2FycmllckNhbnZhcyksXG4gICAgcmVjdFRvb2w6IEFkZFRvb2xzLmFkZFJlY3RUb29sKGNhcnJpZXJDdHgsIGRyYXdDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsXG4gICAgICBjYXJyaWVyQ2FudmFzKSxcbiAgICBmaWxsUmVjdFRvb2w6IEFkZFRvb2xzLmFkZEZpbGxSZWN0VG9vbChcbiAgICAgIGNhcnJpZXJDdHgsXG4gICAgICBkcmF3Q3R4LFxuICAgICAgY29sb3IsXG4gICAgICBmYXRIYW5kbGUsXG4gICAgICBmcmFtZXNTdG9yYWdlLFxuICAgICAgY2FycmllckNhbnZhcyxcbiAgICApLFxuICAgIGFyY1Rvb2w6IEFkZFRvb2xzLmFkZEFyY1Rvb2woXG4gICAgICBjYXJyaWVyQ3R4LFxuICAgICAgZHJhd0N0eCxcbiAgICAgIGNvbG9yLFxuICAgICAgZmF0SGFuZGxlLFxuICAgICAgZnJhbWVzU3RvcmFnZSxcbiAgICAgIGNhcnJpZXJDYW52YXMsXG4gICAgKSxcbiAgICBsaWdodGVuVG9vbDogQWRkVG9vbHMuYWRkTGlnaHRlblRvb2woY2FycmllckN0eCwgZmF0SGFuZGxlLCBmcmFtZXNTdG9yYWdlLFxuICAgICAgY2FycmllckNhbnZhcyksXG4gICAgY29sb3JQaWNrZXJUb29sOiBBZGRUb29scy5hZGRDb2xvclBpY2tlclRvb2woY2FycmllckN0eCwgY29sb3IpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjaG9vc2VBY3RpdmVGcmFtZShuZXdGcmFtZSkge1xuICBpZiAoYWN0aXZlRnJhbWUpIHtcbiAgICBhY3RpdmVGcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUtZnJhbWUnLCBmYWxzZSk7XG4gICAgYWN0aXZlRnJhbWUgPSBuZXdGcmFtZTtcbiAgICBhY3RpdmVGcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUtZnJhbWUnLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBhY3RpdmVGcmFtZSA9IG5ld0ZyYW1lO1xuICAgIGFjdGl2ZUZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIHRydWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hDYW52YXMoY2FudmFzQXJyKSB7XG4gIGNhbnZhc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICBjYW52YXNBcnIuZm9yRWFjaChlID0+IGNhbnZhc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlKSk7XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hGcmFtZXMoKSB7XG4gIGZyYW1lc1N0b3JhZ2UuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgIGUuZnJhbWUucXVlcnlTZWxlY3RvcignLmZyYW1lLW51bScpLmlubmVySFRNTCA9IGkgKyAxO1xuICAgIGUuZnJhbWUuc2V0QXR0cmlidXRlKCdpZCcsIGAke2kgKyAxfS1mcmFtZWApO1xuICAgIGUuZnJhbWUuc3R5bGUub3JkZXIgPSBpICsgMTtcbiAgICBlLmNhbnZhc1swXS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aSArIDF9LWNhbnZhc2ApO1xuICAgIGUuY2FudmFzWzFdLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtpICsgMX0tZHJhdy1jYW52YXNgKTtcbiAgICBmcmFtZXNXcmFwLmFwcGVuZENoaWxkKGUuZnJhbWUpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkVG9vbCgpIHtcbiAgYWN0aXZlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS10b29sJywgdHJ1ZSk7XG5cbiAgZnJhbWVzU3RvcmFnZS5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgT2JqZWN0LmtleXMoZWxlbS5jYW52YXNMaXN0ZW5lcnNbY3VycmVudFRvb2xOYW1lXSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBlbGVtLmNhbnZhc1sxXS5hZGRFdmVudExpc3RlbmVyKGAke2tleX1gLCBlbGVtLmNhbnZhc0xpc3RlbmVyc1tjdXJyZW50VG9vbE5hbWVdW2tleV0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVsVG9vbCgpIHtcbiAgaWYgKGN1cnJlbnRUb29sTmFtZSAmJiBhY3RpdmVCdXR0b24pIHtcbiAgICBmcmFtZXNTdG9yYWdlLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGVsZW0uY2FudmFzTGlzdGVuZXJzW2N1cnJlbnRUb29sTmFtZV0pLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBlbGVtLmNhbnZhc1sxXS5yZW1vdmVFdmVudExpc3RlbmVyKGAke2tleX1gLCBlbGVtLmNhbnZhc0xpc3RlbmVyc1tjdXJyZW50VG9vbE5hbWVdW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhY3RpdmVCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlLXRvb2wnLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVsRnJhbWUoZSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gIGNvbnN0IGZyYW1lTnVtID0gcGFyc2VJbnQoZS50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJyksIDEwKTtcblxuICBmcmFtZXNTdG9yYWdlLnNwbGljZShmcmFtZU51bSAtIDEsIDEpO1xuXG4gIGZyYW1lc1dyYXAuaW5uZXJIVE1MID0gJyc7XG5cbiAgY2FudmFzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG4gIGlmIChmcmFtZXNTdG9yYWdlLmxlbmd0aCA+IDApIHtcbiAgICByZWZyZXNoQ2FudmFzKGZyYW1lc1N0b3JhZ2VbZnJhbWVzU3RvcmFnZS5sZW5ndGggLSAxXS5jYW52YXMpO1xuICB9XG5cbiAgaWYgKGZyYW1lc1N0b3JhZ2UubGVuZ3RoID09PSAxKSB7XG4gICAgZGVsVG9vbCgpO1xuICB9XG5cbiAgcmVmcmVzaEZyYW1lcygpO1xufVxuXG5mdW5jdGlvbiBkcmFnQW5kRHJvcChmcmFtZSkge1xuICBmdW5jdGlvbiBoYW5kbGVEcmFnU3RhcnQoZSkge1xuICAgIGNvbnN0IGZyYW1lTnVtID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpLCAxMCk7XG5cbiAgICBmcmFtZUFyckVsZW0gPSBmcmFtZXNTdG9yYWdlLnNwbGljZShmcmFtZU51bSAtIDEsIDEpO1xuXG4gICAgZS50YXJnZXQuc3R5bGUub3BhY2l0eSA9ICcwLjQnO1xuXG4gICAgZHJhZ1NyY0VsID0gZS50YXJnZXQ7XG5cbiAgICBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvaHRtbCcsIGUudGFyZ2V0LnN0eWxlLm9yZGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZURyYWdPdmVyKGUpIHtcbiAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVEcmFnRW50ZXIoZSkge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ292ZXInKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZURyYWdMZWF2ZShlKSB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcicpO1xuICB9XG5cblxuICBmdW5jdGlvbiBoYW5kbGVEcm9wKGUpIHtcbiAgICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgY29uc3QgZnJhbWVOdW0gPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJyksIDEwKTtcblxuICAgIGZyYW1lc1N0b3JhZ2Uuc3BsaWNlKGZyYW1lTnVtIC0gMSwgMCwgLi4uZnJhbWVBcnJFbGVtKTtcblxuICAgIGRyYWdTcmNFbC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuXG4gICAgaWYgKGRyYWdTcmNFbCAhPT0gZS50YXJnZXQpIHtcbiAgICAgIGRyYWdTcmNFbC5zdHlsZS5vcmRlciA9IGUudGFyZ2V0LnN0eWxlLm9yZGVyO1xuICAgICAgZS50YXJnZXQuc3R5bGUub3JkZXIgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L2h0bWwnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVEcmFnRW5kKCkge1xuICAgIGZyYW1lc1N0b3JhZ2UuZm9yRWFjaChlID0+IGUuZnJhbWUuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcicpKTtcbiAgICByZWZyZXNoRnJhbWVzKCk7XG4gIH1cblxuICBmcmFtZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBoYW5kbGVEcmFnU3RhcnQsIGZhbHNlKTtcbiAgZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgaGFuZGxlRHJhZ0VudGVyLCBmYWxzZSk7XG4gIGZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIsIGZhbHNlKTtcbiAgZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgaGFuZGxlRHJhZ0xlYXZlLCBmYWxzZSk7XG4gIGZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBoYW5kbGVEcm9wLCBmYWxzZSk7XG4gIGZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBoYW5kbGVEcmFnRW5kLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGNvcHlGcmFtZShlKSB7XG4gIGxldCBmcmFtZU51bTtcblxuICBpZiAoZS50eXBlID09PSAnY2xpY2snKSB7XG4gICAgZnJhbWVOdW0gPSBwYXJzZUludChlLnRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnaWQnKSwgMTApO1xuICB9IGVsc2Uge1xuICAgIGZyYW1lTnVtID0gcGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoJ2lkJyksIDEwKTtcbiAgfVxuXG4gIGNvbnN0IGNvcHlFbGVtID0gZnJhbWVzU3RvcmFnZS5zbGljZShmcmFtZU51bSAtIDEsIGZyYW1lTnVtKTtcblxuICBjb25zdCBjbG9uZUZyYW1lID0gY29weUVsZW1bMF0uZnJhbWUuY2xvbmVOb2RlKHRydWUpO1xuICBjb25zdCBjbG9uZUNhcnJpZXJDYW52YXMgPSBjb3B5RWxlbVswXS5jYW52YXNbMF0uY2xvbmVOb2RlKHRydWUpO1xuICBjb25zdCBjbG9uZURyYXdDYW52YXMgPSBjb3B5RWxlbVswXS5jYW52YXNbMV0uY2xvbmVOb2RlKHRydWUpO1xuXG4gIGNvbnN0IGRlbEJ0biA9IGNsb25lRnJhbWUucXVlcnlTZWxlY3RvcignLmRlbC1idXR0b24nKTtcbiAgY29uc3QgY29weUJ0biA9IGNsb25lRnJhbWUucXVlcnlTZWxlY3RvcignLmR1YmwtYnV0dG9uJyk7XG5cbiAgQ3JlYXRlRnJhbWUuYWRkRnJhbWVMaXN0ZW5lcnMoZGVsQnRuLCBjb3B5QnRuLCBkZWxGcmFtZSwgY29weUZyYW1lKTtcblxuICBkcmFnQW5kRHJvcChjbG9uZUZyYW1lKTtcblxuICBjb25zdCBjYXJyaWVyQ3R4ID0gY2xvbmVDYXJyaWVyQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGNvbnN0IGRyYXdDdHggPSBjbG9uZURyYXdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICBjYXJyaWVyQ3R4LmRyYXdJbWFnZShjb3B5RWxlbVswXS5jYW52YXNbMF0sIDAsIDApO1xuXG4gIENhbnZhc0NyZWF0ZS5hZGRDYW52YXNMaXN0ZW5lcnMoY2xvbmVEcmF3Q2FudmFzKTtcblxuICBjaG9vc2VBY3RpdmVGcmFtZShjbG9uZUZyYW1lKTtcblxuICBmcmFtZXNTdG9yYWdlLnNwbGljZShmcmFtZU51bSwgMCwge1xuICAgIGZyYW1lOiBjbG9uZUZyYW1lLFxuICAgIGNhbnZhczogW1xuICAgICAgY2xvbmVDYXJyaWVyQ2FudmFzLFxuICAgICAgY2xvbmVEcmF3Q2FudmFzLFxuICAgIF0sXG4gICAgY2FudmFzTGlzdGVuZXJzOiBhZGRUb29sc0xpc3RlbmVycyhjYXJyaWVyQ3R4LCBkcmF3Q3R4LCBjbG9uZUNhcnJpZXJDYW52YXMpLFxuICB9KTtcblxuICBpZiAoY3VycmVudFRvb2xOYW1lICYmIGFjdGl2ZUJ1dHRvbikge1xuICAgIGFkZFRvb2woKTtcbiAgfVxuXG4gIHJlZnJlc2hGcmFtZXMoKTtcblxuICByZWZyZXNoQ2FudmFzKFtjbG9uZUNhcnJpZXJDYW52YXMsIGNsb25lRHJhd0NhbnZhc10pO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VUb29sKGJ1dHRvbiwgdG9vbCkge1xuICBkZWxUb29sKCk7XG5cbiAgYWN0aXZlQnV0dG9uID0gYnV0dG9uO1xuICBjdXJyZW50VG9vbE5hbWUgPSB0b29sO1xuXG4gIGFkZFRvb2woKTtcbn1cblxuZnVuY3Rpb24gYWRkRnJhbWUoKSB7XG4gIGNvbnN0IGZyYW1lID0gQ3JlYXRlRnJhbWUuY3JlYXRlRnJhbWUoZnJhbWVzU3RvcmFnZS5sZW5ndGggKyAxLCBkZWxGcmFtZSwgY29weUZyYW1lKTtcbiAgY29uc3QgY2FudmFzT2JqID0gbmV3IENhbnZhc0NyZWF0ZShjYW52YXNTaXplSGFuZGxlLnZhbHVlLCBzY2FsZUNvZWYsIHNoaWZ0Q29lZik7XG4gIGNvbnN0IGNhcnJpZXJDYW52YXMgPSBjYW52YXNPYmouY3JlYXRlQ2FudmFzKCdjYW52YXMtaXRlbScpO1xuICBjb25zdCBkcmF3Q2FudmFzID0gY2FudmFzT2JqLmNyZWF0ZUNhbnZhcygnY2FudmFzLWRyYXctaXRlbScpO1xuXG4gIGNvbnN0IGNhcnJpZXJDdHggPSBjYXJyaWVyQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGNvbnN0IGRyYXdDdHggPSBkcmF3Q2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgQ2FudmFzQ3JlYXRlLmFkZENhbnZhc0xpc3RlbmVycyhkcmF3Q2FudmFzKTtcblxuICBkcmFnQW5kRHJvcChmcmFtZSk7XG5cbiAgcmVmcmVzaENhbnZhcyhbY2FycmllckNhbnZhcywgZHJhd0NhbnZhc10pO1xuXG4gIGZyYW1lc1N0b3JhZ2UucHVzaCh7XG4gICAgZnJhbWUsXG4gICAgY2FudmFzOiBbXG4gICAgICBjYXJyaWVyQ2FudmFzLFxuICAgICAgZHJhd0NhbnZhcyxcbiAgICBdLFxuICAgIGNhbnZhc0xpc3RlbmVyczogYWRkVG9vbHNMaXN0ZW5lcnMoY2FycmllckN0eCwgZHJhd0N0eCwgY2FycmllckNhbnZhcyksXG4gIH0pO1xuXG4gIGlmIChjdXJyZW50VG9vbE5hbWUgJiYgYWN0aXZlQnV0dG9uKSB7XG4gICAgYWRkVG9vbCgpO1xuICB9IGVsc2Uge1xuICAgIGFjdGl2ZUJ1dHRvbiA9IHBlblRvb2xCdXR0b247XG4gICAgY3VycmVudFRvb2xOYW1lID0gJ3BlblRvb2wnO1xuXG4gICAgYWRkVG9vbCgpO1xuICB9XG5cbiAgY29uc3QgZnJhbWVTdG9yYWdlTGVuZ3RoID0gZnJhbWVzU3RvcmFnZS5sZW5ndGg7XG5cbiAgZnJhbWVzU3RvcmFnZVtmcmFtZVN0b3JhZ2VMZW5ndGggLSAxXS5mcmFtZS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7ZnJhbWVTdG9yYWdlTGVuZ3RofS1mcmFtZWApO1xuICBmcmFtZXNTdG9yYWdlW2ZyYW1lU3RvcmFnZUxlbmd0aCAtIDFdLmNhbnZhc1swXS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7ZnJhbWVTdG9yYWdlTGVuZ3RofS1jYW52YXNgKTtcbiAgZnJhbWVzU3RvcmFnZVtmcmFtZVN0b3JhZ2VMZW5ndGggLSAxXS5jYW52YXNbMV0uc2V0QXR0cmlidXRlKCdpZCcsIGAke2ZyYW1lU3RvcmFnZUxlbmd0aH0tZHJhdy1jYW52YXNgKTtcblxuICBmcmFtZXNTdG9yYWdlLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICBpZiAoZnJhbWVzU3RvcmFnZS5sZW5ndGggLSAxID09PSBpKSB7XG4gICAgICBhY3RpdmVGcmFtZSA9IGUuZnJhbWU7XG4gICAgICBlLmZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLmZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBmcmFtZXNXcmFwLmFwcGVuZENoaWxkKGUuZnJhbWUpO1xuICB9KTtcbn1cblxuY29uc3QgY2hvb3NlVG9vbHNTdG9yYWdlID0ge1xuICBwZW5Ub29sKCkge1xuICAgIGNob29zZVRvb2wocGVuVG9vbEJ1dHRvbiwgJ3BlblRvb2wnKTtcbiAgfSxcbiAgbWlycm9yUGVuVG9vbCgpIHtcbiAgICBjaG9vc2VUb29sKG1pcnJvclBlblRvb2xCdXR0b24sICdtaXJyb3JQZW5Ub29sJyk7XG4gIH0sXG4gIGVyYXNlclRvb2woKSB7XG4gICAgY2hvb3NlVG9vbChlcmFzZXJUb29sQnV0dG9uLCAnZXJhc2VyVG9vbCcpO1xuICB9LFxuICBsaW5lVG9vbCgpIHtcbiAgICBjaG9vc2VUb29sKGxpbmVUb29sQnV0dG9uLCAnbGluZVRvb2wnKTtcbiAgfSxcbiAgcmVjdFRvb2woKSB7XG4gICAgY2hvb3NlVG9vbChyZWN0VG9vbEJ1dHRvbiwgJ3JlY3RUb29sJyk7XG4gIH0sXG4gIGZpbGxSZWN0VG9vbCgpIHtcbiAgICBjaG9vc2VUb29sKGZpbGxSZWN0VG9vbEJ1dHRvbiwgJ2ZpbGxSZWN0VG9vbCcpO1xuICB9LFxuICBjaXJjbGVUb29sKCkge1xuICAgIGNob29zZVRvb2woYXJjVG9vbEJ1dHRvbiwgJ2FyY1Rvb2wnKTtcbiAgfSxcbiAgbGlnaHRlblRvb2woKSB7XG4gICAgY2hvb3NlVG9vbChsaWdodGVuVG9vbEJ1dHRvbiwgJ2xpZ2h0ZW5Ub29sJyk7XG4gIH0sXG4gIGNvbG9yUGlja2VyVG9vbCgpIHtcbiAgICBjaG9vc2VUb29sKGNvbG9yUGlja2VyVG9vbEJ1dHRvbiwgJ2NvbG9yUGlja2VyVG9vbCcpO1xuICB9LFxufTtcblxuY29uc3QgdG9vbHNTdG9yYWdlID0ge1xuICBwZW5Ub29sOiB7IGJ1dHRvbjogcGVuVG9vbEJ1dHRvbiwgY2FsbGJhY2s6IGNob29zZVRvb2xzU3RvcmFnZS5wZW5Ub29sIH0sXG4gIG1pcnJvclBlblRvb2w6IHsgYnV0dG9uOiBtaXJyb3JQZW5Ub29sQnV0dG9uLCBjYWxsYmFjazogY2hvb3NlVG9vbHNTdG9yYWdlLm1pcnJvclBlblRvb2wgfSxcbiAgZXJhc2VyVG9vbDogeyBidXR0b246IGVyYXNlclRvb2xCdXR0b24sIGNhbGxiYWNrOiBjaG9vc2VUb29sc1N0b3JhZ2UuZXJhc2VyVG9vbCB9LFxuICBsaW5lVG9vbDogeyBidXR0b246IGxpbmVUb29sQnV0dG9uLCBjYWxsYmFjazogY2hvb3NlVG9vbHNTdG9yYWdlLmxpbmVUb29sIH0sXG4gIHJlY3RUb29sOiB7IGJ1dHRvbjogcmVjdFRvb2xCdXR0b24sIGNhbGxiYWNrOiBjaG9vc2VUb29sc1N0b3JhZ2UucmVjdFRvb2wgfSxcbiAgZmlsbFJlY3RUb29sOiB7IGJ1dHRvbjogZmlsbFJlY3RUb29sQnV0dG9uLCBjYWxsYmFjazogY2hvb3NlVG9vbHNTdG9yYWdlLmZpbGxSZWN0VG9vbCB9LFxuICBhcmNUb29sOiB7IGJ1dHRvbjogYXJjVG9vbEJ1dHRvbiwgY2FsbGJhY2s6IGNob29zZVRvb2xzU3RvcmFnZS5jaXJjbGVUb29sIH0sXG4gIGxpZ2h0ZW5Ub29sOiB7IGJ1dHRvbjogbGlnaHRlblRvb2xCdXR0b24sIGNhbGxiYWNrOiBjaG9vc2VUb29sc1N0b3JhZ2UubGlnaHRlblRvb2wgfSxcbiAgY29sb3JQaWNrZXJUb29sOiB7IGJ1dHRvbjogY29sb3JQaWNrZXJUb29sQnV0dG9uLCBjYWxsYmFjazogY2hvb3NlVG9vbHNTdG9yYWdlLmNvbG9yUGlja2VyVG9vbCB9LFxufTtcblxuT2JqZWN0LmtleXModG9vbHNTdG9yYWdlKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgdG9vbHNTdG9yYWdlW2tleV0uYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9vbHNTdG9yYWdlW2tleV0uY2FsbGJhY2spO1xufSk7XG5cbmNvbnN0IGtleUNvZGVzID0ge1xuICBrZXlQOiA4MCxcbiAga2V5VjogODYsXG4gIGtleUU6IDY5LFxuICBrZXlMOiA3NixcbiAga2V5UjogODIsXG4gIGtleUM6IDY3LFxuICBrZXlVOiA4NSxcbiAga2V5TzogNzksXG4gIGtleVNoaWZ0OiAxNixcbiAga2V5TjogNzgsXG4gIGtleVg6IDg4LFxuICBrZXlGOiA3MCxcbiAga2V5UGx1czogMTA3LFxuICBrZXlNaW51czogMTA5LFxuICBrZXlUb3BBcnJvdzogMzgsXG4gIGtleUJvdHRvbUFycm93OiA0MCxcbiAga2V5TWludXNGYXQ6IDIxOSxcbiAga2V5UGx1c0ZhdDogMjIxLFxuICBrZXlDdHJsOiAxNyxcbn07XG5cbmZ1bmN0aW9uIGFkZFRvb2xzSG90S2V5cygpIHtcbiAgY29uc3QgcmVjdENvbWJvID0geyBrZXlSOiBmYWxzZSwga2V5Q3RybDogZmFsc2UgfTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlQOlxuICAgICAgICBjaG9vc2VUb29sc1N0b3JhZ2UucGVuVG9vbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5VjpcbiAgICAgICAgY2hvb3NlVG9vbHNTdG9yYWdlLm1pcnJvclBlblRvb2woKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleUU6XG4gICAgICAgIGNob29zZVRvb2xzU3RvcmFnZS5lcmFzZXJUb29sKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlMOlxuICAgICAgICBjaG9vc2VUb29sc1N0b3JhZ2UubGluZVRvb2woKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleVI6XG4gICAgICAgIHJlY3RDb21iby5rZXlSID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleUM6XG4gICAgICAgIGNob29zZVRvb2xzU3RvcmFnZS5jaXJjbGVUb29sKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlVOlxuICAgICAgICBjaG9vc2VUb29sc1N0b3JhZ2UubGlnaHRlblRvb2woKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleU86XG4gICAgICAgIGNob29zZVRvb2xzU3RvcmFnZS5jb2xvclBpY2tlclRvb2woKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleUN0cmw6XG4gICAgICAgIHJlY3RDb21iby5rZXlDdHJsID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgKHJlY3RDb21iby5rZXlSICYmIHJlY3RDb21iby5rZXlDdHJsKTpcbiAgICAgICAgY2hvb3NlVG9vbHNTdG9yYWdlLmZpbGxSZWN0VG9vbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKHJlY3RDb21iby5rZXlSICYmIHJlY3RDb21iby5rZXlDdHJsID09PSBmYWxzZSk6XG4gICAgICAgIGNob29zZVRvb2xzU3RvcmFnZS5yZWN0VG9vbCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleVI6XG4gICAgICAgIHJlY3RDb21iby5rZXlSID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlDdHJsOlxuICAgICAgICByZWN0Q29tYm8ua2V5Q3RybCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNob29zZVByZXZGcmFtZSgpIHtcbiAgY29uc3QgZnJhbWVOdW0gPSBwYXJzZUludChhY3RpdmVGcmFtZS5nZXRBdHRyaWJ1dGUoJ2lkJyksIDEwKTtcblxuICBpZiAoZnJhbWVOdW0gPiAxKSB7XG4gICAgaWYgKGFjdGl2ZUZyYW1lKSB7XG4gICAgICBhY3RpdmVGcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUtZnJhbWUnLCBmYWxzZSk7XG4gICAgICBhY3RpdmVGcmFtZSA9IGZyYW1lc1N0b3JhZ2VbZnJhbWVOdW0gLSAyXS5mcmFtZTtcbiAgICAgIGFjdGl2ZUZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVGcmFtZSA9IGZyYW1lc1N0b3JhZ2VbZnJhbWVOdW0gLSAyXS5mcmFtZTtcbiAgICAgIGFjdGl2ZUZyYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1mcmFtZScsIHRydWUpO1xuICAgIH1cblxuICAgIHJlZnJlc2hDYW52YXMoZnJhbWVzU3RvcmFnZVtmcmFtZU51bSAtIDJdLmNhbnZhcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hvb3NlTmV4dEZyYW1lKCkge1xuICBjb25zdCBmcmFtZU51bSA9IHBhcnNlSW50KGFjdGl2ZUZyYW1lLmdldEF0dHJpYnV0ZSgnaWQnKSwgMTApO1xuXG4gIGlmIChmcmFtZU51bSA8IGZyYW1lc1N0b3JhZ2UubGVuZ3RoKSB7XG4gICAgaWYgKGFjdGl2ZUZyYW1lKSB7XG4gICAgICBhY3RpdmVGcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUtZnJhbWUnLCBmYWxzZSk7XG4gICAgICBhY3RpdmVGcmFtZSA9IGZyYW1lc1N0b3JhZ2VbZnJhbWVOdW1dLmZyYW1lO1xuICAgICAgYWN0aXZlRnJhbWUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlLWZyYW1lJywgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZUZyYW1lID0gZnJhbWVzU3RvcmFnZVtmcmFtZU51bV0uZnJhbWU7XG4gICAgICBhY3RpdmVGcmFtZS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUtZnJhbWUnLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZWZyZXNoQ2FudmFzKGZyYW1lc1N0b3JhZ2VbZnJhbWVOdW1dLmNhbnZhcyk7XG4gIH1cbn1cblxuYWRkVG9vbHNIb3RLZXlzKCk7XG5cbmZ1bmN0aW9uIGFkZEludGVyZmFzZUhvdEtleXMoKSB7XG4gIGNvbnN0IGNvcHlGcmFtZUNvbWJvID0geyBrZXlTaGlmdDogbnVsbCwga2V5TjogbnVsbCB9O1xuICBjb25zdCBmcHNDb21ibyA9IHsga2V5RjogbnVsbCwga2V5UGx1czogbnVsbCwga2V5TWludXM6IG51bGwgfTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlTaGlmdDpcbiAgICAgICAgY29weUZyYW1lQ29tYm8ua2V5U2hpZnQgPSBrZXlDb2Rlcy5rZXlTaGlmdDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleU46XG4gICAgICAgIGNvcHlGcmFtZUNvbWJvLmtleU4gPSBrZXlDb2Rlcy5rZXlOO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5WDpcbiAgICAgICAgSGFuZGxlcy5zd2FwQ29sb3IoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleUY6XG4gICAgICAgIGZwc0NvbWJvLmtleUYgPSBrZXlDb2Rlcy5rZXlGO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5UGx1czpcbiAgICAgICAgZnBzQ29tYm8ua2V5UGx1cyA9IGtleUNvZGVzLmtleVBsdXM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlNaW51czpcbiAgICAgICAgZnBzQ29tYm8ua2V5TWludXMgPSBrZXlDb2Rlcy5rZXlNaW51cztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleVRvcEFycm93OlxuICAgICAgICBjaG9vc2VQcmV2RnJhbWUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleUJvdHRvbUFycm93OlxuICAgICAgICBjaG9vc2VOZXh0RnJhbWUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleU1pbnVzRmF0OlxuICAgICAgICBmYXRIYW5kbGUudmFsdWUgLT0gMTtcbiAgICAgICAgY3VycmVudEZhdC5pbm5lckhUTUwgPSBmYXRIYW5kbGUudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlQbHVzRmF0OlxuICAgICAgICBmYXRIYW5kbGUudmFsdWUgKz0gMTtcbiAgICAgICAgY3VycmVudEZhdC5pbm5lckhUTUwgPSBmYXRIYW5kbGUudmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIChjb3B5RnJhbWVDb21iby5rZXlTaGlmdCA9PT0ga2V5Q29kZXMua2V5U2hpZnQgJiYgY29weUZyYW1lQ29tYm8ua2V5TiA9PT0ga2V5Q29kZXMua2V5Tik6XG4gICAgICAgIGNvcHlGcmFtZShhY3RpdmVGcmFtZSk7XG4gICAgICAgIHJlZnJlc2hBbmltYXRpb24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIChjb3B5RnJhbWVDb21iby5rZXlTaGlmdCA9PT0gbnVsbCAmJiBjb3B5RnJhbWVDb21iby5rZXlOID09PSBrZXlDb2Rlcy5rZXlOKTpcbiAgICAgICAgYWRkRnJhbWUoKTtcbiAgICAgICAgcmVmcmVzaEFuaW1hdGlvbigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKGZwc0NvbWJvLmtleUYgPT09IGtleUNvZGVzLmtleUYgJiYgZnBzQ29tYm8ua2V5UGx1cyA9PT0ga2V5Q29kZXMua2V5UGx1cyk6XG4gICAgICAgIGZwc0hhbmRsZS52YWx1ZSArPSAxO1xuICAgICAgICBjdXJyZW50RnBzLmlubmVySFRNTCA9IGZwc0hhbmRsZS52YWx1ZTtcbiAgICAgICAgcmVmcmVzaEFuaW1hdGlvbigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgKGZwc0NvbWJvLmtleUYgPT09IGtleUNvZGVzLmtleUYgJiYgZnBzQ29tYm8ua2V5TWludXMgPT09IGtleUNvZGVzLmtleU1pbnVzKTpcbiAgICAgICAgZnBzSGFuZGxlLnZhbHVlIC09IDE7XG4gICAgICAgIGN1cnJlbnRGcHMuaW5uZXJIVE1MID0gZnBzSGFuZGxlLnZhbHVlO1xuICAgICAgICByZWZyZXNoQW5pbWF0aW9uKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5U2hpZnQ6XG4gICAgICAgIGNvcHlGcmFtZUNvbWJvLmtleVNoaWZ0ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleU46XG4gICAgICAgIGNvcHlGcmFtZUNvbWJvLmtleU4gPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2Uga2V5Q29kZXMua2V5RjpcbiAgICAgICAgZnBzQ29tYm8ua2V5RiA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBrZXlDb2Rlcy5rZXlQbHVzOlxuICAgICAgICBmcHNDb21iby5rZXlQbHVzID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGtleUNvZGVzLmtleU1pbnVzOlxuICAgICAgICBmcHNDb21iby5rZXlNaW51cyA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcbn1cblxuYWRkSW50ZXJmYXNlSG90S2V5cygpO1xuXG5mcmFtZXNXcmFwLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gIGNvbnN0IGZyYW1lTnVtID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpLCAxMCk7XG5cbiAgY2hvb3NlQWN0aXZlRnJhbWUoZS50YXJnZXQpO1xuXG4gIGlmIChmcmFtZXNTdG9yYWdlLmxlbmd0aCA+IDApIHtcbiAgICByZWZyZXNoQ2FudmFzKGZyYW1lc1N0b3JhZ2VbZnJhbWVOdW0gLSAxXS5jYW52YXMpO1xuICB9XG59LCB0cnVlKTtcblxuZnVuY3Rpb24gdG9nZ2xlRnVsbFNjcmVlbigpIHtcbiAgaWYgKCFhbmltYXRpb25Db250YWluZXIuZnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICBhbmltYXRpb25Db250YWluZXIucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgfSBlbHNlIGlmIChhbmltYXRpb25Db250YWluZXIuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBhbmltYXRpb25Db250YWluZXIuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgY29uc3Qga2V5RjExID0gMTIyO1xuXG4gIGlmIChlLmtleUNvZGUgPT09IGtleUYxMSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRvZ2dsZUZ1bGxTY3JlZW4oKTtcbiAgfVxufSwgZmFsc2UpO1xuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRUb29scyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5hY3RpdmVUb29sID0gbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBhZGRQZW5Ub29sKGNhcnJpZXJDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpIHtcbiAgICBsZXQgbW91c2VEb3duO1xuXG4gICAgY29uc3QgcGVuVG9vbERvd24gPSAoZSkgPT4ge1xuICAgICAgbW91c2VEb3duID0gdHJ1ZTtcblxuICAgICAgY2FycmllckN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGNhcnJpZXJDdHguc3Ryb2tlU3R5bGUgPSBjb2xvci52YWx1ZTtcbiAgICAgIGNhcnJpZXJDdHgubGluZVdpZHRoID0gZmF0SGFuZGxlLnZhbHVlO1xuICAgICAgY2FycmllckN0eC5tb3ZlVG8oZS5vZmZzZXRYLCBlLm9mZnNldFkpO1xuICAgIH07XG5cbiAgICBjb25zdCBwZW5Ub29sTW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAoIW1vdXNlRG93bikgcmV0dXJuO1xuXG4gICAgICBjYXJyaWVyQ3R4LmxpbmVUbyhlLm9mZnNldFgsIGUub2Zmc2V0WSk7XG4gICAgICBjYXJyaWVyQ3R4LnN0cm9rZSgpO1xuICAgIH07XG5cbiAgICBjb25zdCBwZW5Ub29sVXAgPSAoZSkgPT4ge1xuICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICBBZGRUb29scy5hZGRDYW52YXNUb0ZyYW1lTGlzdGVuZXIoZS50YXJnZXQsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpO1xuICAgIH07XG5cbiAgICBjb25zdCBwZW5Ub29sTGVhdmUgPSAoKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdXNlZG93bjogcGVuVG9vbERvd24sXG4gICAgICBtb3VzZW1vdmU6IHBlblRvb2xNb3ZlLFxuICAgICAgbW91c2V1cDogcGVuVG9vbFVwLFxuICAgICAgbW91c2VsZWF2ZTogcGVuVG9vbExlYXZlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgYWRkTWlycm9yUGVuVG9vbChjYXJyaWVyQ3R4LCBjb2xvciwgZmF0SGFuZGxlLCBmcmFtZXNTdG9yYWdlLCBjYXJyaWVyQ2FudmFzKSB7XG4gICAgY29uc3QgY2FudmFzU2l6ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW52YXMtc2l6ZS1oYW5kbGUnKTtcbiAgICBsZXQgbW91c2VEb3duO1xuXG4gICAgY29uc3QgbWlycm9yUGVuVG9vbERvd24gPSAoKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSB0cnVlO1xuICAgICAgY2FycmllckN0eC5maWxsU3R5bGUgPSBjb2xvci52YWx1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgbWlycm9yUGVuVG9vbE1vdmUgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFtb3VzZURvd24pIHJldHVybjtcblxuICAgICAgY29uc3QgZmF0U2l6ZSA9IGZhdEhhbmRsZS52YWx1ZUFzTnVtYmVyO1xuXG4gICAgICBjYXJyaWVyQ3R4LmZpbGxSZWN0KGUub2Zmc2V0WCwgZS5vZmZzZXRZLCBmYXRTaXplLCBmYXRTaXplKTtcbiAgICAgIGNhcnJpZXJDdHguZmlsbFJlY3QoY2FudmFzU2l6ZS52YWx1ZUFzTnVtYmVyIC0gZS5vZmZzZXRYLCBlLm9mZnNldFksIGZhdFNpemUsIGZhdFNpemUpO1xuICAgIH07XG5cbiAgICBjb25zdCBtaXJyb3JQZW5Ub29sVXAgPSAoZSkgPT4ge1xuICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICBBZGRUb29scy5hZGRDYW52YXNUb0ZyYW1lTGlzdGVuZXIoZS50YXJnZXQsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpO1xuICAgIH07XG5cbiAgICBjb25zdCBtaXJyb3JQZW5Ub29sTGVhdmUgPSAoKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgbWlycm9yUGVuVG9vbCA9IHtcbiAgICAgIG1vdXNlZG93bjogbWlycm9yUGVuVG9vbERvd24sXG4gICAgICBtb3VzZW1vdmU6IG1pcnJvclBlblRvb2xNb3ZlLFxuICAgICAgbW91c2V1cDogbWlycm9yUGVuVG9vbFVwLFxuICAgICAgbW91c2VsZWF2ZTogbWlycm9yUGVuVG9vbExlYXZlLFxuICAgIH07XG5cbiAgICByZXR1cm4gbWlycm9yUGVuVG9vbDtcbiAgfVxuXG4gIHN0YXRpYyBhZGRFcmFzZXJUb29sKGNhcnJpZXJDdHgsIGZhdEhhbmRsZSwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcykge1xuICAgIGxldCBtb3VzZURvd247XG5cbiAgICBjb25zdCBlcmFzZXJUb29sRG93biA9ICgpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IHRydWU7XG5cbiAgICAgIGNhcnJpZXJDdHguYmVnaW5QYXRoKCk7XG4gICAgICBjYXJyaWVyQ3R4LnN0cm9rZVN0eWxlID0gJyNmZmYnO1xuICAgICAgY2FycmllckN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICBjYXJyaWVyQ3R4LmxpbmVXaWR0aCA9IGZhdEhhbmRsZS52YWx1ZTtcbiAgICB9O1xuXG4gICAgY29uc3QgZXJhc2VyVG9vbE1vdmUgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFtb3VzZURvd24pIHJldHVybjtcblxuICAgICAgY29uc3QgeENvcmQgPSBlLm9mZnNldFg7XG4gICAgICBjb25zdCB5Q29yZCA9IGUub2Zmc2V0WTtcblxuICAgICAgY2FycmllckN0eC5saW5lVG8oeENvcmQsIHlDb3JkKTtcbiAgICAgIGNhcnJpZXJDdHguc3Ryb2tlKCk7XG5cbiAgICAgIGNhcnJpZXJDdHguYmVnaW5QYXRoKCk7XG4gICAgICBjYXJyaWVyQ3R4LmFyYyh4Q29yZCwgeUNvcmQsIGZhdEhhbmRsZS52YWx1ZUFzTnVtYmVyIC8gMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY2FycmllckN0eC5maWxsKCk7XG5cbiAgICAgIGNhcnJpZXJDdHguYmVnaW5QYXRoKCk7XG4gICAgICBjYXJyaWVyQ3R4Lm1vdmVUbyh4Q29yZCwgeUNvcmQpO1xuICAgIH07XG5cbiAgICBjb25zdCBlcmFzZXJUb29sVXAgPSAoZSkgPT4ge1xuICAgICAgbW91c2VEb3duID0gZmFsc2U7XG5cbiAgICAgIGNhcnJpZXJDdHguYmVnaW5QYXRoKCk7XG4gICAgICBBZGRUb29scy5hZGRDYW52YXNUb0ZyYW1lTGlzdGVuZXIoZS50YXJnZXQsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpO1xuICAgIH07XG5cbiAgICBjb25zdCBlcmFzZXJUb29sTW91c2VMZWF2ZSA9ICgpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgbW91c2Vkb3duOiBlcmFzZXJUb29sRG93bixcbiAgICAgIG1vdXNlbW92ZTogZXJhc2VyVG9vbE1vdmUsXG4gICAgICBtb3VzZXVwOiBlcmFzZXJUb29sVXAsXG4gICAgICBtb3VzZWxlYXZlOiBlcmFzZXJUb29sTW91c2VMZWF2ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGFkZExpbmVUb29sKGNhcnJpZXJDdHgsIGRyYXdDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpIHtcbiAgICBjb25zdCBjYW52YXNTaXplSGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZhcy1zaXplLWhhbmRsZScpO1xuXG4gICAgbGV0IG1vdXNlRG93bjtcbiAgICBsZXQgY2FudmFzU2l6ZTtcblxuICAgIGxldCBzdGFydFg7XG4gICAgbGV0IHN0YXJ0WTtcblxuICAgIGNvbnN0IGxpbmVUb29sRG93biA9IChlKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSB0cnVlO1xuXG4gICAgICBzdGFydFggPSBlLm9mZnNldFg7XG4gICAgICBzdGFydFkgPSBlLm9mZnNldFk7XG5cbiAgICAgIGNhcnJpZXJDdHguYmVnaW5QYXRoKCk7XG4gICAgICBjYXJyaWVyQ3R4LnN0cm9rZVN0eWxlID0gY29sb3IudmFsdWU7XG4gICAgICBjYXJyaWVyQ3R4LmxpbmVXaWR0aCA9IGZhdEhhbmRsZS52YWx1ZTtcblxuICAgICAgY2FycmllckN0eC5tb3ZlVG8oc3RhcnRYLCBzdGFydFkpO1xuICAgIH07XG5cbiAgICBjb25zdCBsaW5lVG9vbE1vdmUgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFtb3VzZURvd24pIHJldHVybjtcblxuICAgICAgY2FudmFzU2l6ZSA9IGNhbnZhc1NpemVIYW5kbGUudmFsdWVBc051bWJlcjtcblxuICAgICAgZHJhd0N0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XG4gICAgICBkcmF3Q3R4LmJlZ2luUGF0aCgpO1xuICAgICAgZHJhd0N0eC5zdHJva2VTdHlsZSA9IGNvbG9yLnZhbHVlO1xuICAgICAgZHJhd0N0eC5saW5lV2lkdGggPSBmYXRIYW5kbGUudmFsdWU7XG4gICAgICBkcmF3Q3R4Lm1vdmVUbyhzdGFydFgsIHN0YXJ0WSk7XG4gICAgICBkcmF3Q3R4LmxpbmVUbyhlLm9mZnNldFgsIGUub2Zmc2V0WSk7XG4gICAgICBkcmF3Q3R4LnN0cm9rZSgpO1xuICAgICAgZHJhd0N0eC5jbG9zZVBhdGgoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbGluZVRvb2xVcCA9IChlKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcblxuICAgICAgZHJhd0N0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XG4gICAgICBjYXJyaWVyQ3R4LmxpbmVUbyhlLm9mZnNldFgsIGUub2Zmc2V0WSk7XG4gICAgICBjYXJyaWVyQ3R4LnN0cm9rZSgpO1xuICAgICAgY2FycmllckN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIEFkZFRvb2xzLmFkZENhbnZhc1RvRnJhbWVMaXN0ZW5lcihlLnRhcmdldCwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGxpbmVUb29sTGVhdmUgPSAoKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdXNlZG93bjogbGluZVRvb2xEb3duLFxuICAgICAgbW91c2Vtb3ZlOiBsaW5lVG9vbE1vdmUsXG4gICAgICBtb3VzZXVwOiBsaW5lVG9vbFVwLFxuICAgICAgbW91c2VsZWF2ZTogbGluZVRvb2xMZWF2ZSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGFkZFJlY3RUb29sKGNhcnJpZXJDdHgsIGRyYXdDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpIHtcbiAgICBjb25zdCBjYW52YXNTaXplSGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZhcy1zaXplLWhhbmRsZScpO1xuXG4gICAgbGV0IGNhbnZhc1NpemU7XG4gICAgbGV0IG1vdXNlRG93bjtcblxuICAgIGxldCBzdGFydFg7XG4gICAgbGV0IHN0YXJ0WTtcblxuICAgIGxldCBmYXRTaXplO1xuXG4gICAgY29uc3QgcmVjdFRvb2xEb3duID0gKGUpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IHRydWU7XG5cbiAgICAgIHN0YXJ0WCA9IGUub2Zmc2V0WDtcbiAgICAgIHN0YXJ0WSA9IGUub2Zmc2V0WTtcblxuICAgICAgY2FycmllckN0eC5zdHJva2VTdHlsZSA9IGNvbG9yLnZhbHVlO1xuICAgICAgZHJhd0N0eC5zdHJva2VTdHlsZSA9IGNvbG9yLnZhbHVlO1xuXG4gICAgICBmYXRTaXplID0gZmF0SGFuZGxlLnZhbHVlO1xuXG4gICAgICBjYXJyaWVyQ3R4LmxpbmVXaWR0aCA9IGZhdFNpemU7XG4gICAgICBkcmF3Q3R4LmxpbmVXaWR0aCA9IGZhdFNpemU7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlY3RUb29sTW92ZSA9IChlKSA9PiB7XG4gICAgICBpZiAoIW1vdXNlRG93bikgcmV0dXJuO1xuXG4gICAgICBjb25zdCB3aWR0aCA9IGUub2Zmc2V0WCAtIHN0YXJ0WDtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGUub2Zmc2V0WSAtIHN0YXJ0WTtcblxuICAgICAgY2FudmFzU2l6ZSA9IGNhbnZhc1NpemVIYW5kbGUudmFsdWVBc051bWJlcjtcblxuICAgICAgZHJhd0N0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XG4gICAgICBkcmF3Q3R4LnN0cm9rZVJlY3Qoc3RhcnRYLCBzdGFydFksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH07XG5cbiAgICBjb25zdCByZWN0VG9vbFVwID0gKGUpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuXG4gICAgICBjb25zdCB3aWR0aCA9IGUub2Zmc2V0WCAtIHN0YXJ0WDtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGUub2Zmc2V0WSAtIHN0YXJ0WTtcblxuICAgICAgY2FycmllckN0eC5zdHJva2VSZWN0KHN0YXJ0WCwgc3RhcnRZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgIGRyYXdDdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1NpemUsIGNhbnZhc1NpemUpO1xuICAgICAgQWRkVG9vbHMuYWRkQ2FudmFzVG9GcmFtZUxpc3RlbmVyKGUudGFyZ2V0LCBmcmFtZXNTdG9yYWdlLCBjYXJyaWVyQ2FudmFzKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVjdFRvb2xMZWF2ZSA9ICgpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgbW91c2Vkb3duOiByZWN0VG9vbERvd24sXG4gICAgICBtb3VzZW1vdmU6IHJlY3RUb29sTW92ZSxcbiAgICAgIG1vdXNldXA6IHJlY3RUb29sVXAsXG4gICAgICBtb3VzZWxlYXZlOiByZWN0VG9vbExlYXZlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgYWRkRmlsbFJlY3RUb29sKGNhcnJpZXJDdHgsIGRyYXdDdHgsIGNvbG9yLCBmYXRIYW5kbGUsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpIHtcbiAgICBjb25zdCBjYW52YXNTaXplSGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZhcy1zaXplLWhhbmRsZScpO1xuXG4gICAgbGV0IGNhbnZhc1NpemU7XG4gICAgbGV0IG1vdXNlRG93bjtcblxuICAgIGxldCBzdGFydFg7XG4gICAgbGV0IHN0YXJ0WTtcblxuICAgIGxldCBmYXRTaXplO1xuXG4gICAgY29uc3QgZmlsbFJlY3RUb29sRG93biA9IChlKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSB0cnVlO1xuXG4gICAgICBzdGFydFggPSBlLm9mZnNldFg7XG4gICAgICBzdGFydFkgPSBlLm9mZnNldFk7XG5cbiAgICAgIGNhcnJpZXJDdHguZmlsbFN0eWxlID0gY29sb3IudmFsdWU7XG4gICAgICBkcmF3Q3R4LmZpbGxTdHlsZSA9IGNvbG9yLnZhbHVlO1xuXG4gICAgICBmYXRTaXplID0gZmF0SGFuZGxlLnZhbHVlO1xuXG4gICAgICBjYXJyaWVyQ3R4LmxpbmVXaWR0aCA9IGZhdFNpemU7XG4gICAgICBkcmF3Q3R4LmxpbmVXaWR0aCA9IGZhdFNpemU7XG4gICAgfTtcblxuICAgIGNvbnN0IGZpbGxSZWN0VG9vbE1vdmUgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFtb3VzZURvd24pIHJldHVybjtcblxuICAgICAgY29uc3Qgd2lkdGggPSBlLm9mZnNldFggLSBzdGFydFg7XG4gICAgICBjb25zdCBoZWlnaHQgPSBlLm9mZnNldFkgLSBzdGFydFk7XG5cbiAgICAgIGNhbnZhc1NpemUgPSBjYW52YXNTaXplSGFuZGxlLnZhbHVlQXNOdW1iZXI7XG5cbiAgICAgIGRyYXdDdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1NpemUsIGNhbnZhc1NpemUpO1xuICAgICAgZHJhd0N0eC5maWxsUmVjdChzdGFydFgsIHN0YXJ0WSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZpbGxSZWN0VG9vbFVwID0gKGUpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuXG4gICAgICBjb25zdCB3aWR0aCA9IGUub2Zmc2V0WCAtIHN0YXJ0WDtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGUub2Zmc2V0WSAtIHN0YXJ0WTtcblxuICAgICAgY2FycmllckN0eC5maWxsUmVjdChzdGFydFgsIHN0YXJ0WSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICBkcmF3Q3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNTaXplLCBjYW52YXNTaXplKTtcbiAgICAgIEFkZFRvb2xzLmFkZENhbnZhc1RvRnJhbWVMaXN0ZW5lcihlLnRhcmdldCwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZpbGxSZWN0VG9vbExlYXZlID0gKCkgPT4ge1xuICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBtb3VzZWRvd246IGZpbGxSZWN0VG9vbERvd24sXG4gICAgICBtb3VzZW1vdmU6IGZpbGxSZWN0VG9vbE1vdmUsXG4gICAgICBtb3VzZXVwOiBmaWxsUmVjdFRvb2xVcCxcbiAgICAgIG1vdXNlbGVhdmU6IGZpbGxSZWN0VG9vbExlYXZlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgYWRkQXJjVG9vbChjYXJyaWVyQ3R4LCBkcmF3Q3R4LCBjb2xvciwgZmF0SGFuZGxlLCBmcmFtZXNTdG9yYWdlLCBjYXJyaWVyQ2FudmFzKSB7XG4gICAgY29uc3QgY2FudmFzU2l6ZUhhbmRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW52YXMtc2l6ZS1oYW5kbGUnKTtcblxuICAgIGxldCBjYW52YXNTaXplO1xuICAgIGxldCBtb3VzZURvd247XG5cbiAgICBsZXQgc3RhcnRYO1xuICAgIGxldCBzdGFydFk7XG5cbiAgICBsZXQgZmF0U2l6ZTtcblxuICAgIGZ1bmN0aW9uIGRyYXdFbGxpcHNlKHgxLCB5MSwgeDIsIHkyLCBjdHgpIHtcbiAgICAgIGNvbnN0IHJhZGl1c1ggPSAoeDIgLSB4MSkgKiAwLjU7XG4gICAgICBjb25zdCByYWRpdXNZID0gKHkyIC0geTEpICogMC41O1xuICAgICAgY29uc3QgY2VudGVyWCA9IHgxICsgcmFkaXVzWDtcbiAgICAgIGNvbnN0IGNlbnRlclkgPSB5MSArIHJhZGl1c1k7XG4gICAgICBjb25zdCBzdGVwID0gMC4wMTtcbiAgICAgIGxldCBhID0gc3RlcDtcbiAgICAgIGNvbnN0IHBpMiA9IE1hdGguUEkgKiAyIC0gc3RlcDtcblxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgICBjdHgubW92ZVRvKGNlbnRlclggKyByYWRpdXNYICogTWF0aC5jb3MoMCksXG4gICAgICAgIGNlbnRlclkgKyByYWRpdXNZICogTWF0aC5zaW4oMCkpO1xuXG4gICAgICBmb3IgKDsgYSA8IHBpMjsgYSArPSBzdGVwKSB7XG4gICAgICAgIGN0eC5saW5lVG8oY2VudGVyWCArIHJhZGl1c1ggKiBNYXRoLmNvcyhhKSxcbiAgICAgICAgICBjZW50ZXJZICsgcmFkaXVzWSAqIE1hdGguc2luKGEpKTtcbiAgICAgIH1cblxuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGFyY1Rvb2xEb3duID0gKGUpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IHRydWU7XG5cbiAgICAgIHN0YXJ0WCA9IGUub2Zmc2V0WDtcbiAgICAgIHN0YXJ0WSA9IGUub2Zmc2V0WTtcblxuICAgICAgY2FycmllckN0eC5zdHJva2VTdHlsZSA9IGNvbG9yLnZhbHVlO1xuICAgICAgZHJhd0N0eC5zdHJva2VTdHlsZSA9IGNvbG9yLnZhbHVlO1xuXG4gICAgICBmYXRTaXplID0gZmF0SGFuZGxlLnZhbHVlO1xuXG4gICAgICBjYXJyaWVyQ3R4LmxpbmVXaWR0aCA9IGZhdFNpemU7XG4gICAgICBkcmF3Q3R4LmxpbmVXaWR0aCA9IGZhdFNpemU7XG4gICAgfTtcblxuICAgIGNvbnN0IGFyY1Rvb2xNb3ZlID0gKGUpID0+IHtcbiAgICAgIGlmICghbW91c2VEb3duKSByZXR1cm47XG5cbiAgICAgIGNhbnZhc1NpemUgPSBjYW52YXNTaXplSGFuZGxlLnZhbHVlQXNOdW1iZXI7XG5cbiAgICAgIGRyYXdDdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1NpemUsIGNhbnZhc1NpemUpO1xuICAgICAgZHJhd0VsbGlwc2Uoc3RhcnRYLCBzdGFydFksIGUub2Zmc2V0WCwgZS5vZmZzZXRZLCBkcmF3Q3R4KTtcbiAgICB9O1xuXG4gICAgY29uc3QgYXJjVG9vbFVwID0gKGUpID0+IHtcbiAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuXG4gICAgICBkcmF3RWxsaXBzZShzdGFydFgsIHN0YXJ0WSwgZS5vZmZzZXRYLCBlLm9mZnNldFksIGNhcnJpZXJDdHgpO1xuICAgICAgZHJhd0N0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XG4gICAgICBBZGRUb29scy5hZGRDYW52YXNUb0ZyYW1lTGlzdGVuZXIoZS50YXJnZXQsIGZyYW1lc1N0b3JhZ2UsIGNhcnJpZXJDYW52YXMpO1xuICAgIH07XG5cbiAgICBjb25zdCBhcmNUb29sTGVhdmUgPSAoKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1vdXNlZG93bjogYXJjVG9vbERvd24sXG4gICAgICBtb3VzZW1vdmU6IGFyY1Rvb2xNb3ZlLFxuICAgICAgbW91c2V1cDogYXJjVG9vbFVwLFxuICAgICAgbW91c2VsZWF2ZTogYXJjVG9vbExlYXZlLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgYWRkTGlnaHRlblRvb2woY2FycmllckN0eCwgZmF0SGFuZGxlLCBmcmFtZXNTdG9yYWdlLCBjYXJyaWVyQ2FudmFzKSB7XG4gICAgY29uc3QgY3RybENvZGUgPSAxNztcbiAgICBsZXQgZmF0U2l6ZTtcbiAgICBsZXQgbW91c2VEb3duO1xuXG4gICAgY29uc3QgbGlnaHRlblRvb2xEb3duID0gKCkgPT4ge1xuICAgICAgbW91c2VEb3duID0gdHJ1ZTtcblxuICAgICAgY2FycmllckN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGNhcnJpZXJDdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAxKSc7XG4gICAgICBjYXJyaWVyQ3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpJztcbiAgICAgIGNhcnJpZXJDdHgubGluZVdpZHRoID0gZmF0SGFuZGxlLnZhbHVlO1xuICAgIH07XG5cbiAgICBjb25zdCBsaWdodGVuVG9vbE1vdmUgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFtb3VzZURvd24pIHJldHVybjtcblxuICAgICAgZmF0U2l6ZSA9IGZhdEhhbmRsZS52YWx1ZUFzTnVtYmVyO1xuXG4gICAgICBjb25zdCB4Q29yZCA9IGUub2Zmc2V0WDtcbiAgICAgIGNvbnN0IHlDb3JkID0gZS5vZmZzZXRZO1xuXG4gICAgICBjYXJyaWVyQ3R4LmxpbmVUbyh4Q29yZCwgeUNvcmQpO1xuICAgICAgY2FycmllckN0eC5zdHJva2UoKTtcblxuICAgICAgY2FycmllckN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGNhcnJpZXJDdHguYXJjKHhDb3JkLCB5Q29yZCwgZmF0U2l6ZSAvIDIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGNhcnJpZXJDdHguZmlsbCgpO1xuXG4gICAgICBjYXJyaWVyQ3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY2FycmllckN0eC5tb3ZlVG8oeENvcmQsIHlDb3JkKTtcbiAgICB9O1xuXG4gICAgY29uc3QgbGlnaHRlblRvb2xVcCA9IChlKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIEFkZFRvb2xzLmFkZENhbnZhc1RvRnJhbWVMaXN0ZW5lcihlLnRhcmdldCwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGxpZ2h0ZW5Ub29sTGVhdmUgPSAoKSA9PiB7XG4gICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChlLmtleUNvZGUgPT09IGN0cmxDb2RlKSB7XG4gICAgICAgIGNhcnJpZXJDdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMC4wMSknO1xuICAgICAgICBjYXJyaWVyQ3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSknO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoZS5rZXlDb2RlID09PSBjdHJsQ29kZSkge1xuICAgICAgICBjYXJyaWVyQ3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpJztcbiAgICAgICAgY2FycmllckN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDEpJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBtb3VzZWRvd246IGxpZ2h0ZW5Ub29sRG93bixcbiAgICAgIG1vdXNlbW92ZTogbGlnaHRlblRvb2xNb3ZlLFxuICAgICAgbW91c2V1cDogbGlnaHRlblRvb2xVcCxcbiAgICAgIG1vdXNlbGVhdmU6IGxpZ2h0ZW5Ub29sTGVhdmUsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBhZGRDb2xvclBpY2tlclRvb2woY2FycmllckN0eCwgY29sb3IpIHtcbiAgICBjb25zdCBjb2xvclBpY2tlclRvb2xDbGljayA9IChlKSA9PiB7XG4gICAgICBjb25zdCBwaXhlbERhdGEgPSBjYXJyaWVyQ3R4LmdldEltYWdlRGF0YShlLm9mZnNldFgsIGUub2Zmc2V0WSwgMSwgMSk7XG5cbiAgICAgIGNvbnN0IHJDaGFuZWwgPSBwaXhlbERhdGEuZGF0YVswXTtcbiAgICAgIGNvbnN0IGdDaGFuZWwgPSBwaXhlbERhdGEuZGF0YVsxXTtcbiAgICAgIGNvbnN0IGJDaGFuZWwgPSBwaXhlbERhdGEuZGF0YVsyXTtcblxuICAgICAgZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xuICAgICAgICBjb25zdCBoZXggPSBjLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgcmV0dXJuIGhleC5sZW5ndGggPT09IDEgPyBgMCR7aGV4fWAgOiBoZXg7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcbiAgICAgICAgcmV0dXJuIGAjJHtjb21wb25lbnRUb0hleChyKX0ke2NvbXBvbmVudFRvSGV4KGcpfSR7Y29tcG9uZW50VG9IZXgoYil9YDtcbiAgICAgIH1cblxuICAgICAgY29sb3IudmFsdWUgPSByZ2JUb0hleChyQ2hhbmVsLCBnQ2hhbmVsLCBiQ2hhbmVsKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNsaWNrOiBjb2xvclBpY2tlclRvb2xDbGljayxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGFkZENhbnZhc1RvRnJhbWVMaXN0ZW5lcihldmVudFRhcmdldCwgZnJhbWVzU3RvcmFnZSwgY2FycmllckNhbnZhcykge1xuICAgIGNvbnN0IGN1cnJlbnRDYW52YXNJZCA9IHBhcnNlSW50KGV2ZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSwgMTApO1xuICAgIGNvbnN0IGN1cnJlbnRGcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2N1cnJlbnRDYW52YXNJZH0tZnJhbWVgKTtcbiAgICBjb25zdCBmcmFtZXNXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyYW1lcy13cmFwcGVyJyk7XG5cbiAgICBjb25zdCBjYW52YXNJbWcgPSBjYXJyaWVyQ2FudmFzLnRvRGF0YVVSTCgpO1xuXG4gICAgY3VycmVudEZyYW1lLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtjYW52YXNJbWd9KWA7XG4gICAgZnJhbWVzU3RvcmFnZVtjdXJyZW50Q2FudmFzSWQgLSAxXS5mcmFtZSA9IGN1cnJlbnRGcmFtZTtcbiAgICBmcmFtZXNTdG9yYWdlW2N1cnJlbnRDYW52YXNJZCAtIDFdLmNhbnZhc0ltZyA9IGNhbnZhc0ltZztcblxuICAgIGZyYW1lc1dyYXAuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBmcmFtZXNTdG9yYWdlLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgIGZyYW1lc1dyYXAuYXBwZW5kQ2hpbGQoZWxlbS5mcmFtZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImY1YThmYjA4ZWI2ZjkxZWZkODJhOTk2ZDU4MmExZGRkLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImU1NTAxOGE2MzljNjE4M2Q4NDg3Y2QxZmNkZDM4MjY4LnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjZlMWU4YWM5M2M2MjVhYWJhNjJhZmIwN2Y4M2IwZjdiLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjU0ZGJhYjIyMTY0Njg3ZDM3ZjEzZmRkOTk2Y2Y1ZTAxLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImEyNGQ2YjQxYTZmNGM0YmY4ZDg2MTkxMTE3OWJjMTk3LnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImRiZmU5MDZkYzdiNjc3MWI4MmI0N2I0YjU2MmExY2NiLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjI4MGZhNWVlZjM4NTFkY2FiZjc4N2ZlZTBmMGQ5OWVjLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjEyMTIwMTAzZmVmN2UxYTVkMTQ3ZGZlMjM1NDIyNzQ0LnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjg2NTNhODAxMzdjZWNhYjIzYTkyNGMxOTc0MjA5N2FjLnBuZ1wiOyIsImltcG9ydCBBZGRUb29scyBmcm9tICcuL0FkZFRvb2xzJztcbmltcG9ydCAnLi90b29scy5jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBBZGRUb29scztcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rvb2xzLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi90b29scy5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3Rvb2xzLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSJdLCJzb3VyY2VSb290IjoiIn0=